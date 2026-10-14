window.TRACE_SET = {
  "title": "Exercise 2 \u2014 Animated Java Traces",
  "subtitle": "Constructor chaining, static state, overloads, increment order, copies, aliases, and nested calls",
  "programs": [
    {
      "title": "Problem 1 \u2014 Chaining, Overloads, and Increment",
      "source": "public class Trace02Problem1 {\n    public static void main(String[] args) {\n        P1Meter a = new P1Meter(2);\n        P1Meter b = new P1Meter();\n        P1Meter alias = a;\n        System.out.println(\"A \" + a.value + \" \" + b.value + \" \" + P1Meter.total);\n        int r = a.shift(b.value++);\n        System.out.println(\"B \" + r + \" \" + a.value + \" \"\n                + b.value + \" \" + P1Meter.total);\n        b.value += a.shift((long) ++b.value);\n        System.out.println(\"C \" + a.value + \" \" + b.value + \" \" + P1Meter.total);\n        a = b;\n        int s = a.shift(alias.value);\n        System.out.println(\"D \" + s + \" \" + a.value + \" \" + alias.value\n                + \" \" + P1Meter.total + \" \" + (a == alias));\n    }\n}\nclass P1Meter {\n    static int total = 1;\n    int id = ++total;\n    int value = total;\n    P1Meter() {\n        this(total++);\n        value += total;\n        System.out.println(\"zero \" + id + \" \" + value + \" \" + total);\n    }\n    P1Meter(int n) {\n        this(n, n + 1);\n        total += n;\n        System.out.println(\"one \" + id + \" \" + value + \" \" + total);\n    }\n    P1Meter(int n, int extra) {\n        value += n + extra;\n        total += value;\n        System.out.println(\"two \" + id + \" \" + value + \" \" + total);\n    }\n    int shift(int n) {\n        value += n;\n        total += id;\n        return value + total;\n    }\n    int shift(long n) {\n        total += (int) n;\n        value -= id;\n        return value - total;\n    }\n}",
      "steps": [
        {
          "line": 19,
          "title": "Initialize static state",
          "reason": "P1Meter is initialized when first used. The one shared total field starts at 1.",
          "state": {
            "P1Meter.total": "1"
          },
          "stack": [
            "class initialization"
          ],
          "phase": "Class initialization"
        },
        {
          "line": 3,
          "title": "Call P1Meter(2)",
          "reason": "new allocates Meter@1 and selects the int constructor.",
          "state": {},
          "stack": [
            "main",
            "P1Meter(2)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 28,
          "title": "Delegate with this(2, 3)",
          "reason": "The int constructor must delegate before its own body. n+1 evaluates to 3.",
          "state": {},
          "stack": [
            "main",
            "P1Meter(2, 3)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 20,
          "title": "Run instance field initializer id",
          "reason": "Before the terminal constructor body, ++total changes 1 to 2 and assigns id=2.",
          "state": {
            "P1Meter.total": "2",
            "Meter@1": "{ id=2, value=0 }"
          },
          "stack": [
            "main",
            "P1Meter(2, 3)"
          ],
          "phase": "Pre-increment"
        },
        {
          "line": 21,
          "title": "Run instance field initializer value",
          "reason": "value reads the current shared total, which is 2.",
          "state": {
            "Meter@1": "{ id=2, value=2 }"
          },
          "stack": [
            "main",
            "P1Meter(2, 3)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 33,
          "title": "Add constructor arguments to value",
          "reason": "value becomes 2 + 2 + 3 = 7.",
          "state": {
            "Meter@1": "{ id=2, value=7 }"
          },
          "stack": [
            "main",
            "P1Meter(2, 3)"
          ],
          "phase": "Field update"
        },
        {
          "line": 34,
          "title": "Add value to static total",
          "reason": "The one shared total becomes 2 + 7 = 9.",
          "state": {
            "P1Meter.total": "9"
          },
          "stack": [
            "main",
            "P1Meter(2, 3)"
          ],
          "phase": "Static field update"
        },
        {
          "line": 35,
          "title": "Print terminal constructor state",
          "reason": "The two-argument constructor prints before returning to P1Meter(int).",
          "state": {},
          "stack": [
            "main",
            "P1Meter(2, 3)"
          ],
          "phase": "Console output",
          "output": "two 2 7 9"
        },
        {
          "line": 29,
          "title": "Continue P1Meter(int)",
          "reason": "After this(...) returns, total += n changes 9 to 11.",
          "state": {
            "P1Meter.total": "11"
          },
          "stack": [
            "main",
            "P1Meter(2)"
          ],
          "phase": "Constructor continuation"
        },
        {
          "line": 30,
          "title": "Print one-argument constructor state",
          "reason": "The delegated constructor chain now reports its state.",
          "state": {},
          "stack": [
            "main",
            "P1Meter(2)"
          ],
          "phase": "Console output",
          "output": "one 2 7 11"
        },
        {
          "line": 3,
          "title": "Assign a",
          "reason": "a receives Meter@1.",
          "state": {
            "a": "\u2192 Meter@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 4,
          "title": "Call P1Meter()",
          "reason": "The zero-argument constructor begins for Meter@2.",
          "state": {},
          "stack": [
            "main",
            "P1Meter()"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 23,
          "title": "Evaluate total++ for this(...)",
          "reason": "Post-increment passes old total 11 to P1Meter(int), then changes total to 12.",
          "state": {
            "P1Meter.total": "12",
            "delegated n": "11"
          },
          "stack": [
            "main",
            "P1Meter(11)"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 28,
          "title": "Delegate again",
          "reason": "P1Meter(11) delegates to P1Meter(11, 12).",
          "state": {},
          "stack": [
            "main",
            "P1Meter(11, 12)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 20,
          "title": "Initialize Meter@2 id",
          "reason": "++total changes 12 to 13; id receives 13.",
          "state": {
            "P1Meter.total": "13",
            "Meter@2": "{ id=13, value=0 }"
          },
          "stack": [
            "main",
            "P1Meter(11, 12)"
          ],
          "phase": "Pre-increment"
        },
        {
          "line": 21,
          "title": "Initialize Meter@2 value",
          "reason": "value receives current total 13.",
          "state": {
            "Meter@2": "{ id=13, value=13 }"
          },
          "stack": [
            "main",
            "P1Meter(11, 12)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 33,
          "title": "Apply n and extra",
          "reason": "value becomes 13 + 11 + 12 = 36.",
          "state": {
            "Meter@2": "{ id=13, value=36 }"
          },
          "stack": [
            "main",
            "P1Meter(11, 12)"
          ],
          "phase": "Field update"
        },
        {
          "line": 34,
          "title": "Add value to total",
          "reason": "total becomes 13 + 36 = 49.",
          "state": {
            "P1Meter.total": "49"
          },
          "stack": [
            "main",
            "P1Meter(11, 12)"
          ],
          "phase": "Static field update"
        },
        {
          "line": 35,
          "title": "Print two-argument constructor",
          "reason": "The innermost constructor prints first.",
          "state": {},
          "stack": [
            "main",
            "P1Meter(11, 12)"
          ],
          "phase": "Console output",
          "output": "two 13 36 49"
        },
        {
          "line": 29,
          "title": "Resume P1Meter(11)",
          "reason": "total += n changes 49 to 60.",
          "state": {
            "P1Meter.total": "60"
          },
          "stack": [
            "main",
            "P1Meter(11)"
          ],
          "phase": "Constructor continuation"
        },
        {
          "line": 30,
          "title": "Print int constructor",
          "reason": "The middle constructor prints next.",
          "state": {},
          "stack": [
            "main",
            "P1Meter(11)"
          ],
          "phase": "Console output",
          "output": "one 13 36 60"
        },
        {
          "line": 24,
          "title": "Resume zero-argument constructor",
          "reason": "value += total changes Meter@2.value from 36 to 96.",
          "state": {
            "Meter@2": "{ id=13, value=96 }"
          },
          "stack": [
            "main",
            "P1Meter()"
          ],
          "phase": "Constructor continuation"
        },
        {
          "line": 25,
          "title": "Print zero-argument constructor",
          "reason": "The outermost constructor prints last.",
          "state": {},
          "stack": [
            "main",
            "P1Meter()"
          ],
          "phase": "Console output",
          "output": "zero 13 96 60"
        },
        {
          "line": 4,
          "title": "Assign b",
          "reason": "b receives Meter@2.",
          "state": {
            "b": "\u2192 Meter@2"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 5,
          "title": "Create alias",
          "reason": "alias receives the same reference as a. No object is constructed.",
          "state": {
            "alias": "\u2192 Meter@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference assignment"
        },
        {
          "line": 6,
          "title": "Print checkpoint A",
          "reason": "Java reads a.value=7, b.value=96, and static total=60.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "A 7 96 60"
        },
        {
          "line": 7,
          "title": "Evaluate b.value++",
          "reason": "Post-increment produces argument 96, then changes Meter@2.value to 97.",
          "state": {
            "Meter@2": "{ id=13, value=97 }",
            "shift argument": "int 96"
          },
          "stack": [
            "main"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 7,
          "title": "Invoke a.shift(96)",
          "reason": "After b.value++ produces 96, Java invokes shift on Meter@1.",
          "state": {},
          "stack": [
            "main",
            "Meter@1.shift(int 96)"
          ],
          "phase": "Method call",
          "focus": "a.shift(b.value++)"
        },
        {
          "line": 37,
          "title": "Select shift(int)",
          "reason": "Because the argument is int, Java chooses shift(int), not shift(long). Receiver a is Meter@1.",
          "state": {},
          "stack": [
            "main",
            "Meter@1.shift(int 96)"
          ],
          "phase": "Overload selection"
        },
        {
          "line": 38,
          "title": "Update receiver value",
          "reason": "Meter@1.value becomes 7 + 96 = 103. alias sees the same object.",
          "state": {
            "Meter@1": "{ id=2, value=103 }"
          },
          "stack": [
            "main",
            "Meter@1.shift(int 96)"
          ],
          "phase": "Field update"
        },
        {
          "line": 39,
          "title": "Update static total",
          "reason": "total += id uses Meter@1.id=2, so total becomes 62.",
          "state": {
            "P1Meter.total": "62"
          },
          "stack": [
            "main",
            "Meter@1.shift(int 96)"
          ],
          "phase": "Static field update"
        },
        {
          "line": 40,
          "title": "Return from shift(int)",
          "reason": "The method returns value + total = 103 + 62 = 165.",
          "state": {
            "return value": "165"
          },
          "stack": [
            "main",
            "Meter@1.shift(int 96)"
          ],
          "phase": "Return"
        },
        {
          "line": 7,
          "title": "Assign r",
          "reason": "r receives the returned integer 165.",
          "state": {
            "r": "165"
          },
          "stack": [
            "main"
          ],
          "phase": "Assignment"
        },
        {
          "line": 9,
          "title": "Print checkpoint B",
          "reason": "The complete statement reads r=165, a.value=103, b.value=97, total=62.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "B 165 103 97 62"
        },
        {
          "line": 10,
          "title": "Save left side of +=",
          "reason": "For a compound assignment, Java evaluates b and saves its current value 97 before the method call.",
          "state": {
            "saved b.value": "97"
          },
          "stack": [
            "main"
          ],
          "phase": "Compound assignment"
        },
        {
          "line": 10,
          "title": "Evaluate ++b.value",
          "reason": "Pre-increment changes Meter@2.value 97 to 98, then produces long argument 98 after the cast.",
          "state": {
            "Meter@2": "{ id=13, value=98 }",
            "shift argument": "long 98"
          },
          "stack": [
            "main"
          ],
          "phase": "Pre-increment"
        },
        {
          "line": 10,
          "title": "Invoke the long shift overload",
          "reason": "After ++b.value produces 98 and the cast makes it long, Java invokes a.shift(long).",
          "state": {},
          "stack": [
            "main",
            "Meter@1.shift(long 98)"
          ],
          "phase": "Method call",
          "focus": "a.shift((long) ++b.value)"
        },
        {
          "line": 42,
          "title": "Select shift(long)",
          "reason": "The explicit cast makes Java choose the long overload on Meter@1.",
          "state": {},
          "stack": [
            "main",
            "Meter@1.shift(long 98)"
          ],
          "phase": "Overload selection"
        },
        {
          "line": 43,
          "title": "Add argument to total",
          "reason": "total becomes 62 + 98 = 160.",
          "state": {
            "P1Meter.total": "160"
          },
          "stack": [
            "main",
            "Meter@1.shift(long 98)"
          ],
          "phase": "Static field update"
        },
        {
          "line": 44,
          "title": "Subtract receiver id",
          "reason": "Meter@1.value becomes 103 - 2 = 101.",
          "state": {
            "Meter@1": "{ id=2, value=101 }"
          },
          "stack": [
            "main",
            "Meter@1.shift(long 98)"
          ],
          "phase": "Field update"
        },
        {
          "line": 45,
          "title": "Return from shift(long)",
          "reason": "The result is value - total = 101 - 160 = -59.",
          "state": {
            "return value": "-59"
          },
          "stack": [
            "main",
            "Meter@1.shift(long 98)"
          ],
          "phase": "Return"
        },
        {
          "line": 10,
          "title": "Complete the saved +=",
          "reason": "Use the saved left value: 97 + (-59) = 38. This overwrites the temporary 98.",
          "state": {
            "Meter@2": "{ id=13, value=38 }"
          },
          "stack": [
            "main"
          ],
          "phase": "Compound assignment"
        },
        {
          "line": 11,
          "title": "Print checkpoint C",
          "reason": "a and alias see Meter@1 value 101; b sees Meter@2 value 38.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "C 101 38 160"
        },
        {
          "line": 12,
          "title": "Reassign a",
          "reason": "a now receives b\u2019s reference to Meter@2. alias still points to Meter@1.",
          "state": {
            "a": "\u2192 Meter@2"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference reassignment"
        },
        {
          "line": 13,
          "title": "Read alias.value as argument",
          "reason": "alias points to Meter@1, so the int argument is 101.",
          "state": {
            "shift argument": "int 101"
          },
          "stack": [
            "main"
          ],
          "phase": "Argument evaluation"
        },
        {
          "line": 13,
          "title": "Invoke shift through reassigned a",
          "reason": "Java now invokes shift on Meter@2 with argument 101.",
          "state": {},
          "stack": [
            "main",
            "Meter@2.shift(int 101)"
          ],
          "phase": "Method call",
          "focus": "a.shift(alias.value)"
        },
        {
          "line": 38,
          "title": "Update the new receiver",
          "reason": "a points to Meter@2, so its value becomes 38 + 101 = 139. b sees the same change.",
          "state": {
            "Meter@2": "{ id=13, value=139 }"
          },
          "stack": [
            "main",
            "Meter@2.shift(int 101)"
          ],
          "phase": "Field update"
        },
        {
          "line": 39,
          "title": "Update total using Meter@2 id",
          "reason": "total becomes 160 + id 13 = 173.",
          "state": {
            "P1Meter.total": "173"
          },
          "stack": [
            "main",
            "Meter@2.shift(int 101)"
          ],
          "phase": "Static field update"
        },
        {
          "line": 40,
          "title": "Return final shift result",
          "reason": "value + total is 139 + 173 = 312.",
          "state": {
            "return value": "312"
          },
          "stack": [
            "main",
            "Meter@2.shift(int 101)"
          ],
          "phase": "Return"
        },
        {
          "line": 13,
          "title": "Assign s",
          "reason": "s receives 312.",
          "state": {
            "s": "312"
          },
          "stack": [
            "main"
          ],
          "phase": "Assignment"
        },
        {
          "line": 15,
          "title": "Print checkpoint D",
          "reason": "a and alias point to different objects, so a == alias is false.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "D 312 139 101 173 false"
        }
      ]
    },
    {
      "title": "Problem 2 \u2014 Copies, Aliases, and Nested Calls",
      "source": "public class Trace02Problem2 {\n    static void change(P2Cell first, P2Cell second) {\n        first.value += second.mix(first, 2);\n        System.out.println(\"inside \" + first.value + \" \" + second.value\n                + \" \" + P2Cell.total);\n        first = new P2Cell(second);\n        second = first;\n        second.mix(1, first);\n        System.out.println(\"local \" + first.value + \" \" + second.value\n                + \" \" + P2Cell.total + \" \" + (first == second));\n    }\n    public static void main(String[] args) {\n        P2Cell a = new P2Cell(3);\n        P2Cell b = new P2Cell(a);\n        P2Cell keep = a;\n        System.out.println(\"A \" + a.value + \" \" + b.value + \" \" + P2Cell.total);\n        change(a, b);\n        System.out.println(\"B \" + a.value + \" \" + b.value + \" \"\n                + P2Cell.latest.value + \" \" + P2Cell.total);\n        int r = a.mix(b.value++, P2Cell.latest);\n        System.out.println(\"C \" + r + \" \" + a.value + \" \" + b.value\n                + \" \" + P2Cell.latest.value + \" \" + P2Cell.total);\n        b = P2Cell.latest;\n        int s = b.mix(keep, a.mix(1, b));\n        System.out.println(\"D \" + s + \" \" + a.value + \" \" + b.value\n                + \" \" + P2Cell.total + \" \" + (keep == a));\n    }\n}\nclass P2Cell {\n    static int total = 1;\n    static P2Cell latest;\n    int value;\n    P2Cell(int n) {\n        value = n + total++;\n        latest = this;\n    }\n    P2Cell(P2Cell other) {\n        this(other.value++);\n        other.value += total;\n        value += other.value;\n    }\n    int mix(P2Cell other, int n) {\n        value += n;\n        other.value += value;\n        total++;\n        return value - other.value;\n    }\n    int mix(int n, P2Cell other) {\n        other.value += n;\n        value += other.value;\n        total += 2;\n        return value + other.value;\n    }\n}",
      "steps": [
        {
          "line": 30,
          "title": "Initialize static total",
          "reason": "P2Cell.total starts at 1; latest starts null.",
          "state": {
            "P2Cell.total": "1",
            "P2Cell.latest": "null"
          },
          "stack": [
            "class initialization"
          ],
          "phase": "Class initialization"
        },
        {
          "line": 31,
          "title": "Default-initialize static latest",
          "reason": "Reference-valued static fields default to null.",
          "state": {
            "P2Cell.latest": "null"
          },
          "stack": [
            "class initialization"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 13,
          "title": "Construct a with 3",
          "reason": "new P2Cell(3) enters the integer constructor.",
          "state": {},
          "stack": [
            "main",
            "P2Cell(3)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 32,
          "title": "Default-initialize Cell@1.value",
          "reason": "The new object\u2019s int field starts at Java\u2019s default value 0 before constructor execution.",
          "state": {
            "Cell@1": "{ value=0 }"
          },
          "stack": [
            "main",
            "P2Cell(3)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 34,
          "title": "Evaluate value = n + total++",
          "reason": "Use old total 1 in 3 + 1 = 4, then increment total to 2.",
          "state": {
            "Cell@1": "{ value=4 }",
            "P2Cell.total": "2"
          },
          "stack": [
            "main",
            "P2Cell(3)"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 35,
          "title": "Record latest object",
          "reason": "latest receives this, so it points to Cell@1.",
          "state": {
            "P2Cell.latest": "\u2192 Cell@1"
          },
          "stack": [
            "main",
            "P2Cell(3)"
          ],
          "phase": "Static reference update"
        },
        {
          "line": 13,
          "title": "Assign a",
          "reason": "a receives Cell@1.",
          "state": {
            "a": "\u2192 Cell@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 14,
          "title": "Begin copy construction of b",
          "reason": "new P2Cell(a) enters the copy constructor with other\u2192Cell@1.",
          "state": {},
          "stack": [
            "main",
            "P2Cell(Cell@1)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 32,
          "title": "Default-initialize Cell@2.value",
          "reason": "The new object\u2019s int field starts at Java\u2019s default value 0 before constructor execution.",
          "state": {
            "Cell@2": "{ value=0 }"
          },
          "stack": [
            "main",
            "P2Cell(Cell@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 38,
          "title": "Evaluate other.value++ for this(...)",
          "reason": "Pass old Cell@1.value 4 to the int constructor, then increment Cell@1 to 5.",
          "state": {
            "Cell@1": "{ value=5 }",
            "delegated n": "4"
          },
          "stack": [
            "main",
            "P2Cell(Cell@1)",
            "P2Cell(4)"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 34,
          "title": "Initialize new Cell@2",
          "reason": "value = 4 + old total 2 = 6; total then becomes 3.",
          "state": {
            "Cell@2": "{ value=6 }",
            "P2Cell.total": "3"
          },
          "stack": [
            "main",
            "P2Cell(Cell@1)",
            "P2Cell(4)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 35,
          "title": "Update latest during delegation",
          "reason": "The int constructor makes latest point to the new Cell@2.",
          "state": {
            "P2Cell.latest": "\u2192 Cell@2"
          },
          "stack": [
            "main",
            "P2Cell(Cell@1)",
            "P2Cell(4)"
          ],
          "phase": "Static reference update"
        },
        {
          "line": 39,
          "title": "Mutate the source object",
          "reason": "other.value += total changes Cell@1 from 5 to 8.",
          "state": {
            "Cell@1": "{ value=8 }"
          },
          "stack": [
            "main",
            "P2Cell(Cell@1)"
          ],
          "phase": "Source mutation"
        },
        {
          "line": 40,
          "title": "Finish the copied value",
          "reason": "Cell@2.value += other.value changes 6 to 14.",
          "state": {
            "Cell@2": "{ value=14 }"
          },
          "stack": [
            "main",
            "P2Cell(Cell@1)"
          ],
          "phase": "Field update"
        },
        {
          "line": 14,
          "title": "Assign b",
          "reason": "b receives Cell@2.",
          "state": {
            "b": "\u2192 Cell@2"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 15,
          "title": "Create keep alias",
          "reason": "keep and a point to the same Cell@1.",
          "state": {
            "keep": "\u2192 Cell@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference assignment"
        },
        {
          "line": 16,
          "title": "Print checkpoint A",
          "reason": "The current values are a=8, b=14, total=3.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "A 8 14 3"
        },
        {
          "line": 17,
          "title": "Enter change(a, b)",
          "reason": "Java copies references into parameters: first\u2192Cell@1 and second\u2192Cell@2.",
          "state": {
            "first": "\u2192 Cell@1",
            "second": "\u2192 Cell@2"
          },
          "stack": [
            "main",
            "change(first, second)"
          ],
          "phase": "Method call"
        },
        {
          "line": 3,
          "title": "Save first.value for +=",
          "reason": "The compound assignment saves Cell@1.value, which is 8, before evaluating the right side.",
          "state": {
            "saved first.value": "8"
          },
          "stack": [
            "main",
            "change(...)"
          ],
          "phase": "Compound assignment"
        },
        {
          "line": 3,
          "title": "Invoke second.mix(first, 2)",
          "reason": "After saving the left side of +=, Java evaluates the right-side method call.",
          "state": {},
          "stack": [
            "main",
            "change(...)",
            "Cell@2.mix(Cell@1, 2)"
          ],
          "phase": "Method call",
          "focus": "second.mix(first, 2)"
        },
        {
          "line": 42,
          "title": "Call second.mix(first, 2)",
          "reason": "Argument types select mix(P2Cell, int) on receiver Cell@2.",
          "state": {},
          "stack": [
            "main",
            "change(...)",
            "Cell@2.mix(Cell@1, 2)"
          ],
          "phase": "Overload selection"
        },
        {
          "line": 43,
          "title": "Update receiver Cell@2",
          "reason": "value += n changes Cell@2 from 14 to 16.",
          "state": {
            "Cell@2": "{ value=16 }"
          },
          "stack": [
            "main",
            "change(...)",
            "Cell@2.mix(Cell@1, 2)"
          ],
          "phase": "Field update"
        },
        {
          "line": 44,
          "title": "Update argument Cell@1",
          "reason": "other.value += value changes Cell@1 from 8 to 24.",
          "state": {
            "Cell@1": "{ value=24 }"
          },
          "stack": [
            "main",
            "change(...)",
            "Cell@2.mix(Cell@1, 2)"
          ],
          "phase": "Aliased object update"
        },
        {
          "line": 45,
          "title": "Increment shared total",
          "reason": "total++ changes 3 to 4.",
          "state": {
            "P2Cell.total": "4"
          },
          "stack": [
            "main",
            "change(...)",
            "Cell@2.mix(Cell@1, 2)"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 46,
          "title": "Return -8",
          "reason": "The return expression is receiver 16 - other 24 = -8.",
          "state": {
            "return value": "-8"
          },
          "stack": [
            "main",
            "change(...)",
            "Cell@2.mix(Cell@1, 2)"
          ],
          "phase": "Return"
        },
        {
          "line": 3,
          "title": "Complete first.value += -8",
          "reason": "Use the saved value 8, not the current 24: 8 + (-8) = 0. Store 0 in Cell@1.",
          "state": {
            "Cell@1": "{ value=0 }"
          },
          "stack": [
            "main",
            "change(...)"
          ],
          "phase": "Compound assignment"
        },
        {
          "line": 5,
          "title": "Print inside checkpoint",
          "reason": "first sees Cell@1=0 and second sees Cell@2=16.",
          "state": {},
          "stack": [
            "main",
            "change(...)"
          ],
          "phase": "Console output",
          "output": "inside 0 16 4"
        },
        {
          "line": 6,
          "title": "Copy second into a new local object",
          "reason": "new P2Cell(second) starts a copy of Cell@2.",
          "state": {},
          "stack": [
            "main",
            "change(...)",
            "P2Cell(Cell@2)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 32,
          "title": "Default-initialize Cell@3.value",
          "reason": "The new object\u2019s int field starts at Java\u2019s default value 0 before constructor execution.",
          "state": {
            "Cell@3": "{ value=0 }"
          },
          "stack": [
            "main",
            "change(...)",
            "P2Cell(Cell@2)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 38,
          "title": "Pass second.value++",
          "reason": "The delegated argument is old value 16; Cell@2 then becomes 17.",
          "state": {
            "Cell@2": "{ value=17 }",
            "delegated n": "16"
          },
          "stack": [
            "main",
            "change(...)",
            "P2Cell(16)"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 34,
          "title": "Initialize Cell@3",
          "reason": "value = 16 + old total 4 = 20; total becomes 5.",
          "state": {
            "Cell@3": "{ value=20 }",
            "P2Cell.total": "5"
          },
          "stack": [
            "main",
            "change(...)",
            "P2Cell(16)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 35,
          "title": "Make Cell@3 latest",
          "reason": "latest now points to the new object.",
          "state": {
            "P2Cell.latest": "\u2192 Cell@3"
          },
          "stack": [
            "main",
            "change(...)",
            "P2Cell(16)"
          ],
          "phase": "Static reference update"
        },
        {
          "line": 39,
          "title": "Mutate copy source Cell@2",
          "reason": "Cell@2.value += total changes 17 to 22.",
          "state": {
            "Cell@2": "{ value=22 }"
          },
          "stack": [
            "main",
            "change(...)",
            "P2Cell(Cell@2)"
          ],
          "phase": "Source mutation"
        },
        {
          "line": 40,
          "title": "Finish Cell@3 copy value",
          "reason": "Cell@3.value += Cell@2.value changes 20 to 42.",
          "state": {
            "Cell@3": "{ value=42 }"
          },
          "stack": [
            "main",
            "change(...)",
            "P2Cell(Cell@2)"
          ],
          "phase": "Field update"
        },
        {
          "line": 6,
          "title": "Reassign local first",
          "reason": "Only the parameter first changes; caller a still points to Cell@1.",
          "state": {
            "first": "\u2192 Cell@3"
          },
          "stack": [
            "main",
            "change(...)"
          ],
          "phase": "Local reference reassignment"
        },
        {
          "line": 7,
          "title": "Reassign local second",
          "reason": "second now also points to Cell@3. Caller b is still Cell@2.",
          "state": {
            "second": "\u2192 Cell@3"
          },
          "stack": [
            "main",
            "change(...)"
          ],
          "phase": "Local reference reassignment"
        },
        {
          "line": 8,
          "title": "Invoke the self-aliasing mix call",
          "reason": "Both second and first now refer to Cell@3; Java invokes mix with the two aliases.",
          "state": {},
          "stack": [
            "main",
            "change(...)",
            "Cell@3.mix(1, Cell@3)"
          ],
          "phase": "Method call",
          "focus": "second.mix(1, first)"
        },
        {
          "line": 8,
          "title": "Call second.mix(1, first)",
          "reason": "Types select mix(int, P2Cell). Receiver and other are the same Cell@3.",
          "state": {},
          "stack": [
            "main",
            "change(...)",
            "Cell@3.mix(1, Cell@3)"
          ],
          "phase": "Self-aliasing call"
        },
        {
          "line": 49,
          "title": "First self-alias update",
          "reason": "other.value += 1 changes the shared Cell@3 from 42 to 43.",
          "state": {
            "Cell@3": "{ value=43 }"
          },
          "stack": [
            "main",
            "change(...)",
            "Cell@3.mix(1, Cell@3)"
          ],
          "phase": "Aliasing"
        },
        {
          "line": 50,
          "title": "Second self-alias update",
          "reason": "value += other.value reads the same object twice: 43 + 43 = 86.",
          "state": {
            "Cell@3": "{ value=86 }"
          },
          "stack": [
            "main",
            "change(...)",
            "Cell@3.mix(1, Cell@3)"
          ],
          "phase": "Aliasing"
        },
        {
          "line": 51,
          "title": "Increase total by 2",
          "reason": "The static total changes 5 to 7.",
          "state": {
            "P2Cell.total": "7"
          },
          "stack": [
            "main",
            "change(...)",
            "Cell@3.mix(1, Cell@3)"
          ],
          "phase": "Static field update"
        },
        {
          "line": 52,
          "title": "Return 172 and ignore it",
          "reason": "value + other.value is 86 + 86 because both names denote Cell@3.",
          "state": {
            "ignored return": "172"
          },
          "stack": [
            "main",
            "change(...)",
            "Cell@3.mix(1, Cell@3)"
          ],
          "phase": "Return"
        },
        {
          "line": 8,
          "title": "Complete the ignored mix statement",
          "reason": "Control returns to line 8. Because the call is a standalone statement, its return value 172 is discarded.",
          "state": {},
          "stack": [
            "main",
            "change(...)"
          ],
          "phase": "Method return",
          "focus": "second.mix(1, first)"
        },
        {
          "line": 10,
          "title": "Print local checkpoint",
          "reason": "Both local parameters refer to Cell@3, so both values are 86 and == is true.",
          "state": {},
          "stack": [
            "main",
            "change(...)"
          ],
          "phase": "Console output",
          "output": "local 86 86 7 true"
        },
        {
          "line": 17,
          "title": "Return to main",
          "reason": "Parameter reassignments disappear. a\u2192Cell@1, b\u2192Cell@2, but their objects retain mutations; latest\u2192Cell@3.",
          "state": {
            "first": "out of scope",
            "second": "out of scope"
          },
          "stack": [
            "main"
          ],
          "phase": "Method return"
        },
        {
          "line": 19,
          "title": "Print checkpoint B",
          "reason": "a=0, b=22, latest=86, and total=7.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "B 0 22 86 7"
        },
        {
          "line": 20,
          "title": "Evaluate b.value++",
          "reason": "Pass old Cell@2 value 22, then change Cell@2 to 23.",
          "state": {
            "Cell@2": "{ value=23 }",
            "mix argument n": "22"
          },
          "stack": [
            "main"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 20,
          "title": "Invoke a.mix with evaluated arguments",
          "reason": "b.value++ has produced 22 and latest points to Cell@3, so Java invokes the selected overload.",
          "state": {},
          "stack": [
            "main",
            "Cell@1.mix(22, Cell@3)"
          ],
          "phase": "Method call",
          "focus": "a.mix(b.value++, P2Cell.latest)"
        },
        {
          "line": 48,
          "title": "Select a.mix(int, latest)",
          "reason": "The first argument is int, so mix(int, P2Cell) runs on Cell@1 with other\u2192Cell@3.",
          "state": {},
          "stack": [
            "main",
            "Cell@1.mix(22, Cell@3)"
          ],
          "phase": "Overload selection"
        },
        {
          "line": 49,
          "title": "Update latest object",
          "reason": "Cell@3.value += 22 changes 86 to 108.",
          "state": {
            "Cell@3": "{ value=108 }"
          },
          "stack": [
            "main",
            "Cell@1.mix(22, Cell@3)"
          ],
          "phase": "Field update"
        },
        {
          "line": 50,
          "title": "Update a object",
          "reason": "Cell@1.value += Cell@3.value changes 0 to 108. keep sees the same object.",
          "state": {
            "Cell@1": "{ value=108 }"
          },
          "stack": [
            "main",
            "Cell@1.mix(22, Cell@3)"
          ],
          "phase": "Aliasing"
        },
        {
          "line": 51,
          "title": "Increase total",
          "reason": "total += 2 changes 7 to 9.",
          "state": {
            "P2Cell.total": "9"
          },
          "stack": [
            "main",
            "Cell@1.mix(22, Cell@3)"
          ],
          "phase": "Static field update"
        },
        {
          "line": 52,
          "title": "Return 216",
          "reason": "Cell@1.value + Cell@3.value = 108 + 108.",
          "state": {
            "r": "216"
          },
          "stack": [
            "main",
            "Cell@1.mix(22, Cell@3)"
          ],
          "phase": "Return and assignment"
        },
        {
          "line": 20,
          "title": "Assign r after mix returns",
          "reason": "Control returns to line 20 and the returned value 216 is stored in r.",
          "state": {
            "r": "216"
          },
          "stack": [
            "main"
          ],
          "phase": "Return and assignment",
          "focus": "int r = a.mix(b.value++, P2Cell.latest)"
        },
        {
          "line": 22,
          "title": "Print checkpoint C",
          "reason": "a and latest have equal values but are different objects; b is 23.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "C 216 108 23 108 9"
        },
        {
          "line": 23,
          "title": "Reassign b to latest",
          "reason": "b now points to Cell@3. The old Cell@2 is no longer referenced.",
          "state": {
            "b": "\u2192 Cell@3"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference reassignment"
        },
        {
          "line": 24,
          "title": "Begin nested call evaluation",
          "reason": "For b.mix(keep, a.mix(1,b)), Java fixes receiver Cell@3, then evaluates arguments left to right.",
          "state": {
            "outer receiver": "Cell@3",
            "outer first arg": "keep\u2192Cell@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Evaluation order"
        },
        {
          "line": 24,
          "title": "Invoke inner a.mix(1, b)",
          "reason": "Java must complete the nested inner call before the outer b.mix call can begin.",
          "state": {},
          "stack": [
            "main",
            "Cell@1.mix(1, Cell@3)"
          ],
          "phase": "Nested method call",
          "focus": "a.mix(1, b)"
        },
        {
          "line": 48,
          "title": "Enter inner mix(int, P2Cell)",
          "reason": "Argument types select mix(int, P2Cell) on Cell@1.",
          "state": {},
          "stack": [
            "main",
            "Cell@1.mix(1, Cell@3)"
          ],
          "phase": "Overload selection",
          "focus": "mix(int n, P2Cell other)"
        },
        {
          "line": 49,
          "title": "Inner call updates Cell@3",
          "reason": "Cell@3 changes 108 to 109.",
          "state": {
            "Cell@3": "{ value=109 }"
          },
          "stack": [
            "main",
            "Cell@1.mix(1, Cell@3)"
          ],
          "phase": "Field update"
        },
        {
          "line": 50,
          "title": "Inner call updates Cell@1",
          "reason": "Cell@1 changes 108 to 108 + 109 = 217.",
          "state": {
            "Cell@1": "{ value=217 }"
          },
          "stack": [
            "main",
            "Cell@1.mix(1, Cell@3)"
          ],
          "phase": "Field update"
        },
        {
          "line": 51,
          "title": "Inner call updates total",
          "reason": "total changes 9 to 11.",
          "state": {
            "P2Cell.total": "11"
          },
          "stack": [
            "main",
            "Cell@1.mix(1, Cell@3)"
          ],
          "phase": "Static field update"
        },
        {
          "line": 52,
          "title": "Inner call returns 326",
          "reason": "217 + 109 = 326 becomes the second argument of the outer call.",
          "state": {
            "outer second arg": "326"
          },
          "stack": [
            "main",
            "Cell@1.mix(1, Cell@3)"
          ],
          "phase": "Nested return"
        },
        {
          "line": 24,
          "title": "Invoke outer b.mix(keep, 326)",
          "reason": "The inner call has returned 326, so Java can now invoke the outer call.",
          "state": {},
          "stack": [
            "main",
            "Cell@3.mix(Cell@1, 326)"
          ],
          "phase": "Outer method call",
          "focus": "b.mix(keep, a.mix(1, b))"
        },
        {
          "line": 42,
          "title": "Run outer b.mix(keep, 326)",
          "reason": "Argument types select mix(P2Cell,int) on Cell@3.",
          "state": {},
          "stack": [
            "main",
            "Cell@3.mix(Cell@1, 326)"
          ],
          "phase": "Outer method call"
        },
        {
          "line": 43,
          "title": "Outer call updates b/latest",
          "reason": "Cell@3.value += 326 changes 109 to 435.",
          "state": {
            "Cell@3": "{ value=435 }"
          },
          "stack": [
            "main",
            "Cell@3.mix(Cell@1, 326)"
          ],
          "phase": "Field update"
        },
        {
          "line": 44,
          "title": "Outer call updates keep/a",
          "reason": "Cell@1.value += 435 changes 217 to 652.",
          "state": {
            "Cell@1": "{ value=652 }"
          },
          "stack": [
            "main",
            "Cell@3.mix(Cell@1, 326)"
          ],
          "phase": "Aliasing"
        },
        {
          "line": 45,
          "title": "Outer call increments total",
          "reason": "total changes 11 to 12.",
          "state": {
            "P2Cell.total": "12"
          },
          "stack": [
            "main",
            "Cell@3.mix(Cell@1, 326)"
          ],
          "phase": "Static field update"
        },
        {
          "line": 46,
          "title": "Return -217 from the outer mix",
          "reason": "Cell@3.value - Cell@1.value is 435 - 652 = -217. The method returns that value to line 24.",
          "state": {
            "return value": "-217"
          },
          "stack": [
            "main",
            "Cell@3.mix(Cell@1, 326)"
          ],
          "phase": "Return"
        },
        {
          "line": 24,
          "title": "Assign s after the outer call returns",
          "reason": "Control returns to the original nested-call statement and stores -217 in s.",
          "state": {
            "s": "-217"
          },
          "stack": [
            "main"
          ],
          "phase": "Return and assignment",
          "focus": "int s = b.mix(keep, a.mix(1, b))"
        },
        {
          "line": 26,
          "title": "Print checkpoint D",
          "reason": "keep == a is true because both still point to Cell@1.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "D -217 652 435 12 true"
        }
      ]
    }
  ]
};
