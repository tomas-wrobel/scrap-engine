export function stop() {
    window.postMessage("STOP", "*");
}

export const isTurbo = frameElement?.getAttribute("data-mode") === "turbo";

export class StopError extends Error {
    constructor() {
        super("The project was stopped.");
    }
}