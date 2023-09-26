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