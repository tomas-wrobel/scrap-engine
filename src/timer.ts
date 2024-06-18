class Timer {
    now = Date.now();
    listeners: [number, number, () => void][] = [];

    reset() {
        this.now = Date.now();

        for (const data of this.listeners) {
            clearTimeout(data[0]);
            data[0] = setTimeout(
                data[2],
                data[1] - (Date.now() - this.now)
            );
        }
    }

    whenElapsed(time: number, callback: () => Promise<void>) {
        this.listeners.push([
            setTimeout(
                callback, 
                time - (Date.now() - this.now)
            ), 
            time, callback
        ]);
    }
}

export default Timer;