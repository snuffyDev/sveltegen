import { fetch } from "./fetch.mjs";
import { bgBrightBlue, brightWhite, dim } from "./style.mjs";

const PIECES = {
    "topLeft": "┏",
    "top": "━",
    "topRight": "┓",
    "right": "┃",
    "bottomRight": "┛",
    "bottom": "━",
    "bottomLeft": "┗",
    "left": "┃"
};
const outdated = (old_ver: string, new_ver: string) => dim`> ` + `Installed: ${old_ver}\n` + dim`> ` + `Latest: ${new_ver}\n`;
const base_msg = (name: string, old_ver: string, ver: string) => dim`\n> ` + brightWhite(bgBrightBlue`UPDATE AVAILABLE!` + ` Run \`npm i -g ${name}@latest\` to install ${name} ${ver}\n` + old_ver);

export async function notifyUpdate(pkg_name: string, version: string) {
    const request = await fetch(`https://registry.npmjs.org/${pkg_name}/latest`, 'json', { method: 'GET' });
    const latest_ver = (request as any)?.version || null;
    if (latest_ver === null) throw new Error('An error has occured when checking for the latest package version.');
    const msg = () => console.log(base_msg(pkg_name, outdated(version, latest_ver), latest_ver));
    if (version < latest_ver) {
        process.on('SIGINT', () => msg());
        process.on('exit', () => msg());
        process.on('uncaughtException', () => msg());
    }
    return;
}