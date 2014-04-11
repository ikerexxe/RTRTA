
//Definitions
var maxBusy = 10;
var dmsIndex = 4;
var rmaIndex = 5;

//Global variables
var type;
var ifPpriority;
var taskNumber;
var resources;
var resourcesNumber;
var resourcesMatrix;
var busy;
var ordering;
var priority;
var period;
var execTime;
var deadline;
var jitter;
var feasible;
var results;
var maxPositionTask, maxPositionResource;
var localResourcesMatrix;


function UniprocessorCalculations(type, ifPriority, resources, busy, taskNumber, resourcesNumber){
	//Global variables
	this.type = type;
	this.ifPriority = ifPriority;
	this.resources = resources;
	this.busy = busy;
	this.taskNumber = taskNumber;
	
	//Functions
	this.setTasksInformation = setTasksInformation;
	this.implicitOrdering = implicitOrdering;
	this.explicitOrdering = explicitOrdering;
	this.calculations = calculations;
	this.wCalculations = wCalculations;
	this.wFinished = wFinished;
	this.calculateSharedResources = calculateSharedResources;
	
	priority = new Array(taskNumber);
	period = new Array(taskNumber);
	execTime = new Array(taskNumber);
	deadline = new Array(taskNumber);
	jitter = new Array(taskNumber);
	results = new Array(taskNumber);
	
	if(resources != "No"){
		this.resourcesNumber = parseInt(resourcesNumber);
	}else{
		this.resourcesNumber = 0;
	}
}

function setTasksInformation(){
	var indexTask, indexResource;
	var protocolIndex;
	
	if(resources != "No"){
		resourcesMatrix = new Array(taskNumber);
		for (indexTask = 1; (indexTask-1) < taskNumber; indexTask++){
			resourcesMatrix[indexTask] = new Array(resourcesNumber);
		}
	}
	
	if(type == "DMS"){
		protocolIndex = dmsIndex;
		for(indexTask = 1; (indexTask-1) < taskNumber; indexTask++){
			period[indexTask] = getTaskInformation(indexTask, protocolIndex, 2);
		}
		ordering = this.implicitOrdering(period);
		
		for(indexTask = 1; (indexTask-1) < taskNumber; indexTask++){
			period[indexTask] = getTaskInformation(ordering[indexTask], protocolIndex, 2);
			execTime[indexTask] = getTaskInformation(ordering[indexTask], protocolIndex, 1);
			jitter[indexTask] = getTaskInformation(ordering[indexTask], protocolIndex, 0);
			priority[indexTask] = indexTask;
			deadline[indexTask] = period[indexTask];
		}
		
		if(resources != "No"){
			for (indexTask = 1; (indexTask-1) < taskNumber; indexTask++){
				for(indexResource = 1; (indexResource-1) < resourcesNumber; indexResource++){
					resourcesMatrix[indexTask][indexResource] = getTaskInformation(ordering[indexTask], protocolIndex, 0-indexResource);
				}
			}
		}
	}else{
		protocolIndex = rmaIndex;
		for(indexTask = 1; (indexTask-1) < taskNumber; indexTask++){
			deadline[indexTask] = getTaskInformation(indexTask, protocolIndex, 1);
		}
		ordering = this.implicitOrdering(deadline);
		
		for(indexTask = 1; (indexTask-1) < taskNumber; indexTask++){
			period[indexTask] = getTaskInformation(ordering[indexTask], protocolIndex, 3);
			execTime[indexTask] = getTaskInformation(ordering[indexTask], protocolIndex, 2);
			deadline[indexTask] = getTaskInformation(ordering[indexTask], protocolIndex, 1);
			jitter[indexTask] = getTaskInformation(ordering[indexTask], protocolIndex, 0);
			priority[indexTask] = indexTask;
		}
		
		if(resources != "No"){
			for (indexTask = 1; (indexTask-1) < taskNumber; indexTask++){
				for(indexResource = 1; (indexResource-1) < resourcesNumber; indexResource++){
					resourcesMatrix[indexTask][indexResource] = getTaskInformation(ordering[indexTask], protocolIndex, 0-indexResource);
				}
			}
		}
	}
	
	this.ordering = ordering;
	this.priority = priority;
	this.period = period;
	this.execTime = execTime;
	this.deadline = deadline;
	this.jitter = jitter;
	
	if(resources != "No"){
		this.resourcesMatrix = resourcesMatrix;
	}
}

function getTaskInformation(taskIndex, schedulerIndex, resourceIndex){
	var id = "uni"+((taskIndex*(schedulerIndex+resourcesNumber))-(resourceIndex+resourcesNumber));

	return document.getElementById(id).value;
}

function implicitOrdering(deadline){
	var ordering = new Array(taskNumber);
	var cont, indexTask, indexOrdering;
	
	for(cont = 1, indexOrdering = 1; (cont - 1) < 100; cont++){
		for(indexTask = 1; (indexTask - 1) < taskNumber; indexTask++){
			if(deadline[indexTask] == cont){
				ordering[indexOrdering] = indexTask;
				indexOrdering++;
			}
		}
	}
	
	return ordering;
}

function explicitOrdering(priority){
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
	var feasible = true;
	
	for(contTask = 1; (contTask - 1) < taskNumber; contTask++){
		results[contTask] = this.wCalculations(contTask);
	}
	
	for(contTask = 1; (contTask - 1) < taskNumber; contTask++){
		if(busy == "No"){
			if(results[contTask] > deadline[contTask]){
				feasible = false;
			}
		}else{
			if(results[contTask] > deadline[contTask] * maxBusy){
				feasible = false;
			}
		}
	}
	
	this.results = results;
	this.feasible = feasible;
}

function wCalculations(contTask){
	var w = new Array(100);
	var B = 0;
	var indexW = 0;
	var indexTask;
	var contBusy;
	
	if(resources != "No"){
		B = this.calculateSharedResources(contTask);
	}
	
	if(busy){
		this.contBusy = 1;
	}
	
	w[indexW] = parseInt(execTime[contTask]);
	do{
		contBusy = this.contBusy;
		indexW++;
		w[indexW] = contBusy*parseInt(execTime[contTask]) + B;
		for(indexTask = 1 ; indexTask < contTask; indexTask++){
			w[indexW] += parseInt(Math.ceil((w[indexW-1]+parseInt(jitter[indexTask]))/period[indexTask]) * execTime[indexTask]);
		}
	}while(this.wFinished(w[indexW], w[indexW-1], contTask));
	
	w[indexW] += parseInt(jitter[contTask]);
	
	return w[indexW];
}

function wFinished(w, w_previous, contTask){
	var contBusy = this.contBusy;
	var finished = false;
	
	if(busy == "No"){
		if((w != w_previous) && (w <= deadline[contTask])){
			finished = true;
		}
	}else{
		if((w != w_previous)){
			finished = true;
		}
		if(w > deadline[contTask]*contBusy){
			contBusy++;
		}
		if(contBusy > maxBusy){
			finished = false;
		}
	}
	
	this.contBusy = contBusy;
	return finished;
}

function calculateSharedResources(contTask){
	var B = 0;
	var cont, indexTask, indexResource, localTask, localResource;
	var max, maxArray;
	var tmpResources;
	
	localResourcesMatrix = this.resourcesMatrix.slice();
	
	if(resources == "PIP"){
		if(taskNumber > resourcesNumber){
			maxArray = new Array(taskNumber);
		}else{
			maxArray = new Array(resourcesNumber);
		}
		
		for(i = 1; (taskNumber - contTask) >= i; i++){
			max = findMaxResource(contTask);
			if((maxPositionTask == -1) || (maxPositionResource == -1)){
				break;
			}
			maxArray[i] = max;
			
			tmpResources = new Array(localResourcesMatrix.length - 1);
			for(localTask = 1; localTask < (localResourcesMatrix.length - 1); localTask++){
				tmpResources[localTask] = new Array(localResourcesMatrix[localTask].length - 1);
			}
			
			localTask = 1;
			localResource = 1;
			for(indexTask = 1; indexTask < localResourcesMatrix.length; indexTask++){
				for(indexResource = 1; indexResource < localResourcesMatrix[indexTask].length; indexResource++){
					if(indexTask != maxPositionTask && indexResource != maxPositionResource){
						tmpResources[localTask][localResource] = localResourcesMatrix[indexTask][indexResource];
						localResource++;
					}
				}
				if(indexTask != maxPositionTask){
					localTask++;
					localResource = 1;
				}
			}
			
			localResourcesMatrix = tmpResources;
		}
		
		for(cont = 1; cont < maxArray.length; cont++){
			B += maxArray[cont];
		}
	}else{
		max = findMaxResource(contTask);
		if((maxPositionTask != -1) && (maxPositionResource != -1)){
			B = max;
		}else{
			b = 0;
		}
	}
	
	return B;
}

function findMaxResource(contTask){
	var max = 0;
	var indexTask, indexResource;
	
	for(indexTask = (contTask + 1); indexTask < localResourcesMatrix.length; indexTask++){
		for(indexResource = 1; indexResource < localResourcesMatrix[indexTask].length; indexResource++){
			if(localResourcesMatrix[indexTask][indexResource] > max){
				for(x = 1; x <= contTask; x++){
					if(localResourcesMatrix[x][indexResource] != 0){
						blocking = true;
						break;
					}
				}
				if(blocking){
					max = parseInt(localResourcesMatrix[indexTask][indexResource]);
					maxPositionTask = indexTask;
					maxPositionResource = indexResource;
					blocking = false;
				}else{
					maxPositionTask = -1;
					maxPositionResource = -1;
				}
			}
		}
	}
	
	return max;
}
