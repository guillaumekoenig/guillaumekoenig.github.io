#!/usr/bin/env node

import katex from "katex";

//console.log(katex);
//pandoc -t html --filter pandoc-katex -s src/circumference-of-an-ellipse.md
//pandoc -t html --filter ./dump-ast -s src/circumference-of-an-ellipse.md
//pandoc -t html --filter filter/filter.js -s src/circumference-of-an-ellipse.md
//debug:
//pandoc -t json src/circumference-of-an-ellipse.md | jq .

const options = {
    output: "html",
    fleqn: true,
    macros: {
        "\\avg": "\\bar{#1}",
        "\\E": "E[#1]",
        "\\var": "Var(#1)",
        "\\est": "\\hat{#1}",
        "\\med": "Med(#1)",
        "\\eqdef": "\\overset{\\text{def}}{=}"
    }
};

// Filter function to process Pandoc's JSON output
function transformMathToHTML(json) {
    // Process JSON content
    // Identify math expressions, extract them, and render with KaTeX
    // Modify the content accordingly
    // Return the modified JSON content
    if (typeof(json) !== "object" || json === null) {
        return json;
    }
    if ("t" in json) {
        if (json.t === "Math") {
            return {"t": "RawInline", "c": ["html", katex.renderToString(
                json.c[1], {...options, displayMode: json.c[0].t === "DisplayMath"}
            )]};
        }
        // "align*" environments
        if (json.t === "RawInline" && json.c[0] === "tex") {
            return {"t": "RawInline", "c": ["html", katex.renderToString(
                json.c[1], {...options, displayMode: true}
            )]}
        }
        // "aligned" environments ("flalign" too, but currently not supported by Katex)
        if (json.t === "RawBlock" && json.c[0] === "tex") {
            return {"t": "RawBlock", "c": ["html", katex.renderToString(
                json.c[1], {...options, displayMode: true}
            )]}
        }
    }
    for (let i in json) {
        json[i] = transformMathToHTML(json[i]);
    }
    return json;
}

function addKatexStylesheet(meta) {
    const cssPath = `https://cdn.jsdelivr.net/npm/katex@${katex.version}/dist/katex.min.css`;

    // If the document has no metadata, create it
    if (!meta) {
        meta = {};
    }

    // Create or update the header-includes metadata
    if (!meta["header-includes"]) {
        meta["header-includes"] = {
            t: "MetaBlocks",
            c: []
        };
    }

    // Create the CSS link as a RawBlock element
    const cssLink = {
        t: "RawBlock",
        c: [
            "html",
            `<link rel="stylesheet" href="${cssPath}" crossorigin="anonymous">`
        ]
    };

    // Add to header-includes
    meta["header-includes"].c.push(cssLink);

    return meta;
}

function transformLinks(node) {
    // If node is null or not an object, return as is
    if (!node || typeof node !== 'object') {
        return node;
    }

    // If it's an array, map over its elements
    if (Array.isArray(node)) {
        return node.map(item => transformLinks(item));
    }

    // If this is a Link node, transform its URL if it ends with .md
    if (node.t === 'Link') {
        const url = node.c[2][0];  // URL is in the third element's first item
        if (url.endsWith('.md')) {
            node.c[2][0] = url.replace(/\.md$/, '.html');
        }
        return node;
    }

    // If the node has a 'c' (content) property and it's an array,
    // recursively transform its children
    if (node.c && Array.isArray(node.c)) {
        node.c = node.c.map(transformLinks);
    }

    return node;
}

// Entry point: read from stdin and write to stdout
let inputData = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
    inputData += chunk;
});

process.stdin.on('end', () => {
    try {
        let ast = JSON.parse(inputData);
        ast.blocks = transformMathToHTML(ast.blocks);
        ast.meta = addKatexStylesheet(ast.meta);
        ast.blocks = transformLinks(ast.blocks);
        process.stdout.write(JSON.stringify(ast));
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
