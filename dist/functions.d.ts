export declare function fn(): {
    main: () => Promise<void>;
    createConfig: () => Promise<void>;
    getExistingComponents: () => boolean;
    hasConfig(): boolean;
    copyFiles(template: any, [newPath, style, lang]: [any, any, any]): Promise<void>;
};
