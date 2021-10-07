import * as inquirer from "inquirer";
import path from "path";

export let EXISTING_COMP: string[];
export let EXISTING_ACTION: string[];
export let EXISTING_ROUTE: string[];

export let PATHS: { component?: string; action?: string; route?: string };
export const CONFIG = path.join(process.cwd(), ".sveltegen.json");

export const CWD = process.cwd();
export const CONFIG_NAME = ".sveltegen.json";
export const Q_ACTION: inquirer.QuestionCollection = [
	{
		name: "name",
		type: "input",
		message: "Name for your action?",
		validate: (input: string, answer) => {
			const regex = RegExp(/^[a-zA-Z0-9_-]+$/gm);
			// console.log(EXISTING_COMP)
			if (EXISTING_ACTION?.includes(input)) return "Action already exists!";
			if (!input || input.length == 0) return "You must put in a name!";
			if (!regex.test(input))
				return `Name can only contain characters [a-zA-Z]`;
			// if (input && input.charAt(0) == input.charAt(0).toUpperCase())
			// 	return true;
			return true;
			// else return 'The name must start with a capital letter!'
		}
	},
	{
		name: "lang",
		type: "confirm",
		message: "Typescript?",
		// choices: ['Yes', 'No']
		default: true
		// default: 'SCSS'
	}
];
export const Q_ROUTE: inquirer.QuestionCollection = [
	{
		name: "type",
		type: "checkbox",
		message: "Endpoint, Page, or Both?",
		choices: ["Endpoint", "Page"],
		// default: true
		validate: answer => {
			if (answer.length < 1) return "You must choose at least one option.";
			else return true;
		},
		default: "Endpoint"
	},
	{
		name: "name",
		type: "input",
		message: "Name of route?",
		validate: (input: string, answer) => {
			const regex = RegExp(/^[a-zA-Z0-9_-]+$/gm);
			// console.log(EXISTING_COMP)
			if (EXISTING_ROUTE?.includes(input)) return "Route already exists!";
			if (!input || input.length == 0) return "You must put in a name!";
			if (!regex.test(input))
				return `Name can only contain characters [a-zA-Z]`;
			// if (input && input.charAt(0) == input.charAt(0).toUpperCase())
			// 	return true;
			return true;
			// else return 'The name must start with a capital letter!'
		}
	},
	{
		name: "lang",
		type: "confirm",
		message: "Typescript?",
		// choices: ['Yes', 'No']
		default: true
		// default: 'SCSS'
	},
	{
		name: "style",
		type: "confirm",
		message: "SCSS?",
		when: answers => {
			if (answers.type.includes("Page")) return true;
		}
	}
];
export const MENU: inquirer.QuestionCollection = [
	{
		name: "menu",
		message: "What do you want to generate?",
		type: "list",
		choices: ["Component", "Action", "Route"],
		default: "Component"
	}
];
export const Q_COMPONENT: inquirer.QuestionCollection = [
	{
		name: "name",
		type: "input",
		message: "Name for your component?",
		validate: (input: string, answer) => {
			const regex = RegExp(/^[a-zA-Z_]+$/gm);
			// console.log(EXISTING_COMP)
			if (EXISTING_COMP?.includes(input)) return "Component already exists!";
			if (!input || input.length == 0) return "You must put in a name!";
			if (!regex.test(input))
				return `Name can only contain characters [a-zA-Z]`;
			if (input && input.charAt(0) == input.charAt(0).toUpperCase())
				return true;
			else return "The name must start with a capital letter!";
		}
	},
	{
		name: "lang",
		type: "confirm",
		message: "Typescript?",
		// choices: ['Yes', 'No']
		default: true
		// default: 'SCSS'
	},
	{
		name: "style",
		type: "confirm",
		message: "SCSS?",
		default: true
		// choices: ['Yes', 'No']
		// default: 'SCSS'
	}
];
