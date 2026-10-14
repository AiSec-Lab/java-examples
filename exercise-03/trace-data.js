window.TRACE_SET = {
  "title": "Exercise 3 \u2014 Animated Java Traces",
  "subtitle": "Inheritance, constructor order, composition, overriding, and runtime method selection",
  "programs": [
    {
      "title": "Problem 1 \u2014 Construction and Composition",
      "source": "public class Trace03Problem1 {\n  public static void main(String[] args) {\n    P1Plan shared = new P1Plan(\"Calibrate\", 2);\n    P1Device a = new P1Device(\"A\");\n    P1Device b = new P1Device(\"B\", 3, shared);\n    System.out.println(\"A \" + a.label() + \" | \" + b.label());\n    a.record(2);\n    b.record(1);\n    System.out.println(\"B \" + a.label() + \" | \" + b.label());\n    shared.addVisits(2);\n    System.out.println(\"C shared=\" + shared + \" b.plan=\" + b.plan);\n    P1Plan alias = a.plan;\n    alias.addVisits(1);\n    System.out.println(\"D \" + a.label() + \" same=\" + (alias == a.plan));\n  }\n}\n\nclass P1Plan {\n  String task;\n  int visits;\n\n  P1Plan(String task) {\n    this(task, 1);\n  }\n\n  P1Plan(String task, int visits) {\n    this.task = task;\n    this.visits = visits;\n    System.out.println(\"plan \" + task + \" \" + visits);\n  }\n\n  P1Plan(P1Plan other) {\n    this(other.task, other.visits);\n    System.out.println(\"copy \" + task + \" \" + visits);\n  }\n\n  void addVisits(int amount) {\n    visits += amount;\n  }\n\n  @Override\n  public String toString() {\n    return task + \"(\" + visits + \")\";\n  }\n}\n\nclass P1Asset {\n  String id;\n  int hours;\n\n  P1Asset(String id) {\n    this(id, 0);\n  }\n\n  P1Asset(String id, int hours) {\n    this.id = id;\n    this.hours = hours;\n    System.out.println(\"asset \" + id + \" \" + hours);\n  }\n\n  void record(int amount) {\n    hours += amount;\n  }\n\n  String label() {\n    return id + \":\" + hours;\n  }\n}\n\nclass P1Device extends P1Asset {\n  P1Plan plan;\n\n  P1Device(String id) {\n    this(id, 0, new P1Plan(\"Inspect\"));\n  }\n\n  P1Device(String id, int hours, P1Plan plan) {\n    super(id, hours);\n    this.plan = new P1Plan(plan);\n    System.out.println(\"device \" + id);\n  }\n\n  @Override\n  void record(int amount) {\n    super.record(amount);\n    plan.addVisits(1);\n  }\n\n  @Override\n  String label() {\n    return super.label() + \" | \" + plan;\n  }\n}",
      "steps": [
        {
          "line": 3,
          "title": "Construct shared plan",
          "reason": "The two-argument constructor is selected for task Calibrate and visits 2.",
          "state": {},
          "stack": [
            "main",
            "P1Plan(\"Calibrate\", 2)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 19,
          "title": "Default-initialize shared task",
          "reason": "The new reference field starts null before the constructor body.",
          "state": {
            "Plan@1": "{ task=null, visits=0 }"
          },
          "stack": [
            "main",
            "P1Plan(\"Calibrate\", 2)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 20,
          "title": "Default-initialize shared visits",
          "reason": "The new int field starts at Java\u2019s default 0.",
          "state": {
            "Plan@1": "{ task=null, visits=0 }"
          },
          "stack": [
            "main",
            "P1Plan(\"Calibrate\", 2)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 27,
          "title": "Initialize task",
          "reason": "this.task receives \"Calibrate\".",
          "state": {
            "Plan@1": "{ task=\"Calibrate\", visits=0 }"
          },
          "stack": [
            "main",
            "P1Plan(\"Calibrate\", 2)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 28,
          "title": "Initialize visits",
          "reason": "this.visits receives 2.",
          "state": {
            "Plan@1": "{ task=\"Calibrate\", visits=2 }"
          },
          "stack": [
            "main",
            "P1Plan(\"Calibrate\", 2)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 29,
          "title": "Print plan construction",
          "reason": "The initialized fields are read for the message.",
          "state": {},
          "stack": [
            "main",
            "P1Plan(\"Calibrate\", 2)"
          ],
          "phase": "Console output",
          "output": "plan Calibrate 2"
        },
        {
          "line": 3,
          "title": "Assign shared",
          "reason": "shared stores the reference to Plan@1.",
          "state": {
            "shared": "\u2192 Plan@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 4,
          "title": "Begin constructing device A",
          "reason": "The one-argument device constructor runs.",
          "state": {},
          "stack": [
            "main",
            "P1Device(\"A\")"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 48,
          "title": "Default-initialize A id",
          "reason": "The inherited reference field starts null.",
          "state": {
            "Device@1": "{ id=null, hours=0, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(\"A\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 49,
          "title": "Default-initialize A hours",
          "reason": "The inherited int field starts 0.",
          "state": {
            "Device@1": "{ id=null, hours=0, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(\"A\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 71,
          "title": "Default-initialize A plan reference",
          "reason": "The subclass reference field starts null.",
          "state": {
            "Device@1": "{ id=null, hours=0, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(\"A\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 74,
          "title": "Evaluate the this(...) argument",
          "reason": "Java must first construct new P1Plan(\"Inspect\").",
          "state": {},
          "stack": [
            "main",
            "P1Device(\"A\")",
            "P1Plan(\"Inspect\")"
          ],
          "phase": "Argument evaluation"
        },
        {
          "line": 19,
          "title": "Default-initialize Inspect task",
          "reason": "Plan@2.task starts null.",
          "state": {
            "Plan@2": "{ task=null, visits=0 }"
          },
          "stack": [
            "main",
            "P1Device(\"A\")",
            "P1Plan(\"Inspect\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 20,
          "title": "Default-initialize Inspect visits",
          "reason": "Plan@2.visits starts 0.",
          "state": {
            "Plan@2": "{ task=null, visits=0 }"
          },
          "stack": [
            "main",
            "P1Device(\"A\")",
            "P1Plan(\"Inspect\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 23,
          "title": "Delegate the plan constructor",
          "reason": "P1Plan(String) delegates with this(task, 1).",
          "state": {},
          "stack": [
            "main",
            "P1Device(\"A\")",
            "P1Plan(\"Inspect\", 1)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 27,
          "title": "Initialize Inspect plan",
          "reason": "this.task stores \"Inspect\". visits still has its default value 0 until the next statement.",
          "state": {
            "Plan@2": "{ task=\"Inspect\", visits=0 }"
          },
          "stack": [
            "main",
            "P1Device(\"A\")",
            "P1Plan(\"Inspect\", 1)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 28,
          "title": "Initialize Inspect visits",
          "reason": "this.visits = visits stores the constructor parameter 1.",
          "state": {
            "Plan@2": "{ task=\"Inspect\", visits=1 }"
          },
          "stack": [
            "main",
            "P1Device(\"A\")",
            "P1Plan(\"Inspect\", 1)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 29,
          "title": "Print temporary plan",
          "reason": "The plan constructor prints before device construction continues.",
          "state": {},
          "stack": [
            "main",
            "P1Device(\"A\")",
            "P1Plan(\"Inspect\", 1)"
          ],
          "phase": "Console output",
          "output": "plan Inspect 1"
        },
        {
          "line": 74,
          "title": "Delegate the device constructor",
          "reason": "this(id, 0, Plan@2) enters the full P1Device constructor.",
          "state": {},
          "stack": [
            "main",
            "P1Device(\"A\", 0, Plan@2)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 78,
          "title": "Construct the superclass part",
          "reason": "super(id, hours) calls P1Asset(\"A\", 0) first.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Asset(\"A\", 0)"
          ],
          "phase": "Superclass call"
        },
        {
          "line": 56,
          "title": "Initialize inherited id",
          "reason": "The first superclass assignment stores id=\"A\". hours is assigned on the next line.",
          "state": {
            "Device@1": "{ id=\"A\", hours=0, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Asset(\"A\", 0)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 57,
          "title": "Initialize inherited hours",
          "reason": "The second superclass assignment stores hours=0.",
          "state": {
            "Device@1": "{ id=\"A\", hours=0, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Asset(\"A\", 0)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 58,
          "title": "Print asset construction",
          "reason": "The superclass constructor prints and then returns.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Asset(\"A\", 0)"
          ],
          "phase": "Console output",
          "output": "asset A 0"
        },
        {
          "line": 79,
          "title": "Copy the composed plan",
          "reason": "new P1Plan(plan) invokes the copy constructor using Plan@2.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(Plan@2)"
          ],
          "phase": "Composition copy"
        },
        {
          "line": 19,
          "title": "Default-initialize copied task",
          "reason": "Plan@3.task starts null.",
          "state": {
            "Plan@3": "{ task=null, visits=0 }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(Plan@2)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 20,
          "title": "Default-initialize copied visits",
          "reason": "Plan@3.visits starts 0.",
          "state": {
            "Plan@3": "{ task=null, visits=0 }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(Plan@2)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 33,
          "title": "Delegate from copy constructor",
          "reason": "The copy reads Inspect and 1, then delegates to the full plan constructor.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(\"Inspect\", 1)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 27,
          "title": "Copy task into the independent plan",
          "reason": "The delegated constructor stores other.task, \"Inspect\", in the new Plan@3. The next source statement initializes visits.",
          "state": {
            "Plan@3": "{ task=\"Inspect\", visits=0 }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(\"Inspect\", 1)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 28,
          "title": "Copy visits into the independent plan",
          "reason": "this.visits = visits stores 1 in Plan@3.",
          "state": {
            "Plan@3": "{ task=\"Inspect\", visits=1 }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(\"Inspect\", 1)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 29,
          "title": "Print copied plan construction",
          "reason": "The delegated constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(\"Inspect\", 1)"
          ],
          "phase": "Console output",
          "output": "plan Inspect 1"
        },
        {
          "line": 34,
          "title": "Finish copy constructor",
          "reason": "The copy constructor prints after delegation returns.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(Plan@2)"
          ],
          "phase": "Console output",
          "output": "copy Inspect 1"
        },
        {
          "line": 79,
          "title": "Attach the plan copy",
          "reason": "Device@1.plan now points to Plan@3.",
          "state": {
            "Device@1": "{ id=\"A\", hours=0, plan\u2192Plan@3 }"
          },
          "stack": [
            "main",
            "P1Device(...)"
          ],
          "phase": "Composition"
        },
        {
          "line": 80,
          "title": "Finish device A",
          "reason": "The full device constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)"
          ],
          "phase": "Console output",
          "output": "device A"
        },
        {
          "line": 4,
          "title": "Assign a",
          "reason": "a receives Device@1.",
          "state": {
            "a": "\u2192 Device@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 5,
          "title": "Begin constructing device B",
          "reason": "Java evaluates the arguments to new P1Device(\"B\", 3, shared) and allocates Device@2. Before any constructor body runs, its fields receive Java default values in the next steps.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Object allocation"
        },
        {
          "line": 48,
          "title": "Default-initialize B id",
          "reason": "The inherited id field starts null.",
          "state": {
            "Device@2": "{ id=null, hours=0, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(\"B\",3,Plan@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 49,
          "title": "Default-initialize B hours",
          "reason": "The inherited hours field starts 0.",
          "state": {
            "Device@2": "{ id=null, hours=0, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(\"B\",3,Plan@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 71,
          "title": "Default-initialize B plan reference",
          "reason": "The subclass plan field starts null.",
          "state": {
            "Device@2": "{ id=null, hours=0, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(\"B\",3,Plan@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 78,
          "title": "Call B superclass constructor",
          "reason": "The P1Device constructor calls super(\"B\", 3) before its own body.",
          "state": {},
          "stack": [
            "main",
            "P1Device(\"B\",3,Plan@1)",
            "P1Asset(\"B\",3)"
          ],
          "phase": "Superclass call"
        },
        {
          "line": 56,
          "title": "Initialize B inherited id",
          "reason": "The superclass constructor first stores id=\"B\".",
          "state": {
            "Device@2": "{ id=\"B\", hours=0, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Asset(\"B\",3)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 57,
          "title": "Initialize B inherited hours",
          "reason": "The second superclass assignment stores hours=3.",
          "state": {
            "Device@2": "{ id=\"B\", hours=3, plan=null }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Asset(\"B\",3)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 58,
          "title": "Print asset B",
          "reason": "The superclass constructor completes.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Asset(\"B\",3)"
          ],
          "phase": "Console output",
          "output": "asset B 3"
        },
        {
          "line": 79,
          "title": "Copy shared into B",
          "reason": "The device makes Plan@4 from shared Plan@1; it does not retain the same reference.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(Plan@1)"
          ],
          "phase": "Composition copy"
        },
        {
          "line": 19,
          "title": "Default-initialize B-copy task",
          "reason": "Plan@4.task starts null.",
          "state": {
            "Plan@4": "{ task=null, visits=0 }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(Plan@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 20,
          "title": "Default-initialize B-copy visits",
          "reason": "Plan@4.visits starts 0.",
          "state": {
            "Plan@4": "{ task=null, visits=0 }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(Plan@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 33,
          "title": "Delegate B plan copy constructor",
          "reason": "P1Plan(P1Plan) evaluates other.task and other.visits, then calls this(\"Calibrate\", 2).",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(Plan@1)",
            "P1Plan(\"Calibrate\",2)"
          ],
          "phase": "Constructor delegation",
          "focus": "this(other.task, other.visits)"
        },
        {
          "line": 27,
          "title": "Copy task into B\u2019s plan",
          "reason": "Plan@4.task receives \"Calibrate\". Its visits field is assigned by the next statement.",
          "state": {
            "Plan@4": "{ task=\"Calibrate\", visits=0 }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(\"Calibrate\",2)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 28,
          "title": "Copy visits into B\u2019s plan",
          "reason": "this.visits = visits stores 2 in Plan@4.",
          "state": {
            "Plan@4": "{ task=\"Calibrate\", visits=2 }"
          },
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(\"Calibrate\",2)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 29,
          "title": "Print B plan construction",
          "reason": "The full plan constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(\"Calibrate\",2)"
          ],
          "phase": "Console output",
          "output": "plan Calibrate 2"
        },
        {
          "line": 34,
          "title": "Print copy completion",
          "reason": "The copy constructor confirms its copied state.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)",
            "P1Plan(Plan@1)"
          ],
          "phase": "Console output",
          "output": "copy Calibrate 2"
        },
        {
          "line": 79,
          "title": "Attach B plan",
          "reason": "Device@2.plan points to independent Plan@4.",
          "state": {
            "Device@2": "{ id=\"B\", hours=3, plan\u2192Plan@4 }"
          },
          "stack": [
            "main",
            "P1Device(...)"
          ],
          "phase": "Composition"
        },
        {
          "line": 80,
          "title": "Finish device B",
          "reason": "The subclass constructor prints and returns.",
          "state": {},
          "stack": [
            "main",
            "P1Device(...)"
          ],
          "phase": "Console output",
          "output": "device B"
        },
        {
          "line": 5,
          "title": "Assign b",
          "reason": "b receives Device@2.",
          "state": {
            "b": "\u2192 Device@2"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 6,
          "title": "Dispatch a.label()",
          "reason": "a refers to Device@1, so Java enters the overridden P1Device.label method.",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 91,
          "title": "Call super.label()",
          "reason": "The P1Device.label expression evaluates super.label() before it can concatenate the plan.",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Asset.label()"
          ],
          "phase": "Superclass method call",
          "focus": "super.label()",
          "reads": {
            "Device@1": "read inherited id and hours through this object"
          }
        },
        {
          "line": 66,
          "title": "Return A inherited label",
          "reason": "super.label() executes P1Asset.label and returns \"A:0\".",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Asset.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@1": "read inherited id and hours"
          }
        },
        {
          "line": 91,
          "title": "Convert plan for concatenation",
          "reason": "The + operator needs text for plan, so Java invokes plan.toString().",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Plan.toString()"
          ],
          "phase": "Method call",
          "focus": "plan",
          "reads": {
            "Plan@3": "read composed plan reference for string conversion"
          }
        },
        {
          "line": 43,
          "title": "Convert A plan to text",
          "reason": "Appending plan calls Plan@3.toString(), returning \"Inspect(1)\".",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "Plan@3.toString()"
          ],
          "phase": "Return",
          "reads": {
            "Plan@3": "read task and visits for toString()"
          }
        },
        {
          "line": 91,
          "title": "Return A complete label",
          "reason": "The override returns \"A:0 | Inspect(1)\".",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@1": "use inherited id and hours",
            "Plan@3": "use composed plan text"
          }
        },
        {
          "line": 6,
          "title": "Dispatch b.label()",
          "reason": "b refers to Device@2, so Java enters the same override on a different object.",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 91,
          "title": "Call super.label()",
          "reason": "The P1Device.label expression evaluates super.label() before it can concatenate the plan.",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()",
            "P1Asset.label()"
          ],
          "phase": "Superclass method call",
          "focus": "super.label()",
          "reads": {
            "Device@2": "read inherited id and hours through this object"
          }
        },
        {
          "line": 66,
          "title": "Return B inherited label",
          "reason": "super.label() returns \"B:3\".",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()",
            "P1Asset.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@2": "read inherited id and hours"
          }
        },
        {
          "line": 91,
          "title": "Convert plan for concatenation",
          "reason": "The + operator needs text for plan, so Java invokes plan.toString().",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()",
            "P1Plan.toString()"
          ],
          "phase": "Method call",
          "focus": "plan",
          "reads": {
            "Plan@4": "read composed plan reference for string conversion"
          }
        },
        {
          "line": 43,
          "title": "Convert B plan to text",
          "reason": "Plan@4.toString() returns \"Calibrate(2)\".",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()",
            "Plan@4.toString()"
          ],
          "phase": "Return",
          "reads": {
            "Plan@4": "read task and visits for toString()"
          }
        },
        {
          "line": 91,
          "title": "Return B complete label",
          "reason": "The override returns \"B:3 | Calibrate(2)\".",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@2": "use inherited id and hours",
            "Plan@4": "use composed plan text"
          }
        },
        {
          "line": 6,
          "title": "Print checkpoint A",
          "reason": "The labels combine inherited asset state with composed plan state.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "A A:0 | Inspect(1) | B:3 | Calibrate(2)"
        },
        {
          "line": 7,
          "title": "Dispatch a.record(2)",
          "reason": "P1Device.record overrides P1Asset.record, so the subclass method runs.",
          "state": {},
          "stack": [
            "main",
            "Device@1.record(2)"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 85,
          "title": "Reuse superclass record",
          "reason": "super.record(2) adds 2 to inherited hours.",
          "state": {},
          "stack": [
            "main",
            "Device@1.record(2)",
            "P1Asset.record(2)"
          ],
          "phase": "Superclass method call"
        },
        {
          "line": 62,
          "title": "Update A inherited hours",
          "reason": "P1Asset.record executes hours += amount, changing 0 to 2.",
          "state": {
            "Device@1": "{ id=\"A\", hours=2, plan\u2192Plan@3 }"
          },
          "stack": [
            "main",
            "Device@1.record(2)",
            "P1Asset.record(2)"
          ],
          "phase": "Field update"
        },
        {
          "line": 86,
          "title": "Update the composed plan",
          "reason": "The override calls plan.addVisits(1); control now enters the composed plan method.",
          "state": {},
          "stack": [
            "main",
            "Device@1.record(2)",
            "Plan@3.addVisits(1)"
          ],
          "phase": "Composition update"
        },
        {
          "line": 38,
          "title": "Increment A plan visits",
          "reason": "P1Plan.addVisits executes visits += amount, changing 1 to 2.",
          "state": {
            "Plan@3": "{ task=\"Inspect\", visits=2 }"
          },
          "stack": [
            "main",
            "Device@1.record(2)",
            "Plan@3.addVisits(1)"
          ],
          "phase": "Field update"
        },
        {
          "line": 8,
          "title": "Dispatch b.record(1)",
          "reason": "The same override runs for Device@2.",
          "state": {},
          "stack": [
            "main",
            "Device@2.record(1)"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 85,
          "title": "Update B inherited hours",
          "reason": "The override calls super.record(1); control now enters P1Asset.record.",
          "state": {},
          "stack": [
            "main",
            "Device@2.record(1)",
            "P1Asset.record(1)"
          ],
          "phase": "Superclass method call"
        },
        {
          "line": 62,
          "title": "Update B inherited hours",
          "reason": "P1Asset.record executes hours += amount, changing 3 to 4.",
          "state": {
            "Device@2": "{ id=\"B\", hours=4, plan\u2192Plan@4 }"
          },
          "stack": [
            "main",
            "Device@2.record(1)",
            "P1Asset.record(1)"
          ],
          "phase": "Field update"
        },
        {
          "line": 86,
          "title": "Update B composed plan",
          "reason": "The override calls b.plan.addVisits(1); control now enters P1Plan.addVisits.",
          "state": {},
          "stack": [
            "main",
            "Device@2.record(1)",
            "Plan@4.addVisits(1)"
          ],
          "phase": "Composition update"
        },
        {
          "line": 38,
          "title": "Increment B plan visits",
          "reason": "P1Plan.addVisits changes Plan@4 visits from 2 to 3.",
          "state": {
            "Plan@4": "{ task=\"Calibrate\", visits=3 }"
          },
          "stack": [
            "main",
            "Device@2.record(1)",
            "Plan@4.addVisits(1)"
          ],
          "phase": "Field update"
        },
        {
          "line": 9,
          "title": "Dispatch Device@1.label()",
          "reason": "Java enters the P1Device.label override for Device@1.",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()"
          ],
          "phase": "Dynamic dispatch",
          "focus": "a.label()"
        },
        {
          "line": 91,
          "title": "Call super.label()",
          "reason": "The P1Device.label expression evaluates super.label() before it can concatenate the plan.",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Asset.label()"
          ],
          "phase": "Superclass method call",
          "focus": "super.label()",
          "reads": {
            "Device@1": "read inherited id and hours through this object"
          }
        },
        {
          "line": 66,
          "title": "Return inherited label",
          "reason": "super.label() reads the inherited fields and returns \"A:2\".",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Asset.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@1": "read inherited id and hours"
          }
        },
        {
          "line": 91,
          "title": "Convert plan for concatenation",
          "reason": "The + operator needs text for plan, so Java invokes plan.toString().",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Plan.toString()"
          ],
          "phase": "Method call",
          "focus": "plan",
          "reads": {
            "Plan@3": "read composed plan reference for string conversion"
          }
        },
        {
          "line": 43,
          "title": "Convert the composed plan to text",
          "reason": "Appending plan calls P1Plan.toString(), which returns \"Inspect(2)\".",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Plan.toString()"
          ],
          "phase": "Return"
        },
        {
          "line": 91,
          "title": "Return complete device label",
          "reason": "The override joins the inherited label, separator, and plan text.",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@1": "use inherited id and hours",
            "Plan@3": "use composed plan text"
          }
        },
        {
          "line": 9,
          "title": "Dispatch Device@2.label()",
          "reason": "Java enters the P1Device.label override for Device@2.",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()"
          ],
          "phase": "Dynamic dispatch",
          "focus": "b.label()"
        },
        {
          "line": 91,
          "title": "Call super.label()",
          "reason": "The P1Device.label expression evaluates super.label() before it can concatenate the plan.",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()",
            "P1Asset.label()"
          ],
          "phase": "Superclass method call",
          "focus": "super.label()",
          "reads": {
            "Device@2": "read inherited id and hours through this object"
          }
        },
        {
          "line": 66,
          "title": "Return inherited label",
          "reason": "super.label() reads the inherited fields and returns \"B:4\".",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()",
            "P1Asset.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@2": "read inherited id and hours"
          }
        },
        {
          "line": 91,
          "title": "Convert plan for concatenation",
          "reason": "The + operator needs text for plan, so Java invokes plan.toString().",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()",
            "P1Plan.toString()"
          ],
          "phase": "Method call",
          "focus": "plan",
          "reads": {
            "Plan@4": "read composed plan reference for string conversion"
          }
        },
        {
          "line": 43,
          "title": "Convert the composed plan to text",
          "reason": "Appending plan calls P1Plan.toString(), which returns \"Calibrate(3)\".",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()",
            "P1Plan.toString()"
          ],
          "phase": "Return"
        },
        {
          "line": 91,
          "title": "Return complete device label",
          "reason": "The override joins the inherited label, separator, and plan text.",
          "state": {},
          "stack": [
            "main",
            "Device@2.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@2": "use inherited id and hours",
            "Plan@4": "use composed plan text"
          }
        },
        {
          "line": 9,
          "title": "Print checkpoint B",
          "reason": "The overridden labels now read the updated inherited and composed fields.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "B A:2 | Inspect(2) | B:4 | Calibrate(3)"
        },
        {
          "line": 10,
          "title": "Change shared only",
          "reason": "main calls shared.addVisits(2); the actual field update occurs inside that method.",
          "state": {},
          "stack": [
            "main",
            "Plan@1.addVisits(2)"
          ],
          "phase": "Independent object update"
        },
        {
          "line": 38,
          "title": "Add two visits to shared",
          "reason": "P1Plan.addVisits executes visits += 2, changing Plan@1 from 2 to 4.",
          "state": {
            "Plan@1": "{ task=\"Calibrate\", visits=4 }"
          },
          "stack": [
            "main",
            "Plan@1.addVisits(2)"
          ],
          "phase": "Field update"
        },
        {
          "line": 11,
          "title": "Request shared text",
          "reason": "String concatenation needs text for shared, so Java calls shared.toString().",
          "state": {},
          "stack": [
            "main",
            "Plan@1.toString()"
          ],
          "phase": "Method call",
          "focus": "shared"
        },
        {
          "line": 43,
          "title": "Convert shared to text",
          "reason": "String concatenation calls shared.toString(), returning \"Calibrate(4)\".",
          "state": {},
          "stack": [
            "main",
            "Plan@1.toString()"
          ],
          "phase": "Return",
          "reads": {
            "Plan@1": "read task and visits for toString()"
          }
        },
        {
          "line": 11,
          "title": "Request b.plan text",
          "reason": "String concatenation next needs text for b.plan, so Java calls b.plan.toString().",
          "state": {},
          "stack": [
            "main",
            "Plan@4.toString()"
          ],
          "phase": "Method call",
          "focus": "b.plan"
        },
        {
          "line": 43,
          "title": "Convert b.plan to text",
          "reason": "String concatenation calls b.plan.toString(), returning \"Calibrate(3)\".",
          "state": {},
          "stack": [
            "main",
            "Plan@4.toString()"
          ],
          "phase": "Return",
          "reads": {
            "Plan@4": "read task and visits for toString()"
          }
        },
        {
          "line": 11,
          "title": "Print checkpoint C",
          "reason": "toString is selected for each plan. shared and b.plan prove the copy is independent.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "C shared=Calibrate(4) b.plan=Calibrate(3)"
        },
        {
          "line": 12,
          "title": "Alias A\u2019s composed plan",
          "reason": "alias receives the exact reference in a.plan, so both point to Plan@3.",
          "state": {
            "alias": "\u2192 Plan@3"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference assignment"
        },
        {
          "line": 13,
          "title": "Mutate through alias",
          "reason": "main calls alias.addVisits(1); control enters the method on Plan@3.",
          "state": {},
          "stack": [
            "main",
            "Plan@3.addVisits(1)"
          ],
          "phase": "Aliasing"
        },
        {
          "line": 38,
          "title": "Update the aliased plan",
          "reason": "P1Plan.addVisits changes Plan@3 visits from 2 to 3.",
          "state": {
            "Plan@3": "{ task=\"Inspect\", visits=3 }"
          },
          "stack": [
            "main",
            "Plan@3.addVisits(1)"
          ],
          "phase": "Field update"
        },
        {
          "line": 14,
          "title": "Dispatch a.label()",
          "reason": "a is Device@1, so the override runs.",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()"
          ],
          "phase": "Dynamic dispatch",
          "focus": "a.label()"
        },
        {
          "line": 91,
          "title": "Call super.label()",
          "reason": "The P1Device.label expression evaluates super.label() before it can concatenate the plan.",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Asset.label()"
          ],
          "phase": "Superclass method call",
          "focus": "super.label()",
          "reads": {
            "Device@1": "read inherited id and hours through this object"
          }
        },
        {
          "line": 66,
          "title": "Return inherited A label",
          "reason": "super.label() returns \"A:2\".",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Asset.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@1": "read inherited id and hours"
          }
        },
        {
          "line": 91,
          "title": "Convert plan for concatenation",
          "reason": "The + operator needs text for plan, so Java invokes plan.toString().",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "P1Plan.toString()"
          ],
          "phase": "Method call",
          "focus": "plan",
          "reads": {
            "Plan@3": "read composed plan reference for string conversion"
          }
        },
        {
          "line": 43,
          "title": "Convert updated plan to text",
          "reason": "P1Plan.toString() reads the alias-updated visits and returns \"Inspect(3)\".",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()",
            "Plan@3.toString()"
          ],
          "phase": "Return",
          "reads": {
            "Plan@3": "read task and visits for toString()"
          }
        },
        {
          "line": 91,
          "title": "Return complete A label",
          "reason": "The override returns \"A:2 | Inspect(3)\".",
          "state": {},
          "stack": [
            "main",
            "Device@1.label()"
          ],
          "phase": "Return",
          "reads": {
            "Device@1": "use inherited id and hours",
            "Plan@3": "use composed plan text"
          }
        },
        {
          "line": 14,
          "title": "Compare the two references",
          "reason": "After a.label() returns, Java evaluates alias == a.plan. Both references point to Plan@3, so the result is true.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Reference comparison",
          "focus": "alias == a.plan",
          "reads": {
            "alias": "read reference to Plan@3",
            "Device@1": "read plan reference to Plan@3"
          }
        },
        {
          "line": 14,
          "title": "Print checkpoint D",
          "reason": "a.label sees the alias mutation, and alias == a.plan evaluates true.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "D A:2 | Inspect(3) same=true"
        }
      ]
    },
    {
      "title": "Problem 2 \u2014 Polymorphism and Engine Copies",
      "source": "public class Trace03Problem2 {\n  public static void main(String[] args) {\n    P2Engine source = new P2Engine(5);\n    P2Van van = new P2Van(\"V1\", source);\n    P2Vehicle route = van;\n    System.out.println(\"A \" + route.status());\n    route.travel(3);\n    System.out.println(\"B \" + route.status());\n    source.boost();\n    System.out.println(\"C source=\" + source.power + \" van=\" + van.engine.power);\n    P2Van spare = new P2Van(\"V2\");\n    spare.travel(2);\n    System.out.println(\"D \" + spare.status());\n  }\n}\n\nclass P2Engine {\n  int power;\n\n  P2Engine() {\n    this(1);\n  }\n\n  P2Engine(int power) {\n    this.power = power;\n    System.out.println(\"engine \" + power);\n  }\n\n  P2Engine(P2Engine other) {\n    this(other.power);\n    System.out.println(\"engine copy \" + power);\n  }\n\n  void boost() {\n    power++;\n  }\n}\n\nclass P2Vehicle {\n  String id;\n  int miles;\n\n  P2Vehicle(String id) {\n    this(id, 0);\n  }\n\n  P2Vehicle(String id, int miles) {\n    this.id = id;\n    this.miles = miles;\n    System.out.println(\"vehicle \" + id + \" \" + miles);\n  }\n\n  void travel(int distance) {\n    miles += distance;\n  }\n\n  String status() {\n    return id + \":\" + miles;\n  }\n}\n\nclass P2Van extends P2Vehicle {\n  P2Engine engine;\n  int deliveries;\n\n  P2Van(String id) {\n    this(id, new P2Engine());\n  }\n\n  P2Van(String id, P2Engine engine) {\n    super(id);\n    this.engine = new P2Engine(engine);\n    System.out.println(\"van \" + id);\n  }\n\n  @Override\n  void travel(int distance) {\n    super.travel(distance);\n    deliveries++;\n    engine.boost();\n  }\n\n  @Override\n  String status() {\n    return super.status() + \" power=\" + engine.power + \" deliveries=\" + deliveries;\n  }\n}",
      "steps": [
        {
          "line": 3,
          "title": "Construct source engine",
          "reason": "new P2Engine(5) selects the integer constructor.",
          "state": {},
          "stack": [
            "main",
            "P2Engine(5)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 18,
          "title": "Default-initialize source power",
          "reason": "Engine@1.power starts at Java\u2019s default 0.",
          "state": {
            "Engine@1": "{ power=0 }"
          },
          "stack": [
            "main",
            "P2Engine(5)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 25,
          "title": "Initialize power",
          "reason": "Engine@1.power receives 5.",
          "state": {
            "Engine@1": "{ power=5 }"
          },
          "stack": [
            "main",
            "P2Engine(5)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 26,
          "title": "Print engine construction",
          "reason": "The engine constructor prints its field.",
          "state": {},
          "stack": [
            "main",
            "P2Engine(5)"
          ],
          "phase": "Console output",
          "output": "engine 5"
        },
        {
          "line": 3,
          "title": "Assign source",
          "reason": "source points to Engine@1.",
          "state": {
            "source": "\u2192 Engine@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 4,
          "title": "Construct van V1",
          "reason": "The full P2Van constructor receives source Engine@1.",
          "state": {},
          "stack": [
            "main",
            "P2Van(\"V1\", Engine@1)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 40,
          "title": "Default-initialize V1 id",
          "reason": "The inherited id reference starts null.",
          "state": {
            "Van@1": "{ id=null, miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(\"V1\", Engine@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 41,
          "title": "Default-initialize V1 miles",
          "reason": "The inherited int miles starts 0.",
          "state": {
            "Van@1": "{ id=null, miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(\"V1\", Engine@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 63,
          "title": "Default-initialize V1 engine reference",
          "reason": "The composed engine reference starts null.",
          "state": {
            "Van@1": "{ id=null, miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(\"V1\", Engine@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 64,
          "title": "Default-initialize V1 deliveries",
          "reason": "The subclass int deliveries starts 0.",
          "state": {
            "Van@1": "{ id=null, miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(\"V1\", Engine@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 71,
          "title": "Initialize superclass first",
          "reason": "super(id) calls P2Vehicle(String).",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V1\")"
          ],
          "phase": "Superclass call"
        },
        {
          "line": 44,
          "title": "Delegate vehicle constructor",
          "reason": "P2Vehicle(String) delegates with this(id, 0).",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V1\",0)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 48,
          "title": "Initialize vehicle id",
          "reason": "The first full vehicle-constructor statement stores id=\"V1\".",
          "state": {
            "Van@1": "{ id=\"V1\", miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V1\",0)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 49,
          "title": "Initialize vehicle miles",
          "reason": "The next statement stores miles=0.",
          "state": {
            "Van@1": "{ id=\"V1\", miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V1\",0)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 50,
          "title": "Print vehicle construction",
          "reason": "The superclass constructor prints and returns.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V1\",0)"
          ],
          "phase": "Console output",
          "output": "vehicle V1 0"
        },
        {
          "line": 72,
          "title": "Copy the engine",
          "reason": "new P2Engine(engine) invokes the copy constructor with Engine@1.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(Engine@1)"
          ],
          "phase": "Composition copy"
        },
        {
          "line": 18,
          "title": "Default-initialize copied engine power",
          "reason": "Engine@2.power starts 0 before its constructor assigns 5.",
          "state": {
            "Engine@2": "{ power=0 }"
          },
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(Engine@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 30,
          "title": "Delegate the copy constructor",
          "reason": "this(other.power) reads 5 and calls the integer constructor.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(5)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 25,
          "title": "Initialize engine copy",
          "reason": "A distinct Engine@2 gets power 5.",
          "state": {
            "Engine@2": "{ power=5 }"
          },
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(5)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 26,
          "title": "Print copied engine creation",
          "reason": "The delegated integer constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(5)"
          ],
          "phase": "Console output",
          "output": "engine 5"
        },
        {
          "line": 31,
          "title": "Finish engine copy",
          "reason": "The copy constructor prints after delegation.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(Engine@1)"
          ],
          "phase": "Console output",
          "output": "engine copy 5"
        },
        {
          "line": 72,
          "title": "Attach composed engine",
          "reason": "Van@1.engine points to Engine@2, independent of source.",
          "state": {
            "Van@1": "{ id=\"V1\", miles=0, engine\u2192Engine@2, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(...)"
          ],
          "phase": "Composition"
        },
        {
          "line": 73,
          "title": "Finish van V1",
          "reason": "The van constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)"
          ],
          "phase": "Console output",
          "output": "van V1"
        },
        {
          "line": 4,
          "title": "Assign van",
          "reason": "van points to Van@1.",
          "state": {
            "van": "\u2192 Van@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 5,
          "title": "Assign superclass reference",
          "reason": "route is declared P2Vehicle but receives the Van@1 reference. No object is copied.",
          "state": {
            "route": "P2Vehicle ref \u2192 Van@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference assignment"
        },
        {
          "line": 6,
          "title": "Dispatch route.status()",
          "reason": "The runtime object is P2Van, so Java selects the overridden status method.",
          "state": {},
          "stack": [
            "main",
            "P2Van.status()"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 85,
          "title": "Reuse superclass status",
          "reason": "super.status() returns V1:0; the override appends engine power and deliveries.",
          "state": {},
          "stack": [
            "main",
            "P2Van.status()",
            "P2Vehicle.status()"
          ],
          "phase": "Superclass method call"
        },
        {
          "line": 58,
          "title": "Return superclass status",
          "reason": "P2Vehicle.status reads id and miles and returns \"V1:0\".",
          "state": {},
          "stack": [
            "main",
            "P2Van.status()",
            "P2Vehicle.status()"
          ],
          "phase": "Return",
          "reads": {
            "Van@1": "read inherited id and miles"
          }
        },
        {
          "line": 85,
          "title": "Return complete van status",
          "reason": "The override appends power and deliveries.",
          "state": {},
          "stack": [
            "main",
            "P2Van.status()"
          ],
          "phase": "Return",
          "reads": {
            "Van@1": "read id, miles, and deliveries",
            "Engine@2": "read composed engine power"
          }
        },
        {
          "line": 6,
          "title": "Print checkpoint A",
          "reason": "The overridden status result is printed.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "A V1:0 power=5 deliveries=0"
        },
        {
          "line": 7,
          "title": "Dispatch route.travel(3)",
          "reason": "Runtime type P2Van selects the override even though route has superclass reference type.",
          "state": {},
          "stack": [
            "main",
            "Van@1.travel(3)"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 78,
          "title": "Update inherited miles",
          "reason": "super.travel(3) changes miles from 0 to 3.",
          "state": {},
          "stack": [
            "main",
            "Van@1.travel(3)",
            "P2Vehicle.travel(3)"
          ],
          "phase": "Superclass method call"
        },
        {
          "line": 54,
          "title": "Add distance to inherited miles",
          "reason": "P2Vehicle.travel executes miles += distance, changing 0 to 3.",
          "state": {
            "Van@1": "{ id=\"V1\", miles=3, engine\u2192Engine@2, deliveries=0 }"
          },
          "stack": [
            "main",
            "Van@1.travel(3)",
            "P2Vehicle.travel(3)"
          ],
          "phase": "Field update"
        },
        {
          "line": 79,
          "title": "Count the delivery",
          "reason": "deliveries++ changes 0 to 1.",
          "state": {
            "Van@1": "{ id=\"V1\", miles=3, engine\u2192Engine@2, deliveries=1 }"
          },
          "stack": [
            "main",
            "Van@1.travel(3)"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 80,
          "title": "Boost composed engine",
          "reason": "engine.boost() changes Engine@2 power from 5 to 6.",
          "state": {},
          "stack": [
            "main",
            "Van@1.travel(3)",
            "Engine@2.boost()"
          ],
          "phase": "Composition update"
        },
        {
          "line": 35,
          "title": "Increment composed engine power",
          "reason": "P2Engine.boost executes power++, changing Engine@2 from 5 to 6.",
          "state": {
            "Engine@2": "{ power=6 }"
          },
          "stack": [
            "main",
            "Van@1.travel(3)",
            "Engine@2.boost()"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 8,
          "title": "Dispatch route.status() for checkpoint B",
          "reason": "main evaluates route.status(). Runtime type P2Van selects the override.",
          "state": {},
          "stack": [
            "main",
            "Van@1.status()"
          ],
          "phase": "Dynamic dispatch",
          "focus": "route.status()"
        },
        {
          "line": 85,
          "title": "Call super.status() for V1",
          "reason": "Inside the override, super.status() requests the P2Vehicle implementation.",
          "state": {},
          "stack": [
            "main",
            "Van@1.status()",
            "P2Vehicle.status()"
          ],
          "phase": "Superclass method call",
          "focus": "super.status()",
          "reads": {
            "Van@1": "read inherited id and miles through this object"
          }
        },
        {
          "line": 58,
          "title": "Return V1 superclass status",
          "reason": "P2Vehicle.status returns \"V1:3\".",
          "state": {},
          "stack": [
            "main",
            "Van@1.status()",
            "P2Vehicle.status()"
          ],
          "phase": "Return",
          "reads": {
            "Van@1": "read inherited id and miles"
          }
        },
        {
          "line": 85,
          "title": "Return complete V1 status",
          "reason": "The override appends power 6 and deliveries 1.",
          "state": {},
          "stack": [
            "main",
            "Van@1.status()"
          ],
          "phase": "Return",
          "reads": {
            "Van@1": "read id, miles, and deliveries",
            "Engine@2": "read composed engine power"
          }
        },
        {
          "line": 8,
          "title": "Print checkpoint B",
          "reason": "The overridden status reads all updated fields.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "B V1:3 power=6 deliveries=1"
        },
        {
          "line": 9,
          "title": "Boost source independently",
          "reason": "source points to Engine@1, so only Engine@1 changes from 5 to 6.",
          "state": {},
          "stack": [
            "main",
            "Engine@1.boost()"
          ],
          "phase": "Independent object update"
        },
        {
          "line": 35,
          "title": "Increment source power",
          "reason": "P2Engine.boost executes power++, changing Engine@1 from 5 to 6.",
          "state": {
            "Engine@1": "{ power=6 }"
          },
          "stack": [
            "main",
            "Engine@1.boost()"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 10,
          "title": "Print checkpoint C",
          "reason": "Both engines now contain 6, but they are distinct objects.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "C source=6 van=6"
        },
        {
          "line": 11,
          "title": "Begin short V2 constructor",
          "reason": "new P2Van(\"V2\") first evaluates new P2Engine().",
          "state": {},
          "stack": [
            "main",
            "P2Van(\"V2\")",
            "P2Engine()"
          ],
          "phase": "Argument evaluation"
        },
        {
          "line": 40,
          "title": "Default-initialize V2 id",
          "reason": "Van@2.id starts null.",
          "state": {
            "Van@2": "{ id=null, miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(\"V2\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 41,
          "title": "Default-initialize V2 miles",
          "reason": "Van@2.miles starts 0.",
          "state": {
            "Van@2": "{ id=null, miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(\"V2\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 63,
          "title": "Default-initialize V2 engine reference",
          "reason": "Van@2.engine starts null.",
          "state": {
            "Van@2": "{ id=null, miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(\"V2\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 64,
          "title": "Default-initialize V2 deliveries",
          "reason": "Van@2.deliveries starts 0.",
          "state": {
            "Van@2": "{ id=null, miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(\"V2\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 67,
          "title": "Evaluate V2 this(...) arguments",
          "reason": "The short P2Van constructor begins evaluating this(id, new P2Engine()). It must construct the engine argument first.",
          "state": {},
          "stack": [
            "main",
            "P2Van(\"V2\")"
          ],
          "phase": "Argument evaluation",
          "focus": "this(id, new P2Engine())"
        },
        {
          "line": 18,
          "title": "Default-initialize temporary engine power",
          "reason": "Engine@3.power starts 0.",
          "state": {
            "Engine@3": "{ power=0 }"
          },
          "stack": [
            "main",
            "P2Van(\"V2\")",
            "P2Engine()"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 21,
          "title": "Delegate default engine",
          "reason": "P2Engine() calls this(1).",
          "state": {},
          "stack": [
            "main",
            "P2Van(\"V2\")",
            "P2Engine(1)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 25,
          "title": "Initialize temporary engine",
          "reason": "Engine@3 gets power 1.",
          "state": {
            "Engine@3": "{ power=1 }"
          },
          "stack": [
            "main",
            "P2Van(\"V2\")",
            "P2Engine(1)"
          ],
          "phase": "Field initialization"
        },
        {
          "line": 26,
          "title": "Print temporary engine",
          "reason": "The delegated engine constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P2Van(\"V2\")",
            "P2Engine(1)"
          ],
          "phase": "Console output",
          "output": "engine 1"
        },
        {
          "line": 67,
          "title": "Delegate V2 constructor",
          "reason": "this(id, Engine@3) enters the full van constructor.",
          "state": {},
          "stack": [
            "main",
            "P2Van(\"V2\", Engine@3)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 71,
          "title": "Construct V2 superclass",
          "reason": "The vehicle part initializes before the van body.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V2\",0)"
          ],
          "phase": "Superclass construction"
        },
        {
          "line": 44,
          "title": "Delegate V2 vehicle constructor",
          "reason": "P2Vehicle(String) calls this(id, 0).",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V2\",0)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 48,
          "title": "Initialize V2 id",
          "reason": "The full vehicle constructor stores id=\"V2\".",
          "state": {
            "Van@2": "{ id=\"V2\", miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V2\",0)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 49,
          "title": "Initialize V2 miles",
          "reason": "The next statement stores miles=0.",
          "state": {
            "Van@2": "{ id=\"V2\", miles=0, engine=null, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V2\",0)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 50,
          "title": "Print V2 vehicle construction",
          "reason": "The P2Vehicle constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Vehicle(\"V2\",0)"
          ],
          "phase": "Console output",
          "output": "vehicle V2 0"
        },
        {
          "line": 72,
          "title": "Copy temporary engine",
          "reason": "The copy constructor creates independent Engine@4 from Engine@3.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(Engine@3)"
          ],
          "phase": "Composition copy"
        },
        {
          "line": 18,
          "title": "Default-initialize V2 copied-engine power",
          "reason": "Engine@4.power starts 0 before the copy constructor assigns 1.",
          "state": {
            "Engine@4": "{ power=0 }"
          },
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(Engine@3)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 30,
          "title": "Delegate V2 engine copy constructor",
          "reason": "P2Engine(P2Engine) reads other.power and calls this(1).",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(Engine@3)",
            "P2Engine(1)"
          ],
          "phase": "Constructor delegation",
          "focus": "this(other.power)"
        },
        {
          "line": 25,
          "title": "Initialize V2 copied-engine power",
          "reason": "The delegated P2Engine(int) constructor stores power=1 in Engine@4.",
          "state": {
            "Engine@4": "{ power=1 }"
          },
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(Engine@3)",
            "P2Engine(1)"
          ],
          "phase": "Field assignment",
          "focus": "this.power = power"
        },
        {
          "line": 26,
          "title": "Print V2 engine copy creation",
          "reason": "The delegated integer constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(1)"
          ],
          "phase": "Console output",
          "output": "engine 1"
        },
        {
          "line": 31,
          "title": "Print V2 copy completion",
          "reason": "The copy constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)",
            "P2Engine(Engine@3)"
          ],
          "phase": "Console output",
          "output": "engine copy 1"
        },
        {
          "line": 72,
          "title": "Attach V2 engine",
          "reason": "Van@2 owns Engine@4.",
          "state": {
            "Van@2": "{ id=\"V2\", miles=0, engine\u2192Engine@4, deliveries=0 }"
          },
          "stack": [
            "main",
            "P2Van(...)"
          ],
          "phase": "Composition"
        },
        {
          "line": 73,
          "title": "Finish V2 van",
          "reason": "The van constructor prints and returns.",
          "state": {},
          "stack": [
            "main",
            "P2Van(...)"
          ],
          "phase": "Console output",
          "output": "van V2"
        },
        {
          "line": 11,
          "title": "Assign spare",
          "reason": "spare points to Van@2.",
          "state": {
            "spare": "\u2192 Van@2"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 12,
          "title": "Dispatch spare.travel(2)",
          "reason": "spare is a P2Van, so Java enters the overridden travel method.",
          "state": {},
          "stack": [
            "main",
            "Van@2.travel(2)"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 78,
          "title": "Call V2 superclass travel",
          "reason": "The override calls super.travel(2).",
          "state": {},
          "stack": [
            "main",
            "Van@2.travel(2)",
            "P2Vehicle.travel(2)"
          ],
          "phase": "Superclass method call"
        },
        {
          "line": 54,
          "title": "Update V2 inherited miles",
          "reason": "miles += distance changes 0 to 2.",
          "state": {
            "Van@2": "{ id=\"V2\", miles=2, engine\u2192Engine@4, deliveries=0 }"
          },
          "stack": [
            "main",
            "Van@2.travel(2)",
            "P2Vehicle.travel(2)"
          ],
          "phase": "Field update"
        },
        {
          "line": 79,
          "title": "Count V2 delivery",
          "reason": "deliveries++ changes 0 to 1.",
          "state": {
            "Van@2": "{ id=\"V2\", miles=2, engine\u2192Engine@4, deliveries=1 }"
          },
          "stack": [
            "main",
            "Van@2.travel(2)"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 80,
          "title": "Call V2 engine boost",
          "reason": "engine.boost() transfers control to Engine@4.",
          "state": {},
          "stack": [
            "main",
            "Van@2.travel(2)",
            "Engine@4.boost()"
          ],
          "phase": "Method call"
        },
        {
          "line": 35,
          "title": "Increment V2 engine power",
          "reason": "power++ changes Engine@4 from 1 to 2.",
          "state": {
            "Engine@4": "{ power=2 }"
          },
          "stack": [
            "main",
            "Van@2.travel(2)",
            "Engine@4.boost()"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 13,
          "title": "Dispatch spare.status()",
          "reason": "main evaluates spare.status(). Runtime type P2Van selects the override.",
          "state": {},
          "stack": [
            "main",
            "Van@2.status()"
          ],
          "phase": "Dynamic dispatch",
          "focus": "spare.status()"
        },
        {
          "line": 85,
          "title": "Call super.status() for V2",
          "reason": "Inside the override, super.status() requests the P2Vehicle implementation.",
          "state": {},
          "stack": [
            "main",
            "Van@2.status()",
            "P2Vehicle.status()"
          ],
          "phase": "Superclass method call",
          "focus": "super.status()",
          "reads": {
            "Van@2": "read inherited id and miles through this object"
          }
        },
        {
          "line": 58,
          "title": "Return V2 superclass status",
          "reason": "P2Vehicle.status returns \"V2:2\".",
          "state": {},
          "stack": [
            "main",
            "Van@2.status()",
            "P2Vehicle.status()"
          ],
          "phase": "Return",
          "reads": {
            "Van@2": "read inherited id and miles"
          }
        },
        {
          "line": 85,
          "title": "Return complete V2 status",
          "reason": "The override appends power 2 and deliveries 1.",
          "state": {},
          "stack": [
            "main",
            "Van@2.status()"
          ],
          "phase": "Return",
          "reads": {
            "Van@2": "read id, miles, and deliveries",
            "Engine@4": "read composed engine power"
          }
        },
        {
          "line": 13,
          "title": "Print checkpoint D",
          "reason": "The overridden status reports the completed V2 state.",
          "state": {},
          "stack": [
            "main"
          ],
          "phase": "Console output",
          "output": "D V2:2 power=2 deliveries=1"
        }
      ]
    }
  ]
};
