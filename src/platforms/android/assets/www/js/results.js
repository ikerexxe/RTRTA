
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

function drawUniprocessorResult(feasible, taskNumber, ordering, priority, period, results){
	var div = document.getElementById("uniprocessor_results");
	var text;
	
	if(feasible == true){
		text = "<h3>The task set is feasible.</h3>";
	}else{
		text = "<h3>The task set isn't feasible.</h3>";
	}
	
	text += drawUniprocessorCalculations(taskNumber, ordering, priority, period, results);
	
	div.innerHTML = text;
}

function drawUniprocessorCalculations(taskNumber, ordering, priority, period, results){
	var i;
	var text;
	
	text = "<table><tr><th>Task</th><th>Priority</th><th>Result</br>R <= D</th></tr>";
	
	for(i = 1; (i - 1) < taskNumber; i++){
		text += "<tr>" +
				"<td>T"+ordering[i]+"</td>" +
				"<td>"+priority[i]+"</td>";
		if(results[i] <= period[i]){
			text += "<td>"+results[i]+" <= "+period[i]+"</td>";
		}else{
			text += "<td>This task is not schedulable</td>";
		}
		text += "</tr>";
	}
	
	text += "</table>";
	
	return text;
}