/**
 * Class representing the stage surface on which sprites draw.
 * Each Stage has one.
 * @private
 */
export default class StageSurface {
	/**
	 * constructor - Creates a Stage.
	 *
	 * @param {object} stage - the stage on which the sprite is drawing.
	 */
	constructor(stage) {
		/** @type {CanvasRenderingContext2D} */
		this.context = stage.element.context;
	}

	/**
	 * draw - draws a line "behind" a moving sprite.
	 * Note: sprite always has current and previous x,y values to allow drawing to previous location.
	 *
	 * @param {object} sprite - the sprite drawing the line.
	 */
	draw(sprite) {
		if (sprite.drawing) {
			this.context.beginPath();
			this.context.moveTo(sprite.stage.width / 2 + sprite.x, sprite.stage.height / 2 + sprite.y * -1);
			this.context.lineTo(sprite.stage.width / 2 + sprite.prevX, sprite.stage.height / 2 + sprite.prevY * -1);
			this.context.lineWidth = sprite.penSize;
			this.context.strokeStyle = sprite.penColor;
			this.context.stroke();
		}
	}

	/**
	 * @param {import("./sprite").default} sprite
	 */
	stamp(sprite) {
		if (!sprite.showing) {
			return;
		}
		this.context.save();
		this.context.filter = sprite.getCSSFilter();
		this.context.globalAlpha = sprite.opacity;
		if (sprite.rotationStyle === 0) {
			this.context.rotate((sprite.rotation * Math.PI) / 180);
		} else if (sprite.rotationStyle === 1) {
			this.context.scale((Math.floor(sprite.direction / 180) * 2 - 1) * -1, 1);
		}
		const width = sprite.costume.visibleWidth;
		const height = sprite.costume.visibleHeight;
		if (sprite.costume.image) {
			const image = new Image();

			image.onload = () => {
				// Draw at the center
				this.context.drawImage(
					image,
					0,
					0,
					image.width,
					image.height,
					sprite.x - width / 2 + sprite.stage.width / 2,
					sprite.y * -1 - height / 2 + sprite.stage.height / 2,
					width,
					height
				);
			};

			image.src = sprite.costume.image;
		} else if (sprite.costume.color) {
			this.context.fillStyle = sprite.costume.color;
			// Draw at the center
			this.context.fillRect(
				sprite.x - width / 2 + sprite.stage.width / 2,
				sprite.y * -1 - height / 2 + sprite.stage.height / 2,
				width,
				height
			);
		}

		this.context.restore();
	}

	/**
	 * clear - clears the canvas
	 */
	clear(sprite) {
		this.context.clearRect(0, 0, sprite.stage.width, sprite.stage.height);
	}
}
