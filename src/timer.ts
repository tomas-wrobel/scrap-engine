class Timer {
    now = Date.now();
    listeners: [number, number, () => void][] = [];

    reset() {
        this.now = Date.now();

        for (const [id, time, callback] of this.listeners) {
            window.clearTimeout(id);
            window.setTimeout(callback, time);
        }
    }

    whenElapsed(time: number, callback: () => Promise<void>) {
        const handler = () => {
            this.listeners = this.listeners.filter(
                ([,,callback]) => callback !== handler
            );
            callback();
        };

        const id = window.setTimeout(handler, time);
        this.listeners.push([id, time, handler]);
    }
}

export default Timer;