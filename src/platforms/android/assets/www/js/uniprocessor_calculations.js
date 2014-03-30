
function UniprocessorCalculations(type, priority, resources, instances, taskNumber, resourcesNumber){
	this.type = type;
	this.priority = priority;
	this.resources = resources;
	this.instances = instances;
	this.taskNumber = taskNumber;
	this.setTasksInformation = setTasksInformation;
	this.implicitOrdering = implicitOrdering;
	this.explicitOrdering = explicitOrdering;
	this.calculations = calculations;
	this.wCalculations = wCalculations;
	this.calculateSharedResources = calculateSharedResources;
	
	if(resources != "No"){
		this.resourcesNumber = parseInt(resourcesNumber);
	}else{
		this.resourcesNumber = 0;
	}
}

function setTasksInformation(){
	var taskNumber = this.taskNumber;
	var ifPriority = this.priority;
	var type = this.type;
	var resources = this.resources;
	var resourcesNumber = this.resourcesNumber;
	var priority = new Array(taskNumber);
	var period = new Array(taskNumber);
	var execTime = new Array(taskNumber);
	var deadline = new Array(taskNumber);
	var ordering;
	var i, j;
	var id;
	
	if(resources != "No"){
		var resourcesMatrix = new Array(taskNumber);
		for (i = 1; (i-1) < taskNumber; i++){
			resourcesMatrix[i] = new Array(resourcesNumber);
		}
	}
	
	if(type == "DMS"){
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((i*(3+resourcesNumber))-(2+(resourcesNumber-1)));
			period[i] = document.getElementById(id).value;
		}
		ordering = this.implicitOrdering(period);
		
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((ordering[i]*(3+resourcesNumber))-(2+(resourcesNumber-1)));
			period[i] = document.getElementById(id).value;
			id = "uni"+((ordering[i]*(3+resourcesNumber))-(1+(resourcesNumber-1)));
			execTime[i] = document.getElementById(id).value;
			priority[i] = i;
			deadline[i] = period[i];
		}
		
		if(resources != "No"){
			for (i = 1; (i-1) < taskNumber; i++){
				for(j = 1; (j-1) < resourcesNumber; j++){
					id = "uni"+((ordering[i]*(3+resourcesNumber))-((resourcesNumber-j)));
					resourcesMatrix[i][j] = document.getElementById(id).value;
				}
			}
		}
	}else{
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((i*(4+resourcesNumber))-(1+(resourcesNumber-1)));
			deadline[i] = document.getElementById(id).value;
		}
		ordering = this.implicitOrdering(deadline);
		
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((ordering[i]*(4+resourcesNumber))-(3+(resourcesNumber-1)));
			period[i] = document.getElementById(id).value;
			id = "uni"+((ordering[i]*(4+resourcesNumber))-(2+(resourcesNumber-1)));
			execTime[i] = document.getElementById(id).value;
			priority[i] = i;
			id = "uni"+((ordering[i]*(4+resourcesNumber))-(1+(resourcesNumber-1)));
			deadline[i] = document.getElementById(id).value;
		}
		
		if(resources != "No"){
			for (i = 1; (i-1) < taskNumber; i++){
				for(j = 1; (j-1) < resourcesNumber; j++){
					id = "uni"+((ordering[i]*(4+resourcesNumber))-((resourcesNumber-j)));
					resourcesMatrix[i][j] = document.getElementById(id).value;
				}
			}
		}
	}
	
	this.ordering = ordering;
	this.priority = priority;
	this.period = period;
	this.execTime = execTime;
	this.deadline = deadline;
	
	if(resources != "No"){
		this.resourcesMatrix = resourcesMatrix;
	}
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
	var resources = this.resources;
	var period = this.period;
	var w = new Array(100);
	var B = 0;
	var i = 0;
	var j;
	
	if(resources != "No"){
		B = this.calculateSharedResources(contTask);
	}
	
	w[0] = parseInt(execTime[contTask]);
	do{
		i++;
		w[i] = parseInt(execTime[contTask]) + B;
		for(j = 1 ; j < contTask; j++){
			w[i] += parseInt(Math.ceil(w[i-1]/period[j]) * execTime[j]);
		}
		if(w[i] > period[i]){
			w[i] = -1;
		}
	}while((w[i] != w[i-1]) && (w[i] <= period[i]));
	
	return w[i];
}

function calculateSharedResources(contTask){
	var taskNumber = this.taskNumber;
	var resources = this.resources;
	var resourcesNumber = this.resourcesNumber;
	var resourcesMatrix = this.resourcesMatrix.slice();
	var B = 0;
	var i, j, k, x, y;
	var max, maxPositionJ, maxPositionK, maxArray;
	var blocking = false;
	var tmp;
	
	if(taskNumber > resourcesNumber){
		maxArray = new Array(taskNumber);
	}else{
		maxArray = new Array(resourcesNumber);
	}
	
	if(resources == "PIP"){
		for(i = 1; (taskNumber - contTask) >= i; i++){
			max = 0;
			for(j = (contTask + 1); j < resourcesMatrix.length; j++){
				for(k = 1; k < resourcesMatrix[j].length; k++){
					if(resourcesMatrix[j][k] > max){
						for(x = 1; x <= contTask; x++){
							if(resourcesMatrix[x][k] != 0){
								blocking = true;
								break;
							}
						}
						if(blocking){
							max = parseInt(resourcesMatrix[j][k]);
							maxPositionJ = j;
							maxPositionK = k;
							blocking = false;
						}
					}
				}
			}
			maxArray[i] = max;
			
			tmp = new Array(resourcesMatrix.length - 1);
			for(x = 1; x < (resourcesMatrix.length - 1); x++){
				tmp[x] = new Array(resourcesMatrix[x].length - 1);
			}
			
			x = 1;
			y = 1;
			for(j = 1; j < resourcesMatrix.length; j++){
				for(k = 1; k < resourcesMatrix[j].length; k++){
					if(j != maxPositionJ && k != maxPositionK){
						tmp[x][y] = resourcesMatrix[j][k];
						y++;
					}
				}
				if(j != maxPositionJ){
					x++;
					y = 1;
				}
			}
			
			resourcesMatrix = tmp;
		}
		
		for(i = 1; i < maxArray.length; i++){
			B += maxArray[i];
		}
	}
	
	return B;
}
