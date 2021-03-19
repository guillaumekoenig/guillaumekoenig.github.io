#!/usr/bin/env node

import katex from "katex";

//console.log(katex);
//pandoc -t html --filter pandoc-katex -s src/circumference-of-an-ellipse.md
//pandoc -t html --filter ./dump-ast -s src/circumference-of-an-ellipse.md
//pandoc -t html --filter filter -s src/circumference-of-an-ellipse.md
//debug:
//pandoc -t json src/circumference-of-an-ellipse.md | jq .

// Filter function to process Pandoc's JSON output
function filterJSON(json) {
  // Process JSON content
  // Identify math expressions, extract them, and render with KaTeX
  // Modify the content accordingly
  // Return the modified JSON content
  if (typeof(json) !== "object" || json === null) {
    return json;
  }
  if ("t" in json) {
    if (json["t"] === "Math") {
      return {"t": "RawInline", "c": ["html", katex.renderToString(
        json["c"][1], {displayMode: json["c"][0]["t"] === "DisplayMath", output: "html"}
      )]};
    }
    if (json["t"] === "RawInline" && json["c"][0] === "tex") {
      return {"t": "RawInline", "c": ["html", katex.renderToString(
        json["c"][1], {displayMode: true, output: "html"}
      )]}
    }
  }
  for (let i in json) {
    json[i] = filterJSON(json[i]);
  }
  return json;
}

// Entry point: read from stdin and write to stdout
let inputData = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const parsedJSON = JSON.parse(inputData);
    const modifiedJSON = filterJSON(parsedJSON);
    process.stdout.write(JSON.stringify(modifiedJSON));
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
