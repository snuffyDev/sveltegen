import { Command } from 'commander'

import * as fs from 'fs'
import * as inquirer from 'inquirer'
import { fn } from './functions'
import * as vars from './vars'

const program = new Command()

program.configureHelp({
	sortSubcommands: true,
	subcommandTerm: cmd => cmd.name() // Just show the name, instead of short usage.
})
// const args = process.argv
// console.log(args)
program
	.name('svgen')
	.description('Svelte/SvelteKit Component Template Generator')
	.option('-c, --config', 'Edit the path Svgen will output to')
// .option('-h, --help', 'Show help')
program.showSuggestionAfterError()

program
	.addHelpText('beforeAll', 'Svgen CLI\n---------')
	.addHelpText('afterAll', context => {
		if (context.error) {
			return '\nUnknown Error'
		}
		return '------\nEnjoy!'
	})

program.addHelpText(
	'after',
	`
		Example call:\n  		$ svgen --config`
)
program
	.command('config')
	.description('Edit the output directory')
	.action(() => {
		fn().createConfig()
	}),
	program
		.command('new', { isDefault: true })
		.description('Generate new component')
		.action(() => {
			inquirer
				.prompt(vars.QUESTIONS)
				.then(answers => {
					const COMP_NAME = answers['name']
					// const COMP_STYLE = answers['style']
					const TEMPLATE = `${__dirname}/template`
					// console.log(CONFIG_PATH, CWD)
					fs.mkdirSync(`${vars.CONFIG_PATH}/${COMP_NAME}`)
					fn().copyFiles(TEMPLATE, COMP_NAME)
					console.log(
						`Created ${COMP_NAME} successfully at ${vars.CONFIG_PATH}/${COMP_NAME}!`
					)
				})
				.catch(error => {
					console.log('An error has occurred! Error: ' + error)
				})
		})

program.parse(process.argv)
