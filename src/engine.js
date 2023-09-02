import BlockLikeSprite from "./sprite";
import BlockLikeStage from "./stage";
import Backdrop from "./backdrop";
import Costume from "./costume";

export const isTurbo = frameElement && frameElement.dataset.mode === "turbo";

export class Sprite extends BlockLikeSprite {
    /**
     * @param {Record<string, string>} images
     * @param {Record<string, string>} sounds
     */
    constructor(images, sounds) {
        super(null);

        if (isTurbo) {
            this.pace = 0;
        }

        /** @type {Record<string, string>} */
        this._sounds = sounds;
        /** @type {Record<string, Costume>} */
        this._costumes = {};
        /** @type {VoidFunction} */
        this.onload = () => {};
        this._loadImages(images);
    }

    /**
     * @param {string[]} images
     */
    async _loadImages(images) {
        for (const name in images) {
            this._costumes[name] = new Costume({
                image: images[name],
            });
            await this._costumes[name].resizeToImage();
            this.addCostume(this._costumes[name]);
        }
        this.onload();
    }

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
        this.onload = func;
    }
    /**
     * @param {string} name
     */
    switchCostumeTo(name) {
        super.switchCostumeTo(this._costumes[name]);
    }
    /**
     * @param {string} name
     */
    playSound(name) {
        super.playSound(this._sounds[name]);
    }
    /**
     * @param {string} name
     */
    playSoundUntilDone(name) {
        super.playSoundUntilDone(this._sounds[name]);
    }
    /**
     * @param {string} name
     */
    playSoundLoop(name) {
        super.playSoundLoop(this._sounds[name]);
    }
}

export class Stage extends BlockLikeStage {
    /**
     * @param {Record<string, string>} images
     * @param {Record<string, string>} sounds
     */
    constructor(images, sounds) {
        super({sensing: true});
        /** @type {Record<string, string>} */
        this._sounds = sounds;
        /** @type {Record<string, Backdrop>} */
        this._backdrops = {};
        for (const name in images) {
            this._backdrops[name] = new Backdrop({
                image: images[name],
            });
            this._backdrops[name].addTo(this);
        }
        if (isTurbo) {
            this.pace = 0;
        }
    }

    /**
     * @param {string} name
     */
    switchBackdropTo(name) {
        super.switchBackdropTo(this._backdrops[name]);
    }
}