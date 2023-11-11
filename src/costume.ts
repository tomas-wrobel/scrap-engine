export default class Costume {
    width = 0;
    height = 0;

    constructor(readonly src: string) {}

    async load() {
        const img = new Image();
        img.src = this.src;

        if (!img.complete) {
            await new Promise(resolve => img.addEventListener("load", resolve, {once: true}));
        }

        this.width = img.width;
        this.height = img.height;
    }
}