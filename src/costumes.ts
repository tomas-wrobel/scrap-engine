import Entity from "./entity";

export default class Costumes {
    readonly all: string[];

    constructor(readonly entity: Entity) {
        this.all = Object.keys(entity.images);
    }

    get name() {
        return this.entity.current;
    }

    set name(name: string) {
        this.entity.current = name;
        this.entity.update();
    }

    get index() {
        return this.all.indexOf(this.name);
    }

    set index(index: number) {
        this.name = this.all[index];
    }
}