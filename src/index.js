import "./font.css";
import "./index.css";

import * as wasm from "oal-wasm";

import { CodeJar } from "codejar";

import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-yaml";
import "prismjs/themes/prism-okaidia.css";
import "./highlight.js";

Prism.manual = true;

const highlightOAL = editor => {
    editor.innerHTML = Prism.highlight(editor.textContent, Prism.languages.oal, 'oal')
}

const highlightYAML = editor => {
    editor.innerHTML = Prism.highlight(editor.textContent, Prism.languages.yaml, 'yaml')
}

const options = { addClosing: false, tab: "  " };

const input = document.querySelector("#input");
const inputJar = new CodeJar(input, highlightOAL, options);

const output = document.querySelector("#output");
const outputJar = new CodeJar(output, highlightYAML, options);

const diagnostics = document.querySelector("#diagnostics");

inputJar.updateCode("res / on get -> {};");

let isStale = true;

input.addEventListener("input", () => {
    isStale = true;
});

function refresh() {
    isStale = false;
    let code = inputJar.toString();
    let result = wasm.compile(code);
    outputJar.updateCode(result.api);
    diagnostics.innerHTML = result.error;
}

function loop() {
    setTimeout(() => {
        if (isStale) {
            refresh();
        }
        loop();
    }, 2000);
}

refresh();
loop();