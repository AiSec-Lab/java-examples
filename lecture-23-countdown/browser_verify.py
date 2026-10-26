from pathlib import Path
import json
import subprocess
import time
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
server = subprocess.Popen(
    ["python3", "-m", "http.server", "8765", "--bind", "127.0.0.1"],
    cwd=HERE,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)
try:
    time.sleep(0.4)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 980})
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto("http://127.0.0.1:8765/index.html#countdown")
        page.wait_for_selector(".code-line.active")
        assert page.locator("#counter").inner_text() == "1 / 34"
        assert page.locator("#step-title").inner_text() == "Enter main"
        paths = []
        for position in range(34):
            assert page.locator(".code-line.active .focus-box").count() == 1
            assert page.locator(".frame").count() >= 1
            paths.append(page.locator("#flow-path").get_attribute("d") or "")
            if position < 33:
                page.locator("#next").click()
        assert page.locator("#console-output").inner_text().strip() == "3\n2\n1\nGo!"
        final_path = paths[-1]
        page.locator("#previous").click()
        page.locator("#next").click()
        assert (page.locator("#flow-path").get_attribute("d") or "") == final_path
        assert not errors, errors
        page.screenshot(path=str(HERE / "preview.png"), full_page=True)
        browser.close()
    report = {
        "url": "index.html#countdown",
        "steps_checked": 34,
        "focus_box_on_every_step": True,
        "stack_on_every_step": True,
        "previous_next_arrow_stable": True,
        "console_output": ["3", "2", "1", "Go!"],
        "page_errors": [],
    }
    (HERE / "browser-verification.json").write_text(json.dumps(report, indent=2) + "\n")
    print("PASS: all 34 browser steps, focus boxes, call stacks, arrows, and output verified.")
finally:
    server.terminate()
    server.wait(timeout=5)
