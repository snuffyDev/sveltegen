import { readdirSync, writeFileSync } from "fs";
import { homedir } from "os";
import path, { join, resolve, sep } from "path";
import readline from 'readline';
import util from 'util';
import { ansiEscapes } from "./ansi-escapes.mjs";
import { dim } from "./style.mjs";
export async function render(global?: boolean) {

    const stdout = process.stdout;
    const stdin = process.stdin;
    const rl = readline.createInterface({
        input: stdin, output: stdout, completer: (line: string) => {

            let lastIdxOf = line.lastIndexOf('/'), indexOf = line.indexOf('/');
            let currAddedDir = (indexOf ? line.substring(0, lastIdxOf + 1) : '');
            let currAddingDur = line.substr(lastIdxOf + 1);
            let path = resolve(currAddedDir);
            const completions = readdirSync(path);


            let hits = completions.filter((c) => c.indexOf(currAddingDur) === 0);
            let strike = [];
            if (hits.length === 1) strike.push(currAddedDir + hits[0] + '/');

            return (strike.length) ? [strike, line] : [hits.length ? hits : completions, line];
        }
    });

    rl.write("\n" + (global ? dim('[GLOBAL] ') : dim('[LOCAL] ')) + 'sveltegen Configuration -- Leave path blank if unneeded.\n\n');
    function question(input: string) {
        return new Promise<string>((resolve, reject) => {
            rl.question(input, resolve);
        });
    }
    const answer = (str: string) => typeof str === 'undefined' ? null : resolve(str);

    let config = {};
    const actionDir = await question('Path to actions directory?  ');
    const compDir = await question('Path to components directory?  ');
    const routeDir = await question('Path to routes directory?  ');
    config['actions'] = answer(actionDir);
    config['components'] = answer(compDir);
    config['routes'] = answer(routeDir);

    const result = JSON.stringify(config);
    rl.close();
    writeFileSync(resolve(global ? join(homedir(), '.sveltegen.json') : './.sveltegen.json'), result, { encoding: 'utf-8' });

}
