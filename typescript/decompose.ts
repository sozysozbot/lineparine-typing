function decompose(text: string) {
    return decompose_(text, "INITIAL", '');
}

function getW() {
    if ((document.getElementById("obsolete") as HTMLInputElement).checked) {
        return W_OLD;
    } else {
        return W;
    }
}

/*
 * parse, from left, the possible parsing that can come after the previousState
 * if impossible, returns an empty array
 * decompose_("leter", "q-") --> ["-l-","et","-er"]
 *
 */
function decompose_(text: string, previousState: state, previousText: string): string[][] {
    const possibleStates: state_noninitial[] = getW().rules
        .filter(function (arr) { return arr && arr[0] == previousState })
        .map(function (arr) { return arr[1] });

    if (text === "") {
        if (possibleStates.includes("FINAL")) {
            return [[]]; // one possibility
        } else {
            return []; // zero possibility
        }
    }

    let ans: string[][] = [];
    for (let i = 0; i < possibleStates.length; i++) {
        const state = possibleStates[i];
        if (state === "FINAL") { continue; }

        const candidate: string[] = getW().words[state].filter(function (c: string) {
            return text.startsWith(c.replace(/-/g, ""))
        });

        for (let j = 0; j < candidate.length; j++) {
            if ((state == '-q1-' || state == '-q2-') && !isMatchToClass(previousText, candidate[j])) { continue; }
            const newText = text.slice(candidate[j].replace(/-/g, "").length);
            const results = decompose_(newText, possibleStates[i], previousText + candidate[j]).map(function (res) {
                return [candidate[j]].concat(res);
            });
            ans = ans.concat(results);
        }
    }
    return ans;
}

function lastLetter(word: string) {
    const letters: string[] = [
        "fh", "vh", "dz", "ph", "ts", "ch", "ng", "sh", "th", "dh", "kh", "rkh", "rl",
        "i", "y", "u", "o", "e", "a",
        "p", "f", "t", "c", "x", "k", "q", "h", "r", "z", "m", "n", "r", "l", "j", "w", "b", "v", "d", "s", "g",
    ];
    for (let i = 0; i < letters.length; i++) {
        if (word.replace('-', '').replace("'", '').endsWith(letters[i])) {
            return letters[i];
        }
    }
    return '';
}

function lastVowelLetter(word: string) {
    return lastLetter(word.replace(/[^iyuoea]/g, ''));
}

function isMatchToClass(left: string, right: string) {
    const classMap: { [index: string]: string[]; } = {
        ['a']: ['-a-', '-v-',],
        ['o']: ['-a-', '-v-',],
        ['e']: ['-e-', '-rg-', '-b-', '-f-', '-j-', '-kh-', '-rj-', '-rv-', '-rw-', '-rz-', '-s-', '-w-'],
        ['i']: ['-e-', '-rg-', '-b-', '-f-', '-j-', '-kh-', '-rj-', '-rv-', '-rw-', '-rz-', '-s-', '-w-'],
        ['u']: ['-u-', '-m-',],
        ['y']: ['-i-', '-l-',],
    };
    return classMap[lastVowelLetter(left)].includes(right);
}
