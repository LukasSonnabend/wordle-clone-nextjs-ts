#!/usr/bin/env node

const fs = require('fs');
var path = require("path");
var readline = require("readline");

const readWordsFromFile = async () => {
const words = {}


try {
  const fileStream = fs.createReadStream("sortedExtended.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const firstChar = line[0];
    console.log(firstChar);
    if (words.hasOwnProperty(firstChar)) {
      words[`${firstChar}`].push(line);
    } else {
      words[`${firstChar}`] = [line];
    }
  }
} catch (e) {
  console.log(e);
  //fs.writeFileSync(websiteFile, "", { flag: "a" });
}

const data = JSON.stringify(words);
console.log(words)
fs.writeFile('wordJson.json', data , (err) => {
  if (err) {
      throw err;
  }
  console.log("JSON data is saved.");
});
}
readWordsFromFile();