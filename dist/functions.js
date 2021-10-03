"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const inquirer_file_tree_selection_prompt_1 = __importDefault(require("inquirer-file-tree-selection-prompt"));
const vars = __importStar(require("./vars"));
inquirer_1.default.registerPrompt("file-tree-selection", inquirer_file_tree_selection_prompt_1.default);
var Template;
(function (Template) {
    Template[Template["Action"] = 0] = "Action";
    Template[Template["Component"] = 1] = "Component";
    Template[Template["Route"] = 2] = "Route";
})(Template || (Template = {}));
function fn() {
    const getPath = (newPath, index) => {
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
        return inquirer_1.default.prompt(vars.Q_ACTION).then(answers => {
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
        return inquirer_1.default.prompt(vars.Q_ROUTE).then(answers => {
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
        return inquirer_1.default
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
            console.log(`Created ${COMP_NAME} successfully at ${vars.CONFIG_PATH.component}/${COMP_NAME}!`);
        })
            .catch(error => {
            console.log("An error has occurred! Error: " + error);
        });
    };
    const createConfig = () => {
        const Config = [
            {
                name: "component",
                type: "file-tree-selection",
                message: `Please provide the path to your component folder.\n${chalk_1.default.dim("This can be changed later.")}`,
                onlyShowDir: true
            },
            {
                name: "action",
                type: "file-tree-selection",
                message: `Please provide the path to your actions folder.\n${chalk_1.default.dim(`This can be changed later.\nLeave as .(root directory)/ if inapplicable`)}`,
                onlyShowDir: true
            },
            {
                name: "route",
                type: "file-tree-selection",
                message: `Please provide the path to your routes folder.\n${chalk_1.default.dim(`This can be changed later.\nLeave as .(root directory)/ if inapplicable`)}`,
                onlyShowDir: true
            }
        ];
        if (fs.existsSync(`${vars.CWD}/${vars.CONFIG_NAME}`)) {
            return inquirer_1.default.prompt(Config).then(async (answers) => {
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
        inquirer_1.default.prompt(Config).then(async (answers) => {
            // vars.CONFIG_PATH = answers['path']
            // vars.Factory('', answers['path'])
            const createFile = await fs.writeFileSync("./" + vars.CONFIG_NAME, JSON.stringify(answers));
            console.log(chalk_1.default.dim("Config file created! Please rerun sveltegen"));
        });
    };
    return {
        component: () => component(),
        route: () => route(),
        action: () => action(),
        createConfig: () => createConfig(),
        menu: () => {
            inquirer_1.default.prompt(vars.MENU).then(answer => {
                if (answer.menu === "Component") {
                    component();
                }
                else if (answer.menu === "Action") {
                    action();
                }
                else {
                    route();
                }
            });
        },
        getExistingComponents: () => getExistingComponents(),
        hasConfig() {
            if (!fs.existsSync(`${vars.CWD}/${vars.CONFIG_NAME}`))
                return false;
            else {
                const file = fs.readFileSync(`${vars.CWD}/.sveltegen.json`, "utf8");
                const JValue = JSON.parse(file);
                vars.Factory("", JValue);
                getExistingComponents();
                // console.log(fs.existsSync(`${vars.CWD}/${vars.CONFIG_NAME}`), JValue, vars.CONFIG_PATH)
                return true;
            }
        },
        async copyFiles(template, [newPath, style, lang, type, file]) {
            console.log(template, newPath, style, lang, type);
            try {
                const filesPending = fs.readdirSync(template);
                filesPending.forEach(file => {
                    const origFilePath = `${template}/${file}`;
                    console.log(file);
                    // get stats about the current file
                    const stats = fs.statSync(origFilePath);
                    if (stats.isFile()) {
                        let contents;
                        contents = fs.readFileSync(origFilePath, "utf8");
                        contents = contents.replaceAll(/_name/gm, newPath);
                        // if (type==2 &&file.includes('.json')) contents.replaceAll(//)
                        file = file.replace(/_name/gm, newPath);
                        if (style == false && type == 1) {
                            contents = contents.replaceAll(/scss/gm, "css");
                            file = file.replace(".scss", ".css");
                        }
                        contents = contents.replaceAll(/(type\s[\s\S\n]*?(.*)};)|(type\s[^\=]([\S\s]+?));|(type\s[^\=]([\S\s]*?)*?)};/gm, "");
                        if (lang == false) {
                            // contents = contents.replaceAll(
                            // 	/(\slang\="ts")|(\:\s[a-zA-Z\.<>]+)|\/\/ts\s(?=(import\s\{(.*)\}\s(.*)\;))/gm,
                            // 	"​"
                            // );
                            contents = contents.replaceAll(/^(\slang\="ts")|(\:\s[a-zA-Z\.<>]+)|(type\s[^\=]([\S\s]*?)*?)};|(\/\/ts\s((import\s\{(.*)\}\s(.*)\;)))$/gm, `\u200B`);
                            file = file.replace(".ts", ".js");
                        }
                        else {
                            contents = contents.replaceAll(/(\/\/ts\s)/gm, `\u200b`);
                        }
                        let writePath = getPath(newPath, type);
                        writePath = writePath + file;
                        fs.writeFileSync(writePath, contents, "utf8");
                    }
                });
            }
            catch (error) { }
        }
    };
}
exports.fn = fn;
//# sourceMappingURL=functions.js.map