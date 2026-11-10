"""Compile the current examples and verify outputs and boundary cases."""
from pathlib import Path
import subprocess,tempfile,re,json
D=Path(__file__).resolve().parent.parent/'java'
CONFIG={'lecture': 27, 'mains': ['Slide09_MergeSort', 'Slide16_QuickSort'], 'timingClass': None}
HARNESS='import java.util.*;\nimport java.io.*;\nimport java.lang.reflect.*;\npublic class LectureChecks {\n public static void main(String[] args)throws Exception{\n  PrintStream console=System.out;System.setOut(new PrintStream(OutputStream.nullOutputStream()));\n  Random random=new Random(151);int cases=0;\n  for(int n=0;n<=80;n++)for(int t=0;t<20;t++){\n   int[] a=new int[n];for(int i=0;i<n;i++)a[i]=random.nextInt(31)-15;\n   int[] expected=a.clone();Arrays.sort(expected);int[] merge=a.clone(),quick=a.clone();Slide09_MergeSort.mergeSort(merge);Slide16_QuickSort.quickSort(quick);\n   if(!Arrays.equals(merge,expected)||!Arrays.equals(quick,expected))throw new AssertionError("sort");\n   Slide09_MergeSort.mergeSort(merge);Slide16_QuickSort.quickSort(quick);if(!Arrays.equals(merge,expected)||!Arrays.equals(quick,expected))throw new AssertionError("sorted input");cases++;\n  }\n  Method partition=Slide16_QuickSort.class.getDeclaredMethod("partition",int[].class,int.class,int.class);partition.setAccessible(true);int[] values={8,3,1,7,0,10,2,5};int p=(int)partition.invoke(null,values,0,7);\n  if(p!=6||!Arrays.equals(values,new int[]{5,3,1,7,0,2,8,10}))throw new AssertionError("slide 15 partition");\n  System.setOut(console);System.out.println(cases+" sorting cases; repeated sorted inputs; and the exact slide 15 partition passed.");\n }\n}'
with tempfile.TemporaryDirectory() as td:
    subprocess.run(['javac','-Xlint:all','-d',td,*map(str,D.glob('*.java'))],check=True)
    for name in CONFIG['mains']:
        output=subprocess.check_output(['java','-cp',td,name],text=True)
        expected=(D/'expected-output'/(name+'.txt')).read_text()
        if name==CONFIG['timingClass']:
            assert output.count('sorted=true')==3 and len(output.splitlines())==3
            output=re.sub(r'[\d,]+ ns','<elapsed> ns',output)
            # Width formatting varies as timing values change; normalize whitespace.
            assert output.split()==expected.split(),name
        else:
            assert output==expected,name
        print(name+': output verified')
    f=Path(td)/'LectureChecks.java';f.write_text(HARNESS)
    subprocess.run(['javac','-cp',td,'-d',td,str(f)],check=True)
    subprocess.run(['java','-cp',td,'LectureChecks'],check=True)
print('In-class lab: all Java checks passed.')
