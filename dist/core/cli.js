"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sade_1 = (0, tslib_1.__importDefault)(require("sade"));
const functions_1 = (0, tslib_1.__importDefault)(require("../functions"));
const cfg = (0, tslib_1.__importStar)(require("../utils/config"));
const program = (0, sade_1.default)("sveltegen").version("");
program
    .command("config")
    .describe("change the output directory")
    .action(async () => {
    return await cfg.createConfig();
});
program
    .command("menu")
    .describe("display a menu GUI")
    .action(async () => {
    const config = await cfg.loadConfig();
    if (config)
        functions_1.default.menu();
});
program
    .command("route <name>", "generate a new route", { alias: "r" })
    .option("-t, --ts", "Add TypeScript")
    .option("-s, --scss", "Add SCSS")
    .option("-e, --endpoint", "Endpoint only (index.json.ts)")
    .option("-p, --page", "Page only (index.svelte)")
    .action(async (name, opts) => {
    try {
        await cfg.loadConfig();
        let args = {
            name,
            ts: opts.ts ?? false,
            scss: opts.scss ?? false,
            endpoint: opts.endpoint,
            page: opts.page
        };
        functions_1.default.route(args);
    }
    catch (err) {
        console.error(err);
    }
});
program
    .command("action <name>", "generate a new action", { alias: "a" })
    .option("-t, --ts", "Add TypeScript")
    .action(async (name, opts) => {
    try {
        await cfg.loadConfig();
        let args = {
            name,
            ts: opts.ts ?? false
        };
        functions_1.default.action(args);
    }
    catch (err) {
        console.error(err);
    }
});
program
    .command("component <name>", "generate a new component", { alias: "c" })
    .option("-t, --ts", "Add TypeScript")
    .option("-s, --scss", "Add SCSS")
    .option("-l, --lib", "Library Mode: exports component from $lib/components folder")
    .action(async (name, opts) => {
    try {
        await cfg.loadConfig();
        let args = {
            name,
            ts: opts.ts ?? false,
            scss: opts.scss ?? false,
            lib: opts.lib ?? false
        };
        functions_1.default.component(args);
    }
    catch (err) {
        console.error(err);
    }
});
program.parse(process.argv, { unknown: arg => `Unknown option: ${arg}` });
//# sourceMappingURL=cli.js.map