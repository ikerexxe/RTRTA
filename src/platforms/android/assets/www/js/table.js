
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

function drawUniprocessorTable(type, priority, resources, instances, taskNumber, resourcesNumber){
	var div = document.getElementById("uniprocessor_table");
	var text;
	var i, j = 1;
	var resourcesCount;
	
	if(type=="DMS"){
		text = "<table><tr><th>Task</th><th>T</th><th>C</th>";
		
		if(resources!="No"){
			for(resourcesCount = 1; (resourcesCount-1) < resourcesNumber; resourcesCount++){
				text+= "<th>R"+resourcesCount+"</th>";
			}
		}
		text += "</tr>";
		
		for(i = 1; (i-1) < taskNumber; i++){
			text += "<tr><td>T"+i+"</td>";
			j++;
			text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
			j++;
			text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
			j++;
			if(resources!="No"){
				for(resourcesCount = 1; (resourcesCount-1) < resourcesNumber; resourcesCount++){
					text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
					j++;
				}
			}
			text += "</tr>";
		}
		text += "</table>";
	}else{
		text = "<table><tr><th>Task</th><th>T</th><th>C</th><th>D</th>";
		
		if(resources!="No"){
			for(resourcesCount = 1; (resourcesCount-1) < resourcesNumber; resourcesCount++){
				text+= "<th>R"+resourcesCount+"</th>";
			}
		}
		text += "</tr>";
		
		for(i = 1; (i-1) < taskNumber; i++){
			text += "<tr><td>T"+i+"</td>";
			j++;
			text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
			j++;
			text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
			j++;
			text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
			j++;
			if(resources!="No"){
				for(resourcesCount = 1; (resourcesCount-1) < resourcesNumber; resourcesCount++){
					text += "<td><input class='text' id='uni"+j+"' type='number' onclick='this.select()' value='0'></td>";
					j++;
				}
			}
			text += "</tr>";
		}
		text += "</table>";
	}
	
	div.innerHTML = text;
}