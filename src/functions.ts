import * as fs from "fs";
import inquirer from "inquirer";
import path from "path";
import * as vars from "./core/variables/variables";
import { Template } from "./types";
import { createConfig } from "./utils/config";

const getExistingComponents = () => {};
const getPath = (newPath: string, index: number) => {
	const path = [
		`${vars.PATHS.action}/`,
		`${vars.PATHS.component}/${newPath}/`,
		`${vars.PATHS.route}/${newPath}/`
	];
	return path[index];
};
const createLib = (path: string, template: string) => {
	template = template + "\r\n";
	fs.writeFileSync(path, template);
};
const writeLib = (file: string, template: string) => {
	template = template + "\r\n";
	fs.appendFileSync(file, template);
};
const alreadyExists = () => console.log("Something already lives here!");
async function copyFiles(
	template,
	options: {
		newPath: string;
		style?: boolean;
		lang: boolean;
		type: Template;
		page?: boolean;
		lib?: boolean;
	}
) {
	const { newPath, style, lang, type, page, lib } = options;
	// console.log(template, newPath, style, lang, type);
	const types = ["action", "component", "route"];
	try {
		if (type == 1 && lib) {
			const libFile = lang ? `index.ts` : `index.js`;
			const libPath = path.resolve(vars.PATHS[types[type]], libFile);
			const _string = `export {default as ${newPath}} from './${newPath}'`;
			const hasFile =
				fs.existsSync(libPath) &&
				fs.readFileSync(libPath, { encoding: "utf-8" });
			if (hasFile) writeLib(libPath, _string);
			else createLib(libPath, _string);
		}
		const filesPending = fs.readdirSync(template);
		filesPending.forEach(file => {
			const origFilePath = `${template}/${file}`;

			// get stats about the current file
			const stats = fs.statSync(origFilePath);

			if (stats.isFile()) {
				let contents: string;
				contents = fs.readFileSync(origFilePath, "utf8");
				contents = contents.replaceAll(/_name/gm, newPath);
				file = file.replace(/_name/gm, newPath);
				if (style == false || (page == true && !style)) {
					contents = contents.replaceAll(/scss/gm, "css");
					file = file.replace(".scss", ".css");
				}
				contents = contents.replaceAll(
					/(type\s[\s\S\n]*?(.*)};)|(type\s[^\=]([\S\s]+?));|(type\s[^\=]([\S\s]*?)*?)};/gm,
					""
				);
				if (lang == false) {
					contents = contents.replaceAll(
						/(\slang="ts")|(\:\s[a-zA-Z\.<>]+)|(type\s[^\=]([\S\s]*?)*?)};|(\/\/ts\s((import\s\{(.*)\}\s(.*)\;)))/gm,
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
		console.log(
			`Created ${newPath} successfully at ${path.resolve(
				`${vars.PATHS[types[type]]}/${newPath}`
			)!}`
		);
	} catch (error) {
		console.error(error);
	}
}

const action = (...args) => {
	const opts = args[0];
	const TEMPLATE_PATH = `${__dirname}/templates/action`;
	let path = `${vars.PATHS.action}/`;

	if (opts) {
		if (!fs.existsSync(`${path}${opts.name}`)) {
			return copyFiles(TEMPLATE_PATH, {
				newPath: opts.name,
				style: false,
				lang: opts.ts,
				type: Template.Action
			});
		} else {
			return alreadyExists();
		}
	}

	return inquirer.prompt(vars.Q_ACTION).then(answers => {
		const ACTION_NAME = answers["name"];
		const ACTION_LANG = answers["lang"];

		if (!fs.existsSync(`${path}${ACTION_NAME}`)) {
			fs.mkdirSync(`${path}${ACTION_NAME}`);
		} else {
			return alreadyExists();
		}
		copyFiles(TEMPLATE_PATH, {
			newPath: ACTION_NAME,
			style: false,
			lang: ACTION_LANG,
			type: Template.Action
		});
	});
};
const route = (...args) => {
	let opts = args[0];
	let path = `${vars.PATHS.route}/`;
	if (opts) {
		if (!fs.existsSync(`${path}${opts.name}`)) {
			fs.mkdirSync(`${path}${opts.name}`);
		} else {
			return alreadyExists();
		}
		return copyFiles(`${__dirname}/templates/route`, {
			newPath: opts.name,
			lang: opts.ts,
			style: opts.scss,
			page: opts.page ? true : false,
			type: Template.Route
		});
	}
	return inquirer.prompt(vars.Q_ROUTE).then(answers => {
		const TYPE = answers["type"];
		const ROUTE_NAME = answers["name"];
		const ROUTE_LANG = answers["lang"];
		const ROUTE_STYLE = answers["style"] || null;

		const TEMPLATE_PATH = `${__dirname}/templates/route`;
		if (!fs.existsSync(`${path}/${ROUTE_NAME}`)) {
			fs.mkdirSync(`${path}/${ROUTE_NAME}`);
		} else {
			return alreadyExists();
		}
		copyFiles(TEMPLATE_PATH, {
			newPath: ROUTE_NAME,
			style: ROUTE_STYLE,
			lang: ROUTE_LANG,
			type: Template.Route,
			page: TYPE
		});
	});
};
const component = (...args) => {
	let opts = args[0];
	let path = `${vars.PATHS.component}/`;
	const TEMPLATE_PATH = `${__dirname}/templates/component`;
	if (opts) {
		if (!fs.existsSync(`${path}${opts.name}`)) {
			fs.mkdirSync(`${path}${opts.name}`);
		} else {
			return alreadyExists();
		}
		return copyFiles(TEMPLATE_PATH, {
			newPath: opts.name,
			lang: opts.ts,
			style: opts.scss,
			page: opts.page ? true : false,
			type: Template.Component,
			lib: opts.lib
		});
	}
	return inquirer
		.prompt(vars.Q_COMPONENT)
		.then(answers => {
			const COMP_NAME = answers["name"];
			const COMP_STYLE = answers["style"];
			const COMP_LANG = answers["lang"];
			// console.log(vars.PATHS, vars.vars.CWD)
			if (!fs.existsSync(`${path}/${COMP_NAME}`)) {
				fs.mkdirSync(`${path}/${COMP_NAME}`);
			} else {
				return alreadyExists();
			}
			copyFiles(TEMPLATE_PATH, {
				newPath: COMP_NAME,
				style: COMP_STYLE,
				lang: COMP_LANG,
				type: Template.Component
			});
			console.log(
				`Created ${COMP_NAME} successfully at ${vars.PATHS.component}/${COMP_NAME}!`
			);
		})
		.catch(error => {
			console.log("An error has occurred! Error: " + error);
		});
};

export default {
	route: (...args) => route(...args),
	component: (...args) => component(...args),
	action: (...args) => action(...args),
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
			// console.log(fs.existsSync(`${vars.CWD}/${vars.CONFIG_NAME}`), JValue, vars.PATHS)
			return true;
		}
	}
};
