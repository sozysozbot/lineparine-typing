function single_morpheme(morpheme: string) {
    return `|>|[[${morpheme}>${morpheme_to_url(morpheme)}]]|>| |
`;
}

function morpheme_to_url(morpheme: string) {
    return `http://zpdic.ziphil.com/dictionary/80?mode=name&page=0&search=${morpheme.replace(/'/g, "%27")}&type=exact`;
}

function multiple_morphemes(a: {word: string, morphemes: string[]}) {
    return a.morphemes.map((morph, ind) => `|${ind === 0 ? a.word : "~"}|[[${morph}>${morpheme_to_url(morph)}]]| |${ind === 0 ? " " : "~"}|
`).join("");
}

type Word = string | {word: string, morphemes: string[]};

function convert_word(a: Word) {
    if (typeof a === "string") { 
        return single_morpheme(a); 
    } else return multiple_morphemes(a);
}


function generate_atwiki_code(input: string) {
    const processed = input
        .toLowerCase()
        .replace(/['’]/g, "'")
        .replace(/( |　)+/g, " ")
        .split("\n")
        .map(s => s.trim())
        .filter(s => s !== "");
    console.log(processed);
    const words = processed.map(str => {
        if (!str.match(/ /)) {
            return str;
        } else {
            return {word: str
            .replace(/f- h/g, "fъh")
            .replace(/v- h/g, "vъh")
            .replace(/d- z/g, "dъz")
            .replace(/f- -h/g, "fъh")
            .replace(/v- -h/g, "vъh")
            .replace(/d- -z/g, "dъz")
            .replace(/f -h/g, "fъh")
            .replace(/v -h/g, "vъh")
            .replace(/d -z/g, "dъz")
            .replace(/- -/g, "")
            .replace(/- /g, "")
            .replace(/ -/g, ""), morphemes: str.split(" ")
            };
        }
    });

    const sample_words = ["pa", 
    {word: "liexyti's", morphemes: ["liexyt", "-i-", "-'s"]}, 
    {word: "lex kin", morphemes: ["lex", "kin"]}, 
    {word: "dieniep'i", morphemes:  ["dieniep", "-'i"]}, "furnkie", "melx"/*,
    {word: "nefъhiarbetili'a", morphemes: ["nef-", "hiarbet", "-ili'a"] }*/
];

    const orig_sent = words.map(a => typeof a === "string" ? a : a.word );
    return `#divclass(Fynelipa){&font(150%){${
        orig_sent.map(str => 
            str.replace(/fh/g,"F")
               .replace(/vh/g,"V")
               .replace(/dz/g,"X")
               .replace(/fъh/g,"fh")
               .replace(/vъh/g,"vh")
               .replace(/dъz/g,"dz")
            ).join(" ")
    }}}
#region(close,Romanize)
&font(150%){${orig_sent.join(" ")}}
#endregion
#region(close,Answer)
|CENTER:&bold(){語}|CENTER:&bold(){形態素}|CENTER:&bold(){語義}|CENTER:&bold(){説明}|
`+words.map(convert_word).join("")+`&bold(){日本語訳}……
#endregion`;
}