
function drawFeasibilityResult(type, bResult, sumResult, upperResult){
	var div = document.getElementById("feasibility_results");
	var text;
	
	if(type=="DMS"){
		if(bResult==true){
			text = "<h3>The task set is feasible.</h3>";
			text += "<p>"+sumResult+"<"+upperResult+"</p>";
		}else{
			text = "<h3>The task set shouldn't be feasible, but it could be.</h3>";
			text += "<p>"+sumResult+">="+upperResult+"</p>";
		}
	}else{
		if(bResult==true){
			text = "<h3>The task set is feasible.</h3>";
			text += "<p>"+sumResult+"<="+1+"</p>";
		}else{
			text = "<h3>The task set isn't feasible.</h3>";
			text += "<p>"+sumResult+">"+1+"</p>";
		}
	}
	
	div.innerHTML = text;
}

function drawUniprocessorResult(feasible, taskNumber, busy, ordering, priority, deadline, results){
	var div = document.getElementById("uniprocessor_results");
	var text;
	
	if(feasible == true){
		text = "<h3>The task set is feasible.</h3>";
	}else{
		text = "<h3>The task set isn't feasible.</h3>";
	}
	
	text += drawUniprocessorCalculations(taskNumber, busy, ordering, priority, deadline, results);
	
	div.innerHTML = text;
}

function drawUniprocessorCalculations(taskNumber, busy, ordering, priority, deadline, results){
	var i;
	var text;
	var maxBusy = 10;
	var contBusy;
	
	if(busy == "No"){
		text = "<table><tr><th>Task</th><th>Priority</th><th>Result</br>R <= D</th></tr>";
	}else{
		text = "<table><tr><th>Task</th><th>Priority</th><th>Result</br>R <= D*Q</th></tr>";
	}
	
	for(i = 1; (i - 1) < taskNumber; i++){
		text += "<tr>" +
				"<td>T"+ordering[i]+"</td>" +
				"<td>"+priority[i]+"</td>";
		if(busy == "No"){
			if(results[i] <= deadline[i]){
				text += "<td>"+results[i]+" <= "+deadline[i]+"</td>";
			}else{
				text += "<td>This task is not schedulable</td>";
			}
		}else{
			if(results[i] <= deadline[i]*maxBusy){
				contBusy = Math.ceil(results[i]/deadline[i]);
				text += "<td>"+results[i]+" <= "+deadline[i]+"*"+contBusy+"</td>";
			}else{
				text += "<td>This task is not schedulable</td>";
			}
		}
		text += "</tr>";
	}
	
	text += "</table>";
	
	return text;
}