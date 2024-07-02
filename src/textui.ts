import type Sprite from "./sprite";

class TextUI {
    element = document.createElement("div");

    constructor(sprite: Sprite, type: "ask", text: string, askId: string);
    constructor(sprite: Sprite, type: "say" | "think", text: string);

    constructor(readonly sprite: Sprite, readonly type: "ask" | "think" | "say", readonly text: string, askId?: string) {
        const x = sprite.x - sprite.width / 2;
        const y = -sprite.y - sprite.height / 2;

        this.update = this.update.bind(this);
        window.addEventListener("resize", this.update);

        this.element.style.position = "absolute";
        this.element.append(text, document.createElement("br"));

        this.element.style.left = `${(sprite.stage.width / 2) + x + (sprite.width * 0.6)}px`;
        this.element.style.top = `${((sprite.stage.height / 2) + y) - 80 - (Math.floor(this.text.length / 30) * 16)}px`;

        this.element.className = `blocklike-${type}`;

        if (type === "ask") {
            const form = document.createElement("form");

            const input = document.createElement("input");
            const btn = document.createElement("button");

            btn.type = "submit";
            btn.innerHTML = "&#x2713;";
            input.id = askId!;

            form.action = `javascript:Scrap.answer("${askId}")`;

            form.append(input, btn);
            this.element.append(form);

            this.element.style.top = `${((sprite.stage.height / 2) + y) - 110 - (Math.floor(this.text.length / 30) * 16)}px`;
        }

        this.element.style.visibility = this.sprite.visible ? "visible" : "hidden";
        this.sprite.stage.element.insertBefore(this.element, this.sprite.element);
    }

    private static update(this: TextUI) {
        const x = this.sprite.x - this.sprite.width / 2;
        const y = -this.sprite.y - this.sprite.height / 2;

        this.element.style.left = `${(this.sprite.stage.width / 2) + x + (this.sprite.width * 0.6)}px`;
        this.element.style.top = `${((this.sprite.stage.height / 2) + y) - 80 - (Math.floor(this.text.length / 30) * 16)}px`;

        if (this.type === 'ask') {
            this.element.style.top = `${((this.sprite.stage.height / 2) + y) - 110 - (Math.floor(this.text.length / 30) * 16)}px`;
        }

        this.element.style.visibility = this.sprite.visible ? "visible" : "hidden";
    }


    delete() {
        this.element.remove();
        window.removeEventListener("resize", this.update);
    }
}

interface TextUI {
    update(): void;
}

export default TextUI;