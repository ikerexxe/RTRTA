
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
	var i;
	var result = 0;
	
	for(i = 1; (i-1) < taskNumber; i++){
		result += execTime[i]/period[i];
	}
	
	this.sumResult = result;
}