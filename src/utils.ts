export function stop() {
    window.postMessage("STOP", "*");
}

export const isTurbo = frameElement?.getAttribute("data-mode") === "turbo";

export class StopError extends Error {
    constructor() {
        super("The project has been stopped.");
        this.name = "Scrap.StopError";
    }
}

export const abort = new AbortController();

window.addEventListener("message", e => {
    if (e.data === "STOP") {
        abort.abort();
    }
});

/**
 * This is a loop guard function. It is injected 
 * by Scrap IDE to prevent infinite loops.
 * @param resolve Promise resolve function.
 * @param reject Promise reject function.
 */
export function loop(resolve: VoidFunction, reject: (reason: Error) => void) {
    if (abort.signal.aborted) {
        reject(new StopError());
    } else {
        setTimeout(resolve);
    }
}