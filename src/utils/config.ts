import inquirer from "inquirer";
import path from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import colors from "./colors";
import { cwd } from "process";
import { vars } from "../core/variables";

import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

const CWD = process.cwd();

const Config: inquirer.QuestionCollection = [
	{
		name: "component",
		type: "file-tree-selection",
		message: `Please provide the path to your component folder.\n${colors.dim(
			"This can be changed later."
		)}`,
		onlyShowDir: true
	},
	{
		name: "action",
		type: "file-tree-selection",
		message: `Please provide the path to your actions folder.\n${colors.dim(
			`This can be changed later.\nLeave as .(root directory)/ if inapplicable`
		)}`,

		onlyShowDir: true
	},
	{
		name: "route",
		type: "file-tree-selection",
		message: `Please provide the path to your routes folder.\n${colors.dim(
			`This can be changed later.\nLeave as .(root directory)/ if inapplicable`
		)}`,

		onlyShowDir: true
	}
];

export const createConfig = async () => {
	if (existsSync(`${vars.CWD}/${vars.CONFIG_NAME}`)) {
		return inquirer.prompt(Config).then(async answers => {
			const file = readFileSync(`${vars.CWD}/.sveltegen.json`, "utf8");
			let _file = JSON.parse(file);
			let path = answers["component"]
				? answers["component"]
				: answers["action"];
			_file["component"] = answers["component"];
			_file["action"] = answers["action"];
			console.log(path);
			writeFileSync(`${CWD}/.sveltegen.json`, JSON.stringify(_file));

			// main()
			return;
		});
	}
	return inquirer.prompt(Config).then(async answers => {
		// vars.PATHS = answers['path']
		// vars.Factory('', answers['path'])
		console.log(path.resolve(CWD));
		const createFile = await writeFileSync(
			"./" + vars.CONFIG_NAME,
			JSON.stringify(answers)
		);
		console.log(colors.dim("Config file created! Please rerun sveltegen"));
	});
};

export const loadConfig = async () => {
	const conf_path = path.resolve(cwd(), ".sveltegen.json");
	if (!existsSync(conf_path)) {
		return await createConfig();
	}
	const config = await import(conf_path);
	vars.PATHS = config;
	return await config;
};
