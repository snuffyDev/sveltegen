"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const inquirer = __importStar(require("inquirer"));
const functions_1 = require("./functions");
const vars = __importStar(require("./vars"));
const program = new commander_1.Command();
program.configureHelp({
    sortSubcommands: true,
    subcommandTerm: cmd => cmd.name() // Just show the name, instead of short usage.
});
// const args = process.argv
// console.log(args)
program
    .name('svgen')
    .description('Svelte/SvelteKit Component Template Generator')
    .option('-c, --config', 'Edit the path Svgen will output to');
// .option('-h, --help', 'Show help')
program.showSuggestionAfterError();
program
    .addHelpText('beforeAll', 'Svgen CLI\n---------')
    .addHelpText('afterAll', context => {
    if (context.error) {
        return '\nUnknown Error';
    }
    return '------\nEnjoy!';
});
program.addHelpText('after', `
		Example call:\n  		$ svgen --config`);
program
    .command('config')
    .description('Edit the output directory')
    .action(() => {
    (0, functions_1.fn)().createConfig();
}),
    program
        .command('new', { isDefault: true })
        .description('Generate new component')
        .action(() => {
        inquirer
            .prompt(vars.QUESTIONS)
            .then(answers => {
            const COMP_NAME = answers['name'];
            // const COMP_STYLE = answers['style']
            const TEMPLATE = `${__dirname}/template`;
            // console.log(CONFIG_PATH, CWD)
            fs.mkdirSync(`${vars.CONFIG_PATH}/${COMP_NAME}`);
            (0, functions_1.fn)().copyFiles(TEMPLATE, COMP_NAME);
            console.log(`Created ${COMP_NAME} successfully at ${vars.CONFIG_PATH}/${COMP_NAME}!`);
        })
            .catch(error => {
            console.log('An error has occurred! Error: ' + error);
        });
    });
program.parse(process.argv);
//# sourceMappingURL=cli.js.map