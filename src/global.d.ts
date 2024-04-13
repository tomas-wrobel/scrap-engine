import Entity from "./entity";
import Messages from "./messages";
import Sprite from "./sprite";

declare global {
    interface DocumentEventMap {
        ScrapMessageDone: Messages.DoneEvent;
        ScrapSpriteClone: CustomEvent<Sprite>;
    }

    var $: Record<string, Entity>;
}