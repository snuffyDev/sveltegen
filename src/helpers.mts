
import * as styles from './lib/utils/style.mjs';

export const finishHandlerMsg = (name: string, path: string, type: "route" | 'component' | 'action') => `${styles.inverse(styles.brightGreen('Finished')) + ' generating ' + `${type} \`${name}\`!`}\n\nOutput Path: ${styles.underline(path)}`;

export const RE_TS1 = /[\t\s\n]*\/{2,3}@?.*|import\s(type\s)?\{.*}\s.*;|\slang="ts"|(?:\:\s.[a-zA-Z\.<>]+)/gm;
export function tsToJS(src: string) {

    return src.replace(RE_TS1, '');
}
export const removeComments = (src: string) => src.replace(/[\t\s\n]*?\/{2,3}?@?.+$/gm, '');
export const Logger = {
    log(...args: any[]) {
        if (!args.length) return;
        for (let i = -1; ++i < args.length;) {
            console.log(args[i]);
        }

    },
    err(...args: any[]) {
        if (!args.length) return;
        for (let i = -1; ++i < args.length;) {
            console.error(args[i]);
        }
    },
    warn(...args: any[]) {
        if (!args.length) return;
        for (let i = -1; ++i < args.length;) {
            console.warn(args[i]);
        }
    },
    info(...args: any[]) {
        if (!args.length) return;
        for (let i = -1; ++i < args.length;) {
            console.info(args[i]);
        }
    },
};