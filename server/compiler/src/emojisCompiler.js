const fs = require("fs");

const emojiData = JSON.parse(fs.readFileSync("server/compiler/config/emojis.json", { encoding: 'utf8', flag: 'r' }));


const emojis = [];

if (!Array.isArray(emojiData)) {
    throw new Error("the data is not an array");
}
for (let i = 0; i < emojiData.length; i++) {
    if (!(typeof emojiData[i].emoji === "string")) {
        throw new Error("emoji is not a string");
    }
    let emoji = emojiData[i].emoji;
    if (!Array.isArray(emojiData[i].words)) {
        throw new Error(" the words array is not array");
    }
    let words = emojiData[i].words;
    let regex = "(?<=\\s|^)(";
    for (let word of words) {
        if (typeof word !== "string") {
            throw new Error("one of the words are not a string")
        }
        word = word.replace(/>/g, "&gt;").replace(/</g, "&lt;")
        regex += "(";

        for (let charIndex = 0; charIndex < word.length; charIndex++) {
            if (/[a-zA-z0-9]/.test(word[charIndex])) {
                regex += word[charIndex];
            } else {
                regex += "\\" + word[charIndex];
            }
        }

        regex += ")|";
    }
    regex = regex.substring(0, regex.length - 1);
    regex += ")(?=\\s|$)";

    emojis.push({
        emoji,
        regex
    })
}

fs.writeFileSync("server/compiler/out/emojisData.js",
    `const emojisData = ${JSON.stringify(emojis)};module.exports = emojisData;`)