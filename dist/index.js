#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
const config_1 = require("./utils/config");
async function main() {
    console.clear();
    console.log(`${chalk_1.default.bold.white(`Sveltegen CLI`)}\n${chalk_1.default.redBright.italic.underline("Warning: This CLI is still experimental.\n")}`);
    const config = await (0, config_1.loadConfig)();
    if (config) {
        await Promise.resolve().then(() => (0, tslib_1.__importStar)(require("./core/cli")));
    }
}
main();
//# sourceMappingURL=index.js.map