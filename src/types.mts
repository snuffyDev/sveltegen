export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;

export interface ComponentArgs {
    typescript?: Maybe<boolean>;
    scss?: Maybe<boolean>;
}

export interface ActionArgs {
    typescript?: Maybe<boolean>;
}

export interface RouteArgs {
    typescript?: Maybe<boolean>;
    scss?: Maybe<boolean>;
    page?: Maybe<boolean>;
    endpoint?: Maybe<boolean>;
}

export interface Config {
    actions: string;
    components: string;
    routes: string;
}