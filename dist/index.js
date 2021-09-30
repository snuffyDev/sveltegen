#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
require("./cli");
async function main() {
    const config = (0, functions_1.fn)().hasConfig();
    let _conf;
    if (!config) {
        _conf = (0, functions_1.fn)()
            .createConfig()
            .then(data => data);
    }
}
main();
//# sourceMappingURL=index.js.map