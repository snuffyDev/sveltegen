/// https://github.com/sveltejs/kit/blob/master/packages/create-svelte/utils.js

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync, statSync } from "fs";
import { dirname, join, resolve } from "path";
import { Config } from "./types.mjs";

export function mkdirp(path: string) {
    try {
        mkdirSync(path, { recursive: true });
    } catch (err) {
        if (err.code === 'EEXIST') return;
        throw err;
    }
}

export function rimraf(path: string) {
    (rmSync || rmdirSync)(path, { recursive: true, force: true });
}

function identity<T = any>(x: T) {
    return x;
}
export function cp<T extends string = string>(from: string, to: string, rename = identity<T>) {
    if (!existsSync(from)) return;

    const stats = statSync(from);
    if (stats.isDirectory()) {
        readdirSync(from).forEach((file) => {
            cp(join(from, file), join(to, rename(file as T)));
        });
    }
    else {
        mkdirp(dirname(to));
        copyFileSync(from, to);

    }
}

export const getTemplatePath = <T extends keyof Config = keyof Config>(kind: T) => {
    return resolve('./templates/' + kind);
};
const CONFIG_PATH = resolve('./.sveltegen.json');
export const hasConfig = () => existsSync(CONFIG_PATH);
export const getConfig = () => { if (hasConfig()) return JSON.parse(readFileSync(CONFIG_PATH) as unknown as string) as Config; };


export type VoidCallback<T> = (item: T, index: number, array: ArrayLike<T>) => void;
export function forEach<T>(array: ArrayLike<T>, cb: VoidCallback<T>): void {
    const len = array.length;
    let idx = -1;
    while (++idx < len) {
        cb(array[idx], idx, array);
    }
    idx = null;
}