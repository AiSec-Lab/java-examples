window.TRACE_SET = {
  "title": "Exercise 4 \u2014 Animated Java Traces",
  "subtitle": "Short tracing review: increments, constructors, composition, overriding, and references",
  "programs": [
    {
      "title": "Problem 1 \u2014 Pre/Post Increment",
      "source": "public class Trace04Problem1 {\n  public static void main(String[] args) {\n    int n = 2;\n    P1Counter counter = new P1Counter(5);\n\n    int first = counter.change(n++);\n    System.out.println(\"A \" + first + \" \" + n + \" \" + counter.value);\n\n    int second = counter.change(++n);\n    System.out.println(\"B \" + second + \" \" + n + \" \" + counter.value);\n  }\n}\n\nclass P1Counter {\n  int value;\n\n  P1Counter(int value) {\n    this.value = value;\n  }\n\n  int change(int amount) {\n    value = value + amount;\n    return value;\n  }\n}",
      "steps": [
        {
          "line": 3,
          "title": "Create local n",
          "reason": "The integer literal 2 is stored in the local variable n.",
          "state": {
            "n": "2"
          },
          "stack": [
            "main"
          ],
          "phase": "Initialize"
        },
        {
          "line": 4,
          "title": "Request a P1Counter object",
          "reason": "Java evaluates new P1Counter(5) and transfers control to the matching constructor.",
          "state": {},
          "stack": [
            "main",
            "P1Counter(5)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 15,
          "title": "Default-initialize counter.value",
          "reason": "Object allocation gives the int field its Java default value 0 before the constructor body.",
          "state": {
            "counter object": "P1Counter@1 { value=0 }"
          },
          "stack": [
            "main",
            "P1Counter(5)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 18,
          "title": "Initialize the counter field",
          "reason": "The parameter value is 5. this.value names the field of the new object.",
          "state": {
            "counter object": "P1Counter@1 { value=5 }"
          },
          "stack": [
            "main",
            "P1Counter(5)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 4,
          "title": "Store the new reference",
          "reason": "The constructor returns. counter now refers to the completed object.",
          "state": {
            "counter": "\u2192 P1Counter@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 6,
          "title": "Evaluate n++",
          "reason": "Post-increment produces the old value 2 for the argument, then changes n to 3.",
          "state": {
            "n": "3",
            "argument amount": "2"
          },
          "stack": [
            "main"
          ],
          "phase": "Post-increment"
        },
        {
          "line": 6,
          "title": "Invoke counter.change(2)",
          "reason": "The post-increment expression produced 2; Java now calls change with that value.",
          "state": {},
          "stack": [
            "main",
            "counter.change(2)"
          ],
          "phase": "Method call",
          "focus": "counter.change(n++)"
        },
        {
          "line": 21,
          "title": "Enter change(2)",
          "reason": "The receiver is P1Counter@1 and the copied parameter amount is 2.",
          "state": {},
          "stack": [
            "main",
            "counter.change(2)"
          ],
          "phase": "Method call"
        },
        {
          "line": 22,
          "title": "Update the object field",
          "reason": "Read value 5 and amount 2, add them, and store 7 back into the same object.",
          "state": {
            "counter object": "P1Counter@1 { value=7 }"
          },
          "stack": [
            "main",
            "counter.change(2)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 23,
          "title": "Return 7",
          "reason": "The method reads the updated field and returns 7 to the caller.",
          "state": {
            "return value": "7"
          },
          "stack": [
            "main",
            "counter.change(2)"
          ],
          "phase": "Return"
        },
        {
          "line": 6,
          "title": "Store first",
          "reason": "The returned value 7 is assigned to first.",
          "state": {
            "first": "7"
          },
          "stack": [
            "main"
          ],
          "phase": "Assignment"
        },
        {
          "line": 7,
          "title": "Print checkpoint A",
          "reason": "String concatenation reads first=7, n=3, and counter.value=7.",
          "state": {},
          "stack": [
            "main"
          ],
          "output": "A 7 3 7",
          "phase": "Console output"
        },
        {
          "line": 9,
          "title": "Evaluate ++n",
          "reason": "Pre-increment changes n from 3 to 4 first. The argument value is therefore 4.",
          "state": {
            "n": "4",
            "argument amount": "4"
          },
          "stack": [
            "main"
          ],
          "phase": "Pre-increment"
        },
        {
          "line": 9,
          "title": "Invoke counter.change(4)",
          "reason": "The pre-increment expression produced 4; Java now calls change with that value.",
          "state": {},
          "stack": [
            "main",
            "counter.change(4)"
          ],
          "phase": "Method call",
          "focus": "counter.change(++n)"
        },
        {
          "line": 21,
          "title": "Enter change(4)",
          "reason": "Java calls the same method with amount equal to 4.",
          "state": {},
          "stack": [
            "main",
            "counter.change(4)"
          ],
          "phase": "Method call"
        },
        {
          "line": 22,
          "title": "Update the counter again",
          "reason": "Read 7 and 4, add them, and store 11 in the object field.",
          "state": {
            "counter object": "P1Counter@1 { value=11 }"
          },
          "stack": [
            "main",
            "counter.change(4)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 23,
          "title": "Return 11",
          "reason": "The updated value is returned to main.",
          "state": {
            "return value": "11"
          },
          "stack": [
            "main",
            "counter.change(4)"
          ],
          "phase": "Return"
        },
        {
          "line": 9,
          "title": "Store second",
          "reason": "The returned value 11 is assigned to second.",
          "state": {
            "second": "11"
          },
          "stack": [
            "main"
          ],
          "phase": "Assignment"
        },
        {
          "line": 10,
          "title": "Print checkpoint B",
          "reason": "The print reads second=11, n=4, and counter.value=11.",
          "state": {},
          "stack": [
            "main"
          ],
          "output": "B 11 4 11",
          "phase": "Console output"
        }
      ]
    },
    {
      "title": "Problem 2 \u2014 Constructors and Composition",
      "source": "public class Trace04Problem2 {\n  public static void main(String[] args) {\n    P2Label original = new P2Label(\"Lab\");\n    P2Device first = new P2Device(\"A\");\n    P2Device second = new P2Device(\"B\", original);\n\n    original.text = \"Changed\";\n    System.out.println(\"A \" + original.text + \" \" + second.label.text);\n\n    P2Label alias = first.label;\n    alias.text = \"Ready\";\n    System.out.println(\"B \" + first.label.text + \" \" + (alias == first.label));\n  }\n}\n\nclass P2Label {\n  String text;\n\n  P2Label(String text) {\n    this.text = text;\n    System.out.println(\"label \" + text);\n  }\n\n  P2Label(P2Label other) {\n    this(other.text);\n  }\n}\n\nclass P2Asset {\n  String id;\n\n  P2Asset(String id) {\n    this.id = id;\n    System.out.println(\"asset \" + id);\n  }\n}\n\nclass P2Device extends P2Asset {\n  P2Label label;\n\n  P2Device(String id) {\n    this(id, new P2Label(\"Default\"));\n  }\n\n  P2Device(String id, P2Label label) {\n    super(id);\n    this.label = new P2Label(label);\n    System.out.println(\"device \" + id);\n  }\n}",
      "steps": [
        {
          "line": 3,
          "title": "Construct original label",
          "reason": "new P2Label(\"Lab\") transfers control to the label constructor.",
          "state": {},
          "stack": [
            "main",
            "P2Label(\"Lab\")"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 17,
          "title": "Default-initialize original text",
          "reason": "The reference field begins as null before the constructor assigns \"Lab\".",
          "state": {
            "Label@1": "{ text=null }"
          },
          "stack": [
            "main",
            "P2Label(\"Lab\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 20,
          "title": "Store the label text",
          "reason": "this.text receives \"Lab\" in the new object.",
          "state": {
            "Label@1": "{ text=\"Lab\" }"
          },
          "stack": [
            "main",
            "P2Label(\"Lab\")"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 21,
          "title": "Print from the constructor",
          "reason": "The constructor prints after initializing the field.",
          "state": {},
          "stack": [
            "main",
            "P2Label(\"Lab\")"
          ],
          "output": "label Lab",
          "phase": "Console output"
        },
        {
          "line": 3,
          "title": "Assign original",
          "reason": "The completed label reference is stored in original.",
          "state": {
            "original": "\u2192 Label@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 4,
          "title": "Call the short device constructor",
          "reason": "new P2Device(\"A\") enters the one-argument constructor.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\")"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 30,
          "title": "Default-initialize inherited id",
          "reason": "Device@1\u2019s inherited reference field starts null.",
          "state": {
            "Device@1": "{ id=null, label=null }"
          },
          "stack": [
            "main",
            "P2Device(\"A\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 39,
          "title": "Default-initialize composed label reference",
          "reason": "Device@1.label starts null.",
          "state": {
            "Device@1": "{ id=null, label=null }"
          },
          "stack": [
            "main",
            "P2Device(\"A\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 42,
          "title": "Evaluate this(...) arguments",
          "reason": "Before delegating, Java constructs the argument new P2Label(\"Default\").",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\")",
            "P2Label(\"Default\")"
          ],
          "phase": "Argument evaluation"
        },
        {
          "line": 17,
          "title": "Default-initialize temporary label text",
          "reason": "Label@2.text begins as null.",
          "state": {
            "Label@2": "{ text=null }"
          },
          "stack": [
            "main",
            "P2Device(\"A\")",
            "P2Label(\"Default\")"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 20,
          "title": "Initialize temporary label",
          "reason": "The new label stores \"Default\".",
          "state": {
            "Label@2": "{ text=\"Default\" }"
          },
          "stack": [
            "main",
            "P2Device(\"A\")",
            "P2Label(\"Default\")"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 21,
          "title": "Print temporary label construction",
          "reason": "The label constructor produces its output.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\")",
            "P2Label(\"Default\")"
          ],
          "output": "label Default",
          "phase": "Console output"
        },
        {
          "line": 42,
          "title": "Delegate with this(...)",
          "reason": "The short constructor delegates to P2Device(String, P2Label). It does not create a second device.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 46,
          "title": "Call super(id)",
          "reason": "The full device constructor must initialize the P2Asset part first.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)",
            "P2Asset(\"A\")"
          ],
          "phase": "Superclass call"
        },
        {
          "line": 33,
          "title": "Initialize inherited id",
          "reason": "The P2Asset field id receives \"A\".",
          "state": {
            "Device@1": "{ id=\"A\", label=null }"
          },
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)",
            "P2Asset(\"A\")"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 34,
          "title": "Print superclass construction",
          "reason": "The superclass constructor finishes after printing.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)",
            "P2Asset(\"A\")"
          ],
          "output": "asset A",
          "phase": "Console output"
        },
        {
          "line": 47,
          "title": "Copy the supplied label",
          "reason": "new P2Label(label) calls the copy constructor using Label@2.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)",
            "P2Label(Label@2)"
          ],
          "phase": "Composition copy"
        },
        {
          "line": 17,
          "title": "Default-initialize copied label text",
          "reason": "The new Label@3.text starts null before delegation assigns it.",
          "state": {
            "Label@3": "{ text=null }"
          },
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)",
            "P2Label(Label@2)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 25,
          "title": "Delegate from the copy constructor",
          "reason": "this(other.text) reads \"Default\" and delegates to the String constructor.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)",
            "P2Label(Label@2)",
            "P2Label(\"Default\")"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 20,
          "title": "Initialize the independent copy",
          "reason": "A new Label@3 receives the copied text. It is distinct from Label@2.",
          "state": {
            "Label@3": "{ text=\"Default\" }"
          },
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)",
            "P2Label(Label@2)",
            "P2Label(\"Default\")"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 21,
          "title": "Print copied label construction",
          "reason": "The delegated String constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)",
            "P2Label(Label@2)",
            "P2Label(\"Default\")"
          ],
          "output": "label Default",
          "phase": "Console output"
        },
        {
          "line": 47,
          "title": "Attach the composed label",
          "reason": "Device@1.label receives a reference to the new independent Label@3.",
          "state": {
            "Device@1": "{ id=\"A\", label\u2192Label@3 }"
          },
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)"
          ],
          "phase": "Composition"
        },
        {
          "line": 48,
          "title": "Finish device A",
          "reason": "The full constructor prints after superclass and field initialization.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"A\", Label@2)"
          ],
          "output": "device A",
          "phase": "Console output"
        },
        {
          "line": 4,
          "title": "Assign first",
          "reason": "The completed device reference is stored in first.",
          "state": {
            "first": "\u2192 Device@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 5,
          "title": "Construct device B",
          "reason": "The full constructor receives original (Label@1). It first calls super(id).",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)",
            "P2Asset(\"B\")"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 30,
          "title": "Default-initialize B inherited id",
          "reason": "Device@2.id starts null.",
          "state": {
            "Device@2": "{ id=null, label=null }"
          },
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 39,
          "title": "Default-initialize B label reference",
          "reason": "Device@2.label starts null.",
          "state": {
            "Device@2": "{ id=null, label=null }"
          },
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 46,
          "title": "Call B superclass constructor",
          "reason": "The full P2Device constructor executes super(id), transferring control to P2Asset(\"B\").",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)",
            "P2Asset(\"B\")"
          ],
          "phase": "Superclass call",
          "focus": "super(id)"
        },
        {
          "line": 33,
          "title": "Initialize B inherited id",
          "reason": "The superclass part of Device@2 stores id=\"B\".",
          "state": {
            "Device@2": "{ id=\"B\", label=null }"
          },
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)",
            "P2Asset(\"B\")"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 34,
          "title": "Print B superclass construction",
          "reason": "P2Asset finishes its constructor.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)",
            "P2Asset(\"B\")"
          ],
          "output": "asset B",
          "phase": "Console output"
        },
        {
          "line": 47,
          "title": "Copy original for B",
          "reason": "The copy constructor delegates with original.text, which is currently \"Lab\".",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)",
            "P2Label(Label@1)"
          ],
          "phase": "Composition copy"
        },
        {
          "line": 17,
          "title": "Default-initialize B label-copy text",
          "reason": "Label@4.text starts null before the constructor assigns \"Lab\".",
          "state": {
            "Label@4": "{ text=null }"
          },
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)",
            "P2Label(Label@1)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 25,
          "title": "Delegate B label copy constructor",
          "reason": "P2Label(P2Label) reads other.text and calls this(\"Lab\").",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)",
            "P2Label(Label@1)",
            "P2Label(\"Lab\")"
          ],
          "phase": "Constructor delegation",
          "focus": "this(other.text)"
        },
        {
          "line": 20,
          "title": "Initialize B label copy",
          "reason": "The new Label@4 stores \"Lab\" independently.",
          "state": {
            "Label@4": "{ text=\"Lab\" }"
          },
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)",
            "P2Label(Label@1)",
            "P2Label(\"Lab\")"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 21,
          "title": "Print B label construction",
          "reason": "The String label constructor prints.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)",
            "P2Label(Label@1)",
            "P2Label(\"Lab\")"
          ],
          "output": "label Lab",
          "phase": "Console output"
        },
        {
          "line": 47,
          "title": "Attach B label copy",
          "reason": "Device@2.label points to Label@4, not original Label@1.",
          "state": {
            "Device@2": "{ id=\"B\", label\u2192Label@4 }"
          },
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)"
          ],
          "phase": "Composition"
        },
        {
          "line": 48,
          "title": "Finish device B",
          "reason": "The device constructor prints and returns.",
          "state": {},
          "stack": [
            "main",
            "P2Device(\"B\", Label@1)"
          ],
          "output": "device B",
          "phase": "Console output"
        },
        {
          "line": 5,
          "title": "Assign second",
          "reason": "second now refers to Device@2.",
          "state": {
            "second": "\u2192 Device@2"
          },
          "stack": [
            "main"
          ],
          "phase": "Constructor return"
        },
        {
          "line": 7,
          "title": "Mutate original only",
          "reason": "original points to Label@1, so its text changes to \"Changed\". Label@4 inside second is unaffected.",
          "state": {
            "Label@1": "{ text=\"Changed\" }"
          },
          "stack": [
            "main"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 8,
          "title": "Print checkpoint A",
          "reason": "The two different label objects hold different text.",
          "state": {},
          "stack": [
            "main"
          ],
          "output": "A Changed Lab",
          "phase": "Console output"
        },
        {
          "line": 10,
          "title": "Create an alias",
          "reason": "alias receives the same reference stored in first.label. Both point to Label@3.",
          "state": {
            "alias": "\u2192 Label@3"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference assignment"
        },
        {
          "line": 11,
          "title": "Mutate through the alias",
          "reason": "Changing alias.text changes Label@3, which is also visible through first.label.",
          "state": {
            "Label@3": "{ text=\"Ready\" }"
          },
          "stack": [
            "main"
          ],
          "phase": "Aliasing"
        },
        {
          "line": 12,
          "title": "Print checkpoint B",
          "reason": "first.label.text is Ready and alias == first.label is true.",
          "state": {},
          "stack": [
            "main"
          ],
          "output": "B Ready true",
          "phase": "Console output"
        }
      ]
    },
    {
      "title": "Problem 3 \u2014 Overriding and References",
      "source": "public class Trace04Problem3 {\n  public static void main(String[] args) {\n    P3Record record = new P3SpecialRecord(4);\n    System.out.println(\"A \" + record.score() + \" \" + record.describe());\n\n    P3SpecialRecord same = (P3SpecialRecord) record;\n    same.setBonus(3);\n    System.out.println(\"B \" + record.score());\n\n    record = new P3Record(10);\n    System.out.println(\"C \" + record.score() + \" \" + record.describe());\n  }\n}\n\nclass P3Record {\n  int value;\n\n  P3Record(int value) {\n    this.value = value;\n  }\n\n  int score() {\n    return value;\n  }\n\n  String describe() {\n    return \"record \" + value;\n  }\n}\n\nclass P3SpecialRecord extends P3Record {\n  int bonus;\n\n  P3SpecialRecord(int value) {\n    this(value, 1);\n  }\n\n  P3SpecialRecord(int value, int bonus) {\n    super(value);\n    this.bonus = bonus;\n  }\n\n  void setBonus(int bonus) {\n    this.bonus = bonus;\n  }\n\n  @Override\n  int score() {\n    return super.score() + bonus;\n  }\n\n  @Override\n  String describe() {\n    return super.describe() + \" special\";\n  }\n}",
      "steps": [
        {
          "line": 3,
          "title": "Construct a subclass object",
          "reason": "The variable type is P3Record, but new creates a P3SpecialRecord runtime object.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord(4)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 16,
          "title": "Default-initialize inherited value",
          "reason": "The inherited int field starts at Java\u2019s default 0.",
          "state": {
            "Special@1": "{ value=0, bonus=0 }"
          },
          "stack": [
            "main",
            "P3SpecialRecord(4)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 32,
          "title": "Default-initialize subclass bonus",
          "reason": "The subclass int field also starts at 0.",
          "state": {
            "Special@1": "{ value=0, bonus=0 }"
          },
          "stack": [
            "main",
            "P3SpecialRecord(4)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 35,
          "title": "Delegate to the full subclass constructor",
          "reason": "this(value, 1) supplies the default bonus 1.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord(4, 1)"
          ],
          "phase": "Constructor delegation"
        },
        {
          "line": 39,
          "title": "Initialize the superclass first",
          "reason": "super(value) must complete before the subclass constructor body.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord(4, 1)",
            "P3Record(4)"
          ],
          "phase": "Superclass call"
        },
        {
          "line": 19,
          "title": "Store inherited value",
          "reason": "The P3Record part of the object receives value=4.",
          "state": {
            "Special@1": "{ value=4, bonus=0 }"
          },
          "stack": [
            "main",
            "P3SpecialRecord(4, 1)",
            "P3Record(4)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 40,
          "title": "Store subclass bonus",
          "reason": "After super returns, the subclass body stores bonus=1.",
          "state": {
            "Special@1": "{ value=4, bonus=1 }"
          },
          "stack": [
            "main",
            "P3SpecialRecord(4, 1)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 3,
          "title": "Assign the superclass reference",
          "reason": "record can legally refer to a subclass object.",
          "state": {
            "record": "P3Record ref \u2192 Special@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference assignment"
        },
        {
          "line": 4,
          "title": "Dispatch score() by runtime type",
          "reason": "Although record is declared P3Record, its object is P3SpecialRecord, so the override runs.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.score()"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 49,
          "title": "Call super.score()",
          "reason": "The override explicitly requests the superclass implementation, which returns inherited value 4.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.score()",
            "P3Record.score()"
          ],
          "phase": "Superclass method call",
          "reads": {
            "Special@1": "read inherited value through the same runtime object"
          }
        },
        {
          "line": 23,
          "title": "Return inherited score",
          "reason": "P3Record.score executes return value, producing 4.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.score()",
            "P3Record.score()"
          ],
          "phase": "Return",
          "reads": {
            "Special@1": "read value"
          }
        },
        {
          "line": 49,
          "title": "Return the overridden score",
          "reason": "The override adds bonus 1 and returns 5.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.score()"
          ],
          "phase": "Return",
          "reads": {
            "Special@1": "read value and bonus"
          }
        },
        {
          "line": 4,
          "title": "Dispatch describe() by runtime type",
          "reason": "The same runtime object selects P3SpecialRecord.describe().",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.describe()"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 54,
          "title": "Call super.describe()",
          "reason": "The override first evaluates super.describe(), transferring control to P3Record.describe.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.describe()",
            "P3Record.describe()"
          ],
          "phase": "Superclass method call",
          "focus": "super.describe()",
          "reads": {
            "Special@1": "read inherited value through the same runtime object"
          }
        },
        {
          "line": 27,
          "title": "Return inherited description",
          "reason": "P3Record.describe returns \"record 4\" to the override.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.describe()",
            "P3Record.describe()"
          ],
          "phase": "Return",
          "reads": {
            "Special@1": "read value"
          }
        },
        {
          "line": 54,
          "title": "Reuse superclass description",
          "reason": "super.describe() produces \"record 4\"; the override appends \" special\".",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.describe()",
            "P3Record.describe()"
          ],
          "phase": "Superclass method call",
          "reads": {
            "Special@1": "read value and bonus"
          }
        },
        {
          "line": 4,
          "title": "Print checkpoint A",
          "reason": "The two overridden calls supply the printed values.",
          "state": {},
          "stack": [
            "main"
          ],
          "output": "A 5 record 4 special",
          "phase": "Console output"
        },
        {
          "line": 6,
          "title": "Cast the reference",
          "reason": "The runtime object really is P3SpecialRecord, so the cast succeeds. No object is created.",
          "state": {
            "same": "P3SpecialRecord ref \u2192 Special@1"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference cast"
        },
        {
          "line": 7,
          "title": "Call setBonus(3)",
          "reason": "same and record point to the same object.",
          "state": {},
          "stack": [
            "main",
            "Special@1.setBonus(3)"
          ],
          "phase": "Method call"
        },
        {
          "line": 44,
          "title": "Change the shared object",
          "reason": "this.bonus receives 3 in Special@1.",
          "state": {
            "Special@1": "{ value=4, bonus=3 }"
          },
          "stack": [
            "main",
            "Special@1.setBonus(3)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 8,
          "title": "Dispatch score() again",
          "reason": "record still points to Special@1, so the override returns 4 + 3 = 7.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.score()"
          ],
          "phase": "Dynamic dispatch"
        },
        {
          "line": 49,
          "title": "Call super.score() for the updated object",
          "reason": "The override calls the superclass method.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.score()",
            "P3Record.score()"
          ],
          "phase": "Superclass method call",
          "reads": {
            "Special@1": "read inherited value through the same runtime object"
          }
        },
        {
          "line": 23,
          "title": "Return inherited value again",
          "reason": "P3Record.score returns value 4.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.score()",
            "P3Record.score()"
          ],
          "phase": "Return",
          "reads": {
            "Special@1": "read value"
          }
        },
        {
          "line": 49,
          "title": "Add updated bonus and return",
          "reason": "The override adds bonus 3 and returns 7.",
          "state": {},
          "stack": [
            "main",
            "P3SpecialRecord.score()"
          ],
          "phase": "Return",
          "reads": {
            "Special@1": "read value and bonus"
          }
        },
        {
          "line": 8,
          "title": "Print checkpoint B",
          "reason": "The bonus change made through same is visible through record.",
          "state": {},
          "stack": [
            "main"
          ],
          "output": "B 7",
          "phase": "Console output"
        },
        {
          "line": 10,
          "title": "Construct a superclass object",
          "reason": "new P3Record(10) creates a separate base-class object.",
          "state": {},
          "stack": [
            "main",
            "P3Record(10)"
          ],
          "phase": "Constructor call"
        },
        {
          "line": 16,
          "title": "Default-initialize new record value",
          "reason": "Record@2.value starts at 0 before the constructor assigns 10.",
          "state": {
            "Record@2": "{ value=0 }"
          },
          "stack": [
            "main",
            "P3Record(10)"
          ],
          "phase": "Default field initialization"
        },
        {
          "line": 19,
          "title": "Initialize the new value",
          "reason": "Record@2.value receives 10.",
          "state": {
            "Record@2": "{ value=10 }"
          },
          "stack": [
            "main",
            "P3Record(10)"
          ],
          "phase": "Field assignment"
        },
        {
          "line": 10,
          "title": "Reassign record",
          "reason": "record now points to Record@2. same still points to Special@1.",
          "state": {
            "record": "P3Record ref \u2192 Record@2"
          },
          "stack": [
            "main"
          ],
          "phase": "Reference reassignment"
        },
        {
          "line": 11,
          "title": "Call record.score() on the base object",
          "reason": "record now refers to Record@2, so Java selects P3Record.score().",
          "state": {},
          "stack": [
            "main",
            "P3Record.score()"
          ],
          "phase": "Method call",
          "focus": "record.score()"
        },
        {
          "line": 23,
          "title": "Return base score",
          "reason": "P3Record.score returns value 10.",
          "state": {},
          "stack": [
            "main",
            "P3Record.score()"
          ],
          "phase": "Return",
          "reads": {
            "Record@2": "read value"
          }
        },
        {
          "line": 11,
          "title": "Call record.describe() on the base object",
          "reason": "After score returns, Java evaluates record.describe() and selects P3Record.describe().",
          "state": {},
          "stack": [
            "main",
            "P3Record.describe()"
          ],
          "phase": "Method call",
          "focus": "record.describe()"
        },
        {
          "line": 27,
          "title": "Return base description",
          "reason": "P3Record.describe returns \"record 10\".",
          "state": {},
          "stack": [
            "main",
            "P3Record.describe()"
          ],
          "phase": "Return",
          "reads": {
            "Record@2": "read value"
          }
        },
        {
          "line": 11,
          "title": "Print checkpoint C",
          "reason": "The new runtime object supplies the base-class behavior.",
          "state": {},
          "stack": [
            "main"
          ],
          "output": "C 10 record 10",
          "phase": "Console output"
        }
      ]
    }
  ]
};
