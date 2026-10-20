(() => {
  "use strict";

  const data = window.TRACE_SET;
  if (!data || !data.programs?.length) throw new Error("TRACE_SET is missing or empty.");

  const $ = (id) => document.getElementById(id);
  const els = {
    title: $("page-title"), subtitle: $("subtitle"), picker: $("problem"), code: $("code"),
    previous: $("previous"), next: $("next"), play: $("play"), progress: $("progress"),
    counter: $("counter"), speed: $("speed"), phase: $("phase"), stepTitle: $("step-title"),
    reason: $("reason"), lineBadge: $("line-badge"), stack: $("stack"), state: $("state"),
    output: $("console-output"), arrow: $("flow-arrow"), path: $("flow-path")
  };

  // Stable problem-specific URLs can select a trace directly from a lecture slide.
  const requestedId = window.location.hash.slice(1);
  let programIndex = Math.max(0, data.programs.findIndex(p => p.id === requestedId));
  let stepIndex = 0;
  let timer = null;

  els.title.textContent = data.title;
  els.subtitle.textContent = data.subtitle || "Source-level Java execution visualizer";
  data.programs.forEach((program, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = program.title;
    els.picker.append(option);
  });

  els.picker.value = String(programIndex);

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[ch]);
  }

  const javaKeywords = new Set([
    "abstract", "break", "case", "catch", "class", "continue", "default", "do", "else", "enum",
    "extends", "final", "finally", "for", "if", "implements", "import", "instanceof", "interface",
    "native", "new", "package", "private", "protected", "public", "return", "static", "strictfp",
    "super", "switch", "synchronized", "this", "throw", "throws", "transient", "try", "volatile", "while"
  ]);
  const javaTypes = new Set(["boolean", "byte", "char", "double", "float", "int", "long", "short", "void", "String"]);
  const javaLiterals = new Set(["true", "false", "null"]);

  function highlightJava(source) {
    let html = "";
    let index = 0;
    while (index < source.length) {
      const rest = source.slice(index);
      let match;
      if ((match = rest.match(/^\s+/))) {
        html += match[0];
      } else if (rest.startsWith("//")) {
        html += `<span class="tok-comment">${escapeHtml(rest)}</span>`;
        break;
      } else if ((match = rest.match(/^"(?:\\.|[^"\\])*"|^'(?:\\.|[^'\\])*'/))) {
        html += `<span class="tok-string">${escapeHtml(match[0])}</span>`;
      } else if ((match = rest.match(/^@\w+/))) {
        html += `<span class="tok-annotation">${escapeHtml(match[0])}</span>`;
      } else if ((match = rest.match(/^\b(?:0[xX][\da-fA-F]+|\d+(?:\.\d+)?[fFdDlL]?)\b/))) {
        html += `<span class="tok-number">${match[0]}</span>`;
      } else if ((match = rest.match(/^[A-Za-z_$][\w$]*/))) {
        const word = match[0];
        const following = source.slice(index + word.length);
        let tokenClass = "tok-identifier";
        if (javaKeywords.has(word)) tokenClass = "tok-keyword";
        else if (javaTypes.has(word) || /^[A-Z]/.test(word)) tokenClass = "tok-type";
        else if (javaLiterals.has(word)) tokenClass = "tok-literal";
        else if (/^\s*\(/.test(following)) tokenClass = "tok-method";
        html += `<span class="${tokenClass}">${escapeHtml(word)}</span>`;
      } else if ((match = rest.match(/^(?:\+\+|--|==|!=|<=|>=|&&|\|\||\+=|-=|\*=|\/=|->|[+\-*/%=<>!?:.&|])/))) {
        html += `<span class="tok-operator">${escapeHtml(match[0])}</span>`;
      } else {
        html += escapeHtml(source[index]);
        match = [source[index]];
      }
      index += match[0].length;
    }
    return html;
  }

  function program() { return data.programs[programIndex]; }
  function step() { return program().steps[stepIndex]; }

  function renderCode() {
    els.code.innerHTML = "";
    program().source.split("\n").forEach((text, index) => {
      const line = document.createElement("span");
      line.className = "code-line";
      line.dataset.line = index + 1;
      line.dataset.source = text;
      line.innerHTML = `<span class="line-no">${index + 1}</span><span class="code-text">${highlightJava(text)}</span>`;
      els.code.append(line);
    });
  }

  function inferFocus(current, source) {
    if (current.focus && source.includes(current.focus)) return current.focus;
    const phase = (current.phase || "").toLowerCase();
    const title = current.title || "";
    const trimmed = source.trim();
    const find = regex => source.match(regex)?.[0];

    // Prefer code-shaped text named in the explanation title when it occurs verbatim on the line.
    const named = title.match(/(?:\+\+[\w.]+|[\w.]+(?:\+\+|--)|[\w.]+\([^)]*\)|[\w.]+\.[\w.]+)/g) || [];
    const exact = named.filter(token => source.includes(token)).sort((a, b) => b.length - a.length)[0];
    if (exact) return exact;

    if (phase.includes("pre-increment") || phase.includes("post-increment"))
      return find(/\+\+\s*[A-Za-z_]\w*(?:\.\w+)*|[A-Za-z_]\w*(?:\.\w+)*(?:\+\+|--)/) || trimmed;
    if (phase.includes("constructor delegation")) return find(/\bthis\s*\([^;]*\)/) || trimmed;
    if (phase.includes("superclass")) return find(/\bsuper(?:\.\w+)?\s*\([^;]*\)/) || trimmed;
    if (phase.includes("constructor call") || phase.includes("composition copy") || phase.includes("argument evaluation"))
      return find(/\bnew\s+[A-Za-z_]\w*\s*\([^;]*/) || trimmed;
    if (phase === "return" || phase.includes("nested return") || phase.includes("return and assignment"))
      return find(/\breturn\s+[^;]+/) || trimmed;
    if (phase.includes("compound assignment") && title.toLowerCase().includes("save"))
      return find(/[A-Za-z_]\w*(?:\.\w+)*(?=\s*[+\-*/]?=)/) || trimmed;
    if (phase.includes("method") || phase.includes("dispatch") || phase.includes("overload") || phase.includes("call")) {
      const calls = [...source.matchAll(/[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)+\s*\([^;]*/g)].map(match => match[0]);
      if (calls.length) return calls[calls.length - 1];
    }
    if (phase.includes("assignment") || phase.includes("update") || phase.includes("initialization") ||
        phase.includes("composition") || phase.includes("alias") || phase.includes("increment") ||
        phase.includes("evaluation order") || phase.includes("runtime selection"))
      return find(/[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*\s*(?:\+=|-=|\*=|\/=|=)\s*[^;]+/) || trimmed;
    if (phase.includes("console")) return find(/System\.out\.println\s*\([^;]*/) || trimmed;
    return trimmed;
  }

  function renderFocus(line, current) {
    const source = line?.dataset.source || "";
    const textNode = line?.querySelector(".code-text");
    if (!textNode) return;
    const focus = inferFocus(current, source);
    const start = focus ? source.indexOf(focus) : -1;
    if (start < 0) { textNode.innerHTML = highlightJava(source); return; }
    textNode.innerHTML = `${highlightJava(source.slice(0, start))}<span class="focus-box">${highlightJava(focus)}</span>${highlightJava(source.slice(start + focus.length))}`;
  }

  function stateMap(at) {
    if (program().steps[at].stateSnapshot) return {...program().steps[at].stateSnapshot};
    const merged = {};
    for (let i = 0; i <= at; i++) Object.assign(merged, program().steps[i].state || {});
    return merged;
  }

  function outputAt(at) {
    const lines = [];
    for (let i = 0; i <= at; i++) if (program().steps[i].output) lines.push(program().steps[i].output);
    return lines;
  }

  function renderStack(frames) {
    els.stack.innerHTML = "";
    (frames || ["main"]).forEach((frame, index, all) => {
      if (index) {
        const arrow = document.createElement("span"); arrow.className = "stack-arrow"; arrow.textContent = "→"; els.stack.append(arrow);
      }
      const node = document.createElement("span"); node.className = "frame"; node.textContent = frame; els.stack.append(node);
    });
  }

  function renderState(current, prior) {
    els.state.innerHTML = "";
    const reads = step().reads || {};
    Object.entries(current).forEach(([name, value]) => {
      const changed = !prior || prior[name] !== value;
      const read = Object.hasOwn(reads, name);
      const card = document.createElement("div");
      card.className = `state-card${changed ? " changed" : ""}${read ? " read" : ""}`;
      card.innerHTML = `<div class="state-name">${escapeHtml(name)}</div><div class="state-value">${escapeHtml(value)}</div>` +
        (changed && prior && name in prior ? `<div class="change-note">was ${escapeHtml(prior[name])}</div>` : "") +
        (read ? `<div class="read-note">↳ ${escapeHtml(reads[name])}</div>` : "");
      els.state.append(card);
    });
  }

  function drawArrow(fromLine, toLine) {
    if (!fromLine || fromLine === toLine) { els.path.setAttribute("d", ""); return; }
    const from = els.code.querySelector(`[data-line="${fromLine}"]`);
    const to = els.code.querySelector(`[data-line="${toLine}"]`);
    if (!from || !to) return;
    const codeRect = els.code.getBoundingClientRect();
    const panelRect = els.arrow.getBoundingClientRect();
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();
    const targetRect = (to.querySelector(".focus-box") || to.querySelector(".code-text")).getBoundingClientRect();
    const y1 = fromRect.top - panelRect.top + fromRect.height / 2;
    const y2 = toRect.top - panelRect.top + toRect.height / 2;
    const bend = Math.min(codeRect.width - 18, 565);
    const sourceX = Math.max(70, Math.min(bend - 24, fromRect.right - panelRect.left - 24));
    const destinationX = Math.max(70, Math.min(bend - 24, targetRect.right - panelRect.left + 10));
    const direction = y2 >= y1 ? 1 : -1;
    const radius = Math.min(12, Math.abs(y2 - y1) / 2);
    const cornerX = bend - radius;

    // Use rounded right-angle bends and finish with a straight horizontal run.
    // The final run is intentionally much longer than 3 px so the arrowhead has
    // a visible stem before it reaches the destination line.
    els.path.setAttribute("d",
      `M ${sourceX} ${y1} ` +
      `H ${cornerX} ` +
      `Q ${bend} ${y1} ${bend} ${y1 + direction * radius} ` +
      `V ${y2 - direction * radius} ` +
      `Q ${bend} ${y2} ${cornerX} ${y2} ` +
      `H ${destinationX}`);
  }

  function render() {
    const current = step();
    const priorState = stepIndex ? stateMap(stepIndex - 1) : {};
    const currentState = stateMap(stepIndex);
    const priorExecutedLine = stepIndex ? program().steps[stepIndex - 1].line : null;

    els.code.querySelectorAll(".code-line").forEach(node => {
      node.classList.remove("active", "previous");
      const codeText = node.querySelector(".code-text");
      if (codeText) codeText.innerHTML = highlightJava(node.dataset.source);
    });
    const active = els.code.querySelector(`[data-line="${current.line}"]`);
    const prior = els.code.querySelector(`[data-line="${priorExecutedLine}"]`);
    active?.classList.add("active");
    if (active) renderFocus(active, current);
    if (prior && prior !== active) prior.classList.add("previous");
    active?.scrollIntoView({block: "center", behavior: "auto"});

    els.phase.textContent = current.phase || "Execute";
    els.stepTitle.textContent = current.title;
    els.reason.textContent = current.reason;
    els.lineBadge.textContent = `Line ${current.line}`;
    renderStack(current.stack);
    renderState(currentState, priorState);

    const output = outputAt(stepIndex);
    els.output.innerHTML = output.map((line, i) => `<span${i === output.length - 1 && current.output ? ' class="console-new"' : ""}>${escapeHtml(line)}</span>`).join("\n");
    els.output.scrollTop = els.output.scrollHeight;

    els.progress.max = program().steps.length - 1;
    els.progress.value = stepIndex;
    els.counter.textContent = `${stepIndex + 1} / ${program().steps.length}`;
    els.previous.disabled = stepIndex === 0;
    els.next.disabled = stepIndex === program().steps.length - 1;
    // This arrow belongs to the selected execution step. Its direction always
    // follows the program from the preceding step to the current step, even
    // when the user arrived here by pressing Previous.
    scheduleArrow();
  }

  let arrowFrame = null;
  function scheduleArrow() {
    if (arrowFrame !== null) cancelAnimationFrame(arrowFrame);
    arrowFrame = requestAnimationFrame(() => {
      arrowFrame = null;
      const current = step();
      const priorLine = stepIndex ? program().steps[stepIndex - 1].line : null;
      drawArrow(priorLine, current.line);
    });
  }

  function stop() { clearInterval(timer); timer = null; els.play.textContent = "▶ Play"; }
  function start() {
    if (stepIndex === program().steps.length - 1) {
      stepIndex = 0;
      render();
    }
    els.play.textContent = "❚❚ Pause";
    const tick = () => {
      if (stepIndex >= program().steps.length - 1) return stop();
      stepIndex++; render();
    };
    timer = setInterval(tick, Number(els.speed.value));
  }

  els.previous.addEventListener("click", () => { stop(); if (stepIndex) { stepIndex--; render(); } });
  els.next.addEventListener("click", () => { stop(); if (stepIndex < program().steps.length - 1) { stepIndex++; render(); } });
  els.play.addEventListener("click", () => timer ? stop() : start());
  els.speed.addEventListener("change", () => { if (timer) { stop(); start(); } });
  els.progress.addEventListener("input", () => { stop(); stepIndex = Number(els.progress.value); render(); });
  els.picker.addEventListener("change", () => {
    stop(); programIndex = Number(els.picker.value); stepIndex = 0;
    history.replaceState(null, "", "#" + program().id);
    renderCode(); render();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") els.next.click();
    if (event.key === "ArrowLeft") els.previous.click();
    if (event.key === " ") { event.preventDefault(); els.play.click(); }
  });
  els.code.addEventListener("scroll", scheduleArrow, {passive: true});
  window.addEventListener("resize", scheduleArrow);

  window.addEventListener("hashchange", () => {
    const selected = data.programs.findIndex(p => p.id === window.location.hash.slice(1));
    if (selected < 0) return;
    stop(); programIndex = selected; stepIndex = 0;
    els.picker.value = String(selected); renderCode(); render();
  });
  renderCode();
  render();
})();
