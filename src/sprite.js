import Entity from "./entity";

import StageSurface from "./stage-surface";
import SpriteElement from "./sprite-element";
import Costume from "./costume";
import TextUiElement from "./text-ui-element";

/**
 * Class representing a Sprite.
 * Sprites can be added to the Stage.
 * @extends Entity
 *
 * @example
 * let sprite = new blockLike.Sprite();
 *
 * @example
 * let sprite = new blockLike.Sprite({
 *   costume: new blockLike.Costume({
 *     width: 50,
 *     height: 50,
 *     color: '#A2DAFF',
 *     image: 'https://www.blocklike.org/images/sheep_step.png'
 *   })
 * });
 *
 * @example
 * let sprite = new blockLike.Sprite({
 *     width: 50,
 *     height: 50,
 *     color: '#A2DAFF',
 *     image: 'https://www.blocklike.org/images/sheep_step.png'
 * });
 *
 * @example
 * let confetti = new blockLike.Sprite('https://www.blocklike.org/images/confetti.svg');
 *
 * @example
 * let bareZeroSizedSprite = new blockLike.Sprite(null);
 */
export default class Sprite extends Entity {
    /**
     * constructor - Creates a Sprite to be added to Stage.
     *
     * @param {object} options - options for the sprite and/or options passed to costume.
     * Alternatively an image URL. If a URL is provided default costume will be sized to image.
     * @param {number} options.pace - The number of milliseconds to wait for each paced method.
     * @param {object} options.costume - A default Costume.
     * @param {number} options.width - the costume width in pixels. Default is 100.
     * @param {number} options.height - the costume height in pixels. Default is 100.
     * @param {string} options.image - a URL (or data URL) for the costume image.
     * @param {string} options.color - a css color string ('#ff0000', 'red').
     * @param {string} options - a URL (or data URL) for the costume image.
     */
    constructor(options = {}) {
        const sheepy = "";
        const defaults = {
            pace: 33,
        };

        let actual = {};
        typeof options === "object"
            ? (actual = {...defaults, ...options})
            : (actual = defaults);

        super(actual.pace);

        // costumes
        this.costumes = [];

        /*
         * alternate options  - image url.
         * user can send a url instead of an option object.
         * this will be treated as a costume image url.
         * the image will be set the sprite costume.
         * when the image is loaded, costume width and height will be set to actual image width and height.
         * sprite will be refreshed.
         */
        if (typeof options === "string") {
            actual.costume = new Costume({image: options, width: 0, height: 0});
            const image = new Image();

            const me = actual.costume;
            image.src = options;

            image.addEventListener("load", () => {
                me.originalWidth = image.width;
                me.originalHeight = image.height;
                me.width = me.originalWidth;
                me.height = me.originalHeight;

                this.refresh();
            });
        }

        /*
         * alternate options - passing custome options to sprite.
         * if costume is not defined by user, it will be created.
         * when no image is set, sheepy is default.
         *
         * alternate options - null.
         * user can pass null instead of an option object.
         * this is same as setting a costume as null.
         * the sprite will have no costumes and no size.
         */
        if (typeof actual.costume === "undefined" && options !== null) {
            const costumeOptions = {};
            actual.width ? (costumeOptions.width = actual.width) : null;
            actual.height ? (costumeOptions.height = actual.height) : null;
            actual.color ? (costumeOptions.color = actual.color) : null;
            typeof actual.image !== "undefined"
                ? (costumeOptions.image = actual.image)
                : (costumeOptions.image = sheepy);

            actual.costume = new Costume(costumeOptions);
        }

        // set costume
        actual.costume ? (this.costume = actual.costume) : null;
        this.costume ? this.costumes.push(this.costume) : null;

        // set width
        this.costume
            ? (this.width = this.costume.visibleWidth)
            : (this.width = 0);
        this.costume
            ? (this.height = this.costume.visibleHeight)
            : (this.height = 0);

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.prevX = 0;
        this.prevY = 0;

        this.stage = null;

        this.showing = true;
        this.direction = 90;
        this.magnification = 100;

        this.rotationStyle = 0;

        /** @type {TextUiElement} */
        this.textui = null;

        this.drawing = false;
        this.penColor = "#222222";
        this.penSize = 1;

        this.cssRules = [];
        this.classes = [];

        /** @type {SpriteElement} */
        this.element = null;
    }

    _paced() {
        return new Promise(resolve => setTimeout(resolve, this.pace));
    }

    /** Setup Actions * */

    /**
     * addTo - Adds the sprite to the stage
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     *
     * @param {object} stage - which stage to add the sprite too.
     */
    addTo(stage) {
        this.stage = stage;

        this.element = new SpriteElement(this, stage);
        this.surface = new StageSurface(stage);

        this.element.flag = stage.element.flag;
        this.againstBackdrop = stage.element.backdropContainer;

        stage.sprites.push(this);
        this.z = stage.sprites.length;

        this.element.update(this);
    }

    /**
     * clone - Creates a clone of the sprite and triggers an event.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   let clone = this.clone();
     *   clone.move(100);
     * 
     * });
     *
     */
    clone() {
        // make a new sprite.
        const sprite = new Sprite();
        // save id.
        const id = sprite.id;
        // and assign properties.
        const clone = Object.assign(sprite, this);
        // reassign the unique id.
        clone.id = id;

        // remove DOM elements
        clone.element = null;
        clone.surface = null;

        // detach arrays
        clone.cssRules = JSON.parse(JSON.stringify(this.cssRules));
        clone.classes = this.classes.slice();

        // figure out what the current costume is.
        const currentCostumeIndex = this.costumes.indexOf(this.costume);

        // fill the costumes array with new costumes and assign properties.
        clone.costumes = this.costumes.map(item => {
            const costume = new Costume();
            const obj = Object.assign(costume, item);

            // detach arrays
            obj.cssRules = JSON.parse(JSON.stringify(item.cssRules));
            obj.classes = item.classes.slice();

            return obj;
        });

        // set the current costume.
        clone.costume = clone.costumes[currentCostumeIndex];

        // add the clone to the stage.
        this.stage && clone.addTo(this.stage);

        // announce a clone
        const event = new CustomEvent(
            `blockLike.spritecloned.${this.id}`,
            {detail: clone}
        );
        document.dispatchEvent(event);

        return clone;
    }

    /**
     * removeFrom - Removes a sprite from the stage.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.removeFrom(stage);
     *
     */
    removeFrom(stage) {
        const curStage = stage;

        curStage.sprites = stage.sprites.filter(item => item !== this);
        this.element ? (this.element = this.element.delete(this)) : null;
    }

    delete() {
        this.removeFrom(this.stage);
    }

    /** Events * */

    /**
     * whenCloned - Adds a document level event listener triggered by a custom event.
     * The custom event is triggered by the clone() method.
     * When triggered will invoke user supplied function.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.clone();
     * });
     *
     * sprite.whenCloned( function() {
     *   this.addTo(stage);
     *   this.glide(5, 100, 0);
     * });
     *
     * @param {function} func - a function to rewrite and execute.
     */
    whenCloned(func) {
        document.addEventListener(`blockLike.spritecloned.${this.id}`, e => {
            func.call(e.detail);
            e.stopPropagation();
        });
    }

    /** Motion * */

    /**
     * _motion - Moves the sprite to specified location (x, y).
     * All user motion methods translated to this motion.
     *
     * @private
     * @param {number} x - the x coordinate for the center of the sprite (0 is center screen).
     * @param {number} y - the y coordinate for the center of the sprite (0 is center screen).
     */
    _motion(x, y) {
        this.prevX = this.x;
        this.prevY = this.y;
        this.x = x;
        this.y = y;
        this.element ? this.element.update(this) : null;
        this.surface ? this.surface.draw(this) : null;
    }

    /**
     * glide - Moves the sprite for the specified number of seconds so it arrives at specified location when time is up.
     * Provides smooth movement.
     *
     * @example
     * sprite.whenClicked( function() {
     *   this.glide(3, 100, 100);
     * });
     *
     * @example
     * sprite.whenClicked( function() {
     *   let time = 5;
     *   this.glide(time, 100, 100);
     * });
     *
     * @param {number} sec - the number of seconds the whole movement will last (and will halt further execution for).
     * @param {number} x - the x coordinate.
     * @param {number} y - the y coordinate.
     */
    glide(sec, x, y) {
        return new Promise(resolve => {
            let i = 0;
            // divide the x and y difference into steps
            const framesPerSecond = 1000 / this.pace;
            const stepX = (x - this.x) / (sec * framesPerSecond);
            const stepY = (y - this.y) / (sec * framesPerSecond);
            const int = setInterval(() => {
                i += 1;
                this._motion(this.x + stepX, this.y + stepY);
                if (i / framesPerSecond >= sec) {
                    //  clear the interval and fix any "drift"
                    clearInterval(int);
                    this._motion(x, y);
                    resolve();
                }
            }, this.pace);
        });
    }

    /**
     * move - Moves the sprite a specified number of pixels in the direction it is pointing.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.move(100, 100);
     * });
     *
     * @param {number} pixels - number of pixels to move.
     */
    move(pixels) {
        /**
         * toRad - converts a degree to radians.
         *
         * @param {number} deg - number of degrees.
         * @return {number} - degrees converted to radians.
         */
        function toRad(deg) {
            return deg * (Math.PI / 180);
        }

        const dx = Math.round(Math.cos(toRad(this.direction - 90)) * pixels);
        const dy = Math.round(Math.sin(toRad(this.direction + 90)) * pixels);

        this._motion(this.x + dx, this.y + dy);

        return this._paced();
    }

    /**
     * goTo - Moves the sprite to specified location.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.goTo(100, 100);
     * });
     *
     * @param {number} x - the x coordinate.
     * @param {number} y - the y coordinate.
     */
    goTo(x, y) {
        this._motion(x, y);
        return this._paced();
    }

    /**
     * goTowards - Moves the sprite towards another sprite.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let otherSprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * otherSprite.addTo(stage);
     * otherSprite.move(100);
     * sprite.whenClicked( function() {
     *   this.goTowards(otherSprite);
     * });
     *
     * @param {object} sprite - the sprite to move to.
     */
    goTowards(sprite) {
        this._motion(sprite.x, sprite.y);
        return this._paced();
    }

    /**
     * setX - Places the sprite at the specified x position.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.setX(100);
     * });
     *
     * @param {number} x - the x coordinate
     */
    setX(x) {
        this._motion(x, this.y);
        return this._paced();
    }

    /**
     * setY - Places the sprite at the specified y position.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.setY(100);
     * });
     *
     * @param {number} y - the y coordinate.
     */
    setY(y) {
        this._motion(this.x, y);
        return this._paced();
    }

    /**
     * changeX - Moves the sprite on the x axis a specified number of pixels.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.changeX(100);
     * });
     *
     * @param {number} pixels - number of pixels to move.
     */
    changeX(pixels) {
        this._motion(this.x + pixels, this.y);
        return this._paced();
    }

    /**
     * changeY - Moves the sprite on the y axis a specified number of pixels.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.changeY(100);
     * });
     *
     * @param {number} pixels - number of pixels to move.
     */
    changeY(pixels) {
        this._motion(this.x, this.y + pixels);
        return this._paced();
    }

    /**
     * pointInDirection - Points the sprite in a specified direction.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.pointInDirection(45);
     * });
     *
     * @param {number} deg - direction to point to.
     */
    pointInDirection(deg) {
        deg > 0
            ? (this.direction = deg % 360)
            : (this.direction = (deg + 360 * 10) % 360);
        this.element ? this.element.update(this) : null;
        return this._paced();
    }

    /**
     * pointTowards - Point the sprite towards another sprite.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let otherSprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * otherSprite.addTo(stage);
     * otherSprite.goTo(100, 100);
     * sprite.whenClicked( function() {
     *   this.pointTowards(otherSprite);
     * });
     *
     * @param {object} sprite - the sprite to move to.
     */
    pointTowards(sprite) {
        /**
         * computeDirectionTo - finds the direction from sprite's current location to a specified set of coordinates.
         *
         * @param {number} fromX - the x coordinate
         * @param {number} fromY - the y coordinate
         * @param {number} toX - the x coordinate
         * @param {number} toY - the y coordinate
         * @return {number} - direction in degrees.
         */
        function computeDirectionTo(fromX, fromY, toX, toY) {
            /**
             * toDeg - Converts radians to degrees.
             *
             * @param {number} rad - number of radians.
             * @return {number} - radians converted to degrees.
             */
            function toDeg(rad) {
                return rad * (180 / Math.PI);
            }

            // 1) Find the angle in rad, convert to deg (90 to -90).
            // 2) Find the sign of the delta on y axis (1, -1). Shift to (0, -2). Multiply by 90. (0, 180)
            // Add 1) and 2)
            // Normalize to 360

            let result =
                (toDeg(Math.atan((fromX - toX) / (fromY - toY))) +
                    90 * (Math.sign(fromY - toY) + 1) +
                    360) %
                360;
            fromY - toY === 0 ? (result += 90) : null; // make sure we fix atan lim (division by zero).

            return result;
        }

        this.direction = computeDirectionTo(this.x, this.y, sprite.x, sprite.y);
        this.element ? this.element.update(this) : null;
        return this._paced();
    }

    /**
     * turnRight - Turns the sprite in a specified number of degrees to the right (clockwise)
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.turnRight(45);
     * });
     *
     * @param {number} deg - number of degrees to turn.
     */
    turnRight(deg) {
        this.direction = (this.direction + deg) % 360;
        this.element ? this.element.update(this) : null;
        return this._paced();
    }

    /**
     * turnLeft - Turns the sprite in a specified number of degrees to the left (counter-clockwise)
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.turnLeft(45);
     * });
     *
     * @param {number} deg - number of degrees to turn.
     */
    turnLeft(deg) {
        this.direction = (this.direction + 360 - deg) % 360;
        this.element ? this.element.update(this) : null;
        return this._paced();
    }

    /**
     * setRotationStyle - Sets one of three possible rotation styles:
     *   - 'no' / 2 - the sprites changes the direction in which it points without changing the sprites appearance.
     *   - 'left-right' / 1 - the sprite will flip horizontally when direction is between 180 and 360.
     *   - 'all' / 0 - the sprite will rotate around its center
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.setRotationStyle('left-right');
     *
     * @example
     * sprite.setRotationStyle(1);
     *
     * @param {number} deg - number of degrees to turn.
     */
    setRotationStyle(style) {
        let curStyle = style;

        style === "no" ? (curStyle = 2) : null;
        style === "left-right" ? (curStyle = 1) : null;
        style === "all" ? (curStyle = 0) : null;

        this.rotationStyle = curStyle;
    }

    /** Looks * */

    goForward() {
        this.stage.sendSpriteForward(this);
    }

    goBackward() {
        this.stage.sendSpriteBackwards(this);
    }

    goToFront() {
        this.stage.sendSpriteToFront(this);
    }

    goToBack() {
        this.stage.sendSpriteToBack(this);
    }

    /**
     * _refreshCostume - Sets the costume and sprite width and hight then refreshes element.
     *
     * @private
     */
    _refreshCostume() {
        if (this.costume) {
            this.width = this.costume.visibleWidth;
            this.height = this.costume.visibleHeight;
        }

        this.element ? this.element.update(this) : null;
    }

    /**
     * addCostume - Adds a costume to the sprite
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let costume = new blockLike.Costume();
     *
     * sprite.addTo(stage);
     * sprite.addCostume(costume);
     *
     * @param {object} costume - the costume to add.
     */
    addCostume(costume) {
        this.costumes.push(costume);

        // if "bare" set the added as active.
        if (!this.costume) {
            this.costume = this.costumes[0];
            this.width = this.costume.visibleWidth;
            this.height = this.costume.visibleHeight;
        }

        this.element ? this.element.update(this) : null;
    }

    /**
     * switchCostumeTo - Switches to specified costume. If not found fails silently.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let costume = new blockLike.Costume();
     *
     * sprite.addTo(stage);
     * sprite.addCostume(costume);
     * sprite.switchCostumeTo(costume);
     *
     * @param {object} backdrop - the costume to switch too.
     */
    switchCostumeTo(costume) {
        const currentCostumeIndex = this.costumes.indexOf(costume);
        currentCostumeIndex !== -1
            ? (this.costume = this.costumes[currentCostumeIndex])
            : null;

        this._refreshCostume();
    }

    /**
     * switchCostumeToNum - Switches to specified costume by number of current (0 is first). If not found fails silently.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let costume = new blockLike.Costume();
     *
     * sprite.addTo(stage);
     * sprite.addCostume(costume);
     * sprite.switchCostumeToNum(1);
     *
     * @param {number} index - the costume to switch too.
     */
    switchCostumeToNum(index) {
        this.switchCostumeTo(this.costumes[index]);
    }

    /**
     * nextCostume - Switches to the next costume.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let costume = new blockLike.Costume();
     *
     * sprite.addTo(stage);
     * sprite.addCostume(costume);
     * sprite.nextCostume();
     *
     */
    nextCostume() {
        const currentCostumeIndex = this.costumes.indexOf(this.costume);
        this.costume =
            this.costumes[(currentCostumeIndex + 1) % this.costumes.length];

        this._refreshCostume();
    }

    /**
     * removeCostume - Removes a costume.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let costume = new blockLike.Costume();
     *
     * sprite.addTo(stage);
     * sprite.addCostume(costume);
     * sprite.removeCostume(costume);
     *
     * @param {object} costume - the costume to remove.
     */
    removeCostume(costume) {
        if (this.costumes.length > 1) {
            const currentCostumeIndex = this.costumes.indexOf(costume);
            this.costume === costume
                ? (this.costume =
                      this.costumes[
                          (currentCostumeIndex + 1) % this.costumes.length
                      ])
                : null;
            this.costumes = this.costumes.filter(item => item !== costume);
        } else {
            this.costumes = [];
            this.costume = null;
        }
        this._refreshCostume();
    }

    /**
     * removeCostumeNum - Removes the specified costume by number of current (0 is first).
     * If there is only one costume, will fail and emit a console message.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let costume = new blockLike.Costume();
     *
     * sprite.addTo(stage);
     * sprite.addCostume(costume);
     * sprite.removeCostumeNum(1);
     *
     * @param {number} index - the costume to remove.
     */
    removeCostumeNum(index) {
        this.removeCostume(this.costumes[index]);
    }

    /**
     * show - Shows the sprite. By default sprites are shown.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.hide();
     * sprite.show();
     *
     */
    show() {
        this.showing = true;
        this.element ? this.element.update(this) : null;
    }

    /**
     * hide - Hides the sprite. By default sprites are shown.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.hide();
     *
     */
    hide() {
        this.showing = false;
        this.element ? this.element.update(this) : null;
    }

    /**
     * refresh - Forces a sprite refresh.
     * Note: service method to be used if costume was manipulated directly.
     */
    refresh() {
        // wait a sec...
        // TODO: This is to accomodate dynamic image resize. Not ideal. Should be event driven.
        setTimeout(() => {
            // in case costume was resized force a reset of size.
            this.setSize(this.magnification);
            // then refresh the DOM.
            this.element ? this.element.update(this) : null;
        }, this.pace);
    }

    /**
     * resizeToImage - sets the width and height of the sprite to that of the image file of current costume.
     * Note: service method. Similar to calling resizeToImage() on costume and then refresh() on sprite.
     *
     * @example
     * const sprite = new blockLike.Sprite(null);
     *
     * const angrySheep = new blockLike.Costume({
     *   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Emojione_1F411.svg/200px-Emojione_1F411.svg.png',
     * });
     * angrySheep.addTo(sprite);
     *
     * sprite.resizeToImage();
     * sprite.addTo(stage);
     */
    resizeToImage() {
        if (this.costume) {
            this.costume.resizeToImage();
        }

        this.refresh();
    }

    /**
     * inner - Places an HTML element inside the current costume of the sprite.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.inner('<p class="big centered rainbow">:)</p>');
     *
     * @example
     * sprite.inner('I like text only');
     *
     * @param {object} el - the DOM element.
     */
    inner(html) {
        this.costume.inner(html);
        this.element ? this.element.update(this) : null;
    }

    /**
     * insert - Places a DOM element inside the current costume of the sprite.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.insert(document.getElementById('my-html-creation'));
     *
     * @param {object} el - the DOM element.
     */
    insert(el) {
        this.costume.insert(el);
        this.element ? this.element.update(this) : null;
    }

    /**
     * _refreshSize - Sets the sprite width and hight in relation to original then refreshes element.
     *
     * @private
     * @param {object} costume - the costume to add.
     */
    _refreshSize() {
        /**
         * decimalRound - rounds a number too decimal points.
         *
         * @param {number} value - the value to round.
         * @param {number} points - how many decimal points to leave.
         */
        function decimalRound(value, points) {
            return Math.round(value * 10 ** points) / 10 ** points;
        }

        if (this.costume) {
            this.width = decimalRound(
                this.costume.width * (this.magnification / 100),
                2
            );
            this.height = decimalRound(
                this.costume.height * (this.magnification / 100),
                2
            );

            this.costumes.forEach(item => {
                const costume = item;
                costume.visibleWidth = decimalRound(
                    costume.width * (this.magnification / 100),
                    2
                );
                costume.visibleHeight = decimalRound(
                    costume.height * (this.magnification / 100),
                    2
                );
            });

            this.costume.visibleWidth = this.width;
            this.costume.visibleHeight = this.height;

            this.element ? this.element.update(this) : null;
        }
    }

    /**
     * changeSize - Changes the size of the sprite by specified percentage number.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.changeSize(50);
     *
     * @param {number} change - the percentage change.
     */
    changeSize(change) {
        this.magnification += change;
        this._refreshSize();
        return this._paced();
    }

    /**
     * setSize - Sets the size of the sprite to the specified percentage number.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.setSize(150);
     *
     * @param {number} percent - the percentage to set.
     */
    setSize(percent) {
        this.magnification = percent;
        this._refreshSize();
        return this._paced();
    }

    /** Text UI * */

    /**
     * think - Creates a "think bubble" over the sprite.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.think('I think therefore I am.');
     *
     * @param {string} text - the text inside the bubble.
     */
    think(text) {
        if (this.element) {
            this.textui = this.textui?.delete(this);
            (text || text === 0 || text === false) && (this.textui = new TextUiElement(this, "think", text));
        }
    }

    /**
     * thinkWait - Creates a "think bubble" over the sprite for a specified number of seconds.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.thinkWait('I think therefore I am.', 3);
     *
     * @param {string} text - the text inside the bubble.
     * @param {number} sec - the number of seconds to wait.
     */
    async thinkWait(text, sec) {
        this.think(text);
        await this.wait(sec);
        this.think("");
    }

    /**
     * say - Creates a "speech bubble" over the sprite.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.say('It is not the consciousness of men that determines their being, but, on the contrary, their social being that determines their consciousness.');
     *
     * @param {string} text - the text inside the bubble.
     */
    say(text) {
        if (this.element) {
            this.textui = this.textui?.delete(this);
            (text || text === 0 || text === false) && (this.textui = new TextUiElement(this, "say", text));
        }
    }

    /**
     * sayWait - Creates a "speech bubble" over the sprite for a specified number of seconds.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.sayWait('It is not the consciousness of men that determines their being, but, on the contrary, their social being that determines their consciousness.', 3);
     *
     * @param {string} text - the text inside the bubble.
     * @param {number} sec - the number of seconds to wait.
     */
    async sayWait(text, sec) {
        this.say(text);
        await this.wait(sec);
        this.say("");
    }

    /**
     * ask - Creates an "ask bubble" over the sprite.
     * Allows for an input box to be displayed to the user and
     * capture user input into the variable specified by the user.
     * Note - variable for answer must be declared in global scope.
     *
     * @example
     * //good:
     * let answer;
     * sprite.whenClicked( function() {
     *   answer = this.ask('Is the destiny of mankind decided by material computation?');
     *   this.say(answer);
     * });
     *
     * // bad:
     * sprite.whenClicked( function() {
     *   let answer;
     *   answer = this.ask('Is the destiny of mankind decided by material computation?');
     *   this.say(answer);
     * });
     *
     * @param {string} text - the text of the question
     *
     */
    ask(text) {
        const me = this;
        this.askId = this._generateUUID();

        if (this.element) {
            this.textui?.delete(this);
            this.textui = new TextUiElement(this, "ask", text);

            return new Promise(resolve => {
                // this will wait for user input
                document.addEventListener(
                    `blockLike.ask.${this.id}.${this.askId}`,
                    e => {
                        // remove the UI.
                        this.textui
                            ? (this.textui = this.textui.delete(me))
                            : null;
                        resolve(e.detail.value);
                    },
                    {once: true}
                );
            });
        }
    }

    /** Pen * */

    /**
     * penClear - Clears the drawing surface.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.penClear();
     * });
     *
     */
    penClear() {
        this.surface.clear(this);
    }

    /**
     * penDown - "Activates" drawing by setting required values.
     * When activated sprite motion will create the drawing on the stage's canvas.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.penDown();
     *   this.move(100);
     * });
     *
     */
    penDown() {
        this.drawing = true;
        this.prevX = this.x;
        this.prevY = this.y;
        this.surface.draw(this);
    }

    /**
     * penUp - "Deactivates" drawing by setting required values.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.penDown();
     *   this.move(100);
     *   this.penUp();
     * });
     *
     */
    penUp() {
        this.drawing = false;
        this.surface.draw(this);
    }

    /**
     * setPenColor - Sets the color of the pen.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.setPenColor('#ff0000')
     *
     * @example
     * sprite.setPenColor('red')
     *
     * @param {string} colorString - a valid color definition for canvas strokeStyle.
     */
    setPenColor(colorString) {
        this.penColor = colorString;
    }

    /**
     * setPenSize - Sets the size of the pen.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.setPenSize(10);
     *
     * @param {number} pixels - a number for canvas lineWidth.
     */
    setPenSize(pixels) {
        this.penSize = pixels;
    }

    /**
     * changePenSize - Changes the size of the pen.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   this.changePenSize(10);
     * });
     *
     * @param {number} change - the change in pixels.
     */
    changePenSize(change) {
        this.penSize += change;
    }

    /* Sensing */

    /**
     * distanceTo - Returns the distance to a point on the screen.
     *
     * @example
     * let stage = new blockLike.Stage({sensing: true});
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     *
     * stage.whenClicked( function() {
     *  sprite.say(this.distanceTo(this.mouseX, this.mouseY))
     * });
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let sprite = new blockLike.otherSprite();
     *
     * sprite.addTo(stage);
     * otherSprite.addTo(stage);
     *
     * stage.whenClicked( function() {
     *  sprite.say(this.distanceTo(otherSprite.x, otherSprite.y))
     * });
     *
     * @param {number} x - the x coordinate.
     * @param {number} y - the y coordinate.
     * @return {number} - distance in pixels to position on screen (not rounded).
     */
    distanceTo(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * touchingEdge - Checks is this sprite touches the edge of the stage and returns the edge touched.
     *
     * Notes:
     * 1. This is based on rectangular collision detection.
     * 2. this compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *  while(this.x < stage.width / 2) {
     *    this.move(10)
     *    this.say(this.touchingEdge());
     *   }
     * });
     *
     * @return {string} - the side of the stage that is touched (null, top, bottom, left, right)
     */
    touchingEdge() {
        let result = null;

        if (this.x + this.width / 2 > this.stage.width / 2) {
            result = "right";
        }
        if (this.x - this.width / 2 < -1 * (this.stage.width / 2)) {
            result = "left";
        }
        if (this.y + this.height / 2 > this.stage.height / 2) {
            result = "top";
        }
        if (this.y - this.height / 2 < -1 * (this.stage.height / 2)) {
            result = "bottom";
        }

        return result;
    }

    /**
     * isTouchingEdge - Checks is this sprite touches the edge.
     *
     * Notes:
     * 1. This is based on rectangular collision detection.
     * 2. this compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *  while(this.x < stage.width / 2) {
     *    this.move(10)
     *    this.say(this.isTouchingEdge());
     *   }
     * });
     *
     * @return {boolean} - is the sprite touching the edge.
     */
    isTouchingEdge() {
        return !!this.touchingEdge();
    }

    /**
     * touching - Checks is this sprite touches another and returns at what side it touches.
     *
     * Notes:
     * 1. this compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
     * 2. if the sprite has gone "into" the other the side "penetrated more" will be returned.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let otherSprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * otherSprite.addTo(stage);
     * otherSprite.move(200);
     * sprite.whenClicked( function() {
     *  while(!this.touching(otherSprite)) {
     *    this.move(10);
     *    this.say(this.touching(otherSprite))
     *   }
     * });
     *
     * @param {string} sprite - the sprite to check if touching.
     * @return {string} - the side of the sprite that is touched (null, top, bottom, left, right)
     */
    touching(sprite) {
        let result = null;

        if (
            this.x + this.width / 2 > sprite.x - sprite.width / 2 &&
            this.x - this.width / 2 < sprite.x + sprite.width / 2 &&
            this.y + this.height / 2 > sprite.y - sprite.height / 2 &&
            this.y - this.height / 2 < sprite.y + sprite.height / 2
        ) {
            this.x >= sprite.x ? (result = "left") : null;
            this.x < sprite.x ? (result = "right") : null;
            this.y > sprite.y &&
            Math.abs(this.y - sprite.y) > Math.abs(this.x - sprite.x)
                ? (result = "bottom")
                : null;
            this.y < sprite.y &&
            Math.abs(this.y - sprite.y) > Math.abs(this.x - sprite.x)
                ? (result = "top")
                : null;
        }

        return result;
    }

    /**
     * isTouching - Checks is this sprite touches another.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     * let otherSprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * otherSprite.addTo(stage);
     * otherSprite.move(200);
     * sprite.whenClicked( function() {
     *  while(!this.isTouching(otherSprite)) {
     *    this.move(10);
     *   }
     * });
     *
     * @param {string} sprite - the sprite to check if touching.
     * @return {boolean} - is the sprite touching the specified sprite.
     */
    isTouching(sprite) {
        return !!this.touching(sprite);
    }

    /**
     * touchingBackdropColor - Returns the hex value to all pixels in backdrop area covered by the sprite rectangle.
     *
     * Notes:
     * 1. This is based on rectangular collision detection.
     * 2. This compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
     * 3. The backdrop image must be a local image served from same origin.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.whenClicked( function() {
     *   while(true){
     *     let touchedColors = this.touchingBackdropColor();
     *     this.say(touchedColors);
     *     this.move(5);
     *   }
     * });
     *
     * @return {array} - colors (strings) touched.
     */
    touchingBackdropColor() {
        const result = [];

        /**
         * rgbToHex - converts a color defined by RGB values into a on defined as a hex string.
         *
         * From: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
         *
         * @param {number} r - the red value (0 to 255).
         * @param {number} g - the green value (0 to 255).
         * @param {number} b -  the blue value (0 to 255).
         * @return {string} - hex color string.
         */
        function rgbToHex(r, g, b) {
            return `#${((1 << 24) + (r << 16) + (g << 8) + b)
                .toString(16)
                .slice(1)}`; // eslint-disable-line no-bitwise
        }

        try {
            const backdropContext = this.againstBackdrop.getContext("2d");
            const data = backdropContext.getImageData(
                this.stage.width / 2 - this.width / 2 + this.x,
                this.stage.height / 2 - this.height / 2 - this.y,
                this.width,
                this.height
            ).data;

            for (let i = 0; i < data.length; i += 4) {
                data[i + 3] !== 0
                    ? result.push(rgbToHex(data[i], data[i + 1], data[i + 2]))
                    : null;
            }
        } catch (e) {
            console.log(
                "BlockLike.js Notice: isTouchingBackdropColor() ingnored. Backdrop image can not be located at a remote origin."
            ); // eslint-disable-line no-console
        }

        return Array.from(new Set(result));
    }

    /**
     * isTouchingBackdropColor - compares a given hex value to all pixels in backdrop area covered by the sprite rectangle.
     * If a match is found the color is returned.
     *
     * Notes:
     * 1. This is based on rectangular collision detection.
     * 2. This compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
     * 3. The backdrop image must be a local image served from same origin.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * let moving = true;
     * sprite.whenClicked( function() {
     *   while(moving){
     *     this.isTouchingBackdropColor('#ff0000') ? moving = false : moving = true;
     *     this.move(5);
     *   }
     * });
     *
     * @param {string} backdropColor - the color to evaluate.
     * @return {boolean} - does the sprite touch the color.
     */
    isTouchingBackdropColor(backdropColor) {
        const hexArr = this.touchingBackdropColor(backdropColor);

        return hexArr.includes(backdropColor);
    }
    /**
     * isKeyPressed - Checks if a key is pressed. Stage sensing must be enabled.
     *
     * @example
     * let stage = new blockLike.Stage();
     * let sprite = new blockLike.Sprite();
     *
     * sprite.addTo(stage);
     * sprite.say(stage.isKeyPressed('a'));
     *
     * @param {string} userKey - the key pressed. May be the code or the character itself (A or 65)
     * @param {function} func - a function to rewrite and execute.
     */
    isKeyPressed(check) {
        return this.stage.keys.includes(check);
    }

    get mouseX() {
        return this.stage.mouseX;
    }

    get mouseY() {
        return this.stage.mouseY;
    }

    get mouseDown() {
        return this.stage.mouseDown;
    }
}
