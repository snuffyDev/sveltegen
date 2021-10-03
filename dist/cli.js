"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
// import * as pkg from "../package.json";
const functions_1 = require("./functions");
const program = new commander_1.Command();
program.configureHelp({
    sortSubcommands: true,
    subcommandTerm: cmd => cmd.name() // Just show the name, instead of short usage.
});
// program.version(pkg.version);
// const args = process.argv
// console.log(args)
program
    .name("sveltegen")
    .description("Svelte/SvelteKit Component Template Generator");
// .option('-h, --help', 'Show help')
program.showSuggestionAfterError();
program
    .addHelpText("beforeAll", `Sveltegen CLI\n---------`)
    .addHelpText("afterAll", context => {
    if (context.error) {
        return "\nUnknown Error";
    }
    return "------\nEnjoy!";
});
program.addHelpText("after", `
		Example call:\n  		$ sveltegen --config`);
program
    .command("config")
    .description("change the output directory")
    .action(() => {
    (0, functions_1.fn)().createConfig();
});
program.command("init", { hidden: true, isDefault: true }).action(async () => {
    console.clear();
    console.log(`${chalk_1.default.bold.white(`Sveltegen CLI`)}\n${chalk_1.default.redBright.italic.underline("Warning: This CLI is still experimental.\n")}`);
    const config = (0, functions_1.fn)().hasConfig();
    if (!config) {
        const hasConfig = (0, functions_1.fn)().createConfig();
        if (hasConfig)
            (0, functions_1.fn)().menu();
    }
    else {
        (0, functions_1.fn)().menu();
    }
});
program
    .command("new")
    .description("generate new component")
    .option("-c, --component", "generate new component")
    .option("-a, --action", "generate new action")
    .action((name, options, command) => {
    console.log("Component! " + JSON.stringify(name.component));
    if (name.component)
        (0, functions_1.fn)().component();
    if (name.action)
        (0, functions_1.fn)().action();
});
// inquirer.prompt([{type:'list',choices:['New Component', 'Edit Config']}])
program.parse();
//# sourceMappingURL=cli.js.map