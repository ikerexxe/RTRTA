
function FeasibilityCalculations(type, taskNumber){
	this.type = type;
	this.taskNumber = taskNumber;
	this.calculations = calculations;
	this.rmaCalculations = rmaCalculations;
	this.edfCalculations = edfCalculations;
	this.summation = summation;
}

function calculations(){
	var taskNumber = this.taskNumber;
	var period = new Array(taskNumber);
	var execTime = new Array(taskNumber);
	var i;
	var id;
	
	for(i = 1; (i-1) < taskNumber; i++){
		id = "fea"+((i*2)-1);
		period[i] = document.getElementById(id).value;
	}
	for(i = 1; (i-1) < taskNumber; i++){
		id = "fea"+((i*2));
		execTime[i] = document.getElementById(id).value;
	}
	
	this.period = period;
	this.execTime = execTime;
	
	if(this.type==0){
		this.rmaCalculations();
	}else{
		this.edfCalculations();
	}
}

function rmaCalculations(){
	var taskNumber = this.taskNumber;
	var result;
	
	this.summation();
	result = taskNumber * (2^(1/taskNumber) - 1);
	result = taskNumber * (Math.pow(2, 1/taskNumber) - 1);
	this.upperResult = result;
	
	if(this.sumResult < this.upperResult){
		this.bResult = true;
	}else{
		this.bResult = false;
	}
}

function edfCalculations(){
	this.summation();
	
	if(this.sumResult <= 1){
		this.bResult = true;
	}else{
		this.bResult = false;
	}
}

function summation(){
	var taskNumber = this.taskNumber;
	var period = this.period;
	var execTime = this.execTime;
	var i;
	var result = 0;
	
	for(i = 1; (i-1) < taskNumber; i++){
		result += execTime[i]/period[i];
	}
	
	this.sumResult = result;
}