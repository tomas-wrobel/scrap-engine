import type Entity from "./entity";
import Sprite from "./sprite";
import Stage from "./stage";

export * from "./utils";
export * as Form from "./form";

export function init(options: SpriteOptions | StageOptions) {
    const {
        name,
        images, 
        sounds, 
        current, 
        init, 
        ...other
    } = options;
    
    init.call($[name] = "x" in other ? new Sprite(images, sounds, other, current) : new Stage(images, sounds, current));
}

export interface StageOptions {
    name: "Stage";
    images: Entity.Assets;
    sounds: Entity.Assets;
    init: Entity.Callback;
    current: number;
}

export interface SpriteOptions extends Sprite.Init {
    name: string;
    images: Entity.Assets;
    sounds: Entity.Assets;
    init: Entity.Callback;
    current: number;
}

window.$ = {};