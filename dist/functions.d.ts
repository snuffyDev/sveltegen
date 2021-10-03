export declare function fn(): {
    component: () => Promise<void>;
    route: () => Promise<void>;
    action: () => Promise<void>;
    createConfig: () => Promise<void>;
    menu: () => void;
    getExistingComponents: () => void;
    hasConfig(): boolean;
    copyFiles(template: any, [newPath, style, lang, type, file]: [
        string,
        boolean,
        boolean,
        number,
        boolean?
    ]): Promise<void>;
};
