function split(txt)
{
	return txt.toLowerCase()
		.replace(/[,\.\?!<>":【】=…()\/―]/g," ")
		.replace(/\s+/g," ").split(" ")
		.filter(function(a){return a.length>0;});
}
var FISTIR = [];
function gui(txt)
{
	var words = split(txt)
	FISTIR = words.map(u => [u, decompose(u)]);
if(!document.getElementById("json").checked){
	var text = "";

	for(var j=0; j<words.length; j++) {
		text +=  "<br>" + words[j] + ":";
		text += "<table>";
		var result = decompose(words[j]);
		
		for(var i=0; i<result.length; i++){
			text += "<tr><td>" + JSON.stringify(result[i]) + "</td></tr>";
		}
		text += "</table>";
	}
	
	document.getElementById("ans").innerHTML = text;
} else {
	document.getElementById("ans").innerHTML 
		= "<textarea>" + JSON.stringify(FISTIR) + "</textarea>"
}
}