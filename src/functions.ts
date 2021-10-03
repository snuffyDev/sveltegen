import chalk from "chalk";
import * as fs from "fs";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";

import * as vars from "./vars";

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);
enum Template {
	Action,
	Component,
	Route
}
export function fn() {
	const getPath = (newPath: string, index: number) => {
		const path = [
			`${vars.CONFIG_PATH.action}/`,
			`${vars.CONFIG_PATH.component}/${newPath}/`,
			`${vars.CONFIG_PATH.route}/${newPath}/`
		];
		console.log("PATH: " + path[index]);
		return path[index];
	};
	function getExistingComponents() {
		const paths = [
			{
				exists: () => fs.existsSync(vars.CONFIG_PATH.action),
				read: () => fs.readdirSync(vars.CONFIG_PATH.action)
			},
			{
				exists: () => fs.existsSync(vars.CONFIG_PATH.component),
				read: () => fs.readdirSync(vars.CONFIG_PATH.component)
			},
			{
				exists: () => fs.existsSync(vars.CONFIG_PATH.route),
				read: () => fs.readdirSync(vars.CONFIG_PATH.route)
			}
		];

		paths.forEach((path, i) => {
			if (path.exists()) {
				const dir = path.read();
				vars.Factory(dir, null, i);
			}
		});
	}
	const action = () => {
		return inquirer.prompt(vars.Q_ACTION).then(answers => {
			let directory;
			const ACTION_NAME = answers["name"];
			const ACTION_LANG = answers["lang"];
			const TEMPLATE_PATH = `${__dirname}/templates/action`;
			if (!fs.existsSync(`${vars.CONFIG_PATH.action}`)) {
				directory = fs.mkdirSync(`${vars.CONFIG_PATH.action}`);
			}
			fn().copyFiles(TEMPLATE_PATH, [
				ACTION_NAME,
				false,
				ACTION_LANG,
				Template.Action
			]);
		});
	};
	const route = () => {
		return inquirer.prompt(vars.Q_ROUTE).then(answers => {
			console.log(answers);

			let directory;
			const TYPE = answers["type"];
			const ROUTE_NAME = answers["name"];
			const ROUTE_LANG = answers["lang"];
			const ROUTE_STYLE = answers["style"] || null;

			const TEMPLATE_PATH = `${__dirname}/templates/route`;
			if (!fs.existsSync(`${vars.CONFIG_PATH.route}/${ROUTE_NAME}`)) {
				fs.mkdirSync(`${vars.CONFIG_PATH.route}/${ROUTE_NAME}`);
			}
			fn().copyFiles(TEMPLATE_PATH, [
				ROUTE_NAME,
				ROUTE_STYLE,
				ROUTE_LANG,
				Template.Route,
				TYPE
			]);
		});
	};
	const component = () => {
		return inquirer
			.prompt(vars.Q_COMPONENT)
			.then(answers => {
				const COMP_NAME = answers["name"];
				const COMP_STYLE = answers["style"];
				const COMP_LANG = answers["lang"];
				const TEMPLATE_PATH = `${__dirname}/templates/component`;
				// console.log(vars.CONFIG_PATH, vars.vars.CWD)
				fs.mkdirSync(`${vars.CONFIG_PATH.component}/${COMP_NAME}`);
				fn().copyFiles(TEMPLATE_PATH, [
					COMP_NAME,
					COMP_STYLE,
					COMP_LANG,
					Template.Component
				]);
				console.log(
					`Created ${COMP_NAME} successfully at ${vars.CONFIG_PATH.component}/${COMP_NAME}!`
				);
			})
			.catch(error => {
				console.log("An error has occurred! Error: " + error);
			});
	};
	const createConfig = () => {
		const Config: inquirer.QuestionCollection = [
			{
				name: "component",
				type: "file-tree-selection",
				message: `Please provide the path to your component folder.\n${chalk.dim(
					"This can be changed later."
				)}`,
				onlyShowDir: true
			},
			{
				name: "action",
				type: "file-tree-selection",
				message: `Please provide the path to your actions folder.\n${chalk.dim(
					`This can be changed later.\nLeave as .(root directory)/ if inapplicable`
				)}`,

				onlyShowDir: true
			},
			{
				name: "route",
				type: "file-tree-selection",
				message: `Please provide the path to your routes folder.\n${chalk.dim(
					`This can be changed later.\nLeave as .(root directory)/ if inapplicable`
				)}`,
				onlyShowDir: true
			}
		];
		if (fs.existsSync(`${vars.CWD}/${vars.CONFIG_NAME}`)) {
			return inquirer.prompt(Config).then(async answers => {
				const file = fs.readFileSync(`${vars.CWD}/.sveltegen.json`, "utf8");
				let _file = JSON.parse(file);
				let path = answers["component"]
					? answers["component"]
					: answers["action"];
				_file["component"] = answers["component"];
				_file["action"] = answers["action"];
				console.log(path);
				fs.writeFileSync(`${vars.CWD}/.sveltegen.json`, JSON.stringify(_file));
				vars.Factory("", path);

				// main()
				return;
			});
		}
		inquirer.prompt(Config).then(async answers => {
			// vars.CONFIG_PATH = answers['path']
			// vars.Factory('', answers['path'])
			const createFile = await fs.writeFileSync(
				"./" + vars.CONFIG_NAME,
				JSON.stringify(answers)
			);
			console.log(chalk.dim("Config file created! Please rerun sveltegen"));
		});
	};
	return {
		component: () => component(),
		route: () => route(),
		action: () => action(),
		createConfig: () => createConfig(),
		menu: () => {
			inquirer.prompt(vars.MENU).then(answer => {
				if (answer.menu === "Component") {
					component();
				} else if (answer.menu === "Action") {
					action();
				} else {
					route();
				}
			});
		},
		getExistingComponents: () => getExistingComponents(),
		hasConfig() {
			if (!fs.existsSync(`${vars.CWD}/${vars.CONFIG_NAME}`)) return false;
			else {
				const file = fs.readFileSync(`${vars.CWD}/.sveltegen.json`, "utf8");
				const JValue = JSON.parse(file);
				vars.Factory("", JValue);
				getExistingComponents();
				// console.log(fs.existsSync(`${vars.CWD}/${vars.CONFIG_NAME}`), JValue, vars.CONFIG_PATH)
				return true;
			}
		},

		async copyFiles(
			template,
			[newPath, style, lang, type, file]: [
				string,
				boolean,
				boolean,
				number,
				boolean?
			]
		) {
			console.log(template, newPath, style, lang, type);

			try {
				const filesPending = fs.readdirSync(template);
				filesPending.forEach(file => {
					const origFilePath = `${template}/${file}`;
					console.log(file);
					// get stats about the current file
					const stats = fs.statSync(origFilePath);

					if (stats.isFile()) {
						let contents: string;
						contents = fs.readFileSync(origFilePath, "utf8");
						contents = contents.replaceAll(/_name/gm, newPath);
						// if (type==2 &&file.includes('.json')) contents.replaceAll(//)
						file = file.replace(/_name/gm, newPath);
						if (style == false && type == 1) {
							contents = contents.replaceAll(/scss/gm, "css");
							file = file.replace(".scss", ".css");
						}
						contents = contents.replaceAll(
							/(type\s[\s\S\n]*?(.*)};)|(type\s[^\=]([\S\s]+?));|(type\s[^\=]([\S\s]*?)*?)};/gm,
							""
						);
						if (lang == false) {
							// contents = contents.replaceAll(
							// 	/(\slang\="ts")|(\:\s[a-zA-Z\.<>]+)|\/\/ts\s(?=(import\s\{(.*)\}\s(.*)\;))/gm,
							// 	"​"
							// );
							contents = contents.replaceAll(
								/^(\slang\="ts")|(\:\s[a-zA-Z\.<>]+)|(type\s[^\=]([\S\s]*?)*?)};|(\/\/ts\s((import\s\{(.*)\}\s(.*)\;)))$/gm,
								`\u200B`
							);
							file = file.replace(".ts", ".js");
						} else {
							contents = contents.replaceAll(/(\/\/ts\s)/gm, `\u200b`);
						}

						let writePath = getPath(newPath, type);
						writePath = writePath + file;
						fs.writeFileSync(writePath, contents, "utf8");
					}
				});
			} catch (error) {}
		}
	};
}
