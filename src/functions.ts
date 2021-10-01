import chalk from 'chalk'
import * as fs from 'fs'
import inquirer from 'inquirer'
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'

import { CONFIG_NAME, CONFIG_PATH, CWD, Factory, QUESTIONS } from './vars'

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)

export function fn() {
	function getExistingComponents() {
		if (fs.existsSync(CONFIG_PATH)) {
			Factory(fs.readdirSync(CONFIG_PATH), null)
		} else {
			return false
		}
	}
	const main = () => {
		return inquirer
			.prompt(QUESTIONS)
			.then(answers => {
				const COMP_NAME = answers['name']
				const COMP_STYLE = answers['style']
				const COMP_LANG = answers['lang']
				const TEMPLATE = `${__dirname}/template`
				// console.log(CONFIG_PATH, CWD)
				fs.mkdirSync(`${CONFIG_PATH}/${COMP_NAME}`)
				fn().copyFiles(TEMPLATE, [COMP_NAME, COMP_STYLE, COMP_LANG])
				console.log(
					`Created ${COMP_NAME} successfully at ${CONFIG_PATH}/${COMP_NAME}!`
				)
			})
			.catch(error => {
				console.log('An error has occurred! Error: ' + error)
			})
	}
	const createConfig = () => {
		const Config: inquirer.QuestionCollection = [
			{
				name: 'path',
				type: 'file-tree-selection',
				message: `No config detected! Please provide the path to your component folder.\n${chalk.dim(
					'This can be changed later.'
				)}`,
				onlyShowDir: true
			}
		]
		if (fs.existsSync(`${CWD}/${CONFIG_NAME}`)) {
			return inquirer.prompt(Config).then(async answers => {
				const file = fs.readFileSync(`${CWD}/.sveltegen.json`, 'utf8')
				let _file = JSON.parse(file)
				_file['path'] = answers['path']
				fs.writeFileSync(`${CWD}/.sveltegen.json`, JSON.stringify(_file))
				Factory('', answers['path'])

				// main()
				return
			})
		}
		inquirer
			.prompt(Config)
			.then(async answers => {
				// CONFIG_PATH = answers['path']
				Factory('', answers['path'])

				const createFile = await fs.writeFileSync(
					'./' + CONFIG_NAME,
					JSON.stringify(answers)
				)
				console.log(chalk.dim('Config file created!'))
			})
			.then(() => main())
	}
	return {
		main: () => main(),
		createConfig: () => createConfig(),
		getExistingComponents: () => getExistingComponents(),
		hasConfig() {
			if (!fs.existsSync(`${CWD}/${CONFIG_NAME}`)) return true
			else {
				const file = fs.readFileSync(`${CWD}/.sveltegen.json`, 'utf8')
				const JValue = JSON.parse(file)
				Factory('', JValue['path'])
				getExistingComponents()
				// console.log(fs.existsSync(`${CWD}/${CONFIG_NAME}`), JValue, CONFIG_PATH)
				return false
			}
		},

		async copyFiles(template, [newPath, style, lang]) {
			try {
				const filesPending = fs.readdirSync(template)
				filesPending.forEach(file => {
					const origFilePath = `${template}/${file}`

					// get stats about the current file
					const stats = fs.statSync(origFilePath)

					if (stats.isFile()) {
						let contents: string
						contents = fs.readFileSync(origFilePath, 'utf8')
						contents = contents.replaceAll(/_name/gm, newPath)
						if (style == false) {
							contents = contents.replaceAll(/scss/gm, 'css')
							file = file.replace('scss', 'css')
						}
						if (lang == false) {
							contents = contents.replaceAll(/(\slang\="ts")/gm, '​')
							file = file.replace('ts', 'js')
						}
						const writePath = `${CONFIG_PATH}/${newPath}/${file.replace(
							'_name',
							newPath
						)}`
						fs.writeFileSync(writePath, contents, 'utf8')
					}
				})
			} catch (error) {}
		}
	}
}
