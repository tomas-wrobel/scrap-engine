import type Entity from "./entity";
import {StopError} from "./utils";

/**
 * This decorator is used to decorate methods of the Entity class,
 * which should be used directly by the user. The execution of the
 * method is delayed by 33 ms, just like in the Scratch project.
 * @param method The method to decorate.
 * @param _context The context of the method.
 * @returns Decorated method.
 */
export function paced<K extends string, A extends any[], T, E extends Entity & Record<K, (...args: A) => Promise<T>>>(target: E, key: K, descriptor: TypedPropertyDescriptor<(this: E, ...args: A) => Promise<T>>) {
    const fn = target[key];

    descriptor.value = async function (this: E, ...args: A) {
        return new Promise<T>((resolve, reject) => {
            const controller = new AbortController();

            const timeout = setTimeout(
                () => {
                    controller.abort();
                    resolve(fn.apply(this, args));
                },
                this.pace
            );

            window.addEventListener(
                "message",
                e => {
                    if (e.data === "STOP") {
                        clearTimeout(timeout);
                        reject(new StopError());
                    }
                },
                {signal: controller.signal}
            );
        });
    };
}

const STOP = Symbol("STOP");

/**
 * This decorator is used to decorate methods of the Entity class,
 * which should be used directly by the user.
 * @param method The method to decorate.
 * @param _context The context of the method.
 * @returns Decorated method.
 */
export function method<K extends string, A extends any[], T, E extends Entity & Record<K, (...args: A) => Promise<T>>>(target: E, key: K, descriptor: TypedPropertyDescriptor<(this: E, ...args: A) => Promise<T>>) {
    const fn = target[key];

    descriptor.value = async function (this: E, ...args: A) {
        const controller = new AbortController();

        const result = await Promise.race([
            fn.apply(this, args),
            new Promise<typeof STOP>(
                resolve => window.addEventListener(
                    "message",
                    e => {
                        if (e.data === "STOP") {
                            resolve(STOP);
                        }
                    },
                    {signal: controller.signal}
                )
            )
        ]);

        controller.abort();

        if (result === STOP) {
            throw new StopError();
        }

        return result;
    };
}