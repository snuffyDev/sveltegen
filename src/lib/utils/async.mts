export type AnyCallback<T extends ErrorFirstCallback | Callback = ErrorFirstCallback | Callback> = T;
export type ErrorFirstCallback = (err: Error, callback: Callback) => ErrorFirstCallback | Callback | void;
export type Callback = (args: IArguments) => Callback | ErrorFirstCallback | void;
export function promisify<T extends Function & { promised?: boolean; } = Function & { promised?: boolean; }>(fn: T) {
    if (fn.promised) {
        return fn;
    }
    const promise: any = function (this: { Promise?: PromiseConstructor; }) {
        let last: number;
        for (last = arguments.length - 1; last >= 0; last--) {
            const arg = arguments[last];
            if (typeof arg === 'undefined') continue;
            if (typeof arg === 'function') {
                break;
            }
            return fn.apply(this, arguments);
        }
        let Ctor = Promise;
        const args = Array.prototype.slice.call(arguments, 0, last + 1);
        if (this && this.Promise) {
            Ctor = this.Promise;
        }

        return new Ctor<T>((resolve, reject) => {
            args.push((...args: any[]) => {
                const cbArgs = Array.prototype.slice.call(args);
                const error = cbArgs.shift();

                if (error) {
                    return reject(error);
                }
                if (cbArgs.length === 1) {
                    resolve(cbArgs[0]);
                }
                else {
                    resolve(cbArgs);
                }

            });
            fn.apply(this, args);

        });
    };
    promise.promised = true;
    return promise;
};
