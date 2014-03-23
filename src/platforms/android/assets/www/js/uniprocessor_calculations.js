
function UniprocessorCalculations(type, priority, resources, instances, taskNumber, resourcesNumber){
	this.type = type;
	this.priority = priority;
	this.resources = resources;
	this.instances = instances;
	this.taskNumber = taskNumber;
	this.resourcesNumber = resourcesNumber;
	this.setTasksInformation = setTasksInformation;
	this.implicitOrdering = implicitOrdering;
	this.explicitOrdering = explicitOrdering;
	this.calculations = calculations;
	this.wCalculations = wCalculations;
}

function setTasksInformation(){
	var taskNumber = this.taskNumber;
	var ifPriority = this.priority;
	var type = this.type;
	var priority = new Array(taskNumber);
	var period = new Array(taskNumber);
	var execTime = new Array(taskNumber);
	var deadline = new Array(taskNumber);
	var ordering;
	var i, j;
	var id;
	
	if(type == "DMS"){
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((i*3)-1);
			period[i] = document.getElementById(id).value;
		}
		ordering = this.implicitOrdering(period);
		
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((ordering[i]*3)-1);
			period[i] = document.getElementById(id).value;
			id = "uni"+((ordering[i]*3));
			execTime[i] = document.getElementById(id).value;
			priority[i] = i;
			deadline[i] = period[i];
		}
	}else{
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((i*4));
			deadline[i] = document.getElementById(id).value;
		}
		ordering = this.implicitOrdering(deadline);
		
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((ordering[i]*4)-2);
			period[i] = document.getElementById(id).value;
			id = "uni"+((ordering[i]*4)-1);
			execTime[i] = document.getElementById(id).value;
			priority[i] = i;
			deadline[i] = period[i];
		}
	}
	
	this.ordering = ordering;
	this.priority = priority;
	this.period = period;
	this.execTime = execTime;
	this.deadline = deadline;
}

function implicitOrdering(deadline){
	var taskNumber = this.taskNumber;
	var ordering = new Array(taskNumber);
	var i, j, z;
	
	for(i = 1, z = 1; (i - 1) < 100; i++){
		for(j = 1; (j - 1) < taskNumber; j++){
			if(deadline[j] == i){
				ordering[z] = j;
				z++;
			}
		}
	}
	
	return ordering;
}

function explicitOrdering(priority){
	var taskNumber = this.taskNumber;
	var ordering = new Array(taskNumber);
	var i, j, z;
	
	for(i = 1, z = 1; (i - 1) < 100; i++){
		for(j = 1; (j - 1) < taskNumber; j++){
			if(priority[j] == i){
				ordering[z] = j;
				z++;
			}
		}
	}
	
	return ordering;
}

function calculations(){
	var taskNumber = this.taskNumber;
	var period = this.period;
	var results = new Array(taskNumber);
	var feasible = true;
	
	for(contTask = 1; (contTask - 1) < taskNumber; contTask++){
		results[contTask] = this.wCalculations(contTask);
	}
	
	for(contTask = 1; (contTask - 1) < taskNumber; contTask++){
		if(results[contTask] > period[contTask]){
			feasible = false;
		}
	}
	
	this.results = results;
	this.feasible = feasible;
}

function wCalculations(contTask){
	var execTime = this.execTime;
	var period = this.period;
	var w = new Array(100);
	var i = 0;
	var j;
	
	w[0] = parseInt(execTime[contTask]);
	do{
		i++;
		w[i] = parseInt(execTime[contTask]);
		for(j = 1 ; j < contTask; j++){
			w[i] += parseInt(Math.ceil(w[i-1]/period[j]) * execTime[j]);
		}
	}while(w[i] != w[i-1] && i < 100);
	
	if(i == 99){
		w[i] = -1;
	}
	
	return w[i];
}