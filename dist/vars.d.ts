import * as inquirer from "inquirer";
export declare let EXISTING_COMP: string[];
export declare let EXISTING_ACTION: string[];
export declare let EXISTING_ROUTE: string[];
export declare let CONFIG_PATH: {
    component?: string;
    action?: string;
    route?: string;
};
export declare function Factory(components?: any, config?: any, type?: number): void;
export declare const CWD: string;
export declare const CONFIG_NAME = ".sveltegen.json";
export declare const Q_ACTION: inquirer.QuestionCollection;
export declare const Q_ROUTE: inquirer.QuestionCollection;
export declare const MENU: inquirer.QuestionCollection;
export declare const Q_COMPONENT: inquirer.QuestionCollection;
