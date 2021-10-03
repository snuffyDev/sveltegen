import chalk from "chalk";
import { Command } from "commander";

// import * as pkg from "../package.json";
import { fn } from "./functions";

const program = new Command();

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

program.addHelpText(
	"after",
	`
		Example call:\n  		$ sveltegen --config`
);
program
	.command("config")
	.description("change the output directory")
	.action(() => {
		fn().createConfig();
	});
program.command("init", { hidden: true, isDefault: true }).action(async () => {
	console.clear();
	console.log(
		`${chalk.bold.white(`Sveltegen CLI`)}\n${chalk.redBright.italic.underline(
			"Warning: This CLI is still experimental.\n"
		)}`
	);
	const config = fn().hasConfig();

	if (!config) {
		const hasConfig = fn().createConfig();
		if (hasConfig) fn().menu();
	} else {
		fn().menu();
	}
});
program
	.command("new")
	.description("generate new component")
	.option("-c, --component", "generate new component")
	.option("-a, --action", "generate new action")
	.action((name, options, command) => {
		console.log("Component! " + JSON.stringify(name.component));
		if (name.component) fn().component();
		if (name.action) fn().action();
	});
// inquirer.prompt([{type:'list',choices:['New Component', 'Edit Config']}])
program.parse();
