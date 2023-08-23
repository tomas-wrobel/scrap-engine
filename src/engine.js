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
        for (const image in images) {
            this._costumes[image] = new Costume({image});
            this._costumes[image].resizeToImage().then(() => {
                this.addCostume(this._costumes[image]);
            });
        }
    }

    /**
     * @param {string} image 
     */
    switchCostumeTo(image) {
        super.switchCostumeTo(this.costumes[image]);
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
        for (const image in images) {
            this._backdrops[image] = new Backdrop({image});
            this._backdrops[image].addTo(this);
        }
    }

    /**
     * @param {string} image
     */
    switchBackdropTo(image) {
        super.switchBackdropTo(this.backdrops[image]);
    }
}