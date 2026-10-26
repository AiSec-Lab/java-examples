from pathlib import Path
import json
import subprocess
import tempfile

HERE = Path(__file__).resolve().parent
JAVA = Path("/Library/Java/JavaVirtualMachines/amazon-corretto-21.jdk/Contents/Home/bin")
data = json.loads((HERE / "trace-data.json").read_text())
program = data["programs"][0]
source = (HERE / "java" / "Slide08_CountDown.java").read_text().rstrip()
assert program["source"] == source
with tempfile.TemporaryDirectory() as output:
    subprocess.run([str(JAVA / "javac"), "-d", output,
                    str(HERE / "java" / "Slide08_CountDown.java")], check=True)
    actual = subprocess.check_output(
        [str(JAVA / "java"), "-cp", output, "Slide08_CountDown"], text=True)
simulated = "\n".join(step["output"] for step in program["steps"] if "output" in step) + "\n"
assert actual == simulated == program["expectedOutput"]
assert [step["output"] for step in program["steps"] if "output" in step] == ["3", "2", "1", "Go!"]
assert sum(step["title"].startswith("Enter countDown") for step in program["steps"]) == 4
assert sum(step["title"].startswith("Check the base case") for step in program["steps"]) == 4
assert sum(step["title"].startswith("Resume countDown") for step in program["steps"]) == 3
for step in program["steps"]:
    assert step["focus"] in source.splitlines()[step["line"] - 1], step
    assert step["stack"]
    assert all(frame in step["stateSnapshot"] for frame in step["stack"])
print(f"PASS: {len(program['steps'])} steps; output and every call/check/return verified.")
