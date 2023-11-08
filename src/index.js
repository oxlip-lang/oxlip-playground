import "./font.css";
import "./index.css";

import * as wasm from "oal-wasm";

import { CodeJar } from "codejar";

import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-yaml";
import "prismjs/themes/prism-okaidia.css";
import "./highlight.js";

import example from './example.txt';

const REFRESH_TIMEOUT_MS = 1000;
const POLL_PERIOD_MS = 500;

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

inputJar.updateCode(example);

let lastUpdate = Date.now();
let lastRefresh = lastUpdate;

input.addEventListener("input", () => {
    lastUpdate = Date.now();
});

function refresh() {
    lastRefresh = Date.now();
    let code = inputJar.toString();
    let result = wasm.compile(code);
    if (result.error === "") {
        outputJar.updateCode(result.api);
    }
    diagnostics.innerHTML = result.error;
}

function loop() {
    setTimeout(() => {
        if (lastUpdate > lastRefresh && (Date.now() - lastUpdate) > REFRESH_TIMEOUT_MS) {
            refresh();
        }
        loop();
    }, POLL_PERIOD_MS);
}

refresh();
loop();
