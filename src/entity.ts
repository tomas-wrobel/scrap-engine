import {abort, isTurbo} from "./utils";
import {event, method} from "./decorators";
import Messages from "./messages";
import {DefaultVariableValues, Variable, VariableType, isVariableType} from "./variables";

const toEvent = {
    clicked: "click",
    pressed: "mousedown",
    released: "mouseup",
    left: "mouseleave",
    entered: "mouseenter",
    moved: "mousemove",
    "double-clicked": "dblclick",
};

const messages = new Messages();
let timer = Date.now();

abstract class Entity {
    readonly variables = new Map<string, Variable>();

    effects = {
        brightness: 100,
        color: 0,
        ghost: 0,
        grayscale: 0,
    };
    volume = 100;

    pace = isTurbo ? 0 : 33;

    abstract element: HTMLElement;
    abstract whenFlag(fn: Entity.Callback): void;

    audios: HTMLAudioElement[] = [];
    protected current: string;

    constructor(readonly images: Entity.Assets, readonly sounds: Entity.Assets, current: number) {
        this.current = Object.keys(images)[current];
    }

    protected generateID() {
        return Date.now().toString(36);
    }

    /**
     * Clears the effects of the entity.
     */
    @method
    async clearEffects() {
        this.effects.brightness = 100;
        this.effects.color = 0;
        this.effects.ghost = 0;
        this.effects.grayscale = 0;
    }

    abstract update(): void;
    abstract updateVariables(): void;

    /**
     * @returns CSS filter string.
     */
    toFilter() {
        return `brightness(${this.effects.brightness}%) hue-rotate(${this.effects.color * 3.6}deg) grayscale(${this.effects.grayscale}%) opacity(${100 - this.effects.ghost}%)`;
    }

    /**
     * Changes the effect of the entity.
     * @param effect effect to change
     * @param value value to change the effect by
     */
    @method
    async changeEffect(effect: keyof Entity["effects"], value: number) {
        this.effects[effect] += value;
        this.update();
    }

    /**
     * Sets the effect of the entity.
     * @param effect effect to set
     * @param value value to set the effect to
     */
    @method
    async setEffect(effect: keyof Entity["effects"], value: number) {
        this.effects[effect] = value;
        this.update();
    }

    /**
     * Waits for the specified amount of seconds.
     * @param seconds Seconds to wait.
     * @returns a void promise.
     */
    @method
    wait(seconds: number) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    /**
     * @param fn Function to execute when the entity is fully loaded.
     */
    @event
    async whenLoaded(fn: Entity.Callback) {
        setTimeout(fn.bind(this), 0);
    }

    @event
    async whenKeyPressed(key: string, fn: Entity.Callback) {
        window.addEventListener(
            "keydown", 
            e => {
                if (key === "any" || e.key === key) {
                    fn.call(this);
                }
            }, 
            {signal: abort.signal}
        );
    }

    /**
     * @param event Event to listen for.
     * @param fn Function to execute when the event is triggered.
     */
    @event
    async whenMouse(event: keyof typeof toEvent, fn: Entity.Callback) {
        this.element.addEventListener(
            toEvent[event], 
            e => {
                fn.call(this);
                e.stopPropagation();
            },
            {signal: abort.signal}
        );
    }

    /**
     * @param msg Event to listen for.
     * @param fn Function to execute when the event is triggered.
     */
    @event
    async whenReceiveMessage(msg: string, fn: Entity.Callback) {
        const listenerId = this.generateID();

        messages.listeners.push({msg, listenerId});
        messages.addEventListener(
            msg, 
            e => {
                const {detail} = e as Messages.Event;

                fn.call(this).then(() =>
                    document.dispatchEvent(
                        new CustomEvent("ScrapMessageDone", {
                            detail: {
                                listenerId,
                                msgId: detail,
                            },
                        })
                    )
                );
            },
            {signal: abort.signal}
        );
    }

    /**
     * Broadcasts a message to all entities.
     * @param msg Message to broadcast
     */
    @method
    async broadcastMessage(msg: string) {
        messages.dispatchEvent(new CustomEvent(msg, {detail: this.generateID()}));
    }

    /**
     * Broadcasts a message to all entities and waits for them to finish executing the message.
     * @param msg Message to broadcast
     * @returns a promise that resolves when all entities have finished executing the message
     */
    @method
    broadcastMessageWait(msg: string) {
        const msgId = this.generateID();

        let listeners = messages.listeners.filter(listener => listener.msg === msg);

        messages.dispatchEvent(new CustomEvent(msg, {detail: msgId}));

        return new Promise<void>(resolve => {
            document.addEventListener(
                "ScrapMessageDone", 
                function done(e) {
                    if (e.detail.msgId === msgId) {
                        listeners = listeners.filter(listener => listener.listenerId !== e.detail.listenerId);

                        if (!listeners.length) {
                            document.removeEventListener("ScrapMessageDone", done);
                            resolve();
                        }
                    }
                }, 
                {signal: abort.signal}
            );
        });
    }

    /**
     * Starts a sound.
     * @param name Sound to play
     */
    @method
    async playSound(name: string) {
        const audio = new Audio(this.sounds[name]);
        audio.volume = this.volume / 100;
        this.audios.push(audio);
        audio.play();

        audio.onended = () => {
            this.audios = this.audios.filter(a => a !== audio);
        };
    }

    /**
     * Starts a sound and waits for it to finish playing.
     * @param name Sound to play
     * @returns a promise that resolves when the sound has finished playing
     */
    @method
    playSoundUntilDone(name: string) {
        return new Promise<void>(resolve => {
            const audio = new Audio(this.sounds[name]);
            audio.volume = this.volume / 100;
            this.audios.push(audio);
            audio.play();

            audio.onended = () => {
                this.audios = this.audios.filter(a => a !== audio);
                resolve();
            };
        });
    }

    /**
     * Sets the volume of the
     * entity and all active
     * sounds
     * @param volume 0-100
     */
    @method
    async setVolume(volume: number) {
        this.volume = volume;
        this.updateVolume();
    }

    /**
     * Changes the volume of the
     * entity and all active
     * sounds
     * @param volume 0-100
     */
    @method
    async changeVolume(volume: number) {
        this.volume += volume;
        this.updateVolume();
    }

    private updateVolume() {
        for (const audio of this.audios) {
            audio.volume = this.volume / 100;
        }
    }

    /**
     * @param name Name of the variable
     * @returns the variable
     */
    @method
    async getVariable(name: string) {
        return this.variables.get(name)!.value;
    }

    /**
     * @param name Name of the variable
     * @param value Value to set the variable to
     */
    @method
    async setVariable(name: string, value: any) {
        const variable = this.variables.get(name);

        if (!variable) {
            throw "Variable not declared";
        }

        if (!isVariableType(variable.type, value)) {
            throw "Invalid variable type";
        }

        variable.value = value;

        if (variable.visible) {
            this.updateVariables();
        }
    }

    /**
     * Declares a variable.
     * @param name The name of the variable
     * @param value The value of the variable
     * @param visible Whether the variable should be visible in the variables pane
     */
    @method
    async declareVariable(name: string, type: VariableType) {
        this.variables.set(name, {
            value: DefaultVariableValues[type], 
            visible: false, type
        });
    }

    /**
     * @param name Name of the variable
     * @param value Value to change the variable by
     */
    @method
    async changeVariable(name: string, value: number) {
        const variable = this.variables.get(name)!;

        if (variable.type !== VariableType.Number) {
            throw "Cannot change non-number variable";
        }

        variable.value += value;

        if (variable.visible) {
            this.updateVariables();
        }
    }

    /**
     * @param name Name of the variable to hide
     */
    @method
    async hideVariable(name: string) {
        const variable = this.variables.get(name)!;
        variable.visible = false;
        this.updateVariables();
    }

    /**
     * @param name Name of the variable to show
     */
    @method
    async showVariable(name: string) {
        const variable = this.variables.get(name)!;
        variable.visible = true;
        this.updateVariables();
    }

    @method
    async getTimer() {
        return (Date.now() - timer) / 1000;
    }

    @method
    async resetTimer() {
        timer = Date.now();
    }
}

declare namespace Entity {
    interface Callback {
        (this: Entity): Promise<void>;
    }

    interface Assets {
        [name: string]: string;
    }
}

export default Entity;