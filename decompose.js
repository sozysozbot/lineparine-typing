function decompose(text) {
    return decompose_(text, "INITIAL");
}
function getW() {
    if (document.getElementById("obsolete").checked) {
        return W_OLD;
    }
    else {
        return W;
    }
}
/*
 * parse, from left, the possible parsing that can come after the previousState
 * if impossible, returns an empty array
 * decompose_("leter", "q-") --> ["-l-","et","-er"]
 *
 */
function decompose_(text, previousState) {
    var possibleStates = getW().rules
        .filter(function (arr) { return arr && arr[0] == previousState; })
        .map(function (arr) { return arr[1]; });
    if (text === "") {
        if (possibleStates.includes("FINAL")) {
            return [[]]; // one possibility
        }
        else {
            return []; // zero possibility
        }
    }
    var ans = [];
    for (var i = 0; i < possibleStates.length; i++) {
        const state = possibleStates[i];
        if (state === "FINAL") {
            continue;
        }
        if (state === "INITIAL") {
            throw new Error("should not happen; must not have INITIAL in the second arg");
        }
        var candidate = getW().words[state].filter(function (c) {
            return text.startsWith(c.replace(/-/g, ""));
        });
        for (var j = 0; j < candidate.length; j++) {
            var newText = text.slice(candidate[j].replace(/-/g, "").length);
            var results = decompose_(newText, possibleStates[i]).map(function (res) {
                return [candidate[j]].concat(res);
            });
            ans = ans.concat(results);
        }
    }
    return ans;
}
