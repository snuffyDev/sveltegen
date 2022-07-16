import { Logger } from "../../helpers.mjs";
import { ParsedOption, parseOption } from "./utils.mjs";
import * as styles from '../utils/style.mjs';

export interface ICommand {

    name: string;

    flags: string[];
    description: string;
    value?: string | boolean;
}
export type Chain<T extends string = string> = InstanceType<typeof Command>;

const REG_FLAGS = /,[\s]/g;
type Option = ParsedOption & { description?: string, defaultValue?: string | boolean | undefined; };
export class Command<T extends Record<string, Option> = Record<string, Option>, K extends keyof T = keyof T & string> implements ICommand {
    private _value: string | boolean;
    private _flags: string[] = [];
    private _description: string = "";
    private _action: ((name: string, args?: Record<string, boolean>, opts?: Record<string, boolean>) => void | Promise<void>);
    private _example: string = '';
    private _options: Record<string, Option> = {};
    private _helpText: string = '';
    private _examples: [string, string][] = [];
    /** @internal */
    public get flags() {
        return this._flags;
    }
    /** @internal */
    public get value() {
        return this._value;
    }
    /** @internal */
    public get description() {
        return this._description;
    }

    /** @internal */
    public get options() {
        return this._options;
    }
    constructor(public name: string, public args: string[], private opts?: { isDefault?: boolean; alias?: string | string[]; }) {
        this._options = {} as T;
        this.option('-?, --help', 'Gets help for this option');
    }

    /**
     * Creates a new option for the current command
     *
     * @example
     * command.option("-g, --global", "Installs an NPM module globally");
     */
    public option(flag: string, description?: string, value?: string | boolean | undefined) {
        const parsed = parseOption(flag);
        this._options[parsed.name] = { ...parsed, description, defaultValue: value };
        this._helpText += `${flag.padEnd(48, ' ')} ${description ? description : ''}\n `;
        return this;

    }

    public action(fn: (name?: string | boolean, args?: Record<string, boolean>, opts?: Record<string, boolean>) => Promise<void> | void): Chain<'action'> {
        this._action = fn;
        return this as Chain<'action'>;
    }
    public describe(str: string) {
        if (typeof str !== 'string') throw new TypeError('Provided description is not a valid string!');
        this._description = str;
        return this;
    }

    public example(snippet: string, description: string = '') {
        if (!snippet || typeof snippet !== 'string') {
            const E_TYPE = new Error(!snippet ? 'Argument `snippet` not found. `snippet` must be a valid string.' : 'Argument `snippet` must be a valid string.');
            throw E_TYPE;
        }
        this._example += "  " + snippet.padEnd(48, ' ') + description + '\n';
        return this;
    }
    public getHelp() {
        const header = `${(this.name + ' ') + (this.args[0])} [options]\n\n`;
        const options = this._helpText;
        const examples = this._example;
        return {
            header,
            options,
            examples
        };

    }
    public run(argv: string[]) {
        const results = {};
        const cmd = argv[0];
        let arg;

        while (arg = argv.shift()) {
            for (const key in this._options) {
                const option = this._options[key];

                const isLong = arg === option.longNotation;
                const isShort = arg === option.shortNotation;

                if (isLong || isShort) {
                    results[key] = true;
                }
            }
        }
        if (results['help']) {
            const header = `${(this.name + ' ') + (this.args[0])} [options]\n\n`;
            const options = this._helpText;
            // console.log(this._example);
            return {
                header,
                options,
                examples: this._example
            };
        }
        try {
            this._action(cmd, results, {});
        } catch (error) {
            Logger.err(error);
        }
    }
}