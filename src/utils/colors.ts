import chalk from "chalk";

export default {
	dim: (msg: string) => chalk.dim(msg),
	red: (msg: string) => chalk.redBright(msg)
};
