export declare function fn(): {
    createConfig: () => Promise<boolean> | Promise<void>;
    getExistingComponents: () => boolean;
    hasConfig(): boolean;
    copyFiles(template: any, newPath: any): Promise<void>;
};
