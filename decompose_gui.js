function gui(text)
{
	var result = decompose(text);
	var text = "<table>";
	for(var i=0; i<result.length; i++){
		text += "<tr><td>" + JSON.stringify(result[i]) + "</td></tr>";
	}
	text += "</table>";
	document.getElementById("ans").innerHTML = text;
}