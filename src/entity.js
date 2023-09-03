import * as css from "./css";

/**
 * Class representing an entity.
 * Abstract for Stage and Sprite.
 * Do not instantiate objects directly from this class.
 *
 * @private
 */
export default class Entity {
    /**
     * constructor - Entity is abstract for Stage and Sprite.
     *
     * @param {number} pace - the number of milliseconds to pace paced methods.
     */
    constructor(pace) {
        Entity.messageListeners = [];
        this.id = this._generateUUID();
        this.pace = pace;
        this.sounds = []; // will hold all sounds currently played by entity, if any.
        this.effects = {
            brightness: 100,
            color: 0,
            ghost: 0,
            grayscale: 0
        };
    }

    getCSSFilter() {
        return `brightness(${this.effects.brightness}%) hue-rotate(${this.effects.color * 3.6}deg) grayscale(${this.effects.grayscale}%) opacity(${100 - this.effects.ghost}%)`;
    }

    changeEffect(effect, delta) {
        this.effects[effect] += delta;
        this.element && this.element.update(this);
    }

    setEffect(effect, value) {
        this.effects[effect] = value;
        this.element && this.element.update(this);
    }

    /**
     * _generateUUID - generates a unique ID.
     * Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     *
     * @private
     * @return {string} - a unique id.
     */
    _generateUUID() {
        let d;
        let r;

        d = new Date().getTime();

        if (performance && typeof performance.now === "function") {
            d += performance.now(); // use high-precision timer if available
        }

        const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            c => {
                r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );

        return uuid;
    }

    /**
     * wait - creates a pause in execution.
     *
     * @example
     * this.wait(5);
     *
     * @example
     * let time = 5;
     * this.wait(time * 0.95);
     *
     * @param {number} sec - number of seconds to wait. Must be an actual number.
     */
    wait(sec) {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
    }

    /** Events * */

    /**
     * whenLoaded - invoke user supplied function.
     * To be used with code that needs to run onload.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenLoaded( function() {
     *   this.say('I am alive');
     * });
     *
     * @param {function} func - a function to rewrite and execute.
     */
    whenLoaded(func) {
        setTimeout(func.bind(this), 0);
    }

    /**
     * whenFlag - adds a flag to cover the stage with an event listener attached.
     * When triggered will remove the flag div and invoke user supplied function.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenFlag( function() {
     *   this.say('I am alive');
     * });
     *
     * @param {function} func - a function to rewrite and execute.
     */
    whenFlag(func) {
        if (this.element) {
            this.element.addFlag(this);

            this.element.flag.addEventListener("click", async e => {
                this.element.removeFlag(this);
                func.call(this);
                e.stopPropagation();
            });
        }
    }

    /**
     * whenClicked - adds a click event listener to the sprite or stage.
     * When triggered will invoke user supplied function.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.say('I am alive');
     * });
     *
     * @param {function} func - a function to rewrite and execute.
     */
    whenClicked(func) {
        if (this.element) {
            this.element.el.addEventListener("click", e => {
                func.call(this);
                e.stopPropagation();
            });
        }
    }

    /**
     * whenKeyPressed - adds a keypress event listener to document.
     * When triggered will invoke user supplied function.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenKeyPressed(' ', function() {
     *   this.say('Spacepressed');
     * });
     *
     * @param {string} userKey - the key pressed. may be the code or the character itself (A or 65)
     * @param {function} func - a function to rewrite and execute.
     */
    whenKeyPressed(userKey, func) {
        document.addEventListener("keydown", e => {
            if (e.key === userKey) {
                func.call(this);
                e.preventDefault();
            }
        });
    }

    /**
     * whenEvent - adds the specified event listener to sprite/stage.
     * When triggered will invoke user supplied function.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenEvent('mouseover', (e) => {
     *   console.log(e);
     * });
     *
     * @param {string} eventStr - the named event (mosemove etc.).
     * @param {function} func - a function to rewrite and execute.
     */
    whenEvent(eventStr, func) {
        if (this.element) {
            this.element.el.addEventListener(eventStr, e => {
                func.call(this);
                e.stopPropagation();
            });
        }
    }

    whenMouse(kind, func) {
        const toEvent = {
            clicked: "click",
            pressed: "mousedown",
            released: "mouseup",
            left: "mouseleave",
            entered: "mouseenter",
            moved: "mousemove",
            "double-clicked": "dblclick"
        };
        this.whenEvent(toEvent[kind], func);
    }

    /**
     * whenReceiveMessage - adds the specified event listener to document.
     * When triggered will invoke user supplied function.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenReceiveMessage('move', function() {
     *   this.move(-10);
     * })
     *
     * @param {string} msg - the named message (event);
     * @param {function} func - a function to rewrite and execute.
     */
    whenReceiveMessage(msg, func) {
        const listenerId = this._generateUUID();
        // register as a message listener.
        Entity.messageListeners.push({msg, listenerId});

        // listen to specified message
        document.addEventListener(msg, async e => {
            await func.call(this);
            // dispatch an event that is unique to the listener and message received.
            const msgId = e.detail.msgId;
            const event = new CustomEvent("blockLike.donewheneeceivemessage", {
                detail: {msgId, listenerId},
            });

            document.dispatchEvent(event);
        });
    }

    /**
     * broadcastMessage - dispatches a custom event that acts as a global message.
     *
     * @example
     * let stage = new blockLike.Stage();
     *
     * stage.whenClicked(function() {
     *  stage.broadcastMessage('move')
     * });
     *
     * @param {string} msg - the named message (event)
     */
    broadcastMessage(msg) {
        const msgId = this._generateUUID();
        const event = new CustomEvent(msg, {detail: {msgId}});
        document.dispatchEvent(event);
    }

    /**
     * broadcastMessageWait - dispatches a custom event that acts as a global message.
     * Waits for all whenReceiveMessage listeners to complete.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     *
     * sprite.whenReceiveMessage('move', function() {
     *   this.move(-10);
     *   this.wait(5);
     * })
     *
     * stage.whenClicked(function() {
     *  stage.broadcastMessageWait('move');
     *  sprite.say('All done');
     * });
     *
     * @param {string} msg - the named message (event)
     */
    broadcastMessageWait(msg) {
        const msgId = this._generateUUID();
        // save registered listeners for this broadcast.
        let listeners = Entity.messageListeners.filter(
            item => item.msg === msg
        );
        // dispatch the message
        document.dispatchEvent(new CustomEvent(msg, {detail: {msgId}}));

        return new Promise(resolve => {
            // listen to those who received the message
            document.addEventListener(
                "blockLike.donewheneeceivemessage",
                function listener(e) {
                    // if event is for this message remove listenerId from list of listeners.
                    if (e.detail.msgId === msgId) {
                        listeners = listeners.filter(
                            item => item.listenerId !== e.detail.listenerId
                        );
                    }
                    // all listeners responded.
                    if (!listeners.length) {
                        // remove the event listener
                        document.removeEventListener(
                            "blockLike.donewheneeceivemessage",
                            listener
                        );
                        // release the wait
                        resolve();
                    }
                }
            );
        });
    }

    /** Sound * */

    /**
     * playSound - plays a sound file (mp3, wav)
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.playSound('../../sounds/bleat.wav');
     * });
     *
     * @param {string} url - the url of the file to play.
     */
    playSound(url) {
        const audio = new Audio(url);
        audio.play();
        this.sounds.push(audio);
        audio.addEventListener("ended", () => {
            this.sounds = this.sounds.filter(item => item !== audio);
        });
    }

    /**
     * playSoundLoop - plays a sound file (mp3, wav) again and again
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.playSoundLoop('../../sounds/bleat.wav');
     * });
     *
     * @param {string} url - the url of the file to play.
     */
    playSoundLoop(url) {
        const audio = new Audio(url);
        audio.play();
        this.sounds.push(audio);
        audio.addEventListener("ended", () => {
            audio.currentTime = 0;
            audio.play();
        });
    }

    /**
     * playSoundUntilDone - plays a sound file (mp3, wav) until done.
     * This is similar to playSound and wait for the duration of the sound.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.playSoundUntilDone('../../sounds/bleat.wav');
     * });
     *
     * @param {string} url - the url of the file to play.
     */
    playSoundUntilDone(url) {
        // triggeringId is not user supplied, it is inserted by rewriter.
        const audio = new Audio(url);
        audio.play();
        this.sounds.push(audio);
        return new Promise(resolve => {
            audio.addEventListener(
                "ended",
                () => {
                    this.sounds = this.sounds.filter(item => item !== audio);
                    resolve();
                },
                {once: true}
            );
        });
    }

    /**
     * stopSounds - stops all sounds played by sprite or stage.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.playSound('../../sounds/bleat.wav');
     * });
     *
     * stage.whenKeyPressed('Escape', () => {
     *   this.stopSounds();
     * });
     */
    stopSounds() {
        this.sounds.forEach(item => {
            item.pause();
        });
        this.sounds = [];
    }

    /* css */

    /**
     * css - applies a CSS rule to the sprite and all costumes.
     *
     * @example
     * let sprite = new blockLike.Sprite();
     *
     * sprite.css('background', '#0000ff');
     *
     * @param {string} prop - the css property (e.g. color). Alternatively an object with key: value pairs.
     * @param {string} value - the value for the css property (e.g. #ff8833)
     */
    css(prop, value = null) {
        css.register(prop, value, this);
        this.element && this.element.update(this);
    }

    /**
     * addClass - adds a css class to sprite and all costumes.
     *
     * @example
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addClass('rainbow');
     *
     * @param {string} name - the css class name to add.
     */
    addClass(name) {
        !this.hasClass(name) ? this.classes.push(name) : null;
        this.element && this.element.update(this);
    }

    /**
     * removeClass - removes a css class from the sprite and all costumes.
     *
     * @example
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addClass('rainbow');
     * sprite.removeClass('rainbow');
     *
     * @param {string} name - the css class name to remove.
     */
    removeClass(name) {
        this.classes = this.classes.filter(item => item !== name);
        this.element && this.element.update(this);
    }

    /**
     * hasClass - is the css class applied to the sprite and all costumes.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.hasClass('rainbow') ? this.removeClass('rainbow') : this.addClass('rainbow');
     * });
     *
     * @param {string} name - the css class name.
     * @return {boolean} - is the css class name on the list.
     */
    hasClass(name) {
        return this.classes.indexOf(name) !== -1;
    }
}
