import * as inquirer from 'inquirer'

export let EXISTING_COMP: string[]
export let CONFIG_PATH = ''

export function Factory(components?: any, config?: any) {
	if (components) {
		EXISTING_COMP = components
	}
	if (config) {
		CONFIG_PATH = config
	}
}

export const CWD = process.cwd()
export const CONFIG_NAME = '.sveltegen.json'
export const QUESTIONS: inquirer.QuestionCollection = [
	{
		name: 'name',
		type: 'input',
		message: 'Name for your component?',
		validate: (input: string, answer) => {
			const regex = RegExp(/^[a-zA-Z]+$/gm)
			// console.log(EXISTING_COMP)
			if (EXISTING_COMP?.includes(input)) return 'Component already exists!'
			if (!input || input.length == 0) return 'You must put in a name!'
			if (!regex.test(input)) return `Name can only contain characters [a-zA-Z]`
			if (input && input.charAt(0) == input.charAt(0).toUpperCase()) return true
			else return 'The name must start with a capital letter!'
		}
	},
	{
		name: 'lang',
		type: 'confirm',
		message: 'Typescript?',
		// choices: ['Yes', 'No']
		default: true
		// default: 'SCSS'
	},
	{
		name: 'style',
		type: 'confirm',
		message: 'SCSS?',
		default: true
		// choices: ['Yes', 'No']
		// default: 'SCSS'
	}
]
