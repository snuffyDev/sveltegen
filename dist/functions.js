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
const vars_1 = require("./vars");
const fs = __importStar(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const inquirer_file_tree_selection_prompt_1 = __importDefault(require("inquirer-file-tree-selection-prompt"));
inquirer_1.default.registerPrompt('file-tree-selection', inquirer_file_tree_selection_prompt_1.default);
function fn() {
    function getExistingComponents() {
        if (fs.existsSync(vars_1.CONFIG_PATH)) {
            (0, vars_1.Factory)(fs.readdirSync(vars_1.CONFIG_PATH), null);
        }
        else {
            return false;
        }
    }
    const createConfig = () => {
        const Config = [
            {
                name: 'path',
                type: 'file-tree-selection',
                message: 'No config detected! Please provide the path to your component folder.',
                onlyShowDir: true
            }
        ];
        if (fs.existsSync(`${vars_1.CWD}/${vars_1.CONFIG_NAME}`)) {
            return inquirer_1.default.prompt(Config).then(async (answers) => {
                const file = fs.readFileSync(`${vars_1.CWD}/.cg.json`, 'utf8');
                let _file = JSON.parse(file);
                _file['path'] = answers['path'];
                fs.writeFileSync(`${vars_1.CWD}/.cg.json`, JSON.stringify(_file));
                (0, vars_1.Factory)('', answers['path']);
                // main()
                return;
            });
        }
        return inquirer_1.default.prompt(Config).then(async (answers) => {
            // CONFIG_PATH = answers['path']
            (0, vars_1.Factory)('', answers['path']);
            const createFile = await fs.writeFileSync('./' + vars_1.CONFIG_NAME, JSON.stringify(answers));
            console.log('config file created!');
            return true;
        });
    };
    return {
        createConfig: () => createConfig(),
        getExistingComponents: () => getExistingComponents(),
        hasConfig() {
            if (fs.existsSync(`${vars_1.CWD}/${vars_1.CONFIG_NAME}`)) {
                const file = fs.readFileSync(`${vars_1.CWD}/.cg.json`, 'utf8');
                const JValue = JSON.parse(file);
                (0, vars_1.Factory)('', JValue['path']);
                getExistingComponents();
                // console.log(fs.existsSync(`${CWD}/${CONFIG_NAME}`), JValue, CONFIG_PATH)
                return true;
            }
            return false;
        },
        async copyFiles(template, newPath) {
            try {
                const filesPending = fs.readdirSync(template);
                filesPending.forEach(file => {
                    const origFilePath = `${template}/${file}`;
                    // get stats about the current file
                    const stats = fs.statSync(origFilePath);
                    if (stats.isFile()) {
                        let contents;
                        contents = fs.readFileSync(origFilePath, 'utf8');
                        contents = contents.replaceAll(/_name/gm, newPath);
                        const writePath = `${vars_1.CONFIG_PATH}/${newPath}/${file.replace('_name', newPath)}`;
                        fs.writeFileSync(writePath, contents, 'utf8');
                    }
                });
            }
            catch (error) { }
        }
    };
}
exports.fn = fn;
//# sourceMappingURL=functions.js.map