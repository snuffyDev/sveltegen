import { CONFIG_PATH, Factory, CWD, CONFIG_NAME } from './vars'
import * as fs from 'fs'
import inquirer from 'inquirer'
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)

export function fn() {
	function getExistingComponents() {
		if (fs.existsSync(CONFIG_PATH)) {
			Factory(fs.readdirSync(CONFIG_PATH), null)
		} else {
			return false
		}
	}

	const createConfig = () => {
		const Config: inquirer.QuestionCollection = [
			{
				name: 'path',
				type: 'file-tree-selection',
				message:
					'No config detected! Please provide the path to your component folder.',
				onlyShowDir: true
			}
		]
		if (fs.existsSync(`${CWD}/${CONFIG_NAME}`)) {
			return inquirer.prompt(Config).then(async answers => {
				const file = fs.readFileSync(`${CWD}/.cg.json`, 'utf8')
				let _file = JSON.parse(file)
				_file['path'] = answers['path']
				fs.writeFileSync(`${CWD}/.cg.json`, JSON.stringify(_file))
				Factory('', answers['path'])

				// main()
				return
			})
		}
		return inquirer.prompt(Config).then(async answers => {
			// CONFIG_PATH = answers['path']
			Factory('', answers['path'])

			const createFile = await fs.writeFileSync(
				'./' + CONFIG_NAME,
				JSON.stringify(answers)
			)
			console.log('config file created!')
			return true
		})
	}
	return {
		createConfig: () => createConfig(),
		getExistingComponents: () => getExistingComponents(),
		hasConfig() {
			if (fs.existsSync(`${CWD}/${CONFIG_NAME}`)) {
				const file = fs.readFileSync(`${CWD}/.cg.json`, 'utf8')
				const JValue = JSON.parse(file)
				Factory('', JValue['path'])
				getExistingComponents()
				// console.log(fs.existsSync(`${CWD}/${CONFIG_NAME}`), JValue, CONFIG_PATH)
				return true
			}
			return false
		},

		async copyFiles(template, newPath) {
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
