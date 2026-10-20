window.TRACE_SET = {
  "title": "Exercise 5 \u2014 Recursion",
  "subtitle": "Follow every argument, base-case decision, suspended call, return, and assignment. Java source execution, not compilation.",
  "programs": [
    {
      "title": "Problem 1 \u2014 Smaller calls and unwinding",
      "source": "public class Recursion05Puzzle {\n    static int puzzle(int x) {\n        if (x <= 0) {\n            return 0;\n        }\n        int rest = puzzle(x - 2);\n        int result = x + rest;\n        return result;\n    }\n    public static void main(String[] args) {\n        int result = puzzle(5);\n        System.out.println(result);\n    }\n}",
      "steps": [
        {
          "line": 10,
          "title": "Enter main",
          "reason": "Execution begins in main. No recursive frames exist yet.",
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
          "line": 11,
          "title": "Evaluate initial arguments",
          "reason": "Evaluate the argument values in main before entering the first recursive call.",
          "phase": "Argument evaluation",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "5"
        },
        {
          "line": 11,
          "title": "Call from main",
          "reason": "Suspend main until the recursive method returns its result.",
          "phase": "Method call",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "puzzle(5)"
        },
        {
          "line": 2,
          "title": "Enter puzzle(5)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "puzzle(5) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5"
          },
          "focus": "static int puzzle"
        },
        {
          "line": 3,
          "title": "Check the base case",
          "reason": "5 <= 0 is false. Continue to the smaller problem.",
          "phase": "Condition",
          "stack": [
            "main",
            "puzzle(5) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5"
          },
          "focus": "x <= 0",
          "reads": {
            "puzzle(5) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate recursive argument",
          "reason": "x - 2 = 3. This frame keeps x = 5; it does not change when the child receives its parameter.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "puzzle(5) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)"
          },
          "focus": "x - 2",
          "reads": {
            "puzzle(5) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Call the smaller problem",
          "reason": "Suspend this frame. rest has not been assigned because the child must return first.",
          "phase": "Method call",
          "stack": [
            "main",
            "puzzle(5) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)"
          },
          "focus": "puzzle(x - 2)"
        },
        {
          "line": 2,
          "title": "Enter puzzle(3)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3"
          },
          "focus": "static int puzzle"
        },
        {
          "line": 3,
          "title": "Check the base case",
          "reason": "3 <= 0 is false. Continue to the smaller problem.",
          "phase": "Condition",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3"
          },
          "focus": "x <= 0",
          "reads": {
            "puzzle(3) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate recursive argument",
          "reason": "x - 2 = 1. This frame keeps x = 3; it does not change when the child receives its parameter.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)"
          },
          "focus": "x - 2",
          "reads": {
            "puzzle(3) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Call the smaller problem",
          "reason": "Suspend this frame. rest has not been assigned because the child must return first.",
          "phase": "Method call",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)"
          },
          "focus": "puzzle(x - 2)"
        },
        {
          "line": 2,
          "title": "Enter puzzle(1)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1"
          },
          "focus": "static int puzzle"
        },
        {
          "line": 3,
          "title": "Check the base case",
          "reason": "1 <= 0 is false. Continue to the smaller problem.",
          "phase": "Condition",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1"
          },
          "focus": "x <= 0",
          "reads": {
            "puzzle(1) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate recursive argument",
          "reason": "x - 2 = -1. This frame keeps x = 1; it does not change when the child receives its parameter.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; pending = 1 + result of puzzle(-1)"
          },
          "focus": "x - 2",
          "reads": {
            "puzzle(1) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Call the smaller problem",
          "reason": "Suspend this frame. rest has not been assigned because the child must return first.",
          "phase": "Method call",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; pending = 1 + result of puzzle(-1)"
          },
          "focus": "puzzle(x - 2)"
        },
        {
          "line": 2,
          "title": "Enter puzzle(-1)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]",
            "puzzle(-1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; pending = 1 + result of puzzle(-1)",
            "puzzle(-1) [frame 4]": "x = -1"
          },
          "focus": "static int puzzle"
        },
        {
          "line": 3,
          "title": "Check the base case",
          "reason": "-1 <= 0 is true. Return zero without another call.",
          "phase": "Condition",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]",
            "puzzle(-1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; pending = 1 + result of puzzle(-1)",
            "puzzle(-1) [frame 4]": "x = -1"
          },
          "focus": "x <= 0",
          "reads": {
            "puzzle(-1) [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 4,
          "title": "Return the base value",
          "reason": "This frame returns 0; its caller will resume at the recursive-call expression.",
          "phase": "Return",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]",
            "puzzle(-1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; pending = 1 + result of puzzle(-1)",
            "puzzle(-1) [frame 4]": "x = -1"
          },
          "focus": "return 0;"
        },
        {
          "line": 6,
          "title": "Resume the caller",
          "reason": "The child returns 0; execution resumes in this exact caller frame.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; pending = 1 + result of puzzle(-1)"
          },
          "focus": "puzzle(x - 2)"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Store 0 in this frame's rest variable.",
          "phase": "Assignment",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; rest = 0"
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Evaluate the addition",
          "reason": "1 + 0 = 1.",
          "phase": "Expression",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; rest = 0"
          },
          "focus": "x + rest",
          "reads": {
            "puzzle(1) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 7,
          "title": "Store result",
          "reason": "The result local belongs to this call frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; rest = 0; result = 1"
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return 1",
          "reason": "Pass the result back to this frame's caller, then discard this frame.",
          "phase": "Return",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]",
            "puzzle(1) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)",
            "puzzle(1) [frame 3]": "x = 1; rest = 0; result = 1"
          },
          "focus": "return result;",
          "reads": {
            "puzzle(1) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Resume the caller",
          "reason": "The child returns 1; execution resumes in this exact caller frame.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; pending = 3 + result of puzzle(1)"
          },
          "focus": "puzzle(x - 2)"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Store 1 in this frame's rest variable.",
          "phase": "Assignment",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; rest = 1"
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Evaluate the addition",
          "reason": "3 + 1 = 4.",
          "phase": "Expression",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; rest = 1"
          },
          "focus": "x + rest",
          "reads": {
            "puzzle(3) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 7,
          "title": "Store result",
          "reason": "The result local belongs to this call frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; rest = 1; result = 4"
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return 4",
          "reason": "Pass the result back to this frame's caller, then discard this frame.",
          "phase": "Return",
          "stack": [
            "main",
            "puzzle(5) [frame 1]",
            "puzzle(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)",
            "puzzle(3) [frame 2]": "x = 3; rest = 1; result = 4"
          },
          "focus": "return result;",
          "reads": {
            "puzzle(3) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Resume the caller",
          "reason": "The child returns 4; execution resumes in this exact caller frame.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "puzzle(5) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; pending = 5 + result of puzzle(3)"
          },
          "focus": "puzzle(x - 2)"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Store 4 in this frame's rest variable.",
          "phase": "Assignment",
          "stack": [
            "main",
            "puzzle(5) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; rest = 4"
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Evaluate the addition",
          "reason": "5 + 4 = 9.",
          "phase": "Expression",
          "stack": [
            "main",
            "puzzle(5) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; rest = 4"
          },
          "focus": "x + rest",
          "reads": {
            "puzzle(5) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 7,
          "title": "Store result",
          "reason": "The result local belongs to this call frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "puzzle(5) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; rest = 4; result = 9"
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return 9",
          "reason": "Pass the result back to this frame's caller, then discard this frame.",
          "phase": "Return",
          "stack": [
            "main",
            "puzzle(5) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "puzzle(5) [frame 1]": "x = 5; rest = 4; result = 9"
          },
          "focus": "return result;",
          "reads": {
            "puzzle(5) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 11,
          "title": "Receive final result",
          "reason": "The recursive call has returned 9; main resumes before its assignment.",
          "phase": "Return to caller",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "puzzle(5)"
        },
        {
          "line": 11,
          "title": "Store main result",
          "reason": "Assign the returned value to main.result.",
          "phase": "Assignment",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 9"
          },
          "focus": "result"
        },
        {
          "line": 12,
          "title": "Read result for output",
          "reason": "The println argument reads main.result = 9.",
          "phase": "Argument evaluation",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 9"
          },
          "focus": "result",
          "reads": {
            "main": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 12,
          "title": "Print result",
          "reason": "println emits this value and a newline.",
          "phase": "Console output",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 9"
          },
          "focus": "System.out.println(result)",
          "output": "9"
        },
        {
          "line": 10,
          "title": "Return from main",
          "reason": "All work in main is complete. The program ends.",
          "phase": "Method exit",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 9"
          },
          "focus": "public static void main"
        }
      ],
      "expectedOutput": "9\n",
      "id": "puzzle"
    },
    {
      "title": "Problem 2 \u2014 Factorial and separate locals",
      "source": "public class Recursion05Factorial {\n    static long factorial(int n) {\n        if (n < 0) {\n            throw new IllegalArgumentException(\"n cannot be negative\");\n        }\n        if (n == 0) {\n            return 1;\n        }\n        long rest = factorial(n - 1);\n        long result = n * rest;\n        return result;\n    }\n    public static void main(String[] args) {\n        long result = factorial(4);\n        System.out.println(result);\n    }\n}",
      "steps": [
        {
          "line": 13,
          "title": "Enter main",
          "reason": "Execution begins in main. No recursive frames exist yet.",
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
          "line": 14,
          "title": "Evaluate initial argument",
          "reason": "Pass the value 4 from main.",
          "phase": "Argument evaluation",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "4"
        },
        {
          "line": 14,
          "title": "Call from main",
          "reason": "Suspend main until factorial returns.",
          "phase": "Method call",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "factorial(4)"
        },
        {
          "line": 2,
          "title": "Enter factorial(4)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4"
          },
          "focus": "static long factorial"
        },
        {
          "line": 3,
          "title": "Validate the argument",
          "reason": "4 < 0 is false. The nonnegative argument is valid; the exception branch is not executed.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4"
          },
          "focus": "n < 0",
          "reads": {
            "factorial(4) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Check the base case",
          "reason": "4 == 0 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4"
          },
          "focus": "n == 0",
          "reads": {
            "factorial(4) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Evaluate n - 1",
          "reason": "The child receives 3; this frame keeps n = 4.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)"
          },
          "focus": "n - 1",
          "reads": {
            "factorial(4) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Call factorial",
          "reason": "Suspend this call until the child returns; rest is not assigned yet.",
          "phase": "Method call",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)"
          },
          "focus": "factorial(n - 1)"
        },
        {
          "line": 2,
          "title": "Enter factorial(3)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3"
          },
          "focus": "static long factorial"
        },
        {
          "line": 3,
          "title": "Validate the argument",
          "reason": "3 < 0 is false. The nonnegative argument is valid; the exception branch is not executed.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3"
          },
          "focus": "n < 0",
          "reads": {
            "factorial(3) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Check the base case",
          "reason": "3 == 0 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3"
          },
          "focus": "n == 0",
          "reads": {
            "factorial(3) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Evaluate n - 1",
          "reason": "The child receives 2; this frame keeps n = 3.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)"
          },
          "focus": "n - 1",
          "reads": {
            "factorial(3) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Call factorial",
          "reason": "Suspend this call until the child returns; rest is not assigned yet.",
          "phase": "Method call",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)"
          },
          "focus": "factorial(n - 1)"
        },
        {
          "line": 2,
          "title": "Enter factorial(2)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2"
          },
          "focus": "static long factorial"
        },
        {
          "line": 3,
          "title": "Validate the argument",
          "reason": "2 < 0 is false. The nonnegative argument is valid; the exception branch is not executed.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2"
          },
          "focus": "n < 0",
          "reads": {
            "factorial(2) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Check the base case",
          "reason": "2 == 0 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2"
          },
          "focus": "n == 0",
          "reads": {
            "factorial(2) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Evaluate n - 1",
          "reason": "The child receives 1; this frame keeps n = 2.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)"
          },
          "focus": "n - 1",
          "reads": {
            "factorial(2) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Call factorial",
          "reason": "Suspend this call until the child returns; rest is not assigned yet.",
          "phase": "Method call",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)"
          },
          "focus": "factorial(n - 1)"
        },
        {
          "line": 2,
          "title": "Enter factorial(1)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1"
          },
          "focus": "static long factorial"
        },
        {
          "line": 3,
          "title": "Validate the argument",
          "reason": "1 < 0 is false. The nonnegative argument is valid; the exception branch is not executed.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1"
          },
          "focus": "n < 0",
          "reads": {
            "factorial(1) [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Check the base case",
          "reason": "1 == 0 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1"
          },
          "focus": "n == 0",
          "reads": {
            "factorial(1) [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Evaluate n - 1",
          "reason": "The child receives 0; this frame keeps n = 1.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; pending = 1 * result of factorial(0)"
          },
          "focus": "n - 1",
          "reads": {
            "factorial(1) [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Call factorial",
          "reason": "Suspend this call until the child returns; rest is not assigned yet.",
          "phase": "Method call",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; pending = 1 * result of factorial(0)"
          },
          "focus": "factorial(n - 1)"
        },
        {
          "line": 2,
          "title": "Enter factorial(0)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]",
            "factorial(0) [frame 5]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; pending = 1 * result of factorial(0)",
            "factorial(0) [frame 5]": "n = 0"
          },
          "focus": "static long factorial"
        },
        {
          "line": 3,
          "title": "Validate the argument",
          "reason": "0 < 0 is false. The nonnegative argument is valid; the exception branch is not executed.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]",
            "factorial(0) [frame 5]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; pending = 1 * result of factorial(0)",
            "factorial(0) [frame 5]": "n = 0"
          },
          "focus": "n < 0",
          "reads": {
            "factorial(0) [frame 5]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Check the base case",
          "reason": "0 == 0 is true.",
          "phase": "Condition",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]",
            "factorial(0) [frame 5]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; pending = 1 * result of factorial(0)",
            "factorial(0) [frame 5]": "n = 0"
          },
          "focus": "n == 0",
          "reads": {
            "factorial(0) [frame 5]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 7,
          "title": "Return the base value",
          "reason": "factorial(0) returns 1, matching Lecture 23. No child call is made.",
          "phase": "Return",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]",
            "factorial(0) [frame 5]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; pending = 1 * result of factorial(0)",
            "factorial(0) [frame 5]": "n = 0"
          },
          "focus": "return 1;"
        },
        {
          "line": 9,
          "title": "Resume the caller",
          "reason": "The smaller call returned 1.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; pending = 1 * result of factorial(0)"
          },
          "focus": "factorial(n - 1)"
        },
        {
          "line": 9,
          "title": "Assign rest",
          "reason": "Store long rest = 1 in this call.",
          "phase": "Assignment",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; rest = 1"
          },
          "focus": "rest"
        },
        {
          "line": 10,
          "title": "Multiply after return",
          "reason": "1 * 1 = 1.",
          "phase": "Expression",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; rest = 1"
          },
          "focus": "n * rest",
          "reads": {
            "factorial(1) [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 10,
          "title": "Assign result",
          "reason": "The product is stored in this call frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; rest = 1; result = 1"
          },
          "focus": "result"
        },
        {
          "line": 11,
          "title": "Return the product",
          "reason": "Return 1, then discard this frame.",
          "phase": "Return",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]",
            "factorial(1) [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)",
            "factorial(1) [frame 4]": "n = 1; rest = 1; result = 1"
          },
          "focus": "return result;",
          "reads": {
            "factorial(1) [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Resume the caller",
          "reason": "The smaller call returned 1.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; pending = 2 * result of factorial(1)"
          },
          "focus": "factorial(n - 1)"
        },
        {
          "line": 9,
          "title": "Assign rest",
          "reason": "Store long rest = 1 in this call.",
          "phase": "Assignment",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; rest = 1"
          },
          "focus": "rest"
        },
        {
          "line": 10,
          "title": "Multiply after return",
          "reason": "2 * 1 = 2.",
          "phase": "Expression",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; rest = 1"
          },
          "focus": "n * rest",
          "reads": {
            "factorial(2) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 10,
          "title": "Assign result",
          "reason": "The product is stored in this call frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; rest = 1; result = 2"
          },
          "focus": "result"
        },
        {
          "line": 11,
          "title": "Return the product",
          "reason": "Return 2, then discard this frame.",
          "phase": "Return",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]",
            "factorial(2) [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)",
            "factorial(2) [frame 3]": "n = 2; rest = 1; result = 2"
          },
          "focus": "return result;",
          "reads": {
            "factorial(2) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Resume the caller",
          "reason": "The smaller call returned 2.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; pending = 3 * result of factorial(2)"
          },
          "focus": "factorial(n - 1)"
        },
        {
          "line": 9,
          "title": "Assign rest",
          "reason": "Store long rest = 2 in this call.",
          "phase": "Assignment",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; rest = 2"
          },
          "focus": "rest"
        },
        {
          "line": 10,
          "title": "Multiply after return",
          "reason": "3 * 2 = 6.",
          "phase": "Expression",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; rest = 2"
          },
          "focus": "n * rest",
          "reads": {
            "factorial(3) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 10,
          "title": "Assign result",
          "reason": "The product is stored in this call frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; rest = 2; result = 6"
          },
          "focus": "result"
        },
        {
          "line": 11,
          "title": "Return the product",
          "reason": "Return 6, then discard this frame.",
          "phase": "Return",
          "stack": [
            "main",
            "factorial(4) [frame 1]",
            "factorial(3) [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)",
            "factorial(3) [frame 2]": "n = 3; rest = 2; result = 6"
          },
          "focus": "return result;",
          "reads": {
            "factorial(3) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 9,
          "title": "Resume the caller",
          "reason": "The smaller call returned 6.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; pending = 4 * result of factorial(3)"
          },
          "focus": "factorial(n - 1)"
        },
        {
          "line": 9,
          "title": "Assign rest",
          "reason": "Store long rest = 6 in this call.",
          "phase": "Assignment",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; rest = 6"
          },
          "focus": "rest"
        },
        {
          "line": 10,
          "title": "Multiply after return",
          "reason": "4 * 6 = 24.",
          "phase": "Expression",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; rest = 6"
          },
          "focus": "n * rest",
          "reads": {
            "factorial(4) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 10,
          "title": "Assign result",
          "reason": "The product is stored in this call frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; rest = 6; result = 24"
          },
          "focus": "result"
        },
        {
          "line": 11,
          "title": "Return the product",
          "reason": "Return 24, then discard this frame.",
          "phase": "Return",
          "stack": [
            "main",
            "factorial(4) [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "factorial(4) [frame 1]": "n = 4; rest = 6; result = 24"
          },
          "focus": "return result;",
          "reads": {
            "factorial(4) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 14,
          "title": "Receive final result",
          "reason": "The recursive call returned 24; main resumes before its assignment.",
          "phase": "Return to caller",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "factorial(4)"
        },
        {
          "line": 14,
          "title": "Assign main result",
          "reason": "Store the long result 24 in main.",
          "phase": "Assignment",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 24"
          },
          "focus": "result"
        },
        {
          "line": 15,
          "title": "Read the result",
          "reason": "Read main.result for println.",
          "phase": "Argument evaluation",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 24"
          },
          "focus": "result",
          "reads": {
            "main": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 15,
          "title": "Print the result",
          "reason": "Emit 24 followed by a newline.",
          "phase": "Console output",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 24"
          },
          "focus": "System.out.println(result)",
          "output": "24"
        },
        {
          "line": 13,
          "title": "Return from main",
          "reason": "The program has completed.",
          "phase": "Method exit",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 24"
          },
          "focus": "public static void main"
        }
      ],
      "expectedOutput": "24\n",
      "id": "factorial"
    },
    {
      "title": "Problem 3 \u2014 Shared array, separate indices",
      "source": "public class Recursion05ArraySum {\n    static int sum(int[] values, int index) {\n        if (index == values.length) {\n            return 0;\n        }\n        int rest = sum(values, index + 1);\n        int result = values[index] + rest;\n        return result;\n    }\n    public static void main(String[] args) {\n        int[] values = {4, 7, 2, 5};\n        int result = sum(values, 0);\n        System.out.println(result);\n    }\n}",
      "steps": [
        {
          "line": 10,
          "title": "Enter main",
          "reason": "Execution begins in main. No recursive frames exist yet.",
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
          "line": 11,
          "title": "Create one array",
          "reason": "The array lives on the heap. main.values holds a reference to @A.",
          "phase": "Initialization",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A"
          },
          "focus": "{4, 7, 2, 5}"
        },
        {
          "line": 12,
          "title": "Evaluate initial arguments",
          "reason": "Evaluate the argument values in main before entering the first recursive call.",
          "phase": "Argument evaluation",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A"
          },
          "focus": "values, 0"
        },
        {
          "line": 12,
          "title": "Call from main",
          "reason": "Suspend main until the recursive method returns its result.",
          "phase": "Method call",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A"
          },
          "focus": "sum(values, 0)"
        },
        {
          "line": 2,
          "title": "Enter sum(@A, 0)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0"
          },
          "focus": "static int sum"
        },
        {
          "line": 3,
          "title": "Check the end position",
          "reason": "0 == 4 is false. The base case is checked before any array access.",
          "phase": "Condition",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0"
          },
          "focus": "index == values.length",
          "reads": {
            "sum(@A, 0) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate the next arguments",
          "reason": "Pass the same @A reference value and the new index 1; no array copy is created.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result"
          },
          "focus": "values, index + 1",
          "reads": {
            "array @A": "Pass a reference to this same array."
          }
        },
        {
          "line": 6,
          "title": "Call sum for the suffix",
          "reason": "The parent keeps its index while the child receives its own index parameter.",
          "phase": "Method call",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result"
          },
          "focus": "sum(values, index + 1)"
        },
        {
          "line": 2,
          "title": "Enter sum(@A, 1)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1"
          },
          "focus": "static int sum"
        },
        {
          "line": 3,
          "title": "Check the end position",
          "reason": "1 == 4 is false. The base case is checked before any array access.",
          "phase": "Condition",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1"
          },
          "focus": "index == values.length",
          "reads": {
            "sum(@A, 1) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate the next arguments",
          "reason": "Pass the same @A reference value and the new index 2; no array copy is created.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result"
          },
          "focus": "values, index + 1",
          "reads": {
            "array @A": "Pass a reference to this same array."
          }
        },
        {
          "line": 6,
          "title": "Call sum for the suffix",
          "reason": "The parent keeps its index while the child receives its own index parameter.",
          "phase": "Method call",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result"
          },
          "focus": "sum(values, index + 1)"
        },
        {
          "line": 2,
          "title": "Enter sum(@A, 2)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2"
          },
          "focus": "static int sum"
        },
        {
          "line": 3,
          "title": "Check the end position",
          "reason": "2 == 4 is false. The base case is checked before any array access.",
          "phase": "Condition",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2"
          },
          "focus": "index == values.length",
          "reads": {
            "sum(@A, 2) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate the next arguments",
          "reason": "Pass the same @A reference value and the new index 3; no array copy is created.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result"
          },
          "focus": "values, index + 1",
          "reads": {
            "array @A": "Pass a reference to this same array."
          }
        },
        {
          "line": 6,
          "title": "Call sum for the suffix",
          "reason": "The parent keeps its index while the child receives its own index parameter.",
          "phase": "Method call",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result"
          },
          "focus": "sum(values, index + 1)"
        },
        {
          "line": 2,
          "title": "Enter sum(@A, 3)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3"
          },
          "focus": "static int sum"
        },
        {
          "line": 3,
          "title": "Check the end position",
          "reason": "3 == 4 is false. The base case is checked before any array access.",
          "phase": "Condition",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3"
          },
          "focus": "index == values.length",
          "reads": {
            "sum(@A, 3) [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate the next arguments",
          "reason": "Pass the same @A reference value and the new index 4; no array copy is created.",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; pending = @A[3] + child result"
          },
          "focus": "values, index + 1",
          "reads": {
            "array @A": "Pass a reference to this same array."
          }
        },
        {
          "line": 6,
          "title": "Call sum for the suffix",
          "reason": "The parent keeps its index while the child receives its own index parameter.",
          "phase": "Method call",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; pending = @A[3] + child result"
          },
          "focus": "sum(values, index + 1)"
        },
        {
          "line": 2,
          "title": "Enter sum(@A, 4)",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]",
            "sum(@A, 4) [frame 5]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; pending = @A[3] + child result",
            "sum(@A, 4) [frame 5]": "values = @A; index = 4"
          },
          "focus": "static int sum"
        },
        {
          "line": 3,
          "title": "Check the end position",
          "reason": "4 == 4 is true. The base case is checked before any array access.",
          "phase": "Condition",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]",
            "sum(@A, 4) [frame 5]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; pending = @A[3] + child result",
            "sum(@A, 4) [frame 5]": "values = @A; index = 4"
          },
          "focus": "index == values.length",
          "reads": {
            "sum(@A, 4) [frame 5]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 4,
          "title": "Return zero",
          "reason": "At index == length, do not read values[index]; that index is outside the array.",
          "phase": "Return",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]",
            "sum(@A, 4) [frame 5]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; pending = @A[3] + child result",
            "sum(@A, 4) [frame 5]": "values = @A; index = 4"
          },
          "focus": "return 0;"
        },
        {
          "line": 6,
          "title": "Resume the parent",
          "reason": "The suffix sum is 0. This frame still has index = 3.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; pending = @A[3] + child result"
          },
          "focus": "sum(values, index + 1)"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Store the suffix result in this frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; rest = 0"
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Read the actual array element",
          "reason": "@A[3] is 5; add rest 0 to produce 5.",
          "phase": "Expression",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; rest = 0"
          },
          "focus": "values[index] + rest",
          "reads": {
            "array @A": "Read element [3] = 5."
          }
        },
        {
          "line": 7,
          "title": "Store the sum",
          "reason": "The array itself remains unchanged.",
          "phase": "Assignment",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; rest = 0; result = 5"
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return this suffix sum",
          "reason": "Return 5 to the caller.",
          "phase": "Return",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]",
            "sum(@A, 3) [frame 4]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result",
            "sum(@A, 3) [frame 4]": "values = @A; index = 3; rest = 0; result = 5"
          },
          "focus": "return result;",
          "reads": {
            "sum(@A, 3) [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Resume the parent",
          "reason": "The suffix sum is 5. This frame still has index = 2.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; pending = @A[2] + child result"
          },
          "focus": "sum(values, index + 1)"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Store the suffix result in this frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; rest = 5"
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Read the actual array element",
          "reason": "@A[2] is 2; add rest 5 to produce 7.",
          "phase": "Expression",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; rest = 5"
          },
          "focus": "values[index] + rest",
          "reads": {
            "array @A": "Read element [2] = 2."
          }
        },
        {
          "line": 7,
          "title": "Store the sum",
          "reason": "The array itself remains unchanged.",
          "phase": "Assignment",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; rest = 5; result = 7"
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return this suffix sum",
          "reason": "Return 7 to the caller.",
          "phase": "Return",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]",
            "sum(@A, 2) [frame 3]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result",
            "sum(@A, 2) [frame 3]": "values = @A; index = 2; rest = 5; result = 7"
          },
          "focus": "return result;",
          "reads": {
            "sum(@A, 2) [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Resume the parent",
          "reason": "The suffix sum is 7. This frame still has index = 1.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; pending = @A[1] + child result"
          },
          "focus": "sum(values, index + 1)"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Store the suffix result in this frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; rest = 7"
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Read the actual array element",
          "reason": "@A[1] is 7; add rest 7 to produce 14.",
          "phase": "Expression",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; rest = 7"
          },
          "focus": "values[index] + rest",
          "reads": {
            "array @A": "Read element [1] = 7."
          }
        },
        {
          "line": 7,
          "title": "Store the sum",
          "reason": "The array itself remains unchanged.",
          "phase": "Assignment",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; rest = 7; result = 14"
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return this suffix sum",
          "reason": "Return 14 to the caller.",
          "phase": "Return",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]",
            "sum(@A, 1) [frame 2]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result",
            "sum(@A, 1) [frame 2]": "values = @A; index = 1; rest = 7; result = 14"
          },
          "focus": "return result;",
          "reads": {
            "sum(@A, 1) [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Resume the parent",
          "reason": "The suffix sum is 14. This frame still has index = 0.",
          "phase": "Return to caller",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; pending = @A[0] + child result"
          },
          "focus": "sum(values, index + 1)"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Store the suffix result in this frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; rest = 14"
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Read the actual array element",
          "reason": "@A[0] is 4; add rest 14 to produce 18.",
          "phase": "Expression",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; rest = 14"
          },
          "focus": "values[index] + rest",
          "reads": {
            "array @A": "Read element [0] = 4."
          }
        },
        {
          "line": 7,
          "title": "Store the sum",
          "reason": "The array itself remains unchanged.",
          "phase": "Assignment",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; rest = 14; result = 18"
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return this suffix sum",
          "reason": "Return 18 to the caller.",
          "phase": "Return",
          "stack": [
            "main",
            "sum(@A, 0) [frame 1]"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A",
            "sum(@A, 0) [frame 1]": "values = @A; index = 0; rest = 14; result = 18"
          },
          "focus": "return result;",
          "reads": {
            "sum(@A, 0) [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 12,
          "title": "Receive final result",
          "reason": "The recursive call has returned 18; main resumes before its assignment.",
          "phase": "Return to caller",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A"
          },
          "focus": "sum(values, 0)"
        },
        {
          "line": 12,
          "title": "Store main result",
          "reason": "Assign the returned value to main.result.",
          "phase": "Assignment",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A; result = 18"
          },
          "focus": "result"
        },
        {
          "line": 13,
          "title": "Read result for output",
          "reason": "The println argument reads main.result = 18.",
          "phase": "Argument evaluation",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A; result = 18"
          },
          "focus": "result",
          "reads": {
            "main": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 13,
          "title": "Print result",
          "reason": "println emits this value and a newline.",
          "phase": "Console output",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A; result = 18"
          },
          "focus": "System.out.println(result)",
          "output": "18"
        },
        {
          "line": 10,
          "title": "Return from main",
          "reason": "All work in main is complete. The program ends.",
          "phase": "Method exit",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "array @A": "int[] {4, 7, 2, 5}",
            "main": "values = @A; result = 18"
          },
          "focus": "public static void main"
        }
      ],
      "expectedOutput": "18\n",
      "id": "array-sum"
    },
    {
      "title": "Problem 4 \u2014 Reverse a string on return",
      "source": "public class Recursion05Reverse {\n    static String reverse(String text) {\n        if (text.length() <= 1) {\n            return text;\n        }\n        String rest = reverse(text.substring(1));\n        String result = rest + text.charAt(0);\n        return result;\n    }\n    public static void main(String[] args) {\n        String result = reverse(\"code\");\n        System.out.println(result);\n    }\n}",
      "steps": [
        {
          "line": 10,
          "title": "Enter main",
          "reason": "Execution begins in main. No recursive frames exist yet.",
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
          "line": 11,
          "title": "Evaluate initial arguments",
          "reason": "Evaluate the argument values in main before entering the first recursive call.",
          "phase": "Argument evaluation",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "\"code\""
        },
        {
          "line": 11,
          "title": "Call from main",
          "reason": "Suspend main until the recursive method returns its result.",
          "phase": "Method call",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "reverse(\"code\")"
        },
        {
          "line": 2,
          "title": "Enter reverse(\"code\")",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\""
          },
          "focus": "static String reverse"
        },
        {
          "line": 3,
          "title": "Check the string length",
          "reason": "length 4 <= 1 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\""
          },
          "focus": "text.length() <= 1",
          "reads": {
            "reverse(\"code\") [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate substring(1)",
          "reason": "The argument is \"ode\". The immutable string held by this frame remains \"code\".",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\""
          },
          "focus": "text.substring(1)",
          "reads": {
            "reverse(\"code\") [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Call reverse on the suffix",
          "reason": "Suspend the parent; no concatenation happens yet.",
          "phase": "Method call",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\""
          },
          "focus": "reverse(text.substring(1))"
        },
        {
          "line": 2,
          "title": "Enter reverse(\"ode\")",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\""
          },
          "focus": "static String reverse"
        },
        {
          "line": 3,
          "title": "Check the string length",
          "reason": "length 3 <= 1 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\""
          },
          "focus": "text.length() <= 1",
          "reads": {
            "reverse(\"ode\") [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate substring(1)",
          "reason": "The argument is \"de\". The immutable string held by this frame remains \"ode\".",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\""
          },
          "focus": "text.substring(1)",
          "reads": {
            "reverse(\"ode\") [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Call reverse on the suffix",
          "reason": "Suspend the parent; no concatenation happens yet.",
          "phase": "Method call",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\""
          },
          "focus": "reverse(text.substring(1))"
        },
        {
          "line": 2,
          "title": "Enter reverse(\"de\")",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\""
          },
          "focus": "static String reverse"
        },
        {
          "line": 3,
          "title": "Check the string length",
          "reason": "length 2 <= 1 is false.",
          "phase": "Condition",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\""
          },
          "focus": "text.length() <= 1",
          "reads": {
            "reverse(\"de\") [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Evaluate substring(1)",
          "reason": "The argument is \"e\". The immutable string held by this frame remains \"de\".",
          "phase": "Argument evaluation",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; pending = child result + first character of \"de\""
          },
          "focus": "text.substring(1)",
          "reads": {
            "reverse(\"de\") [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Call reverse on the suffix",
          "reason": "Suspend the parent; no concatenation happens yet.",
          "phase": "Method call",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; pending = child result + first character of \"de\""
          },
          "focus": "reverse(text.substring(1))"
        },
        {
          "line": 2,
          "title": "Enter reverse(\"e\")",
          "reason": "A new call frame receives its own parameter values. The caller is suspended.",
          "phase": "Method entry",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]",
            "reverse(\"e\") [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; pending = child result + first character of \"de\"",
            "reverse(\"e\") [frame 4]": "text = \"e\""
          },
          "focus": "static String reverse"
        },
        {
          "line": 3,
          "title": "Check the string length",
          "reason": "length 1 <= 1 is true.",
          "phase": "Condition",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]",
            "reverse(\"e\") [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; pending = child result + first character of \"de\"",
            "reverse(\"e\") [frame 4]": "text = \"e\""
          },
          "focus": "text.length() <= 1",
          "reads": {
            "reverse(\"e\") [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 4,
          "title": "Return the base string",
          "reason": "Return \"e\" without making another call.",
          "phase": "Return",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]",
            "reverse(\"e\") [frame 4]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; pending = child result + first character of \"de\"",
            "reverse(\"e\") [frame 4]": "text = \"e\""
          },
          "focus": "return text;",
          "reads": {
            "reverse(\"e\") [frame 4]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Resume the parent",
          "reason": "The child has returned \"e\".",
          "phase": "Return to caller",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; pending = child result + first character of \"de\""
          },
          "focus": "reverse(text.substring(1))"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Keep the returned string in this frame's local rest.",
          "phase": "Assignment",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; rest = \"e\""
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Read the first character",
          "reason": "For this frame text is \"de\", so text.charAt(0) is 'd'.",
          "phase": "Expression",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; rest = \"e\""
          },
          "focus": "text.charAt(0)",
          "reads": {
            "reverse(\"de\") [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 7,
          "title": "Concatenate after return",
          "reason": "\"e\" + 'd' produces \"ed\".",
          "phase": "Expression",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; rest = \"e\""
          },
          "focus": "rest + text.charAt(0)"
        },
        {
          "line": 7,
          "title": "Assign result",
          "reason": "Store the new string reference in this frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; rest = \"e\"; result = \"ed\""
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return the reversed string",
          "reason": "Return \"ed\" to this frame's caller.",
          "phase": "Return",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]",
            "reverse(\"de\") [frame 3]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\"",
            "reverse(\"de\") [frame 3]": "text = \"de\"; rest = \"e\"; result = \"ed\""
          },
          "focus": "return result;",
          "reads": {
            "reverse(\"de\") [frame 3]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Resume the parent",
          "reason": "The child has returned \"ed\".",
          "phase": "Return to caller",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; pending = child result + first character of \"ode\""
          },
          "focus": "reverse(text.substring(1))"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Keep the returned string in this frame's local rest.",
          "phase": "Assignment",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; rest = \"ed\""
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Read the first character",
          "reason": "For this frame text is \"ode\", so text.charAt(0) is 'o'.",
          "phase": "Expression",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; rest = \"ed\""
          },
          "focus": "text.charAt(0)",
          "reads": {
            "reverse(\"ode\") [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 7,
          "title": "Concatenate after return",
          "reason": "\"ed\" + 'o' produces \"edo\".",
          "phase": "Expression",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; rest = \"ed\""
          },
          "focus": "rest + text.charAt(0)"
        },
        {
          "line": 7,
          "title": "Assign result",
          "reason": "Store the new string reference in this frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; rest = \"ed\"; result = \"edo\""
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return the reversed string",
          "reason": "Return \"edo\" to this frame's caller.",
          "phase": "Return",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]",
            "reverse(\"ode\") [frame 2]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\"",
            "reverse(\"ode\") [frame 2]": "text = \"ode\"; rest = \"ed\"; result = \"edo\""
          },
          "focus": "return result;",
          "reads": {
            "reverse(\"ode\") [frame 2]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 6,
          "title": "Resume the parent",
          "reason": "The child has returned \"edo\".",
          "phase": "Return to caller",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; pending = child result + first character of \"code\""
          },
          "focus": "reverse(text.substring(1))"
        },
        {
          "line": 6,
          "title": "Assign rest",
          "reason": "Keep the returned string in this frame's local rest.",
          "phase": "Assignment",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; rest = \"edo\""
          },
          "focus": "rest"
        },
        {
          "line": 7,
          "title": "Read the first character",
          "reason": "For this frame text is \"code\", so text.charAt(0) is 'c'.",
          "phase": "Expression",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; rest = \"edo\""
          },
          "focus": "text.charAt(0)",
          "reads": {
            "reverse(\"code\") [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 7,
          "title": "Concatenate after return",
          "reason": "\"edo\" + 'c' produces \"edoc\".",
          "phase": "Expression",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; rest = \"edo\""
          },
          "focus": "rest + text.charAt(0)"
        },
        {
          "line": 7,
          "title": "Assign result",
          "reason": "Store the new string reference in this frame.",
          "phase": "Assignment",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; rest = \"edo\"; result = \"edoc\""
          },
          "focus": "result"
        },
        {
          "line": 8,
          "title": "Return the reversed string",
          "reason": "Return \"edoc\" to this frame's caller.",
          "phase": "Return",
          "stack": [
            "main",
            "reverse(\"code\") [frame 1]"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)",
            "reverse(\"code\") [frame 1]": "text = \"code\"; rest = \"edo\"; result = \"edoc\""
          },
          "focus": "return result;",
          "reads": {
            "reverse(\"code\") [frame 1]": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 11,
          "title": "Receive final result",
          "reason": "The recursive call has returned 'edoc'; main resumes before its assignment.",
          "phase": "Return to caller",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "(no locals yet)"
          },
          "focus": "reverse(\"code\")"
        },
        {
          "line": 11,
          "title": "Store main result",
          "reason": "Assign the returned value to main.result.",
          "phase": "Assignment",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 'edoc'"
          },
          "focus": "result"
        },
        {
          "line": 12,
          "title": "Read result for output",
          "reason": "The println argument reads main.result = 'edoc'.",
          "phase": "Argument evaluation",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 'edoc'"
          },
          "focus": "result",
          "reads": {
            "main": "Read this call frame, not the locals of another recursive call."
          }
        },
        {
          "line": 12,
          "title": "Print result",
          "reason": "println emits this value and a newline.",
          "phase": "Console output",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 'edoc'"
          },
          "focus": "System.out.println(result)",
          "output": "edoc"
        },
        {
          "line": 10,
          "title": "Return from main",
          "reason": "All work in main is complete. The program ends.",
          "phase": "Method exit",
          "stack": [
            "main"
          ],
          "stateSnapshot": {
            "main": "result = 'edoc'"
          },
          "focus": "public static void main"
        }
      ],
      "expectedOutput": "edoc\n",
      "id": "reverse"
    }
  ]
};
