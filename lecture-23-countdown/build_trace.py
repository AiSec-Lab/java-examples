from pathlib import Path
import copy
import json

HERE = Path(__file__).resolve().parent
SOURCE = (HERE / "java" / "Slide08_CountDown.java").read_text().rstrip()
LINES = SOURCE.splitlines()
steps = []
frames = [{"name": "main", "value": "(no locals yet)"}]
serial = 0


def line(text, occurrence=1):
    matches = [number for number, source_line in enumerate(LINES, 1) if text in source_line]
    return matches[occurrence - 1]


def snapshot():
    return {frame["name"]: frame["value"] for frame in frames}


def emit(source_line, title, reason, phase, focus, output=None, reads=None):
    step = {
        "line": source_line,
        "title": title,
        "reason": reason,
        "phase": phase,
        "stack": [frame["name"] for frame in frames],
        "stateSnapshot": copy.deepcopy(snapshot()),
        "focus": focus,
    }
    if output is not None:
        step["output"] = output
    if reads:
        step["reads"] = reads
    steps.append(step)


def active_read():
    return {frames[-1]["name"]: "Read value from this exact active call."}


def count_down(value):
    global serial
    serial += 1
    name = f"countDown({value}) [frame {serial}]"
    frames.append({"name": name, "value": f"value = {value}"})
    emit(line("public static void countDown"), f"Enter countDown({value})",
         f"Create a new active call whose parameter value is {value}.",
         "Method entry", "countDown(int value)")

    is_base = value <= 0
    emit(line("if (value <= 0)"), "Check the base case",
         f"{value} <= 0 is {str(is_base).lower()}.",
         "Condition", "value <= 0", reads=active_read())
    if is_base:
        emit(line('System.out.println("Go!")'), "Evaluate the output",
             'The base case prepares the text "Go!".',
             "Argument evaluation", '"Go!"')
        emit(line('System.out.println("Go!")'), "Print Go!",
             "The base case writes its message to standard output.",
             "Console output", 'System.out.println("Go!")', output="Go!")
        emit(line("return;"), "Return from the base case",
             "This call stops without making another recursive call.",
             "Return", "return")
        frames.pop()
        return

    emit(line("System.out.println(value)"), "Read the current value",
         f"Read value = {value} from this call before printing it.",
         "Argument evaluation", "value", reads=active_read())
    emit(line("System.out.println(value)"), f"Print {value}",
         "Write the current value to standard output.",
         "Console output", "System.out.println(value)", output=str(value))

    smaller = value - 1
    frames[-1]["value"] = f"value = {value}; waiting for countDown({smaller})"
    emit(line("countDown(value - 1)"), "Calculate the smaller argument",
         f"value - 1 is {smaller}. The current call keeps value = {value} while the child runs.",
         "Argument evaluation", "value - 1", reads=active_read())
    emit(line("countDown(value - 1)"), f"Call countDown({smaller})",
         "Suspend this call and enter the same method with the smaller value.",
         "Method call", "countDown(value - 1)")
    count_down(smaller)

    frames[-1]["value"] = f"value = {value}; child returned"
    emit(line("countDown(value - 1)"), f"Resume countDown({value})",
         f"countDown({smaller}) has returned, so countDown({value}) resumes after its recursive call.",
         "Return to caller", "countDown(value - 1)")
    emit(line("    }", 2), f"Finish countDown({value})",
         "No statements remain in this void method, so the call returns to its caller.",
         "Method return", "}")
    frames.pop()


emit(line("public static void main"), "Enter main", "This is the main method.",
     "Method entry", "public static void main")
emit(line("countDown(3)"), "Evaluate the initial argument",
     "The first call will receive the integer value 3.",
     "Argument evaluation", "3")
emit(line("countDown(3)"), "Call countDown(3)",
     "Suspend main until the countdown finishes.",
     "Method call", "countDown(3)")
count_down(3)
emit(line("countDown(3)"), "Resume main",
     "countDown(3) has returned. Main has no remaining work.",
     "Return to caller", "countDown(3)")
emit(line("    }", 3), "Finish main", "Program execution is complete.",
     "Method return", "}")

data = {
    "title": "Lecture 23 — Recursive Countdown",
    "subtitle": "Follow the base-case check, smaller recursive calls, printed output, and reverse-order returns.",
    "programs": [{
        "id": "countdown",
        "title": "Count down from 3",
        "source": SOURCE,
        "steps": steps,
        "expectedOutput": "3\n2\n1\nGo!\n",
    }],
}
(HERE / "trace-data.json").write_text(json.dumps(data, indent=2) + "\n")
(HERE / "trace-data.js").write_text("window.TRACE_SET = " + json.dumps(data, indent=2) + ";\n")
(HERE / "expected-output" / "Slide08_CountDown.txt").write_text(data["programs"][0]["expectedOutput"])
print(f"Generated {len(steps)} complete execution steps.")
