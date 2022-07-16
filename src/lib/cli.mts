import { Command } from "./Command/index.mjs";

import * as styles from './utils/style.mjs';

export class CLI {
    private _commands: Record<string, Command> = {};
    private _aliases: Record<string, Command> = {};
    private _defaultCmd: Command;


    public help() {
        const header = `\n${styles.bold((styles.dim(this.name + ' ' + (this.version ? `v${this.version}` : ' '))))}\n\n`;

        const usage = `\s${this.name} `;
        let output = '';
        const cmdKeys = Object.keys(this._commands);

        const cmds = cmdKeys.forEach(key => this._commands[key] && (output += `\t${this._commands[key]?.name?.padEnd(16, ' ')}${this._commands[key]?.args[0]?.padEnd(8, ' ')}${this._commands[key]?.description}\n`));
        const section = ` ${styles.dim`Commands:`}\n`;
        const footer = `\n Need help? To get help for a command run:\n\t${this.name} [command] --help\n`;
        process.stdout.write(header + section + output + footer + '\n');
    }

    constructor(public readonly name: string, public readonly version?: string) {
        this._commands['help'] = new Command('help', ['<cmd>'], { alias: 'h' }).action((name, args) => {
            if (!name) return this.help();
            const allComms = Object.assign({}, this._commands, this._aliases);

            const help = allComms[name as string].getHelp();
            const header = `\n${styles.bold((styles.dim(this.name + ' ' + (this.version ? `v${this.version}` : ' '))))}\n\n`;

            console.log(header + ` ${(`Usage: ` + this.name)} ` + help.header, styles.dim('Options: \n'), help.options + '\n\n');

        });
        this._commands['help'].describe('Provides help for a specific command');
    }

    public command(name: string, args: string[] = [], options?: { alias?: string, isDefault?: boolean; }) {
        this._commands[name] = new Command(name, args, options);
        if (options?.alias) this._aliases[options.alias] = this._commands[name];
        if (options?.isDefault) this._defaultCmd = this._commands[name];
        return this._commands[name];
    }

    public parse(argv: string[]) {
        const allComms = Object.assign({}, this._commands, this._aliases);
        const commandNames = new Set(Object.keys(allComms));

        const sorted = argv.sort((a, b) => {
            const itemA = a.startsWith('-') as unknown as number;
            const itemB = b.startsWith('-') as unknown as number;
            if ((itemA) < (itemB)) {
                return -1;
            }
            if (itemB < itemA) {
                return 1;
            }
            if (itemA === itemB) return 0;
        });

        const cmdIdx = sorted.findIndex(arg => commandNames.has(arg));
        const commandName = argv[cmdIdx];
        const command = allComms[commandName];

        if (cmdIdx < 0) { this.help(); return; };

        /** If anything is returned from the command's action,
         *  it means that `--help` was detected!
         **/
        const result = command.run(sorted.slice(1));

        if (result) {
            const header = `\n${styles.bold((styles.dim(this.name + ' ' + (this.version ? `v${this.version}` : ' '))))}\n\n`;

            console.log(header + ` ${(`Usage: ` + this.name)} ` + result.header, styles.dim('Options: \n'), result.options + '\n' + (result.examples ? styles.dim('\nExamples: \n') + result.examples : "") + '\n');
        }
    }

    public usage() {

    }
}

