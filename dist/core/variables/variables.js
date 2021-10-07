"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Q_COMPONENT = exports.MENU = exports.Q_ROUTE = exports.Q_ACTION = exports.CONFIG_NAME = exports.CWD = exports.CONFIG = exports.PATHS = exports.EXISTING_ROUTE = exports.EXISTING_ACTION = exports.EXISTING_COMP = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
exports.CONFIG = path_1.default.join(process.cwd(), ".sveltegen.json");
exports.CWD = process.cwd();
exports.CONFIG_NAME = ".sveltegen.json";
exports.Q_ACTION = [
    {
        name: "name",
        type: "input",
        message: "Name for your action?",
        validate: (input, answer) => {
            const regex = RegExp(/^[a-zA-Z0-9_-]+$/gm);
            if (exports.EXISTING_ACTION?.includes(input))
                return "Action already exists!";
            if (!input || input.length == 0)
                return "You must put in a name!";
            if (!regex.test(input))
                return `Name can only contain characters [a-zA-Z]`;
            return true;
        }
    },
    {
        name: "lang",
        type: "confirm",
        message: "Typescript?",
        default: true
    }
];
exports.Q_ROUTE = [
    {
        name: "type",
        type: "checkbox",
        message: "Endpoint, Page, or Both?",
        choices: ["Endpoint", "Page"],
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
        message: "Name of route?",
        validate: (input, answer) => {
            const regex = RegExp(/^[a-zA-Z0-9_-]+$/gm);
            if (exports.EXISTING_ROUTE?.includes(input))
                return "Route already exists!";
            if (!input || input.length == 0)
                return "You must put in a name!";
            if (!regex.test(input))
                return `Name can only contain characters [a-zA-Z]`;
            return true;
        }
    },
    {
        name: "lang",
        type: "confirm",
        message: "Typescript?",
        default: true
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
        default: true
    },
    {
        name: "style",
        type: "confirm",
        message: "SCSS?",
        default: true
    }
];
//# sourceMappingURL=variables.js.map