"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUESTIONS = exports.CONFIG_NAME = exports.CWD = exports.Factory = exports.CONFIG_PATH = exports.EXISTING_COMP = void 0;
exports.CONFIG_PATH = '';
function Factory(components, config) {
    if (components) {
        exports.EXISTING_COMP = components;
    }
    if (config) {
        exports.CONFIG_PATH = config;
    }
}
exports.Factory = Factory;
exports.CWD = process.cwd();
exports.CONFIG_NAME = '.sveltegen.json';
exports.QUESTIONS = [
    {
        name: 'name',
        type: 'input',
        message: 'Name for your component?',
        validate: (input, answer) => {
            const regex = RegExp(/^[a-zA-Z]+$/gm);
            // console.log(EXISTING_COMP)
            if (exports.EXISTING_COMP?.includes(input))
                return 'Component already exists!';
            if (!input || input.length == 0)
                return 'You must put in a name!';
            if (!regex.test(input))
                return `Name can only contain characters [a-zA-Z]`;
            if (input && input.charAt(0) == input.charAt(0).toUpperCase())
                return true;
            else
                return 'The name must start with a capital letter!';
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
];
//# sourceMappingURL=vars.js.map