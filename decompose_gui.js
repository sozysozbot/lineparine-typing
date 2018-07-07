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
		text +=  "<br><span class='toggle'>" + words[j] + "</span>:";
		text += "<table>";
		var result = decompose(words[j]);
		
		for(var i=0; i<result.length; i++){
			text += "<tr><td class='toggle'>";
			for(var k=0; k<result[i].length; k++) {
				if (k != 0) {
					text += ", ";
				}
				text +="<a href='http://twoc.ever.jp/twoc/conlang.cgi?search=" + encodeURIComponent(result[i][k]) + "&type=0&agree=0&mode=search&user_id=fafs' target='_blank'>" + result[i][k] + "</a>";
			}
			text += "</td></tr>";
		}
		text += "</table>";
	}
	
	document.getElementById("ans").innerHTML = text;
	toggle(document.getElementById("toggler").checked);
} else {
	document.getElementById("ans").innerHTML 
		= "<textarea>" + JSON.stringify(FISTIR) + "</textarea>"
}
}

function toggle(isLiparxe)
{
	var arr = document.getElementsByClassName("toggle");
	for(var i=0; i<arr.length; i++) {
		arr[i].style.fontFamily = isLiparxe ? "Cirlipa" : "none";
	}
}


