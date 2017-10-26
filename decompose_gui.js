function gui(txt)
{
	var words = txt.toLowerCase()
		.replace(/[,\.\?!]/g," ")
		.replace(/\s+/g," ").split(" ");

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
}