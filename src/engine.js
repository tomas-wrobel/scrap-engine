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
        /** @type {Record<string, string>} */
        this.costumes = {};
        for (const image in images) {
            this.costumes[image] = new Costume({image});
            this.costumes[image].resizeToImage().then(() => {
                this.addCostume(this.costumes[image]);
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
        /** @type {Record<string, string>} */
        this.backdrops = {};
        for (const image in images) {
            this.backdrops[image] = new Backdrop({image});
            this.backdrops[image].resizeToImage().then(() => {
                this.addBackdrop(this.backdrops[image]);
            });
        }
    }

    /**
     * @param {string} image
     */
    switchBackdropTo(image) {
        super.switchBackdropTo(this.backdrops[image]);
    }
}