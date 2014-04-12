
//Global variables
var type;
var taskNumber;
var period;
var execTime;

function FeasibilityCalculations(type, taskNumber){
	//Global variables
	this.type = type;
	this.taskNumber = taskNumber;
	
	//Functions
	this.calculations = calculations;
	this.rmaCalculations = rmaCalculations;
	this.edfCalculations = edfCalculations;
	this.summation = summation;
	
	period = new Array(taskNumber);
	execTime = new Array(taskNumber);
}

function calculations(){
	var taskNumber = this.taskNumber;
	var index;
	var id;
	
	for(index = 1; (index-1) < taskNumber; index++){
		id = "fea"+((index*2)-1);
		period[index] = document.getElementById(id).value;
	}
	for(index = 1; (index-1) < taskNumber; index++){
		id = "fea"+((index*2));
		execTime[index] = document.getElementById(id).value;
	}
	
	this.period = period;
	this.execTime = execTime;
	
	if(this.type=="RMA"){
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
	var index;
	var result = 0;
	
	for(index = 1; (index-1) < taskNumber; index++){
		result += execTime[index]/period[index];
	}
	
	this.sumResult = result;
}