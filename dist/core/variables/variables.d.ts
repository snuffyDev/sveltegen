import * as inquirer from "inquirer";
export declare let EXISTING_COMP: string[];
export declare let EXISTING_ACTION: string[];
export declare let EXISTING_ROUTE: string[];
export declare let PATHS: {
    component?: string;
    action?: string;
    route?: string;
};
export declare const CONFIG: string;
export declare const CWD: string;
export declare const CONFIG_NAME = ".sveltegen.json";
export declare const Q_ACTION: inquirer.QuestionCollection;
export declare const Q_ROUTE: inquirer.QuestionCollection;
export declare const MENU: inquirer.QuestionCollection;
export declare const Q_COMPONENT: inquirer.QuestionCollection;
