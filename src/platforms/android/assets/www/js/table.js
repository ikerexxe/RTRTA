
function drawFeasibilityTable(taskNumber){
	var div = document.getElementById("feasibility_table");
	var i = 0, j = 1;
	var text = "<table><tr><th>Task</th><th>T</th><th>C</th></tr>";
	
	if(taskNumber>0){
		for(i; i < taskNumber; i++){
			text += "<tr>" +
					"<td>T"+(i+1)+"</td>" +
					"<td>"+"<input class='text' id='fea"+j+"' type='number' value='0'>"+"</td>";
			j++;
			text +=	"<td>"+"<input class='text' id='fea"+j+"' type='number' value='0'>"+"</td>" +
					"</tr>";
			j++;
		}
		
		text += "</table>";
		
		div.innerHTML = text;
	}
}