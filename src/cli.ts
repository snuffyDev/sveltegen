import chalk from 'chalk'
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
	.name('sveltegen')
	.description('Svelte/SvelteKit Component Template Generator')
	.option('-c, --config', 'Edit the path Sveltegen will output to')
// .option('-h, --help', 'Show help')
program.showSuggestionAfterError()

program
	.addHelpText('beforeAll', 'Sveltegen CLI\n---------')
	.addHelpText('afterAll', context => {
		if (context.error) {
			return '\nUnknown Error'
		}
		return '------\nEnjoy!'
	})

program.addHelpText(
	'after',
	`
		Example call:\n  		$ sveltegen --config`
)
program
	.command('config')
	.description('Edit the output directory')
	.action(() => {
		fn().createConfig()
	})
program.command('init', { hidden: true, isDefault: true }).action(async () => {
	console.clear()
	console.log(
		`${chalk.bold.white('Sveltegen CLI')}\n${chalk.redBright.italic.underline(
			'Warning: This CLI is still experimental.\n'
		)}`
	)
	const config = fn().hasConfig()

	if (config) {
		const hasConfig = fn().createConfig()
		if (hasConfig) fn().main()
	} else {
		fn().main()
	}
})
program
	.command('new')
	.description('Generate new component')
	.action(() => {})
// inquirer.prompt([{type:'list',choices:['New Component', 'Edit Config']}])
program.parse(process.argv)
