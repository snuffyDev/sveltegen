import sade from "sade";

import fn from "../functions";
import * as cfg from "../utils/config";
const program = sade("sveltegen").version("");

program
	.command("config")
	.describe("change the output directory")
	.action(async () => {
		return await cfg.createConfig();
	});

program
	.command("menu")
	.describe("display a menu GUI")

	.action(async () => {
		const config = await cfg.loadConfig();
		if (config) fn.menu();
	});

program
	.command("route <name>", "generate a new route", { alias: "r" })
	.option("-t, --ts", "Add TypeScript")
	.option("-s, --scss", "Add SCSS")
	.option("-e, --endpoint", "Endpoint only (index.json.ts)")
	.option("-p, --page", "Page only (index.svelte)")
	.action(async (name, opts) => {
		try {
			await cfg.loadConfig();
			let args = {
				name,
				ts: opts.ts ?? false,
				scss: opts.scss ?? false,
				endpoint: opts.endpoint,
				page: opts.page
			};
			fn.route(args);
		} catch (err) {
			console.error(err);
		}
	});
program
	.command("action <name>", "generate a new action", { alias: "a" })
	.option("-t, --ts", "Add TypeScript")
	.action(async (name, opts) => {
		try {
			await cfg.loadConfig();

			let args = {
				name,
				ts: opts.ts ?? false
			};
			fn.action(args);
		} catch (err) {
			console.error(err);
		}
	});

program
	.command("component <name>", "generate a new component", { alias: "c" })
	.option("-t, --ts", "Add TypeScript")
	.option("-s, --scss", "Add SCSS")
	.option(
		"-l, --lib",
		"Library Mode: exports component from $lib/components folder"
	)
	.action(async (name, opts) => {
		try {
			await cfg.loadConfig();
			let args = {
				name,
				ts: opts.ts ?? false,
				scss: opts.scss ?? false,
				lib: opts.lib ?? false
			};
			fn.component(args);
		} catch (err) {
			console.error(err);
		}
	});
program.parse(process.argv, { unknown: arg => `Unknown option: ${arg}` });
