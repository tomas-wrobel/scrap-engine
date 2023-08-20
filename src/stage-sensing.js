/**
 * Encapsulates the stage sensing functionality.
 */

/**
 * enable - Enables sensing of document level events (keydown, mousemove, mousedown, touchmove)
 */
export default function enable(stage) {
    const me = stage;
    me.sensing = true;

    /**
     * decimalRound - rounds a number too decimal points.
     *
     * @param {number} value - the value to round.
     * @param {number} points - how many decimal points to leave.
     */
    function decimalRound(value, points) {
        return Math.round(value * 10 ** points) / 10 ** points;
    }

    /**
     * computeX - Computes centered x based on x extracted from event.
     */
    function computeX(x) {
        const mag = me.magnification / 100;
        return decimalRound(
            (x - me.element.el.offsetLeft - me.width / 2) / mag,
            2
        );
    }

    /**
     * computeY - Computes centered y based on y extracted from event.
     */
    function computeY(y) {
        const mag = me.magnification / 100;
        return decimalRound(
            (-y + me.element.el.offsetTop + me.height / 2) / mag,
            2
        );
    }

    document.addEventListener("keydown", e => {
        if (!me.keys.includes(e.key)) {
            me.keys.push(e.key);
        }
    });

    document.addEventListener("keyup", e => {
        me.keys = me.keys.filter(key => key !== e.key);
    });

    me.element.el.addEventListener("mousemove", e => {
        me.mouseX = computeX(e.clientX);
        me.mouseY = computeY(e.clientY);
    });

    me.element.el.addEventListener(
        "touchmove",
        e => {
            me.mouseX = computeX(e.changedTouches[0].clientX);
            me.mouseY = computeY(e.changedTouches[0].clientY);
        },
        {passive: true}
    );

    me.element.el.addEventListener("mousedown", () => {
        me.mouseDown = true;
    });
    me.element.el.addEventListener("mouseup", () => {
        me.mouseDown = false;
    });

    me.element.el.addEventListener(
        "touchstart",
        e => {
            me.mouseX = computeX(e.touches[0].clientX);
            me.mouseY = computeY(e.touches[0].clientY);
            me.mouseDown = true;
        },
        {passive: true}
    );

    me.element.el.addEventListener("touchend", () => {
        me.mouseDown = false;
        me.mouseX = null;
        me.mouseY = null;
    });
}
