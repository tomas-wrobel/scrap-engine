import {event, method} from "./decorators";
import Entity from "./entity";
import type Sprite from "./sprite";
import {abort} from "./utils";

export default class Stage extends Entity {
    element = document.createElement("div");
    flag = document.createElement("div");
    sprites: Sprite[] = [];

    width = 480;
    height = 360;

    keys: string[] = [];
    mouseDown = false;
    mouseX = 0;
    mouseY = 0;

    ctx = document.createElement("canvas").getContext("2d")!;
    pen = document.createElement("canvas").getContext("2d")!;

    constructor(images: Entity.Assets, sounds: Entity.Assets, current = 0) {
        super(images, sounds, current);

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.position = "absolute";
        this.element.style.overflow = "hidden";
        this.element.style.boxSizing = "border-box";

        const flagSize = 130;
        this.flag.style.width = `${flagSize}px`;
        this.flag.style.height = `${flagSize}px`;
        this.flag.style.position = "absolute";
        this.flag.style.left = this.flag.style.top = "50%";
        this.flag.style.transform = `translate(-${flagSize / 2}px, -${flagSize / 2}px)`;

        this.flag.className = "blocklike-flag";
        this.flag.innerHTML = "&#9873;";

        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;

        this.pen.canvas.width = this.width;
        this.pen.canvas.height = this.height;
        this.pen.canvas.style.pointerEvents = "none";

        this.pen.canvas.style.position = "absolute";
        this.ctx.canvas.style.position = "absolute";

        const flag = document.createElement("div");
        flag.style.width = `${this.width}px`;
        flag.style.height = `${this.height}px`;
        flag.style.position = "absolute";
        flag.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        flag.style.zIndex = "10000";
        flag.style.display = "none";
        flag.appendChild(this.flag);

        this.element.appendChild(this.ctx.canvas);
        this.element.appendChild(this.pen.canvas);
        this.element.appendChild(flag);

        document.body.appendChild(this.element);

        // Events
        window.addEventListener(
            "keydown",
            e => {
                if (!this.keys.includes(e.key)) {
                    this.keys.push(e.key);
                }
            },
            {signal: abort.signal}
        );

        window.addEventListener(
            "keyup",
            e => {
                this.keys = this.keys.filter(key => key !== e.key);
            },
            {signal: abort.signal}
        );

        this.element.addEventListener(
            "mousemove",
            e => {
                this.mouseX = e.clientX - this.width / 2;
                this.mouseY = e.clientY - this.height / 2;
            },
            {signal: abort.signal}
        );

        this.element.addEventListener(
            "mousedown",
            () => {
                this.mouseDown = true;
            },
            {signal: abort.signal}
        );

        this.element.addEventListener(
            "mouseup",
            () => {
                this.mouseDown = false;
            },
            {signal: abort.signal}
        );

        this.update();
    }

    update() {
        const src = this.images[this.current];
        const img = new Image();

        img.onload = () => {
            this.ctx.filter = this.toFilter();
            this.ctx.drawImage(img, 0, 0, this.width, this.height);
        };

        img.src = src;
    }

    toggleFlag(hasFlag: boolean) {
        this.flag.parentElement!.style.display = hasFlag ? "block" : "none";
    }

    @event
    async whenFlag(fn: Entity.Callback) {
        this.toggleFlag(true);

        this.flag.addEventListener(
            "click",
            () => {
                fn.call(this);
                this.toggleFlag(false);
            },
            {once: true, signal: abort.signal}
        );
    }

    switchBackdropTo(name: string) {
        this.current = name;
        this.update();
    }

    nextBackdrop() {
        const backdrops = Object.keys(this.images);
        const index = backdrops.indexOf(this.current);
        const next = backdrops[index + 1] ?? backdrops[0];

        this.switchBackdropTo(next);
    }

    private refreshSprites() {
        this.sprites.forEach((sprite, i) => {
            sprite.element.style.zIndex = `${i}`;
            sprite.update();
        });
    }

    sendSpriteBackwards(sprite: Sprite) {
        const index = this.sprites.indexOf(sprite);
        if (index > 0) {
            this.sprites[index] = this.sprites[index - 1]; // move one up
            this.sprites[index - 1] = sprite; // me subject down
        }
        this.refreshSprites();
    }

    sendSpriteForward(sprite: Sprite) {
        const index = this.sprites.indexOf(sprite);
        if (index < this.sprites.length - 1 && index !== -1) {
            this.sprites[index] = this.sprites[index + 1]; // move one down
            this.sprites[index + 1] = sprite; // me subject up
        }
        this.refreshSprites();
    }

    sendSpriteToFront(sprite: Sprite) {
        const index = this.sprites.indexOf(sprite);
        if (index !== -1) {
            this.sprites.splice(index, 1); // remove
            this.sprites.push(sprite); // add to end
        }
        this.refreshSprites();
    }

    sendSpriteToBack(sprite: Sprite) {
        const index = this.sprites.indexOf(sprite);
        if (index !== -1) {
            this.sprites.splice(index, 1); // remove
            this.sprites.unshift(sprite); // add to beginning
        }
        this.refreshSprites();
    }

    @method
    async isKeyPressed(key: string) {
        return this.keys.includes(key);
    }

    get backdrop() {
        return this.current;
    }
}