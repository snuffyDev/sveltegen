"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = exports.createConfig = void 0;
const tslib_1 = require("tslib");
const inquirer_1 = (0, tslib_1.__importDefault)(require("inquirer"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const fs_1 = require("fs");
const colors_1 = (0, tslib_1.__importDefault)(require("./colors"));
const process_1 = require("process");
const variables_1 = require("../core/variables");
const inquirer_file_tree_selection_prompt_1 = (0, tslib_1.__importDefault)(require("inquirer-file-tree-selection-prompt"));
inquirer_1.default.registerPrompt("file-tree-selection", inquirer_file_tree_selection_prompt_1.default);
const CWD = process.cwd();
const Config = [
    {
        name: "component",
        type: "file-tree-selection",
        message: `Please provide the path to your component folder.\n${colors_1.default.dim("This can be changed later.")}`,
        onlyShowDir: true
    },
    {
        name: "action",
        type: "file-tree-selection",
        message: `Please provide the path to your actions folder.\n${colors_1.default.dim(`This can be changed later.\nLeave as .(root directory)/ if inapplicable`)}`,
        onlyShowDir: true
    },
    {
        name: "route",
        type: "file-tree-selection",
        message: `Please provide the path to your routes folder.\n${colors_1.default.dim(`This can be changed later.\nLeave as .(root directory)/ if inapplicable`)}`,
        onlyShowDir: true
    }
];
const createConfig = async () => {
    if ((0, fs_1.existsSync)(`${variables_1.vars.CWD}/${variables_1.vars.CONFIG_NAME}`)) {
        return inquirer_1.default.prompt(Config).then(async (answers) => {
            const file = (0, fs_1.readFileSync)(`${variables_1.vars.CWD}/.sveltegen.json`, "utf8");
            let _file = JSON.parse(file);
            let path = answers["component"]
                ? answers["component"]
                : answers["action"];
            _file["component"] = answers["component"];
            _file["action"] = answers["action"];
            console.log(path);
            (0, fs_1.writeFileSync)(`${CWD}/.sveltegen.json`, JSON.stringify(_file));
            return;
        });
    }
    return inquirer_1.default.prompt(Config).then(async (answers) => {
        console.log(path_1.default.resolve(CWD));
        const createFile = await (0, fs_1.writeFileSync)("./" + variables_1.vars.CONFIG_NAME, JSON.stringify(answers));
        console.log(colors_1.default.dim("Config file created! Please rerun sveltegen"));
    });
};
exports.createConfig = createConfig;
const loadConfig = async () => {
    const conf_path = path_1.default.resolve((0, process_1.cwd)(), ".sveltegen.json");
    if (!(0, fs_1.existsSync)(conf_path)) {
        return await (0, exports.createConfig)();
    }
    const config = await Promise.resolve().then(() => (0, tslib_1.__importStar)(require(conf_path)));
    variables_1.vars.PATHS = config;
    return await config;
};
exports.loadConfig = loadConfig;
//# sourceMappingURL=config.js.map