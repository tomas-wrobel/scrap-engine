import BlockLikeSprite from "./sprite";
import BlockLikeStage from "./stage";
import Backdrop from "./backdrop";
import Costume from "./costume";

export function Sprite(...images) {
    const sprite = new BlockLikeSprite(null);
    images.forEach(image => {
        const costume = new Costume({image});
        costume.resizeToImage().then(() => {
            sprite.addCostume(costume);
        });
    });
    return sprite;
}

export function Stage(...images) {
    const stage = new BlockLikeStage({sensing: true})
    images.forEach((image) => {
        const backdrop = new Backdrop({image});
        backdrop.addTo(stae);
    });
    return stage;
}