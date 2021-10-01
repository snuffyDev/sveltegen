"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const functions_1 = require("./functions");
const program = new commander_1.Command();
program.configureHelp({
    sortSubcommands: true,
    subcommandTerm: cmd => cmd.name() // Just show the name, instead of short usage.
});
// const args = process.argv
// console.log(args)
program
    .name('sveltegen')
    .description('Svelte/SvelteKit Component Template Generator')
    .option('-c, --config', 'Edit the path Sveltegen will output to');
// .option('-h, --help', 'Show help')
program.showSuggestionAfterError();
program
    .addHelpText('beforeAll', 'Sveltegen CLI\n---------')
    .addHelpText('afterAll', context => {
    if (context.error) {
        return '\nUnknown Error';
    }
    return '------\nEnjoy!';
});
program.addHelpText('after', `
		Example call:\n  		$ sveltegen --config`);
program
    .command('config')
    .description('Edit the output directory')
    .action(() => {
    (0, functions_1.fn)().createConfig();
});
program.command('init', { hidden: true, isDefault: true }).action(async () => {
    console.clear();
    console.log(`${chalk_1.default.bold.white('Sveltegen CLI')}\n${chalk_1.default.redBright.italic.underline('Warning: This CLI is still experimental.\n')}`);
    const config = (0, functions_1.fn)().hasConfig();
    if (config) {
        const hasConfig = (0, functions_1.fn)().createConfig();
        if (hasConfig)
            (0, functions_1.fn)().main();
    }
    else {
        (0, functions_1.fn)().main();
    }
});
program
    .command('new')
    .description('Generate new component')
    .action(() => { });
// inquirer.prompt([{type:'list',choices:['New Component', 'Edit Config']}])
program.parse(process.argv);
//# sourceMappingURL=cli.js.map