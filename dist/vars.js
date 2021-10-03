"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Q_COMPONENT = exports.MENU = exports.Q_ROUTE = exports.Q_ACTION = exports.CONFIG_NAME = exports.CWD = exports.Factory = exports.CONFIG_PATH = exports.EXISTING_ROUTE = exports.EXISTING_ACTION = exports.EXISTING_COMP = void 0;
function Factory(components, config, type) {
    // console.log(config, "config");
    if (components) {
        if (type == 0) {
            exports.EXISTING_ACTION = components;
        }
        if (type == 1) {
            exports.EXISTING_COMP = components;
        }
        if (type == 2) {
            exports.EXISTING_ROUTE = components;
        }
        // console.log(EXISTING_ACTION, EXISTING_ROUTE, EXISTING_COMP, "EXSIT config");
    }
    if (config) {
        exports.CONFIG_PATH = config;
    }
}
exports.Factory = Factory;
exports.CWD = process.cwd();
exports.CONFIG_NAME = ".sveltegen.json";
exports.Q_ACTION = [
    {
        name: "name",
        type: "input",
        message: "Name for your action?",
        validate: (input, answer) => {
            const regex = RegExp(/^[a-zA-Z0-9_-]+$/gm);
            // console.log(EXISTING_COMP)
            if (exports.EXISTING_ACTION?.includes(input))
                return "Action already exists!";
            if (!input || input.length == 0)
                return "You must put in a name!";
            if (!regex.test(input))
                return `Name can only contain characters [a-zA-Z]`;
            // if (input && input.charAt(0) == input.charAt(0).toUpperCase())
            // 	return true;
            return true;
            // else return 'The name must start with a capital letter!'
        }
    },
    {
        name: "lang",
        type: "confirm",
        message: "Typescript?",
        // choices: ['Yes', 'No']
        default: true
        // default: 'SCSS'
    }
];
exports.Q_ROUTE = [
    {
        name: "type",
        type: "checkbox",
        message: "Endpoint, Page, or Both?",
        choices: ["Endpoint", "Page"],
        // default: true
        validate: answer => {
            if (answer.length < 1)
                return "You must choose at least one option.";
            else
                return true;
        },
        default: "Endpoint"
    },
    {
        name: "name",
        type: "input",
        message: "Name of route? (leave blank for 'index.svelte')",
        validate: (input, answer) => {
            const regex = RegExp(/^[a-zA-Z0-9_-]+$/gm);
            // console.log(EXISTING_COMP)
            if (exports.EXISTING_ACTION?.includes(input))
                return "Action already exists!";
            if (!input || input.length == 0)
                return "You must put in a name!";
            if (!regex.test(input))
                return `Name can only contain characters [a-zA-Z]`;
            // if (input && input.charAt(0) == input.charAt(0).toUpperCase())
            // 	return true;
            return true;
            // else return 'The name must start with a capital letter!'
        }
    },
    {
        name: "lang",
        type: "confirm",
        message: "Typescript?",
        // choices: ['Yes', 'No']
        default: true
        // default: 'SCSS'
    },
    {
        name: "style",
        type: "confirm",
        message: "SCSS?",
        when: answers => {
            if (answers.type.includes("Page"))
                return true;
        }
    }
];
exports.MENU = [
    {
        name: "menu",
        message: "What do you want to generate?",
        type: "list",
        choices: ["Component", "Action", "Route"],
        default: "Component"
    }
];
exports.Q_COMPONENT = [
    {
        name: "name",
        type: "input",
        message: "Name for your component?",
        validate: (input, answer) => {
            const regex = RegExp(/^[a-zA-Z_]+$/gm);
            // console.log(EXISTING_COMP)
            if (exports.EXISTING_COMP?.includes(input))
                return "Component already exists!";
            if (!input || input.length == 0)
                return "You must put in a name!";
            if (!regex.test(input))
                return `Name can only contain characters [a-zA-Z]`;
            if (input && input.charAt(0) == input.charAt(0).toUpperCase())
                return true;
            else
                return "The name must start with a capital letter!";
        }
    },
    {
        name: "lang",
        type: "confirm",
        message: "Typescript?",
        // choices: ['Yes', 'No']
        default: true
        // default: 'SCSS'
    },
    {
        name: "style",
        type: "confirm",
        message: "SCSS?",
        default: true
        // choices: ['Yes', 'No']
        // default: 'SCSS'
    }
];
//# sourceMappingURL=vars.js.map