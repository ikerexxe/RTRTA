
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
	var i, j;
	var id;
	var protocolIndex;
	
	if(resources != "No"){
		resourcesMatrix = new Array(taskNumber);
		for (i = 1; (i-1) < taskNumber; i++){
			resourcesMatrix[i] = new Array(resourcesNumber);
		}
	}
	
	if(type == "DMS"){
		protocolIndex = dmsIndex;
		for(i = 1; (i-1) < taskNumber; i++){
			period[i] = getTaskInformation(i, protocolIndex, 2);
		}
		ordering = this.implicitOrdering(period);
		
		for(i = 1; (i-1) < taskNumber; i++){
			period[i] = getTaskInformation(ordering[i], protocolIndex, 2);
			execTime[i] = getTaskInformation(ordering[i], protocolIndex, 1);
			jitter[i] = getTaskInformation(ordering[i], protocolIndex, 0);
			priority[i] = i;
			deadline[i] = period[i];
		}
		
		if(resources != "No"){
			for (i = 1; (i-1) < taskNumber; i++){
				for(j = 1; (j-1) < resourcesNumber; j++){
					resourcesMatrix[i][j] = getTaskInformation(ordering[i], protocolIndex, 0-j);
				}
			}
		}
	}else{
		protocolIndex = rmaIndex;
		for(i = 1; (i-1) < taskNumber; i++){
			deadline[i] = getTaskInformation(i, protocolIndex, 1);
		}
		ordering = this.implicitOrdering(deadline);
		
		for(i = 1; (i-1) < taskNumber; i++){
			period[i] = getTaskInformation(ordering[i], protocolIndex, 3);
			execTime[i] = getTaskInformation(ordering[i], protocolIndex, 2);
			deadline[i] = getTaskInformation(ordering[i], protocolIndex, 1);
			jitter[i] = getTaskInformation(ordering[i], protocolIndex, 0);
			priority[i] = i;
		}
		
		if(resources != "No"){
			for (i = 1; (i-1) < taskNumber; i++){
				for(j = 1; (j-1) < resourcesNumber; j++){
					resourcesMatrix[i][j] = getTaskInformation(ordering[i], protocolIndex, 0-j);
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
	var i = 0;
	var j;
	var contBusy;
	
	if(resources != "No"){
		B = this.calculateSharedResources(contTask);
	}
	
	if(busy){
		this.contBusy = 1;
	}
	
	w[i] = parseInt(execTime[contTask]);
	do{
		contBusy = this.contBusy;
		i++;
		w[i] = contBusy*parseInt(execTime[contTask]) + B;
		for(j = 1 ; j < contTask; j++){
			w[i] += parseInt(Math.ceil((w[i-1]+parseInt(jitter[j]))/period[j]) * execTime[j]);
		}
	}while(this.wFinished(w[i], w[i-1], contTask));
	
	w[i] += parseInt(jitter[contTask]);
	
	return w[i];
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
	var i, j, k, x, y;
	var max, maxArray;
	var blocking = false;
	var tmp;
	
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
			
			tmp = new Array(localResourcesMatrix.length - 1);
			for(x = 1; x < (localResourcesMatrix.length - 1); x++){
				tmp[x] = new Array(localResourcesMatrix[x].length - 1);
			}
			
			x = 1;
			y = 1;
			for(j = 1; j < localResourcesMatrix.length; j++){
				for(k = 1; k < localResourcesMatrix[j].length; k++){
					if(j != maxPositionTask && k != maxPositionResource){
						tmp[x][y] = localResourcesMatrix[j][k];
						y++;
					}
				}
				if(j != maxPositionTask){
					x++;
					y = 1;
				}
			}
			
			localResourcesMatrix = tmp;
		}
		
		for(i = 1; i < maxArray.length; i++){
			B += maxArray[i];
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
