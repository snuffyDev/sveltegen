const RE_SHORT = /^-[a-z]$/i;
const RE_LONG = /^--[a-z]{2,}/i;
const RE_ALL = /^(-[a-zA-Z]|--\D{1}[\w-]+)/;

const OPTION_TYPE = {
    optional: 0,
    required: 1,
    no_value: 2,

} as const;
export type ParsedOption = {
    /**
     * Value type
     *
     * /\/ 0 = optional, 1 = required, 2 = no value */
    type: 0 | 1 | 2;
    name: string,
    longNotation: string,
    shortNotation: string,
    longName: string,
    shortName: string,
    allNames: string[],
    allNotations: string[],
    args?: string | string[];
    rawArgs?: string | string[];
};

export function isShortFlag(flag: string): boolean {
    return RE_SHORT.test(flag);
}

export function isLongFlag(flag: string): boolean {
    return RE_LONG.test(flag);
}

export function extractFlagName(str: string): string {
    return str.replace(/([[\]<>]+)/g, "");
}

export function parseOption(str: string) {
    const template: ParsedOption = {
        name: '',
        longNotation: '',
        shortNotation: '',
        type: 0,
        allNames: [],
        allNotations: [],
        rawArgs: [],
        args: [],
        longName: '',
        shortName: ''
    };
    const result: ParsedOption = str.split(/[\s\t,]+/).reduce((acc, value) => {
        if (isLongFlag(value)) {
            acc.longNotation = value;
            acc.longName = extractFlagName(value.slice(2));
            acc.allNames.push(acc.longName);
            acc.allNotations.push(value);
        }
        if (isShortFlag(value)) {
            acc.shortNotation = value;
            acc.shortName = value.slice(1);
            acc.allNames.push(acc.shortName);
            acc.allNotations.push(value);
        }
        if (value[0] === '[') {
            acc.type = 0;
            (acc.rawArgs as string[]).push(extractFlagName(value));

        } else if (value[0] === '<') {
            acc.type = 1;
            (acc.rawArgs as string[]).push(extractFlagName(value));
        } else {
            acc.type = 2;
        }
        return acc;
    }, template);

    result.name = result.longName || result.shortName;

    return Object.assign({}, { ...result });

}