#RTRTA

RTRTA is a mobile multiplatform application developed using HTML+CSS+JavaScript to calculate real-time response times.

##Feasibility analysis

The first set of calculus that has been developed is a feasibility analysis for RMA and EDF. The analysis for RMA are a pessimistic result in the sense that they establish a sufficient but not necessary condition.
Within RMA a set of m tasks is feasible if:
```sh
**SUMMATION**(Ci/Ti) < m((2^(1/m))-1)
```
where Ci is the worst-case execution time for task i and Ti is the period of task i.

Within EDF a set of m tasks with Di (Deadline for task i) = Ti is feasible if and only if:
```sh
**SUMMATION**(Ci/Ti) <= 1
```
where Ci is the worst-case execution time for task i and Ti is the period of task i.

##Uniprocessor's response time analysis

The second set of calculus that has been developed is the response time analysis for a set of tasks in a uniprocessor. In this case RMA and DMS scheduling algorithms have benn taken into account. The calculus are done iteratively using the following formula:
```sh
Wi(n+1) = Ci + **SUMMATION**[Wi/Tj]*Cj
```
where Ci is the worst-case execution time for task i, j is an index used to traverse the tasks which priority is higher than the one that is being calculated, Tj is the period of task j and Cj is the worst-case execution time for task j. In the first iteration Wi(0) is equal to Ci.
As said before the calculus are done iteratively and they stop when Wi(n+1) is equal to Wi(n). When this condition is reached the response time can be calculated as follows
```sh
Ri = Wi(n)
```
Now, whether the task meets its deadline can be checked, ergo, Ri should be less or equal to Di. If some of the tasks doesn't meet its deadline then the task set is not feasible under that order.


##Sources
The main source for the development of this application has been the subject Real Time Systems given by Xabier Elkorobarrutia in Mondragon Unibertsitatea.  Which, of course, has based the subject in articles written by N.C. Audsley, A. Burns, M. F. Richardson, A. J. Wellings, C.L. Liu, James W. Layland...

#Community
There is a google plus community dedicated to the development of the application that can be reached following the next link: https://plus.google.com/communities/112182468398242227224
