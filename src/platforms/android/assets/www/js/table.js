
function drawFeasibilityTable(taskNumber){
	var div = document.getElementById("feasibility_table");
	var i = 0, j = 1;
	var text = "<table><tr><th>Task</th><th>T</th><th>C</th></tr>";
	
	if(taskNumber>0){
		for(i; i < taskNumber; i++){
			text += "<tr>" +
					"<td>T"+(i+1)+"</td>" +
					"<td>"+"<input class='text' id='fea"+j+"' type='number' onclick='this.select()' value='0'>"+"</td>";
			j++;
			text +=	"<td>"+"<input class='text' id='fea"+j+"' type='number' onclick='this.select()' value='0'>"+"</td>" +
					"</tr>";
			j++;
		}
		
		text += "</table>";
		
		div.innerHTML = text;
	}
}

function drawUniprocessorTable(type, priority, resources, instances, taskNumber){
	var div = document.getElementById("uniprocessor_table");
	var text;
	var i, j = 1;
	
	if(type=="DMS"){
		if(priority=="Explicit"){
			text = "<table><tr><th>Task</th><th>Priority</th><th>T</th><th>C</th><th>D</th>";
		}else{
			
		}
		
		if(resources=="No"){
			text += "</tr>";
		}else{
			
		}
		
		for(i = 1; (i-1) < taskNumber; i++){
			text += "<tr><td>T"+i+"</td>";
			if(priority=="Explicit"){
				text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
			}
			j++;
			text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
			j++;
			text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
			j++;
			text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
			j++;
			if(resources=="No"){
				text += "</tr>";
			}else{
				
			}
		}
		text += "</table>";
	}else{
		
	}
	
	div.innerHTML = text;
}