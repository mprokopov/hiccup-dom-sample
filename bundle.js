/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SVG_NS = "http://www.w3.org/2000/svg";
exports.TAG_REGEXP = /^([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?$/;
// tslint:disable-next-line
exports.SVG_TAGS = "svg circle clipPath defs ellipse g line linearGradient mask path pattern polygon polyline radialGradient rect stop symbol text"
    .split(" ")
    .reduce((acc, x) => (acc[x] = 1, acc), {});
// tslint:disable-next-line
exports.VOID_TAGS = "area base br col command embed hr img input keygen link meta param source track wbr circle ellipse line path polygon polyline rect stop"
    .split(" ")
    .reduce((acc, x) => (acc[x] = 1, acc), {});
exports.ENTITIES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
};
exports.ENTITY_RE = new RegExp(`[${Object.keys(exports.ENTITIES)}]`, "g");


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isString(x) {
    return typeof x === "string";
}
exports.isString = isString;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.css = (rules) => {
    const css = [];
    for (let r in rules) {
        if (rules.hasOwnProperty(r)) {
            css.push(r + ":" + rules[r] + ";");
        }
    }
    return css.join("");
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isFunction(x) {
    return typeof x === "function";
}
exports.isFunction = isFunction;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isPlainObject(x) {
    return Object.prototype.toString.call(x) === "[object Object]";
}
exports.isPlainObject = isPlainObject;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEBUG = false;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const is_array_1 = __webpack_require__(7);
const is_function_1 = __webpack_require__(3);
const is_iterable_1 = __webpack_require__(8);
const is_string_1 = __webpack_require__(1);
const diff = __webpack_require__(16);
const api_1 = __webpack_require__(0);
const api_2 = __webpack_require__(5);
const dom_1 = __webpack_require__(10);
function diffElement(parent, prev, curr) {
    _diffElement(parent, prev, curr, 0);
}
exports.diffElement = diffElement;
function _diffElement(parent, prev, curr, child) {
    const delta = diff.diffArray(prev, curr);
    const edits = delta.linear;
    const el = parent.children[child];
    if (delta.distance === 0) {
        return;
    }
    if (edits[0][0] !== 0 || prev[1].key !== curr[1].key || hasChangedEvents(prev[1], curr[1])) {
        api_2.DEBUG && console.log("replace:", prev, curr);
        releaseDeep(prev);
        dom_1.removeChild(parent, child);
        dom_1.createDOM(parent, curr, undefined, child);
        return;
    }
    if (prev.__release && prev.__release !== curr.__release) {
        releaseDeep(prev);
    }
    if (curr.__init && prev.__init !== curr.__init) {
        api_2.DEBUG && console.log("call __init", curr);
        const args = [el, ...(curr.__args)]; // Safari https://bugs.webkit.org/show_bug.cgi?format=multiple&id=162003
        curr.__init.apply(curr, args);
    }
    if (edits[1][0] !== 0) {
        diffAttributes(el, prev[1], curr[1]);
    }
    const equivKeys = extractEquivElements(edits);
    const n = edits.length;
    const noff = prev.length - 1;
    const offsets = [];
    let i, j, k, eq;
    for (i = noff; i >= 2; i--) {
        offsets[i] = i - 2;
    }
    for (i = 2; i < n; i++) {
        const e = edits[i], status = e[0], idx = e[1][0], val = e[1][1];
        // DEBUG && console.log(`edit: o:[${offsets.toString()}] i:${idx} s:${status}`, val);
        if (status === -1) {
            if (is_array_1.isArray(val)) {
                k = val[1].key;
                if (k !== undefined && equivKeys[k][2] !== undefined) {
                    eq = equivKeys[k];
                    k = eq[0];
                    // DEBUG && console.log(`diff equiv key @ ${k}:`, prev[k], curr[eq[2]]);
                    _diffElement(el, prev[k], curr[eq[2]], offsets[k]);
                }
                else {
                    // DEBUG && console.log("remove @", offsets[idx], val);
                    releaseDeep(val);
                    dom_1.removeChild(el, offsets[idx]);
                    for (j = noff; j >= idx; j--) {
                        offsets[j] = Math.max(offsets[j] - 1, 0);
                    }
                }
            }
            else if (is_string_1.isString(val)) {
                el.textContent = "";
            }
        }
        else if (status === 1) {
            if (is_string_1.isString(val)) {
                el.textContent = val;
            }
            else if (is_array_1.isArray(val)) {
                k = val[1].key;
                if (k === undefined || (k && equivKeys[k][0] === undefined)) {
                    // DEBUG && console.log("insert @", offsets[idx], val);
                    dom_1.createDOM(el, val, undefined, offsets[idx]);
                    for (j = noff; j >= idx; j--) {
                        offsets[j]++;
                    }
                }
            }
        }
    }
}
function releaseDeep(tag) {
    if (is_array_1.isArray(tag)) {
        if (tag.__release) {
            // DEBUG && console.log("call __release", tag);
            tag.__release.apply(tag, tag.__args);
            delete tag.__release;
        }
        for (let i = tag.length - 1; i >= 2; i--) {
            releaseDeep(tag[i]);
        }
    }
}
function normalizeElement(spec) {
    let tag = spec[0];
    let content = spec.slice(1), c;
    let match, id, clazz;
    const attribs = {};
    if (!is_string_1.isString(tag) || !(match = api_1.TAG_REGEXP.exec(tag))) {
        throw new Error(`${tag} is not a valid tag name`);
    }
    tag = match[1];
    id = match[2];
    clazz = match[3];
    if (id) {
        attribs.id = id;
    }
    if (clazz) {
        attribs.class = clazz.replace(/\./g, " ");
    }
    c = content[0];
    if (c != null && c.constructor === Object) {
        Object.assign(attribs, c);
        content.shift();
    }
    return [tag, attribs, content.length > 0 ? content : undefined];
}
const NO_SPANS = { text: 1, textarea: 1 };
function normalizeTree(el, path = [0], keys = true, span = true) {
    if (el == null) {
        return;
    }
    if (is_array_1.isArray(el)) {
        if (el.length === 0) {
            return;
        }
        const tag = el[0];
        let norm;
        if (is_function_1.isFunction(tag)) {
            return normalizeTree(tag.apply(null, el.slice(1)), path.slice(), keys, span);
        }
        if (!is_string_1.isString(tag)) {
            const args = el.slice(1);
            norm = normalizeTree(tag.render.apply(null, args), path.slice(), keys, span);
            if (norm !== undefined) {
                if (keys && norm[1].key === undefined) {
                    norm[1].key = path.join("-");
                }
                norm.__init = tag.init;
                norm.__release = tag.release;
                norm.__args = args;
            }
            return norm;
        }
        norm = normalizeElement(el);
        if (keys && norm[1].key === undefined) {
            norm[1].key = path.join("-");
        }
        if (norm[2]) {
            const children = norm[2].slice();
            const n = children.length;
            norm.length = 2;
            span = span && !NO_SPANS[norm[0]];
            for (let i = 0, j = 2, k = 0; i < n; i++) {
                let el = children[i];
                if (el != null) {
                    if (!is_array_1.isArray(el) && !is_string_1.isString(el) && is_iterable_1.isIterable(el)) {
                        for (let c of el) {
                            c = normalizeTree(c, [...path, k], keys, span);
                            if (c !== undefined) {
                                norm[j++] = c;
                            }
                            k++;
                        }
                    }
                    else {
                        el = normalizeTree(el, [...path, k], keys, span);
                        if (el !== undefined) {
                            norm[j++] = el;
                        }
                        k++;
                    }
                }
            }
        }
        return norm;
    }
    if (is_function_1.isFunction(el)) {
        return normalizeTree(el(), path, keys, span);
    }
    return span ?
        ["span", keys ? { key: path.join("-") } : {}, el.toString()] :
        el.toString();
}
exports.normalizeTree = normalizeTree;
function hasChangedEvents(prev, curr) {
    for (let k in curr) {
        if (k.indexOf("on") === 0 && prev[k] !== curr[k]) {
            return true;
        }
    }
    return false;
}
function diffAttributes(el, prev, curr) {
    const delta = diff.diffObject(prev, curr);
    let i, a, attribs;
    api_2.DEBUG && console.log("diff attribs:", delta);
    dom_1.removeAttribs(el, delta.dels);
    for (attribs = delta.edits, i = attribs.length - 1; i >= 0; i--) {
        a = attribs[i];
        dom_1.setAttrib(el, a[0], a[1]);
    }
    for (attribs = delta.adds, i = attribs.length - 1; i >= 0; i--) {
        a = attribs[i];
        dom_1.setAttrib(el, a, curr[a]);
    }
}
function extractEquivElements(edits) {
    const equiv = {};
    let k;
    for (let i = edits.length - 1; i >= 0; i--) {
        const e = edits[i];
        const v = e[1][1];
        if (is_array_1.isArray(v) && (k = v[1].key)) {
            equiv[k] = equiv[k] || [, ,];
            equiv[k][e[0] + 1] = e[1][0];
        }
    }
    return equiv;
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = Array.isArray;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isIterable(x) {
    return x != null && typeof x[Symbol.iterator] === "function";
}
exports.isIterable = isIterable;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const is_arraylike_1 = __webpack_require__(18);
const is_plain_object_1 = __webpack_require__(4);
function equiv(a, b) {
    if (a === b) {
        return true;
    }
    if (a != null) {
        if (typeof a.equiv === "function") {
            return a.equiv(b);
        }
    }
    else {
        return a == b;
    }
    if (b != null) {
        if (typeof b.equiv === "function") {
            return b.equiv(a);
        }
    }
    else {
        return a == b;
    }
    if (typeof a === "string" || typeof b === "string") {
        return false;
    }
    if (is_plain_object_1.isPlainObject(a) && is_plain_object_1.isPlainObject(b)) {
        return equivObject(a, b);
    }
    if (is_arraylike_1.isArrayLike(a) && is_arraylike_1.isArrayLike(b)) {
        return equivArrayLike(a, b);
    }
    return false;
}
exports.equiv = equiv;
function equivArrayLike(a, b) {
    let l = a.length;
    if (b.length === l) {
        while (--l >= 0 && equiv(a[l], b[l]))
            ;
    }
    return l < 0;
}
function equivObject(a, b) {
    const keys = new Set(Object.keys(a).concat(Object.keys(b)));
    for (let k of keys) {
        if (a.hasOwnProperty(k)) {
            if (b.hasOwnProperty(k)) {
                if (equiv(a[k], b[k])) {
                    continue;
                }
            }
        }
        return false;
    }
    return true;
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const is_array_1 = __webpack_require__(7);
const is_function_1 = __webpack_require__(3);
const is_iterable_1 = __webpack_require__(8);
const is_string_1 = __webpack_require__(1);
const api_1 = __webpack_require__(0);
const css_1 = __webpack_require__(2);
const map_1 = __webpack_require__(20);
function createDOM(parent, tag, opts, insert) {
    if (is_array_1.isArray(tag)) {
        if (is_function_1.isFunction(tag[0])) {
            return createDOM(parent, tag[0].apply(null, tag.slice(1), opts));
        }
        const el = createElement(parent, tag[0], tag[1], insert);
        if (tag.__init) {
            const args = [el, ...(tag.__args)]; // Safari https://bugs.webkit.org/show_bug.cgi?format=multiple&id=162003
            tag.__init.apply(tag, args);
        }
        if (tag[2]) {
            const n = tag.length;
            for (let i = 2; i < n; i++) {
                createDOM(el, tag[i], opts);
            }
        }
        return el;
    }
    if (!is_string_1.isString(tag) && is_iterable_1.isIterable(tag)) {
        return [...(map_1.map((x) => createDOM(parent, x, opts), tag))];
    }
    if (tag == null) {
        return parent;
    }
    return createTextElement(parent, tag);
}
exports.createDOM = createDOM;
function createElement(parent, tag, attribs, insert) {
    const el = api_1.SVG_TAGS[tag] ?
        document.createElementNS(api_1.SVG_NS, tag) :
        document.createElement(tag);
    if (parent) {
        if (insert === undefined) {
            parent.appendChild(el);
        }
        else {
            parent.insertBefore(el, parent.children[insert]);
        }
    }
    if (attribs) {
        setAttribs(el, attribs);
    }
    return el;
}
exports.createElement = createElement;
function createTextElement(parent, content, insert) {
    const el = document.createTextNode(content);
    if (parent) {
        if (insert === undefined) {
            parent.appendChild(el);
        }
        else {
            parent.insertBefore(el, parent.children[insert]);
        }
    }
    return el;
}
exports.createTextElement = createTextElement;
function cloneWithNewAttribs(el, attribs) {
    const res = el.cloneNode(true);
    setAttribs(res, attribs);
    el.parentNode.replaceChild(res, el);
    return res;
}
exports.cloneWithNewAttribs = cloneWithNewAttribs;
function setAttribs(el, attribs) {
    const keys = Object.keys(attribs);
    for (let i = keys.length - 1; i >= 0; i--) {
        const k = keys[i];
        setAttrib(el, k, attribs[k]);
    }
    return el;
}
exports.setAttribs = setAttribs;
function setAttrib(el, k, v) {
    if (v !== undefined && v !== false) {
        switch (k) {
            case "style":
                setStyle(el, v);
                break;
            case "value":
                updateValueAttrib(el, v);
                break;
            default:
                if (k.indexOf("on") === 0) {
                    el.addEventListener(k.substr(2), v);
                }
                else {
                    el.setAttribute(k, v);
                }
        }
    }
    else {
        el.removeAttribute(k);
    }
    return el;
}
exports.setAttrib = setAttrib;
function updateValueAttrib(el, v) {
    switch (el.type) {
        case "text":
        case "textarea":
        case "password":
        case "email":
        case "url":
        case "tel":
        case "search":
            if (el.value !== undefined && is_string_1.isString(v)) {
                const e = el;
                const off = v.length - (e.value.length - e.selectionStart);
                e.value = v;
                e.selectionStart = e.selectionEnd = off;
                return;
            }
        default:
    }
    el.value = v;
}
exports.updateValueAttrib = updateValueAttrib;
function removeAttribs(el, attribs) {
    for (let i = attribs.length - 1; i >= 0; i--) {
        el.removeAttribute(attribs[i]);
    }
}
exports.removeAttribs = removeAttribs;
function setStyle(el, styles) {
    el.setAttribute("style", css_1.css(styles));
    return el;
}
exports.setStyle = setStyle;
function clearDOM(el) {
    el.innerHTML = "";
}
exports.clearDOM = clearDOM;
function removeChild(parent, childIdx) {
    const n = parent.children[childIdx];
    if (n !== undefined) {
        n.remove();
    }
}
exports.removeChild = removeChild;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thi_ng_hiccup__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thi_ng_hiccup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__thi_ng_hiccup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thi_ng_hiccup_dom__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thi_ng_hiccup_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__thi_ng_hiccup_dom__);



// stateless component w/ params
const greeter = (name) => ["h1.title", "hello ", name];

// component w/ local state
const counter = () => {
    let i = 0;
    return () => ["button", { onclick: () => (i++) }, `clicks: ${i}`];
};

const app = () => {
    // instantiation
    const counters = [counter(), counter()];
    // root component is just a static array
    return ["div#app", [greeter, "world"], ...counters];
};

// browser only (see diagram below)
Object(__WEBPACK_IMPORTED_MODULE_1__thi_ng_hiccup_dom__["start"])(document.body, app());

// browser or server side serialization
// (note: does not emit event attributes w/ functions as values)
Object(__WEBPACK_IMPORTED_MODULE_0__thi_ng_hiccup__["serialize"])(app);
// <div id="app"><h1 class="title">hello world</h1><button>clicks: 0</button><button>clicks: 0</button></div>

console.log("hello world");


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(0));
__export(__webpack_require__(2));
__export(__webpack_require__(13));
__export(__webpack_require__(14));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __webpack_require__(0);
exports.escape = (x) => x.replace(api_1.ENTITY_RE, (y) => api_1.ENTITIES[y]);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const is_plain_object_1 = __webpack_require__(4);
const is_function_1 = __webpack_require__(3);
const is_string_1 = __webpack_require__(1);
const api_1 = __webpack_require__(0);
const css_1 = __webpack_require__(2);
/**
 * Recursively normalizes and serializes given tree as HTML/SVG/XML string.
 * Expands any embedded component functions with their results. Each node of the
 * input tree can have one of the following input forms:
 *
 * ```js
 * ["tag", ...]
 * ["tag#id.class1.class2", ...]
 * ["tag", {other: "attrib"}, ...]
 * ["tag", {...}, "body", function, ...]
 * [function, arg1, arg2, ...]
 * [iterable]
 * ```
 *
 * Tags can be defined in "Zencoding" convention, e.g.
 *
 * ```js
 * ["div#foo.bar.baz", "hi"] // <div id="foo" class="bar baz">hi</div>
 * ```
 *
 * The presence of the attributes object (2nd array index) is optional.
 * Any attribute values, incl. functions are allowed. If the latter,
 * the function is called with the full attribs object as argument and
 * MUST return a string. This allows for the dynamic creation of attrib
 * values based on other attribs.
 *
 * ```js
 * ["div#foo", {bar: (attribs) => attribs.id + "-bar"}]
 * // <div id="foo" bar="foo-bar"></div>
 * ```
 *
 * The `style` attribute can ONLY be defined as string or object.
 *
 * ```js
 * ["div", {style: {color: "red", background: "#000"}}]
 * // <div style="color:red;background:#000;"></div>
 * ```
 *
 * Boolean attribs are serialized in HTML5 syntax (present or not).
 * `null` or empty string attrib values are ignored.
 *
 * Any `null` or `undefined` array values (other than in head position)
 * will be removed, unless a function is in head position.
 *
 * A function in head position of a node acts as composition & delayed
 * execution mechanism and the function will only be executed at
 * serialization time. In this case all other elements of that node /
 * array are passed as arguments when that function is called.
 * The return value the function MUST be a valid new tree
 * (or `undefined`).
 *
 * ```js
 * const foo = (a, b) => ["div#" + a, b];
 *
 * [foo, "id", "body"] // <div id="id">body</div>
 * ```
 *
 * Functions located in other positions are called **without** args
 * and can return any (serializable) value (i.e. new trees, strings,
 * numbers, iterables or any type with a suitable `.toString()`
 * implementation).
 *
 * @param tree elements / component tree
 * @param escape auto-escape entities
 */
exports.serialize = (tree, escape = false) => _serialize(tree, escape);
const _serialize = (tree, esc) => {
    if (tree == null) {
        return "";
    }
    if (Array.isArray(tree)) {
        if (!tree.length) {
            return "";
        }
        let tag = tree[0];
        if (is_function_1.isFunction(tag)) {
            return _serialize(tag.apply(null, tree.slice(1)), esc);
        }
        if (is_string_1.isString(tag)) {
            tree = normalize(tree);
            tag = tree[0];
            let attribs = tree[1];
            let body = tree[2];
            let res = `<${tag}`;
            for (let a in attribs) {
                if (attribs.hasOwnProperty(a)) {
                    let v = attribs[a];
                    if (v != null) {
                        if (is_function_1.isFunction(v)) {
                            if (/^on\w+/.test(a) || (v = v(attribs)) == null) {
                                continue;
                            }
                        }
                        if (v === true) {
                            res += " " + a;
                        }
                        else if (v !== false) {
                            v = v.toString();
                            if (v.length) {
                                res += ` ${a}="${esc ? escape(v) : v}"`;
                            }
                        }
                    }
                }
            }
            if (body) {
                if (api_1.VOID_TAGS[tag]) {
                    throw new Error(`No body allowed in tag: ${tag}`);
                }
                res += ">";
                for (let i = 0, n = body.length; i < n; i++) {
                    res += _serialize(body[i], esc);
                }
                return res += `</${tag}>`;
            }
            else if (!api_1.VOID_TAGS[tag]) {
                return res += `></${tag}>`;
            }
            return res += "/>";
        }
        if (iter(tree)) {
            return _serializeIter(tree, esc);
        }
        throw new Error(`invalid tree node: ${tree}`);
    }
    if (is_function_1.isFunction(tree)) {
        return _serialize(tree(), esc);
    }
    if (iter(tree)) {
        return _serializeIter(tree, esc);
    }
    return esc ? escape(tree.toString()) : tree;
};
const _serializeIter = (iter, esc) => {
    const res = [];
    for (let i of iter) {
        res.push(_serialize(i, esc));
    }
    return res.join("");
};
const normalize = (tag) => {
    let el = tag[0], match, id, clazz;
    const attribs = {};
    if (!is_string_1.isString(el) || !(match = api_1.TAG_REGEXP.exec(el))) {
        throw new Error(`"${el}" is not a valid tag name`);
    }
    el = match[1];
    id = match[2];
    clazz = match[3];
    if (id) {
        attribs.id = id;
    }
    if (clazz) {
        attribs.class = clazz.replace(/\./g, " ");
    }
    if (tag.length > 1) {
        let i = 1;
        if (is_plain_object_1.isPlainObject(tag[1])) {
            Object.assign(attribs, tag[1]);
            i++;
        }
        if (is_plain_object_1.isPlainObject(attribs.style)) {
            attribs.style = css_1.css(attribs.style);
        }
        tag = tag.slice(i).filter((x) => x != null);
        if (tag.length > 0) {
            return [el, attribs, tag];
        }
    }
    return [el, attribs];
};
const iter = (x) => !is_string_1.isString(x) && x[Symbol.iterator] !== undefined;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));
__export(__webpack_require__(6));
__export(__webpack_require__(10));
__export(__webpack_require__(22));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(17));
__export(__webpack_require__(19));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const equiv_1 = __webpack_require__(9);
/**
 * Based on "An O(NP) Sequence Comparison Algorithm""
 * by Wu, Manber, Myers and Miller
 *
 * http://www.itu.dk/stud/speciale/bepjea/xwebtex/litt/an-onp-sequence-comparison-algorithm.pdf
 * https://github.com/cubicdaiya/onp
 *
 * Various optimizations, fixes & refactorings.
 * Uses `equiv` for equality checks.
 */
function diffArray(_a, _b) {
    const state = {
        distance: 0,
        adds: {},
        dels: {},
        const: {},
        linear: []
    };
    if (_a === _b) {
        return state;
    }
    const reverse = _a.length >= _b.length;
    const adds = state[reverse ? "dels" : "adds"];
    const dels = state[reverse ? "adds" : "dels"];
    const aID = reverse ? -1 : 1;
    const dID = reverse ? 1 : -1;
    let a, b, na, nb;
    if (reverse) {
        a = _b;
        b = _a;
    }
    else {
        a = _a;
        b = _b;
    }
    na = a.length;
    nb = b.length;
    const offset = na + 1;
    const delta = nb - na;
    const doff = delta + offset;
    const size = na + nb + 3;
    const path = new Array(size).fill(-1);
    const fp = new Array(size).fill(-1);
    const epc = [];
    const pathPos = [];
    function snake(k, p, pp) {
        const koff = k + offset;
        const r = path[koff + ((p > pp) ? -1 : 1)];
        let y = p > pp ? p : pp;
        let x = y - k;
        while (x < na && y < nb && equiv_1.equiv(a[x], b[y])) {
            x++;
            y++;
        }
        path[koff] = pathPos.length;
        pathPos.push([x, y, r]);
        return y;
    }
    let p = -1, pp;
    do {
        p++;
        for (let k = -p, ko = k + offset; k < delta; k++, ko++) {
            fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
        }
        for (let k = delta + p, ko = k + offset; k > delta; k--, ko--) {
            fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
        }
        fp[doff] = snake(delta, fp[doff - 1] + 1, fp[doff + 1]);
    } while (fp[doff] !== nb);
    state.distance = delta + 2 * p;
    let r = path[doff];
    while (r !== -1) {
        epc.push(pp = pathPos[r]);
        r = pp[2];
    }
    for (let i = epc.length - 1, px = 0, py = 0; i >= 0; i--) {
        const e = epc[i];
        let v;
        while (px < e[0] || py < e[1]) {
            const d = e[1] - e[0];
            if (d > py - px) {
                adds[py] = v = b[py];
                state.linear.push([aID, [py, v]]);
                py++;
            }
            else if (d < py - px) {
                dels[px] = v = a[px];
                state.linear.push([dID, [px, v]]);
                px++;
            }
            else {
                state.const[px] = v = a[px];
                state.linear.push([0, [px, v]]);
                px++;
                py++;
            }
        }
    }
    return state;
}
exports.diffArray = diffArray;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isArrayLike(x) {
    return Array.isArray(x) || (x != null && x.length !== undefined);
}
exports.isArrayLike = isArrayLike;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const equiv_1 = __webpack_require__(9);
function diffObject(a, b) {
    const adds = [];
    const dels = [];
    const edits = [];
    const keys = new Set(Object.keys(a).concat(Object.keys(b)));
    const state = { distance: 0, adds, dels, edits };
    if (a === b) {
        return state;
    }
    for (let k of keys) {
        const va = a[k];
        const vb = b[k];
        const hasA = va !== undefined;
        if (hasA && vb !== undefined) {
            if (!equiv_1.equiv(va, vb)) {
                edits.push([k, vb]);
                state.distance++;
            }
        }
        else {
            (hasA ? dels : adds).push(k);
            state.distance++;
        }
    }
    return state;
}
exports.diffObject = diffObject;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const iterator_1 = __webpack_require__(21);
function* map(fn, ...inputs) {
    let v;
    let n = inputs.length;
    switch (n) {
        case 0:
            return;
        case 1:
            let iter = iterator_1.iterator(inputs[0]);
            while (((v = iter.next()), !v.done)) {
                yield fn(v.value);
            }
            return;
        default:
            let iters = inputs.map(iterator_1.iterator);
            while (true) {
                let args = [];
                for (let i = 0; i < n; i++) {
                    v = iters[i].next();
                    if (v.done) {
                        return;
                    }
                    args.push(v.value);
                }
                yield fn.apply(null, args);
            }
    }
}
exports.map = map;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function iterator(x) {
    return x[Symbol.iterator]();
}
exports.iterator = iterator;
function maybeIterator(x) {
    return (x != null && x[Symbol.iterator] && x[Symbol.iterator]()) || undefined;
}
exports.maybeIterator = maybeIterator;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const is_string_1 = __webpack_require__(1);
const diff_1 = __webpack_require__(6);
/**
 * Takes a parent DOM element (or ID) and hiccup tree
 * (array or function) and starts RAF update loop,
 * computing diff to previous frame's tree and applying
 * any changes to the real DOM.
 *
 * Important: The parent element given is assumed to have NO
 * children at the time when `start()` is called. Since
 * hiccup-dom does NOT track the real DOM, the resulting
 * changes will result in potentially undefined behavior.
 *
 * Returns a function, which when called, immediately
 * cancels the update loop.
 *
 * @param parent
 * @param tree
 */
function start(parent, tree) {
    let prev = [];
    let isActive = true;
    parent = is_string_1.isString(parent) ?
        document.getElementById(parent) :
        parent;
    function update() {
        if (isActive) {
            diff_1.diffElement(parent, prev, prev = diff_1.normalizeTree(tree));
            // check again in case one of the components called cancel
            isActive && requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
    return () => (isActive = false);
}
exports.start = start;


/***/ })
/******/ ]);