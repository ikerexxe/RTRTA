#RTRTA

RTRTA is a mobile multiplatform application developed using HTML+CSS+JavaScript to calculate real-time response times.

##Feasibility analysis

The first set of calculus that has been developed is a feasibility analysis for RMA and EDF. These analysis are a pessimistic result in the sense that they establish a sufficient but not necessary condition.
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

##Sources

The main source for the development of this application has been the subject Real Time Systems given by Xabier Elkorobarrutia in Mondragon Unibertsitatea.  Which, of course, has based the subject in articles written by N.C. Audsley, A. Burns, M. F. Richardson, A. J. Wellings, C.L. Liu, James W. Layland...

#Community
There is a google plus community dedicated to the development of the application that can be reached following the next link: https://plus.google.com/communities/112182468398242227224
