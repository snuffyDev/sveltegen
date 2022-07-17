import { copyFile, readdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve, sep } from "path";
import { finishHandlerMsg, Logger, removeComments, tsToJS } from "./helpers.mjs";;
import { ActionArgs, ComponentArgs, RouteArgs } from "./types.mjs";;
import { cp, forEach, getConfig, getTemplatePath, hasConfig, mkdirp, rimraf } from "./utils.mjs";;


const doCopy = (template: string, path: string, name: string, args: ActionArgs | ComponentArgs | RouteArgs) =>
    cp<string>(`${template}`, path, (newPath) => {
        newPath = newPath!.replaceAll("_name", name);
        if (!args.typescript) newPath = newPath.replace(".ts", ".js");
        //@ts-expect-error This works.
        if (!args?.scss) newPath = newPath.replace(".scss", ".css");
        return newPath;
    });

export function component(name: string, args: ComponentArgs = { scss: false, typescript: false }) {
    if (!hasConfig()) return;
    const segments = name.split(/\\\\|\//gm);
    const compName = segments.pop();

    const path = resolve(getConfig().components + sep + name);
    if (path === null) return Logger.err('`components` directory is not defined. Please run "sveltegen config" to specify a path.');
    mkdirp(path);

    const template = getTemplatePath("components");

    doCopy(template, path, compName, args);

    forEach(readdirSync(path), (_name) => {
        let newPath = join(path, _name);

        let file = readFileSync(newPath, { encoding: "utf-8" });
        if (!args.typescript) {
            file = tsToJS(file);
        }
        if (!args.scss) {
            file = file.replace(/scss/gm, "css");
        }
        file = file.replaceAll("_name", name);

        writeFileSync(newPath, file, { encoding: "utf-8" });
    });

    Logger.log(finishHandlerMsg(compName, path, 'component'));
}

export function routes(name: string, args: RouteArgs = { endpoint: false, page: false, scss: false, typescript: false }) {
    if (!hasConfig()) return;
    const segments = name.split(/\\\\|\//gm);
    const compName = segments.pop();

    const path = resolve(getConfig().routes + sep + name);
    if (path === null) return Logger.err('`routes` directory is not defined. Please run "sveltegen config" to specify a path.');
    mkdirp(path);

    const template = getTemplatePath("routes");

    doCopy(template, path, compName, args);

    readdirSync(path).forEach((_name) => {
        let newPath = join(path, _name);

        let file = readFileSync(newPath, { encoding: "utf-8" });
        if ((newPath.includes('.json') && !args.endpoint) || (newPath.endsWith('.svelte') && !args.page)) {
            rimraf(newPath);
            return;
        }
        if (!args.typescript) {
            file = tsToJS(file);
            file = file.replace(/\t\n+|(?<=>)|\n$/gm, '');
        } else if (args.typescript) {
            file = removeComments(file);

        }
        if (!args.scss) {
            newPath.replace('.scss', '.css');
            file = file.replace(/scss/gm, "css");
        }


        file = file.replaceAll("_name", name);

        writeFileSync(newPath, file, { encoding: "utf-8" });
    });

    Logger.log(finishHandlerMsg(compName, path, 'component'));
}
export function actions(name: string, args: ActionArgs) {
    if (!hasConfig()) return;
    const segments = name.split(/\\\\|\//gm);
    const compName = segments.pop();

    const path = resolve(getConfig().actions);
    if (path === null) return Logger.err('`actions` directory is not defined. Please run "sveltegen config" to specify a path.');

    mkdirp(path);
    const template = getTemplatePath("actions");

    doCopy(template, path, compName, args);

    /// Transform
    const newPath = join(path, compName);
    forEach(readdirSync(path), (_name) => {
        let _newPath = join(path, _name);
        let file = readFileSync(_newPath, { encoding: "utf-8" });

        if (!args.typescript) {
            file = tsToJS(file);
        }
        file = file.replaceAll("_name", name);
        writeFileSync(_newPath, file, { encoding: "utf-8" });
    });

    Logger.log(finishHandlerMsg(compName, newPath, 'action'));
}
