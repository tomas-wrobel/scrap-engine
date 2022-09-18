var blockLike;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/backdrop.js":
/*!*************************!*\
  !*** ./src/backdrop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Backdrop)
/* harmony export */ });
/* harmony import */ var _look__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./look */ "./src/look.js");


/**
 * Class representing a Backdrop.
 * Backdrops can be added to the Stage.
 * @extends Look
 *
 * @example
 * let backdrop = new blockLike.Backdrop();
 *
 * @example
 * let backdrop = new blockLike.Backdrop({
 *   image: 'https://www.blocklike.org/images/backdrop.svg'
 * });
 *
 * @example
 * let backdrop = new blockLike.Backdrop({
 *   color: '#A2DAFF'
 * });
 */
class Backdrop extends _look__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
  * constructor - Creates a Backdrop to be used by Stage objects.
  *
  * @param {object} options - options for the backdrop.
  * @param {string} options.image - a URI (or data URI) for the backdrop image.
  * @param {string} options.color - a css color string ('#ff0000', 'red')
  */
  constructor (options = {}) {
    const defaults = {}
    const actual = { ...defaults, ...options }

    super()

    this.image = actual.image
    this.color = actual.color

    // preload
    if (this.image) {
      const image = new window.Image()
      image.src = this.image
    }
  }

  /** Setup Actions * */

  /**
  * addTo - Adds the backdrop to the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.addTo(stage);
  *
  * @param {object} stage - which stage to add the backdrop too.
  */
  addTo (stage) {
    const curStage = stage
    stage.backdrops.push(this)
    // if "bare" set the added as active
    !stage.backdrop ? curStage.backdrop = stage.backdrops[0] : null
    stage.element ? stage.element.update(stage) : null
  }

  /**
  * removeFrom - Removes the backdrop to the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.addTo(stage);
  * backdrop.removeFrom(stage);
  *
  * @param {object} stage - which stage to remove the backdrop from.
  */
  removeFrom (stage) {
    stage.removeBackdrop(this)
  }
}


/***/ }),

/***/ "./src/costume.js":
/*!************************!*\
  !*** ./src/costume.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Costume)
/* harmony export */ });
/* harmony import */ var _look__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./look */ "./src/look.js");


/**
 * Class representing a Costume.
 * Costumes can be added to a Sprite.
 * @extends Look
 *
 * @example
 * let costume = new blockLike.Costume();
 *
 * @example
 * let costume = new blockLike.Costume({
 *   width: 50,
 *   height: 50,
 *   color: '#A2DAFF',
 *   image: 'https://www.blocklike.org/images/sheep_step.png'
 * });
 */
class Costume extends _look__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
  * constructor - Creates a Costume to be used by Sprite objects..
  *
  * @param {object} options - options for the costume.
  * @param {number} options.width - the costume width in pixels. Default is 100.
  * @param {number} options.height - the costume height in pixels. Default is 100.
  * @param {string} options.image - a URI (or data URI) for the costume image.
  * @param {string} options.color - a css color string ('#ff0000', 'red')
  */
  constructor (options = {}) {
    const defaults = {
      width: 100,
      height: 100,
      color: null
    }
    const actual = { ...defaults, ...options }

    super()

    this.width = actual.width
    this.height = actual.height
    this.visibleWidth = actual.width
    this.visibleHeight = actual.height

    this.image = actual.image
    this.color = actual.color

    // preload
    if (this.image) {
      const image = new window.Image()
      image.src = this.image
    }

    this.innerHTML = ''
  }

  /** Setup Actions * */

  /**
  * addTo - Adds the costume to the sprite
  *
  * @example
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * costume.addTo(sprite);
  *
  * @param {object} sprite - which sprite to add the costume too.
  */
  addTo (sprite) {
    const curSprite = sprite
    sprite.costumes.push(this)

    // if "bare" set the added as active.
    if (!sprite.costume) {
      curSprite.costume = sprite.costumes[0]
      curSprite.width = sprite.costume.visibleWidth
      curSprite.height = sprite.costume.visibleHeight
    }

    sprite.element ? sprite.element.update(sprite) : null
  }

  /**
  * removeFrom - Removes the costume from to the sprite
  *
  * @example
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * costume.addTo(sprite);
  * costume.removeFrom(sprite);
  *
  * @param {object} sprite - which sprite to remove the costume from.
  */
  removeFrom (sprite) {
    sprite.removeCostume(this)
  }

  /** Looks * */

  /**
  * resizeToImage - sets the width and height of the costume to that of the image file.
  *
  * @example
  * let costume = new blockLike.Costume({
  *   image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Sheep_in_gray.svg'
  * });
  *
  * costume.resizeToImage();
  */
  resizeToImage () {
    // register the image size from the file
    if (this.image) {
      const image = new window.Image()
      const me = this

      image.src = this.image

      image.addEventListener('load', () => {
        me.width = image.width
        me.height = image.height
        me.visibleWidth = me.width
        me.visibleHeight = me.height
      })
    }
  }

  /**
  * inner - Places an HTML element inside the costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.inner('<p class="big centered rainbow">:)</p>');
  *
  * @example
  * costume.inner('I like text only');
  *
  * @param {string} html - the html to insert.
  */
  inner (html) {
    this.innerHTML = html
  }

  /**
  * insert - Places a DOM element inside the costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.insert(document.getElementById('my-html-creation'));
  *
  * @param {object} el - the DOM element.
  */
  insert (el) {
    const iel = el.cloneNode(true)
    iel.style.display = 'block'
    iel.style.visibility = 'inherit'

    this.image = null
    this.color = 'transparent'
    this.innerHTML = iel.outerHTML
  }
}


/***/ }),

/***/ "./src/document-css.js":
/*!*****************************!*\
  !*** ./src/document-css.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "askCSS": () => (/* binding */ askCSS),
/* harmony export */   "defaultCSS": () => (/* binding */ defaultCSS),
/* harmony export */   "sayCSS": () => (/* binding */ sayCSS),
/* harmony export */   "thinkCSS": () => (/* binding */ thinkCSS),
/* harmony export */   "uiCSS": () => (/* binding */ uiCSS)
/* harmony export */ });
/**
* Collection of css strings to be injected to the head section of a page.
* @private
*/
const defaultCSS = `
* { 
  box-sizing: border-box;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-touch-callout:none;                /* prevent callout to copy image, etc when tap to hold */
  -webkit-tap-highlight-color:rgba(0,0,0,0); /* prevent tap highlight color / shadow */
}
html, body{
  margin:0;
  padding:0;
}
`

const uiCSS = `
.blocklike-flag {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 65px;
  line-height: 65px;
  padding: 32px;
  color: #222;
  background: #fafafa;
  border: 2px solid #666;
  border-radius: 65px;
}
`

const thinkCSS = `
.blocklike-think {
  position: absolute;
  min-width: 60px;
  max-width: 200px;
  left: 200px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  min-height: 16px;
  line-height: 16px;
  text-align: left;
  color: #222;
  background: #fafafa;
  border: 2px solid #444;
  border-radius: 20px;
}
.blocklike-think:before {
  position:absolute;
  bottom: -30px;
  left: 0px;
  width: 30px;
  height: 30px;
  background: #fafafa;
  border: 2px solid #444;
  border-radius: 20px;
  content: "";
}
.blocklike-think:after {
  position: absolute;
  bottom: -45px;
  left: 0px;
  width: 15px;
  height: 15px;
  background: #fafafa;
  border: 2px solid #444;
  border-radius: 15px;
  content: "";
}
`

const sayCSS = `
.blocklike-ask,
.blocklike-say {
  position: absolute;
  display: inline-block;
  min-width: 60px;
  max-width: 200px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  min-height: 16px;
  line-height: 16px;
  text-align: left;
  background-color: #fafafa;
  border: 2px solid #444;
  border-radius: 20px;
}
.blocklike-ask:before,
.blocklike-say:before {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 13px;
  right: auto;
  top: auto;
  bottom: -33px;
  border: 16px solid;
  border-color: #444 transparent transparent #444;
}
.blocklike-ask:after,
.blocklike-say:after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 15px;
  right: auto;
  top: auto;
  bottom: -28px;
  border: 16px solid;
  border-color: #fafafa transparent transparent #fafafa;
}
`

const askCSS = `
.blocklike-ask input {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding: 2px;
  margin: 2px;
  width: 75%;
}
.blocklike-ask button {
  font-size: 16px;
  line-height: 16px;
  height: 26px;
  padding: 0 5px;
  margin: 0;
}
`


/***/ }),

/***/ "./src/element-css.js":
/*!****************************!*\
  !*** ./src/element-css.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apply": () => (/* binding */ apply),
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
/**
* Encapsulates the functionality of managing element style properties for the entities.
*/

/**
* apply - apply cssRules of an entity to its DOM element.
*
* @param {function} entity - a Sprite or Stage.
*/
function apply (entity) {
  const curEntity = entity
  // Sprites have Costumes, Stage has Backdrop, figure out which entity it is.
  const curLook = entity.backdrop || entity.costume
  const curLooks = entity.backdrops || entity.costumes

  const el = entity.element.el

  // remove any style applied by any look
  if (curLooks) {
    curLooks.forEach((b) => {
      b.cssRules.forEach((item) => {
        const camelCased = item.prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
        el.style[camelCased] = ''
      })
    })
  }

  // add current look styles
  if (curLook) {
    curLook.cssRules.forEach((item) => {
      const camelCased = item.prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      el.style[camelCased] = item.value
    })
  }

  // Add curEntity styles. Must be done after look styles.
  curEntity.cssRules.forEach((item) => {
    const camelCased = item.prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    el.style[camelCased] = item.value
  })
}

/**
* register - register cssRules of for an entity based on user input.
* Note: All rules are registered dash-case a-la css.
* This is regardless of how they are set and though they are used camelCase.
*
* @param {string} prop - the css property (e.g. color). Alternatively an object with key: value pairs.
* @param {string} value - the value for the css property (e.g. #ff8833)
* @param {function} entity - a Sprite or Stage.
*/
function register (prop, value, entity) {
  const curEntity = entity

  if (typeof prop === 'string' && typeof value === 'string') {
    const dashed = prop.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
    curEntity.cssRules.push({ prop: dashed, value })
  } else if (typeof prop === 'object' && !value) {
    Object.keys(prop).forEach((key) => {
      const dashed = key.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
      curEntity.cssRules.push({ prop: dashed, value: prop[key] })
    })
  }
}


/***/ }),

/***/ "./src/entity.js":
/*!***********************!*\
  !*** ./src/entity.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Entity)
/* harmony export */ });
/* harmony import */ var _rewriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rewriter */ "./src/rewriter.js");
/* harmony import */ var _element_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element-css */ "./src/element-css.js");



/**
 * Class representing an entity.
 * Abstract for Stage and Sprite.
 * Do not instantiate objects directly from this class.
 *
 * @private
 */
class Entity {
  /**
  * constructor - Entity is abstract for Stage and Sprite.
  *
  * @param {number} pace - the number of milliseconds to pace paced methods.
  */
  constructor (pace) {
    Entity.messageListeners = []
    this.id = this._generateUUID()
    this.pace = pace
    this.sounds = [] // will hold all sounds currently played by entity, if any.
    /*
    * Paced methods work in the following manner:
    * 1. Event Method functions are rewritten.
    * 2. For paced methods rewriter will add an await to a promise after the paced method call.
    * 3. The promise will resolve after {pace} milliseconds.
    *
    * This allows the paced method to halt execution of any code following it until it is done.
    */
    this.paced = [
      'goTo',
      'move',
      'changeX',
      'changeY',
      'setX',
      'setY',
      'goTowards',
      'turnRight',
      'turnLeft',
      'pointInDirection',
      'pointTowards',
      'changeSize',
      'setSize',
      'say',
      'think',
      'refresh'
    ]

    /*
    * Waited methods work in the following manner:
    * 1. Event Method functions are rewritten.
    * 2. For waited methods rewriter will add an await to a promise after the waited method call.
    * 3. The promise includes a document level event listener.
    * 4. rewriter modifies the waited method call, inserting a triggeringId parameter.
    * 4. The event listener is unique to the triggeringId.
    * 5. When the method completes running an event is dispatched resolving the promise.
    *
    * This allows the waited method to halt execution of any code following it until it is done.
    */
    this.waited = [
      'wait',
      'glide',
      'sayWait',
      'thinkWait',
      'playSoundUntilDone',
      'broadcastMessageWait'
    ]

    /*
    * waitedRetunred methods work similarly to waited methods only that they enable capturing a value
    * into a globally declared variable (or an undeclared one).
    * 1. Event Method functions are rewritten.
    * 2. For waitedReturned methods rewriter will add an await to a promise after the waited method call.
    * 3. The promise includes a document level event listener.
    * 4. rewriter modifies the waited method call, inserting:
    *   - the name of the variable into which a value is returned.
    *   - a triggeringId parameter.
    * 4. The event listener is unique to the triggeringId.
    * 5. When the method completes running an event is dispatched resolving the promise.
    * 6. The value returned is transfered into the variable using eval.
    *
    * This allows the waited method to halt execution of any code following it until it is done.
    * At which point the variable has "captured" the value.
    */
    this.waitedReturned = [
      'invoke',
      'ask'
    ]

    /*
    * Event methods (evented) are containers for functions to be rewritten.
    * When an event method is nested inside another the code of the inner method is NOT rewritten.
    */
    this.evented = [
      'whenFlag',
      'whenLoaded',
      'whenClicked',
      'whenKeyPressed',
      'whenEvent',
      'whenReceiveMessage',
      'whenCloned'
    ]
  }

  /**
  * _generateUUID - generates a unique ID.
  * Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  *
  * @private
  * @return {string} - a unique id.
  */
  _generateUUID () {
    let d
    let r

    d = new Date().getTime()

    if (window.performance && typeof window.performance.now === 'function') {
      d += window.performance.now() // use high-precision timer if available
    }

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      r = (d + Math.random() * 16) % 16 | 0 // eslint-disable-line no-mixed-operators, no-bitwise
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16) // eslint-disable-line no-mixed-operators, no-bitwise
    })

    return uuid
  }

  /**
  * _releaseWaited - releases a waited promise by dispatching an event.
  *
  * @private
  * @param {string} triggeringId - the name of the event that invoked the code that requested the wait.
  */
  _releaseWaited (triggeringId) {
    const event = new window.CustomEvent(`blockLike.waited.${triggeringId}`, { detail: { value: 0 } })
    document.dispatchEvent(event)
  }

  /**
  * _setToVar - sets a globally scoped user defined variable who's name is specified as a a string
  * with the value provided.
  *
  * @private
  * @param {varString} text - the name of the variable to which value should be set.
  * @param {any} value - the value to set.
  */
  _setToVar (varString, value) {
    try {
      eval(`${varString} = '${value}'`) // eslint-disable-line no-eval
    } catch (error) {
      throw ('BlockLike.js Error: Variables accepting a value must be declared in the global scope.') // eslint-disable-line no-throw-literal
    }
  }

  /**
  * _exec - asynchronous function execution.
  * This is what creates the "paced" execution of the user supplied functions.
  *
  * @private
  * @param {function} func - a function to rewrite and execute.
  * @param {array} argsArr - an array of arguments to pass to the function.
  */
  _exec (func, argsArr) {
    const me = this
    me.triggeringId = this._generateUUID()
    const f = (0,_rewriter__WEBPACK_IMPORTED_MODULE_0__["default"])(func, me)
    return f.apply(me, argsArr)
  }

  /**
  * invoke - invoke a function. Allows passing an argument or array of arguments.
  * Function will be "paced" and code execution will be "waited" until it is completed.
  *
  * @example
  * sprite.whenFlag(() => {
  *   this.invoke(jump);
  *   this.invoke(talk, 'hi');
  *   this.invoke(pattern, [5, 50, 12]);
  * });
  *
  * @param {function} func - a function to rewrite and execute.
  * @param {array} argsArr - an array of arguments to pass to the function. A single variable also accepted.
  */
  invoke (func, argsArr, theVar = null, triggeringId = null) {
    // theVar and triggeringId are not user supplied, they are inserted by rewriter.
    let args = argsArr
    !(argsArr instanceof Array) ? args = [argsArr] : null

    this._exec(func, args).then((result) => {
      // this is the waited method listener. release it.
      this._releaseWaited(triggeringId)
      // set the user defined variable to the captured value.
      theVar ? this._setToVar(theVar, result) : null
    })
  }

  /**
  * wait - creates a pause in execution.
  *
  * @example
  * this.wait(5);
  *
  * @example
  * let time = 5;
  * this.wait(time * 0.95);
  *
  * @param {number} sec - number of seconds to wait. Must be an actual number.
  */
  wait (sec, triggeringId = null) {
    // triggeringId is not user supplied, it is inserted by rewriter.
    setTimeout(() => {
      this._releaseWaited(triggeringId)
    }, sec * 1000)
  }

  /** Events * */

  /**
  * whenLoaded - invoke user supplied function.
  * To be used with code that needs to run onload.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenLoaded( function() {
  *   this.say('I am alive');
  * });
  *
  * @param {function} func - a function to rewrite and execute.
  */
  whenLoaded (func) {
    setTimeout(() => {
      this._exec(func, [])
    }, 0)
  }

  /**
  * whenFlag - adds a flag to cover the stage with an event listener attached.
  * When triggered will remove the flag div and invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenFlag( function() {
  *   this.say('I am alive');
  * });
  *
  * @param {function} func - a function to rewrite and execute.
  */
  whenFlag (func) {
    const me = this

    if (me.element) {
      me.element.addFlag(this)

      this.element.flag.addEventListener('click', (e) => {
        me.element.removeFlag(me)
        me._exec(func, [e])
        e.stopPropagation()
      })
    }
  }

  /**
  * whenClicked - adds a click event listener to the sprite or stage.
  * When triggered will invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.say('I am alive');
  * });
  *
  * @param {function} func - a function to rewrite and execute.
  */
  whenClicked (func) {
    const me = this

    if (me.element) {
      this.element.el.addEventListener('click', (e) => {
        me._exec(func, [e])
        e.stopPropagation()
      })
    }
  }

  /**
  * whenKeyPressed - adds a keypress event listener to document.
  * When triggered will invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenKeyPressed(' ', function() {
  *   this.say('Spacepressed');
  * });
  *
  * @param {string} userKey - the key pressed. may be the code or the character itself (A or 65)
  * @param {function} func - a function to rewrite and execute.
  */
  whenKeyPressed (userKey, func) {
    const me = this
    let check
    typeof userKey === 'string' ? check = userKey.toLowerCase() : check = userKey

    document.addEventListener('keydown', (e) => {
      let match = false
      // Make sure each property is supported by browsers.
      // Note: user may write incompatible code.
      e.code && e.code.toLowerCase() === check ? match = true : null
      e.key && e.key.toLowerCase() === check ? match = true : null
      e.keyCode === check ? match = true : null
      if (match) {
        me._exec(func, [e])
        e.preventDefault()
      }
    })
  }

  /**
  * whenEvent - adds the specified event listener to sprite/stage.
  * When triggered will invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenEvent('mouseover', (e) => {
  *   console.log(e);
  * });
  *
  * @param {string} eventStr - the named event (mosemove etc.).
  * @param {function} func - a function to rewrite and execute.
  */
  whenEvent (eventStr, func) {
    const me = this

    if (me.element) {
      let attachTo = this.element.el
      let options = {}
      'keydown|keyup|keypress'.indexOf(eventStr) !== -1 ? attachTo = document : null
      'touchstart|touchmove'.indexOf(eventStr) !== -1 ? options = { passive: true } : null

      attachTo.addEventListener(eventStr, (e) => {
        me._exec(func, [e])
        e.stopPropagation()
      }, options)
    }
  }

  /**
  * whenReceiveMessage - adds the specified event listener to document.
  * When triggered will invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenReceiveMessage('move', function() {
  *   this.move(-10);
  * })
  *
  * @param {string} msg - the named message (event);
  * @param {function} func - a function to rewrite and execute.
  */
  whenReceiveMessage (msg, func) {
    const listenerId = this._generateUUID()
    // register as a message listener.
    Entity.messageListeners.push({ msg, listenerId })

    // listen to specified message
    document.addEventListener(msg, (e) => {
      // execute the func and then
      this._exec(func, [e]).then(() => {
        // dispatch an event that is unique to the listener and message received.
        const msgId = e.detail.msgId
        const event = new window.CustomEvent('blockLike.donewheneeceivemessage', { detail: { msgId, listenerId } })

        document.dispatchEvent(event)
      })
    })
  }

  /**
  * broadcastMessage - dispatches a custom event that acts as a global message.
  *
  * @example
  * let stage = new blockLike.Stage();
  *
  * stage.whenClicked(function() {
  *  stage.broadcastMessage('move')
  * });
  *
  * @param {string} msg - the named message (event)
  */
  broadcastMessage (msg) {
    const msgId = this._generateUUID()
    const event = new window.CustomEvent(msg, { detail: { msgId } })
    document.dispatchEvent(event)
  }

  /**
  * broadcastMessageWait - dispatches a custom event that acts as a global message.
  * Waits for all whenReceiveMessage listeners to complete.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  *
  * sprite.whenReceiveMessage('move', function() {
  *   this.move(-10);
  *   this.wait(5);
  * })
  *
  * stage.whenClicked(function() {
  *  stage.broadcastMessageWait('move');
  *  sprite.say('All done');
  * });
  *
  * @param {string} msg - the named message (event)
  */
  broadcastMessageWait (msg, triggeringId = null) {
    // triggeringId is not user supplied, it is inserted by rewriter.
    const me = this
    const msgId = this._generateUUID()
    // save registered listeners for this broadcast.
    let myListeners = Entity.messageListeners.filter((item) => item.msg === msg)
    // dispatch the message
    const event = new window.CustomEvent(msg, { detail: { msgId } })
    document.dispatchEvent(event)

    // listen to those who received the message
    document.addEventListener('blockLike.donewheneeceivemessage', function broadcastMessageWaitListener (e) {
      // if event is for this message remove listenerId from list of listeners.
      (e.detail.msgId === msgId) ? myListeners = myListeners.filter((item) => item.listenerId !== e.detail.listenerId) : null
      // all listeners responded.
      if (!myListeners.length) {
        // remove the event listener
        document.removeEventListener('blockLike.donewheneeceivemessage', broadcastMessageWaitListener)
        // release the wait
        me._releaseWaited(triggeringId)
      }
    })
  }

  /** Sound * */

  /**
  * playSound - plays a sound file (mp3, wav)
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.playSound('../../sounds/bleat.wav');
  * });
  *
  * @param {string} url - the url of the file to play.
  */
  playSound (url) {
    const audio = new window.Audio(url)
    audio.play()
    this.sounds.push(audio)
    audio.addEventListener('ended', () => {
      this.sounds = this.sounds.filter((item) => item !== audio)
    })
  }

  /**
  * playSoundLoop - plays a sound file (mp3, wav) again and again
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.playSoundLoop('../../sounds/bleat.wav');
  * });
  *
  * @param {string} url - the url of the file to play.
  */
  playSoundLoop (url) {
    const audio = new window.Audio(url)
    audio.play()
    this.sounds.push(audio)
    audio.addEventListener('ended', () => {
      audio.currentTime = 0
      audio.play()
    })
  }

  /**
  * playSoundUntilDone - plays a sound file (mp3, wav) until done.
  * This is similar to playSound and wait for the duration of the sound.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.playSoundUntilDone('../../sounds/bleat.wav');
  * });
  *
  * @param {string} url - the url of the file to play.
  */
  playSoundUntilDone (url, triggeringId = null) {
    // triggeringId is not user supplied, it is inserted by rewriter.
    const audio = new window.Audio(url)
    audio.play()
    this.sounds.push(audio)
    audio.addEventListener('ended', () => {
      this.sounds = this.sounds.filter((item) => item !== audio)
      this._releaseWaited(triggeringId)
    })
  }

  /**
  * stopSounds - stops all sounds played by sprite or stage.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.playSound('../../sounds/bleat.wav');
  * });
  *
  * stage.whenKeyPressed('Escape', () => {
  *   this.stopSounds();
  * });
  */
  stopSounds () {
    this.sounds.forEach((item) => {
      item.pause()
    })
    this.sounds = []
  }

  /* css */

  /**
  * css - applies a CSS rule to the sprite and all costumes.
  *
  * @example
  * let sprite = new blockLike.Sprite();
  *
  * sprite.css('background', '#0000ff');
  *
  * @param {string} prop - the css property (e.g. color). Alternatively an object with key: value pairs.
  * @param {string} value - the value for the css property (e.g. #ff8833)
  */
  css (prop, value = null) {
    _element_css__WEBPACK_IMPORTED_MODULE_1__.register(prop, value, this)
    this.element ? this.element.update(this) : null
  }

  /**
  * addClass - adds a css class to sprite and all costumes.
  *
  * @example
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addClass('rainbow');
  *
  * @param {string} name - the css class name to add.
  */
  addClass (name) {
    !this.hasClass(name) ? this.classes.push(name) : null
    this.element ? this.element.update(this) : null
  }

  /**
  * removeClass - removes a css class from the sprite and all costumes.
  *
  * @example
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addClass('rainbow');
  * sprite.removeClass('rainbow');
  *
  * @param {string} name - the css class name to remove.
  */
  removeClass (name) {
    this.classes = this.classes.filter((item) => item !== name)
    this.element ? this.element.update(this) : null
  }

  /**
  * hasClass - is the css class applied to the sprite and all costumes.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.hasClass('rainbow') ? this.removeClass('rainbow') : this.addClass('rainbow');
  * });
  *
  * @param {string} name - the css class name.
  * @return {boolean} - is the css class name on the list.
  */
  hasClass (name) {
    return this.classes.indexOf(name) !== -1
  }
}


/***/ }),

/***/ "./src/look.js":
/*!*********************!*\
  !*** ./src/look.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Look)
/* harmony export */ });
/* harmony import */ var _element_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-css */ "./src/element-css.js");


/**
 * Class representing a look.
 * Abstract for Costume and Backdrop.
 * Do not instantiate objects directly from this class.
 *
 * @private
 */
class Look {
  /**
  * constructor - Look is abstract for Costume and Backdrop.
  */
  constructor () {
    this.cssRules = []
    this.classes = []
  }

  /** Looks * */

  /**
  * css - applies a CSS rule to a Costume or Backdrop.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.css('font-size', '16px');
  *
  * @example
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.css('cursor', 'pointer');
  *
  * @param {string} prop - the css property (e.g. color)
  * @param {string} value - the value for the css property (e.g. #ff8833)
  */
  css (prop, value = null) {
    _element_css__WEBPACK_IMPORTED_MODULE_0__.register(prop, value, this)
  }

  /**
  * addClass - adds a css class to costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.addClass('rainbow');
  *
  * @example
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.addClass('rainbow');
  *
  * @param {string} name - the css class name to add.
  */
  addClass (name) {
    !this.hasClass(name) ? this.classes.push(name) : null
  }

  /**
  * removeClass - removes a css class from the costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.hasClass('rainbow') ? costume.removeClass('rainbow') : costume.addClass('rainbow');
  *
  * @example
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.hasClass('rainbow') ? backdrop.removeClass('rainbow') : backdrop.addClass('rainbow');
  *
  * @param {string} name - the css class name to remove.
  */
  removeClass (name) {
    this.classes = this.classes.filter((item) => item !== name)
  }

  /**
  * hasClass - is the css class applied to the costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.hasClass('rainbow') ? costume.removeClass('rainbow') : costume.addClass('rainbow');
  *
  * @example
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.hasClass('rainbow') ? backdrop.removeClass('rainbow') : backdrop.addClass('rainbow');
  *
  * @param {string} name - the css class name.
  * @return {boolean} - is the css class name on the list.
  */
  hasClass (name) {
    return this.classes.indexOf(name) !== -1
  }
}


/***/ }),

/***/ "./src/platforms.js":
/*!**************************!*\
  !*** ./src/platforms.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ platforms)
/* harmony export */ });
/**
* platforms - collection of things to ensure it plays nicely with coding platforms.
*/
function platforms () {
  /**
  * codepen.io
  * Paced and Waited methods trigger the protection - hence we prolong it.
  * https://blog.codepen.io/2016/06/08/can-adjust-infinite-loop-protection-timing/
  */
  if (window.CP) {
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 60000
  }
}


/***/ }),

/***/ "./src/rewriter.js":
/*!*************************!*\
  !*** ./src/rewriter.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rewrite)
/* harmony export */ });
/**
* Encapsulates the functionality of rewriting user code to allow for BlockLike.js features.
*/

/**
* countChar - count how many times a given character (or string) appears in another string.
* helper for evented skipping and method rewriting.
*
* @param {string} str - a line of code.
* @param {string} char - a string to look for.
*
* @return {number} - the number of times found.
*/
function countChar (str, char) {
  const regExp = new RegExp(`\\${char}`, 'g')
  return (str.match(regExp) || []).length
}

/**
* replaceUserStringWithBlanks - for a given line of code, replaces all occurrences of
* user provided strings with a sequence of spaces of the same length.
* helper for evented skipping and method rewriting.
*
* @param {string} line - a line of code.
* @return {string} - the line without strings.
*/
function replaceUserStringWithBlanks (line) {
  return line.replace(/"(.*?)"|'(.*?)'|`(.*?)`/g, ' ')
}

/**
* isMethodInString - checks a string against an array of method names.
*
* @param {string} str - a line of code.
* @param {Array} arr - an array of method names.
*
* @return {boolean} - is the method in the string.
*/
function isMethodInString (arr, str) {
  return (arr.some((method) => str.indexOf(`.${method}(`) !== -1))
}

/**
* isPaced - checks if a line of code includes a paced method.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - is paced in code.
*/
function isPaced (item, entity) {
  return isMethodInString(entity.paced, item)
}

/**
* isWaited - checks if a line of code includes a waited method.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - is waited in code.
*/
function isWaited (item, entity) {
  return isMethodInString(entity.waited, item)
}

/**
* isEvented - checks if a line of code includes an evented method.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - is evented in code.
*/
function isEvented (item, entity) {
  return isMethodInString(entity.evented, item)
}

/**
* whichWaitedReturn - checks if a line of code includes a waitedReturn method.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - the waitedReturn method found or null.
*/
function whichWaitedReturn (item, entity) {
  return entity.waitedReturned.find((method) => (item.indexOf(`.${method}(`) !== -1 ? method : false))
}

/**
* insertLoopProtection- inserts a zero timed await line after a while deceleration.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - a modified line of code.
*/
function insertLoopProtection (item, entity) {
  const check = item.replace(/\s+/g, '')

  const regExp = /while\([\S]*\){|for\([\S]*\){|do[\S]*{/
  const matches = regExp.exec(check)

  const code = `${item}\n await new Promise(resolve => setTimeout(resolve, 0));`
  return matches ? code : item
}

/**
* insertPaced - inserts a timed await line after any method that is on the list of paced methods.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - a modified line of code.
*/
function insertPaced (item, entity) {
  const code = `${item}\n await new Promise(resolve => setTimeout(resolve, ${entity.pace}));`
  return entity.pace && isPaced(replaceUserStringWithBlanks(item), entity) ? code : item
}

/**
* insertWaited - inserts the "mechanism" that stops execution and awaits for the method to finish.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - a modified (multi)line of code.
*/
function insertWaited (item, entity) {
  let found = null
  let code

  // look for waited methods.
  found = isWaited(replaceUserStringWithBlanks(item), entity)

  // not a normal "waited". look for waitedReturned.
  if (!found) {
    let theVar = null

    found = whichWaitedReturn(replaceUserStringWithBlanks(item), entity)

    // code for waitedReturn
    theVar = item.substr(0, item.indexOf('='))
      .replace('let', '')
      .replace('var', '')
      .replace('const', '')
      .trim()

    code = `${item.substring(0, item.lastIndexOf(')'))}, '${theVar}', '${entity.triggeringId}')`

    // invoke is "forgiving". may, or may not, have variables.
    found === 'invoke' && (item.indexOf(',') === -1) ? code = `${item.substring(0, item.lastIndexOf(')'))}, [], '${theVar}', '${entity.triggeringId}')` : null
  } else {
    // code for "normal" waited
    code = `${item.substring(0, item.lastIndexOf(')'))}, '${entity.triggeringId}')`
  }

  // entity.triggeringId creates a unique context to chain the waited methods.
  code = `${code}\n await new Promise(resolve => {
      document.addEventListener('blockLike.waited.${entity.triggeringId}', function waitedListener(e) {
        document.removeEventListener('blockLike.waited.${entity.triggeringId}', waitedListener);
        resolve();
      });
    });`

  return found ? code : item
}

/**
* insertAsync - Adds keyword async to function deceleration if not present
* Will catch:
* - all named function decelerations with a space after the keyword 'function'
* - anything that has a fat arrow with any of several variable patterns before it.
*
* @param {string} item - a line of code.
* @return {string} - a modified line of code.
*/
function insertAsync (item) {
  const exist = item.indexOf('async ')

  // function declaration
  let regExp = /function(\s*?[a-zA-Z]\w*\s*?\(|\s*?\()/
  let matches = regExp.exec(replaceUserStringWithBlanks(item))

  // or arrow
  if (!matches) {
    regExp = /([a-zA-Z]\w*|\(\s*?[a-zA-Z]\w*(,\s*[a-zA-Z]\w*)*\s*?\))\s*?=>/
    matches = regExp.exec(replaceUserStringWithBlanks(item))
  }
  return exist === -1 && matches ? `${item.substring(0, matches.index)}async ${item.substring(matches.index, item.length)}` : item
}

/**
* emptyLoopProtection - examines the code for while and for statements that are empty.
* Note: since while(true){} is likely to be coded by the user this prevents infinite loops.
*
* @param {string} item - a line of code.
* @return {string} - a modified line of code.
*/
function emptyLoopProtection (funcS) {
  const check = funcS.replace(/\s+/g, '').replace(/\r?\n|\r/g, '')

  const regExp = /while\([\s\S]*\){}|for\([\s\S]*\){}|do{}while\([\s\S]*\)/
  const matches = regExp.exec(check)

  return !!matches
}

/**
* removeOuter - Removes the outer function definition and returns the function code body.
*
* @param {string} funcS - the function being rewritten.
* @return {string} - the body of the function.
*/
function removeOuter (funcS) {
  return funcS.substring(funcS.indexOf('{') + 1, funcS.lastIndexOf('}'))
}

/**
* removeComments - Removes comments from code.
* from: https://stackoverflow.com/a/15123777
*
* @param {string} funcS - the function being rewritten.
* @return {string} - the function without comments.
*/
function removeComments (funcS) {
  return funcS.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
}

/**
* getEventObjectVarName - extracts the variable name that holds the event object.
*
* @param {string} funcS - the function being rewritten.
* @return {string} - the variable name.
*/
function getEventObjectVarName (funcS) {
  return funcS.substring(funcS.indexOf('(') + 1, funcS.indexOf(')'))
}

/**
* rewrite - rewrites a function to an async version that is "paced" using awaiting for promises.
* This allows the user to write sequential simple code that will be executed in a paced manner.
*
* @param {function} func - a function to rewrite
* @param - {Object} entity - a sprite or stage object to which the function applies.
* @return {function} - an async modified function.
*/
function rewrite (func, entity) {
  let code = func.toString()
  const theVar = getEventObjectVarName(code)

  // rewrite the code
  if (emptyLoopProtection(code)) {
    code = 'throw \'BlockLike.js Error: Empty loop detected\';'
  } else {
    code = removeComments(removeOuter(code))
    code = code.split('\n').filter((item) => item.trim().length !== 0)

    // counter for open parentheses.
    let eventedOpenParen = 0
    // let hasPacedCode = false

    code = code.map((item) => {
      const temp = item
      let result = temp

      // internal evented methods are skipped
      if (isEvented(temp, entity) || eventedOpenParen) {
        eventedOpenParen += (countChar(replaceUserStringWithBlanks(temp), '(') - countChar(replaceUserStringWithBlanks(temp), ')'))
      } else {
        // if (isPaced(temp, entity)) hasPacedCode = true
        // a method can be one of the following but not more than one
        result === temp ? result = insertPaced(temp, entity) : null // more likely
        result === temp ? result = insertWaited(temp, entity) : null // less likely

        // and only if not a method will add async to functions
        result === temp ? result = insertAsync(temp) : null
      }

      // insert a paced promise resolve at the start of a loop block (under certain conditions)
      // this causes the code to skip an event loop and prevents endless loops
      result = insertLoopProtection(result, entity)

      return result
    })

    code = code.join('\n')
  }

  // transform the text into a function
  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
  let af = new AsyncFunction(code)

  // pass the event object to the function if exists.
  theVar ? af = new AsyncFunction(theVar, code) : null

  window.blockLike && window.blockLike.debug ? console.log(af) : null // eslint-disable-line no-console

  return af
}


/***/ }),

/***/ "./src/sprite-element.js":
/*!*******************************!*\
  !*** ./src/sprite-element.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SpriteElement)
/* harmony export */ });
/* harmony import */ var _element_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-css */ "./src/element-css.js");


/**
 * Class representing the UI Element of the sprite.
 * Each Sprite has one.
 * @private
 */
class SpriteElement {
  /**
  * constructor - Creates a Sprite Element.
  *
  * @param {object} sprite - the sprite for which the element is created.
  * @param {object} stage - the stage to which the sprite is added.
  */
  constructor (sprite, stage) {
    const el = document.createElement('div')

    el.id = `${sprite.id}`
    el.style.position = 'absolute'
    el.style.touchAction = 'manipulation'

    stage.element.el.appendChild(el)

    this.el = el
  }

  /**
  * update - updates the DOM element. This is always called after the constructor.
  *
  * @param {object} sprite - the sprite to update.
  */
  update (sprite) {
    const el = sprite.element.el
    // Convert the center based x coordinate to a left based one.
    const x = sprite.x - (sprite.width / 2)
    // Convert the center based y coordinate to a left based one.
    const y = (sprite.y * -1) - (sprite.height / 2)

    // Costume
    if (sprite.costume) {
      el.style.width = `${sprite.costume.visibleWidth}px`
      el.style.height = `${sprite.costume.visibleHeight}px`
    }

    el.style.left = `${(sprite.stageWidth / 2) + x}px`
    el.style.top = `${(sprite.stageHeight / 2) + y}px`
    el.style.zIndex = sprite.z

    el.style.visibility = `${(sprite.showing ? 'visible' : 'hidden')}`

    // Left or right rotation
    // Direction divided by 180 and floored -> 1 or 2.
    // Subtract 1 -> 0 or 1.
    // Multiply by -1 -> 0 or -1.
    // Css transform -> None or full X.
    sprite.rotationStyle === 1 ? el.style.transform = `scaleX(${((Math.floor(sprite.direction / 180) * 2) - 1) * -1})` : null

    // Full rotation
    // Sprite "neutral position" is 90. CSS is 0. Subtract 90.
    // Normalize to 360.
    // Css rotate -> Number of degrees.
    sprite.rotationStyle === 0 ? el.style.transform = `rotate(${((sprite.direction - 90) + 360) % 360}deg)` : null

    // CSS rules classes and the background color.
    // The costume color setting overrides any CSS setting.

    // There is no color property to current costume - so reset the background-color property of the element.
    !sprite.costume || !sprite.costume.color ? el.style.backgroundColor = '' : null

    // apply CSS rules (may include background color)
    _element_css__WEBPACK_IMPORTED_MODULE_0__.apply(sprite)

    // apply CSS classes
    sprite.costume ? el.className = sprite.costume.classes.concat(sprite.classes).join(' ') : el.className = sprite.classes.join(' ')

    // There is a color property to current costume - so apply it and override CSS rules.
    sprite.costume && sprite.costume.color ? el.style.backgroundColor = sprite.costume.color : null

    // Image.
    if (sprite.costume && el.firstChild) { // has image from previous costume
      if (!sprite.costume.image) { // needs removed as there is no image in current costume.
        el.removeChild(el.firstChild)
      } else if (sprite.costume.image !== this.el.firstChild.src) { // needs replaced
        this.el.firstChild.src = sprite.costume.image
      }
    } else if (sprite.costume && sprite.costume.image) { // needs an image inserted.
      const image = new window.Image()

      image.style.width = '100%'
      image.style.height = '100%'
      image.style.position = 'absolute'
      image.src = sprite.costume.image
      el.appendChild(image)
    }

    el.firstChild ? el.firstChild.draggable = false : null

    // Inner. Must by done after the image
    sprite.costume && sprite.costume.innerHTML ? el.innerHTML = sprite.costume.innerHTML : null

    // Text UI goes where sprite goes.
    sprite.textui ? sprite.textui.update(sprite) : null

    this.el = el
  }

  /**
  * delete - deletes the DOM element.
  *
  * @param {object} sprite - the sprite to delete.
  */
  delete (sprite) {
    const el = sprite.element.el

    el.parentNode.removeChild(el)
    return null
  }

  /**
  * addFlag - puts the flag div infront of everything (shows it).
  *
  * @param {object} sprite - the sprite that "requested" the flag.
  */
  addFlag (sprite) {
    const el = sprite.element.flag

    el.style.zIndex = 1000
    el.style.display = 'block'
  }

  /**
  * removeFlag - puts the flag div at the back (hides it).
  *
  * @param {object} sprite - the sprite that "requested" the flag.
  */
  removeFlag (sprite) {
    const el = sprite.element.flag

    el.style.zIndex = -1
    el.style.display = 'none'
  }
}


/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sprite)
/* harmony export */ });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entity.js");
/* harmony import */ var _stage_surface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stage-surface */ "./src/stage-surface.js");
/* harmony import */ var _sprite_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sprite-element */ "./src/sprite-element.js");
/* harmony import */ var _costume__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./costume */ "./src/costume.js");
/* harmony import */ var _text_ui_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text-ui-element */ "./src/text-ui-element.js");







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
class Sprite extends _entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
  constructor (options = {}) {
    const sheepy = 'data:image/png;base64,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'
    const defaults = {
      pace: 33
    }

    let actual = {}
    typeof options === 'object' ? actual = { ...defaults, ...options } : actual = defaults

    super(actual.pace)

    // costumes
    this.costumes = []

    /*
    * alternate options  - image url.
    * user can send a url instead of an option object.
    * this will be treated as a costume image url.
    * the image will be set the sprite costume.
    * when the image is loaded, costume width and height will be set to actual image width and height.
    * sprite will be refreshed.
    */
    if (typeof options === 'string') {
      actual.costume = new _costume__WEBPACK_IMPORTED_MODULE_3__["default"]({ image: options, width: 0, height: 0 })
      const image = new window.Image()

      const me = actual.costume
      image.src = options

      image.addEventListener('load', () => {
        me.originalWidth = image.width
        me.originalHeight = image.height
        me.width = me.originalWidth
        me.height = me.originalHeight

        this.refresh()
      })
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
    if (typeof actual.costume === 'undefined' && options !== null) {
      const costumeOptions = {}
      actual.width ? costumeOptions.width = actual.width : null
      actual.height ? costumeOptions.height = actual.height : null
      actual.color ? costumeOptions.color = actual.color : null;
      (typeof actual.image !== 'undefined') ? costumeOptions.image = actual.image : costumeOptions.image = sheepy

      actual.costume = new _costume__WEBPACK_IMPORTED_MODULE_3__["default"](costumeOptions)
    }

    // set costume
    actual.costume ? this.costume = actual.costume : null
    this.costume ? this.costumes.push(this.costume) : null

    // set width
    this.costume ? this.width = this.costume.visibleWidth : this.width = 0
    this.costume ? this.height = this.costume.visibleHeight : this.height = 0

    this.x = 0
    this.y = 0
    this.z = 0

    this.prevX = 0
    this.prevY = 0

    this.showing = true
    this.direction = 90
    this.magnification = 100

    this.rotationStyle = 0

    this.textui = null

    this.drawing = false
    this.penColor = '#222222'
    this.penSize = 1

    this.cssRules = []
    this.classes = []
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
  addTo (stage) {
    this.stageWidth = stage.width
    this.stageHeight = stage.height

    this.element = new _sprite_element__WEBPACK_IMPORTED_MODULE_2__["default"](this, stage)
    this.surface = new _stage_surface__WEBPACK_IMPORTED_MODULE_1__["default"](stage)

    this.element.flag = stage.element.flag
    this.againstBackdrop = stage.element.backdropContainer

    stage.sprites.push(this)
    this.z = stage.sprites.length

    this.element.update(this)
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
  *   clone.addTo(stage);
  * });
  *
  */
  clone () {
    // make a new sprite.
    const sprite = new Sprite()
    // save id.
    const id = sprite.id
    // and assign properties.
    const clone = Object.assign(sprite, this)
    // reassign the unique id.
    clone.id = id

    // remove DOM elements
    clone.element = null
    clone.surface = null

    // detach arrays
    clone.cssRules = JSON.parse(JSON.stringify(this.cssRules))
    clone.classes = this.classes.slice()

    // figure out what the current costume is.
    const currentCostumeIndex = this.costumes.indexOf(this.costume)

    // fill the costumes array with new costumes and assign properties.
    clone.costumes = this.costumes.map((item) => {
      const costume = new _costume__WEBPACK_IMPORTED_MODULE_3__["default"]()
      const obj = Object.assign(costume, item)

      // detach arrays
      obj.cssRules = JSON.parse(JSON.stringify(item.cssRules))
      obj.classes = item.classes.slice()

      return obj
    })

    // set the current costume.
    clone.costume = clone.costumes[currentCostumeIndex]

    // announce a clone
    const event = new window.CustomEvent(`blockLike.spritecloned.${this.id}`, { detail: clone })
    document.dispatchEvent(event)

    return clone
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
  removeFrom (stage) {
    const curStage = stage

    curStage.sprites = stage.sprites.filter((item) => item !== this)
    this.element ? this.element = this.element.delete(this) : null
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
  whenCloned (func) {
    document.addEventListener(`blockLike.spritecloned.${this.id}`, (e) => {
      e.detail._exec(func, [])
      e.stopPropagation()
    })
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
  _motion (x, y) {
    this.prevX = this.x
    this.prevY = this.y
    this.x = x
    this.y = y
    this.element ? this.element.update(this) : null
    this.surface ? this.surface.draw(this) : null
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
  glide (sec, x, y, triggeringId = null) {
    let i = 0
    const me = this
    // divide the x and y difference into steps
    const framesPerSecond = 1000 / this.pace
    const stepX = (x - this.x) / (sec * framesPerSecond)
    const stepY = (y - this.y) / (sec * framesPerSecond)
    const int = setInterval(() => {
      i += 1
      me._motion(me.x + stepX, me.y + stepY)
      if (i / framesPerSecond >= sec) {
        //  clear the interval and fix any "drift"
        clearInterval(int)
        me._motion(x, y)
        me._releaseWaited(triggeringId)
      }
    }, this.pace)
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
  move (pixels) {
    /**
    * toRad - converts a degree to radians.
    *
    * @param {number} deg - number of degrees.
    * @return {number} - degrees converted to radians.
    */
    function toRad (deg) {
      return deg * (Math.PI / 180)
    }

    const dx = Math.round(Math.cos(toRad(this.direction - 90)) * pixels)
    const dy = Math.round(Math.sin(toRad(this.direction + 90)) * pixels)

    this._motion(this.x + dx, this.y + dy)
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
  goTo (x, y) {
    this._motion(x, y)
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
  goTowards (sprite) {
    this._motion(sprite.x, sprite.y)
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
  setX (x) {
    this._motion(x, this.y)
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
  setY (y) {
    this._motion(this.x, y)
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
  changeX (pixels) {
    this._motion(this.x + pixels, this.y)
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
  changeY (pixels) {
    this._motion(this.x, this.y + pixels)
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
  pointInDirection (deg) {
    deg > 0 ? this.direction = deg % 360 : this.direction = (deg + (360 * 10)) % 360
    this.element ? this.element.update(this) : null
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
  pointTowards (sprite) {
    /**
    * computeDirectionTo - finds the direction from sprite's current location to a specified set of coordinates.
    *
    * @param {number} fromX - the x coordinate
    * @param {number} fromY - the y coordinate
    * @param {number} toX - the x coordinate
    * @param {number} toY - the y coordinate
    * @return {number} - direction in degrees.
    */
    function computeDirectionTo (fromX, fromY, toX, toY) {
      /**
      * toDeg - Converts radians to degrees.
      *
      * @param {number} rad - number of radians.
      * @return {number} - radians converted to degrees.
      */
      function toDeg (rad) {
        return rad * (180 / Math.PI)
      }

      // 1) Find the angle in rad, convert to deg (90 to -90).
      // 2) Find the sign of the delta on y axis (1, -1). Shift to (0, -2). Multiply by 90. (0, 180)
      // Add 1) and 2)
      // Normalize to 360

      let result = (toDeg(Math.atan((fromX - toX) / (fromY - toY))) + (90 * (Math.sign(fromY - toY) + 1)) + 360) % 360;
      (fromY - toY) === 0 ? result += 90 : null // make sure we fix atan lim (division by zero).

      return result
    }

    this.direction = computeDirectionTo(this.x, this.y, sprite.x, sprite.y)
    this.element ? this.element.update(this) : null
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
  turnRight (deg) {
    this.direction = (this.direction + deg) % 360
    this.element ? this.element.update(this) : null
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
  turnLeft (deg) {
    this.direction = ((this.direction + 360) - deg) % 360
    this.element ? this.element.update(this) : null
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
  setRotationStyle (style) {
    let curStyle = style

    style === 'no' ? curStyle = 2 : null
    style === 'left-right' ? curStyle = 1 : null
    style === 'all' ? curStyle = 0 : null

    this.rotationStyle = curStyle
  }

  /** Looks * */

  /**
  * _refreshCostume - Sets the costume and sprite width and hight then refreshes element.
  *
  * @private
  */
  _refreshCostume () {
    if (this.costume) {
      this.width = this.costume.visibleWidth
      this.height = this.costume.visibleHeight
    }

    this.element ? this.element.update(this) : null
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
  addCostume (costume) {
    this.costumes.push(costume)

    // if "bare" set the added as active.
    if (!this.costume) {
      this.costume = this.costumes[0]
      this.width = this.costume.visibleWidth
      this.height = this.costume.visibleHeight
    }

    this.element ? this.element.update(this) : null
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
  switchCostumeTo (costume) {
    const currentCostumeIndex = this.costumes.indexOf(costume)
    currentCostumeIndex !== -1 ? this.costume = this.costumes[currentCostumeIndex] : null

    this._refreshCostume()
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
  switchCostumeToNum (index) {
    this.switchCostumeTo(this.costumes[index])
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
  nextCostume () {
    const currentCostumeIndex = this.costumes.indexOf(this.costume)
    this.costume = this.costumes[(currentCostumeIndex + 1) % this.costumes.length]

    this._refreshCostume()
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
  removeCostume (costume) {
    if (this.costumes.length > 1) {
      const currentCostumeIndex = this.costumes.indexOf(costume)
      this.costume === costume ? this.costume = this.costumes[(currentCostumeIndex + 1) % this.costumes.length] : null
      this.costumes = this.costumes.filter((item) => item !== costume)
    } else {
      this.costumes = []
      this.costume = null
    }
    this._refreshCostume()
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
  removeCostumeNum (index) {
    this.removeCostume(this.costumes[index])
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
  show () {
    this.showing = true
    this.element ? this.element.update(this) : null
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
  hide () {
    this.showing = false
    this.element ? this.element.update(this) : null
  }

  /**
  * refresh - Forces a sprite refresh.
  * Note: service method to be used if costume was manipulated directly.
  */
  refresh () {
    const me = this
    // wait a sec...
    // TODO: This is to accomodate dynamic image resize. Not ideal. Should be event driven.
    setTimeout(() => {
      // in case costume was resized force a reset of size.
      me.setSize(me.magnification)
      // then refresh the DOM.
      me.element ? me.element.update(me) : null
    }, this.pace)
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
  resizeToImage () {
    if (this.costume) {
      this.costume.resizeToImage()
    }

    this.refresh()
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
  inner (html) {
    this.costume.inner(html)
    this.element ? this.element.update(this) : null
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
  insert (el) {
    this.costume.insert(el)
    this.element ? this.element.update(this) : null
  }

  /**
  * _refreshSize - Sets the sprite width and hight in relation to original then refreshes element.
  *
  * @private
  * @param {object} costume - the costume to add.
  */
  _refreshSize () {
    /**
    * decimalRound - rounds a number too decimal points.
    *
    * @param {number} value - the value to round.
    * @param {number} points - how many decimal points to leave.
    */
    function decimalRound (value, points) {
      return Math.round(value * (10 ** points)) / (10 ** points)
    }

    if (this.costume) {
      this.width = decimalRound(this.costume.width * (this.magnification / 100), 2)
      this.height = decimalRound(this.costume.height * (this.magnification / 100), 2)

      this.costumes.forEach((item) => {
        const costume = item
        costume.visibleWidth = decimalRound(costume.width * (this.magnification / 100), 2)
        costume.visibleHeight = decimalRound(costume.height * (this.magnification / 100), 2)
      })

      this.costume.visibleWidth = this.width
      this.costume.visibleHeight = this.height

      this.element ? this.element.update(this) : null
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
  changeSize (change) {
    this.magnification += change

    this._refreshSize()
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
  setSize (percent) {
    this.magnification = percent

    this._refreshSize()
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
  think (text) {
    if (this.element) {
      this.textui ? this.textui = this.textui.delete(this) : null
      typeof text !== 'undefined' && text.toString() ? this.textui = new _text_ui_element__WEBPACK_IMPORTED_MODULE_4__["default"](this, 'think', text) : null
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
  thinkWait (text, sec, triggeringId = null) {
    setTimeout(() => {
      this.think('')
      this._releaseWaited(triggeringId)
    }, sec * 1000)
    this.think(text)
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
  say (text) {
    if (this.element) {
      this.textui ? this.textui = this.textui.delete(this) : null
      typeof text !== 'undefined' && text.toString() ? this.textui = new _text_ui_element__WEBPACK_IMPORTED_MODULE_4__["default"](this, 'say', text) : null
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
  sayWait (text, sec, triggeringId = null) { // eslint-disable-line class-methods-use-this
    setTimeout(() => {
      this.say('')
      this._releaseWaited(triggeringId)
    }, sec * 1000)
    this.say(text)
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
  ask (text, theVar = null, triggeringId = null) {
    const me = this
    me.askId = this._generateUUID()

    if (this.element) {
      this.textui ? this.textui = this.textui.delete(this) : null
      typeof text !== 'undefined' && text.toString() ? this.textui = new _text_ui_element__WEBPACK_IMPORTED_MODULE_4__["default"](me, 'ask', text) : null

      // this will wait for user input
      document.addEventListener(`blockLike.ask.${this.id}.${me.askId}`, function askListener (e) {
        // remove it.
        document.removeEventListener(`blockLike.ask.${me.id}.${me.askId}`, askListener)
        // this is the waited method listener. release it.
        me._releaseWaited(triggeringId)
        // set the user defined variable to the captured value.
        theVar ? me._setToVar(theVar, e.detail.value) : null
        // remove the UI.
        me.textui ? me.textui = me.textui.delete(me) : null
      })
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
  penClear () {
    this.surface.clear(this)
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
  penDown () {
    this.drawing = true
    this.prevX = this.x
    this.prevY = this.y
    this.surface.draw(this)
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
  penUp () {
    this.drawing = false
    this.surface.draw(this)
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
  setPenColor (colorString) {
    this.penColor = colorString
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
  setPenSize (pixels) {
    this.penSize = pixels
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
  changePenSize (change) {
    this.penSize += change
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
  distanceTo (x, y) {
    const dx = this.x - x
    const dy = this.y - y

    return Math.sqrt((dx * dx) + (dy * dy))
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
  touchingEdge () {
    let result = null

    if ((this.x) + (this.width / 2) > this.stageWidth / 2) {
      result = 'right'
    }
    if ((this.x) - (this.width / 2) < -1 * (this.stageWidth / 2)) {
      result = 'left'
    }
    if ((this.y) + (this.height / 2) > this.stageHeight / 2) {
      result = 'top'
    }
    if ((this.y) - (this.height / 2) < -1 * (this.stageHeight / 2)) {
      result = 'bottom'
    }

    return result
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
  isTouchingEdge () {
    return !!this.touchingEdge()
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
  touching (sprite) {
    let result = null

    if (
      this.x + (this.width / 2) > sprite.x - (sprite.width / 2) &&
      this.x - (this.width / 2) < sprite.x + (sprite.width / 2) &&
      this.y + (this.height / 2) > sprite.y - (sprite.height / 2) &&
      this.y - (this.height / 2) < sprite.y + (sprite.height / 2)
    ) {
      this.x >= sprite.x ? result = 'left' : null
      this.x < sprite.x ? result = 'right' : null
      this.y > sprite.y && Math.abs(this.y - sprite.y) > Math.abs(this.x - sprite.x) ? result = 'bottom' : null
      this.y < sprite.y && Math.abs(this.y - sprite.y) > Math.abs(this.x - sprite.x) ? result = 'top' : null
    }

    return result
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
  isTouching (sprite) {
    return !!this.touching(sprite)
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
  touchingBackdropColor () {
    const result = []

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
    function rgbToHex (r, g, b) {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}` // eslint-disable-line no-bitwise
    }

    try {
      const backdropContext = this.againstBackdrop.getContext('2d')
      const data = backdropContext.getImageData(((this.stageWidth / 2) - (this.width / 2)) + this.x, ((this.stageHeight / 2) - (this.height / 2)) - this.y, this.width, this.height).data

      for (let i = 0; i < data.length; i += 4) {
        data[i + 3] !== 0 ? result.push(rgbToHex(data[i], data[i + 1], data[i + 2])) : null
      }
    } catch (e) {
      console.log('BlockLike.js Notice: isTouchingBackdropColor() ingnored. Backdrop image can not be located at a remote origin.') // eslint-disable-line no-console
    }

    return Array.from(new Set(result))
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
  isTouchingBackdropColor (backdropColor) {
    const hexArr = this.touchingBackdropColor(backdropColor)

    return hexArr.includes(backdropColor)
  }
}


/***/ }),

/***/ "./src/stage-element.js":
/*!******************************!*\
  !*** ./src/stage-element.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StageElement)
/* harmony export */ });
/* harmony import */ var _element_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-css */ "./src/element-css.js");


/**
 * Class representing the UI Element of the stage.
 * Each Stage has one.
 * @private
 */
class StageElement {
  /**
  * constructor - Creates a Stage Element.
  *
  * @param {object} options - the stage for which the element is created.
  * @param {object} stage - the stage created.
  */
  constructor (options, stage) {
    const el = document.createElement('div')

    /**
    * createDiv - creates a div at specified zIndex.
    *
    * @param {number} zIndex - desired place in "stack"
    * @return {object} - a stage wide/high DOM element.
    */
    function createDiv (zIndex) {
      const sel = document.createElement('div')

      sel.style.width = `${options.width}px`
      sel.style.height = `${options.height}px`
      sel.style.zIndex = zIndex
      sel.style.position = 'absolute'
      sel.style.touchAction = 'manipulation'

      return sel
    }

    /**
    * createCanvas - creates a canvas at specified zIndex.
    *
    * @param {number} zIndex - desired place in "stack"
    * @return {object} - a stage wide/high DOM element.
    */
    function createCanvas (zIndex) {
      const cel = document.createElement('canvas')

      cel.width = options.width
      cel.height = options.height
      cel.style.zIndex = zIndex
      cel.style.position = 'absolute'
      cel.style.left = '0px'
      cel.style.top = '0px'

      return cel
    }

    /**
    * createFlag - creates a "flag" div.
    *
    * @return {object} - a stage wide/high DOM element with flag at centers.
    */
    function createFlag () {
      const flagSize = 130
      const fel = createDiv(-1)

      const felitem = document.createElement('div')

      // Convert the center based x coordinate to a left based one.
      const x = -(flagSize / 2)
      // Convert the center based y coordinate to a left based one.
      const y = -(flagSize / 2)

      // looks
      felitem.style.width = `${flagSize}px`
      felitem.style.height = `${flagSize}px`
      felitem.style.position = 'absolute'
      felitem.innerHTML = '&#9873;'

      felitem.style.left = `${(options.width / 2) + x}px`
      felitem.style.top = `${(options.height / 2) + y}px`
      felitem.className = 'blocklike-flag'

      fel.appendChild(felitem)
      fel.style.display = 'none'

      return fel
    }

    el.id = `${stage.id}`

    el.style.width = `${options.width}px`
    el.style.height = `${options.height}px`

    el.style.position = 'relative'
    el.style.boxSizing = 'border-box'
    el.style.overflow = 'hidden'

    options.parent.appendChild(el)

    this.backdropContainer = createCanvas(0)
    this.backdropContainer.id = `${stage.id}-backdrop`
    this.backdropContainer.className = 'blocklike-panel-backdrop'
    el.appendChild(this.backdropContainer)

    this.canvas = createCanvas(0)
    this.canvas.id = `${stage.id}-surface`
    this.canvas.className = 'blocklike-panel-surface'
    el.appendChild(this.canvas)

    this.flag = createFlag()
    this.flag.id = `${stage.id}-flag`
    this.flag.className = 'blocklike-panel-flag'
    el.appendChild(this.flag)

    this.context = this.canvas.getContext('2d')

    this.el = el
  }

  /**
  * update - updates the DOM element.
  *
  * @param {object} stage - the stage to update.
  */
  update (stage) {
    const el = stage.element.el
    const backdropContext = stage.element.backdropContainer.getContext('2d')

    let marginTB = 0
    if (stage.element.el.parentElement.tagName === 'BODY') {
      marginTB = Math.floor((window.innerHeight - stage.height) / 2)
      marginTB < 0 ? marginTB = 0 : null
    }

    // If color - fill the canvas with the color set, or clear it
    if (stage.backdrop && stage.backdrop.color) {
      backdropContext.rect(0, 0, stage.width, stage.height)
      backdropContext.fillStyle = stage.backdrop.color
      backdropContext.fill()
    } else {
      backdropContext.clearRect(0, 0, stage.width, stage.height)
    }

    // If image - draw the image on canvas
    if (stage.backdrop && stage.backdrop.image) {
      const img = new Image()
      img.onload = () => {
        backdropContext.drawImage(img, 0, 0, stage.width, stage.height)
      }
      img.src = stage.backdrop.image
    }

    // zoom and placement
    el.style.transform = `scale(${stage.magnification / 100})`
    el.style.margin = `${marginTB}px auto`

    // css rules
    _element_css__WEBPACK_IMPORTED_MODULE_0__.apply(stage)

    // css classes
    stage.backdrop ? el.className = stage.backdrop.classes.concat(stage.classes).join(' ') : el.className = stage.classes.join(' ')
  }

  /**
  * delete - deletes the DOM element
  */
  delete (stage) {
    const el = stage.element.el

    el.parentNode.removeChild(el)
    return null
  }

  /**
  * addFlag - puts the flag div infront of everything (shows it)
  *
  * @param {object} stage - the stage that "requested" the flag.
  */
  addFlag (stage) {
    const el = stage.element.flag

    el.style.zIndex = 1000
    el.style.display = 'block'
  }

  /**
  * removeFlag - puts the flag div at the back (hides it)
  *
  * @param {object} stage - the stage that "requested" the flag.
  */
  removeFlag (stage) {
    const el = stage.element.flag

    el.style.zIndex = -1
    el.style.display = 'none'
  }
}


/***/ }),

/***/ "./src/stage-sensing.js":
/*!******************************!*\
  !*** ./src/stage-sensing.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ enable)
/* harmony export */ });
/**
* Encapsulates the stage sensing functionality.
*/

/**
* enable - Enables sensing of document level events (keydown, mousemove, mousedown, touchmove)
*/
function enable (stage) {
  const me = stage
  me.sensing = true

  /**
  * decimalRound - rounds a number too decimal points.
  *
  * @param {number} value - the value to round.
  * @param {number} points - how many decimal points to leave.
  */
  function decimalRound (value, points) {
    return Math.round(value * (10 ** points)) / (10 ** points)
  }

  /**
  * computeX - Computes centered x based on x extracted from event.
  */
  function computeX (x) {
    const mag = me.magnification / 100
    return decimalRound((x - (me.element.el.offsetLeft) - (me.width / 2)) / mag, 2)
  }

  /**
  * computeY - Computes centered y based on y extracted from event.
  */
  function computeY (y) {
    const mag = me.magnification / 100
    return decimalRound((-y + me.element.el.offsetTop + (me.height / 2)) / mag, 2)
  }

  document.addEventListener('keydown', (e) => {
    e.key && me.keysKey.indexOf(e.key.toLowerCase()) === -1 ? me.keysKey.push(e.key.toLowerCase()) : null
    e.code && me.keysCode.indexOf(e.code.toLowerCase()) === -1 ? me.keysCode.push(e.code.toLowerCase()) : null
    me.keysKeyCode.indexOf(e.keyCode) === -1 ? me.keysKeyCode.push(e.keyCode) : null
  })

  document.addEventListener('keyup', (e) => {
    e.key ? me.keysKey = me.keysKey.filter((item) => item !== e.key.toLowerCase()) : null
    e.code ? me.keysCode = me.keysCode.filter((item) => item !== e.code.toLowerCase()) : null
    me.keysKeyCode = me.keysKeyCode.filter((item) => item !== e.keyCode)
  })

  me.element.el.addEventListener('mousemove', (e) => {
    me.mouseX = computeX(e.clientX)
    me.mouseY = computeY(e.clientY)
  })

  me.element.el.addEventListener('touchmove', (e) => {
    me.mouseX = computeX(e.changedTouches[0].clientX)
    me.mouseY = computeY(e.changedTouches[0].clientY)
  }, { passive: true })

  me.element.el.addEventListener('mousedown', () => {
    me.mouseDown = true
  })
  me.element.el.addEventListener('mouseup', () => {
    me.mouseDown = false
  })

  me.element.el.addEventListener('touchstart', (e) => {
    me.mouseX = computeX(e.touches[0].clientX)
    me.mouseY = computeY(e.touches[0].clientY)
    me.mouseDown = true
  }, { passive: true })

  me.element.el.addEventListener('touchend', () => {
    me.mouseDown = false
    me.mouseX = null
    me.mouseY = null
  })
}


/***/ }),

/***/ "./src/stage-surface.js":
/*!******************************!*\
  !*** ./src/stage-surface.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StageSurface)
/* harmony export */ });
/**
 * Class representing the stage surface on which sprites draw.
 * Each Stage has one.
 * @private
 */
class StageSurface {
  /**
  * constructor - Creates a Stage.
  *
  * @param {object} stage - the stage on which the sprite is drawing.
  */
  constructor (stage) {
    this.context = stage.element.context
  }

  /**
  * draw - draws a line "behind" a moving sprite.
  * Note: sprite always has current and previous x,y values to allow drawing to previous location.
  *
  * @param {object} sprite - the sprite drawing the line.
  */
  draw (sprite) {
    if (sprite.drawing) {
      this.context.beginPath()
      this.context.moveTo((sprite.stageWidth / 2) + sprite.x, (sprite.stageHeight / 2) + (sprite.y * -1))
      this.context.lineTo((sprite.stageWidth / 2) + sprite.prevX, (sprite.stageHeight / 2) + (sprite.prevY * -1))
      this.context.lineWidth = sprite.penSize
      this.context.strokeStyle = sprite.penColor
      this.context.stroke()
    }
  }

  /**
  * clear - clears the canvas
  */
  clear (sprite) {
    this.context.clearRect(0, 0, sprite.stageWidth, sprite.stageHeight)
  }
}


/***/ }),

/***/ "./src/stage.js":
/*!**********************!*\
  !*** ./src/stage.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stage)
/* harmony export */ });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entity.js");
/* harmony import */ var _stage_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stage-element */ "./src/stage-element.js");
/* harmony import */ var _stage_surface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stage-surface */ "./src/stage-surface.js");
/* harmony import */ var _sprite_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sprite-element */ "./src/sprite-element.js");
/* harmony import */ var _stage_sensing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stage-sensing */ "./src/stage-sensing.js");








/**
 * Class representing a Stage.
 * @extends Entity
 *
 * @example
 * let stage = new blockLike.Stage();
 *
 * @example
 * let stage = new blockLike.Stage({
 *   width: 600,
 *   height: 400,
 *   pace: 16,
 *   sensing: true,
 *   parent: document.getElementById('stage-wrap'),
 *   backdrop: new blockLike.Backdrop({color: '#FFB6C1'})
 * });
 */
class Stage extends _entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
  * constructor - Creates a Stage.
  *
  * @param {object} options - Options for the Stage.
  * @param {number} options.width - The stage width in pixels. Default is full window.
  * @param {number} options.height - The stage height in pixels. Default is full window.
  * @param {number} options.pace - The number of milliseconds to wait for each paced method.  Will disable pacing when set to zero.
  * @param {object} options.parent - The DOM element into which the stage will be inserted. Default is the body.
  * @param {object} options.backdrop - A default Backdrop.
  * @param {boolean} options.sensing - Enables sensing of mouse location and what keys pressed.
  * If true, will constantly update stage properties: mouseX, mouseY, keysKeyCode, keysKeyCode and keysCode based on user input.
  */
  constructor (options = {}) {
    const defaults = {
      width: window.innerWidth,
      height: window.innerHeight,
      parent: document.body,
      pace: 33,
      backdrop: null
    }
    const actual = { ...defaults, ...options }

    super(actual.pace)

    // backdrops
    this.backdrops = []

    if (actual.backdrop) {
      this.backdrop = actual.backdrop
      this.backdrops.push(this.backdrop)
    }

    this.element = new _stage_element__WEBPACK_IMPORTED_MODULE_1__["default"](actual, this)
    this.width = actual.width
    this.height = actual.height

    this.keysCode = []
    this.keysKey = []
    this.keysKeyCode = []

    this.sprites = []

    this.magnification = 100

    this.cssRules = []
    this.classes = []

    this.mouseDown = null
    this.mouseX = null
    this.mouseY = null

    actual.sensing ? (0,_stage_sensing__WEBPACK_IMPORTED_MODULE_4__["default"])(this) : null

    this.element.update(this)
  }

  /**
  * delete - Deletes the stage element.
  *
  * @example
  * let stage = new blockLike.Stage();
  *
  * stage.delete();
  */
  delete () {
    this.element = this.element.delete(this)
  }

  /** Setup Actions * */

  /**
  * addSprite - Adds a sprite to the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  *
  * @param {object} sprite - the sprite to add.
  */
  addSprite (sprite) {
    const curSprite = sprite

    curSprite.element = new _sprite_element__WEBPACK_IMPORTED_MODULE_3__["default"](sprite, this)
    curSprite.surface = new _stage_surface__WEBPACK_IMPORTED_MODULE_2__["default"](this)

    curSprite.element.flag = this.element.flag
    curSprite.againstBackdrop = this.element.backdropContainer

    curSprite.stageWidth = this.width
    curSprite.stageHeight = this.height

    this.sprites.push(curSprite)
    curSprite.z = this.sprites.length

    sprite.element.update(curSprite)
  }

  /**
  * removeSprite - Removes a sprite from the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.removeSprite(sprite);
  *
  * @param {object} sprite - the sprite to add.
  */
  removeSprite (sprite) {
    const curSprite = sprite
    this.sprites = this.sprites.filter((item) => item !== sprite)
    curSprite.element ? curSprite.element = curSprite.element.delete(curSprite) : null
  }

  /** looks * */

  /**
  * addBackdrop - Adds a backdrop to the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  *
  * @param {object} backdrop - the backdrop to add.
  */
  addBackdrop (backdrop) {
    this.backdrops.push(backdrop)
    // if "bare" set the added as active
    !this.backdrop ? this.backdrop = this.backdrops[0] : null
    this.element ? this.element.update(this) : null
  }

  /**
  * switchBackdropTo - Switches to specified backdrop. If not found fails silently.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.switchBackdropTo(backdrop);
  *
  * @param {object} backdrop - the backdrop to switch too.
  */
  switchBackdropTo (backdrop) {
    const currentBackdropIndex = this.backdrops.indexOf(backdrop)
    currentBackdropIndex !== -1 ? this.backdrop = this.backdrops[currentBackdropIndex] : null

    this.element ? this.element.update(this) : null
  }

  /**
  * switchBackdropToNum - Switches to specified backdrop by number of current (0 is first). If not found fails silently.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.switchBackdropToNum(1);
  *
  * @param {number} index - the backdrop to switch too.
  */
  switchBackdropToNum (index) {
    this.switchBackdropTo(this.backdrops[index])
  }

  /**
  * nextBackdrop - Switches to the next backdrop.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.nextBackdrop();
  */
  nextBackdrop () {
    const currentBackdropIndex = this.backdrops.indexOf(this.backdrop)
    this.backdrop = this.backdrops[(currentBackdropIndex + 1) % this.backdrops.length]

    this.element ? this.element.update(this) : null
  }

  /**
  * removeBackdrop - Removes a backdrop.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.removeBackdrop(backdrop);
  *
  * @param {object} backdrop - the backdrop to remove.
  */
  removeBackdrop (backdrop) {
    if (this.backdrops.length > 1) {
      const currentBackdropIndex = this.backdrops.indexOf(backdrop)
      this.backdrop === backdrop ? this.backdrop = this.backdrops[(currentBackdropIndex + 1) % this.backdrops.length] : null
      this.backdrops = this.backdrops.filter((item) => item !== backdrop)
    } else {
      this.backdrops = []
      this.backdrop = null
    }
    this.element ? this.element.update(this) : null
  }

  /**
  * removeBackdropNum - Removes the specified backdrop by number of current (0 is first).
  * If there is only one backdrop, will fail and emit a console message.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.removeBackdropNum(1);
  *
  * @param {number} index - the backdrop to remove.
  */
  removeBackdropNum (index) {
    this.removeBackdrop(this.backdrops[index])
  }

  /**
  * refresh - Forces a sprite refresh.
  * Note: service method to be used if costume was manipulated directly.
  */
  refresh () {
    this.element ? this.element.update(this) : null
  }

  /**
  * zoom - zooms the stage to the specified percentage number.
  *
  * @example
  * let stage = new blockLike.Stage();
  *
  * stage.zoom(150);
  *
  * @param {number} percent - the percentage to set.
  */
  zoom (percent) {
    this.magnification = percent
    this.element.update(this)
  }

  /** Sprites * */

  /**
  * _refreshSprites - Refresh the DOM element of all sprites currently on stage.
  *
  * @private
  * @param {number} index - the backdrop to switch too.
  */
  _refreshSprites () {
    let i = 0
    this.sprites.forEach((item) => {
      const sprite = item
      i += 1
      sprite.z = i
      sprite.element ? sprite.element.update(sprite) : null
    })
  }

  /**
  * sendSpriteBackwards - Moves the sprite one place down the "pile".
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.whenFlag( function() {
  *   this.sendSpriteBackwards(sprite);
  * });
  *
  * @param {object} sprite - the sprite to move.
  */
  sendSpriteBackwards (sprite) {
    const index = this.sprites.indexOf(sprite)
    if (index > 0) {
      this.sprites[index] = this.sprites[index - 1] // move one up
      this.sprites[index - 1] = sprite // me subject down
    }
    this._refreshSprites()
  }

  /**
  * sendSpriteForward - Moves the sprite one place up in the "pile".
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.whenFlag( function() {
  *   this.sendSpriteForward(sprite);
  * });
  *
  * @param {object} sprite - the sprite to move.
  */
  sendSpriteForward (sprite) {
    const index = this.sprites.indexOf(sprite)
    if (index < this.sprites.length - 1 && index !== -1) {
      this.sprites[index] = this.sprites[index + 1] // move one down
      this.sprites[index + 1] = sprite // me subject up
    }
    this._refreshSprites()
  }

  /**
  * sendSpriteToFront - Brings the sprite to the front of the "pile"
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.whenFlag( function() {
  *   this.sendSpriteToFront(sprite);
  * });
  *
  * @param {object} sprite - the sprite to move.
  */
  sendSpriteToFront (sprite) {
    const index = this.sprites.indexOf(sprite)
    if (index !== -1) {
      this.sprites.splice(index, 1)
      this.sprites.push(sprite)
    }
    this._refreshSprites()
  }

  /**
  * sendSpriteToBack - Sends the sprite to the back of the "pile"
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.whenFlag( function() {
  *   this.sendSpriteToBack(sprite);
  * });
  *
  * @param {object} sprite - the sprite to move.
  */
  sendSpriteToBack (sprite) {
    const index = this.sprites.indexOf(sprite)
    if (index !== -1) {
      this.sprites.splice(index, 1)
      this.sprites.unshift(sprite)
    }
    this._refreshSprites()
  }

  /* sensing */

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
  isKeyPressed (userKey) {
    let match = false
    let check

    typeof userKey === 'string' ? check = userKey.toLowerCase() : check = userKey
    // Make sure each property is supported by browsers.
    // Note: user may write incompatible code.
    this.keysKey.indexOf(check) !== -1 ? match = true : null
    this.keysCode.indexOf(check) !== -1 ? match = true : null
    this.keysKeyCode.indexOf(check) !== -1 ? match = true : null

    !this.sensing ? console.log('BlockLike.js Notice: isKeyPressed() ingnored. Stage sensing not enabled.') : null // eslint-disable-line no-console

    return match
  }
}


/***/ }),

/***/ "./src/text-ui-element.js":
/*!********************************!*\
  !*** ./src/text-ui-element.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextUiElement)
/* harmony export */ });
/**
 * Class representing the UI Elements attached to a sprite.
 * Each Sprite may have one.
 * @private
 */
class TextUiElement {
  /**
  * constructor - Creates a ui element that "attahces" to a sprite.
  *
  * @param {object} sprite - the sprite to which the ui is attached.
  * @param {string} type - what ui to create (say bubble, think bubble or ask box)
  * @param {string} text -  what the text said/thought/ask will be.
  * @param {object} askId - the ask box identifier (used to manage events).
  */
  constructor (sprite, type, text) {
    const el = document.createElement('div')
    /**
    * askInput - encapsulate the functionality of the input field used to capture user input with ask().
    *
    * @return {object} - the input dom element.
    */
    function askInput () {
      /**
      * sendAnswer - dispatches an event when the user has submitted the input.
      */
      function sendAnswer (value) {
        const event = new window.CustomEvent(`blockLike.ask.${sprite.id}.${sprite.askId}`, { detail: { value, askId: sprite.askId } })
        document.dispatchEvent(event)
      }

      const input = document.createElement('input')
      input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          sendAnswer(input.value)
          input.value = ''
        }
      })
      el.appendChild(input)

      const submit = document.createElement('button')
      submit.innerHTML = '&#x2713'
      submit.addEventListener('click', () => {
        sendAnswer(input.value)
        input.value = ''
      })
      el.appendChild(submit)

      return input
    }

    this.text = text.toString()
    this.type = type

    // Convert the center based x coordinate to a left based one.
    const x = sprite.x - (sprite.width / 2)
    // Convert the center based y coordinate to a left based one.
    const y = (sprite.y * -1) - (sprite.height / 2)

    el.style.position = 'absolute'
    el.innerHTML = `${text}<br />`

    // looks
    // TODO: make this nicer...
    el.style.left = `${(sprite.stageWidth / 2) + x + (sprite.width * 0.6)}px`
    el.style.top = `${((sprite.stageHeight / 2) + y) - 80 - (Math.floor(this.text.length / 30) * 16)}px`

    el.style.zIndex = sprite.z
    el.className = `blocklike-${type}`

    let iel = null
    if (type === 'ask') {
      iel = askInput(sprite, el)
      el.style.top = `${((sprite.stageHeight / 2) + y) - 110 - (Math.floor(this.text.length / 30) * 16)}px`
    }

    sprite.element.el.parentNode.insertBefore(el, sprite.element.el)
    iel ? iel.focus() : null

    el.style.visibility = `${(sprite.showing ? 'visible' : 'hidden')}`

    this.el = el
  }

  /**
  * update - updated the DOM element (moves with sprite).
  *
  * @param {object} sprite - the sprite to which the ui is attached.
  */
  update (sprite) {
    const el = sprite.textui.el

    // Convert the center based x coordinate to a left based one.
    const x = sprite.x - (sprite.width / 2)
    // Convert the center based y coordinate to a left based one.
    const y = (sprite.y * -1) - (sprite.height / 2)

    // looks
    // TODO: make this nicer...
    el.style.left = `${(sprite.stageWidth / 2) + x + (sprite.width * 0.6)}px`
    el.style.top = `${((sprite.stageHeight / 2) + y) - 80 - (Math.floor(this.text.length / 30) * 16)}px`

    if (sprite.textui.type === 'ask') {
      el.style.top = `${((sprite.stageHeight / 2) + y) - 110 - (Math.floor(this.text.length / 30) * 16)}px`
    }

    el.style.visibility = `${(sprite.showing ? 'visible' : 'hidden')}`
  }

  /**
  * delete - deletes the DOM element (hides it).
  *
  * @param {object} sprite - the sprite to which the ui is attached.
  */
  delete (sprite) {
    const el = sprite.textui.el

    el.parentNode.removeChild(el)
    return null
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Backdrop": () => (/* reexport safe */ _backdrop__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Costume": () => (/* reexport safe */ _costume__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "Sprite": () => (/* reexport safe */ _sprite__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Stage": () => (/* reexport safe */ _stage__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _document_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document-css */ "./src/document-css.js");
/* harmony import */ var _platforms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platforms */ "./src/platforms.js");
/* harmony import */ var _stage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stage */ "./src/stage.js");
/* harmony import */ var _backdrop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./backdrop */ "./src/backdrop.js");
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");
/* harmony import */ var _costume__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./costume */ "./src/costume.js");
/**
* BlockLike.js
*
* BlockLike.js is an educational JavaScript library.
* It bridges the gap between block-based and text-based programming.
*
* BlockLike.js is designed following Scratch concepts, methods and patterns.
* The screen is a centered stage. Interaction is with Sprites.
* Code is executed in a "paced" manner.
* Scratch block code and BlockLike.js text code are meant to be
* as literally similar as possible.
*
* BlockLike.js is written in ES6/ES7 flavored JavaScript.
* It is environment independent.
* It can be used anywhere modern JavaScript runs.
*
* @author Yaron (Ron) Ilan
* @email blocklike@ronilan.com
*
* Copyright 2018
* Fabriqué au Canada : Made in Canada
*/




 // eslint-disable-line no-unused-vars
 // eslint-disable-line no-unused-vars
 // eslint-disable-line no-unused-vars
 // eslint-disable-line no-unused-vars






(function init () {
  const style = document.createElement('style')

  style.type = 'text/css'
  style.innerHTML = `
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.defaultCSS}\n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.uiCSS}\n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.thinkCSS}\n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.sayCSS} \n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.askCSS}`

  document.getElementsByTagName('head')[0].appendChild(style)

  ;(0,_platforms__WEBPACK_IMPORTED_MODULE_1__["default"])()
}())

})();

blockLike = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tsaWtlLTEuMC41LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDZSx1QkFBdUIsNkNBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQSxxQkFBcUI7O0FBRXJCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRnlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ2Usc0JBQXNCLDZDQUFJO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0MsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFVBQVU7QUFDdEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxnQkFBZ0I7O0FBRXBGO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlCQUFpQjs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUZBQW1GLFVBQVUscUJBQXFCOztBQUVsSDtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsVUFBVSxTQUFTO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxVQUFVLFNBQVM7QUFDbkU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQSxJQUFJLGtEQUFZO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbG5Cb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBLElBQUksa0RBQVk7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pHQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLFVBQVUsUUFBUTtBQUNsQjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0EsaUNBQWlDLEtBQUs7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEIsVUFBVSxPQUFPO0FBQ2pCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQSwrQ0FBK0MsT0FBTztBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEIsVUFBVSxRQUFRO0FBQ2xCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsUUFBUTtBQUNsQixVQUFVLFFBQVE7QUFDbEI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLFVBQVUsUUFBUTtBQUNsQjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEIsVUFBVSxRQUFRO0FBQ2xCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQSxrRUFBa0UsT0FBTztBQUN6RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEIsVUFBVSxRQUFRO0FBQ2xCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsY0FBYyxTQUFTO0FBQ3hEOztBQUVBLGtCQUFrQixLQUFLLHdEQUF3RDtBQUMvRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsUUFBUTtBQUNsQixVQUFVLFFBQVE7QUFDbEI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBLGtCQUFrQixLQUFLLHNEQUFzRCxZQUFZLEdBQUc7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEIsVUFBVSxRQUFRO0FBQ2xCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLHlDQUF5QyxLQUFLLE9BQU8sTUFBTSxvQkFBb0I7O0FBRTdGO0FBQ0EsaUVBQWlFLHlDQUF5QyxTQUFTLE9BQU8sTUFBTSxvQkFBb0I7QUFDcEosSUFBSTtBQUNKO0FBQ0EsY0FBYyx5Q0FBeUMsS0FBSyxvQkFBb0I7QUFDaEY7O0FBRUE7QUFDQSxZQUFZLEtBQUs7QUFDakIsb0RBQW9ELG9CQUFvQjtBQUN4RSx5REFBeUQsb0JBQW9CO0FBQzdFO0FBQ0EsT0FBTztBQUNQLEtBQUssRUFBRTs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsUUFBUTtBQUNsQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGlDQUFpQyxRQUFRLDJDQUEyQztBQUMxSDs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLGlCQUFpQixLQUFLO0FBQzFEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0EseUNBQXlDLDRCQUE0QjtBQUNyRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsUUFBUTtBQUNsQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsVUFBVTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsV0FBVyxVQUFVO0FBQ3JCO0FBQ2U7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLDREQUE0RDtBQUM1RDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1U29DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLFVBQVU7QUFDekI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLDRCQUE0QjtBQUN0RCwyQkFBMkIsNkJBQTZCO0FBQ3hEOztBQUVBLHVCQUF1Qiw0QkFBNEI7QUFDbkQsc0JBQXNCLDZCQUE2QjtBQUNuRDs7QUFFQSw2QkFBNkIsd0NBQXdDOztBQUVyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLG9EQUFvRDs7QUFFcEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0Usc0NBQXNDOztBQUV0RztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLCtDQUFTOztBQUViO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkM7QUFDQSxRQUFRLDREQUE0RDtBQUNwRTtBQUNBO0FBQ0EsTUFBTSxtREFBbUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0k2Qjs7QUFFYTtBQUNFO0FBQ2I7QUFDYzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLHFCQUFxQiwrQ0FBTTtBQUMxQztBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDQSwyQkFBMkI7QUFDM0IsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QywwQkFBMEI7O0FBRXZFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdEQUFPLEdBQUcscUNBQXFDO0FBQzFFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsZ0RBQU87QUFDbEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLHVEQUFhO0FBQ3BDLHVCQUF1QixzREFBWTs7QUFFbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsZ0RBQU87QUFDakM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0EsbUVBQW1FLFFBQVEsS0FBSyxlQUFlO0FBQy9GOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0Esd0RBQXdELFFBQVE7QUFDaEU7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSx3REFBYTtBQUN0RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsd0RBQWE7QUFDdEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5RUFBeUUsd0RBQWE7O0FBRXRGO0FBQ0EsaURBQWlELFFBQVEsR0FBRyxTQUFTO0FBQ3JFO0FBQ0Esc0RBQXNELE1BQU0sR0FBRyxTQUFTO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUFNLHFEQUFpQixDQUFDO0FBQ3hCLE1BQU0sZ0RBQVksQ0FBQztBQUNuQixNQUFNLG1EQUFlLENBQUM7QUFDdEIsTUFBTSxpREFBYSxFQUFFO0FBQ3JCLE1BQU0saURBQWEsQ0FBQzs7QUFFcEI7O0FBRUEsRUFBRSx1REFBUztBQUNYLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvYmFja2Ryb3AuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL2Nvc3R1bWUuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL2RvY3VtZW50LWNzcy5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvZWxlbWVudC1jc3MuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL2VudGl0eS5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvbG9vay5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvcGxhdGZvcm1zLmpzIiwid2VicGFjazovL2Jsb2NrTGlrZS8uL3NyYy9yZXdyaXRlci5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3ByaXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2UtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2Utc2Vuc2luZy5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2Utc3VyZmFjZS5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2UuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL3RleHQtdWktZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ibG9ja0xpa2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ibG9ja0xpa2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvbGliLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb29rIGZyb20gJy4vbG9vaydcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBCYWNrZHJvcC5cbiAqIEJhY2tkcm9wcyBjYW4gYmUgYWRkZWQgdG8gdGhlIFN0YWdlLlxuICogQGV4dGVuZHMgTG9va1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3Aoe1xuICogICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL2JhY2tkcm9wLnN2ZydcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKHtcbiAqICAgY29sb3I6ICcjQTJEQUZGJ1xuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tkcm9wIGV4dGVuZHMgTG9vayB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIEJhY2tkcm9wIHRvIGJlIHVzZWQgYnkgU3RhZ2Ugb2JqZWN0cy5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIGJhY2tkcm9wLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmltYWdlIC0gYSBVUkkgKG9yIGRhdGEgVVJJKSBmb3IgdGhlIGJhY2tkcm9wIGltYWdlLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gYSBjc3MgY29sb3Igc3RyaW5nICgnI2ZmMDAwMCcsICdyZWQnKVxuICAqL1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7fVxuICAgIGNvbnN0IGFjdHVhbCA9IHsgLi4uZGVmYXVsdHMsIC4uLm9wdGlvbnMgfVxuXG4gICAgc3VwZXIoKVxuXG4gICAgdGhpcy5pbWFnZSA9IGFjdHVhbC5pbWFnZVxuICAgIHRoaXMuY29sb3IgPSBhY3R1YWwuY29sb3JcblxuICAgIC8vIHByZWxvYWRcbiAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1hZ2VcbiAgICB9XG4gIH1cblxuICAvKiogU2V0dXAgQWN0aW9ucyAqICovXG5cbiAgLyoqXG4gICogYWRkVG8gLSBBZGRzIHRoZSBiYWNrZHJvcCB0byB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHdoaWNoIHN0YWdlIHRvIGFkZCB0aGUgYmFja2Ryb3AgdG9vLlxuICAqL1xuICBhZGRUbyAoc3RhZ2UpIHtcbiAgICBjb25zdCBjdXJTdGFnZSA9IHN0YWdlXG4gICAgc3RhZ2UuYmFja2Ryb3BzLnB1c2godGhpcylcbiAgICAvLyBpZiBcImJhcmVcIiBzZXQgdGhlIGFkZGVkIGFzIGFjdGl2ZVxuICAgICFzdGFnZS5iYWNrZHJvcCA/IGN1clN0YWdlLmJhY2tkcm9wID0gc3RhZ2UuYmFja2Ryb3BzWzBdIDogbnVsbFxuICAgIHN0YWdlLmVsZW1lbnQgPyBzdGFnZS5lbGVtZW50LnVwZGF0ZShzdGFnZSkgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyB0aGUgYmFja2Ryb3AgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5hZGRUbyhzdGFnZSk7XG4gICogYmFja2Ryb3AucmVtb3ZlRnJvbShzdGFnZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB3aGljaCBzdGFnZSB0byByZW1vdmUgdGhlIGJhY2tkcm9wIGZyb20uXG4gICovXG4gIHJlbW92ZUZyb20gKHN0YWdlKSB7XG4gICAgc3RhZ2UucmVtb3ZlQmFja2Ryb3AodGhpcylcbiAgfVxufVxuIiwiaW1wb3J0IExvb2sgZnJvbSAnLi9sb29rJ1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIENvc3R1bWUuXG4gKiBDb3N0dW1lcyBjYW4gYmUgYWRkZWQgdG8gYSBTcHJpdGUuXG4gKiBAZXh0ZW5kcyBMb29rXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKHtcbiAqICAgd2lkdGg6IDUwLFxuICogICBoZWlnaHQ6IDUwLFxuICogICBjb2xvcjogJyNBMkRBRkYnLFxuICogICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL3NoZWVwX3N0ZXAucG5nJ1xuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvc3R1bWUgZXh0ZW5kcyBMb29rIHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgQ29zdHVtZSB0byBiZSB1c2VkIGJ5IFNwcml0ZSBvYmplY3RzLi5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIGNvc3R1bWUuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMud2lkdGggLSB0aGUgY29zdHVtZSB3aWR0aCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmhlaWdodCAtIHRoZSBjb3N0dW1lIGhlaWdodCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmltYWdlIC0gYSBVUkkgKG9yIGRhdGEgVVJJKSBmb3IgdGhlIGNvc3R1bWUgaW1hZ2UuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29sb3IgLSBhIGNzcyBjb2xvciBzdHJpbmcgKCcjZmYwMDAwJywgJ3JlZCcpXG4gICovXG4gIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHdpZHRoOiAxMDAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIGNvbG9yOiBudWxsXG4gICAgfVxuICAgIGNvbnN0IGFjdHVhbCA9IHsgLi4uZGVmYXVsdHMsIC4uLm9wdGlvbnMgfVxuXG4gICAgc3VwZXIoKVxuXG4gICAgdGhpcy53aWR0aCA9IGFjdHVhbC53aWR0aFxuICAgIHRoaXMuaGVpZ2h0ID0gYWN0dWFsLmhlaWdodFxuICAgIHRoaXMudmlzaWJsZVdpZHRoID0gYWN0dWFsLndpZHRoXG4gICAgdGhpcy52aXNpYmxlSGVpZ2h0ID0gYWN0dWFsLmhlaWdodFxuXG4gICAgdGhpcy5pbWFnZSA9IGFjdHVhbC5pbWFnZVxuICAgIHRoaXMuY29sb3IgPSBhY3R1YWwuY29sb3JcblxuICAgIC8vIHByZWxvYWRcbiAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1hZ2VcbiAgICB9XG5cbiAgICB0aGlzLmlubmVySFRNTCA9ICcnXG4gIH1cblxuICAvKiogU2V0dXAgQWN0aW9ucyAqICovXG5cbiAgLyoqXG4gICogYWRkVG8gLSBBZGRzIHRoZSBjb3N0dW1lIHRvIHRoZSBzcHJpdGVcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuYWRkVG8oc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB3aGljaCBzcHJpdGUgdG8gYWRkIHRoZSBjb3N0dW1lIHRvby5cbiAgKi9cbiAgYWRkVG8gKHNwcml0ZSkge1xuICAgIGNvbnN0IGN1clNwcml0ZSA9IHNwcml0ZVxuICAgIHNwcml0ZS5jb3N0dW1lcy5wdXNoKHRoaXMpXG5cbiAgICAvLyBpZiBcImJhcmVcIiBzZXQgdGhlIGFkZGVkIGFzIGFjdGl2ZS5cbiAgICBpZiAoIXNwcml0ZS5jb3N0dW1lKSB7XG4gICAgICBjdXJTcHJpdGUuY29zdHVtZSA9IHNwcml0ZS5jb3N0dW1lc1swXVxuICAgICAgY3VyU3ByaXRlLndpZHRoID0gc3ByaXRlLmNvc3R1bWUudmlzaWJsZVdpZHRoXG4gICAgICBjdXJTcHJpdGUuaGVpZ2h0ID0gc3ByaXRlLmNvc3R1bWUudmlzaWJsZUhlaWdodFxuICAgIH1cblxuICAgIHNwcml0ZS5lbGVtZW50ID8gc3ByaXRlLmVsZW1lbnQudXBkYXRlKHNwcml0ZSkgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyB0aGUgY29zdHVtZSBmcm9tIHRvIHRoZSBzcHJpdGVcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuYWRkVG8oc3ByaXRlKTtcbiAgKiBjb3N0dW1lLnJlbW92ZUZyb20oc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB3aGljaCBzcHJpdGUgdG8gcmVtb3ZlIHRoZSBjb3N0dW1lIGZyb20uXG4gICovXG4gIHJlbW92ZUZyb20gKHNwcml0ZSkge1xuICAgIHNwcml0ZS5yZW1vdmVDb3N0dW1lKHRoaXMpXG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIHJlc2l6ZVRvSW1hZ2UgLSBzZXRzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjb3N0dW1lIHRvIHRoYXQgb2YgdGhlIGltYWdlIGZpbGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKHtcbiAgKiAgIGltYWdlOiAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9kL2QzL1NoZWVwX2luX2dyYXkuc3ZnJ1xuICAqIH0pO1xuICAqXG4gICogY29zdHVtZS5yZXNpemVUb0ltYWdlKCk7XG4gICovXG4gIHJlc2l6ZVRvSW1hZ2UgKCkge1xuICAgIC8vIHJlZ2lzdGVyIHRoZSBpbWFnZSBzaXplIGZyb20gdGhlIGZpbGVcbiAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKClcbiAgICAgIGNvbnN0IG1lID0gdGhpc1xuXG4gICAgICBpbWFnZS5zcmMgPSB0aGlzLmltYWdlXG5cbiAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIG1lLndpZHRoID0gaW1hZ2Uud2lkdGhcbiAgICAgICAgbWUuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0XG4gICAgICAgIG1lLnZpc2libGVXaWR0aCA9IG1lLndpZHRoXG4gICAgICAgIG1lLnZpc2libGVIZWlnaHQgPSBtZS5oZWlnaHRcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogaW5uZXIgLSBQbGFjZXMgYW4gSFRNTCBlbGVtZW50IGluc2lkZSB0aGUgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaW5uZXIoJzxwIGNsYXNzPVwiYmlnIGNlbnRlcmVkIHJhaW5ib3dcIj46KTwvcD4nKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogY29zdHVtZS5pbm5lcignSSBsaWtlIHRleHQgb25seScpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IGh0bWwgLSB0aGUgaHRtbCB0byBpbnNlcnQuXG4gICovXG4gIGlubmVyIChodG1sKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBodG1sXG4gIH1cblxuICAvKipcbiAgKiBpbnNlcnQgLSBQbGFjZXMgYSBET00gZWxlbWVudCBpbnNpZGUgdGhlIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmluc2VydChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXktaHRtbC1jcmVhdGlvbicpKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtIHRoZSBET00gZWxlbWVudC5cbiAgKi9cbiAgaW5zZXJ0IChlbCkge1xuICAgIGNvbnN0IGllbCA9IGVsLmNsb25lTm9kZSh0cnVlKVxuICAgIGllbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIGllbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2luaGVyaXQnXG5cbiAgICB0aGlzLmltYWdlID0gbnVsbFxuICAgIHRoaXMuY29sb3IgPSAndHJhbnNwYXJlbnQnXG4gICAgdGhpcy5pbm5lckhUTUwgPSBpZWwub3V0ZXJIVE1MXG4gIH1cbn1cbiIsIi8qKlxuKiBDb2xsZWN0aW9uIG9mIGNzcyBzdHJpbmdzIHRvIGJlIGluamVjdGVkIHRvIHRoZSBoZWFkIHNlY3Rpb24gb2YgYSBwYWdlLlxuKiBAcHJpdmF0ZVxuKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q1NTID0gYFxuKiB7IFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOyAgICAgICAgICAgICAgICAvKiBwcmV2ZW50IGNhbGxvdXQgdG8gY29weSBpbWFnZSwgZXRjIHdoZW4gdGFwIHRvIGhvbGQgKi9cbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7IC8qIHByZXZlbnQgdGFwIGhpZ2hsaWdodCBjb2xvciAvIHNoYWRvdyAqL1xufVxuaHRtbCwgYm9keXtcbiAgbWFyZ2luOjA7XG4gIHBhZGRpbmc6MDtcbn1cbmBcblxuZXhwb3J0IGNvbnN0IHVpQ1NTID0gYFxuLmJsb2NrbGlrZS1mbGFnIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiA2NXB4O1xuICBsaW5lLWhlaWdodDogNjVweDtcbiAgcGFkZGluZzogMzJweDtcbiAgY29sb3I6ICMyMjI7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM2NjY7XG4gIGJvcmRlci1yYWRpdXM6IDY1cHg7XG59XG5gXG5cbmV4cG9ydCBjb25zdCB0aGlua0NTUyA9IGBcbi5ibG9ja2xpa2UtdGhpbmsge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG1pbi13aWR0aDogNjBweDtcbiAgbWF4LXdpZHRoOiAyMDBweDtcbiAgbGVmdDogMjAwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE2cHg7XG4gIG1pbi1oZWlnaHQ6IDE2cHg7XG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjb2xvcjogIzIyMjtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYTtcbiAgYm9yZGVyOiAycHggc29saWQgIzQ0NDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbn1cbi5ibG9ja2xpa2UtdGhpbms6YmVmb3JlIHtcbiAgcG9zaXRpb246YWJzb2x1dGU7XG4gIGJvdHRvbTogLTMwcHg7XG4gIGxlZnQ6IDBweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYTtcbiAgYm9yZGVyOiAycHggc29saWQgIzQ0NDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgY29udGVudDogXCJcIjtcbn1cbi5ibG9ja2xpa2UtdGhpbms6YWZ0ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogLTQ1cHg7XG4gIGxlZnQ6IDBweDtcbiAgd2lkdGg6IDE1cHg7XG4gIGhlaWdodDogMTVweDtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYTtcbiAgYm9yZGVyOiAycHggc29saWQgIzQ0NDtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgY29udGVudDogXCJcIjtcbn1cbmBcblxuZXhwb3J0IGNvbnN0IHNheUNTUyA9IGBcbi5ibG9ja2xpa2UtYXNrLFxuLmJsb2NrbGlrZS1zYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWluLXdpZHRoOiA2MHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtaW4taGVpZ2h0OiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcbiAgYm9yZGVyOiAycHggc29saWQgIzQ0NDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbn1cbi5ibG9ja2xpa2UtYXNrOmJlZm9yZSxcbi5ibG9ja2xpa2Utc2F5OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBsZWZ0OiAxM3B4O1xuICByaWdodDogYXV0bztcbiAgdG9wOiBhdXRvO1xuICBib3R0b206IC0zM3B4O1xuICBib3JkZXI6IDE2cHggc29saWQ7XG4gIGJvcmRlci1jb2xvcjogIzQ0NCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjNDQ0O1xufVxuLmJsb2NrbGlrZS1hc2s6YWZ0ZXIsXG4uYmxvY2tsaWtlLXNheTphZnRlciB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBsZWZ0OiAxNXB4O1xuICByaWdodDogYXV0bztcbiAgdG9wOiBhdXRvO1xuICBib3R0b206IC0yOHB4O1xuICBib3JkZXI6IDE2cHggc29saWQ7XG4gIGJvcmRlci1jb2xvcjogI2ZhZmFmYSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmFmYWZhO1xufVxuYFxuXG5leHBvcnQgY29uc3QgYXNrQ1NTID0gYFxuLmJsb2NrbGlrZS1hc2sgaW5wdXQge1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBwYWRkaW5nOiAycHg7XG4gIG1hcmdpbjogMnB4O1xuICB3aWR0aDogNzUlO1xufVxuLmJsb2NrbGlrZS1hc2sgYnV0dG9uIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgaGVpZ2h0OiAyNnB4O1xuICBwYWRkaW5nOiAwIDVweDtcbiAgbWFyZ2luOiAwO1xufVxuYFxuIiwiLyoqXG4qIEVuY2Fwc3VsYXRlcyB0aGUgZnVuY3Rpb25hbGl0eSBvZiBtYW5hZ2luZyBlbGVtZW50IHN0eWxlIHByb3BlcnRpZXMgZm9yIHRoZSBlbnRpdGllcy5cbiovXG5cbi8qKlxuKiBhcHBseSAtIGFwcGx5IGNzc1J1bGVzIG9mIGFuIGVudGl0eSB0byBpdHMgRE9NIGVsZW1lbnQuXG4qXG4qIEBwYXJhbSB7ZnVuY3Rpb259IGVudGl0eSAtIGEgU3ByaXRlIG9yIFN0YWdlLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseSAoZW50aXR5KSB7XG4gIGNvbnN0IGN1ckVudGl0eSA9IGVudGl0eVxuICAvLyBTcHJpdGVzIGhhdmUgQ29zdHVtZXMsIFN0YWdlIGhhcyBCYWNrZHJvcCwgZmlndXJlIG91dCB3aGljaCBlbnRpdHkgaXQgaXMuXG4gIGNvbnN0IGN1ckxvb2sgPSBlbnRpdHkuYmFja2Ryb3AgfHwgZW50aXR5LmNvc3R1bWVcbiAgY29uc3QgY3VyTG9va3MgPSBlbnRpdHkuYmFja2Ryb3BzIHx8IGVudGl0eS5jb3N0dW1lc1xuXG4gIGNvbnN0IGVsID0gZW50aXR5LmVsZW1lbnQuZWxcblxuICAvLyByZW1vdmUgYW55IHN0eWxlIGFwcGxpZWQgYnkgYW55IGxvb2tcbiAgaWYgKGN1ckxvb2tzKSB7XG4gICAgY3VyTG9va3MuZm9yRWFjaCgoYikgPT4ge1xuICAgICAgYi5jc3NSdWxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgKGcpID0+IGdbMV0udG9VcHBlckNhc2UoKSlcbiAgICAgICAgZWwuc3R5bGVbY2FtZWxDYXNlZF0gPSAnJ1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gYWRkIGN1cnJlbnQgbG9vayBzdHlsZXNcbiAgaWYgKGN1ckxvb2spIHtcbiAgICBjdXJMb29rLmNzc1J1bGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgKGcpID0+IGdbMV0udG9VcHBlckNhc2UoKSlcbiAgICAgIGVsLnN0eWxlW2NhbWVsQ2FzZWRdID0gaXRlbS52YWx1ZVxuICAgIH0pXG4gIH1cblxuICAvLyBBZGQgY3VyRW50aXR5IHN0eWxlcy4gTXVzdCBiZSBkb25lIGFmdGVyIGxvb2sgc3R5bGVzLlxuICBjdXJFbnRpdHkuY3NzUnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgKGcpID0+IGdbMV0udG9VcHBlckNhc2UoKSlcbiAgICBlbC5zdHlsZVtjYW1lbENhc2VkXSA9IGl0ZW0udmFsdWVcbiAgfSlcbn1cblxuLyoqXG4qIHJlZ2lzdGVyIC0gcmVnaXN0ZXIgY3NzUnVsZXMgb2YgZm9yIGFuIGVudGl0eSBiYXNlZCBvbiB1c2VyIGlucHV0LlxuKiBOb3RlOiBBbGwgcnVsZXMgYXJlIHJlZ2lzdGVyZWQgZGFzaC1jYXNlIGEtbGEgY3NzLlxuKiBUaGlzIGlzIHJlZ2FyZGxlc3Mgb2YgaG93IHRoZXkgYXJlIHNldCBhbmQgdGhvdWdoIHRoZXkgYXJlIHVzZWQgY2FtZWxDYXNlLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gcHJvcCAtIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gY29sb3IpLiBBbHRlcm5hdGl2ZWx5IGFuIG9iamVjdCB3aXRoIGtleTogdmFsdWUgcGFpcnMuXG4qIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBlbnRpdHkgLSBhIFNwcml0ZSBvciBTdGFnZS5cbiovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIgKHByb3AsIHZhbHVlLCBlbnRpdHkpIHtcbiAgY29uc3QgY3VyRW50aXR5ID0gZW50aXR5XG5cbiAgaWYgKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZGFzaGVkID0gcHJvcC5yZXBsYWNlKC8oW0EtWl0pL2csICgkMSkgPT4gYC0keyQxLnRvTG93ZXJDYXNlKCl9YClcbiAgICBjdXJFbnRpdHkuY3NzUnVsZXMucHVzaCh7IHByb3A6IGRhc2hlZCwgdmFsdWUgfSlcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvcCA9PT0gJ29iamVjdCcgJiYgIXZhbHVlKSB7XG4gICAgT2JqZWN0LmtleXMocHJvcCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBkYXNoZWQgPSBrZXkucmVwbGFjZSgvKFtBLVpdKS9nLCAoJDEpID0+IGAtJHskMS50b0xvd2VyQ2FzZSgpfWApXG4gICAgICBjdXJFbnRpdHkuY3NzUnVsZXMucHVzaCh7IHByb3A6IGRhc2hlZCwgdmFsdWU6IHByb3Bba2V5XSB9KVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCByZXdyaXRlIGZyb20gJy4vcmV3cml0ZXInXG5pbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9lbGVtZW50LWNzcydcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gZW50aXR5LlxuICogQWJzdHJhY3QgZm9yIFN0YWdlIGFuZCBTcHJpdGUuXG4gKiBEbyBub3QgaW5zdGFudGlhdGUgb2JqZWN0cyBkaXJlY3RseSBmcm9tIHRoaXMgY2xhc3MuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBFbnRpdHkgaXMgYWJzdHJhY3QgZm9yIFN0YWdlIGFuZCBTcHJpdGUuXG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFjZSAtIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHBhY2UgcGFjZWQgbWV0aG9kcy5cbiAgKi9cbiAgY29uc3RydWN0b3IgKHBhY2UpIHtcbiAgICBFbnRpdHkubWVzc2FnZUxpc3RlbmVycyA9IFtdXG4gICAgdGhpcy5pZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpXG4gICAgdGhpcy5wYWNlID0gcGFjZVxuICAgIHRoaXMuc291bmRzID0gW10gLy8gd2lsbCBob2xkIGFsbCBzb3VuZHMgY3VycmVudGx5IHBsYXllZCBieSBlbnRpdHksIGlmIGFueS5cbiAgICAvKlxuICAgICogUGFjZWQgbWV0aG9kcyB3b3JrIGluIHRoZSBmb2xsb3dpbmcgbWFubmVyOlxuICAgICogMS4gRXZlbnQgTWV0aG9kIGZ1bmN0aW9ucyBhcmUgcmV3cml0dGVuLlxuICAgICogMi4gRm9yIHBhY2VkIG1ldGhvZHMgcmV3cml0ZXIgd2lsbCBhZGQgYW4gYXdhaXQgdG8gYSBwcm9taXNlIGFmdGVyIHRoZSBwYWNlZCBtZXRob2QgY2FsbC5cbiAgICAqIDMuIFRoZSBwcm9taXNlIHdpbGwgcmVzb2x2ZSBhZnRlciB7cGFjZX0gbWlsbGlzZWNvbmRzLlxuICAgICpcbiAgICAqIFRoaXMgYWxsb3dzIHRoZSBwYWNlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKi9cbiAgICB0aGlzLnBhY2VkID0gW1xuICAgICAgJ2dvVG8nLFxuICAgICAgJ21vdmUnLFxuICAgICAgJ2NoYW5nZVgnLFxuICAgICAgJ2NoYW5nZVknLFxuICAgICAgJ3NldFgnLFxuICAgICAgJ3NldFknLFxuICAgICAgJ2dvVG93YXJkcycsXG4gICAgICAndHVyblJpZ2h0JyxcbiAgICAgICd0dXJuTGVmdCcsXG4gICAgICAncG9pbnRJbkRpcmVjdGlvbicsXG4gICAgICAncG9pbnRUb3dhcmRzJyxcbiAgICAgICdjaGFuZ2VTaXplJyxcbiAgICAgICdzZXRTaXplJyxcbiAgICAgICdzYXknLFxuICAgICAgJ3RoaW5rJyxcbiAgICAgICdyZWZyZXNoJ1xuICAgIF1cblxuICAgIC8qXG4gICAgKiBXYWl0ZWQgbWV0aG9kcyB3b3JrIGluIHRoZSBmb2xsb3dpbmcgbWFubmVyOlxuICAgICogMS4gRXZlbnQgTWV0aG9kIGZ1bmN0aW9ucyBhcmUgcmV3cml0dGVuLlxuICAgICogMi4gRm9yIHdhaXRlZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLlxuICAgICogMy4gVGhlIHByb21pc2UgaW5jbHVkZXMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lci5cbiAgICAqIDQuIHJld3JpdGVyIG1vZGlmaWVzIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwsIGluc2VydGluZyBhIHRyaWdnZXJpbmdJZCBwYXJhbWV0ZXIuXG4gICAgKiA0LiBUaGUgZXZlbnQgbGlzdGVuZXIgaXMgdW5pcXVlIHRvIHRoZSB0cmlnZ2VyaW5nSWQuXG4gICAgKiA1LiBXaGVuIHRoZSBtZXRob2QgY29tcGxldGVzIHJ1bm5pbmcgYW4gZXZlbnQgaXMgZGlzcGF0Y2hlZCByZXNvbHZpbmcgdGhlIHByb21pc2UuXG4gICAgKlxuICAgICogVGhpcyBhbGxvd3MgdGhlIHdhaXRlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKi9cbiAgICB0aGlzLndhaXRlZCA9IFtcbiAgICAgICd3YWl0JyxcbiAgICAgICdnbGlkZScsXG4gICAgICAnc2F5V2FpdCcsXG4gICAgICAndGhpbmtXYWl0JyxcbiAgICAgICdwbGF5U291bmRVbnRpbERvbmUnLFxuICAgICAgJ2Jyb2FkY2FzdE1lc3NhZ2VXYWl0J1xuICAgIF1cblxuICAgIC8qXG4gICAgKiB3YWl0ZWRSZXR1bnJlZCBtZXRob2RzIHdvcmsgc2ltaWxhcmx5IHRvIHdhaXRlZCBtZXRob2RzIG9ubHkgdGhhdCB0aGV5IGVuYWJsZSBjYXB0dXJpbmcgYSB2YWx1ZVxuICAgICogaW50byBhIGdsb2JhbGx5IGRlY2xhcmVkIHZhcmlhYmxlIChvciBhbiB1bmRlY2xhcmVkIG9uZSkuXG4gICAgKiAxLiBFdmVudCBNZXRob2QgZnVuY3Rpb25zIGFyZSByZXdyaXR0ZW4uXG4gICAgKiAyLiBGb3Igd2FpdGVkUmV0dXJuZWQgbWV0aG9kcyByZXdyaXRlciB3aWxsIGFkZCBhbiBhd2FpdCB0byBhIHByb21pc2UgYWZ0ZXIgdGhlIHdhaXRlZCBtZXRob2QgY2FsbC5cbiAgICAqIDMuIFRoZSBwcm9taXNlIGluY2x1ZGVzIGEgZG9jdW1lbnQgbGV2ZWwgZXZlbnQgbGlzdGVuZXIuXG4gICAgKiA0LiByZXdyaXRlciBtb2RpZmllcyB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLCBpbnNlcnRpbmc6XG4gICAgKiAgIC0gdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIGludG8gd2hpY2ggYSB2YWx1ZSBpcyByZXR1cm5lZC5cbiAgICAqICAgLSBhIHRyaWdnZXJpbmdJZCBwYXJhbWV0ZXIuXG4gICAgKiA0LiBUaGUgZXZlbnQgbGlzdGVuZXIgaXMgdW5pcXVlIHRvIHRoZSB0cmlnZ2VyaW5nSWQuXG4gICAgKiA1LiBXaGVuIHRoZSBtZXRob2QgY29tcGxldGVzIHJ1bm5pbmcgYW4gZXZlbnQgaXMgZGlzcGF0Y2hlZCByZXNvbHZpbmcgdGhlIHByb21pc2UuXG4gICAgKiA2LiBUaGUgdmFsdWUgcmV0dXJuZWQgaXMgdHJhbnNmZXJlZCBpbnRvIHRoZSB2YXJpYWJsZSB1c2luZyBldmFsLlxuICAgICpcbiAgICAqIFRoaXMgYWxsb3dzIHRoZSB3YWl0ZWQgbWV0aG9kIHRvIGhhbHQgZXhlY3V0aW9uIG9mIGFueSBjb2RlIGZvbGxvd2luZyBpdCB1bnRpbCBpdCBpcyBkb25lLlxuICAgICogQXQgd2hpY2ggcG9pbnQgdGhlIHZhcmlhYmxlIGhhcyBcImNhcHR1cmVkXCIgdGhlIHZhbHVlLlxuICAgICovXG4gICAgdGhpcy53YWl0ZWRSZXR1cm5lZCA9IFtcbiAgICAgICdpbnZva2UnLFxuICAgICAgJ2FzaydcbiAgICBdXG5cbiAgICAvKlxuICAgICogRXZlbnQgbWV0aG9kcyAoZXZlbnRlZCkgYXJlIGNvbnRhaW5lcnMgZm9yIGZ1bmN0aW9ucyB0byBiZSByZXdyaXR0ZW4uXG4gICAgKiBXaGVuIGFuIGV2ZW50IG1ldGhvZCBpcyBuZXN0ZWQgaW5zaWRlIGFub3RoZXIgdGhlIGNvZGUgb2YgdGhlIGlubmVyIG1ldGhvZCBpcyBOT1QgcmV3cml0dGVuLlxuICAgICovXG4gICAgdGhpcy5ldmVudGVkID0gW1xuICAgICAgJ3doZW5GbGFnJyxcbiAgICAgICd3aGVuTG9hZGVkJyxcbiAgICAgICd3aGVuQ2xpY2tlZCcsXG4gICAgICAnd2hlbktleVByZXNzZWQnLFxuICAgICAgJ3doZW5FdmVudCcsXG4gICAgICAnd2hlblJlY2VpdmVNZXNzYWdlJyxcbiAgICAgICd3aGVuQ2xvbmVkJ1xuICAgIF1cbiAgfVxuXG4gIC8qKlxuICAqIF9nZW5lcmF0ZVVVSUQgLSBnZW5lcmF0ZXMgYSB1bmlxdWUgSUQuXG4gICogU291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9jcmVhdGUtZ3VpZC11dWlkLWluLWphdmFzY3JpcHRcbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHJldHVybiB7c3RyaW5nfSAtIGEgdW5pcXVlIGlkLlxuICAqL1xuICBfZ2VuZXJhdGVVVUlEICgpIHtcbiAgICBsZXQgZFxuICAgIGxldCByXG5cbiAgICBkID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblxuICAgIGlmICh3aW5kb3cucGVyZm9ybWFuY2UgJiYgdHlwZW9mIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGQgKz0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIC8vIHVzZSBoaWdoLXByZWNpc2lvbiB0aW1lciBpZiBhdmFpbGFibGVcbiAgICB9XG5cbiAgICBjb25zdCB1dWlkID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xuICAgICAgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW1peGVkLW9wZXJhdG9ycywgbm8tYml0d2lzZVxuICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KVxuICAgICAgcmV0dXJuIChjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNikgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1taXhlZC1vcGVyYXRvcnMsIG5vLWJpdHdpc2VcbiAgICB9KVxuXG4gICAgcmV0dXJuIHV1aWRcbiAgfVxuXG4gIC8qKlxuICAqIF9yZWxlYXNlV2FpdGVkIC0gcmVsZWFzZXMgYSB3YWl0ZWQgcHJvbWlzZSBieSBkaXNwYXRjaGluZyBhbiBldmVudC5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtzdHJpbmd9IHRyaWdnZXJpbmdJZCAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0aGF0IGludm9rZWQgdGhlIGNvZGUgdGhhdCByZXF1ZXN0ZWQgdGhlIHdhaXQuXG4gICovXG4gIF9yZWxlYXNlV2FpdGVkICh0cmlnZ2VyaW5nSWQpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoYGJsb2NrTGlrZS53YWl0ZWQuJHt0cmlnZ2VyaW5nSWR9YCwgeyBkZXRhaWw6IHsgdmFsdWU6IDAgfSB9KVxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gIH1cblxuICAvKipcbiAgKiBfc2V0VG9WYXIgLSBzZXRzIGEgZ2xvYmFsbHkgc2NvcGVkIHVzZXIgZGVmaW5lZCB2YXJpYWJsZSB3aG8ncyBuYW1lIGlzIHNwZWNpZmllZCBhcyBhIGEgc3RyaW5nXG4gICogd2l0aCB0aGUgdmFsdWUgcHJvdmlkZWQuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7dmFyU3RyaW5nfSB0ZXh0IC0gdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIHdoaWNoIHZhbHVlIHNob3VsZCBiZSBzZXQuXG4gICogQHBhcmFtIHthbnl9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIHNldC5cbiAgKi9cbiAgX3NldFRvVmFyICh2YXJTdHJpbmcsIHZhbHVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGV2YWwoYCR7dmFyU3RyaW5nfSA9ICcke3ZhbHVlfSdgKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgKCdCbG9ja0xpa2UuanMgRXJyb3I6IFZhcmlhYmxlcyBhY2NlcHRpbmcgYSB2YWx1ZSBtdXN0IGJlIGRlY2xhcmVkIGluIHRoZSBnbG9iYWwgc2NvcGUuJykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby10aHJvdy1saXRlcmFsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogX2V4ZWMgLSBhc3luY2hyb25vdXMgZnVuY3Rpb24gZXhlY3V0aW9uLlxuICAqIFRoaXMgaXMgd2hhdCBjcmVhdGVzIHRoZSBcInBhY2VkXCIgZXhlY3V0aW9uIG9mIHRoZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9ucy5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKiBAcGFyYW0ge2FycmF5fSBhcmdzQXJyIC0gYW4gYXJyYXkgb2YgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGZ1bmN0aW9uLlxuICAqL1xuICBfZXhlYyAoZnVuYywgYXJnc0Fycikge1xuICAgIGNvbnN0IG1lID0gdGhpc1xuICAgIG1lLnRyaWdnZXJpbmdJZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpXG4gICAgY29uc3QgZiA9IHJld3JpdGUoZnVuYywgbWUpXG4gICAgcmV0dXJuIGYuYXBwbHkobWUsIGFyZ3NBcnIpXG4gIH1cblxuICAvKipcbiAgKiBpbnZva2UgLSBpbnZva2UgYSBmdW5jdGlvbi4gQWxsb3dzIHBhc3NpbmcgYW4gYXJndW1lbnQgb3IgYXJyYXkgb2YgYXJndW1lbnRzLlxuICAqIEZ1bmN0aW9uIHdpbGwgYmUgXCJwYWNlZFwiIGFuZCBjb2RlIGV4ZWN1dGlvbiB3aWxsIGJlIFwid2FpdGVkXCIgdW50aWwgaXQgaXMgY29tcGxldGVkLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBzcHJpdGUud2hlbkZsYWcoKCkgPT4ge1xuICAqICAgdGhpcy5pbnZva2UoanVtcCk7XG4gICogICB0aGlzLmludm9rZSh0YWxrLCAnaGknKTtcbiAgKiAgIHRoaXMuaW52b2tlKHBhdHRlcm4sIFs1LCA1MCwgMTJdKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICogQHBhcmFtIHthcnJheX0gYXJnc0FyciAtIGFuIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBmdW5jdGlvbi4gQSBzaW5nbGUgdmFyaWFibGUgYWxzbyBhY2NlcHRlZC5cbiAgKi9cbiAgaW52b2tlIChmdW5jLCBhcmdzQXJyLCB0aGVWYXIgPSBudWxsLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdGhlVmFyIGFuZCB0cmlnZ2VyaW5nSWQgYXJlIG5vdCB1c2VyIHN1cHBsaWVkLCB0aGV5IGFyZSBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBsZXQgYXJncyA9IGFyZ3NBcnJcbiAgICAhKGFyZ3NBcnIgaW5zdGFuY2VvZiBBcnJheSkgPyBhcmdzID0gW2FyZ3NBcnJdIDogbnVsbFxuXG4gICAgdGhpcy5fZXhlYyhmdW5jLCBhcmdzKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIC8vIHRoaXMgaXMgdGhlIHdhaXRlZCBtZXRob2QgbGlzdGVuZXIuIHJlbGVhc2UgaXQuXG4gICAgICB0aGlzLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZClcbiAgICAgIC8vIHNldCB0aGUgdXNlciBkZWZpbmVkIHZhcmlhYmxlIHRvIHRoZSBjYXB0dXJlZCB2YWx1ZS5cbiAgICAgIHRoZVZhciA/IHRoaXMuX3NldFRvVmFyKHRoZVZhciwgcmVzdWx0KSA6IG51bGxcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICogd2FpdCAtIGNyZWF0ZXMgYSBwYXVzZSBpbiBleGVjdXRpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHRoaXMud2FpdCg1KTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHRpbWUgPSA1O1xuICAqIHRoaXMud2FpdCh0aW1lICogMC45NSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gc2VjIC0gbnVtYmVyIG9mIHNlY29uZHMgdG8gd2FpdC4gTXVzdCBiZSBhbiBhY3R1YWwgbnVtYmVyLlxuICAqL1xuICB3YWl0IChzZWMsIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICAvLyB0cmlnZ2VyaW5nSWQgaXMgbm90IHVzZXIgc3VwcGxpZWQsIGl0IGlzIGluc2VydGVkIGJ5IHJld3JpdGVyLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpXG4gICAgfSwgc2VjICogMTAwMClcbiAgfVxuXG4gIC8qKiBFdmVudHMgKiAqL1xuXG4gIC8qKlxuICAqIHdoZW5Mb2FkZWQgLSBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKiBUbyBiZSB1c2VkIHdpdGggY29kZSB0aGF0IG5lZWRzIHRvIHJ1biBvbmxvYWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5Mb2FkZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zYXkoJ0kgYW0gYWxpdmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5Mb2FkZWQgKGZ1bmMpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2V4ZWMoZnVuYywgW10pXG4gICAgfSwgMClcbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5GbGFnIC0gYWRkcyBhIGZsYWcgdG8gY292ZXIgdGhlIHN0YWdlIHdpdGggYW4gZXZlbnQgbGlzdGVuZXIgYXR0YWNoZWQuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCByZW1vdmUgdGhlIGZsYWcgZGl2IGFuZCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zYXkoJ0kgYW0gYWxpdmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5GbGFnIChmdW5jKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzXG5cbiAgICBpZiAobWUuZWxlbWVudCkge1xuICAgICAgbWUuZWxlbWVudC5hZGRGbGFnKHRoaXMpXG5cbiAgICAgIHRoaXMuZWxlbWVudC5mbGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgbWUuZWxlbWVudC5yZW1vdmVGbGFnKG1lKVxuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogd2hlbkNsaWNrZWQgLSBhZGRzIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNwcml0ZSBvciBzdGFnZS5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNheSgnSSBhbSBhbGl2ZScpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbkNsaWNrZWQgKGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXNcblxuICAgIGlmIChtZS5lbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogd2hlbktleVByZXNzZWQgLSBhZGRzIGEga2V5cHJlc3MgZXZlbnQgbGlzdGVuZXIgdG8gZG9jdW1lbnQuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbktleVByZXNzZWQoJyAnLCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2F5KCdTcGFjZXByZXNzZWQnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyS2V5IC0gdGhlIGtleSBwcmVzc2VkLiBtYXkgYmUgdGhlIGNvZGUgb3IgdGhlIGNoYXJhY3RlciBpdHNlbGYgKEEgb3IgNjUpXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbktleVByZXNzZWQgKHVzZXJLZXksIGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXNcbiAgICBsZXQgY2hlY2tcbiAgICB0eXBlb2YgdXNlcktleSA9PT0gJ3N0cmluZycgPyBjaGVjayA9IHVzZXJLZXkudG9Mb3dlckNhc2UoKSA6IGNoZWNrID0gdXNlcktleVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICBsZXQgbWF0Y2ggPSBmYWxzZVxuICAgICAgLy8gTWFrZSBzdXJlIGVhY2ggcHJvcGVydHkgaXMgc3VwcG9ydGVkIGJ5IGJyb3dzZXJzLlxuICAgICAgLy8gTm90ZTogdXNlciBtYXkgd3JpdGUgaW5jb21wYXRpYmxlIGNvZGUuXG4gICAgICBlLmNvZGUgJiYgZS5jb2RlLnRvTG93ZXJDYXNlKCkgPT09IGNoZWNrID8gbWF0Y2ggPSB0cnVlIDogbnVsbFxuICAgICAgZS5rZXkgJiYgZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gY2hlY2sgPyBtYXRjaCA9IHRydWUgOiBudWxsXG4gICAgICBlLmtleUNvZGUgPT09IGNoZWNrID8gbWF0Y2ggPSB0cnVlIDogbnVsbFxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG1lLl9leGVjKGZ1bmMsIFtlXSlcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5FdmVudCAtIGFkZHMgdGhlIHNwZWNpZmllZCBldmVudCBsaXN0ZW5lciB0byBzcHJpdGUvc3RhZ2UuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkV2ZW50KCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAqICAgY29uc29sZS5sb2coZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRTdHIgLSB0aGUgbmFtZWQgZXZlbnQgKG1vc2Vtb3ZlIGV0Yy4pLlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5FdmVudCAoZXZlbnRTdHIsIGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXNcblxuICAgIGlmIChtZS5lbGVtZW50KSB7XG4gICAgICBsZXQgYXR0YWNoVG8gPSB0aGlzLmVsZW1lbnQuZWxcbiAgICAgIGxldCBvcHRpb25zID0ge31cbiAgICAgICdrZXlkb3dufGtleXVwfGtleXByZXNzJy5pbmRleE9mKGV2ZW50U3RyKSAhPT0gLTEgPyBhdHRhY2hUbyA9IGRvY3VtZW50IDogbnVsbFxuICAgICAgJ3RvdWNoc3RhcnR8dG91Y2htb3ZlJy5pbmRleE9mKGV2ZW50U3RyKSAhPT0gLTEgPyBvcHRpb25zID0geyBwYXNzaXZlOiB0cnVlIH0gOiBudWxsXG5cbiAgICAgIGF0dGFjaFRvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRTdHIsIChlKSA9PiB7XG4gICAgICAgIG1lLl9leGVjKGZ1bmMsIFtlXSlcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgfSwgb3B0aW9ucylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiB3aGVuUmVjZWl2ZU1lc3NhZ2UgLSBhZGRzIHRoZSBzcGVjaWZpZWQgZXZlbnQgbGlzdGVuZXIgdG8gZG9jdW1lbnQuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlblJlY2VpdmVNZXNzYWdlKCdtb3ZlJywgZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLm1vdmUoLTEwKTtcbiAgKiB9KVxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG1zZyAtIHRoZSBuYW1lZCBtZXNzYWdlIChldmVudCk7XG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlblJlY2VpdmVNZXNzYWdlIChtc2csIGZ1bmMpIHtcbiAgICBjb25zdCBsaXN0ZW5lcklkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKClcbiAgICAvLyByZWdpc3RlciBhcyBhIG1lc3NhZ2UgbGlzdGVuZXIuXG4gICAgRW50aXR5Lm1lc3NhZ2VMaXN0ZW5lcnMucHVzaCh7IG1zZywgbGlzdGVuZXJJZCB9KVxuXG4gICAgLy8gbGlzdGVuIHRvIHNwZWNpZmllZCBtZXNzYWdlXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtc2csIChlKSA9PiB7XG4gICAgICAvLyBleGVjdXRlIHRoZSBmdW5jIGFuZCB0aGVuXG4gICAgICB0aGlzLl9leGVjKGZ1bmMsIFtlXSkudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGRpc3BhdGNoIGFuIGV2ZW50IHRoYXQgaXMgdW5pcXVlIHRvIHRoZSBsaXN0ZW5lciBhbmQgbWVzc2FnZSByZWNlaXZlZC5cbiAgICAgICAgY29uc3QgbXNnSWQgPSBlLmRldGFpbC5tc2dJZFxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ2Jsb2NrTGlrZS5kb25ld2hlbmVlY2VpdmVtZXNzYWdlJywgeyBkZXRhaWw6IHsgbXNnSWQsIGxpc3RlbmVySWQgfSB9KVxuXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgKiBicm9hZGNhc3RNZXNzYWdlIC0gZGlzcGF0Y2hlcyBhIGN1c3RvbSBldmVudCB0aGF0IGFjdHMgYXMgYSBnbG9iYWwgbWVzc2FnZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqXG4gICogc3RhZ2Uud2hlbkNsaWNrZWQoZnVuY3Rpb24oKSB7XG4gICogIHN0YWdlLmJyb2FkY2FzdE1lc3NhZ2UoJ21vdmUnKVxuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG1zZyAtIHRoZSBuYW1lZCBtZXNzYWdlIChldmVudClcbiAgKi9cbiAgYnJvYWRjYXN0TWVzc2FnZSAobXNnKSB7XG4gICAgY29uc3QgbXNnSWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKVxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChtc2csIHsgZGV0YWlsOiB7IG1zZ0lkIH0gfSlcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICB9XG5cbiAgLyoqXG4gICogYnJvYWRjYXN0TWVzc2FnZVdhaXQgLSBkaXNwYXRjaGVzIGEgY3VzdG9tIGV2ZW50IHRoYXQgYWN0cyBhcyBhIGdsb2JhbCBtZXNzYWdlLlxuICAqIFdhaXRzIGZvciBhbGwgd2hlblJlY2VpdmVNZXNzYWdlIGxpc3RlbmVycyB0byBjb21wbGV0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIHNwcml0ZS53aGVuUmVjZWl2ZU1lc3NhZ2UoJ21vdmUnLCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMubW92ZSgtMTApO1xuICAqICAgdGhpcy53YWl0KDUpO1xuICAqIH0pXG4gICpcbiAgKiBzdGFnZS53aGVuQ2xpY2tlZChmdW5jdGlvbigpIHtcbiAgKiAgc3RhZ2UuYnJvYWRjYXN0TWVzc2FnZVdhaXQoJ21vdmUnKTtcbiAgKiAgc3ByaXRlLnNheSgnQWxsIGRvbmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgLSB0aGUgbmFtZWQgbWVzc2FnZSAoZXZlbnQpXG4gICovXG4gIGJyb2FkY2FzdE1lc3NhZ2VXYWl0IChtc2csIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICAvLyB0cmlnZ2VyaW5nSWQgaXMgbm90IHVzZXIgc3VwcGxpZWQsIGl0IGlzIGluc2VydGVkIGJ5IHJld3JpdGVyLlxuICAgIGNvbnN0IG1lID0gdGhpc1xuICAgIGNvbnN0IG1zZ0lkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKClcbiAgICAvLyBzYXZlIHJlZ2lzdGVyZWQgbGlzdGVuZXJzIGZvciB0aGlzIGJyb2FkY2FzdC5cbiAgICBsZXQgbXlMaXN0ZW5lcnMgPSBFbnRpdHkubWVzc2FnZUxpc3RlbmVycy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubXNnID09PSBtc2cpXG4gICAgLy8gZGlzcGF0Y2ggdGhlIG1lc3NhZ2VcbiAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQobXNnLCB7IGRldGFpbDogeyBtc2dJZCB9IH0pXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudClcblxuICAgIC8vIGxpc3RlbiB0byB0aG9zZSB3aG8gcmVjZWl2ZWQgdGhlIG1lc3NhZ2VcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdibG9ja0xpa2UuZG9uZXdoZW5lZWNlaXZlbWVzc2FnZScsIGZ1bmN0aW9uIGJyb2FkY2FzdE1lc3NhZ2VXYWl0TGlzdGVuZXIgKGUpIHtcbiAgICAgIC8vIGlmIGV2ZW50IGlzIGZvciB0aGlzIG1lc3NhZ2UgcmVtb3ZlIGxpc3RlbmVySWQgZnJvbSBsaXN0IG9mIGxpc3RlbmVycy5cbiAgICAgIChlLmRldGFpbC5tc2dJZCA9PT0gbXNnSWQpID8gbXlMaXN0ZW5lcnMgPSBteUxpc3RlbmVycy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGlzdGVuZXJJZCAhPT0gZS5kZXRhaWwubGlzdGVuZXJJZCkgOiBudWxsXG4gICAgICAvLyBhbGwgbGlzdGVuZXJzIHJlc3BvbmRlZC5cbiAgICAgIGlmICghbXlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmxvY2tMaWtlLmRvbmV3aGVuZWVjZWl2ZW1lc3NhZ2UnLCBicm9hZGNhc3RNZXNzYWdlV2FpdExpc3RlbmVyKVxuICAgICAgICAvLyByZWxlYXNlIHRoZSB3YWl0XG4gICAgICAgIG1lLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqIFNvdW5kICogKi9cblxuICAvKipcbiAgKiBwbGF5U291bmQgLSBwbGF5cyBhIHNvdW5kIGZpbGUgKG1wMywgd2F2KVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBsYXlTb3VuZCgnLi4vLi4vc291bmRzL2JsZWF0LndhdicpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRoZSB1cmwgb2YgdGhlIGZpbGUgdG8gcGxheS5cbiAgKi9cbiAgcGxheVNvdW5kICh1cmwpIHtcbiAgICBjb25zdCBhdWRpbyA9IG5ldyB3aW5kb3cuQXVkaW8odXJsKVxuICAgIGF1ZGlvLnBsYXkoKVxuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNvdW5kcyA9IHRoaXMuc291bmRzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gYXVkaW8pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAqIHBsYXlTb3VuZExvb3AgLSBwbGF5cyBhIHNvdW5kIGZpbGUgKG1wMywgd2F2KSBhZ2FpbiBhbmQgYWdhaW5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wbGF5U291bmRMb29wKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdGhlIHVybCBvZiB0aGUgZmlsZSB0byBwbGF5LlxuICAqL1xuICBwbGF5U291bmRMb29wICh1cmwpIHtcbiAgICBjb25zdCBhdWRpbyA9IG5ldyB3aW5kb3cuQXVkaW8odXJsKVxuICAgIGF1ZGlvLnBsYXkoKVxuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG4gICAgICBhdWRpby5jdXJyZW50VGltZSA9IDBcbiAgICAgIGF1ZGlvLnBsYXkoKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgKiBwbGF5U291bmRVbnRpbERvbmUgLSBwbGF5cyBhIHNvdW5kIGZpbGUgKG1wMywgd2F2KSB1bnRpbCBkb25lLlxuICAqIFRoaXMgaXMgc2ltaWxhciB0byBwbGF5U291bmQgYW5kIHdhaXQgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgc291bmQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kVW50aWxEb25lKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdGhlIHVybCBvZiB0aGUgZmlsZSB0byBwbGF5LlxuICAqL1xuICBwbGF5U291bmRVbnRpbERvbmUgKHVybCwgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIC8vIHRyaWdnZXJpbmdJZCBpcyBub3QgdXNlciBzdXBwbGllZCwgaXQgaXMgaW5zZXJ0ZWQgYnkgcmV3cml0ZXIuXG4gICAgY29uc3QgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKHVybClcbiAgICBhdWRpby5wbGF5KClcbiAgICB0aGlzLnNvdW5kcy5wdXNoKGF1ZGlvKVxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgdGhpcy5zb3VuZHMgPSB0aGlzLnNvdW5kcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGF1ZGlvKVxuICAgICAgdGhpcy5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAqIHN0b3BTb3VuZHMgLSBzdG9wcyBhbGwgc291bmRzIHBsYXllZCBieSBzcHJpdGUgb3Igc3RhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBzdGFnZS53aGVuS2V5UHJlc3NlZCgnRXNjYXBlJywgKCkgPT4ge1xuICAqICAgdGhpcy5zdG9wU291bmRzKCk7XG4gICogfSk7XG4gICovXG4gIHN0b3BTb3VuZHMgKCkge1xuICAgIHRoaXMuc291bmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ucGF1c2UoKVxuICAgIH0pXG4gICAgdGhpcy5zb3VuZHMgPSBbXVxuICB9XG5cbiAgLyogY3NzICovXG5cbiAgLyoqXG4gICogY3NzIC0gYXBwbGllcyBhIENTUyBydWxlIHRvIHRoZSBzcHJpdGUgYW5kIGFsbCBjb3N0dW1lcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuY3NzKCdiYWNrZ3JvdW5kJywgJyMwMDAwZmYnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIC0gdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiBjb2xvcikuIEFsdGVybmF0aXZlbHkgYW4gb2JqZWN0IHdpdGgga2V5OiB2YWx1ZSBwYWlycy5cbiAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB0aGUgdmFsdWUgZm9yIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gI2ZmODgzMylcbiAgKi9cbiAgY3NzIChwcm9wLCB2YWx1ZSA9IG51bGwpIHtcbiAgICBjc3MucmVnaXN0ZXIocHJvcCwgdmFsdWUsIHRoaXMpXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGxcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENsYXNzIC0gYWRkcyBhIGNzcyBjbGFzcyB0byBzcHJpdGUgYW5kIGFsbCBjb3N0dW1lcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lIHRvIGFkZC5cbiAgKi9cbiAgYWRkQ2xhc3MgKG5hbWUpIHtcbiAgICAhdGhpcy5oYXNDbGFzcyhuYW1lKSA/IHRoaXMuY2xhc3Nlcy5wdXNoKG5hbWUpIDogbnVsbFxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVDbGFzcyAtIHJlbW92ZXMgYSBjc3MgY2xhc3MgZnJvbSB0aGUgc3ByaXRlIGFuZCBhbGwgY29zdHVtZXMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICogc3ByaXRlLnJlbW92ZUNsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBjc3MgY2xhc3MgbmFtZSB0byByZW1vdmUuXG4gICovXG4gIHJlbW92ZUNsYXNzIChuYW1lKSB7XG4gICAgdGhpcy5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gbmFtZSlcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbFxuICB9XG5cbiAgLyoqXG4gICogaGFzQ2xhc3MgLSBpcyB0aGUgY3NzIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmhhc0NsYXNzKCdyYWluYm93JykgPyB0aGlzLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiB0aGlzLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBjc3MgY2xhc3MgbmFtZS5cbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHRoZSBjc3MgY2xhc3MgbmFtZSBvbiB0aGUgbGlzdC5cbiAgKi9cbiAgaGFzQ2xhc3MgKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jbGFzc2VzLmluZGV4T2YobmFtZSkgIT09IC0xXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJ1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGxvb2suXG4gKiBBYnN0cmFjdCBmb3IgQ29zdHVtZSBhbmQgQmFja2Ryb3AuXG4gKiBEbyBub3QgaW5zdGFudGlhdGUgb2JqZWN0cyBkaXJlY3RseSBmcm9tIHRoaXMgY2xhc3MuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vayB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gTG9vayBpcyBhYnN0cmFjdCBmb3IgQ29zdHVtZSBhbmQgQmFja2Ryb3AuXG4gICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmNzc1J1bGVzID0gW11cbiAgICB0aGlzLmNsYXNzZXMgPSBbXVxuICB9XG5cbiAgLyoqIExvb2tzICogKi9cblxuICAvKipcbiAgKiBjc3MgLSBhcHBsaWVzIGEgQ1NTIHJ1bGUgdG8gYSBDb3N0dW1lIG9yIEJhY2tkcm9wLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5jc3MoJ2ZvbnQtc2l6ZScsICcxNnB4Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIC0gdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiBjb2xvcilcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB0aGUgdmFsdWUgZm9yIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gI2ZmODgzMylcbiAgKi9cbiAgY3NzIChwcm9wLCB2YWx1ZSA9IG51bGwpIHtcbiAgICBjc3MucmVnaXN0ZXIocHJvcCwgdmFsdWUsIHRoaXMpXG4gIH1cblxuICAvKipcbiAgKiBhZGRDbGFzcyAtIGFkZHMgYSBjc3MgY2xhc3MgdG8gY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lIHRvIGFkZC5cbiAgKi9cbiAgYWRkQ2xhc3MgKG5hbWUpIHtcbiAgICAhdGhpcy5oYXNDbGFzcyhuYW1lKSA/IHRoaXMuY2xhc3Nlcy5wdXNoKG5hbWUpIDogbnVsbFxuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ2xhc3MgLSByZW1vdmVzIGEgY3NzIGNsYXNzIGZyb20gdGhlIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmhhc0NsYXNzKCdyYWluYm93JykgPyBjb3N0dW1lLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBjb3N0dW1lLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmhhc0NsYXNzKCdyYWluYm93JykgPyBiYWNrZHJvcC5yZW1vdmVDbGFzcygncmFpbmJvdycpIDogYmFja2Ryb3AuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQ2xhc3MgKG5hbWUpIHtcbiAgICB0aGlzLmNsYXNzZXMgPSB0aGlzLmNsYXNzZXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBuYW1lKVxuICB9XG5cbiAgLyoqXG4gICogaGFzQ2xhc3MgLSBpcyB0aGUgY3NzIGNsYXNzIGFwcGxpZWQgdG8gdGhlIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmhhc0NsYXNzKCdyYWluYm93JykgPyBjb3N0dW1lLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBjb3N0dW1lLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmhhc0NsYXNzKCdyYWluYm93JykgPyBiYWNrZHJvcC5yZW1vdmVDbGFzcygncmFpbmJvdycpIDogYmFja2Ryb3AuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIGNzcyBjbGFzcyBuYW1lIG9uIHRoZSBsaXN0LlxuICAqL1xuICBoYXNDbGFzcyAobmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzZXMuaW5kZXhPZihuYW1lKSAhPT0gLTFcbiAgfVxufVxuIiwiLyoqXG4qIHBsYXRmb3JtcyAtIGNvbGxlY3Rpb24gb2YgdGhpbmdzIHRvIGVuc3VyZSBpdCBwbGF5cyBuaWNlbHkgd2l0aCBjb2RpbmcgcGxhdGZvcm1zLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBsYXRmb3JtcyAoKSB7XG4gIC8qKlxuICAqIGNvZGVwZW4uaW9cbiAgKiBQYWNlZCBhbmQgV2FpdGVkIG1ldGhvZHMgdHJpZ2dlciB0aGUgcHJvdGVjdGlvbiAtIGhlbmNlIHdlIHByb2xvbmcgaXQuXG4gICogaHR0cHM6Ly9ibG9nLmNvZGVwZW4uaW8vMjAxNi8wNi8wOC9jYW4tYWRqdXN0LWluZmluaXRlLWxvb3AtcHJvdGVjdGlvbi10aW1pbmcvXG4gICovXG4gIGlmICh3aW5kb3cuQ1ApIHtcbiAgICB3aW5kb3cuQ1AuUGVuVGltZXIuTUFYX1RJTUVfSU5fTE9PUF9XT19FWElUID0gNjAwMDBcbiAgfVxufVxuIiwiLyoqXG4qIEVuY2Fwc3VsYXRlcyB0aGUgZnVuY3Rpb25hbGl0eSBvZiByZXdyaXRpbmcgdXNlciBjb2RlIHRvIGFsbG93IGZvciBCbG9ja0xpa2UuanMgZmVhdHVyZXMuXG4qL1xuXG4vKipcbiogY291bnRDaGFyIC0gY291bnQgaG93IG1hbnkgdGltZXMgYSBnaXZlbiBjaGFyYWN0ZXIgKG9yIHN0cmluZykgYXBwZWFycyBpbiBhbm90aGVyIHN0cmluZy5cbiogaGVscGVyIGZvciBldmVudGVkIHNraXBwaW5nIGFuZCBtZXRob2QgcmV3cml0aW5nLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7c3RyaW5nfSBjaGFyIC0gYSBzdHJpbmcgdG8gbG9vayBmb3IuXG4qXG4qIEByZXR1cm4ge251bWJlcn0gLSB0aGUgbnVtYmVyIG9mIHRpbWVzIGZvdW5kLlxuKi9cbmZ1bmN0aW9uIGNvdW50Q2hhciAoc3RyLCBjaGFyKSB7XG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYFxcXFwke2NoYXJ9YCwgJ2cnKVxuICByZXR1cm4gKHN0ci5tYXRjaChyZWdFeHApIHx8IFtdKS5sZW5ndGhcbn1cblxuLyoqXG4qIHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyAtIGZvciBhIGdpdmVuIGxpbmUgb2YgY29kZSwgcmVwbGFjZXMgYWxsIG9jY3VycmVuY2VzIG9mXG4qIHVzZXIgcHJvdmlkZWQgc3RyaW5ncyB3aXRoIGEgc2VxdWVuY2Ugb2Ygc3BhY2VzIG9mIHRoZSBzYW1lIGxlbmd0aC5cbiogaGVscGVyIGZvciBldmVudGVkIHNraXBwaW5nIGFuZCBtZXRob2QgcmV3cml0aW5nLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gbGluZSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIGxpbmUgd2l0aG91dCBzdHJpbmdzLlxuKi9cbmZ1bmN0aW9uIHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyAobGluZSkge1xuICByZXR1cm4gbGluZS5yZXBsYWNlKC9cIiguKj8pXCJ8JyguKj8pJ3xgKC4qPylgL2csICcgJylcbn1cblxuLyoqXG4qIGlzTWV0aG9kSW5TdHJpbmcgLSBjaGVja3MgYSBzdHJpbmcgYWdhaW5zdCBhbiBhcnJheSBvZiBtZXRob2QgbmFtZXMuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtBcnJheX0gYXJyIC0gYW4gYXJyYXkgb2YgbWV0aG9kIG5hbWVzLlxuKlxuKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHRoZSBtZXRob2QgaW4gdGhlIHN0cmluZy5cbiovXG5mdW5jdGlvbiBpc01ldGhvZEluU3RyaW5nIChhcnIsIHN0cikge1xuICByZXR1cm4gKGFyci5zb21lKChtZXRob2QpID0+IHN0ci5pbmRleE9mKGAuJHttZXRob2R9KGApICE9PSAtMSkpXG59XG5cbi8qKlxuKiBpc1BhY2VkIC0gY2hlY2tzIGlmIGEgbGluZSBvZiBjb2RlIGluY2x1ZGVzIGEgcGFjZWQgbWV0aG9kLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSBpcyBwYWNlZCBpbiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGlzUGFjZWQgKGl0ZW0sIGVudGl0eSkge1xuICByZXR1cm4gaXNNZXRob2RJblN0cmluZyhlbnRpdHkucGFjZWQsIGl0ZW0pXG59XG5cbi8qKlxuKiBpc1dhaXRlZCAtIGNoZWNrcyBpZiBhIGxpbmUgb2YgY29kZSBpbmNsdWRlcyBhIHdhaXRlZCBtZXRob2QuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIGlzIHdhaXRlZCBpbiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGlzV2FpdGVkIChpdGVtLCBlbnRpdHkpIHtcbiAgcmV0dXJuIGlzTWV0aG9kSW5TdHJpbmcoZW50aXR5LndhaXRlZCwgaXRlbSlcbn1cblxuLyoqXG4qIGlzRXZlbnRlZCAtIGNoZWNrcyBpZiBhIGxpbmUgb2YgY29kZSBpbmNsdWRlcyBhbiBldmVudGVkIG1ldGhvZC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtlbnRpdHl9IGVudGl0eSAtIHRoZSBlbnRpdHkgdHJpZ2dlcmluZyB0aGUgbWV0aG9kLlxuKlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gaXMgZXZlbnRlZCBpbiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGlzRXZlbnRlZCAoaXRlbSwgZW50aXR5KSB7XG4gIHJldHVybiBpc01ldGhvZEluU3RyaW5nKGVudGl0eS5ldmVudGVkLCBpdGVtKVxufVxuXG4vKipcbiogd2hpY2hXYWl0ZWRSZXR1cm4gLSBjaGVja3MgaWYgYSBsaW5lIG9mIGNvZGUgaW5jbHVkZXMgYSB3YWl0ZWRSZXR1cm4gbWV0aG9kLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgd2FpdGVkUmV0dXJuIG1ldGhvZCBmb3VuZCBvciBudWxsLlxuKi9cbmZ1bmN0aW9uIHdoaWNoV2FpdGVkUmV0dXJuIChpdGVtLCBlbnRpdHkpIHtcbiAgcmV0dXJuIGVudGl0eS53YWl0ZWRSZXR1cm5lZC5maW5kKChtZXRob2QpID0+IChpdGVtLmluZGV4T2YoYC4ke21ldGhvZH0oYCkgIT09IC0xID8gbWV0aG9kIDogZmFsc2UpKVxufVxuXG4vKipcbiogaW5zZXJ0TG9vcFByb3RlY3Rpb24tIGluc2VydHMgYSB6ZXJvIHRpbWVkIGF3YWl0IGxpbmUgYWZ0ZXIgYSB3aGlsZSBkZWNlbGVyYXRpb24uXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIGEgbW9kaWZpZWQgbGluZSBvZiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGluc2VydExvb3BQcm90ZWN0aW9uIChpdGVtLCBlbnRpdHkpIHtcbiAgY29uc3QgY2hlY2sgPSBpdGVtLnJlcGxhY2UoL1xccysvZywgJycpXG5cbiAgY29uc3QgcmVnRXhwID0gL3doaWxlXFwoW1xcU10qXFwpe3xmb3JcXChbXFxTXSpcXCl7fGRvW1xcU10qey9cbiAgY29uc3QgbWF0Y2hlcyA9IHJlZ0V4cC5leGVjKGNoZWNrKVxuXG4gIGNvbnN0IGNvZGUgPSBgJHtpdGVtfVxcbiBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMCkpO2BcbiAgcmV0dXJuIG1hdGNoZXMgPyBjb2RlIDogaXRlbVxufVxuXG4vKipcbiogaW5zZXJ0UGFjZWQgLSBpbnNlcnRzIGEgdGltZWQgYXdhaXQgbGluZSBhZnRlciBhbnkgbWV0aG9kIHRoYXQgaXMgb24gdGhlIGxpc3Qgb2YgcGFjZWQgbWV0aG9kcy5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtlbnRpdHl9IGVudGl0eSAtIHRoZSBlbnRpdHkgdHJpZ2dlcmluZyB0aGUgbWV0aG9kLlxuKlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSBtb2RpZmllZCBsaW5lIG9mIGNvZGUuXG4qL1xuZnVuY3Rpb24gaW5zZXJ0UGFjZWQgKGl0ZW0sIGVudGl0eSkge1xuICBjb25zdCBjb2RlID0gYCR7aXRlbX1cXG4gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsICR7ZW50aXR5LnBhY2V9KSk7YFxuICByZXR1cm4gZW50aXR5LnBhY2UgJiYgaXNQYWNlZChyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3MoaXRlbSksIGVudGl0eSkgPyBjb2RlIDogaXRlbVxufVxuXG4vKipcbiogaW5zZXJ0V2FpdGVkIC0gaW5zZXJ0cyB0aGUgXCJtZWNoYW5pc21cIiB0aGF0IHN0b3BzIGV4ZWN1dGlvbiBhbmQgYXdhaXRzIGZvciB0aGUgbWV0aG9kIHRvIGZpbmlzaC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtlbnRpdHl9IGVudGl0eSAtIHRoZSBlbnRpdHkgdHJpZ2dlcmluZyB0aGUgbWV0aG9kLlxuKlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSBtb2RpZmllZCAobXVsdGkpbGluZSBvZiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGluc2VydFdhaXRlZCAoaXRlbSwgZW50aXR5KSB7XG4gIGxldCBmb3VuZCA9IG51bGxcbiAgbGV0IGNvZGVcblxuICAvLyBsb29rIGZvciB3YWl0ZWQgbWV0aG9kcy5cbiAgZm91bmQgPSBpc1dhaXRlZChyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3MoaXRlbSksIGVudGl0eSlcblxuICAvLyBub3QgYSBub3JtYWwgXCJ3YWl0ZWRcIi4gbG9vayBmb3Igd2FpdGVkUmV0dXJuZWQuXG4gIGlmICghZm91bmQpIHtcbiAgICBsZXQgdGhlVmFyID0gbnVsbFxuXG4gICAgZm91bmQgPSB3aGljaFdhaXRlZFJldHVybihyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3MoaXRlbSksIGVudGl0eSlcblxuICAgIC8vIGNvZGUgZm9yIHdhaXRlZFJldHVyblxuICAgIHRoZVZhciA9IGl0ZW0uc3Vic3RyKDAsIGl0ZW0uaW5kZXhPZignPScpKVxuICAgICAgLnJlcGxhY2UoJ2xldCcsICcnKVxuICAgICAgLnJlcGxhY2UoJ3ZhcicsICcnKVxuICAgICAgLnJlcGxhY2UoJ2NvbnN0JywgJycpXG4gICAgICAudHJpbSgpXG5cbiAgICBjb2RlID0gYCR7aXRlbS5zdWJzdHJpbmcoMCwgaXRlbS5sYXN0SW5kZXhPZignKScpKX0sICcke3RoZVZhcn0nLCAnJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScpYFxuXG4gICAgLy8gaW52b2tlIGlzIFwiZm9yZ2l2aW5nXCIuIG1heSwgb3IgbWF5IG5vdCwgaGF2ZSB2YXJpYWJsZXMuXG4gICAgZm91bmQgPT09ICdpbnZva2UnICYmIChpdGVtLmluZGV4T2YoJywnKSA9PT0gLTEpID8gY29kZSA9IGAke2l0ZW0uc3Vic3RyaW5nKDAsIGl0ZW0ubGFzdEluZGV4T2YoJyknKSl9LCBbXSwgJyR7dGhlVmFyfScsICcke2VudGl0eS50cmlnZ2VyaW5nSWR9JylgIDogbnVsbFxuICB9IGVsc2Uge1xuICAgIC8vIGNvZGUgZm9yIFwibm9ybWFsXCIgd2FpdGVkXG4gICAgY29kZSA9IGAke2l0ZW0uc3Vic3RyaW5nKDAsIGl0ZW0ubGFzdEluZGV4T2YoJyknKSl9LCAnJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScpYFxuICB9XG5cbiAgLy8gZW50aXR5LnRyaWdnZXJpbmdJZCBjcmVhdGVzIGEgdW5pcXVlIGNvbnRleHQgdG8gY2hhaW4gdGhlIHdhaXRlZCBtZXRob2RzLlxuICBjb2RlID0gYCR7Y29kZX1cXG4gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdibG9ja0xpa2Uud2FpdGVkLiR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nLCBmdW5jdGlvbiB3YWl0ZWRMaXN0ZW5lcihlKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Jsb2NrTGlrZS53YWl0ZWQuJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScsIHdhaXRlZExpc3RlbmVyKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7YFxuXG4gIHJldHVybiBmb3VuZCA/IGNvZGUgOiBpdGVtXG59XG5cbi8qKlxuKiBpbnNlcnRBc3luYyAtIEFkZHMga2V5d29yZCBhc3luYyB0byBmdW5jdGlvbiBkZWNlbGVyYXRpb24gaWYgbm90IHByZXNlbnRcbiogV2lsbCBjYXRjaDpcbiogLSBhbGwgbmFtZWQgZnVuY3Rpb24gZGVjZWxlcmF0aW9ucyB3aXRoIGEgc3BhY2UgYWZ0ZXIgdGhlIGtleXdvcmQgJ2Z1bmN0aW9uJ1xuKiAtIGFueXRoaW5nIHRoYXQgaGFzIGEgZmF0IGFycm93IHdpdGggYW55IG9mIHNldmVyYWwgdmFyaWFibGUgcGF0dGVybnMgYmVmb3JlIGl0LlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSBtb2RpZmllZCBsaW5lIG9mIGNvZGUuXG4qL1xuZnVuY3Rpb24gaW5zZXJ0QXN5bmMgKGl0ZW0pIHtcbiAgY29uc3QgZXhpc3QgPSBpdGVtLmluZGV4T2YoJ2FzeW5jICcpXG5cbiAgLy8gZnVuY3Rpb24gZGVjbGFyYXRpb25cbiAgbGV0IHJlZ0V4cCA9IC9mdW5jdGlvbihcXHMqP1thLXpBLVpdXFx3Klxccyo/XFwofFxccyo/XFwoKS9cbiAgbGV0IG1hdGNoZXMgPSByZWdFeHAuZXhlYyhyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3MoaXRlbSkpXG5cbiAgLy8gb3IgYXJyb3dcbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgcmVnRXhwID0gLyhbYS16QS1aXVxcdyp8XFwoXFxzKj9bYS16QS1aXVxcdyooLFxccypbYS16QS1aXVxcdyopKlxccyo/XFwpKVxccyo/PT4vXG4gICAgbWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyhpdGVtKSlcbiAgfVxuICByZXR1cm4gZXhpc3QgPT09IC0xICYmIG1hdGNoZXMgPyBgJHtpdGVtLnN1YnN0cmluZygwLCBtYXRjaGVzLmluZGV4KX1hc3luYyAke2l0ZW0uc3Vic3RyaW5nKG1hdGNoZXMuaW5kZXgsIGl0ZW0ubGVuZ3RoKX1gIDogaXRlbVxufVxuXG4vKipcbiogZW1wdHlMb29wUHJvdGVjdGlvbiAtIGV4YW1pbmVzIHRoZSBjb2RlIGZvciB3aGlsZSBhbmQgZm9yIHN0YXRlbWVudHMgdGhhdCBhcmUgZW1wdHkuXG4qIE5vdGU6IHNpbmNlIHdoaWxlKHRydWUpe30gaXMgbGlrZWx5IHRvIGJlIGNvZGVkIGJ5IHRoZSB1c2VyIHRoaXMgcHJldmVudHMgaW5maW5pdGUgbG9vcHMuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEByZXR1cm4ge3N0cmluZ30gLSBhIG1vZGlmaWVkIGxpbmUgb2YgY29kZS5cbiovXG5mdW5jdGlvbiBlbXB0eUxvb3BQcm90ZWN0aW9uIChmdW5jUykge1xuICBjb25zdCBjaGVjayA9IGZ1bmNTLnJlcGxhY2UoL1xccysvZywgJycpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csICcnKVxuXG4gIGNvbnN0IHJlZ0V4cCA9IC93aGlsZVxcKFtcXHNcXFNdKlxcKXt9fGZvclxcKFtcXHNcXFNdKlxcKXt9fGRve313aGlsZVxcKFtcXHNcXFNdKlxcKS9cbiAgY29uc3QgbWF0Y2hlcyA9IHJlZ0V4cC5leGVjKGNoZWNrKVxuXG4gIHJldHVybiAhIW1hdGNoZXNcbn1cblxuLyoqXG4qIHJlbW92ZU91dGVyIC0gUmVtb3ZlcyB0aGUgb3V0ZXIgZnVuY3Rpb24gZGVmaW5pdGlvbiBhbmQgcmV0dXJucyB0aGUgZnVuY3Rpb24gY29kZSBib2R5LlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gZnVuY1MgLSB0aGUgZnVuY3Rpb24gYmVpbmcgcmV3cml0dGVuLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIGJvZHkgb2YgdGhlIGZ1bmN0aW9uLlxuKi9cbmZ1bmN0aW9uIHJlbW92ZU91dGVyIChmdW5jUykge1xuICByZXR1cm4gZnVuY1Muc3Vic3RyaW5nKGZ1bmNTLmluZGV4T2YoJ3snKSArIDEsIGZ1bmNTLmxhc3RJbmRleE9mKCd9JykpXG59XG5cbi8qKlxuKiByZW1vdmVDb21tZW50cyAtIFJlbW92ZXMgY29tbWVudHMgZnJvbSBjb2RlLlxuKiBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTUxMjM3NzdcbipcbiogQHBhcmFtIHtzdHJpbmd9IGZ1bmNTIC0gdGhlIGZ1bmN0aW9uIGJlaW5nIHJld3JpdHRlbi5cbiogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBmdW5jdGlvbiB3aXRob3V0IGNvbW1lbnRzLlxuKi9cbmZ1bmN0aW9uIHJlbW92ZUNvbW1lbnRzIChmdW5jUykge1xuICByZXR1cm4gZnVuY1MucmVwbGFjZSgvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3woW15cXFxcOl18XilcXC9cXC8uKiQvZ20sICcnKVxufVxuXG4vKipcbiogZ2V0RXZlbnRPYmplY3RWYXJOYW1lIC0gZXh0cmFjdHMgdGhlIHZhcmlhYmxlIG5hbWUgdGhhdCBob2xkcyB0aGUgZXZlbnQgb2JqZWN0LlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gZnVuY1MgLSB0aGUgZnVuY3Rpb24gYmVpbmcgcmV3cml0dGVuLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHZhcmlhYmxlIG5hbWUuXG4qL1xuZnVuY3Rpb24gZ2V0RXZlbnRPYmplY3RWYXJOYW1lIChmdW5jUykge1xuICByZXR1cm4gZnVuY1Muc3Vic3RyaW5nKGZ1bmNTLmluZGV4T2YoJygnKSArIDEsIGZ1bmNTLmluZGV4T2YoJyknKSlcbn1cblxuLyoqXG4qIHJld3JpdGUgLSByZXdyaXRlcyBhIGZ1bmN0aW9uIHRvIGFuIGFzeW5jIHZlcnNpb24gdGhhdCBpcyBcInBhY2VkXCIgdXNpbmcgYXdhaXRpbmcgZm9yIHByb21pc2VzLlxuKiBUaGlzIGFsbG93cyB0aGUgdXNlciB0byB3cml0ZSBzZXF1ZW50aWFsIHNpbXBsZSBjb2RlIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBpbiBhIHBhY2VkIG1hbm5lci5cbipcbiogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZVxuKiBAcGFyYW0gLSB7T2JqZWN0fSBlbnRpdHkgLSBhIHNwcml0ZSBvciBzdGFnZSBvYmplY3QgdG8gd2hpY2ggdGhlIGZ1bmN0aW9uIGFwcGxpZXMuXG4qIEByZXR1cm4ge2Z1bmN0aW9ufSAtIGFuIGFzeW5jIG1vZGlmaWVkIGZ1bmN0aW9uLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJld3JpdGUgKGZ1bmMsIGVudGl0eSkge1xuICBsZXQgY29kZSA9IGZ1bmMudG9TdHJpbmcoKVxuICBjb25zdCB0aGVWYXIgPSBnZXRFdmVudE9iamVjdFZhck5hbWUoY29kZSlcblxuICAvLyByZXdyaXRlIHRoZSBjb2RlXG4gIGlmIChlbXB0eUxvb3BQcm90ZWN0aW9uKGNvZGUpKSB7XG4gICAgY29kZSA9ICd0aHJvdyBcXCdCbG9ja0xpa2UuanMgRXJyb3I6IEVtcHR5IGxvb3AgZGV0ZWN0ZWRcXCc7J1xuICB9IGVsc2Uge1xuICAgIGNvZGUgPSByZW1vdmVDb21tZW50cyhyZW1vdmVPdXRlcihjb2RlKSlcbiAgICBjb2RlID0gY29kZS5zcGxpdCgnXFxuJykuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRyaW0oKS5sZW5ndGggIT09IDApXG5cbiAgICAvLyBjb3VudGVyIGZvciBvcGVuIHBhcmVudGhlc2VzLlxuICAgIGxldCBldmVudGVkT3BlblBhcmVuID0gMFxuICAgIC8vIGxldCBoYXNQYWNlZENvZGUgPSBmYWxzZVxuXG4gICAgY29kZSA9IGNvZGUubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCB0ZW1wID0gaXRlbVxuICAgICAgbGV0IHJlc3VsdCA9IHRlbXBcblxuICAgICAgLy8gaW50ZXJuYWwgZXZlbnRlZCBtZXRob2RzIGFyZSBza2lwcGVkXG4gICAgICBpZiAoaXNFdmVudGVkKHRlbXAsIGVudGl0eSkgfHwgZXZlbnRlZE9wZW5QYXJlbikge1xuICAgICAgICBldmVudGVkT3BlblBhcmVuICs9IChjb3VudENoYXIocmVwbGFjZVVzZXJTdHJpbmdXaXRoQmxhbmtzKHRlbXApLCAnKCcpIC0gY291bnRDaGFyKHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyh0ZW1wKSwgJyknKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIChpc1BhY2VkKHRlbXAsIGVudGl0eSkpIGhhc1BhY2VkQ29kZSA9IHRydWVcbiAgICAgICAgLy8gYSBtZXRob2QgY2FuIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIGJ1dCBub3QgbW9yZSB0aGFuIG9uZVxuICAgICAgICByZXN1bHQgPT09IHRlbXAgPyByZXN1bHQgPSBpbnNlcnRQYWNlZCh0ZW1wLCBlbnRpdHkpIDogbnVsbCAvLyBtb3JlIGxpa2VseVxuICAgICAgICByZXN1bHQgPT09IHRlbXAgPyByZXN1bHQgPSBpbnNlcnRXYWl0ZWQodGVtcCwgZW50aXR5KSA6IG51bGwgLy8gbGVzcyBsaWtlbHlcblxuICAgICAgICAvLyBhbmQgb25seSBpZiBub3QgYSBtZXRob2Qgd2lsbCBhZGQgYXN5bmMgdG8gZnVuY3Rpb25zXG4gICAgICAgIHJlc3VsdCA9PT0gdGVtcCA/IHJlc3VsdCA9IGluc2VydEFzeW5jKHRlbXApIDogbnVsbFxuICAgICAgfVxuXG4gICAgICAvLyBpbnNlcnQgYSBwYWNlZCBwcm9taXNlIHJlc29sdmUgYXQgdGhlIHN0YXJ0IG9mIGEgbG9vcCBibG9jayAodW5kZXIgY2VydGFpbiBjb25kaXRpb25zKVxuICAgICAgLy8gdGhpcyBjYXVzZXMgdGhlIGNvZGUgdG8gc2tpcCBhbiBldmVudCBsb29wIGFuZCBwcmV2ZW50cyBlbmRsZXNzIGxvb3BzXG4gICAgICByZXN1bHQgPSBpbnNlcnRMb29wUHJvdGVjdGlvbihyZXN1bHQsIGVudGl0eSlcblxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0pXG5cbiAgICBjb2RlID0gY29kZS5qb2luKCdcXG4nKVxuICB9XG5cbiAgLy8gdHJhbnNmb3JtIHRoZSB0ZXh0IGludG8gYSBmdW5jdGlvblxuICBjb25zdCBBc3luY0Z1bmN0aW9uID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFzeW5jICgpID0+IHt9KS5jb25zdHJ1Y3RvclxuICBsZXQgYWYgPSBuZXcgQXN5bmNGdW5jdGlvbihjb2RlKVxuXG4gIC8vIHBhc3MgdGhlIGV2ZW50IG9iamVjdCB0byB0aGUgZnVuY3Rpb24gaWYgZXhpc3RzLlxuICB0aGVWYXIgPyBhZiA9IG5ldyBBc3luY0Z1bmN0aW9uKHRoZVZhciwgY29kZSkgOiBudWxsXG5cbiAgd2luZG93LmJsb2NrTGlrZSAmJiB3aW5kb3cuYmxvY2tMaWtlLmRlYnVnID8gY29uc29sZS5sb2coYWYpIDogbnVsbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICByZXR1cm4gYWZcbn1cbiIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJ1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgVUkgRWxlbWVudCBvZiB0aGUgc3ByaXRlLlxuICogRWFjaCBTcHJpdGUgaGFzIG9uZS5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZUVsZW1lbnQge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTcHJpdGUgRWxlbWVudC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIGZvciB3aGljaCB0aGUgZWxlbWVudCBpcyBjcmVhdGVkLlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSB0byB3aGljaCB0aGUgc3ByaXRlIGlzIGFkZGVkLlxuICAqL1xuICBjb25zdHJ1Y3RvciAoc3ByaXRlLCBzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICAgIGVsLmlkID0gYCR7c3ByaXRlLmlkfWBcbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICBlbC5zdHlsZS50b3VjaEFjdGlvbiA9ICdtYW5pcHVsYXRpb24nXG5cbiAgICBzdGFnZS5lbGVtZW50LmVsLmFwcGVuZENoaWxkKGVsKVxuXG4gICAgdGhpcy5lbCA9IGVsXG4gIH1cblxuICAvKipcbiAgKiB1cGRhdGUgLSB1cGRhdGVzIHRoZSBET00gZWxlbWVudC4gVGhpcyBpcyBhbHdheXMgY2FsbGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3Rvci5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHVwZGF0ZS5cbiAgKi9cbiAgdXBkYXRlIChzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS5lbGVtZW50LmVsXG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHggPSBzcHJpdGUueCAtIChzcHJpdGUud2lkdGggLyAyKVxuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB5IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB5ID0gKHNwcml0ZS55ICogLTEpIC0gKHNwcml0ZS5oZWlnaHQgLyAyKVxuXG4gICAgLy8gQ29zdHVtZVxuICAgIGlmIChzcHJpdGUuY29zdHVtZSkge1xuICAgICAgZWwuc3R5bGUud2lkdGggPSBgJHtzcHJpdGUuY29zdHVtZS52aXNpYmxlV2lkdGh9cHhgXG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtzcHJpdGUuY29zdHVtZS52aXNpYmxlSGVpZ2h0fXB4YFxuICAgIH1cblxuICAgIGVsLnN0eWxlLmxlZnQgPSBgJHsoc3ByaXRlLnN0YWdlV2lkdGggLyAyKSArIHh9cHhgXG4gICAgZWwuc3R5bGUudG9wID0gYCR7KHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgeX1weGBcbiAgICBlbC5zdHlsZS56SW5kZXggPSBzcHJpdGUuelxuXG4gICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGAkeyhzcHJpdGUuc2hvd2luZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nKX1gXG5cbiAgICAvLyBMZWZ0IG9yIHJpZ2h0IHJvdGF0aW9uXG4gICAgLy8gRGlyZWN0aW9uIGRpdmlkZWQgYnkgMTgwIGFuZCBmbG9vcmVkIC0+IDEgb3IgMi5cbiAgICAvLyBTdWJ0cmFjdCAxIC0+IDAgb3IgMS5cbiAgICAvLyBNdWx0aXBseSBieSAtMSAtPiAwIG9yIC0xLlxuICAgIC8vIENzcyB0cmFuc2Zvcm0gLT4gTm9uZSBvciBmdWxsIFguXG4gICAgc3ByaXRlLnJvdGF0aW9uU3R5bGUgPT09IDEgPyBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7KChNYXRoLmZsb29yKHNwcml0ZS5kaXJlY3Rpb24gLyAxODApICogMikgLSAxKSAqIC0xfSlgIDogbnVsbFxuXG4gICAgLy8gRnVsbCByb3RhdGlvblxuICAgIC8vIFNwcml0ZSBcIm5ldXRyYWwgcG9zaXRpb25cIiBpcyA5MC4gQ1NTIGlzIDAuIFN1YnRyYWN0IDkwLlxuICAgIC8vIE5vcm1hbGl6ZSB0byAzNjAuXG4gICAgLy8gQ3NzIHJvdGF0ZSAtPiBOdW1iZXIgb2YgZGVncmVlcy5cbiAgICBzcHJpdGUucm90YXRpb25TdHlsZSA9PT0gMCA/IGVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHsoKHNwcml0ZS5kaXJlY3Rpb24gLSA5MCkgKyAzNjApICUgMzYwfWRlZylgIDogbnVsbFxuXG4gICAgLy8gQ1NTIHJ1bGVzIGNsYXNzZXMgYW5kIHRoZSBiYWNrZ3JvdW5kIGNvbG9yLlxuICAgIC8vIFRoZSBjb3N0dW1lIGNvbG9yIHNldHRpbmcgb3ZlcnJpZGVzIGFueSBDU1Mgc2V0dGluZy5cblxuICAgIC8vIFRoZXJlIGlzIG5vIGNvbG9yIHByb3BlcnR5IHRvIGN1cnJlbnQgY29zdHVtZSAtIHNvIHJlc2V0IHRoZSBiYWNrZ3JvdW5kLWNvbG9yIHByb3BlcnR5IG9mIHRoZSBlbGVtZW50LlxuICAgICFzcHJpdGUuY29zdHVtZSB8fCAhc3ByaXRlLmNvc3R1bWUuY29sb3IgPyBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJyA6IG51bGxcblxuICAgIC8vIGFwcGx5IENTUyBydWxlcyAobWF5IGluY2x1ZGUgYmFja2dyb3VuZCBjb2xvcilcbiAgICBjc3MuYXBwbHkoc3ByaXRlKVxuXG4gICAgLy8gYXBwbHkgQ1NTIGNsYXNzZXNcbiAgICBzcHJpdGUuY29zdHVtZSA/IGVsLmNsYXNzTmFtZSA9IHNwcml0ZS5jb3N0dW1lLmNsYXNzZXMuY29uY2F0KHNwcml0ZS5jbGFzc2VzKS5qb2luKCcgJykgOiBlbC5jbGFzc05hbWUgPSBzcHJpdGUuY2xhc3Nlcy5qb2luKCcgJylcblxuICAgIC8vIFRoZXJlIGlzIGEgY29sb3IgcHJvcGVydHkgdG8gY3VycmVudCBjb3N0dW1lIC0gc28gYXBwbHkgaXQgYW5kIG92ZXJyaWRlIENTUyBydWxlcy5cbiAgICBzcHJpdGUuY29zdHVtZSAmJiBzcHJpdGUuY29zdHVtZS5jb2xvciA/IGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNwcml0ZS5jb3N0dW1lLmNvbG9yIDogbnVsbFxuXG4gICAgLy8gSW1hZ2UuXG4gICAgaWYgKHNwcml0ZS5jb3N0dW1lICYmIGVsLmZpcnN0Q2hpbGQpIHsgLy8gaGFzIGltYWdlIGZyb20gcHJldmlvdXMgY29zdHVtZVxuICAgICAgaWYgKCFzcHJpdGUuY29zdHVtZS5pbWFnZSkgeyAvLyBuZWVkcyByZW1vdmVkIGFzIHRoZXJlIGlzIG5vIGltYWdlIGluIGN1cnJlbnQgY29zdHVtZS5cbiAgICAgICAgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZClcbiAgICAgIH0gZWxzZSBpZiAoc3ByaXRlLmNvc3R1bWUuaW1hZ2UgIT09IHRoaXMuZWwuZmlyc3RDaGlsZC5zcmMpIHsgLy8gbmVlZHMgcmVwbGFjZWRcbiAgICAgICAgdGhpcy5lbC5maXJzdENoaWxkLnNyYyA9IHNwcml0ZS5jb3N0dW1lLmltYWdlXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzcHJpdGUuY29zdHVtZSAmJiBzcHJpdGUuY29zdHVtZS5pbWFnZSkgeyAvLyBuZWVkcyBhbiBpbWFnZSBpbnNlcnRlZC5cbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpXG5cbiAgICAgIGltYWdlLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gICAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcbiAgICAgIGltYWdlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgaW1hZ2Uuc3JjID0gc3ByaXRlLmNvc3R1bWUuaW1hZ2VcbiAgICAgIGVsLmFwcGVuZENoaWxkKGltYWdlKVxuICAgIH1cblxuICAgIGVsLmZpcnN0Q2hpbGQgPyBlbC5maXJzdENoaWxkLmRyYWdnYWJsZSA9IGZhbHNlIDogbnVsbFxuXG4gICAgLy8gSW5uZXIuIE11c3QgYnkgZG9uZSBhZnRlciB0aGUgaW1hZ2VcbiAgICBzcHJpdGUuY29zdHVtZSAmJiBzcHJpdGUuY29zdHVtZS5pbm5lckhUTUwgPyBlbC5pbm5lckhUTUwgPSBzcHJpdGUuY29zdHVtZS5pbm5lckhUTUwgOiBudWxsXG5cbiAgICAvLyBUZXh0IFVJIGdvZXMgd2hlcmUgc3ByaXRlIGdvZXMuXG4gICAgc3ByaXRlLnRleHR1aSA/IHNwcml0ZS50ZXh0dWkudXBkYXRlKHNwcml0ZSkgOiBudWxsXG5cbiAgICB0aGlzLmVsID0gZWxcbiAgfVxuXG4gIC8qKlxuICAqIGRlbGV0ZSAtIGRlbGV0ZXMgdGhlIERPTSBlbGVtZW50LlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gZGVsZXRlLlxuICAqL1xuICBkZWxldGUgKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLmVsZW1lbnQuZWxcblxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8qKlxuICAqIGFkZEZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBpbmZyb250IG9mIGV2ZXJ5dGhpbmcgKHNob3dzIGl0KS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRoYXQgXCJyZXF1ZXN0ZWRcIiB0aGUgZmxhZy5cbiAgKi9cbiAgYWRkRmxhZyAoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUuZWxlbWVudC5mbGFnXG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSAxMDAwXG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBhdCB0aGUgYmFjayAoaGlkZXMgaXQpLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICByZW1vdmVGbGFnIChzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS5lbGVtZW50LmZsYWdcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IC0xXG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICB9XG59XG4iLCJpbXBvcnQgRW50aXR5IGZyb20gJy4vZW50aXR5J1xuXG5pbXBvcnQgU3RhZ2VTdXJmYWNlIGZyb20gJy4vc3RhZ2Utc3VyZmFjZSdcbmltcG9ydCBTcHJpdGVFbGVtZW50IGZyb20gJy4vc3ByaXRlLWVsZW1lbnQnXG5pbXBvcnQgQ29zdHVtZSBmcm9tICcuL2Nvc3R1bWUnXG5pbXBvcnQgVGV4dFVpRWxlbWVudCBmcm9tICcuL3RleHQtdWktZWxlbWVudCdcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBTcHJpdGUuXG4gKiBTcHJpdGVzIGNhbiBiZSBhZGRlZCB0byB0aGUgU3RhZ2UuXG4gKiBAZXh0ZW5kcyBFbnRpdHlcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSh7XG4gKiAgIGNvc3R1bWU6IG5ldyBibG9ja0xpa2UuQ29zdHVtZSh7XG4gKiAgICAgd2lkdGg6IDUwLFxuICogICAgIGhlaWdodDogNTAsXG4gKiAgICAgY29sb3I6ICcjQTJEQUZGJyxcbiAqICAgICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL3NoZWVwX3N0ZXAucG5nJ1xuICogICB9KVxuICogfSk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSh7XG4gKiAgICAgd2lkdGg6IDUwLFxuICogICAgIGhlaWdodDogNTAsXG4gKiAgICAgY29sb3I6ICcjQTJEQUZGJyxcbiAqICAgICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL3NoZWVwX3N0ZXAucG5nJ1xuICogfSk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb25mZXR0aSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9jb25mZXR0aS5zdmcnKTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IGJhcmVaZXJvU2l6ZWRTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZShudWxsKTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgRW50aXR5IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3ByaXRlIHRvIGJlIGFkZGVkIHRvIFN0YWdlLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIGZvciB0aGUgc3ByaXRlIGFuZC9vciBvcHRpb25zIHBhc3NlZCB0byBjb3N0dW1lLlxuICAqIEFsdGVybmF0aXZlbHkgYW4gaW1hZ2UgVVJMLiBJZiBhIFVSTCBpcyBwcm92aWRlZCBkZWZhdWx0IGNvc3R1bWUgd2lsbCBiZSBzaXplZCB0byBpbWFnZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYWNlIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBmb3IgZWFjaCBwYWNlZCBtZXRob2QuXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuY29zdHVtZSAtIEEgZGVmYXVsdCBDb3N0dW1lLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLndpZHRoIC0gdGhlIGNvc3R1bWUgd2lkdGggaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDEwMC5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSB0aGUgY29zdHVtZSBoZWlnaHQgaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDEwMC5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pbWFnZSAtIGEgVVJMIChvciBkYXRhIFVSTCkgZm9yIHRoZSBjb3N0dW1lIGltYWdlLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gYSBjc3MgY29sb3Igc3RyaW5nICgnI2ZmMDAwMCcsICdyZWQnKS5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucyAtIGEgVVJMIChvciBkYXRhIFVSTCkgZm9yIHRoZSBjb3N0dW1lIGltYWdlLlxuICAqL1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgc2hlZXB5ID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRjhBQUFCZUNBWUFBQUJGRU1oUUFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQVJza2xFUVZSNDJ1MWRCMVJVMXhaRlFab1VFUlZGUmJGalZ3UUxLb3FnQmp2Z1Z4R2oyR012c1d1STBVUmk3NzJYYnpmMlhtSnYyRnZzeHQ0VllSb0RjLzQrVDNUeEVXYmVOSnF6MTdwcm1KbjNIbS8ydS9mY2MwKzdabVltbUdCQzFrUXhLeXVyUlhaMmRrL3dLc0hyTTJ0cjYyWDR2SlNKR2lNaVI0NGNIVUM0ckUrZlBvcW9xQ2k2Zi84K1hieDRrUVlPSEJpSEJ5REQ5OTJUSEc2RjFpWlhybHpMSFIwZGQrRjFDZDRIOFdWTVRHcVBwZzRPRGpJbVBTVmN2WHFWbkp5Y3BEZ3VCTTNIMXRiMlZmbnk1U1dUSmsyaUJRc1cwSVFKRTZoa3laSVNmUDRFMzFjeDBTa2VsaUR0OWI1OSswZ2REaHc0UUphV2xwL1E1S3RXclZJbC8xNmxVdEhjdVhNVFdGeDlUMklxTjFwYmMzUHorVGx6NWp3TE9YMFQ3VHBFeFM1OC9nZWFINXFGbXZNYkJRWUdTa2dERWhJU3VQY256Sm8xUzZYdXVMRmp4OFpqRkozUDZxU1hSUy9ibkQxNzlvVENoUXZMT25ic21EQng0a1JCREtBSDByQmh3NmhSbzBZSzlPbzRHeHViOXhZV0ZyL2huRnpKcmxFOWI5Njh4OTY4ZWFPSmU0cUppYUd5WmNzS0QwRWRGQXJGRnhGVk1TdVNiZzBpZjBkVGd2QzR5NWN2YXlSajI3WnRWS05HRFFtTERad2Z4ZzhCbzJNL3kvbWxTNWVxU0NTMmJ0MHE2cmlRa0pCWS9JK2ZzaHJ4QlNCTzdwUW9VVUo2K3ZScDBoYWJOMjhtZTN0N0JZaC9FeHdjTEpOS3BmVHAweWZSNTMvOCtGSFVjYU5HalVyQXZZN0xTc1M3UVh3OFJxOVNjRy9XRllNSER5WnZiMjlTS3BWa0xFUkhSMU9lUEhtNDkxZktDc1RibzhjL2J0Kyt2U0krUGw1blVsZ2pLVlNvRUowN2Q0Nk1qWU1IRDZvdzM3ekR2ZWZKMU14RGkxbnQ2K3NyMXpUWmFjS2pSNDhvZCs3Y2xGYm8wS0dESEE5Z2RtYm12am5JbHo5OStsUnZNcTVkdTBaRml4Wk5NL0paR1FENTd6TXI4ZGxBL0lObHk1WVpoSXozNzk4VHhCZkZ4c2FtQ2Zrc0lsa1ZackdaK0h1Y2VVMkNOZ1l0TXJFTlFHdUI1b1htaW1adWxKVWtXa3ZjekFJUWVnRTk0amxVdjFpOHZvQjk1QUMrRzhWNmQvSmx2NHVMaTlTUWsyUE5talVKNm1XYWtNK0tRYlpzMlZUNEhlVnRiS3pYNCs4RTEvejVwRUhOR2trNmg0WEl3ME9ENWZWcVY0OXhLK1FhWTIxbEZZZmorUGdFRzJ2ck4xWldsdHZ4dnI2K3BEdkJLRFVUUkVmREFDWHYyYk9uY3NtU0piUnAweVpoeWI1aHd3WWFQMzQ4K2Z2N1MzR2NFZy9qUWFJdW5oMXE0ZW5wMDZlTDBzTWxFZ2xQY2pSaXhBaXFXN2NPWkxzVDhZL0Jlb0JLRkM5TzRlSGhkUGp3WWRxN2R5L2x6NStmSGo1OG1PcTFlR1M4ZlBtU1dCWFZCMGVPSE9HUkZtMWhZUjRYMUt5aDh0eWh6VVFmN3FiYVlwOWRwVnZuOXRIZVRVdHBVTy9PU2t2TEhISG9yRU4wSmI0VnJ5NDlQVDBWR3pkdXBMaTRPTFUzKys3ZE80cU1qQ1E4SkFYT3V3eVRRVHlMaXRTR05KTTVmUGh3cW9YZWpBZEh1UndkcVVXVEFKbzE4UmM2c1hjZDNiOTBtQzRlM1VhYlZzeW16bUd0eWNIZW5qdzlxMUtQSGowSUsxdGgwWlIwRW1jOW5sZkdMdm55NHNkM29YSmxQZWp4NDhmZi9HK2VmMDZlUEtsMnRjdmZRYk5TT3RqYnhlL2V1Rmd0NmFtMVBadVdjT2VSYWkyclFkNE1MR1lVQ3hjdUZGUThiZlhrYnQyNktkRnJWS2RPbmZybSs3Tm56MUxwMHFYSUdiMjdVMmd3TFp3K25xNmYzazBKNzI2ci9URWZIbDJnVVlON2tTVWVsTFcxRlJVdVZCQVBJUS81WXFSNFZmTWttQ3VvYVdNL2VuVDFiMUs5djBPL0R1OG5qQ0IrSVB2Mzc2Y3paODdRaWhVcnlLOStQY3J0NUVUdDJyV2xsTlljL0hzYk5HaEE5blk1VlZkUDd0U0plRzZYais4Z2MvUHNTbTNtQVo0a0Y4UGVJbWZWVGg5TW16YU44QUJwejU0OVh6OTcrL1l0Um9halFJenN4WFdkZnRUZk85ZVFYVTVibWowcFFoZ1pXMWJOb1ozckY5SHpmMDU5Y3l5TGdhSDl1NU52N1JyazVWbVpnbHNFMHBKWkUrajEzYlBVMkw4ZWxmWHdJTzVnYkhhK2VmTW1yVm16aGlwWHFrUVc1dWEwZmUwQ25Zbm5OcmgzbDRTY05qWkh4UnRlckswam9jNUpEYUVhTWxhdlhrMllrT24yN2R2Q2U3YlRGSGN2b3RlUCtqS2tNY25SUCtmMjYzd05IaDJyRjA2aGdQcDFxRUIrRjBGYzFhN3BSWUVCOWNpN2FrVzk3bzg3QmR1dlFHbE5zZHdIUU56STFVMW11bURreUpGVXFsUXBRUnhkdW5TSm9EblF1d2RSZWorQTlxMmJVM2o3WUwydms3elY4cTVLY3liL3F2UDVMMjZmb254NW5XVVdGdGtuaURZQmdQalhpeFl0VWhsYVplT0ptbFhFMGFOSEMrOTlmZXRTbTZBbVFzL1RoeVFXUDQ0TzlucGZKM2tyNUpxZkRtNWRvZE81TEVxclZpb25od1Rad3hxZktPWXhSQWFCSUpteGRPYno1ODhMNG9jMW9nY1BIcENMU3o3cTNUVk1MK0o0OUxBNit2TDJhWU9TWDdKNFVmcHI5VnlkeEZqYjRLWktqT3k3U1JabW1ybkhKUHNxNmNSb0REUnYzcHpHakJrai9IM3IxaTBxV05BVllpT0U0dC8rb3hOSnoyNmRGTWovOU9TeVFjbnZGQnBFUGNMYmFuM2UrRkVEVk5EdG96bUtRaHZWTWdnTzVGaHRWVXB0d1F1ZnBIby9qNEJpN3U2Q0NJcDdmVXZySDh1VFpYRjNONFBML0tnamZ3bVQrYlZUdTBTZk0rMlBrU3BJRHptNHJLMmR2ZGZlZmhVV1J5cEtCeng3OWd6dVBROXEwcWcrU1o1ZkZmMWorZGl5cFV2UWhJaWZEVTQrdDZIOXUxSEJBaTUwYlBkYXRjYzl1WEdjL3RNeVVKSFk0K3RwYjJ5M3QzL0dLNzcwQXZ0Z3ZiMjlxRUs1TXFKNkd5KzIvT3ZWNG9tTkZLOXVHb1Y4bHQvOFlHR25JVjhmYjJFaHlPWUZIaFVuOTYyblZRc21VNnVtRGVXc1R0cmEybXhsTDUwdUpnUlgyRzNpTkprT2pBMlpUQ2FZRFhBdjFLMWpHenF5WS9VM3hMNjVkNDVtUkk2QlBwNUhJTjhRNnFxbTl2ajZNV0ZkWW1kbkd3TTdUVHpQTVRDYndMRnZjeGZ2SitKOUJYME1aMzZsUzVlT3BneUM2OWV2VS9mdTNSQkJrRXN3cWhWMUsweXdKRkorRUE2TElYbDdWcVRsYy84MHVIcXBydjAyc2o5WldWcGVNSWFwT05UUHorOFRaVER3U0dTTmFPM2F0WlRUMXBhTzcxbW50cWV6SWE1eUJRK3FYYU1hM1lrNm9CZlpQTG9hTjZoTEU4Y09FOTd2MzdLYzF4TXZqVUYrZU5PbVRXTW9nMkxYcmwzazUrdWprVERXZWxna2NHdlNzSjdPeFBNRSsrVTYzTmlNOGY1aEZPV3dzSWdYdldqU0FtM3ExNjhmblZISm56ZHZIdVlBelRwMzRZSUZ2aElXVU45SFovSjVjWldVZko1WStYT1lsbG1OZERNMCtiV0tGU3YyS2FPU3p5WUp0b0JxSXUzQVh5dW9UTWxpNUFXRG1EYjZlZkxHazN3em1LWGhRS0dHZnJWSit1S2E4SG5GOHFVLzZxUkthb3FuZ2ZkSm5sSEpEKy9Va1JiUC9DUE5KdGZVV3V1V1A4U0FxeTZHSnQ4Q1hpUzliZmZHUXNNQWYwSHVwamY1RWNQNkpsaGFXa1FhZk1aRnpPT3VHVE5tcURJaStkV3grRHB6WUZPNms4K0xMQ2RIaC84YVJlT3BVNmRPaHBUN05hcDcwK2tERzlPZC9MVkxwc0VsNmJqYkdPVG40YVFCZHFObE5OU3FXVU5ZenFjMytleFNkTXJseUJwUFkyUGtORTJCeVRjMm81RmZwN2FQWUdwSWIvSjNiVmhFVlNwWGdoZk9KZzRLeWpKRDUyOXg3NWV5aHo4NU9QNkZKMlMydjZRMXd0cUgwdExaa2VsTy9zcjVrNFI3WVJjclhLSXltOCtPY1FlRHNROURVVjhFSkVrK2ZQZ2dMTzA1SEp0OXIvaWNzL3JTcGVkSFJFUUk0U0xwVGY2VThTTm93SUQrWDBOakVQZ3J3d2k0WXZZNXM5RkFhU1BXMXNjS0ZDaVFBTXNkQlFRRUNHRVZiT3d5dHFNbE5heGN1Ukt1dVdZR0lYRDkwaGxVd0NVdmJFVTJncjFlbTNPSDlPc21ST1lsRFNXc1VxV0tCSHpOTXdqdmtQdVQyVDdkcjE4L2V2TGtTWWFRK1J3cFhNU3RrRUhJYnhIby85VnNvSzNqdlZFRFg5cXlaY3YvM2R1Ly8vNHJaTW9rQnNycUhrS1BJWFFDSWthZUZva0gyb0JIWEQ2RUJuSkVtNzdrczZNZGl5VWEyQ3VjTGgzYkx2bzhkbkU2T2pnSVhyZmtXTGR1SGNILy9VeER4bVRxaml5Y0hPWGo0eVBYSnI4cExkR3IxMDgwdUU4WG5RaGZNRzJjRU1ENnhXNnpjZmtzUWZ4OGNkcnpxNll3RVk3VnJGU3hRcXIzVjZGQ2hWak1pejIwWmg3aGZGc1FZU3hQRDAxR0xDNWN1Q0FFeWJJblMxdnlRME9hVWZWcWxZUVZLb2VFK0ZUM0ZPeitiSzluMHV2VXJDWUVTYW03UmdPWXRLZE1tWkxxL1hFVUhqcndVNjJJeDZRYWltaGZXV3FSeEJrSlRaczBvVkJFcUdsTFB2ZHNqdW5zMkM1SWlPbjhFdGpFSTRrZlFtVEVFTFdSRTF2WHpFTnluTFBhVEVhT2FJYnNsM0VjdjFqdW5SSFZHOHN4OFprQlhNakMwZEdCL3Z4MWFKcXBseHdIaWxVdExWNjhXT1A5SWRsUEJ0RXpVcXhLT2JaRml4Wnl5a1RZc1dPSDRHQmZOT04zb3hQLzl2NTVpQ2wzK0pPN2k3bzNkbmNpTCtHc0dPNXRPT09DNCtRekd6Z2hnaE1wV0dzeEZ2RXNsbXBoYm1qZXJCbUpUVjNsRUhQTW42L0ZrQitHYkpNWXlxUll2MzY5a0FneHBGOVhqUWtWMmphVy95RXRmaEFDdVhpbEx4YXNLU1ltejVscnN0K3Zueng1c29veU1RNGRPaVRNQVp5SkV2MzRra0dJWjVjaEw4VGMzWXVTTHM0bGRBaUZ4dUFwREk5WG1WSGtKQWNuWEhBUExWYlVqUTV0VzZrWDhSejI1MW01QXBVb1VUekZQQzR4U0V5R2NGWWJvWVluRkdmTTJnVnBDUjd1eVA4U2pIOC90bTBsNUdOcFN6eXJvSG1jYzVPUFR5MFNVejRtSmJEbEY5eXFOSzEwNnlCYUlacXlHRGd0bFpQc2tQOUtQM1VPRlpMUnhDU3NJYWRXZUhCc3o5Sm5vZm44K1hQV3hPU2FKdHVXcUYyVDVjaG44R2ptT0o4aVJUNEhVRlZFNEMwdnBuaWh4QUd1OXk0ZUVod3pVMzhmQ1cybXFoQis2T1ZWalk0ZVBhcjMvK2JjQmlSLzNOWkVmZ2o4dFZtUy9LUXJ6cDA3ZC9MQ1IwakFTQm9FeFkxTENLQmVqeEFOWnlnTUdqUklDWEUrUldOZ0xNcGRpU0kvdld6NGhnWm5WcksxbGtVVCt5YU1ZY2Z5OFBEZytQeEFUZVNYeEVwTUtxYjNtQ0FPVjY1Y29jU3FoRGsxa1cvTHhSemtjdldXQlgycVFYMXZnQWlUWXJLTkZHdEdmc3BGSGRRWnNVelFQTGx6ajc5ejV3NmJPN2ppU0VGUjVHT0lUTzNidDIrS3FTaTh3RENKSE0xZzkyWllXQmo3Y2FYZ2M1bzJwbnhmVjFmWDJKUklacmVZQ1pyQm1aUmNWd0loSkxjU2F4R0o5Nk93NTRWcjVTVEZ2WHYzQk91Y0NlS0E0aUNzdW5iU3hYZjdvN3U3dXlTcHlaUnIzMlFWOVRJdGdJcmw4VmdkajljcE5KeDdQOHF5ZkdXN1hidDJKa2Exd0p3NWMzaFZ1MW5Ya0JFdnpOU0tFeWRPQ0JvT1Zta21SclhBOXUzYnVlN3lSZDB6SXl3c2hpSkNUVHAxNnRRMEt4eVhWY0JSRlhDY1A5ZXIvQ0o2L3hMTTNFcERHSmkrSjNBSk0xZ0xIdXBkL3hLeTZ6NXZjMkdDZUxCaERoVnVMK2tkcUltTG5NcG9vWUlaSGRpQmdtWCtZVU9RZjNMMzd0MG1SclZUTlZFNzAzS2kvbVcrVWZhRkoxMFR4QU1lUVU0UDlUZEVpSGpFZ0FFRGxDWkt4ZUhWcTFkY2ZVUXB4b3dzQmgxUkFDUEdSS3M0akJzM0xnRWhPQWNObFpUaXlxWlJybWxzZ25wd3BBTHYxd0xPdkEyV0VnUjE4eTc3UGsxUWo5bXpaNnN3UjE0MWJJMTJTOHV4clZxMWtwbm9UUjJjcXd3SFBFZW0xVEowT201dVRnZlZ0SDNTOXdvdURWK21UQmtKYnpWbGxLMGU0QnlZYXVyOTM0SWo0MUQwVmM0cFZHWkczTUF5TDRlUGN6VnRFejdqeFlzWFg5SStUMmxUS1ZaWCtMTmM0eGlYN3huc1dPSmRNdERiRmVDRGkxN1lwc2xPTTV5NWdvMjY1Rm5GcmNpQlVweFl3ZHQvY0ZhN3VvNzErdlZyd25ZakxOK2w0SUgzeW1xVDVsdjlZUElkaC94Y2hib3drOHdHanFsRVFUOWVuZkxlS3lwazJVdndRRlNjL3RPNmRXc2x5bHhLT2NrQnF1UjFVTkNiTlhDejlBSnVwQ2N2b3hGcUVwOFpzaGJGZ0FQR1lKZmhDTE01YUp6RU5oZHRBZHBVTk40eHVxUlpCa0lsaklBb2xuMzhFSTRmUDU1aVJCdC94cGJSenAwN0V5b1dFcXBYQ1Z1aDZnb09TTUwvRkdJc0RXeU5qTU4xejVzWmFVOHJvMDNFOEhodDQyclphUEVjL1lDSVp5azNWQ0dYY1FWWVoyZG42dCsvUCtucm1HRzVpK0JUcm0wVGYvZnVYWU1SejdzZThWb0d2OFhkTEpPQ3k1eHdxZktPaWNPVUcrOHYvak1uQ0NTUEI5SkZ0V094Z0VpdzNaand4a0UyeTI3Y3VHRVE0bmt2TDl4bnNGa1dSV04rQU5oVFZtTXdia3JnVkhyT2lnZnhXNzRzWm5DOVgxams2U3ArT0RKdjVzeVpxc1NZeWlDekxJNnF2Rk9jbTV1YmpNTVB4VlFvWjJkMHk1WXRGU0NJUlVMZjVQSVlrMzRYVGpqcjJyV3JramRCRUFzZU1WNWVYaktNb0xlNFRDT3o3d1FzbXZyQlhQRVcxbElGMUxsNExsekVhbXRVVkpTd1lSanY3TXc3Q1dIdTRQbENqbU5YYTRqMjljQUlPTVlKZmJpZWtqY2VTMmwwOFY1Y3ZCa1pLcWx3U240Q2pwK2ZyaXBqT29KN2NDQjY3bnhNMXJjVGUvYm5EUnp4WUtCUDcwbWNPK3kwdUdZTm5Mc0twSDdDOWVKNTg4dHk1Y3BKa0hFandjS1E3ZXlzSlQwQjhhUHhkMkV6RTR5ekRESDd2SGxBVUpLSlB5Z2phakwvQTE1RXh5K000NExmQUFBQUFFbEZUa1N1UW1DQydcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHBhY2U6IDMzXG4gICAgfVxuXG4gICAgbGV0IGFjdHVhbCA9IHt9XG4gICAgdHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnID8gYWN0dWFsID0geyAuLi5kZWZhdWx0cywgLi4ub3B0aW9ucyB9IDogYWN0dWFsID0gZGVmYXVsdHNcblxuICAgIHN1cGVyKGFjdHVhbC5wYWNlKVxuXG4gICAgLy8gY29zdHVtZXNcbiAgICB0aGlzLmNvc3R1bWVzID0gW11cblxuICAgIC8qXG4gICAgKiBhbHRlcm5hdGUgb3B0aW9ucyAgLSBpbWFnZSB1cmwuXG4gICAgKiB1c2VyIGNhbiBzZW5kIGEgdXJsIGluc3RlYWQgb2YgYW4gb3B0aW9uIG9iamVjdC5cbiAgICAqIHRoaXMgd2lsbCBiZSB0cmVhdGVkIGFzIGEgY29zdHVtZSBpbWFnZSB1cmwuXG4gICAgKiB0aGUgaW1hZ2Ugd2lsbCBiZSBzZXQgdGhlIHNwcml0ZSBjb3N0dW1lLlxuICAgICogd2hlbiB0aGUgaW1hZ2UgaXMgbG9hZGVkLCBjb3N0dW1lIHdpZHRoIGFuZCBoZWlnaHQgd2lsbCBiZSBzZXQgdG8gYWN0dWFsIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQuXG4gICAgKiBzcHJpdGUgd2lsbCBiZSByZWZyZXNoZWQuXG4gICAgKi9cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhY3R1YWwuY29zdHVtZSA9IG5ldyBDb3N0dW1lKHsgaW1hZ2U6IG9wdGlvbnMsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSlcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpXG5cbiAgICAgIGNvbnN0IG1lID0gYWN0dWFsLmNvc3R1bWVcbiAgICAgIGltYWdlLnNyYyA9IG9wdGlvbnNcblxuICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbWUub3JpZ2luYWxXaWR0aCA9IGltYWdlLndpZHRoXG4gICAgICAgIG1lLm9yaWdpbmFsSGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0XG4gICAgICAgIG1lLndpZHRoID0gbWUub3JpZ2luYWxXaWR0aFxuICAgICAgICBtZS5oZWlnaHQgPSBtZS5vcmlnaW5hbEhlaWdodFxuXG4gICAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qXG4gICAgKiBhbHRlcm5hdGUgb3B0aW9ucyAtIHBhc3NpbmcgY3VzdG9tZSBvcHRpb25zIHRvIHNwcml0ZS5cbiAgICAqIGlmIGNvc3R1bWUgaXMgbm90IGRlZmluZWQgYnkgdXNlciwgaXQgd2lsbCBiZSBjcmVhdGVkLlxuICAgICogd2hlbiBubyBpbWFnZSBpcyBzZXQsIHNoZWVweSBpcyBkZWZhdWx0LlxuICAgICpcbiAgICAqIGFsdGVybmF0ZSBvcHRpb25zIC0gbnVsbC5cbiAgICAqIHVzZXIgY2FuIHBhc3MgbnVsbCBpbnN0ZWFkIG9mIGFuIG9wdGlvbiBvYmplY3QuXG4gICAgKiB0aGlzIGlzIHNhbWUgYXMgc2V0dGluZyBhIGNvc3R1bWUgYXMgbnVsbC5cbiAgICAqIHRoZSBzcHJpdGUgd2lsbCBoYXZlIG5vIGNvc3R1bWVzIGFuZCBubyBzaXplLlxuICAgICovXG4gICAgaWYgKHR5cGVvZiBhY3R1YWwuY29zdHVtZSA9PT0gJ3VuZGVmaW5lZCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgY29zdHVtZU9wdGlvbnMgPSB7fVxuICAgICAgYWN0dWFsLndpZHRoID8gY29zdHVtZU9wdGlvbnMud2lkdGggPSBhY3R1YWwud2lkdGggOiBudWxsXG4gICAgICBhY3R1YWwuaGVpZ2h0ID8gY29zdHVtZU9wdGlvbnMuaGVpZ2h0ID0gYWN0dWFsLmhlaWdodCA6IG51bGxcbiAgICAgIGFjdHVhbC5jb2xvciA/IGNvc3R1bWVPcHRpb25zLmNvbG9yID0gYWN0dWFsLmNvbG9yIDogbnVsbDtcbiAgICAgICh0eXBlb2YgYWN0dWFsLmltYWdlICE9PSAndW5kZWZpbmVkJykgPyBjb3N0dW1lT3B0aW9ucy5pbWFnZSA9IGFjdHVhbC5pbWFnZSA6IGNvc3R1bWVPcHRpb25zLmltYWdlID0gc2hlZXB5XG5cbiAgICAgIGFjdHVhbC5jb3N0dW1lID0gbmV3IENvc3R1bWUoY29zdHVtZU9wdGlvbnMpXG4gICAgfVxuXG4gICAgLy8gc2V0IGNvc3R1bWVcbiAgICBhY3R1YWwuY29zdHVtZSA/IHRoaXMuY29zdHVtZSA9IGFjdHVhbC5jb3N0dW1lIDogbnVsbFxuICAgIHRoaXMuY29zdHVtZSA/IHRoaXMuY29zdHVtZXMucHVzaCh0aGlzLmNvc3R1bWUpIDogbnVsbFxuXG4gICAgLy8gc2V0IHdpZHRoXG4gICAgdGhpcy5jb3N0dW1lID8gdGhpcy53aWR0aCA9IHRoaXMuY29zdHVtZS52aXNpYmxlV2lkdGggOiB0aGlzLndpZHRoID0gMFxuICAgIHRoaXMuY29zdHVtZSA/IHRoaXMuaGVpZ2h0ID0gdGhpcy5jb3N0dW1lLnZpc2libGVIZWlnaHQgOiB0aGlzLmhlaWdodCA9IDBcblxuICAgIHRoaXMueCA9IDBcbiAgICB0aGlzLnkgPSAwXG4gICAgdGhpcy56ID0gMFxuXG4gICAgdGhpcy5wcmV2WCA9IDBcbiAgICB0aGlzLnByZXZZID0gMFxuXG4gICAgdGhpcy5zaG93aW5nID0gdHJ1ZVxuICAgIHRoaXMuZGlyZWN0aW9uID0gOTBcbiAgICB0aGlzLm1hZ25pZmljYXRpb24gPSAxMDBcblxuICAgIHRoaXMucm90YXRpb25TdHlsZSA9IDBcblxuICAgIHRoaXMudGV4dHVpID0gbnVsbFxuXG4gICAgdGhpcy5kcmF3aW5nID0gZmFsc2VcbiAgICB0aGlzLnBlbkNvbG9yID0gJyMyMjIyMjInXG4gICAgdGhpcy5wZW5TaXplID0gMVxuXG4gICAgdGhpcy5jc3NSdWxlcyA9IFtdXG4gICAgdGhpcy5jbGFzc2VzID0gW11cbiAgfVxuXG4gIC8qKiBTZXR1cCBBY3Rpb25zICogKi9cblxuICAvKipcbiAgKiBhZGRUbyAtIEFkZHMgdGhlIHNwcml0ZSB0byB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHdoaWNoIHN0YWdlIHRvIGFkZCB0aGUgc3ByaXRlIHRvby5cbiAgKi9cbiAgYWRkVG8gKHN0YWdlKSB7XG4gICAgdGhpcy5zdGFnZVdpZHRoID0gc3RhZ2Uud2lkdGhcbiAgICB0aGlzLnN0YWdlSGVpZ2h0ID0gc3RhZ2UuaGVpZ2h0XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgU3ByaXRlRWxlbWVudCh0aGlzLCBzdGFnZSlcbiAgICB0aGlzLnN1cmZhY2UgPSBuZXcgU3RhZ2VTdXJmYWNlKHN0YWdlKVxuXG4gICAgdGhpcy5lbGVtZW50LmZsYWcgPSBzdGFnZS5lbGVtZW50LmZsYWdcbiAgICB0aGlzLmFnYWluc3RCYWNrZHJvcCA9IHN0YWdlLmVsZW1lbnQuYmFja2Ryb3BDb250YWluZXJcblxuICAgIHN0YWdlLnNwcml0ZXMucHVzaCh0aGlzKVxuICAgIHRoaXMueiA9IHN0YWdlLnNwcml0ZXMubGVuZ3RoXG5cbiAgICB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpXG4gIH1cblxuICAvKipcbiAgKiBjbG9uZSAtIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGUgc3ByaXRlIGFuZCB0cmlnZ2VycyBhbiBldmVudC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgbGV0IGNsb25lID0gdGhpcy5jbG9uZSgpO1xuICAqICAgY2xvbmUubW92ZSgxMDApO1xuICAqICAgY2xvbmUuYWRkVG8oc3RhZ2UpO1xuICAqIH0pO1xuICAqXG4gICovXG4gIGNsb25lICgpIHtcbiAgICAvLyBtYWtlIGEgbmV3IHNwcml0ZS5cbiAgICBjb25zdCBzcHJpdGUgPSBuZXcgU3ByaXRlKClcbiAgICAvLyBzYXZlIGlkLlxuICAgIGNvbnN0IGlkID0gc3ByaXRlLmlkXG4gICAgLy8gYW5kIGFzc2lnbiBwcm9wZXJ0aWVzLlxuICAgIGNvbnN0IGNsb25lID0gT2JqZWN0LmFzc2lnbihzcHJpdGUsIHRoaXMpXG4gICAgLy8gcmVhc3NpZ24gdGhlIHVuaXF1ZSBpZC5cbiAgICBjbG9uZS5pZCA9IGlkXG5cbiAgICAvLyByZW1vdmUgRE9NIGVsZW1lbnRzXG4gICAgY2xvbmUuZWxlbWVudCA9IG51bGxcbiAgICBjbG9uZS5zdXJmYWNlID0gbnVsbFxuXG4gICAgLy8gZGV0YWNoIGFycmF5c1xuICAgIGNsb25lLmNzc1J1bGVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmNzc1J1bGVzKSlcbiAgICBjbG9uZS5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLnNsaWNlKClcblxuICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCB0aGUgY3VycmVudCBjb3N0dW1lIGlzLlxuICAgIGNvbnN0IGN1cnJlbnRDb3N0dW1lSW5kZXggPSB0aGlzLmNvc3R1bWVzLmluZGV4T2YodGhpcy5jb3N0dW1lKVxuXG4gICAgLy8gZmlsbCB0aGUgY29zdHVtZXMgYXJyYXkgd2l0aCBuZXcgY29zdHVtZXMgYW5kIGFzc2lnbiBwcm9wZXJ0aWVzLlxuICAgIGNsb25lLmNvc3R1bWVzID0gdGhpcy5jb3N0dW1lcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGNvc3R1bWUgPSBuZXcgQ29zdHVtZSgpXG4gICAgICBjb25zdCBvYmogPSBPYmplY3QuYXNzaWduKGNvc3R1bWUsIGl0ZW0pXG5cbiAgICAgIC8vIGRldGFjaCBhcnJheXNcbiAgICAgIG9iai5jc3NSdWxlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaXRlbS5jc3NSdWxlcykpXG4gICAgICBvYmouY2xhc3NlcyA9IGl0ZW0uY2xhc3Nlcy5zbGljZSgpXG5cbiAgICAgIHJldHVybiBvYmpcbiAgICB9KVxuXG4gICAgLy8gc2V0IHRoZSBjdXJyZW50IGNvc3R1bWUuXG4gICAgY2xvbmUuY29zdHVtZSA9IGNsb25lLmNvc3R1bWVzW2N1cnJlbnRDb3N0dW1lSW5kZXhdXG5cbiAgICAvLyBhbm5vdW5jZSBhIGNsb25lXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGBibG9ja0xpa2Uuc3ByaXRlY2xvbmVkLiR7dGhpcy5pZH1gLCB7IGRldGFpbDogY2xvbmUgfSlcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuXG4gICAgcmV0dXJuIGNsb25lXG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyBhIHNwcml0ZSBmcm9tIHRoZSBzdGFnZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUucmVtb3ZlRnJvbShzdGFnZSk7XG4gICpcbiAgKi9cbiAgcmVtb3ZlRnJvbSAoc3RhZ2UpIHtcbiAgICBjb25zdCBjdXJTdGFnZSA9IHN0YWdlXG5cbiAgICBjdXJTdGFnZS5zcHJpdGVzID0gc3RhZ2Uuc3ByaXRlcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHRoaXMpXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50LmRlbGV0ZSh0aGlzKSA6IG51bGxcbiAgfVxuXG4gIC8qKiBFdmVudHMgKiAqL1xuXG4gIC8qKlxuICAqIHdoZW5DbG9uZWQgLSBBZGRzIGEgZG9jdW1lbnQgbGV2ZWwgZXZlbnQgbGlzdGVuZXIgdHJpZ2dlcmVkIGJ5IGEgY3VzdG9tIGV2ZW50LlxuICAqIFRoZSBjdXN0b20gZXZlbnQgaXMgdHJpZ2dlcmVkIGJ5IHRoZSBjbG9uZSgpIG1ldGhvZC5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmNsb25lKCk7XG4gICogfSk7XG4gICpcbiAgKiBzcHJpdGUud2hlbkNsb25lZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmFkZFRvKHN0YWdlKTtcbiAgKiAgIHRoaXMuZ2xpZGUoNSwgMTAwLCAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5DbG9uZWQgKGZ1bmMpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBibG9ja0xpa2Uuc3ByaXRlY2xvbmVkLiR7dGhpcy5pZH1gLCAoZSkgPT4ge1xuICAgICAgZS5kZXRhaWwuX2V4ZWMoZnVuYywgW10pXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfSlcbiAgfVxuXG4gIC8qKiBNb3Rpb24gKiAqL1xuXG4gIC8qKlxuICAqIF9tb3Rpb24gLSBNb3ZlcyB0aGUgc3ByaXRlIHRvIHNwZWNpZmllZCBsb2NhdGlvbiAoeCwgeSkuXG4gICogQWxsIHVzZXIgbW90aW9uIG1ldGhvZHMgdHJhbnNsYXRlZCB0byB0aGlzIG1vdGlvbi5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIG9mIHRoZSBzcHJpdGUgKDAgaXMgY2VudGVyIHNjcmVlbikuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIG9mIHRoZSBzcHJpdGUgKDAgaXMgY2VudGVyIHNjcmVlbikuXG4gICovXG4gIF9tb3Rpb24gKHgsIHkpIHtcbiAgICB0aGlzLnByZXZYID0gdGhpcy54XG4gICAgdGhpcy5wcmV2WSA9IHRoaXMueVxuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGxcbiAgICB0aGlzLnN1cmZhY2UgPyB0aGlzLnN1cmZhY2UuZHJhdyh0aGlzKSA6IG51bGxcbiAgfVxuXG4gIC8qKlxuICAqIGdsaWRlIC0gTW92ZXMgdGhlIHNwcml0ZSBmb3IgdGhlIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcyBzbyBpdCBhcnJpdmVzIGF0IHNwZWNpZmllZCBsb2NhdGlvbiB3aGVuIHRpbWUgaXMgdXAuXG4gICogUHJvdmlkZXMgc21vb3RoIG1vdmVtZW50LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5nbGlkZSgzLCAxMDAsIDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICBsZXQgdGltZSA9IDU7XG4gICogICB0aGlzLmdsaWRlKHRpbWUsIDEwMCwgMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSB0aGUgbnVtYmVyIG9mIHNlY29uZHMgdGhlIHdob2xlIG1vdmVtZW50IHdpbGwgbGFzdCAoYW5kIHdpbGwgaGFsdCBmdXJ0aGVyIGV4ZWN1dGlvbiBmb3IpLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIHggY29vcmRpbmF0ZS5cbiAgKiBAcGFyYW0ge251bWJlcn0geSAtIHRoZSB5IGNvb3JkaW5hdGUuXG4gICovXG4gIGdsaWRlIChzZWMsIHgsIHksIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICBsZXQgaSA9IDBcbiAgICBjb25zdCBtZSA9IHRoaXNcbiAgICAvLyBkaXZpZGUgdGhlIHggYW5kIHkgZGlmZmVyZW5jZSBpbnRvIHN0ZXBzXG4gICAgY29uc3QgZnJhbWVzUGVyU2Vjb25kID0gMTAwMCAvIHRoaXMucGFjZVxuICAgIGNvbnN0IHN0ZXBYID0gKHggLSB0aGlzLngpIC8gKHNlYyAqIGZyYW1lc1BlclNlY29uZClcbiAgICBjb25zdCBzdGVwWSA9ICh5IC0gdGhpcy55KSAvIChzZWMgKiBmcmFtZXNQZXJTZWNvbmQpXG4gICAgY29uc3QgaW50ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaSArPSAxXG4gICAgICBtZS5fbW90aW9uKG1lLnggKyBzdGVwWCwgbWUueSArIHN0ZXBZKVxuICAgICAgaWYgKGkgLyBmcmFtZXNQZXJTZWNvbmQgPj0gc2VjKSB7XG4gICAgICAgIC8vICBjbGVhciB0aGUgaW50ZXJ2YWwgYW5kIGZpeCBhbnkgXCJkcmlmdFwiXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50KVxuICAgICAgICBtZS5fbW90aW9uKHgsIHkpXG4gICAgICAgIG1lLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZClcbiAgICAgIH1cbiAgICB9LCB0aGlzLnBhY2UpXG4gIH1cblxuICAvKipcbiAgKiBtb3ZlIC0gTW92ZXMgdGhlIHNwcml0ZSBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGl4ZWxzIGluIHRoZSBkaXJlY3Rpb24gaXQgaXMgcG9pbnRpbmcuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMubW92ZSgxMDAsIDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzIC0gbnVtYmVyIG9mIHBpeGVscyB0byBtb3ZlLlxuICAqL1xuICBtb3ZlIChwaXhlbHMpIHtcbiAgICAvKipcbiAgICAqIHRvUmFkIC0gY29udmVydHMgYSBkZWdyZWUgdG8gcmFkaWFucy5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gbnVtYmVyIG9mIGRlZ3JlZXMuXG4gICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gZGVncmVlcyBjb252ZXJ0ZWQgdG8gcmFkaWFucy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvUmFkIChkZWcpIHtcbiAgICAgIHJldHVybiBkZWcgKiAoTWF0aC5QSSAvIDE4MClcbiAgICB9XG5cbiAgICBjb25zdCBkeCA9IE1hdGgucm91bmQoTWF0aC5jb3ModG9SYWQodGhpcy5kaXJlY3Rpb24gLSA5MCkpICogcGl4ZWxzKVxuICAgIGNvbnN0IGR5ID0gTWF0aC5yb3VuZChNYXRoLnNpbih0b1JhZCh0aGlzLmRpcmVjdGlvbiArIDkwKSkgKiBwaXhlbHMpXG5cbiAgICB0aGlzLl9tb3Rpb24odGhpcy54ICsgZHgsIHRoaXMueSArIGR5KVxuICB9XG5cbiAgLyoqXG4gICogZ29UbyAtIE1vdmVzIHRoZSBzcHJpdGUgdG8gc3BlY2lmaWVkIGxvY2F0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmdvVG8oMTAwLCAxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKi9cbiAgZ29UbyAoeCwgeSkge1xuICAgIHRoaXMuX21vdGlvbih4LCB5KVxuICB9XG5cbiAgLyoqXG4gICogZ29Ub3dhcmRzIC0gTW92ZXMgdGhlIHNwcml0ZSB0b3dhcmRzIGFub3RoZXIgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IG90aGVyU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLm1vdmUoMTAwKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5nb1Rvd2FyZHMob3RoZXJTcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZSB0by5cbiAgKi9cbiAgZ29Ub3dhcmRzIChzcHJpdGUpIHtcbiAgICB0aGlzLl9tb3Rpb24oc3ByaXRlLngsIHNwcml0ZS55KVxuICB9XG5cbiAgLyoqXG4gICogc2V0WCAtIFBsYWNlcyB0aGUgc3ByaXRlIGF0IHRoZSBzcGVjaWZpZWQgeCBwb3NpdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZXRYKDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGVcbiAgKi9cbiAgc2V0WCAoeCkge1xuICAgIHRoaXMuX21vdGlvbih4LCB0aGlzLnkpXG4gIH1cblxuICAvKipcbiAgKiBzZXRZIC0gUGxhY2VzIHRoZSBzcHJpdGUgYXQgdGhlIHNwZWNpZmllZCB5IHBvc2l0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNldFkoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKi9cbiAgc2V0WSAoeSkge1xuICAgIHRoaXMuX21vdGlvbih0aGlzLngsIHkpXG4gIH1cblxuICAvKipcbiAgKiBjaGFuZ2VYIC0gTW92ZXMgdGhlIHNwcml0ZSBvbiB0aGUgeCBheGlzIGEgc3BlY2lmaWVkIG51bWJlciBvZiBwaXhlbHMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuY2hhbmdlWCgxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBpeGVscyAtIG51bWJlciBvZiBwaXhlbHMgdG8gbW92ZS5cbiAgKi9cbiAgY2hhbmdlWCAocGl4ZWxzKSB7XG4gICAgdGhpcy5fbW90aW9uKHRoaXMueCArIHBpeGVscywgdGhpcy55KVxuICB9XG5cbiAgLyoqXG4gICogY2hhbmdlWSAtIE1vdmVzIHRoZSBzcHJpdGUgb24gdGhlIHkgYXhpcyBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGl4ZWxzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmNoYW5nZVkoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbHMgLSBudW1iZXIgb2YgcGl4ZWxzIHRvIG1vdmUuXG4gICovXG4gIGNoYW5nZVkgKHBpeGVscykge1xuICAgIHRoaXMuX21vdGlvbih0aGlzLngsIHRoaXMueSArIHBpeGVscylcbiAgfVxuXG4gIC8qKlxuICAqIHBvaW50SW5EaXJlY3Rpb24gLSBQb2ludHMgdGhlIHNwcml0ZSBpbiBhIHNwZWNpZmllZCBkaXJlY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucG9pbnRJbkRpcmVjdGlvbig0NSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gZGlyZWN0aW9uIHRvIHBvaW50IHRvLlxuICAqL1xuICBwb2ludEluRGlyZWN0aW9uIChkZWcpIHtcbiAgICBkZWcgPiAwID8gdGhpcy5kaXJlY3Rpb24gPSBkZWcgJSAzNjAgOiB0aGlzLmRpcmVjdGlvbiA9IChkZWcgKyAoMzYwICogMTApKSAlIDM2MFxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiBwb2ludFRvd2FyZHMgLSBQb2ludCB0aGUgc3ByaXRlIHRvd2FyZHMgYW5vdGhlciBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuZ29UbygxMDAsIDEwMCk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucG9pbnRUb3dhcmRzKG90aGVyU3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUgdG8uXG4gICovXG4gIHBvaW50VG93YXJkcyAoc3ByaXRlKSB7XG4gICAgLyoqXG4gICAgKiBjb21wdXRlRGlyZWN0aW9uVG8gLSBmaW5kcyB0aGUgZGlyZWN0aW9uIGZyb20gc3ByaXRlJ3MgY3VycmVudCBsb2NhdGlvbiB0byBhIHNwZWNpZmllZCBzZXQgb2YgY29vcmRpbmF0ZXMuXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGZyb21YIC0gdGhlIHggY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGZyb21ZIC0gdGhlIHkgY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IHRvWCAtIHRoZSB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b1kgLSB0aGUgeSBjb29yZGluYXRlXG4gICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gZGlyZWN0aW9uIGluIGRlZ3JlZXMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlRGlyZWN0aW9uVG8gKGZyb21YLCBmcm9tWSwgdG9YLCB0b1kpIHtcbiAgICAgIC8qKlxuICAgICAgKiB0b0RlZyAtIENvbnZlcnRzIHJhZGlhbnMgdG8gZGVncmVlcy5cbiAgICAgICpcbiAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZCAtIG51bWJlciBvZiByYWRpYW5zLlxuICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gcmFkaWFucyBjb252ZXJ0ZWQgdG8gZGVncmVlcy5cbiAgICAgICovXG4gICAgICBmdW5jdGlvbiB0b0RlZyAocmFkKSB7XG4gICAgICAgIHJldHVybiByYWQgKiAoMTgwIC8gTWF0aC5QSSlcbiAgICAgIH1cblxuICAgICAgLy8gMSkgRmluZCB0aGUgYW5nbGUgaW4gcmFkLCBjb252ZXJ0IHRvIGRlZyAoOTAgdG8gLTkwKS5cbiAgICAgIC8vIDIpIEZpbmQgdGhlIHNpZ24gb2YgdGhlIGRlbHRhIG9uIHkgYXhpcyAoMSwgLTEpLiBTaGlmdCB0byAoMCwgLTIpLiBNdWx0aXBseSBieSA5MC4gKDAsIDE4MClcbiAgICAgIC8vIEFkZCAxKSBhbmQgMilcbiAgICAgIC8vIE5vcm1hbGl6ZSB0byAzNjBcblxuICAgICAgbGV0IHJlc3VsdCA9ICh0b0RlZyhNYXRoLmF0YW4oKGZyb21YIC0gdG9YKSAvIChmcm9tWSAtIHRvWSkpKSArICg5MCAqIChNYXRoLnNpZ24oZnJvbVkgLSB0b1kpICsgMSkpICsgMzYwKSAlIDM2MDtcbiAgICAgIChmcm9tWSAtIHRvWSkgPT09IDAgPyByZXN1bHQgKz0gOTAgOiBudWxsIC8vIG1ha2Ugc3VyZSB3ZSBmaXggYXRhbiBsaW0gKGRpdmlzaW9uIGJ5IHplcm8pLlxuXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBjb21wdXRlRGlyZWN0aW9uVG8odGhpcy54LCB0aGlzLnksIHNwcml0ZS54LCBzcHJpdGUueSlcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbFxuICB9XG5cbiAgLyoqXG4gICogdHVyblJpZ2h0IC0gVHVybnMgdGhlIHNwcml0ZSBpbiBhIHNwZWNpZmllZCBudW1iZXIgb2YgZGVncmVlcyB0byB0aGUgcmlnaHQgKGNsb2Nrd2lzZSlcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy50dXJuUmlnaHQoNDUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIG51bWJlciBvZiBkZWdyZWVzIHRvIHR1cm4uXG4gICovXG4gIHR1cm5SaWdodCAoZGVnKSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAodGhpcy5kaXJlY3Rpb24gKyBkZWcpICUgMzYwXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGxcbiAgfVxuXG4gIC8qKlxuICAqIHR1cm5MZWZ0IC0gVHVybnMgdGhlIHNwcml0ZSBpbiBhIHNwZWNpZmllZCBudW1iZXIgb2YgZGVncmVlcyB0byB0aGUgbGVmdCAoY291bnRlci1jbG9ja3dpc2UpXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMudHVybkxlZnQoNDUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIG51bWJlciBvZiBkZWdyZWVzIHRvIHR1cm4uXG4gICovXG4gIHR1cm5MZWZ0IChkZWcpIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICgodGhpcy5kaXJlY3Rpb24gKyAzNjApIC0gZGVnKSAlIDM2MFxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiBzZXRSb3RhdGlvblN0eWxlIC0gU2V0cyBvbmUgb2YgdGhyZWUgcG9zc2libGUgcm90YXRpb24gc3R5bGVzOlxuICAqICAgLSAnbm8nIC8gMiAtIHRoZSBzcHJpdGVzIGNoYW5nZXMgdGhlIGRpcmVjdGlvbiBpbiB3aGljaCBpdCBwb2ludHMgd2l0aG91dCBjaGFuZ2luZyB0aGUgc3ByaXRlcyBhcHBlYXJhbmNlLlxuICAqICAgLSAnbGVmdC1yaWdodCcgLyAxIC0gdGhlIHNwcml0ZSB3aWxsIGZsaXAgaG9yaXpvbnRhbGx5IHdoZW4gZGlyZWN0aW9uIGlzIGJldHdlZW4gMTgwIGFuZCAzNjAuXG4gICogICAtICdhbGwnIC8gMCAtIHRoZSBzcHJpdGUgd2lsbCByb3RhdGUgYXJvdW5kIGl0cyBjZW50ZXJcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2V0Um90YXRpb25TdHlsZSgnbGVmdC1yaWdodCcpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBzcHJpdGUuc2V0Um90YXRpb25TdHlsZSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSBudW1iZXIgb2YgZGVncmVlcyB0byB0dXJuLlxuICAqL1xuICBzZXRSb3RhdGlvblN0eWxlIChzdHlsZSkge1xuICAgIGxldCBjdXJTdHlsZSA9IHN0eWxlXG5cbiAgICBzdHlsZSA9PT0gJ25vJyA/IGN1clN0eWxlID0gMiA6IG51bGxcbiAgICBzdHlsZSA9PT0gJ2xlZnQtcmlnaHQnID8gY3VyU3R5bGUgPSAxIDogbnVsbFxuICAgIHN0eWxlID09PSAnYWxsJyA/IGN1clN0eWxlID0gMCA6IG51bGxcblxuICAgIHRoaXMucm90YXRpb25TdHlsZSA9IGN1clN0eWxlXG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIF9yZWZyZXNoQ29zdHVtZSAtIFNldHMgdGhlIGNvc3R1bWUgYW5kIHNwcml0ZSB3aWR0aCBhbmQgaGlnaHQgdGhlbiByZWZyZXNoZXMgZWxlbWVudC5cbiAgKlxuICAqIEBwcml2YXRlXG4gICovXG4gIF9yZWZyZXNoQ29zdHVtZSAoKSB7XG4gICAgaWYgKHRoaXMuY29zdHVtZSkge1xuICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY29zdHVtZS52aXNpYmxlV2lkdGhcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jb3N0dW1lLnZpc2libGVIZWlnaHRcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbFxuICB9XG5cbiAgLyoqXG4gICogYWRkQ29zdHVtZSAtIEFkZHMgYSBjb3N0dW1lIHRvIHRoZSBzcHJpdGVcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5hZGRDb3N0dW1lKGNvc3R1bWUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGNvc3R1bWUgLSB0aGUgY29zdHVtZSB0byBhZGQuXG4gICovXG4gIGFkZENvc3R1bWUgKGNvc3R1bWUpIHtcbiAgICB0aGlzLmNvc3R1bWVzLnB1c2goY29zdHVtZSlcblxuICAgIC8vIGlmIFwiYmFyZVwiIHNldCB0aGUgYWRkZWQgYXMgYWN0aXZlLlxuICAgIGlmICghdGhpcy5jb3N0dW1lKSB7XG4gICAgICB0aGlzLmNvc3R1bWUgPSB0aGlzLmNvc3R1bWVzWzBdXG4gICAgICB0aGlzLndpZHRoID0gdGhpcy5jb3N0dW1lLnZpc2libGVXaWR0aFxuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvc3R1bWUudmlzaWJsZUhlaWdodFxuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hDb3N0dW1lVG8gLSBTd2l0Y2hlcyB0byBzcGVjaWZpZWQgY29zdHVtZS4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLnN3aXRjaENvc3R1bWVUbyhjb3N0dW1lKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBiYWNrZHJvcCAtIHRoZSBjb3N0dW1lIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIHN3aXRjaENvc3R1bWVUbyAoY29zdHVtZSkge1xuICAgIGNvbnN0IGN1cnJlbnRDb3N0dW1lSW5kZXggPSB0aGlzLmNvc3R1bWVzLmluZGV4T2YoY29zdHVtZSlcbiAgICBjdXJyZW50Q29zdHVtZUluZGV4ICE9PSAtMSA/IHRoaXMuY29zdHVtZSA9IHRoaXMuY29zdHVtZXNbY3VycmVudENvc3R1bWVJbmRleF0gOiBudWxsXG5cbiAgICB0aGlzLl9yZWZyZXNoQ29zdHVtZSgpXG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hDb3N0dW1lVG9OdW0gLSBTd2l0Y2hlcyB0byBzcGVjaWZpZWQgY29zdHVtZSBieSBudW1iZXIgb2YgY3VycmVudCAoMCBpcyBmaXJzdCkuIElmIG5vdCBmb3VuZCBmYWlscyBzaWxlbnRseS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5hZGRDb3N0dW1lKGNvc3R1bWUpO1xuICAqIHNwcml0ZS5zd2l0Y2hDb3N0dW1lVG9OdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgY29zdHVtZSB0byBzd2l0Y2ggdG9vLlxuICAqL1xuICBzd2l0Y2hDb3N0dW1lVG9OdW0gKGluZGV4KSB7XG4gICAgdGhpcy5zd2l0Y2hDb3N0dW1lVG8odGhpcy5jb3N0dW1lc1tpbmRleF0pXG4gIH1cblxuICAvKipcbiAgKiBuZXh0Q29zdHVtZSAtIFN3aXRjaGVzIHRvIHRoZSBuZXh0IGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUubmV4dENvc3R1bWUoKTtcbiAgKlxuICAqL1xuICBuZXh0Q29zdHVtZSAoKSB7XG4gICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZih0aGlzLmNvc3R1bWUpXG4gICAgdGhpcy5jb3N0dW1lID0gdGhpcy5jb3N0dW1lc1soY3VycmVudENvc3R1bWVJbmRleCArIDEpICUgdGhpcy5jb3N0dW1lcy5sZW5ndGhdXG5cbiAgICB0aGlzLl9yZWZyZXNoQ29zdHVtZSgpXG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVDb3N0dW1lIC0gUmVtb3ZlcyBhIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUucmVtb3ZlQ29zdHVtZShjb3N0dW1lKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb3N0dW1lIC0gdGhlIGNvc3R1bWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDb3N0dW1lIChjb3N0dW1lKSB7XG4gICAgaWYgKHRoaXMuY29zdHVtZXMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZihjb3N0dW1lKVxuICAgICAgdGhpcy5jb3N0dW1lID09PSBjb3N0dW1lID8gdGhpcy5jb3N0dW1lID0gdGhpcy5jb3N0dW1lc1soY3VycmVudENvc3R1bWVJbmRleCArIDEpICUgdGhpcy5jb3N0dW1lcy5sZW5ndGhdIDogbnVsbFxuICAgICAgdGhpcy5jb3N0dW1lcyA9IHRoaXMuY29zdHVtZXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBjb3N0dW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvc3R1bWVzID0gW11cbiAgICAgIHRoaXMuY29zdHVtZSA9IG51bGxcbiAgICB9XG4gICAgdGhpcy5fcmVmcmVzaENvc3R1bWUoKVxuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ29zdHVtZU51bSAtIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBjb3N0dW1lIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS5cbiAgKiBJZiB0aGVyZSBpcyBvbmx5IG9uZSBjb3N0dW1lLCB3aWxsIGZhaWwgYW5kIGVtaXQgYSBjb25zb2xlIG1lc3NhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUucmVtb3ZlQ29zdHVtZU51bSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBjb3N0dW1lIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQ29zdHVtZU51bSAoaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUNvc3R1bWUodGhpcy5jb3N0dW1lc1tpbmRleF0pXG4gIH1cblxuICAvKipcbiAgKiBzaG93IC0gU2hvd3MgdGhlIHNwcml0ZS4gQnkgZGVmYXVsdCBzcHJpdGVzIGFyZSBzaG93bi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaGlkZSgpO1xuICAqIHNwcml0ZS5zaG93KCk7XG4gICpcbiAgKi9cbiAgc2hvdyAoKSB7XG4gICAgdGhpcy5zaG93aW5nID0gdHJ1ZVxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiBoaWRlIC0gSGlkZXMgdGhlIHNwcml0ZS4gQnkgZGVmYXVsdCBzcHJpdGVzIGFyZSBzaG93bi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaGlkZSgpO1xuICAqXG4gICovXG4gIGhpZGUgKCkge1xuICAgIHRoaXMuc2hvd2luZyA9IGZhbHNlXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGxcbiAgfVxuXG4gIC8qKlxuICAqIHJlZnJlc2ggLSBGb3JjZXMgYSBzcHJpdGUgcmVmcmVzaC5cbiAgKiBOb3RlOiBzZXJ2aWNlIG1ldGhvZCB0byBiZSB1c2VkIGlmIGNvc3R1bWUgd2FzIG1hbmlwdWxhdGVkIGRpcmVjdGx5LlxuICAqL1xuICByZWZyZXNoICgpIHtcbiAgICBjb25zdCBtZSA9IHRoaXNcbiAgICAvLyB3YWl0IGEgc2VjLi4uXG4gICAgLy8gVE9ETzogVGhpcyBpcyB0byBhY2NvbW9kYXRlIGR5bmFtaWMgaW1hZ2UgcmVzaXplLiBOb3QgaWRlYWwuIFNob3VsZCBiZSBldmVudCBkcml2ZW4uXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBpbiBjYXNlIGNvc3R1bWUgd2FzIHJlc2l6ZWQgZm9yY2UgYSByZXNldCBvZiBzaXplLlxuICAgICAgbWUuc2V0U2l6ZShtZS5tYWduaWZpY2F0aW9uKVxuICAgICAgLy8gdGhlbiByZWZyZXNoIHRoZSBET00uXG4gICAgICBtZS5lbGVtZW50ID8gbWUuZWxlbWVudC51cGRhdGUobWUpIDogbnVsbFxuICAgIH0sIHRoaXMucGFjZSlcbiAgfVxuXG4gIC8qKlxuICAqIHJlc2l6ZVRvSW1hZ2UgLSBzZXRzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBzcHJpdGUgdG8gdGhhdCBvZiB0aGUgaW1hZ2UgZmlsZSBvZiBjdXJyZW50IGNvc3R1bWUuXG4gICogTm90ZTogc2VydmljZSBtZXRob2QuIFNpbWlsYXIgdG8gY2FsbGluZyByZXNpemVUb0ltYWdlKCkgb24gY29zdHVtZSBhbmQgdGhlbiByZWZyZXNoKCkgb24gc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBjb25zdCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZShudWxsKTtcbiAgKlxuICAqIGNvbnN0IGFuZ3J5U2hlZXAgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoe1xuICAqICAgaW1hZ2U6ICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL3RodW1iL2QvZGIvRW1vamlvbmVfMUY0MTEuc3ZnLzIwMHB4LUVtb2ppb25lXzFGNDExLnN2Zy5wbmcnLFxuICAqIH0pO1xuICAqIGFuZ3J5U2hlZXAuYWRkVG8oc3ByaXRlKTtcbiAgKlxuICAqIHNwcml0ZS5yZXNpemVUb0ltYWdlKCk7XG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKi9cbiAgcmVzaXplVG9JbWFnZSAoKSB7XG4gICAgaWYgKHRoaXMuY29zdHVtZSkge1xuICAgICAgdGhpcy5jb3N0dW1lLnJlc2l6ZVRvSW1hZ2UoKVxuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cblxuICAvKipcbiAgKiBpbm5lciAtIFBsYWNlcyBhbiBIVE1MIGVsZW1lbnQgaW5zaWRlIHRoZSBjdXJyZW50IGNvc3R1bWUgb2YgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaW5uZXIoJzxwIGNsYXNzPVwiYmlnIGNlbnRlcmVkIHJhaW5ib3dcIj46KTwvcD4nKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLmlubmVyKCdJIGxpa2UgdGV4dCBvbmx5Jyk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSB0aGUgRE9NIGVsZW1lbnQuXG4gICovXG4gIGlubmVyIChodG1sKSB7XG4gICAgdGhpcy5jb3N0dW1lLmlubmVyKGh0bWwpXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGxcbiAgfVxuXG4gIC8qKlxuICAqIGluc2VydCAtIFBsYWNlcyBhIERPTSBlbGVtZW50IGluc2lkZSB0aGUgY3VycmVudCBjb3N0dW1lIG9mIHRoZSBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmluc2VydChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXktaHRtbC1jcmVhdGlvbicpKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtIHRoZSBET00gZWxlbWVudC5cbiAgKi9cbiAgaW5zZXJ0IChlbCkge1xuICAgIHRoaXMuY29zdHVtZS5pbnNlcnQoZWwpXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGxcbiAgfVxuXG4gIC8qKlxuICAqIF9yZWZyZXNoU2l6ZSAtIFNldHMgdGhlIHNwcml0ZSB3aWR0aCBhbmQgaGlnaHQgaW4gcmVsYXRpb24gdG8gb3JpZ2luYWwgdGhlbiByZWZyZXNoZXMgZWxlbWVudC5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtvYmplY3R9IGNvc3R1bWUgLSB0aGUgY29zdHVtZSB0byBhZGQuXG4gICovXG4gIF9yZWZyZXNoU2l6ZSAoKSB7XG4gICAgLyoqXG4gICAgKiBkZWNpbWFsUm91bmQgLSByb3VuZHMgYSBudW1iZXIgdG9vIGRlY2ltYWwgcG9pbnRzLlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byByb3VuZC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBwb2ludHMgLSBob3cgbWFueSBkZWNpbWFsIHBvaW50cyB0byBsZWF2ZS5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGRlY2ltYWxSb3VuZCAodmFsdWUsIHBvaW50cykge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiAoMTAgKiogcG9pbnRzKSkgLyAoMTAgKiogcG9pbnRzKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNvc3R1bWUpIHtcbiAgICAgIHRoaXMud2lkdGggPSBkZWNpbWFsUm91bmQodGhpcy5jb3N0dW1lLndpZHRoICogKHRoaXMubWFnbmlmaWNhdGlvbiAvIDEwMCksIDIpXG4gICAgICB0aGlzLmhlaWdodCA9IGRlY2ltYWxSb3VuZCh0aGlzLmNvc3R1bWUuaGVpZ2h0ICogKHRoaXMubWFnbmlmaWNhdGlvbiAvIDEwMCksIDIpXG5cbiAgICAgIHRoaXMuY29zdHVtZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBjb3N0dW1lID0gaXRlbVxuICAgICAgICBjb3N0dW1lLnZpc2libGVXaWR0aCA9IGRlY2ltYWxSb3VuZChjb3N0dW1lLndpZHRoICogKHRoaXMubWFnbmlmaWNhdGlvbiAvIDEwMCksIDIpXG4gICAgICAgIGNvc3R1bWUudmlzaWJsZUhlaWdodCA9IGRlY2ltYWxSb3VuZChjb3N0dW1lLmhlaWdodCAqICh0aGlzLm1hZ25pZmljYXRpb24gLyAxMDApLCAyKVxuICAgICAgfSlcblxuICAgICAgdGhpcy5jb3N0dW1lLnZpc2libGVXaWR0aCA9IHRoaXMud2lkdGhcbiAgICAgIHRoaXMuY29zdHVtZS52aXNpYmxlSGVpZ2h0ID0gdGhpcy5oZWlnaHRcblxuICAgICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBjaGFuZ2VTaXplIC0gQ2hhbmdlcyB0aGUgc2l6ZSBvZiB0aGUgc3ByaXRlIGJ5IHNwZWNpZmllZCBwZXJjZW50YWdlIG51bWJlci5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuY2hhbmdlU2l6ZSg1MCk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gY2hhbmdlIC0gdGhlIHBlcmNlbnRhZ2UgY2hhbmdlLlxuICAqL1xuICBjaGFuZ2VTaXplIChjaGFuZ2UpIHtcbiAgICB0aGlzLm1hZ25pZmljYXRpb24gKz0gY2hhbmdlXG5cbiAgICB0aGlzLl9yZWZyZXNoU2l6ZSgpXG4gIH1cblxuICAvKipcbiAgKiBzZXRTaXplIC0gU2V0cyB0aGUgc2l6ZSBvZiB0aGUgc3ByaXRlIHRvIHRoZSBzcGVjaWZpZWQgcGVyY2VudGFnZSBudW1iZXIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFNpemUoMTUwKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwZXJjZW50IC0gdGhlIHBlcmNlbnRhZ2UgdG8gc2V0LlxuICAqL1xuICBzZXRTaXplIChwZXJjZW50KSB7XG4gICAgdGhpcy5tYWduaWZpY2F0aW9uID0gcGVyY2VudFxuXG4gICAgdGhpcy5fcmVmcmVzaFNpemUoKVxuICB9XG5cbiAgLyoqIFRleHQgVUkgKiAqL1xuXG4gIC8qKlxuICAqIHRoaW5rIC0gQ3JlYXRlcyBhIFwidGhpbmsgYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS50aGluaygnSSB0aGluayB0aGVyZWZvcmUgSSBhbS4nKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICovXG4gIHRoaW5rICh0ZXh0KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy50ZXh0dWkgPyB0aGlzLnRleHR1aSA9IHRoaXMudGV4dHVpLmRlbGV0ZSh0aGlzKSA6IG51bGxcbiAgICAgIHR5cGVvZiB0ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiB0ZXh0LnRvU3RyaW5nKCkgPyB0aGlzLnRleHR1aSA9IG5ldyBUZXh0VWlFbGVtZW50KHRoaXMsICd0aGluaycsIHRleHQpIDogbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHRoaW5rV2FpdCAtIENyZWF0ZXMgYSBcInRoaW5rIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZSBmb3IgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnRoaW5rV2FpdCgnSSB0aGluayB0aGVyZWZvcmUgSSBhbS4nLCAzKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHNlYyAtIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byB3YWl0LlxuICAqL1xuICB0aGlua1dhaXQgKHRleHQsIHNlYywgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50aGluaygnJylcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKVxuICAgIH0sIHNlYyAqIDEwMDApXG4gICAgdGhpcy50aGluayh0ZXh0KVxuICB9XG5cbiAgLyoqXG4gICogc2F5IC0gQ3JlYXRlcyBhIFwic3BlZWNoIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2F5KCdJdCBpcyBub3QgdGhlIGNvbnNjaW91c25lc3Mgb2YgbWVuIHRoYXQgZGV0ZXJtaW5lcyB0aGVpciBiZWluZywgYnV0LCBvbiB0aGUgY29udHJhcnksIHRoZWlyIHNvY2lhbCBiZWluZyB0aGF0IGRldGVybWluZXMgdGhlaXIgY29uc2Npb3VzbmVzcy4nKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICovXG4gIHNheSAodGV4dCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMudGV4dHVpID8gdGhpcy50ZXh0dWkgPSB0aGlzLnRleHR1aS5kZWxldGUodGhpcykgOiBudWxsXG4gICAgICB0eXBlb2YgdGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGV4dC50b1N0cmluZygpID8gdGhpcy50ZXh0dWkgPSBuZXcgVGV4dFVpRWxlbWVudCh0aGlzLCAnc2F5JywgdGV4dCkgOiBudWxsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogc2F5V2FpdCAtIENyZWF0ZXMgYSBcInNwZWVjaCBidWJibGVcIiBvdmVyIHRoZSBzcHJpdGUgZm9yIGEgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zYXlXYWl0KCdJdCBpcyBub3QgdGhlIGNvbnNjaW91c25lc3Mgb2YgbWVuIHRoYXQgZGV0ZXJtaW5lcyB0aGVpciBiZWluZywgYnV0LCBvbiB0aGUgY29udHJhcnksIHRoZWlyIHNvY2lhbCBiZWluZyB0aGF0IGRldGVybWluZXMgdGhlaXIgY29uc2Npb3VzbmVzcy4nLCAzKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHNlYyAtIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byB3YWl0LlxuICAqL1xuICBzYXlXYWl0ICh0ZXh0LCBzZWMsIHRyaWdnZXJpbmdJZCA9IG51bGwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNheSgnJylcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKVxuICAgIH0sIHNlYyAqIDEwMDApXG4gICAgdGhpcy5zYXkodGV4dClcbiAgfVxuXG4gIC8qKlxuICAqIGFzayAtIENyZWF0ZXMgYW4gXCJhc2sgYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlLlxuICAqIEFsbG93cyBmb3IgYW4gaW5wdXQgYm94IHRvIGJlIGRpc3BsYXllZCB0byB0aGUgdXNlciBhbmRcbiAgKiBjYXB0dXJlIHVzZXIgaW5wdXQgaW50byB0aGUgdmFyaWFibGUgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyLlxuICAqIE5vdGUgLSB2YXJpYWJsZSBmb3IgYW5zd2VyIG11c3QgYmUgZGVjbGFyZWQgaW4gZ2xvYmFsIHNjb3BlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAvL2dvb2Q6XG4gICogbGV0IGFuc3dlcjtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgYW5zd2VyID0gdGhpcy5hc2soJ0lzIHRoZSBkZXN0aW55IG9mIG1hbmtpbmQgZGVjaWRlZCBieSBtYXRlcmlhbCBjb21wdXRhdGlvbj8nKTtcbiAgKiAgIHRoaXMuc2F5KGFuc3dlcik7XG4gICogfSk7XG4gICpcbiAgKiAvLyBiYWQ6XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIGxldCBhbnN3ZXI7XG4gICogICBhbnN3ZXIgPSB0aGlzLmFzaygnSXMgdGhlIGRlc3Rpbnkgb2YgbWFua2luZCBkZWNpZGVkIGJ5IG1hdGVyaWFsIGNvbXB1dGF0aW9uPycpO1xuICAqICAgdGhpcy5zYXkoYW5zd2VyKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgb2YgdGhlIHF1ZXN0aW9uXG4gICpcbiAgKi9cbiAgYXNrICh0ZXh0LCB0aGVWYXIgPSBudWxsLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzXG4gICAgbWUuYXNrSWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKVxuXG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy50ZXh0dWkgPyB0aGlzLnRleHR1aSA9IHRoaXMudGV4dHVpLmRlbGV0ZSh0aGlzKSA6IG51bGxcbiAgICAgIHR5cGVvZiB0ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiB0ZXh0LnRvU3RyaW5nKCkgPyB0aGlzLnRleHR1aSA9IG5ldyBUZXh0VWlFbGVtZW50KG1lLCAnYXNrJywgdGV4dCkgOiBudWxsXG5cbiAgICAgIC8vIHRoaXMgd2lsbCB3YWl0IGZvciB1c2VyIGlucHV0XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBibG9ja0xpa2UuYXNrLiR7dGhpcy5pZH0uJHttZS5hc2tJZH1gLCBmdW5jdGlvbiBhc2tMaXN0ZW5lciAoZSkge1xuICAgICAgICAvLyByZW1vdmUgaXQuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYGJsb2NrTGlrZS5hc2suJHttZS5pZH0uJHttZS5hc2tJZH1gLCBhc2tMaXN0ZW5lcilcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgd2FpdGVkIG1ldGhvZCBsaXN0ZW5lci4gcmVsZWFzZSBpdC5cbiAgICAgICAgbWUuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKVxuICAgICAgICAvLyBzZXQgdGhlIHVzZXIgZGVmaW5lZCB2YXJpYWJsZSB0byB0aGUgY2FwdHVyZWQgdmFsdWUuXG4gICAgICAgIHRoZVZhciA/IG1lLl9zZXRUb1Zhcih0aGVWYXIsIGUuZGV0YWlsLnZhbHVlKSA6IG51bGxcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBVSS5cbiAgICAgICAgbWUudGV4dHVpID8gbWUudGV4dHVpID0gbWUudGV4dHVpLmRlbGV0ZShtZSkgOiBudWxsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKiBQZW4gKiAqL1xuXG4gIC8qKlxuICAqIHBlbkNsZWFyIC0gQ2xlYXJzIHRoZSBkcmF3aW5nIHN1cmZhY2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGVuQ2xlYXIoKTtcbiAgKiB9KTtcbiAgKlxuICAqL1xuICBwZW5DbGVhciAoKSB7XG4gICAgdGhpcy5zdXJmYWNlLmNsZWFyKHRoaXMpXG4gIH1cblxuICAvKipcbiAgKiBwZW5Eb3duIC0gXCJBY3RpdmF0ZXNcIiBkcmF3aW5nIGJ5IHNldHRpbmcgcmVxdWlyZWQgdmFsdWVzLlxuICAqIFdoZW4gYWN0aXZhdGVkIHNwcml0ZSBtb3Rpb24gd2lsbCBjcmVhdGUgdGhlIGRyYXdpbmcgb24gdGhlIHN0YWdlJ3MgY2FudmFzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBlbkRvd24oKTtcbiAgKiAgIHRoaXMubW92ZSgxMDApO1xuICAqIH0pO1xuICAqXG4gICovXG4gIHBlbkRvd24gKCkge1xuICAgIHRoaXMuZHJhd2luZyA9IHRydWVcbiAgICB0aGlzLnByZXZYID0gdGhpcy54XG4gICAgdGhpcy5wcmV2WSA9IHRoaXMueVxuICAgIHRoaXMuc3VyZmFjZS5kcmF3KHRoaXMpXG4gIH1cblxuICAvKipcbiAgKiBwZW5VcCAtIFwiRGVhY3RpdmF0ZXNcIiBkcmF3aW5nIGJ5IHNldHRpbmcgcmVxdWlyZWQgdmFsdWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBlbkRvd24oKTtcbiAgKiAgIHRoaXMubW92ZSgxMDApO1xuICAqICAgdGhpcy5wZW5VcCgpO1xuICAqIH0pO1xuICAqXG4gICovXG4gIHBlblVwICgpIHtcbiAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZVxuICAgIHRoaXMuc3VyZmFjZS5kcmF3KHRoaXMpXG4gIH1cblxuICAvKipcbiAgKiBzZXRQZW5Db2xvciAtIFNldHMgdGhlIGNvbG9yIG9mIHRoZSBwZW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFBlbkNvbG9yKCcjZmYwMDAwJylcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLnNldFBlbkNvbG9yKCdyZWQnKVxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yU3RyaW5nIC0gYSB2YWxpZCBjb2xvciBkZWZpbml0aW9uIGZvciBjYW52YXMgc3Ryb2tlU3R5bGUuXG4gICovXG4gIHNldFBlbkNvbG9yIChjb2xvclN0cmluZykge1xuICAgIHRoaXMucGVuQ29sb3IgPSBjb2xvclN0cmluZ1xuICB9XG5cbiAgLyoqXG4gICogc2V0UGVuU2l6ZSAtIFNldHMgdGhlIHNpemUgb2YgdGhlIHBlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2V0UGVuU2l6ZSgxMCk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzIC0gYSBudW1iZXIgZm9yIGNhbnZhcyBsaW5lV2lkdGguXG4gICovXG4gIHNldFBlblNpemUgKHBpeGVscykge1xuICAgIHRoaXMucGVuU2l6ZSA9IHBpeGVsc1xuICB9XG5cbiAgLyoqXG4gICogY2hhbmdlUGVuU2l6ZSAtIENoYW5nZXMgdGhlIHNpemUgb2YgdGhlIHBlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5jaGFuZ2VQZW5TaXplKDEwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFuZ2UgLSB0aGUgY2hhbmdlIGluIHBpeGVscy5cbiAgKi9cbiAgY2hhbmdlUGVuU2l6ZSAoY2hhbmdlKSB7XG4gICAgdGhpcy5wZW5TaXplICs9IGNoYW5nZVxuICB9XG5cbiAgLyogU2Vuc2luZyAqL1xuXG4gIC8qKlxuICAqIGRpc3RhbmNlVG8gLSBSZXR1cm5zIHRoZSBkaXN0YW5jZSB0byBhIHBvaW50IG9uIHRoZSBzY3JlZW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2Uoe3NlbnNpbmc6IHRydWV9KTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICpcbiAgKiBzdGFnZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHNwcml0ZS5zYXkodGhpcy5kaXN0YW5jZVRvKHRoaXMubW91c2VYLCB0aGlzLm1vdXNlWSkpXG4gICogfSk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5vdGhlclNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICpcbiAgKiBzdGFnZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHNwcml0ZS5zYXkodGhpcy5kaXN0YW5jZVRvKG90aGVyU3ByaXRlLngsIG90aGVyU3ByaXRlLnkpKVxuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gZGlzdGFuY2UgaW4gcGl4ZWxzIHRvIHBvc2l0aW9uIG9uIHNjcmVlbiAobm90IHJvdW5kZWQpLlxuICAqL1xuICBkaXN0YW5jZVRvICh4LCB5KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLnggLSB4XG4gICAgY29uc3QgZHkgPSB0aGlzLnkgLSB5XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KChkeCAqIGR4KSArIChkeSAqIGR5KSlcbiAgfVxuXG4gIC8qKlxuICAqIHRvdWNoaW5nRWRnZSAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIHRoZSBlZGdlIG9mIHRoZSBzdGFnZSBhbmQgcmV0dXJucyB0aGUgZWRnZSB0b3VjaGVkLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICB3aGlsZSh0aGlzLnggPCBzdGFnZS53aWR0aCAvIDIpIHtcbiAgKiAgICB0aGlzLm1vdmUoMTApXG4gICogICAgdGhpcy5zYXkodGhpcy50b3VjaGluZ0VkZ2UoKSk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHNpZGUgb2YgdGhlIHN0YWdlIHRoYXQgaXMgdG91Y2hlZCAobnVsbCwgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0KVxuICAqL1xuICB0b3VjaGluZ0VkZ2UgKCkge1xuICAgIGxldCByZXN1bHQgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMueCkgKyAodGhpcy53aWR0aCAvIDIpID4gdGhpcy5zdGFnZVdpZHRoIC8gMikge1xuICAgICAgcmVzdWx0ID0gJ3JpZ2h0J1xuICAgIH1cbiAgICBpZiAoKHRoaXMueCkgLSAodGhpcy53aWR0aCAvIDIpIDwgLTEgKiAodGhpcy5zdGFnZVdpZHRoIC8gMikpIHtcbiAgICAgIHJlc3VsdCA9ICdsZWZ0J1xuICAgIH1cbiAgICBpZiAoKHRoaXMueSkgKyAodGhpcy5oZWlnaHQgLyAyKSA+IHRoaXMuc3RhZ2VIZWlnaHQgLyAyKSB7XG4gICAgICByZXN1bHQgPSAndG9wJ1xuICAgIH1cbiAgICBpZiAoKHRoaXMueSkgLSAodGhpcy5oZWlnaHQgLyAyKSA8IC0xICogKHRoaXMuc3RhZ2VIZWlnaHQgLyAyKSkge1xuICAgICAgcmVzdWx0ID0gJ2JvdHRvbSdcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvKipcbiAgKiBpc1RvdWNoaW5nRWRnZSAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIHRoZSBlZGdlLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICB3aGlsZSh0aGlzLnggPCBzdGFnZS53aWR0aCAvIDIpIHtcbiAgKiAgICB0aGlzLm1vdmUoMTApXG4gICogICAgdGhpcy5zYXkodGhpcy5pc1RvdWNoaW5nRWRnZSgpKTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIHNwcml0ZSB0b3VjaGluZyB0aGUgZWRnZS5cbiAgKi9cbiAgaXNUb3VjaGluZ0VkZ2UgKCkge1xuICAgIHJldHVybiAhIXRoaXMudG91Y2hpbmdFZGdlKClcbiAgfVxuXG4gIC8qKlxuICAqIHRvdWNoaW5nIC0gQ2hlY2tzIGlzIHRoaXMgc3ByaXRlIHRvdWNoZXMgYW5vdGhlciBhbmQgcmV0dXJucyBhdCB3aGF0IHNpZGUgaXQgdG91Y2hlcy5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKiAyLiBpZiB0aGUgc3ByaXRlIGhhcyBnb25lIFwiaW50b1wiIHRoZSBvdGhlciB0aGUgc2lkZSBcInBlbmV0cmF0ZWQgbW9yZVwiIHdpbGwgYmUgcmV0dXJuZWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUubW92ZSgyMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHdoaWxlKCF0aGlzLnRvdWNoaW5nKG90aGVyU3ByaXRlKSkge1xuICAqICAgIHRoaXMubW92ZSgxMCk7XG4gICogICAgdGhpcy5zYXkodGhpcy50b3VjaGluZyhvdGhlclNwcml0ZSkpXG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBjaGVjayBpZiB0b3VjaGluZy5cbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHNpZGUgb2YgdGhlIHNwcml0ZSB0aGF0IGlzIHRvdWNoZWQgKG51bGwsIHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodClcbiAgKi9cbiAgdG91Y2hpbmcgKHNwcml0ZSkge1xuICAgIGxldCByZXN1bHQgPSBudWxsXG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnggKyAodGhpcy53aWR0aCAvIDIpID4gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMikgJiZcbiAgICAgIHRoaXMueCAtICh0aGlzLndpZHRoIC8gMikgPCBzcHJpdGUueCArIChzcHJpdGUud2lkdGggLyAyKSAmJlxuICAgICAgdGhpcy55ICsgKHRoaXMuaGVpZ2h0IC8gMikgPiBzcHJpdGUueSAtIChzcHJpdGUuaGVpZ2h0IC8gMikgJiZcbiAgICAgIHRoaXMueSAtICh0aGlzLmhlaWdodCAvIDIpIDwgc3ByaXRlLnkgKyAoc3ByaXRlLmhlaWdodCAvIDIpXG4gICAgKSB7XG4gICAgICB0aGlzLnggPj0gc3ByaXRlLnggPyByZXN1bHQgPSAnbGVmdCcgOiBudWxsXG4gICAgICB0aGlzLnggPCBzcHJpdGUueCA/IHJlc3VsdCA9ICdyaWdodCcgOiBudWxsXG4gICAgICB0aGlzLnkgPiBzcHJpdGUueSAmJiBNYXRoLmFicyh0aGlzLnkgLSBzcHJpdGUueSkgPiBNYXRoLmFicyh0aGlzLnggLSBzcHJpdGUueCkgPyByZXN1bHQgPSAnYm90dG9tJyA6IG51bGxcbiAgICAgIHRoaXMueSA8IHNwcml0ZS55ICYmIE1hdGguYWJzKHRoaXMueSAtIHNwcml0ZS55KSA+IE1hdGguYWJzKHRoaXMueCAtIHNwcml0ZS54KSA/IHJlc3VsdCA9ICd0b3AnIDogbnVsbFxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAqIGlzVG91Y2hpbmcgLSBDaGVja3MgaXMgdGhpcyBzcHJpdGUgdG91Y2hlcyBhbm90aGVyLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IG90aGVyU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLm1vdmUoMjAwKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICB3aGlsZSghdGhpcy5pc1RvdWNoaW5nKG90aGVyU3ByaXRlKSkge1xuICAqICAgIHRoaXMubW92ZSgxMCk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBjaGVjayBpZiB0b3VjaGluZy5cbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHRoZSBzcHJpdGUgdG91Y2hpbmcgdGhlIHNwZWNpZmllZCBzcHJpdGUuXG4gICovXG4gIGlzVG91Y2hpbmcgKHNwcml0ZSkge1xuICAgIHJldHVybiAhIXRoaXMudG91Y2hpbmcoc3ByaXRlKVxuICB9XG5cbiAgLyoqXG4gICogdG91Y2hpbmdCYWNrZHJvcENvbG9yIC0gUmV0dXJucyB0aGUgaGV4IHZhbHVlIHRvIGFsbCBwaXhlbHMgaW4gYmFja2Ryb3AgYXJlYSBjb3ZlcmVkIGJ5IHRoZSBzcHJpdGUgcmVjdGFuZ2xlLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIFRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKiAzLiBUaGUgYmFja2Ryb3AgaW1hZ2UgbXVzdCBiZSBhIGxvY2FsIGltYWdlIHNlcnZlZCBmcm9tIHNhbWUgb3JpZ2luLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB3aGlsZSh0cnVlKXtcbiAgKiAgICAgbGV0IHRvdWNoZWRDb2xvcnMgPSB0aGlzLnRvdWNoaW5nQmFja2Ryb3BDb2xvcigpO1xuICAqICAgICB0aGlzLnNheSh0b3VjaGVkQ29sb3JzKTtcbiAgKiAgICAgdGhpcy5tb3ZlKDUpO1xuICAqICAgfVxuICAqIH0pO1xuICAqXG4gICogQHJldHVybiB7YXJyYXl9IC0gY29sb3JzIChzdHJpbmdzKSB0b3VjaGVkLlxuICAqL1xuICB0b3VjaGluZ0JhY2tkcm9wQ29sb3IgKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdXG5cbiAgICAvKipcbiAgICAqIHJnYlRvSGV4IC0gY29udmVydHMgYSBjb2xvciBkZWZpbmVkIGJ5IFJHQiB2YWx1ZXMgaW50byBhIG9uIGRlZmluZWQgYXMgYSBoZXggc3RyaW5nLlxuICAgICpcbiAgICAqIEZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MjM4MzgvcmdiLXRvLWhleC1hbmQtaGV4LXRvLXJnYlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSByIC0gdGhlIHJlZCB2YWx1ZSAoMCB0byAyNTUpLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGcgLSB0aGUgZ3JlZW4gdmFsdWUgKDAgdG8gMjU1KS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBiIC0gIHRoZSBibHVlIHZhbHVlICgwIHRvIDI1NSkuXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gaGV4IGNvbG9yIHN0cmluZy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJnYlRvSGV4IChyLCBnLCBiKSB7XG4gICAgICByZXR1cm4gYCMkeygoMSA8PCAyNCkgKyAociA8PCAxNikgKyAoZyA8PCA4KSArIGIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKX1gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYml0d2lzZVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBiYWNrZHJvcENvbnRleHQgPSB0aGlzLmFnYWluc3RCYWNrZHJvcC5nZXRDb250ZXh0KCcyZCcpXG4gICAgICBjb25zdCBkYXRhID0gYmFja2Ryb3BDb250ZXh0LmdldEltYWdlRGF0YSgoKHRoaXMuc3RhZ2VXaWR0aCAvIDIpIC0gKHRoaXMud2lkdGggLyAyKSkgKyB0aGlzLngsICgodGhpcy5zdGFnZUhlaWdodCAvIDIpIC0gKHRoaXMuaGVpZ2h0IC8gMikpIC0gdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkuZGF0YVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgZGF0YVtpICsgM10gIT09IDAgPyByZXN1bHQucHVzaChyZ2JUb0hleChkYXRhW2ldLCBkYXRhW2kgKyAxXSwgZGF0YVtpICsgMl0pKSA6IG51bGxcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnQmxvY2tMaWtlLmpzIE5vdGljZTogaXNUb3VjaGluZ0JhY2tkcm9wQ29sb3IoKSBpbmdub3JlZC4gQmFja2Ryb3AgaW1hZ2UgY2FuIG5vdCBiZSBsb2NhdGVkIGF0IGEgcmVtb3RlIG9yaWdpbi4nKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KHJlc3VsdCkpXG4gIH1cblxuICAvKipcbiAgKiBpc1RvdWNoaW5nQmFja2Ryb3BDb2xvciAtIGNvbXBhcmVzIGEgZ2l2ZW4gaGV4IHZhbHVlIHRvIGFsbCBwaXhlbHMgaW4gYmFja2Ryb3AgYXJlYSBjb3ZlcmVkIGJ5IHRoZSBzcHJpdGUgcmVjdGFuZ2xlLlxuICAqIElmIGEgbWF0Y2ggaXMgZm91bmQgdGhlIGNvbG9yIGlzIHJldHVybmVkLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIFRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKiAzLiBUaGUgYmFja2Ryb3AgaW1hZ2UgbXVzdCBiZSBhIGxvY2FsIGltYWdlIHNlcnZlZCBmcm9tIHNhbWUgb3JpZ2luLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIGxldCBtb3ZpbmcgPSB0cnVlO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB3aGlsZShtb3Zpbmcpe1xuICAqICAgICB0aGlzLmlzVG91Y2hpbmdCYWNrZHJvcENvbG9yKCcjZmYwMDAwJykgPyBtb3ZpbmcgPSBmYWxzZSA6IG1vdmluZyA9IHRydWU7XG4gICogICAgIHRoaXMubW92ZSg1KTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBiYWNrZHJvcENvbG9yIC0gdGhlIGNvbG9yIHRvIGV2YWx1YXRlLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gZG9lcyB0aGUgc3ByaXRlIHRvdWNoIHRoZSBjb2xvci5cbiAgKi9cbiAgaXNUb3VjaGluZ0JhY2tkcm9wQ29sb3IgKGJhY2tkcm9wQ29sb3IpIHtcbiAgICBjb25zdCBoZXhBcnIgPSB0aGlzLnRvdWNoaW5nQmFja2Ryb3BDb2xvcihiYWNrZHJvcENvbG9yKVxuXG4gICAgcmV0dXJuIGhleEFyci5pbmNsdWRlcyhiYWNrZHJvcENvbG9yKVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9lbGVtZW50LWNzcydcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFVJIEVsZW1lbnQgb2YgdGhlIHN0YWdlLlxuICogRWFjaCBTdGFnZSBoYXMgb25lLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VFbGVtZW50IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3RhZ2UgRWxlbWVudC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gdGhlIHN0YWdlIGZvciB3aGljaCB0aGUgZWxlbWVudCBpcyBjcmVhdGVkLlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSBjcmVhdGVkLlxuICAqL1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucywgc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAvKipcbiAgICAqIGNyZWF0ZURpdiAtIGNyZWF0ZXMgYSBkaXYgYXQgc3BlY2lmaWVkIHpJbmRleC5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gekluZGV4IC0gZGVzaXJlZCBwbGFjZSBpbiBcInN0YWNrXCJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBhIHN0YWdlIHdpZGUvaGlnaCBET00gZWxlbWVudC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZURpdiAoekluZGV4KSB7XG4gICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgICBzZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YFxuICAgICAgc2VsLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fXB4YFxuICAgICAgc2VsLnN0eWxlLnpJbmRleCA9IHpJbmRleFxuICAgICAgc2VsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgc2VsLnN0eWxlLnRvdWNoQWN0aW9uID0gJ21hbmlwdWxhdGlvbidcblxuICAgICAgcmV0dXJuIHNlbFxuICAgIH1cblxuICAgIC8qKlxuICAgICogY3JlYXRlQ2FudmFzIC0gY3JlYXRlcyBhIGNhbnZhcyBhdCBzcGVjaWZpZWQgekluZGV4LlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB6SW5kZXggLSBkZXNpcmVkIHBsYWNlIGluIFwic3RhY2tcIlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIGEgc3RhZ2Ugd2lkZS9oaWdoIERPTSBlbGVtZW50LlxuICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2FudmFzICh6SW5kZXgpIHtcbiAgICAgIGNvbnN0IGNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cbiAgICAgIGNlbC53aWR0aCA9IG9wdGlvbnMud2lkdGhcbiAgICAgIGNlbC5oZWlnaHQgPSBvcHRpb25zLmhlaWdodFxuICAgICAgY2VsLnN0eWxlLnpJbmRleCA9IHpJbmRleFxuICAgICAgY2VsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgY2VsLnN0eWxlLmxlZnQgPSAnMHB4J1xuICAgICAgY2VsLnN0eWxlLnRvcCA9ICcwcHgnXG5cbiAgICAgIHJldHVybiBjZWxcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIGNyZWF0ZUZsYWcgLSBjcmVhdGVzIGEgXCJmbGFnXCIgZGl2LlxuICAgICpcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBhIHN0YWdlIHdpZGUvaGlnaCBET00gZWxlbWVudCB3aXRoIGZsYWcgYXQgY2VudGVycy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUZsYWcgKCkge1xuICAgICAgY29uc3QgZmxhZ1NpemUgPSAxMzBcbiAgICAgIGNvbnN0IGZlbCA9IGNyZWF0ZURpdigtMSlcblxuICAgICAgY29uc3QgZmVsaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB4IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICAgIGNvbnN0IHggPSAtKGZsYWdTaXplIC8gMilcbiAgICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB5IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICAgIGNvbnN0IHkgPSAtKGZsYWdTaXplIC8gMilcblxuICAgICAgLy8gbG9va3NcbiAgICAgIGZlbGl0ZW0uc3R5bGUud2lkdGggPSBgJHtmbGFnU2l6ZX1weGBcbiAgICAgIGZlbGl0ZW0uc3R5bGUuaGVpZ2h0ID0gYCR7ZmxhZ1NpemV9cHhgXG4gICAgICBmZWxpdGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgZmVsaXRlbS5pbm5lckhUTUwgPSAnJiM5ODczOydcblxuICAgICAgZmVsaXRlbS5zdHlsZS5sZWZ0ID0gYCR7KG9wdGlvbnMud2lkdGggLyAyKSArIHh9cHhgXG4gICAgICBmZWxpdGVtLnN0eWxlLnRvcCA9IGAkeyhvcHRpb25zLmhlaWdodCAvIDIpICsgeX1weGBcbiAgICAgIGZlbGl0ZW0uY2xhc3NOYW1lID0gJ2Jsb2NrbGlrZS1mbGFnJ1xuXG4gICAgICBmZWwuYXBwZW5kQ2hpbGQoZmVsaXRlbSlcbiAgICAgIGZlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICAgIHJldHVybiBmZWxcbiAgICB9XG5cbiAgICBlbC5pZCA9IGAke3N0YWdlLmlkfWBcblxuICAgIGVsLnN0eWxlLndpZHRoID0gYCR7b3B0aW9ucy53aWR0aH1weGBcbiAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtvcHRpb25zLmhlaWdodH1weGBcblxuICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgIGVsLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94J1xuICAgIGVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcblxuICAgIG9wdGlvbnMucGFyZW50LmFwcGVuZENoaWxkKGVsKVxuXG4gICAgdGhpcy5iYWNrZHJvcENvbnRhaW5lciA9IGNyZWF0ZUNhbnZhcygwKVxuICAgIHRoaXMuYmFja2Ryb3BDb250YWluZXIuaWQgPSBgJHtzdGFnZS5pZH0tYmFja2Ryb3BgXG4gICAgdGhpcy5iYWNrZHJvcENvbnRhaW5lci5jbGFzc05hbWUgPSAnYmxvY2tsaWtlLXBhbmVsLWJhY2tkcm9wJ1xuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuYmFja2Ryb3BDb250YWluZXIpXG5cbiAgICB0aGlzLmNhbnZhcyA9IGNyZWF0ZUNhbnZhcygwKVxuICAgIHRoaXMuY2FudmFzLmlkID0gYCR7c3RhZ2UuaWR9LXN1cmZhY2VgXG4gICAgdGhpcy5jYW52YXMuY2xhc3NOYW1lID0gJ2Jsb2NrbGlrZS1wYW5lbC1zdXJmYWNlJ1xuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKVxuXG4gICAgdGhpcy5mbGFnID0gY3JlYXRlRmxhZygpXG4gICAgdGhpcy5mbGFnLmlkID0gYCR7c3RhZ2UuaWR9LWZsYWdgXG4gICAgdGhpcy5mbGFnLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtcGFuZWwtZmxhZydcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmZsYWcpXG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG5cbiAgICB0aGlzLmVsID0gZWxcbiAgfVxuXG4gIC8qKlxuICAqIHVwZGF0ZSAtIHVwZGF0ZXMgdGhlIERPTSBlbGVtZW50LlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIHRvIHVwZGF0ZS5cbiAgKi9cbiAgdXBkYXRlIChzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5lbFxuICAgIGNvbnN0IGJhY2tkcm9wQ29udGV4dCA9IHN0YWdlLmVsZW1lbnQuYmFja2Ryb3BDb250YWluZXIuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgbGV0IG1hcmdpblRCID0gMFxuICAgIGlmIChzdGFnZS5lbGVtZW50LmVsLnBhcmVudEVsZW1lbnQudGFnTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICBtYXJnaW5UQiA9IE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lckhlaWdodCAtIHN0YWdlLmhlaWdodCkgLyAyKVxuICAgICAgbWFyZ2luVEIgPCAwID8gbWFyZ2luVEIgPSAwIDogbnVsbFxuICAgIH1cblxuICAgIC8vIElmIGNvbG9yIC0gZmlsbCB0aGUgY2FudmFzIHdpdGggdGhlIGNvbG9yIHNldCwgb3IgY2xlYXIgaXRcbiAgICBpZiAoc3RhZ2UuYmFja2Ryb3AgJiYgc3RhZ2UuYmFja2Ryb3AuY29sb3IpIHtcbiAgICAgIGJhY2tkcm9wQ29udGV4dC5yZWN0KDAsIDAsIHN0YWdlLndpZHRoLCBzdGFnZS5oZWlnaHQpXG4gICAgICBiYWNrZHJvcENvbnRleHQuZmlsbFN0eWxlID0gc3RhZ2UuYmFja2Ryb3AuY29sb3JcbiAgICAgIGJhY2tkcm9wQ29udGV4dC5maWxsKClcbiAgICB9IGVsc2Uge1xuICAgICAgYmFja2Ryb3BDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBzdGFnZS53aWR0aCwgc3RhZ2UuaGVpZ2h0KVxuICAgIH1cblxuICAgIC8vIElmIGltYWdlIC0gZHJhdyB0aGUgaW1hZ2Ugb24gY2FudmFzXG4gICAgaWYgKHN0YWdlLmJhY2tkcm9wICYmIHN0YWdlLmJhY2tkcm9wLmltYWdlKSB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgYmFja2Ryb3BDb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDAsIHN0YWdlLndpZHRoLCBzdGFnZS5oZWlnaHQpXG4gICAgICB9XG4gICAgICBpbWcuc3JjID0gc3RhZ2UuYmFja2Ryb3AuaW1hZ2VcbiAgICB9XG5cbiAgICAvLyB6b29tIGFuZCBwbGFjZW1lbnRcbiAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzdGFnZS5tYWduaWZpY2F0aW9uIC8gMTAwfSlgXG4gICAgZWwuc3R5bGUubWFyZ2luID0gYCR7bWFyZ2luVEJ9cHggYXV0b2BcblxuICAgIC8vIGNzcyBydWxlc1xuICAgIGNzcy5hcHBseShzdGFnZSlcblxuICAgIC8vIGNzcyBjbGFzc2VzXG4gICAgc3RhZ2UuYmFja2Ryb3AgPyBlbC5jbGFzc05hbWUgPSBzdGFnZS5iYWNrZHJvcC5jbGFzc2VzLmNvbmNhdChzdGFnZS5jbGFzc2VzKS5qb2luKCcgJykgOiBlbC5jbGFzc05hbWUgPSBzdGFnZS5jbGFzc2VzLmpvaW4oJyAnKVxuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnRcbiAgKi9cbiAgZGVsZXRlIChzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5lbFxuXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbClcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLyoqXG4gICogYWRkRmxhZyAtIHB1dHMgdGhlIGZsYWcgZGl2IGluZnJvbnQgb2YgZXZlcnl0aGluZyAoc2hvd3MgaXQpXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICBhZGRGbGFnIChzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5mbGFnXG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSAxMDAwXG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBhdCB0aGUgYmFjayAoaGlkZXMgaXQpXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICByZW1vdmVGbGFnIChzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5mbGFnXG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSAtMVxuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxufVxuIiwiLyoqXG4qIEVuY2Fwc3VsYXRlcyB0aGUgc3RhZ2Ugc2Vuc2luZyBmdW5jdGlvbmFsaXR5LlxuKi9cblxuLyoqXG4qIGVuYWJsZSAtIEVuYWJsZXMgc2Vuc2luZyBvZiBkb2N1bWVudCBsZXZlbCBldmVudHMgKGtleWRvd24sIG1vdXNlbW92ZSwgbW91c2Vkb3duLCB0b3VjaG1vdmUpXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5hYmxlIChzdGFnZSkge1xuICBjb25zdCBtZSA9IHN0YWdlXG4gIG1lLnNlbnNpbmcgPSB0cnVlXG5cbiAgLyoqXG4gICogZGVjaW1hbFJvdW5kIC0gcm91bmRzIGEgbnVtYmVyIHRvbyBkZWNpbWFsIHBvaW50cy5cbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byByb3VuZC5cbiAgKiBAcGFyYW0ge251bWJlcn0gcG9pbnRzIC0gaG93IG1hbnkgZGVjaW1hbCBwb2ludHMgdG8gbGVhdmUuXG4gICovXG4gIGZ1bmN0aW9uIGRlY2ltYWxSb3VuZCAodmFsdWUsIHBvaW50cykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogKDEwICoqIHBvaW50cykpIC8gKDEwICoqIHBvaW50cylcbiAgfVxuXG4gIC8qKlxuICAqIGNvbXB1dGVYIC0gQ29tcHV0ZXMgY2VudGVyZWQgeCBiYXNlZCBvbiB4IGV4dHJhY3RlZCBmcm9tIGV2ZW50LlxuICAqL1xuICBmdW5jdGlvbiBjb21wdXRlWCAoeCkge1xuICAgIGNvbnN0IG1hZyA9IG1lLm1hZ25pZmljYXRpb24gLyAxMDBcbiAgICByZXR1cm4gZGVjaW1hbFJvdW5kKCh4IC0gKG1lLmVsZW1lbnQuZWwub2Zmc2V0TGVmdCkgLSAobWUud2lkdGggLyAyKSkgLyBtYWcsIDIpXG4gIH1cblxuICAvKipcbiAgKiBjb21wdXRlWSAtIENvbXB1dGVzIGNlbnRlcmVkIHkgYmFzZWQgb24geSBleHRyYWN0ZWQgZnJvbSBldmVudC5cbiAgKi9cbiAgZnVuY3Rpb24gY29tcHV0ZVkgKHkpIHtcbiAgICBjb25zdCBtYWcgPSBtZS5tYWduaWZpY2F0aW9uIC8gMTAwXG4gICAgcmV0dXJuIGRlY2ltYWxSb3VuZCgoLXkgKyBtZS5lbGVtZW50LmVsLm9mZnNldFRvcCArIChtZS5oZWlnaHQgLyAyKSkgLyBtYWcsIDIpXG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICBlLmtleSAmJiBtZS5rZXlzS2V5LmluZGV4T2YoZS5rZXkudG9Mb3dlckNhc2UoKSkgPT09IC0xID8gbWUua2V5c0tleS5wdXNoKGUua2V5LnRvTG93ZXJDYXNlKCkpIDogbnVsbFxuICAgIGUuY29kZSAmJiBtZS5rZXlzQ29kZS5pbmRleE9mKGUuY29kZS50b0xvd2VyQ2FzZSgpKSA9PT0gLTEgPyBtZS5rZXlzQ29kZS5wdXNoKGUuY29kZS50b0xvd2VyQ2FzZSgpKSA6IG51bGxcbiAgICBtZS5rZXlzS2V5Q29kZS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xID8gbWUua2V5c0tleUNvZGUucHVzaChlLmtleUNvZGUpIDogbnVsbFxuICB9KVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICBlLmtleSA/IG1lLmtleXNLZXkgPSBtZS5rZXlzS2V5LmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gZS5rZXkudG9Mb3dlckNhc2UoKSkgOiBudWxsXG4gICAgZS5jb2RlID8gbWUua2V5c0NvZGUgPSBtZS5rZXlzQ29kZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGUuY29kZS50b0xvd2VyQ2FzZSgpKSA6IG51bGxcbiAgICBtZS5rZXlzS2V5Q29kZSA9IG1lLmtleXNLZXlDb2RlLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gZS5rZXlDb2RlKVxuICB9KVxuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICBtZS5tb3VzZVggPSBjb21wdXRlWChlLmNsaWVudFgpXG4gICAgbWUubW91c2VZID0gY29tcHV0ZVkoZS5jbGllbnRZKVxuICB9KVxuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcbiAgICBtZS5tb3VzZVggPSBjb21wdXRlWChlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgpXG4gICAgbWUubW91c2VZID0gY29tcHV0ZVkoZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZKVxuICB9LCB7IHBhc3NpdmU6IHRydWUgfSlcblxuICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICBtZS5tb3VzZURvd24gPSB0cnVlXG4gIH0pXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICBtZS5tb3VzZURvd24gPSBmYWxzZVxuICB9KVxuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG4gICAgbWUubW91c2VYID0gY29tcHV0ZVgoZS50b3VjaGVzWzBdLmNsaWVudFgpXG4gICAgbWUubW91c2VZID0gY29tcHV0ZVkoZS50b3VjaGVzWzBdLmNsaWVudFkpXG4gICAgbWUubW91c2VEb3duID0gdHJ1ZVxuICB9LCB7IHBhc3NpdmU6IHRydWUgfSlcblxuICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKCkgPT4ge1xuICAgIG1lLm1vdXNlRG93biA9IGZhbHNlXG4gICAgbWUubW91c2VYID0gbnVsbFxuICAgIG1lLm1vdXNlWSA9IG51bGxcbiAgfSlcbn1cbiIsIi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBzdGFnZSBzdXJmYWNlIG9uIHdoaWNoIHNwcml0ZXMgZHJhdy5cbiAqIEVhY2ggU3RhZ2UgaGFzIG9uZS5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlU3VyZmFjZSB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIFN0YWdlLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIG9uIHdoaWNoIHRoZSBzcHJpdGUgaXMgZHJhd2luZy5cbiAgKi9cbiAgY29uc3RydWN0b3IgKHN0YWdlKSB7XG4gICAgdGhpcy5jb250ZXh0ID0gc3RhZ2UuZWxlbWVudC5jb250ZXh0XG4gIH1cblxuICAvKipcbiAgKiBkcmF3IC0gZHJhd3MgYSBsaW5lIFwiYmVoaW5kXCIgYSBtb3Zpbmcgc3ByaXRlLlxuICAqIE5vdGU6IHNwcml0ZSBhbHdheXMgaGFzIGN1cnJlbnQgYW5kIHByZXZpb3VzIHgseSB2YWx1ZXMgdG8gYWxsb3cgZHJhd2luZyB0byBwcmV2aW91cyBsb2NhdGlvbi5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIGRyYXdpbmcgdGhlIGxpbmUuXG4gICovXG4gIGRyYXcgKHNwcml0ZSkge1xuICAgIGlmIChzcHJpdGUuZHJhd2luZykge1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpXG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKChzcHJpdGUuc3RhZ2VXaWR0aCAvIDIpICsgc3ByaXRlLngsIChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIChzcHJpdGUueSAqIC0xKSlcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oKHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyBzcHJpdGUucHJldlgsIChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIChzcHJpdGUucHJldlkgKiAtMSkpXG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gc3ByaXRlLnBlblNpemVcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHNwcml0ZS5wZW5Db2xvclxuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogY2xlYXIgLSBjbGVhcnMgdGhlIGNhbnZhc1xuICAqL1xuICBjbGVhciAoc3ByaXRlKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBzcHJpdGUuc3RhZ2VXaWR0aCwgc3ByaXRlLnN0YWdlSGVpZ2h0KVxuICB9XG59XG4iLCJpbXBvcnQgRW50aXR5IGZyb20gJy4vZW50aXR5J1xuXG5pbXBvcnQgU3RhZ2VFbGVtZW50IGZyb20gJy4vc3RhZ2UtZWxlbWVudCdcbmltcG9ydCBTdGFnZVN1cmZhY2UgZnJvbSAnLi9zdGFnZS1zdXJmYWNlJ1xuaW1wb3J0IFNwcml0ZUVsZW1lbnQgZnJvbSAnLi9zcHJpdGUtZWxlbWVudCdcblxuaW1wb3J0IHNlbnNpbmcgZnJvbSAnLi9zdGFnZS1zZW5zaW5nJ1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFN0YWdlLlxuICogQGV4dGVuZHMgRW50aXR5XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSh7XG4gKiAgIHdpZHRoOiA2MDAsXG4gKiAgIGhlaWdodDogNDAwLFxuICogICBwYWNlOiAxNixcbiAqICAgc2Vuc2luZzogdHJ1ZSxcbiAqICAgcGFyZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2Utd3JhcCcpLFxuICogICBiYWNrZHJvcDogbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCh7Y29sb3I6ICcjRkZCNkMxJ30pXG4gKiB9KTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBFbnRpdHkge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTdGFnZS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIFN0YWdlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLndpZHRoIC0gVGhlIHN0YWdlIHdpZHRoIGluIHBpeGVscy4gRGVmYXVsdCBpcyBmdWxsIHdpbmRvdy5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSBUaGUgc3RhZ2UgaGVpZ2h0IGluIHBpeGVscy4gRGVmYXVsdCBpcyBmdWxsIHdpbmRvdy5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYWNlIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBmb3IgZWFjaCBwYWNlZCBtZXRob2QuICBXaWxsIGRpc2FibGUgcGFjaW5nIHdoZW4gc2V0IHRvIHplcm8uXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucGFyZW50IC0gVGhlIERPTSBlbGVtZW50IGludG8gd2hpY2ggdGhlIHN0YWdlIHdpbGwgYmUgaW5zZXJ0ZWQuIERlZmF1bHQgaXMgdGhlIGJvZHkuXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuYmFja2Ryb3AgLSBBIGRlZmF1bHQgQmFja2Ryb3AuXG4gICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnNlbnNpbmcgLSBFbmFibGVzIHNlbnNpbmcgb2YgbW91c2UgbG9jYXRpb24gYW5kIHdoYXQga2V5cyBwcmVzc2VkLlxuICAqIElmIHRydWUsIHdpbGwgY29uc3RhbnRseSB1cGRhdGUgc3RhZ2UgcHJvcGVydGllczogbW91c2VYLCBtb3VzZVksIGtleXNLZXlDb2RlLCBrZXlzS2V5Q29kZSBhbmQga2V5c0NvZGUgYmFzZWQgb24gdXNlciBpbnB1dC5cbiAgKi9cbiAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICBwYXJlbnQ6IGRvY3VtZW50LmJvZHksXG4gICAgICBwYWNlOiAzMyxcbiAgICAgIGJhY2tkcm9wOiBudWxsXG4gICAgfVxuICAgIGNvbnN0IGFjdHVhbCA9IHsgLi4uZGVmYXVsdHMsIC4uLm9wdGlvbnMgfVxuXG4gICAgc3VwZXIoYWN0dWFsLnBhY2UpXG5cbiAgICAvLyBiYWNrZHJvcHNcbiAgICB0aGlzLmJhY2tkcm9wcyA9IFtdXG5cbiAgICBpZiAoYWN0dWFsLmJhY2tkcm9wKSB7XG4gICAgICB0aGlzLmJhY2tkcm9wID0gYWN0dWFsLmJhY2tkcm9wXG4gICAgICB0aGlzLmJhY2tkcm9wcy5wdXNoKHRoaXMuYmFja2Ryb3ApXG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50ID0gbmV3IFN0YWdlRWxlbWVudChhY3R1YWwsIHRoaXMpXG4gICAgdGhpcy53aWR0aCA9IGFjdHVhbC53aWR0aFxuICAgIHRoaXMuaGVpZ2h0ID0gYWN0dWFsLmhlaWdodFxuXG4gICAgdGhpcy5rZXlzQ29kZSA9IFtdXG4gICAgdGhpcy5rZXlzS2V5ID0gW11cbiAgICB0aGlzLmtleXNLZXlDb2RlID0gW11cblxuICAgIHRoaXMuc3ByaXRlcyA9IFtdXG5cbiAgICB0aGlzLm1hZ25pZmljYXRpb24gPSAxMDBcblxuICAgIHRoaXMuY3NzUnVsZXMgPSBbXVxuICAgIHRoaXMuY2xhc3NlcyA9IFtdXG5cbiAgICB0aGlzLm1vdXNlRG93biA9IG51bGxcbiAgICB0aGlzLm1vdXNlWCA9IG51bGxcbiAgICB0aGlzLm1vdXNlWSA9IG51bGxcblxuICAgIGFjdHVhbC5zZW5zaW5nID8gc2Vuc2luZyh0aGlzKSA6IG51bGxcblxuICAgIHRoaXMuZWxlbWVudC51cGRhdGUodGhpcylcbiAgfVxuXG4gIC8qKlxuICAqIGRlbGV0ZSAtIERlbGV0ZXMgdGhlIHN0YWdlIGVsZW1lbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKlxuICAqIHN0YWdlLmRlbGV0ZSgpO1xuICAqL1xuICBkZWxldGUgKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZWxlbWVudC5kZWxldGUodGhpcylcbiAgfVxuXG4gIC8qKiBTZXR1cCBBY3Rpb25zICogKi9cblxuICAvKipcbiAgKiBhZGRTcHJpdGUgLSBBZGRzIGEgc3ByaXRlIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGFkZC5cbiAgKi9cbiAgYWRkU3ByaXRlIChzcHJpdGUpIHtcbiAgICBjb25zdCBjdXJTcHJpdGUgPSBzcHJpdGVcblxuICAgIGN1clNwcml0ZS5lbGVtZW50ID0gbmV3IFNwcml0ZUVsZW1lbnQoc3ByaXRlLCB0aGlzKVxuICAgIGN1clNwcml0ZS5zdXJmYWNlID0gbmV3IFN0YWdlU3VyZmFjZSh0aGlzKVxuXG4gICAgY3VyU3ByaXRlLmVsZW1lbnQuZmxhZyA9IHRoaXMuZWxlbWVudC5mbGFnXG4gICAgY3VyU3ByaXRlLmFnYWluc3RCYWNrZHJvcCA9IHRoaXMuZWxlbWVudC5iYWNrZHJvcENvbnRhaW5lclxuXG4gICAgY3VyU3ByaXRlLnN0YWdlV2lkdGggPSB0aGlzLndpZHRoXG4gICAgY3VyU3ByaXRlLnN0YWdlSGVpZ2h0ID0gdGhpcy5oZWlnaHRcblxuICAgIHRoaXMuc3ByaXRlcy5wdXNoKGN1clNwcml0ZSlcbiAgICBjdXJTcHJpdGUueiA9IHRoaXMuc3ByaXRlcy5sZW5ndGhcblxuICAgIHNwcml0ZS5lbGVtZW50LnVwZGF0ZShjdXJTcHJpdGUpXG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVTcHJpdGUgLSBSZW1vdmVzIGEgc3ByaXRlIGZyb20gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLnJlbW92ZVNwcml0ZShzcHJpdGUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gYWRkLlxuICAqL1xuICByZW1vdmVTcHJpdGUgKHNwcml0ZSkge1xuICAgIGNvbnN0IGN1clNwcml0ZSA9IHNwcml0ZVxuICAgIHRoaXMuc3ByaXRlcyA9IHRoaXMuc3ByaXRlcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHNwcml0ZSlcbiAgICBjdXJTcHJpdGUuZWxlbWVudCA/IGN1clNwcml0ZS5lbGVtZW50ID0gY3VyU3ByaXRlLmVsZW1lbnQuZGVsZXRlKGN1clNwcml0ZSkgOiBudWxsXG4gIH1cblxuICAvKiogbG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIGFkZEJhY2tkcm9wIC0gQWRkcyBhIGJhY2tkcm9wIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGJhY2tkcm9wIHRvIGFkZC5cbiAgKi9cbiAgYWRkQmFja2Ryb3AgKGJhY2tkcm9wKSB7XG4gICAgdGhpcy5iYWNrZHJvcHMucHVzaChiYWNrZHJvcClcbiAgICAvLyBpZiBcImJhcmVcIiBzZXQgdGhlIGFkZGVkIGFzIGFjdGl2ZVxuICAgICF0aGlzLmJhY2tkcm9wID8gdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzWzBdIDogbnVsbFxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hCYWNrZHJvcFRvIC0gU3dpdGNoZXMgdG8gc3BlY2lmaWVkIGJhY2tkcm9wLiBJZiBub3QgZm91bmQgZmFpbHMgc2lsZW50bHkuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2Uuc3dpdGNoQmFja2Ryb3BUbyhiYWNrZHJvcCk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gYmFja2Ryb3AgLSB0aGUgYmFja2Ryb3AgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQmFja2Ryb3BUbyAoYmFja2Ryb3ApIHtcbiAgICBjb25zdCBjdXJyZW50QmFja2Ryb3BJbmRleCA9IHRoaXMuYmFja2Ryb3BzLmluZGV4T2YoYmFja2Ryb3ApXG4gICAgY3VycmVudEJhY2tkcm9wSW5kZXggIT09IC0xID8gdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzW2N1cnJlbnRCYWNrZHJvcEluZGV4XSA6IG51bGxcblxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hCYWNrZHJvcFRvTnVtIC0gU3dpdGNoZXMgdG8gc3BlY2lmaWVkIGJhY2tkcm9wIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnN3aXRjaEJhY2tkcm9wVG9OdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgYmFja2Ryb3AgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQmFja2Ryb3BUb051bSAoaW5kZXgpIHtcbiAgICB0aGlzLnN3aXRjaEJhY2tkcm9wVG8odGhpcy5iYWNrZHJvcHNbaW5kZXhdKVxuICB9XG5cbiAgLyoqXG4gICogbmV4dEJhY2tkcm9wIC0gU3dpdGNoZXMgdG8gdGhlIG5leHQgYmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2UubmV4dEJhY2tkcm9wKCk7XG4gICovXG4gIG5leHRCYWNrZHJvcCAoKSB7XG4gICAgY29uc3QgY3VycmVudEJhY2tkcm9wSW5kZXggPSB0aGlzLmJhY2tkcm9wcy5pbmRleE9mKHRoaXMuYmFja2Ryb3ApXG4gICAgdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzWyhjdXJyZW50QmFja2Ryb3BJbmRleCArIDEpICUgdGhpcy5iYWNrZHJvcHMubGVuZ3RoXVxuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGxcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUJhY2tkcm9wIC0gUmVtb3ZlcyBhIGJhY2tkcm9wLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnJlbW92ZUJhY2tkcm9wKGJhY2tkcm9wKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBiYWNrZHJvcCAtIHRoZSBiYWNrZHJvcCB0byByZW1vdmUuXG4gICovXG4gIHJlbW92ZUJhY2tkcm9wIChiYWNrZHJvcCkge1xuICAgIGlmICh0aGlzLmJhY2tkcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBjdXJyZW50QmFja2Ryb3BJbmRleCA9IHRoaXMuYmFja2Ryb3BzLmluZGV4T2YoYmFja2Ryb3ApXG4gICAgICB0aGlzLmJhY2tkcm9wID09PSBiYWNrZHJvcCA/IHRoaXMuYmFja2Ryb3AgPSB0aGlzLmJhY2tkcm9wc1soY3VycmVudEJhY2tkcm9wSW5kZXggKyAxKSAlIHRoaXMuYmFja2Ryb3BzLmxlbmd0aF0gOiBudWxsXG4gICAgICB0aGlzLmJhY2tkcm9wcyA9IHRoaXMuYmFja2Ryb3BzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gYmFja2Ryb3ApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmFja2Ryb3BzID0gW11cbiAgICAgIHRoaXMuYmFja2Ryb3AgPSBudWxsXG4gICAgfVxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVCYWNrZHJvcE51bSAtIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBiYWNrZHJvcCBieSBudW1iZXIgb2YgY3VycmVudCAoMCBpcyBmaXJzdCkuXG4gICogSWYgdGhlcmUgaXMgb25seSBvbmUgYmFja2Ryb3AsIHdpbGwgZmFpbCBhbmQgZW1pdCBhIGNvbnNvbGUgbWVzc2FnZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIHN0YWdlLmFkZEJhY2tkcm9wKGJhY2tkcm9wKTtcbiAgKiBzdGFnZS5yZW1vdmVCYWNrZHJvcE51bSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBiYWNrZHJvcCB0byByZW1vdmUuXG4gICovXG4gIHJlbW92ZUJhY2tkcm9wTnVtIChpbmRleCkge1xuICAgIHRoaXMucmVtb3ZlQmFja2Ryb3AodGhpcy5iYWNrZHJvcHNbaW5kZXhdKVxuICB9XG5cbiAgLyoqXG4gICogcmVmcmVzaCAtIEZvcmNlcyBhIHNwcml0ZSByZWZyZXNoLlxuICAqIE5vdGU6IHNlcnZpY2UgbWV0aG9kIHRvIGJlIHVzZWQgaWYgY29zdHVtZSB3YXMgbWFuaXB1bGF0ZWQgZGlyZWN0bHkuXG4gICovXG4gIHJlZnJlc2ggKCkge1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsXG4gIH1cblxuICAvKipcbiAgKiB6b29tIC0gem9vbXMgdGhlIHN0YWdlIHRvIHRoZSBzcGVjaWZpZWQgcGVyY2VudGFnZSBudW1iZXIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKlxuICAqIHN0YWdlLnpvb20oMTUwKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwZXJjZW50IC0gdGhlIHBlcmNlbnRhZ2UgdG8gc2V0LlxuICAqL1xuICB6b29tIChwZXJjZW50KSB7XG4gICAgdGhpcy5tYWduaWZpY2F0aW9uID0gcGVyY2VudFxuICAgIHRoaXMuZWxlbWVudC51cGRhdGUodGhpcylcbiAgfVxuXG4gIC8qKiBTcHJpdGVzICogKi9cblxuICAvKipcbiAgKiBfcmVmcmVzaFNwcml0ZXMgLSBSZWZyZXNoIHRoZSBET00gZWxlbWVudCBvZiBhbGwgc3ByaXRlcyBjdXJyZW50bHkgb24gc3RhZ2UuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBiYWNrZHJvcCB0byBzd2l0Y2ggdG9vLlxuICAqL1xuICBfcmVmcmVzaFNwcml0ZXMgKCkge1xuICAgIGxldCBpID0gMFxuICAgIHRoaXMuc3ByaXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBzcHJpdGUgPSBpdGVtXG4gICAgICBpICs9IDFcbiAgICAgIHNwcml0ZS56ID0gaVxuICAgICAgc3ByaXRlLmVsZW1lbnQgPyBzcHJpdGUuZWxlbWVudC51cGRhdGUoc3ByaXRlKSA6IG51bGxcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICogc2VuZFNwcml0ZUJhY2t3YXJkcyAtIE1vdmVzIHRoZSBzcHJpdGUgb25lIHBsYWNlIGRvd24gdGhlIFwicGlsZVwiLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKiBzdGFnZS53aGVuRmxhZyggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNlbmRTcHJpdGVCYWNrd2FyZHMoc3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUuXG4gICovXG4gIHNlbmRTcHJpdGVCYWNrd2FyZHMgKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKVxuICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgIHRoaXMuc3ByaXRlc1tpbmRleF0gPSB0aGlzLnNwcml0ZXNbaW5kZXggLSAxXSAvLyBtb3ZlIG9uZSB1cFxuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4IC0gMV0gPSBzcHJpdGUgLy8gbWUgc3ViamVjdCBkb3duXG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKClcbiAgfVxuXG4gIC8qKlxuICAqIHNlbmRTcHJpdGVGb3J3YXJkIC0gTW92ZXMgdGhlIHNwcml0ZSBvbmUgcGxhY2UgdXAgaW4gdGhlIFwicGlsZVwiLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKiBzdGFnZS53aGVuRmxhZyggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNlbmRTcHJpdGVGb3J3YXJkKHNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlLlxuICAqL1xuICBzZW5kU3ByaXRlRm9yd2FyZCAoc3ByaXRlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnNwcml0ZXMuaW5kZXhPZihzcHJpdGUpXG4gICAgaWYgKGluZGV4IDwgdGhpcy5zcHJpdGVzLmxlbmd0aCAtIDEgJiYgaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLnNwcml0ZXNbaW5kZXhdID0gdGhpcy5zcHJpdGVzW2luZGV4ICsgMV0gLy8gbW92ZSBvbmUgZG93blxuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4ICsgMV0gPSBzcHJpdGUgLy8gbWUgc3ViamVjdCB1cFxuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoU3ByaXRlcygpXG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlVG9Gcm9udCAtIEJyaW5ncyB0aGUgc3ByaXRlIHRvIHRoZSBmcm9udCBvZiB0aGUgXCJwaWxlXCJcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2Uud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZW5kU3ByaXRlVG9Gcm9udChzcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZS5cbiAgKi9cbiAgc2VuZFNwcml0ZVRvRnJvbnQgKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuc3ByaXRlcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLnNwcml0ZXMucHVzaChzcHJpdGUpXG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKClcbiAgfVxuXG4gIC8qKlxuICAqIHNlbmRTcHJpdGVUb0JhY2sgLSBTZW5kcyB0aGUgc3ByaXRlIHRvIHRoZSBiYWNrIG9mIHRoZSBcInBpbGVcIlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKiBzdGFnZS53aGVuRmxhZyggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNlbmRTcHJpdGVUb0JhY2soc3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUuXG4gICovXG4gIHNlbmRTcHJpdGVUb0JhY2sgKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuc3ByaXRlcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLnNwcml0ZXMudW5zaGlmdChzcHJpdGUpXG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKClcbiAgfVxuXG4gIC8qIHNlbnNpbmcgKi9cblxuICAvKipcbiAgKiBpc0tleVByZXNzZWQgLSBDaGVja3MgaWYgYSBrZXkgaXMgcHJlc3NlZC4gU3RhZ2Ugc2Vuc2luZyBtdXN0IGJlIGVuYWJsZWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNheShzdGFnZS5pc0tleVByZXNzZWQoJ2EnKSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcktleSAtIHRoZSBrZXkgcHJlc3NlZC4gTWF5IGJlIHRoZSBjb2RlIG9yIHRoZSBjaGFyYWN0ZXIgaXRzZWxmIChBIG9yIDY1KVxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIGlzS2V5UHJlc3NlZCAodXNlcktleSkge1xuICAgIGxldCBtYXRjaCA9IGZhbHNlXG4gICAgbGV0IGNoZWNrXG5cbiAgICB0eXBlb2YgdXNlcktleSA9PT0gJ3N0cmluZycgPyBjaGVjayA9IHVzZXJLZXkudG9Mb3dlckNhc2UoKSA6IGNoZWNrID0gdXNlcktleVxuICAgIC8vIE1ha2Ugc3VyZSBlYWNoIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBieSBicm93c2Vycy5cbiAgICAvLyBOb3RlOiB1c2VyIG1heSB3cml0ZSBpbmNvbXBhdGlibGUgY29kZS5cbiAgICB0aGlzLmtleXNLZXkuaW5kZXhPZihjaGVjaykgIT09IC0xID8gbWF0Y2ggPSB0cnVlIDogbnVsbFxuICAgIHRoaXMua2V5c0NvZGUuaW5kZXhPZihjaGVjaykgIT09IC0xID8gbWF0Y2ggPSB0cnVlIDogbnVsbFxuICAgIHRoaXMua2V5c0tleUNvZGUuaW5kZXhPZihjaGVjaykgIT09IC0xID8gbWF0Y2ggPSB0cnVlIDogbnVsbFxuXG4gICAgIXRoaXMuc2Vuc2luZyA/IGNvbnNvbGUubG9nKCdCbG9ja0xpa2UuanMgTm90aWNlOiBpc0tleVByZXNzZWQoKSBpbmdub3JlZC4gU3RhZ2Ugc2Vuc2luZyBub3QgZW5hYmxlZC4nKSA6IG51bGwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbiAgICByZXR1cm4gbWF0Y2hcbiAgfVxufVxuIiwiLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFVJIEVsZW1lbnRzIGF0dGFjaGVkIHRvIGEgc3ByaXRlLlxuICogRWFjaCBTcHJpdGUgbWF5IGhhdmUgb25lLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFVpRWxlbWVudCB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIHVpIGVsZW1lbnQgdGhhdCBcImF0dGFoY2VzXCIgdG8gYSBzcHJpdGUuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byB3aGljaCB0aGUgdWkgaXMgYXR0YWNoZWQuXG4gICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSB3aGF0IHVpIHRvIGNyZWF0ZSAoc2F5IGJ1YmJsZSwgdGhpbmsgYnViYmxlIG9yIGFzayBib3gpXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSAgd2hhdCB0aGUgdGV4dCBzYWlkL3Rob3VnaHQvYXNrIHdpbGwgYmUuXG4gICogQHBhcmFtIHtvYmplY3R9IGFza0lkIC0gdGhlIGFzayBib3ggaWRlbnRpZmllciAodXNlZCB0byBtYW5hZ2UgZXZlbnRzKS5cbiAgKi9cbiAgY29uc3RydWN0b3IgKHNwcml0ZSwgdHlwZSwgdGV4dCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAvKipcbiAgICAqIGFza0lucHV0IC0gZW5jYXBzdWxhdGUgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIGlucHV0IGZpZWxkIHVzZWQgdG8gY2FwdHVyZSB1c2VyIGlucHV0IHdpdGggYXNrKCkuXG4gICAgKlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIHRoZSBpbnB1dCBkb20gZWxlbWVudC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGFza0lucHV0ICgpIHtcbiAgICAgIC8qKlxuICAgICAgKiBzZW5kQW5zd2VyIC0gZGlzcGF0Y2hlcyBhbiBldmVudCB3aGVuIHRoZSB1c2VyIGhhcyBzdWJtaXR0ZWQgdGhlIGlucHV0LlxuICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHNlbmRBbnN3ZXIgKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChgYmxvY2tMaWtlLmFzay4ke3Nwcml0ZS5pZH0uJHtzcHJpdGUuYXNrSWR9YCwgeyBkZXRhaWw6IHsgdmFsdWUsIGFza0lkOiBzcHJpdGUuYXNrSWQgfSB9KVxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgIHNlbmRBbnN3ZXIoaW5wdXQudmFsdWUpXG4gICAgICAgICAgaW5wdXQudmFsdWUgPSAnJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgZWwuYXBwZW5kQ2hpbGQoaW5wdXQpXG5cbiAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBzdWJtaXQuaW5uZXJIVE1MID0gJyYjeDI3MTMnXG4gICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHNlbmRBbnN3ZXIoaW5wdXQudmFsdWUpXG4gICAgICAgIGlucHV0LnZhbHVlID0gJydcbiAgICAgIH0pXG4gICAgICBlbC5hcHBlbmRDaGlsZChzdWJtaXQpXG5cbiAgICAgIHJldHVybiBpbnB1dFxuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IHRleHQudG9TdHJpbmcoKVxuICAgIHRoaXMudHlwZSA9IHR5cGVcblxuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB4IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB4ID0gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMilcbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeSBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeSA9IChzcHJpdGUueSAqIC0xKSAtIChzcHJpdGUuaGVpZ2h0IC8gMilcblxuICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgIGVsLmlubmVySFRNTCA9IGAke3RleHR9PGJyIC8+YFxuXG4gICAgLy8gbG9va3NcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgbmljZXIuLi5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4ICsgKHNwcml0ZS53aWR0aCAqIDAuNil9cHhgXG4gICAgZWwuc3R5bGUudG9wID0gYCR7KChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIHkpIC0gODAgLSAoTWF0aC5mbG9vcih0aGlzLnRleHQubGVuZ3RoIC8gMzApICogMTYpfXB4YFxuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gc3ByaXRlLnpcbiAgICBlbC5jbGFzc05hbWUgPSBgYmxvY2tsaWtlLSR7dHlwZX1gXG5cbiAgICBsZXQgaWVsID0gbnVsbFxuICAgIGlmICh0eXBlID09PSAnYXNrJykge1xuICAgICAgaWVsID0gYXNrSW5wdXQoc3ByaXRlLCBlbClcbiAgICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDExMCAtIChNYXRoLmZsb29yKHRoaXMudGV4dC5sZW5ndGggLyAzMCkgKiAxNil9cHhgXG4gICAgfVxuXG4gICAgc3ByaXRlLmVsZW1lbnQuZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHNwcml0ZS5lbGVtZW50LmVsKVxuICAgIGllbCA/IGllbC5mb2N1cygpIDogbnVsbFxuXG4gICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGAkeyhzcHJpdGUuc2hvd2luZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nKX1gXG5cbiAgICB0aGlzLmVsID0gZWxcbiAgfVxuXG4gIC8qKlxuICAqIHVwZGF0ZSAtIHVwZGF0ZWQgdGhlIERPTSBlbGVtZW50IChtb3ZlcyB3aXRoIHNwcml0ZSkuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byB3aGljaCB0aGUgdWkgaXMgYXR0YWNoZWQuXG4gICovXG4gIHVwZGF0ZSAoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUudGV4dHVpLmVsXG5cbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeCBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeCA9IHNwcml0ZS54IC0gKHNwcml0ZS53aWR0aCAvIDIpXG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHkgY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHkgPSAoc3ByaXRlLnkgKiAtMSkgLSAoc3ByaXRlLmhlaWdodCAvIDIpXG5cbiAgICAvLyBsb29rc1xuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBuaWNlci4uLlxuICAgIGVsLnN0eWxlLmxlZnQgPSBgJHsoc3ByaXRlLnN0YWdlV2lkdGggLyAyKSArIHggKyAoc3ByaXRlLndpZHRoICogMC42KX1weGBcbiAgICBlbC5zdHlsZS50b3AgPSBgJHsoKHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgeSkgLSA4MCAtIChNYXRoLmZsb29yKHRoaXMudGV4dC5sZW5ndGggLyAzMCkgKiAxNil9cHhgXG5cbiAgICBpZiAoc3ByaXRlLnRleHR1aS50eXBlID09PSAnYXNrJykge1xuICAgICAgZWwuc3R5bGUudG9wID0gYCR7KChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIHkpIC0gMTEwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGBcbiAgICB9XG5cbiAgICBlbC5zdHlsZS52aXNpYmlsaXR5ID0gYCR7KHNwcml0ZS5zaG93aW5nID8gJ3Zpc2libGUnIDogJ2hpZGRlbicpfWBcbiAgfVxuXG4gIC8qKlxuICAqIGRlbGV0ZSAtIGRlbGV0ZXMgdGhlIERPTSBlbGVtZW50IChoaWRlcyBpdCkuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byB3aGljaCB0aGUgdWkgaXMgYXR0YWNoZWQuXG4gICovXG4gIGRlbGV0ZSAoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUudGV4dHVpLmVsXG5cbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4qIEJsb2NrTGlrZS5qc1xuKlxuKiBCbG9ja0xpa2UuanMgaXMgYW4gZWR1Y2F0aW9uYWwgSmF2YVNjcmlwdCBsaWJyYXJ5LlxuKiBJdCBicmlkZ2VzIHRoZSBnYXAgYmV0d2VlbiBibG9jay1iYXNlZCBhbmQgdGV4dC1iYXNlZCBwcm9ncmFtbWluZy5cbipcbiogQmxvY2tMaWtlLmpzIGlzIGRlc2lnbmVkIGZvbGxvd2luZyBTY3JhdGNoIGNvbmNlcHRzLCBtZXRob2RzIGFuZCBwYXR0ZXJucy5cbiogVGhlIHNjcmVlbiBpcyBhIGNlbnRlcmVkIHN0YWdlLiBJbnRlcmFjdGlvbiBpcyB3aXRoIFNwcml0ZXMuXG4qIENvZGUgaXMgZXhlY3V0ZWQgaW4gYSBcInBhY2VkXCIgbWFubmVyLlxuKiBTY3JhdGNoIGJsb2NrIGNvZGUgYW5kIEJsb2NrTGlrZS5qcyB0ZXh0IGNvZGUgYXJlIG1lYW50IHRvIGJlXG4qIGFzIGxpdGVyYWxseSBzaW1pbGFyIGFzIHBvc3NpYmxlLlxuKlxuKiBCbG9ja0xpa2UuanMgaXMgd3JpdHRlbiBpbiBFUzYvRVM3IGZsYXZvcmVkIEphdmFTY3JpcHQuXG4qIEl0IGlzIGVudmlyb25tZW50IGluZGVwZW5kZW50LlxuKiBJdCBjYW4gYmUgdXNlZCBhbnl3aGVyZSBtb2Rlcm4gSmF2YVNjcmlwdCBydW5zLlxuKlxuKiBAYXV0aG9yIFlhcm9uIChSb24pIElsYW5cbiogQGVtYWlsIGJsb2NrbGlrZUByb25pbGFuLmNvbVxuKlxuKiBDb3B5cmlnaHQgMjAxOFxuKiBGYWJyaXF1w6kgYXUgQ2FuYWRhIDogTWFkZSBpbiBDYW5hZGFcbiovXG5cbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL2RvY3VtZW50LWNzcydcbmltcG9ydCBwbGF0Zm9ybXMgZnJvbSAnLi9wbGF0Zm9ybXMnXG5cbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja2Ryb3AgZnJvbSAnLi9iYWNrZHJvcCcgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZScgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IENvc3R1bWUgZnJvbSAnLi9jb3N0dW1lJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmV4cG9ydCB7IFN0YWdlIH1cbmV4cG9ydCB7IEJhY2tkcm9wIH1cbmV4cG9ydCB7IFNwcml0ZSB9XG5leHBvcnQgeyBDb3N0dW1lIH07XG5cbihmdW5jdGlvbiBpbml0ICgpIHtcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG5cbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2NzcydcbiAgc3R5bGUuaW5uZXJIVE1MID0gYFxuICAgICR7c3R5bGVzLmRlZmF1bHRDU1N9XFxuXFxuIFxuICAgICR7c3R5bGVzLnVpQ1NTfVxcblxcbiBcbiAgICAke3N0eWxlcy50aGlua0NTU31cXG5cXG4gXG4gICAgJHtzdHlsZXMuc2F5Q1NTfSBcXG5cXG4gXG4gICAgJHtzdHlsZXMuYXNrQ1NTfWBcblxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuXG4gIHBsYXRmb3JtcygpXG59KCkpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=