import BlockLikeSprite from "./sprite";
import BlockLikeStage from "./stage";
import Backdrop from "./backdrop";
import Costume from "./costume";

export class Sprite extends BlockLikeSprite {
    /**
     * @param {Record<string, string>} images
     * @param {Record<string, string>} sounds
     */
    constructor(images, sounds) {
        super(null);
        /** @type {Record<string, string>} */
        this._sounds = sounds;
        /** @type {Record<string, Costume>} */
        this._costumes = {};
        for (const name in images) {
            this._costumes[name] = new Costume({
                image: images[name],
            });
            this._costumes[name].resizeToImage().then(() => {
                this.addCostume(this._costumes[name]);
            });
        }
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
    }

    /**
     * @param {string} name
     */
    switchBackdropTo(name) {
        super.switchBackdropTo(this._backdrops[name]);
    }
}