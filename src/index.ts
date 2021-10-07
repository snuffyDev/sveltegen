#!/usr/bin/env node
import chalk from "chalk";
import { loadConfig } from "./utils/config";

async function main() {
	console.clear();
	console.log(
		`${chalk.bold.white(`Sveltegen CLI`)}\n${chalk.redBright.italic.underline(
			"Warning: This CLI is still experimental.\n"
		)}`
	);
	const config = await loadConfig();
	if (config) {
		await import("./core/cli");
	}
}
main();
