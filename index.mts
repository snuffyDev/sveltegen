#!/usr/bin/env node
import { render } from "./src/lib/utils/fs.mjs";
import { CLI } from './src/lib/cli.mjs';
import { actions, component, routes } from './src/handlers.mjs';
import { readFileSync } from 'fs';
import { notifyUpdate } from './src/lib/utils/updatenotify.mjs';
// console.log(process.env.NODE_ENV);
const pkg = readFileSync(new URL(process.env.NODE_ENV === "production" ? '../package.json' : './package.json', import.meta.url), { encoding: 'utf-8' });
const { version, name } = JSON.parse(pkg);

notifyUpdate(name, version);
const cli = new CLI('sveltegen', version);

cli.command('component', ['<name>'], { alias: 'c' }).describe('Creates a new component')
    .option('-s, --scss', 'Creates a new component using SCSS for styles')
    .option('-t, --typescript', 'Creates a new component using Typescript')
    .example('sveltegen c Button -t', 'creates a `Button` component with TS/CSS')
    .example('sveltegen component Article', 'creates an `Article` component with JS/CSS')
    .action(component);

cli.command('action', ['<name>'], { alias: 'a' }).describe('Creates a new action')
    .option('-t, --typescript', 'Creates a new component using Typescript')
    .action(actions);

cli.command('route', ['<name>'], { alias: 'r' }).describe('Creates a new route')
    .option('-t, --typescript', 'Creates a new route using TypeScript')
    .option('-p, --page', 'Creates a page-only route')
    .option('-e, --endpoint', 'Creates an endpoint-only route')
    .option('-s, --scss', "Adds SCSS for styles").action(routes);

cli.command('config', ["<action>"], { isDefault: true }).action((action, args) => {
    render(!!args?.global);
}).option('-g, --global', 'Configures Sveltegen globally').example;

cli.parse(process.argv.slice(2));
