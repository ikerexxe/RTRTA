
function UniprocessorCalculations(type, priority, resources, instances, taskNumber){
	this.type = type;
	this.priority = priority;
	this.resources = resources;
	this.instances = instances;
	this.taskNumber = taskNumber;
	this.setTasksInformation = setTasksInformation;
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
	var i;
	var id;
	
	for(i = 1; (i-1) < taskNumber; i++){
		id = "uni"+((i*4)-2);
		period[i] = document.getElementById(id).value;
	}
	for(i = 1; (i-1) < taskNumber; i++){
		id = "uni"+((i*4)-1);
		execTime[i] = document.getElementById(id).value;
	}
	
	if(type == "DMS"){
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((i*4));
			deadline[i] = document.getElementById(id).value;
		}
		this.deadline = deadline;
		if(ifPriority == "Explicit"){
			for(i = 1; (i-1) < taskNumber; i++){
				id = "uni"+((i*4)-3);
				priority[i] = document.getElementById(id).value;
			}
			this.priority = priority;
		}else{
			
		}
	}else{
		
	}
	
	this.period = period;
	this.execTime = execTime;
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
			w[i] += parseInt(Math.ceil(w[i-1]/period[j]) * execTime[j];
		}
	}while(w[i] != w[i-1]);
	
	return w[i];
}