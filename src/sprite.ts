import Costume from "./costume";
import Entity from "./entity";
import type Stage from "./stage";
import TextUI from "./textui";
import {event, method, paced} from "./decorators";
import {StopError} from "./utils";
import {target} from "./form";

export default class Sprite extends Entity {
    element = document.createElement("div");
    costumes = new Map<string, Costume>();
    img = new Image();
    stage!: Stage;

    onload?: Entity.Callback;
    done = false;

    id = this.generateID();

    x = 0;
    y = 0;
    direction = 90;
    visible = true;
    size = 100;
    rotationStyle: 0 | 1 | 2 = 0;

    // Pen
    isPenDown = false;
    penSize = 1;
    penColor = "#222222";

    textUi?: TextUI;

    constructor(images: Entity.Assets, readonly sounds: Entity.Assets, current = 0) {
        super(images, sounds, current);
        this.img.src = this.images[this.current];

        for (const key in this.images) {
            this.costumes.set(key, new Costume(this.images[key]));
        }

        this.element.style.transformOrigin = "center center";
        this.element.style.position = "absolute";
        this.img.style.width = "100%";
        this.img.style.height = "100%";
        this.img.style.position = "absolute";
        this.element.style.position = "absolute";
        this.element.appendChild(this.img);

        this.load();
    }

    async load() {
        for (const costume of this.costumes.values()) {
            await costume.load();
        }

        this.done = true;
        this.onload?.();
        this.update();
    }

    @event
    async whenLoaded(fn: Entity.Callback) {
        if (this.done) {
            fn.call(this);
        } else {
            this.onload = fn;
        }
    }

    update(): void {
        const costume = this.costumes.get(this.current)!;

        if (this.img.src !== costume.src) {
            this.img.src = costume.src;
        }

        const x = this.x - costume.visibleWidth / 2;
        const y = -this.y - costume.visibleHeight / 2;

        this.element.style.width = `${costume.visibleWidth}px`;
        this.element.style.height = `${costume.visibleHeight}px`;
        this.element.style.filter = this.toFilter();

        this.element.style.left = `${x + this.stage.width / 2}px`;
        this.element.style.top = `${y + this.stage.height / 2}px`;

        this.element.style.visibility = this.visible ? "visible" : "hidden";

        if (this.rotationStyle === 0) {
            this.element.style.transform = `rotate(${this.direction - 90}deg)`;
        }

        if (this.rotationStyle === 1) {
            this.element.style.transform = `scaleX(${(Math.floor(this.direction / 180) * 2 - 1) * -1})`;
        }

        if (this.rotationStyle === 2) {
            this.element.style.transform = "";
        }

        this.textUi?.update();
    }

    addTo(stage: Stage) {
        stage.sprites.push(this);
        stage.element.appendChild(this.element);

        this.stage = stage;
    }

    @event
    async whenFlag(fn: Entity.Callback) {
        this.stage.toggleFlag(true);

        this.stage.flag.addEventListener(
            "click",
            () => {
                fn.call(this);
                this.stage.toggleFlag(false);
            },
            {once: true}
        );
    }

    @method
    async delete() {
        this.stage.sprites = this.stage.sprites.filter(sprite => sprite !== this);
        this.stage.element.removeChild(this.element);
    }

    @method
    async clone() {
        const clone = new Sprite(this.images, this.sounds);

        clone.id = this.id;
        clone.costumes = this.costumes;
        clone.current = this.current;
        clone.x = this.x;
        clone.y = this.y;
        clone.direction = this.direction;
        clone.visible = this.visible;
        clone.size = this.size;
        clone.rotationStyle = this.rotationStyle;

        clone.addTo(this.stage);
        clone.update();

        document.dispatchEvent(new CustomEvent("ScrapSpriteClone", {detail: clone}));

        return clone;
    }

    @event
    async whenCloned(fn: Entity.Callback) {
        document.addEventListener("ScrapSpriteClone", e => {
            if (e.detail.id === this.id) {
                fn.call(e.detail);
                e.stopPropagation();
            }
        });
    }

    private motion(x: number, y: number) {
        const prevX = this.x;
        const prevY = this.y;

        this.x = x;
        this.y = y;

        if (this.isPenDown) {
            this.stage.pen.beginPath();
            this.stage.pen.moveTo(this.stage.width / 2 + this.x, this.stage.height / 2 + this.y * -1);
            this.stage.pen.lineTo(this.stage.width / 2 + prevX, this.stage.height / 2 + prevY * -1);
            this.stage.pen.lineWidth = this.penSize;
            this.stage.pen.strokeStyle = this.penColor;
            this.stage.pen.stroke();
        }

        this.update();
    }

    /**
     * Moves the sprite for the specified number of seconds so it arrives at specified location when time is up.
     * @param seconds time to glide
     * @param x the x coordinate to glide to
     * @param y the y coordinate to glide to
     * @returns a promise that resolves when the glide is done
     */
    // No decorator! The stop logic is handled in the method itself.
    glide(seconds: number, x: number, y: number) {
        return new Promise<void>((resolve, reject) => {
            const controller = new AbortController();

            let i = 0;
            const framesPerSecond = 1000 / this.pace;
            const stepX = (x - this.x) / (seconds * framesPerSecond);
            const stepY = (y - this.y) / (seconds * framesPerSecond);

            const int = setInterval(() => {
                i++;
                this.motion(this.x + stepX, this.y + stepY);
                if (i / framesPerSecond >= seconds) {
                    clearInterval(int);
                    this.motion(x, y);
                    controller.abort();
                    resolve();
                }
            }, this.pace);

            window.addEventListener(
                "message",
                function stop() {
                    clearInterval(int);
                    window.removeEventListener("message", stop);
                    reject(new StopError());
                },
                {signal: controller.signal}
            );
        });
    }

    @paced
    async move(steps: number) {
        const TO_RADIANS = Math.PI / 180;

        const dx = steps * Math.cos((this.direction - 90) * TO_RADIANS);
        const dy = steps * Math.sin((this.direction + 90) * TO_RADIANS);

        this.motion(
            this.x + Math.round(dx),
            this.y + Math.round(dy)
        );
    }

    @paced
    async goTo(x: number, y: number) {
        this.motion(x, y);
    }

    @paced
    async goTowards(sprite: Sprite) {
        this.motion(sprite.x, sprite.y);
    }

    @paced
    async setX(x: number) {
        this.motion(x, this.y);
    }

    @paced
    async setY(y: number) {
        this.motion(this.x, y);
    }

    @paced
    async changeX(x: number) {
        this.motion(this.x + x, this.y);
    }

    @paced
    async changeY(y: number) {
        this.motion(this.x, this.y + y);
    }

    @paced
    async pointInDirection(direction: number) {
        this.direction = direction;
        this.update();
    }

    @paced
    async pointTowards(sprite: Sprite) {
        this.direction = Sprite.computeDirectionTo(this.x, this.y, sprite.x, sprite.y);
        this.update();
    }

    private static computeDirectionTo(fromX: number, fromY: number, toX: number, toY: number) {
        const result = ((180 / Math.PI) * (Math.atan((fromX - toX) / (fromY - toY))) + 90 * (Math.sign(fromY - toY) + 1) + 360) % 360;

        if (fromY === toY) {
            return result + 90;
        }

        return result;
    }

    @paced
    async pointTo(x: number, y: number) {
        this.direction = Sprite.computeDirectionTo(this.x, this.y, x, y);
        this.update();
    }

    @paced
    async turnLeft(degrees: number) {
        this.direction = (this.direction + degrees) % 360;
        this.update();
    }

    @paced
    async turnRight(degrees: number) {
        this.direction = (this.direction + 360 - degrees) % 360;
        this.update();
    }

    @method
    async setRotationStyle(style: 0 | 1 | 2 | "no" | "left-right" | "all") {
        if (style === "no") {
            this.rotationStyle = 0;
        } else if (style === "left-right") {
            this.rotationStyle = 1;
        } else if (style === "all") {
            this.rotationStyle = 2;
        } else {
            this.rotationStyle = style;
        }
    }

    @method
    async goForward() {
        this.stage.sendSpriteForward(this);
    }

    @method
    async goBackward() {
        this.stage.sendSpriteBackwards(this);
    }

    @method
    async goToFront() {
        this.stage.sendSpriteToFront(this);
    }

    @method
    async goToBack() {
        this.stage.sendSpriteToBack(this);
    }

    @method
    async switchCostumeTo(name: string) {
        this.current = name;
        this.update();
    }

    @method
    async nextCostume() {
        const costumes = Array.from(this.costumes.keys());
        const index = costumes.indexOf(this.current);
        const next = costumes[index + 1] ?? costumes[0];

        this.switchCostumeTo(next);
    }

    @method
    async show() {
        this.visible = true;
        this.update();
    }

    @method
    async hide() {
        this.visible = false;
        this.update();
    }

    private refreshSize() {
        for (const costume of this.costumes.values()) {
            costume.visibleWidth = costume.width * this.size / 100;
            costume.visibleHeight = costume.height * this.size / 100;
        }

        this.update();
    }

    @paced
    async setSize(size: number) {
        this.size = size;
        this.refreshSize();
    }

    @paced
    async changeSize(size: number) {
        this.size += size;
        this.refreshSize();
    }

    @method
    async think(contents: unknown) {
        const text = String(contents);

        if (this.textUi) {
            this.textUi.delete();
        }

        if (!text) {
            delete this.textUi;
            return;
        }

        this.textUi = new TextUI(this, "think", text);
    }

    @method
    async say(contents: unknown) {
        const text = String(contents);

        if (this.textUi) {
            this.textUi.delete();
        }

        if (!text) {
            delete this.textUi;
            return;
        }

        this.textUi = new TextUI(this, "say", text);
    }

    @method
    async thinkWait(contents: unknown, seconds: number) {
        await this.think(contents);
        await this.wait(seconds);
        await this.think("");
    }

    @method
    async sayWait(contents: unknown, seconds: number) {
        await this.say(contents);
        await this.wait(seconds);
        await this.say("");
    }

    @method
    async ask(contents: unknown) {
        const askId = this.generateID();
        const text = String(contents);

        this.textUi?.delete();
        this.textUi = new TextUI(this, "ask", text, askId);

        return new Promise<string>(resolve => {
            target.addEventListener(
                askId,
                e => {
                    const {detail} = e as CustomEvent<string>;
                    this.textUi?.delete();
                    delete this.textUi;
                    resolve(detail);
                },
                {once: true}
            );
        });
    }

    @method
    async penClear() {
        this.stage.pen.clearRect(0, 0, this.stage.width, this.stage.height);
    }

    @method
    stamp() {
        if (!this.visible) {
            return Promise.resolve();
        }

        return new Promise<void>((resolve, reject) => {
            const costume = this.costumes.get(this.current)!;

            this.stage.pen.save();
            this.stage.pen.filter = this.toFilter();

            const {x, y, stage, rotationStyle, direction} = this;

            const width = costume.visibleWidth;
            const height = costume.visibleHeight;

            const imgX = x + stage.width / 2;
            const imgY = stage.height / 2 - y;
            const radians = (((direction - 90 + 360) % 360) * Math.PI) / 180;

            if (rotationStyle === 0) {
                this.stage.pen.translate(imgX, imgY);
                this.stage.pen.rotate(radians);
            } else if (rotationStyle === 1) {
                this.stage.pen.scale((Math.floor(this.direction / 180) * 2 - 1) * -1, 1);
            }

            const image = new Image();

            image.onload = () => {
                this.stage.pen.drawImage(
                    image,
                    0,
                    0,
                    image.width,
                    image.height,
                    -width / 2,
                    -height / 2,
                    width,
                    height
                );
                this.stage.pen.restore();
                resolve();
            };

            image.onerror = reject;
            image.src = costume.src;
        });
    }

    @method
    async penDown() {
        this.isPenDown = true;
    }

    @method
    async penUp() {
        this.isPenDown = false;
    }

    @method
    async setPenColor(color: string) {
        this.penColor = color;
    }

    @method
    async setPenSize(size: number) {
        this.penSize = size;
    }

    @method
    async changePenSize(size: number) {
        this.penSize += size;
    }

    @method
    async distanceTo(x: number, y: number) {
        return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
    }

    @method
    async touchingEdge() {
        const width = this.costumes.get(this.current)!.visibleWidth;
        const height = this.costumes.get(this.current)!.visibleHeight;

        if (this.x + width / 2 > this.stage.width / 2) {
            return "right";
        }
        if (this.x - width / 2 < -1 * (this.stage.width / 2)) {
            return "left";
        }
        if (this.y + height / 2 > this.stage.height / 2) {
            return "top";
        }
        if (this.y - height / 2 < -1 * (this.stage.height / 2)) {
            return "bottom";
        }

        return null;
    }

    @method
    isTouchingEdge() {
        return this.touchingEdge().then(Boolean);
    }

    @method
    async isTouching(sprite: Sprite) {
        const width = this.costumes.get(this.current)!.visibleWidth;
        const height = this.costumes.get(this.current)!.visibleHeight;

        const spriteWidth = sprite.costumes.get(sprite.current)!.visibleWidth;
        const spriteHeight = sprite.costumes.get(sprite.current)!.visibleHeight;

        return (
            this.x + width / 2 > sprite.x - spriteWidth / 2 &&
            this.x - width / 2 < sprite.x + spriteWidth / 2 &&
            this.y + height / 2 > sprite.y - spriteHeight / 2 &&
            this.y - height / 2 < sprite.y + spriteHeight / 2
        );
    }

    @method
    async isTouchingBackdropColor(color: string) {
        const width = this.costumes.get(this.current)!.visibleWidth;
        const height = this.costumes.get(this.current)!.visibleHeight;

        const x = Math.round(this.x - this.stage.width / 2);
        const y = Math.round(this.stage.height / 2 - this.y);

        const {data} = this.stage.ctx.getImageData(x, y, width, height);

        const r = Number.parseInt(color.slice(1, 3), 16);
        const g = Number.parseInt(color.slice(3, 5), 16);
        const b = Number.parseInt(color.slice(5, 7), 16);

        for (let i = 0; i < data.length; i += 4) {
            if (data[i] === r && data[i + 1] === g && data[i + 2] === b && data[i + 3] !== 0) {
                return true;
            }
        }

        return false;
    }

    @method
    async isKeyPressed(key: string) {
        return this.stage.keys.includes(key);
    }

    get mouseX() {
        return this.stage.mouseX;
    }

    get mouseY() {
        return this.stage.mouseY;
    }

    get mouseDown() {
        return this.stage.mouseDown;
    }

    get costume() {
        return this.current;
    }
}