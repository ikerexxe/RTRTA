
function UniprocessorCalculations(type, priority, resources, busy, taskNumber, resourcesNumber){
	this.type = type;
	this.priority = priority;
	this.resources = resources;
	this.busy = busy;
	this.taskNumber = taskNumber;
	this.maxBusy = 10;
	
	this.setTasksInformation = setTasksInformation;
	this.implicitOrdering = implicitOrdering;
	this.explicitOrdering = explicitOrdering;
	this.calculations = calculations;
	this.wCalculations = wCalculations;
	this.wFinished = wFinished;
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
	var jitter = new Array(taskNumber);
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
			id = "uni"+((i*(4+resourcesNumber))-(3+(resourcesNumber-1)));
			period[i] = document.getElementById(id).value;
		}
		ordering = this.implicitOrdering(period);
		
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((ordering[i]*(4+resourcesNumber))-(3+(resourcesNumber-1)));
			period[i] = document.getElementById(id).value;
			id = "uni"+((ordering[i]*(4+resourcesNumber))-(2+(resourcesNumber-1)));
			execTime[i] = document.getElementById(id).value;
			id = "uni"+((ordering[i]*(4+resourcesNumber))-(1+(resourcesNumber-1)));
			jitter[i] = document.getElementById(id).value;
			priority[i] = i;
			deadline[i] = period[i];
		}
		
		if(resources != "No"){
			for (i = 1; (i-1) < taskNumber; i++){
				for(j = 1; (j-1) < resourcesNumber; j++){
					id = "uni"+((ordering[i]*(4+resourcesNumber))-((resourcesNumber-j)));
					resourcesMatrix[i][j] = document.getElementById(id).value;
				}
			}
		}
	}else{
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((i*(5+resourcesNumber))-(2+(resourcesNumber-1)));
			deadline[i] = document.getElementById(id).value;
		}
		ordering = this.implicitOrdering(deadline);
		
		for(i = 1; (i-1) < taskNumber; i++){
			id = "uni"+((ordering[i]*(5+resourcesNumber))-(4+(resourcesNumber-1)));
			period[i] = document.getElementById(id).value;
			id = "uni"+((ordering[i]*(5+resourcesNumber))-(3+(resourcesNumber-1)));
			execTime[i] = document.getElementById(id).value;
			priority[i] = i;
			id = "uni"+((ordering[i]*(5+resourcesNumber))-(2+(resourcesNumber-1)));
			deadline[i] = document.getElementById(id).value;
			id = "uni"+((ordering[i]*(5+resourcesNumber))-(1+(resourcesNumber-1)));
			jitter[i] = document.getElementById(id).value;
		}
		
		if(resources != "No"){
			for (i = 1; (i-1) < taskNumber; i++){
				for(j = 1; (j-1) < resourcesNumber; j++){
					id = "uni"+((ordering[i]*(5+resourcesNumber))-((resourcesNumber-j)));
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
	this.jitter = jitter;
	
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
	var deadline = this.deadline;
	var busy = this.busy;
	var results = new Array(taskNumber);
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
			if(results[contTask] > deadline[contTask]*this.maxBusy){
				feasible = false;
			}
		}
	}
	
	this.results = results;
	this.feasible = feasible;
}

function wCalculations(contTask){
	var execTime = this.execTime;
	var resources = this.resources;
	var period = this.period;
	var jitter = this.jitter;
	var w = new Array(100);
	var B = 0;
	var i = 0;
	var j;
	var contBusy;
	
	if(resources != "No"){
		B = this.calculateSharedResources(contTask);
	}
	
	if(this.busy){
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
	var deadline = this.deadline;
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
		if(contBusy > this.maxBusy){
			finished = false;
		}
	}
	
	this.contBusy = contBusy;
	return finished;
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
	
	if(resources == "PIP"){
		if(taskNumber > resourcesNumber){
			maxArray = new Array(taskNumber);
		}else{
			maxArray = new Array(resourcesNumber);
		}
		
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
						}else{
							maxPositionJ = -1;
							maxPositionK = -1;
						}
					}
				}
			}
			if((maxPositionJ == -1) || (maxPositionK == -1)){
				break;
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
	}else{
		//These two loops are the same that in the previous condition
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
					}else{
						maxPositionJ = -1;
						maxPositionK = -1;
					}
				}
			}
		}
		if((maxPositionJ != -1) && (maxPositionK != -1)){
			B = max;
		}else{
			b = 0;
		}
	}
	
	return B;
}
