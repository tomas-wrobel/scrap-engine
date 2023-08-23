import BlockLikeSprite from "./sprite";
import BlockLikeStage from "./stage";
import Backdrop from "./backdrop";
import Costume from "./costume";

export class Sprite extends BlockLikeSprite {
    /**
     * @param {Record<string, string>} images
     */
    constructor(images) {
        super(null);
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
}

export class Stage extends BlockLikeStage {
    /**
     * @param {Record<string, string>} images
     */
    constructor(images) {
        super(null);
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