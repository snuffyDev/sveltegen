declare const _default: {
    route: (...args: any[]) => void | Promise<void>;
    component: (...args: any[]) => void | Promise<void>;
    action: (...args: any[]) => void | Promise<void>;
    createConfig: () => Promise<void>;
    menu: () => void;
    getExistingComponents: () => void;
    hasConfig(): boolean;
};
export default _default;
