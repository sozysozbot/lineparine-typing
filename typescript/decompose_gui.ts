function split(txt: string) {
    return txt.toLowerCase()
        .replace(/[,\.\?!<>":【】=…()\/―]/g, " ")
        .replace(/\s+/g, " ").split(" ")
        .filter(function(a) { return a.length > 0; });
}
var FISTIR: Array<[string, string[][]]> = [];
function gui() {
    const words = split((document.getElementById('word') as HTMLInputElement).value);
    FISTIR = words.map(u => [u, decompose(u)]);
    if (!(document.getElementById("json") as HTMLInputElement).checked) {
        let text = "";

        for (let j = 0; j < words.length; j++) {
            text += "<br><span class='toggle'>" + escapeHTML(words[j]) + "</span>:";
            text += "<table>";
            let result = decompose(words[j]);

            for (let i = 0; i < result.length; i++) {
                text += "<tr><td class='toggle'>";
                for (let k = 0; k < result[i].length; k++) {
                    if (k != 0) {
                        text += ", ";
                    }
                    let url = "http://twoc.ever.jp/twoc/conlang.cgi?search=" + encodeURIComponent(result[i][k]) + "&type=0&agree=0&mode=search&user_id=fafs";
                    text += "<a href='" + escapeHTML(url) + "' target='_blank'>" + escapeHTML(result[i][k]) + "</a>";
                }
                text += "</td></tr>";
            }
            text += "</table>";
        }

        document.getElementById("ans")!.innerHTML = text;
        toggle((document.getElementById("toggler") as HTMLInputElement).checked);
    } else {
        document.getElementById("ans")!.innerHTML
            = "<textarea>" + JSON.stringify(FISTIR) + "</textarea>"
    }
}

function toggle(isLiparxe: boolean) {
    let arr: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("toggle") as HTMLCollectionOf<HTMLInputElement>;
    for (var i = 0; i < arr.length; i++) {
        arr[i].style.fontFamily = isLiparxe ? "Cirlipa" : "none";
    }
}

function escapeHTML(string: string) {
    return string.replace(/&/g, "&amp;").replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("split")!.addEventListener("click", gui);
    document.getElementById("word")!.addEventListener("keypress", function(e) {
        if (e.keyCode == 13) {
            gui();
        }
    });
});
