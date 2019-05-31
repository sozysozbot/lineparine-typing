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
    const possibleStates = getW().rules
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
    let ans = [];
    for (let i = 0; i < possibleStates.length; i++) {
        const state = possibleStates[i];
        if (state === "FINAL") {
            continue;
        }
        const candidate = getW().words[state].filter(function (c) {
            return text.startsWith(c.replace(/-/g, ""));
        });
        for (let j = 0; j < candidate.length; j++) {
            const newText = text.slice(candidate[j].replace(/-/g, "").length);
            const results = decompose_(newText, possibleStates[i]).map(function (res) {
                return [candidate[j]].concat(res);
            });
            ans = ans.concat(results);
        }
    }
    return ans;
}
