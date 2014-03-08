
function drawFeasibilityResult(type, bResult, sumResult, upperResult){
	var div = document.getElementById("feasibility_result");
	var text;
	
	if(type=="RMA"){
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