export const black = (...args) => process.stdout.hasColors() ? '\u001b[30m' + args[0] + '\u001b[39m' : args[0];
export const bgBlack = (...args) => process.stdout.hasColors() ? '\u001b[40m' + args[0] + '\u001b[49m' : args[0];
export const red = (...args) => process.stdout.hasColors() ? '\u001b[31m' + args[0] + '\u001b[39m' : args[0];
export const bgRed = (...args) => process.stdout.hasColors() ? '\u001b[41m' + args[0] + '\u001b[49m' : args[0];
export const green = (...args) => process.stdout.hasColors() ? '\u001b[32m' + args[0] + '\u001b[39m' : args[0];
export const bgGreen = (...args) => process.stdout.hasColors() ? '\u001b[42m' + args[0] + '\u001b[49m' : args[0];
export const yellow = (...args) => process.stdout.hasColors() ? '\u001b[33m' + args[0] + '\u001b[39m' : args[0];
export const bgYellow = (...args) => process.stdout.hasColors() ? '\u001b[43m' + args[0] + '\u001b[49m' : args[0];
export const blue = (...args) => process.stdout.hasColors() ? '\u001b[34m' + args[0] + '\u001b[39m' : args[0];
export const bgBlue = (...args) => process.stdout.hasColors() ? '\u001b[44m' + args[0] + '\u001b[49m' : args[0];
export const magenta = (...args) => process.stdout.hasColors() ? '\u001b[35m' + args[0] + '\u001b[39m' : args[0];
export const bgMagenta = (...args) => process.stdout.hasColors() ? '\u001b[45m' + args[0] + '\u001b[49m' : args[0];
export const cyan = (...args) => process.stdout.hasColors() ? '\u001b[36m' + args[0] + '\u001b[39m' : args[0];
export const bgCyan = (...args) => process.stdout.hasColors() ? '\u001b[46m' + args[0] + '\u001b[49m' : args[0];
export const white = (...args) => process.stdout.hasColors() ? '\u001b[37m' + args[0] + '\u001b[39m' : args[0];
export const bgWhite = (...args) => process.stdout.hasColors() ? '\u001b[47m' + args[0] + '\u001b[49m' : args[0];
export const gray = (...args) => process.stdout.hasColors() ? '\u001b[90m' + args[0] + '\u001b[39m' : args[0];
export const bgGray = (...args) => process.stdout.hasColors() ? '\u001b[100m' + args[0] + '\u001b[49m' : args[0];
export const grey = (...args) => process.stdout.hasColors() ? '\u001b[90m' + args[0] + '\u001b[39m' : args[0];
export const bgGrey = (...args) => process.stdout.hasColors() ? '\u001b[100m' + args[0] + '\u001b[49m' : args[0];
export const brightRed = (...args) => process.stdout.hasColors() ? '\u001b[91m' + args[0] + '\u001b[39m' : args[0];
export const bgBrightRed = (...args) => process.stdout.hasColors() ? '\u001b[101m' + args[0] + '\u001b[49m' : args[0];
export const brightGreen = (...args) => process.stdout.hasColors() ? '\u001b[92m' + args[0] + '\u001b[39m' : args[0];
export const bgBrightGreen = (...args) => process.stdout.hasColors() ? '\u001b[102m' + args[0] + '\u001b[49m' : args[0];
export const brightYellow = (...args) => process.stdout.hasColors() ? '\u001b[93m' + args[0] + '\u001b[39m' : args[0];
export const bgBrightYellow = (...args) => process.stdout.hasColors() ? '\u001b[103m' + args[0] + '\u001b[49m' : args[0];
export const brightBlue = (...args) => process.stdout.hasColors() ? '\u001b[94m' + args[0] + '\u001b[39m' : args[0];
export const bgBrightBlue = (...args) => process.stdout.hasColors() ? '\u001b[104m' + args[0] + '\u001b[49m' : args[0];
export const brightMagenta = (...args) => process.stdout.hasColors() ? '\u001b[95m' + args[0] + '\u001b[39m' : args[0];
export const bgBrightMagenta = (...args) => process.stdout.hasColors() ? '\u001b[105m' + args[0] + '\u001b[49m' : args[0];
export const brightCyan = (...args) => process.stdout.hasColors() ? '\u001b[96m' + args[0] + '\u001b[39m' : args[0];
export const bgBrightCyan = (...args) => process.stdout.hasColors() ? '\u001b[106m' + args[0] + '\u001b[49m' : args[0];
export const brightWhite = (...args) => process.stdout.hasColors() ? '\u001b[97m' + args[0] + '\u001b[39m' : args[0];
export const bgBrightWhite = (...args) => process.stdout.hasColors() ? '\u001b[107m' + args[0] + '\u001b[49m' : args[0];
export const bold = (...args) => process.stdout.hasColors() ? '\u001b[1m' + args[0] + '\u001b[22m' : args[0];
export const dim = (...args) => process.stdout.hasColors() ? '\u001b[2m' + args[0] + '\u001b[22m' : args[0];
export const italic = (...args) => process.stdout.hasColors() ? '\u001b[3m' + args[0] + '\u001b[23m' : args[0];
export const underline = (...args) => process.stdout.hasColors() ? '\u001b[4m' + args[0] + '\u001b[24m' : args[0];
export const inverse = (...args) => process.stdout.hasColors() ? '\u001b[7m' + args[0] + '\u001b[27m' : args[0];
export const hidden = (...args) => process.stdout.hasColors() ? '\u001b[8m' + args[0] + '\u001b[28m' : args[0];
export const strikethrough = (...args) => process.stdout.hasColors() ? '\u001b[9m' + args[0] + '\u001b[29m' : args[0];