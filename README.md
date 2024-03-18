# claude3-hackathon

For this hackathon, we designed a system to evaluate
the performance of students in the MIT Media Lab class
How To Grow Almost Anything (htgaa.org).  The students
were given a task to design mutants of the lysis protein
in the MS2 bacteriophage.  Our system tells Claude 3 Opus
about the problem, and then gives it the students work.
It then gives a detailed evaluation of the work as if
it were at the graduate student level.

All of the results are preprocessed and in the corresponding
out-{student-name}.txt file.

To regenerate the results, please run the script on each student
work.  To do this try:

	zsh
	for i in data/students/protein-design-part-2/* ; p claude3-mark.py $i | tee out-$i:t


To regenerate the design part, please run:

python3 claude3-design.py all-protein-design.txt| tee all-protein-design-out.txt

