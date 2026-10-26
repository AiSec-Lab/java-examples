window.TRACE_SET = {
  "title": "Lecture 23 \u2014 Recursive Countdown",
  "subtitle": "Follow the base-case check, smaller recursive calls, printed output, and reverse-order returns.",
  "programs": [
    {
      "id": "countdown",
      "title": "Count down from 3",
      "source": "/** Lecture 23, slide 6: trace a base case and recursive progress. */\npublic class Slide08_CountDown {\n    public static void countDown(int value) {\n        if (value <= 0) {\n            System.out.println(\"Go!\");\n            return;\n        }\n        System.out.println(value);\n\n        // Correct: the next call moves toward the base case.\n        countDown(value - 1);\n    }\n\n    public static void main(String[] args) {\n        countDown(3);\n    }\n}",
      "steps": [
        {
          "line": 14,
          "title": "Enter main",
          "reason": "This is the main method.",
          "phase": "Method entry",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "public static void main"
        },
        {
          "line": 15,
          "title": "Evaluate the initial argument",
          "reason": "The first call will receive the integer value 3.",
          "phase": "Argument evaluation",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "3"
        },
        {
          "line": 15,
          "title": "Call countDown(3)",
          "reason": "Suspend main until the countdown finishes.",
          "phase": "Method call",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "countDown(3)"
        },
        {
          "line": 3,
          "title": "Enter countDown(3)",
          "reason": "Create a new active call whose parameter value is 3.",
          "phase": "Method entry",
          "stack": [
            "main",
            "countDown(3) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3"
          },
          "focus": "countDown(int value)"
        },
        {
          "line": 4,
          "title": "Check the base case",
          "reason": "3 <= 0 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "countDown(3) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3"
          },
          "focus": "value <= 0",
          "reads": {
            "countDown(3) [frame 1]": "Read value from this exact active call."
          }
        },
        {
          "line": 8,
          "title": "Read the current value",
          "reason": "Read value = 3 from this call before printing it.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "countDown(3) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3"
          },
          "focus": "value",
          "reads": {
            "countDown(3) [frame 1]": "Read value from this exact active call."
          }
        },
        {
          "line": 8,
          "title": "Print 3",
          "reason": "Write the current value to standard output.",
          "phase": "Console output",
          "stack": [
            "main",
            "countDown(3) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3"
          },
          "focus": "System.out.println(value)",
          "output": "3"
        },
        {
          "line": 11,
          "title": "Calculate the smaller argument",
          "reason": "value - 1 is 2. The current call keeps value = 3 while the child runs.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "countDown(3) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)"
          },
          "focus": "value - 1",
          "reads": {
            "countDown(3) [frame 1]": "Read value from this exact active call."
          }
        },
        {
          "line": 11,
          "title": "Call countDown(2)",
          "reason": "Suspend this call and enter the same method with the smaller value.",
          "phase": "Method call",
          "stack": [
            "main",
            "countDown(3) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)"
          },
          "focus": "countDown(value - 1)"
        },
        {
          "line": 3,
          "title": "Enter countDown(2)",
          "reason": "Create a new active call whose parameter value is 2.",
          "phase": "Method entry",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2"
          },
          "focus": "countDown(int value)"
        },
        {
          "line": 4,
          "title": "Check the base case",
          "reason": "2 <= 0 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2"
          },
          "focus": "value <= 0",
          "reads": {
            "countDown(2) [frame 2]": "Read value from this exact active call."
          }
        },
        {
          "line": 8,
          "title": "Read the current value",
          "reason": "Read value = 2 from this call before printing it.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2"
          },
          "focus": "value",
          "reads": {
            "countDown(2) [frame 2]": "Read value from this exact active call."
          }
        },
        {
          "line": 8,
          "title": "Print 2",
          "reason": "Write the current value to standard output.",
          "phase": "Console output",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2"
          },
          "focus": "System.out.println(value)",
          "output": "2"
        },
        {
          "line": 11,
          "title": "Calculate the smaller argument",
          "reason": "value - 1 is 1. The current call keeps value = 2 while the child runs.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)"
          },
          "focus": "value - 1",
          "reads": {
            "countDown(2) [frame 2]": "Read value from this exact active call."
          }
        },
        {
          "line": 11,
          "title": "Call countDown(1)",
          "reason": "Suspend this call and enter the same method with the smaller value.",
          "phase": "Method call",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)"
          },
          "focus": "countDown(value - 1)"
        },
        {
          "line": 3,
          "title": "Enter countDown(1)",
          "reason": "Create a new active call whose parameter value is 1.",
          "phase": "Method entry",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1"
          },
          "focus": "countDown(int value)"
        },
        {
          "line": 4,
          "title": "Check the base case",
          "reason": "1 <= 0 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1"
          },
          "focus": "value <= 0",
          "reads": {
            "countDown(1) [frame 3]": "Read value from this exact active call."
          }
        },
        {
          "line": 8,
          "title": "Read the current value",
          "reason": "Read value = 1 from this call before printing it.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1"
          },
          "focus": "value",
          "reads": {
            "countDown(1) [frame 3]": "Read value from this exact active call."
          }
        },
        {
          "line": 8,
          "title": "Print 1",
          "reason": "Write the current value to standard output.",
          "phase": "Console output",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1"
          },
          "focus": "System.out.println(value)",
          "output": "1"
        },
        {
          "line": 11,
          "title": "Calculate the smaller argument",
          "reason": "value - 1 is 0. The current call keeps value = 1 while the child runs.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1; waiting for countDown(0)"
          },
          "focus": "value - 1",
          "reads": {
            "countDown(1) [frame 3]": "Read value from this exact active call."
          }
        },
        {
          "line": 11,
          "title": "Call countDown(0)",
          "reason": "Suspend this call and enter the same method with the smaller value.",
          "phase": "Method call",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1; waiting for countDown(0)"
          },
          "focus": "countDown(value - 1)"
        },
        {
          "line": 3,
          "title": "Enter countDown(0)",
          "reason": "Create a new active call whose parameter value is 0.",
          "phase": "Method entry",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]",
            "countDown(0) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1; waiting for countDown(0)",
            "countDown(0) [frame 4]": "value = 0"
          },
          "focus": "countDown(int value)"
        },
        {
          "line": 4,
          "title": "Check the base case",
          "reason": "0 <= 0 is true.",
          "phase": "Condition",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]",
            "countDown(0) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1; waiting for countDown(0)",
            "countDown(0) [frame 4]": "value = 0"
          },
          "focus": "value <= 0",
          "reads": {
            "countDown(0) [frame 4]": "Read value from this exact active call."
          }
        },
        {
          "line": 5,
          "title": "Evaluate the output",
          "reason": "The base case prepares the text \"Go!\".",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]",
            "countDown(0) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1; waiting for countDown(0)",
            "countDown(0) [frame 4]": "value = 0"
          },
          "focus": "\"Go!\""
        },
        {
          "line": 5,
          "title": "Print Go!",
          "reason": "The base case writes its message to standard output.",
          "phase": "Console output",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]",
            "countDown(0) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1; waiting for countDown(0)",
            "countDown(0) [frame 4]": "value = 0"
          },
          "focus": "System.out.println(\"Go!\")",
          "output": "Go!"
        },
        {
          "line": 6,
          "title": "Return from the base case",
          "reason": "This call stops without making another recursive call.",
          "phase": "Return",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]",
            "countDown(0) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1; waiting for countDown(0)",
            "countDown(0) [frame 4]": "value = 0"
          },
          "focus": "return"
        },
        {
          "line": 11,
          "title": "Resume countDown(1)",
          "reason": "countDown(0) has returned, so countDown(1) resumes after its recursive call.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1; child returned"
          },
          "focus": "countDown(value - 1)"
        },
        {
          "line": 12,
          "title": "Finish countDown(1)",
          "reason": "No statements remain in this void method, so the call returns to its caller.",
          "phase": "Method return",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]",
            "countDown(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; waiting for countDown(1)",
            "countDown(1) [frame 3]": "value = 1; child returned"
          },
          "focus": "}"
        },
        {
          "line": 11,
          "title": "Resume countDown(2)",
          "reason": "countDown(1) has returned, so countDown(2) resumes after its recursive call.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; child returned"
          },
          "focus": "countDown(value - 1)"
        },
        {
          "line": 12,
          "title": "Finish countDown(2)",
          "reason": "No statements remain in this void method, so the call returns to its caller.",
          "phase": "Method return",
          "stack": [
            "main",
            "countDown(3) [frame 1]",
            "countDown(2) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; waiting for countDown(2)",
            "countDown(2) [frame 2]": "value = 2; child returned"
          },
          "focus": "}"
        },
        {
          "line": 11,
          "title": "Resume countDown(3)",
          "reason": "countDown(2) has returned, so countDown(3) resumes after its recursive call.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "countDown(3) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; child returned"
          },
          "focus": "countDown(value - 1)"
        },
        {
          "line": 12,
          "title": "Finish countDown(3)",
          "reason": "No statements remain in this void method, so the call returns to its caller.",
          "phase": "Method return",
          "stack": [
            "main",
            "countDown(3) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "countDown(3) [frame 1]": "value = 3; child returned"
          },
          "focus": "}"
        },
        {
          "line": 15,
          "title": "Resume main",
          "reason": "countDown(3) has returned. Main has no remaining work.",
          "phase": "Return to caller",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "countDown(3)"
        },
        {
          "line": 16,
          "title": "Finish main",
          "reason": "Program execution is complete.",
          "phase": "Method return",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "}"
        }
      ],
      "expectedOutput": "3\n2\n1\nGo!\n"
    }
  ]
};
