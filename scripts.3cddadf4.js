// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/function-bind/implementation.js":[function(require,module,exports) {
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],"../../node_modules/function-bind/index.js":[function(require,module,exports) {
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":"../../node_modules/function-bind/implementation.js"}],"../../node_modules/object-keys/isArguments.js":[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
  var str = toStr.call(value);
  var isArgs = str === '[object Arguments]';

  if (!isArgs) {
    isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
  }

  return isArgs;
};
},{}],"../../node_modules/object-keys/implementation.js":[function(require,module,exports) {
'use strict';

var keysShim;

if (!Object.keys) {
  // modified from https://github.com/es-shims/es5-shim
  var has = Object.prototype.hasOwnProperty;
  var toStr = Object.prototype.toString;

  var isArgs = require('./isArguments'); // eslint-disable-line global-require


  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var hasDontEnumBug = !isEnumerable.call({
    toString: null
  }, 'toString');
  var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
  var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

  var equalsConstructorPrototype = function (o) {
    var ctor = o.constructor;
    return ctor && ctor.prototype === o;
  };

  var excludedKeys = {
    $applicationCache: true,
    $console: true,
    $external: true,
    $frame: true,
    $frameElement: true,
    $frames: true,
    $innerHeight: true,
    $innerWidth: true,
    $onmozfullscreenchange: true,
    $onmozfullscreenerror: true,
    $outerHeight: true,
    $outerWidth: true,
    $pageXOffset: true,
    $pageYOffset: true,
    $parent: true,
    $scrollLeft: true,
    $scrollTop: true,
    $scrollX: true,
    $scrollY: true,
    $self: true,
    $webkitIndexedDB: true,
    $webkitStorageInfo: true,
    $window: true
  };

  var hasAutomationEqualityBug = function () {
    /* global window */
    if (typeof window === 'undefined') {
      return false;
    }

    for (var k in window) {
      try {
        if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
          try {
            equalsConstructorPrototype(window[k]);
          } catch (e) {
            return true;
          }
        }
      } catch (e) {
        return true;
      }
    }

    return false;
  }();

  var equalsConstructorPrototypeIfNotBuggy = function (o) {
    /* global window */
    if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
      return equalsConstructorPrototype(o);
    }

    try {
      return equalsConstructorPrototype(o);
    } catch (e) {
      return false;
    }
  };

  keysShim = function keys(object) {
    var isObject = object !== null && typeof object === 'object';
    var isFunction = toStr.call(object) === '[object Function]';
    var isArguments = isArgs(object);
    var isString = isObject && toStr.call(object) === '[object String]';
    var theKeys = [];

    if (!isObject && !isFunction && !isArguments) {
      throw new TypeError('Object.keys called on a non-object');
    }

    var skipProto = hasProtoEnumBug && isFunction;

    if (isString && object.length > 0 && !has.call(object, 0)) {
      for (var i = 0; i < object.length; ++i) {
        theKeys.push(String(i));
      }
    }

    if (isArguments && object.length > 0) {
      for (var j = 0; j < object.length; ++j) {
        theKeys.push(String(j));
      }
    } else {
      for (var name in object) {
        if (!(skipProto && name === 'prototype') && has.call(object, name)) {
          theKeys.push(String(name));
        }
      }
    }

    if (hasDontEnumBug) {
      var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

      for (var k = 0; k < dontEnums.length; ++k) {
        if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
          theKeys.push(dontEnums[k]);
        }
      }
    }

    return theKeys;
  };
}

module.exports = keysShim;
},{"./isArguments":"../../node_modules/object-keys/isArguments.js"}],"../../node_modules/object-keys/index.js":[function(require,module,exports) {
'use strict';

var slice = Array.prototype.slice;

var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) {
  return origKeys(o);
} : require('./implementation');
var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
  if (Object.keys) {
    var keysWorksWithArguments = function () {
      // Safari 5.0 bug
      var args = Object.keys(arguments);
      return args && args.length === arguments.length;
    }(1, 2);

    if (!keysWorksWithArguments) {
      Object.keys = function keys(object) {
        // eslint-disable-line func-name-matching
        if (isArgs(object)) {
          return originalKeys(slice.call(object));
        }

        return originalKeys(object);
      };
    }
  } else {
    Object.keys = keysShim;
  }

  return Object.keys || keysShim;
};

module.exports = keysShim;
},{"./isArguments":"../../node_modules/object-keys/isArguments.js","./implementation":"../../node_modules/object-keys/implementation.js"}],"../../node_modules/define-properties/index.js":[function(require,module,exports) {
'use strict';

var keys = require('object-keys');

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';
var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
  return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
  var obj = {};

  try {
    origDefineProperty(obj, 'x', {
      enumerable: false,
      value: obj
    }); // eslint-disable-next-line no-unused-vars, no-restricted-syntax

    for (var _ in obj) {
      // jscs:ignore disallowUnusedVariables
      return false;
    }

    return obj.x === obj;
  } catch (e) {
    /* this is IE 8. */
    return false;
  }
};

var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
  if (name in object && (!isFunction(predicate) || !predicate())) {
    return;
  }

  if (supportsDescriptors) {
    origDefineProperty(object, name, {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    });
  } else {
    object[name] = value;
  }
};

var defineProperties = function (object, map) {
  var predicates = arguments.length > 2 ? arguments[2] : {};
  var props = keys(map);

  if (hasSymbols) {
    props = concat.call(props, Object.getOwnPropertySymbols(map));
  }

  for (var i = 0; i < props.length; i += 1) {
    defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
  }
};

defineProperties.supportsDescriptors = !!supportsDescriptors;
module.exports = defineProperties;
},{"object-keys":"../../node_modules/object-keys/index.js"}],"../../node_modules/string.prototype.trimleft/implementation.js":[function(require,module,exports) {
'use strict';

var bind = require('function-bind');

var replace = bind.call(Function.call, String.prototype.replace);
/* eslint-disable no-control-regex */

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*/;
/* eslint-enable no-control-regex */

module.exports = function trimLeft() {
  return replace(this, leftWhitespace, '');
};
},{"function-bind":"../../node_modules/function-bind/index.js"}],"../../node_modules/string.prototype.trimleft/polyfill.js":[function(require,module,exports) {
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
  if (!String.prototype.trimLeft) {
    return implementation;
  }

  var zeroWidthSpace = '\u200b';

  if (zeroWidthSpace.trimLeft() !== zeroWidthSpace) {
    return implementation;
  }

  return String.prototype.trimLeft;
};
},{"./implementation":"../../node_modules/string.prototype.trimleft/implementation.js"}],"../../node_modules/string.prototype.trimleft/shim.js":[function(require,module,exports) {

'use strict';

var define = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimTrimLeft() {
  var polyfill = getPolyfill();
  define(String.prototype, {
    trimLeft: polyfill
  }, {
    trimLeft: function () {
      return String.prototype.trimLeft !== polyfill;
    }
  });
  return polyfill;
};
},{"define-properties":"../../node_modules/define-properties/index.js","./polyfill":"../../node_modules/string.prototype.trimleft/polyfill.js"}],"../../node_modules/string.prototype.trimleft/index.js":[function(require,module,exports) {

'use strict';

var bind = require('function-bind');

var define = require('define-properties');

var implementation = require('./implementation');

var getPolyfill = require('./polyfill');

var shim = require('./shim');

var bound = bind.call(Function.call, getPolyfill());
define(bound, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim
});
module.exports = bound;
},{"function-bind":"../../node_modules/function-bind/index.js","define-properties":"../../node_modules/define-properties/index.js","./implementation":"../../node_modules/string.prototype.trimleft/implementation.js","./polyfill":"../../node_modules/string.prototype.trimleft/polyfill.js","./shim":"../../node_modules/string.prototype.trimleft/shim.js"}],"../../node_modules/string.prototype.trimright/implementation.js":[function(require,module,exports) {
'use strict';

var bind = require('function-bind');

var replace = bind.call(Function.call, String.prototype.replace);
/* eslint-disable no-control-regex */

var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*$/;
/* eslint-enable no-control-regex */

module.exports = function trimRight() {
  return replace(this, rightWhitespace, '');
};
},{"function-bind":"../../node_modules/function-bind/index.js"}],"../../node_modules/string.prototype.trimright/polyfill.js":[function(require,module,exports) {
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
  if (!String.prototype.trimRight) {
    return implementation;
  }

  var zeroWidthSpace = '\u200b';

  if (zeroWidthSpace.trimRight() !== zeroWidthSpace) {
    return implementation;
  }

  return String.prototype.trimRight;
};
},{"./implementation":"../../node_modules/string.prototype.trimright/implementation.js"}],"../../node_modules/string.prototype.trimright/shim.js":[function(require,module,exports) {

'use strict';

var define = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimTrimRight() {
  var polyfill = getPolyfill();
  define(String.prototype, {
    trimRight: polyfill
  }, {
    trimRight: function () {
      return String.prototype.trimRight !== polyfill;
    }
  });
  return polyfill;
};
},{"define-properties":"../../node_modules/define-properties/index.js","./polyfill":"../../node_modules/string.prototype.trimright/polyfill.js"}],"../../node_modules/string.prototype.trimright/index.js":[function(require,module,exports) {

'use strict';

var bind = require('function-bind');

var define = require('define-properties');

var implementation = require('./implementation');

var getPolyfill = require('./polyfill');

var shim = require('./shim');

var bound = bind.call(Function.call, getPolyfill());
define(bound, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim
});
module.exports = bound;
},{"function-bind":"../../node_modules/function-bind/index.js","define-properties":"../../node_modules/define-properties/index.js","./implementation":"../../node_modules/string.prototype.trimright/implementation.js","./polyfill":"../../node_modules/string.prototype.trimright/polyfill.js","./shim":"../../node_modules/string.prototype.trimright/shim.js"}],"../../node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../../node_modules/object-inspect/index.js":[function(require,module,exports) {
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;

var inspectCustom = require('./util.inspect').custom;
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') { // eslint-disable-line valid-typeof
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return '[Object]';
    }

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        return '[ ' + arrObjKeys(obj, inspect).join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object') {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var xs = arrObjKeys(obj, inspect);
        if (xs.length === 0) { return '{}'; }
        return '{ ' + xs.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]'; }
function isDate(obj) { return toStr(obj) === '[object Date]'; }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]'; }
function isError(obj) { return toStr(obj) === '[object Error]'; }
function isSymbol(obj) { return toStr(obj) === '[object Symbol]'; }
function isString(obj) { return toStr(obj) === '[object String]'; }
function isNumber(obj) { return toStr(obj) === '[object Number]'; }
function isBigInt(obj) { return toStr(obj) === '[object BigInt]'; }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]'; }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(f, /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries) {
    return type + ' (' + size + ') {' + entries.join(', ') + '}';
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    return xs;
}

},{"./util.inspect":"../../node_modules/parcel-bundler/src/builtins/_empty.js"}],"../../node_modules/has-symbols/shams.js":[function(require,module,exports) {
'use strict';
/* eslint complexity: [2, 18], max-statements: [2, 33] */

module.exports = function hasSymbols() {
  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
    return false;
  }

  if (typeof Symbol.iterator === 'symbol') {
    return true;
  }

  var obj = {};
  var sym = Symbol('test');
  var symObj = Object(sym);

  if (typeof sym === 'string') {
    return false;
  }

  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
    return false;
  }

  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
    return false;
  } // temp disabled per https://github.com/ljharb/object.assign/issues/17
  // if (sym instanceof Symbol) { return false; }
  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  // if (!(symObj instanceof Symbol)) { return false; }
  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


  var symVal = 42;
  obj[sym] = symVal;

  for (sym in obj) {
    return false;
  } // eslint-disable-line no-restricted-syntax


  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
    return false;
  }

  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }

  var syms = Object.getOwnPropertySymbols(obj);

  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }

  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }

  if (typeof Object.getOwnPropertyDescriptor === 'function') {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }

  return true;
};
},{}],"../../node_modules/has-symbols/index.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var origSymbol = global.Symbol;

var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') {
    return false;
  }

  if (typeof Symbol !== 'function') {
    return false;
  }

  if (typeof origSymbol('foo') !== 'symbol') {
    return false;
  }

  if (typeof Symbol('bar') !== 'symbol') {
    return false;
  }

  return hasSymbolSham();
};
},{"./shams":"../../node_modules/has-symbols/shams.js"}],"../../node_modules/es-abstract/GetIntrinsic.js":[function(require,module,exports) {
'use strict';
/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined;
var $TypeError = TypeError;
var $gOPD = Object.getOwnPropertyDescriptor;

var throwTypeError = function () {
  throw new $TypeError();
};

var ThrowTypeError = $gOPD ? function () {
  try {
    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
    arguments.callee; // IE 8 does not throw here

    return throwTypeError;
  } catch (calleeThrows) {
    try {
      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
      return $gOPD(arguments, 'callee').get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) {
  return x.__proto__;
}; // eslint-disable-line no-proto


var generator; // = function * () {};

var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};

var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};

var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;
var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);
var INTRINSICS = {
  '$ %Array%': Array,
  '$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
  '$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
  '$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
  '$ %ArrayPrototype%': Array.prototype,
  '$ %ArrayProto_entries%': Array.prototype.entries,
  '$ %ArrayProto_forEach%': Array.prototype.forEach,
  '$ %ArrayProto_keys%': Array.prototype.keys,
  '$ %ArrayProto_values%': Array.prototype.values,
  '$ %AsyncFromSyncIteratorPrototype%': undefined,
  '$ %AsyncFunction%': asyncFunction,
  '$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
  '$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
  '$ %AsyncGeneratorFunction%': asyncGenFunction,
  '$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
  '$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
  '$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
  '$ %Boolean%': Boolean,
  '$ %BooleanPrototype%': Boolean.prototype,
  '$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
  '$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
  '$ %Date%': Date,
  '$ %DatePrototype%': Date.prototype,
  '$ %decodeURI%': decodeURI,
  '$ %decodeURIComponent%': decodeURIComponent,
  '$ %encodeURI%': encodeURI,
  '$ %encodeURIComponent%': encodeURIComponent,
  '$ %Error%': Error,
  '$ %ErrorPrototype%': Error.prototype,
  '$ %eval%': eval,
  // eslint-disable-line no-eval
  '$ %EvalError%': EvalError,
  '$ %EvalErrorPrototype%': EvalError.prototype,
  '$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
  '$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
  '$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
  '$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
  '$ %Function%': Function,
  '$ %FunctionPrototype%': Function.prototype,
  '$ %Generator%': generator ? getProto(generator()) : undefined,
  '$ %GeneratorFunction%': generatorFunction,
  '$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
  '$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
  '$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
  '$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
  '$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
  '$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
  '$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
  '$ %isFinite%': isFinite,
  '$ %isNaN%': isNaN,
  '$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
  '$ %JSON%': typeof JSON === 'object' ? JSON : undefined,
  '$ %JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,
  '$ %Map%': typeof Map === 'undefined' ? undefined : Map,
  '$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
  '$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
  '$ %Math%': Math,
  '$ %Number%': Number,
  '$ %NumberPrototype%': Number.prototype,
  '$ %Object%': Object,
  '$ %ObjectPrototype%': Object.prototype,
  '$ %ObjProto_toString%': Object.prototype.toString,
  '$ %ObjProto_valueOf%': Object.prototype.valueOf,
  '$ %parseFloat%': parseFloat,
  '$ %parseInt%': parseInt,
  '$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
  '$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
  '$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
  '$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
  '$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
  '$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
  '$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
  '$ %RangeError%': RangeError,
  '$ %RangeErrorPrototype%': RangeError.prototype,
  '$ %ReferenceError%': ReferenceError,
  '$ %ReferenceErrorPrototype%': ReferenceError.prototype,
  '$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
  '$ %RegExp%': RegExp,
  '$ %RegExpPrototype%': RegExp.prototype,
  '$ %Set%': typeof Set === 'undefined' ? undefined : Set,
  '$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
  '$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
  '$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
  '$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
  '$ %String%': String,
  '$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
  '$ %StringPrototype%': String.prototype,
  '$ %Symbol%': hasSymbols ? Symbol : undefined,
  '$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
  '$ %SyntaxError%': SyntaxError,
  '$ %SyntaxErrorPrototype%': SyntaxError.prototype,
  '$ %ThrowTypeError%': ThrowTypeError,
  '$ %TypedArray%': TypedArray,
  '$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
  '$ %TypeError%': $TypeError,
  '$ %TypeErrorPrototype%': $TypeError.prototype,
  '$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
  '$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
  '$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
  '$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
  '$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
  '$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
  '$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
  '$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
  '$ %URIError%': URIError,
  '$ %URIErrorPrototype%': URIError.prototype,
  '$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
  '$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
  '$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
  '$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = require('function-bind');

var $replace = bind.call(Function.call, String.prototype.replace);
/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
/** Used to match backslashes in property paths. */

var stringToPath = function stringToPath(string) {
  var result = [];
  $replace(string, rePropName, function (match, number, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
  });
  return result;
};
/* end adaptation */


var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  var key = '$ ' + name;

  if (!(key in INTRINSICS)) {
    throw new SyntaxError('intrinsic ' + name + ' does not exist!');
  } // istanbul ignore if // hopefully this is impossible to test :-)


  if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
    throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
  }

  return INTRINSICS[key];
};

module.exports = function GetIntrinsic(name, allowMissing) {
  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    throw new TypeError('"allowMissing" argument must be a boolean');
  }

  var parts = stringToPath(name);

  if (parts.length === 0) {
    return getBaseIntrinsic(name, allowMissing);
  }

  var value = getBaseIntrinsic('%' + parts[0] + '%', allowMissing);

  for (var i = 1; i < parts.length; i += 1) {
    if (value != null) {
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, parts[i]);
        value = desc ? desc.get || desc.value : value[parts[i]];
      } else {
        value = value[parts[i]];
      }
    }
  }

  return value;
};
},{"has-symbols":"../../node_modules/has-symbols/index.js","function-bind":"../../node_modules/function-bind/index.js"}],"../../node_modules/has/src/index.js":[function(require,module,exports) {
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
},{"function-bind":"../../node_modules/function-bind/index.js"}],"../../node_modules/es-to-primitive/helpers/isPrimitive.js":[function(require,module,exports) {
'use strict';

module.exports = function isPrimitive(value) {
  return value === null || typeof value !== 'function' && typeof value !== 'object';
};
},{}],"../../node_modules/is-callable/index.js":[function(require,module,exports) {
'use strict';

var fnToStr = Function.prototype.toString;
var constructorRegex = /^\s*class\b/;

var isES6ClassFn = function isES6ClassFunction(value) {
  try {
    var fnStr = fnToStr.call(value);
    return constructorRegex.test(fnStr);
  } catch (e) {
    return false; // not a function
  }
};

var tryFunctionObject = function tryFunctionToStr(value) {
  try {
    if (isES6ClassFn(value)) {
      return false;
    }

    fnToStr.call(value);
    return true;
  } catch (e) {
    return false;
  }
};

var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
  if (!value) {
    return false;
  }

  if (typeof value !== 'function' && typeof value !== 'object') {
    return false;
  }

  if (typeof value === 'function' && !value.prototype) {
    return true;
  }

  if (hasToStringTag) {
    return tryFunctionObject(value);
  }

  if (isES6ClassFn(value)) {
    return false;
  }

  var strClass = toStr.call(value);
  return strClass === fnClass || strClass === genClass;
};
},{}],"../../node_modules/is-date-object/index.js":[function(require,module,exports) {
'use strict';

var getDay = Date.prototype.getDay;

var tryDateObject = function tryDateObject(value) {
  try {
    getDay.call(value);
    return true;
  } catch (e) {
    return false;
  }
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};
},{}],"../../node_modules/is-symbol/index.js":[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;

var hasSymbols = require('has-symbols')();

if (hasSymbols) {
  var symToStr = Symbol.prototype.toString;
  var symStringRegex = /^Symbol\(.*\)$/;

  var isSymbolObject = function isRealSymbolObject(value) {
    if (typeof value.valueOf() !== 'symbol') {
      return false;
    }

    return symStringRegex.test(symToStr.call(value));
  };

  module.exports = function isSymbol(value) {
    if (typeof value === 'symbol') {
      return true;
    }

    if (toStr.call(value) !== '[object Symbol]') {
      return false;
    }

    try {
      return isSymbolObject(value);
    } catch (e) {
      return false;
    }
  };
} else {
  module.exports = function isSymbol(value) {
    // this environment does not support Symbols.
    return false && value;
  };
}
},{"has-symbols":"../../node_modules/has-symbols/index.js"}],"../../node_modules/es-to-primitive/es2015.js":[function(require,module,exports) {
'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

var isDate = require('is-date-object');

var isSymbol = require('is-symbol');

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
  if (typeof O === 'undefined' || O === null) {
    throw new TypeError('Cannot call method on ' + O);
  }

  if (typeof hint !== 'string' || hint !== 'number' && hint !== 'string') {
    throw new TypeError('hint must be "string" or "number"');
  }

  var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
  var method, result, i;

  for (i = 0; i < methodNames.length; ++i) {
    method = O[methodNames[i]];

    if (isCallable(method)) {
      result = method.call(O);

      if (isPrimitive(result)) {
        return result;
      }
    }
  }

  throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
  var func = O[P];

  if (func !== null && typeof func !== 'undefined') {
    if (!isCallable(func)) {
      throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
    }

    return func;
  }

  return void 0;
}; // http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive


module.exports = function ToPrimitive(input) {
  if (isPrimitive(input)) {
    return input;
  }

  var hint = 'default';

  if (arguments.length > 1) {
    if (arguments[1] === String) {
      hint = 'string';
    } else if (arguments[1] === Number) {
      hint = 'number';
    }
  }

  var exoticToPrim;

  if (hasSymbols) {
    if (Symbol.toPrimitive) {
      exoticToPrim = GetMethod(input, Symbol.toPrimitive);
    } else if (isSymbol(input)) {
      exoticToPrim = Symbol.prototype.valueOf;
    }
  }

  if (typeof exoticToPrim !== 'undefined') {
    var result = exoticToPrim.call(input, hint);

    if (isPrimitive(result)) {
      return result;
    }

    throw new TypeError('unable to convert exotic object to primitive');
  }

  if (hint === 'default' && (isDate(input) || isSymbol(input))) {
    hint = 'string';
  }

  return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};
},{"./helpers/isPrimitive":"../../node_modules/es-to-primitive/helpers/isPrimitive.js","is-callable":"../../node_modules/is-callable/index.js","is-date-object":"../../node_modules/is-date-object/index.js","is-symbol":"../../node_modules/is-symbol/index.js"}],"../../node_modules/es-to-primitive/es6.js":[function(require,module,exports) {
'use strict';

module.exports = require('./es2015');
},{"./es2015":"../../node_modules/es-to-primitive/es2015.js"}],"../../node_modules/es-abstract/helpers/assertRecord.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
  // https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
  'Property Descriptor': function isPropertyDescriptor(ES, Desc) {
    if (ES.Type(Desc) !== 'Object') {
      return false;
    }

    var allowed = {
      '[[Configurable]]': true,
      '[[Enumerable]]': true,
      '[[Get]]': true,
      '[[Set]]': true,
      '[[Value]]': true,
      '[[Writable]]': true
    };

    for (var key in Desc) {
      // eslint-disable-line
      if (has(Desc, key) && !allowed[key]) {
        return false;
      }
    }

    var isData = has(Desc, '[[Value]]');
    var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');

    if (isData && IsAccessor) {
      throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
    }

    return true;
  }
};

module.exports = function assertRecord(ES, recordType, argumentName, value) {
  var predicate = predicates[recordType];

  if (typeof predicate !== 'function') {
    throw new $SyntaxError('unknown record type: ' + recordType);
  }

  if (!predicate(ES, value)) {
    throw new $TypeError(argumentName + ' must be a ' + recordType);
  }
};
},{"../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","has":"../../node_modules/has/src/index.js"}],"../../node_modules/es-abstract/helpers/isNaN.js":[function(require,module,exports) {
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
  return a !== a;
};
},{}],"../../node_modules/es-abstract/helpers/isFinite.js":[function(require,module,exports) {
'use strict';

var $isNaN = Number.isNaN || function (a) {
  return a !== a;
};

module.exports = Number.isFinite || function (x) {
  return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
};
},{}],"../../node_modules/es-abstract/helpers/maxSafeInteger.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $Math = GetIntrinsic('%Math%');
var $Number = GetIntrinsic('%Number%');
module.exports = $Number.MAX_SAFE_INTEGER || $Math.pow(2, 53) - 1;
},{"../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js"}],"../../node_modules/es-abstract/helpers/assign.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var has = require('has');

var $assign = GetIntrinsic('%Object%').assign;

module.exports = function assign(target, source) {
  if ($assign) {
    return $assign(target, source);
  } // eslint-disable-next-line no-restricted-syntax


  for (var key in source) {
    if (has(source, key)) {
      // eslint-disable-next-line no-param-reassign
      target[key] = source[key];
    }
  }

  return target;
};
},{"../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","has":"../../node_modules/has/src/index.js"}],"../../node_modules/es-abstract/helpers/sign.js":[function(require,module,exports) {
'use strict';

module.exports = function sign(number) {
  return number >= 0 ? 1 : -1;
};
},{}],"../../node_modules/es-abstract/helpers/mod.js":[function(require,module,exports) {
'use strict';

module.exports = function mod(number, modulo) {
  var remain = number % modulo;
  return Math.floor(remain >= 0 ? remain : remain + modulo);
};
},{}],"../../node_modules/es-abstract/helpers/isPrimitive.js":[function(require,module,exports) {
'use strict';

module.exports = function isPrimitive(value) {
  return value === null || typeof value !== 'function' && typeof value !== 'object';
};
},{}],"../../node_modules/es-abstract/helpers/forEach.js":[function(require,module,exports) {
'use strict';

module.exports = function forEach(array, callback) {
  for (var i = 0; i < array.length; i += 1) {
    callback(array[i], i, array); // eslint-disable-line callback-return
  }
};
},{}],"../../node_modules/es-abstract/helpers/every.js":[function(require,module,exports) {
'use strict';

module.exports = function every(array, predicate) {
  for (var i = 0; i < array.length; i += 1) {
    if (!predicate(array[i], i, array)) {
      return false;
    }
  }

  return true;
};
},{}],"../../node_modules/es-abstract/helpers/isSamePropertyDescriptor.js":[function(require,module,exports) {
'use strict';

var every = require('./every');

module.exports = function isSamePropertyDescriptor(ES, D1, D2) {
  var fields = ['[[Configurable]]', '[[Enumerable]]', '[[Get]]', '[[Set]]', '[[Value]]', '[[Writable]]'];
  return every(fields, function (field) {
    if (field in D1 !== field in D2) {
      return false;
    }

    return ES.SameValue(D1[field], D2[field]);
  });
};
},{"./every":"../../node_modules/es-abstract/helpers/every.js"}],"../../node_modules/es-abstract/helpers/isPropertyDescriptor.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var has = require('has');

var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
  if (ES.Type(Desc) !== 'Object') {
    return false;
  }

  var allowed = {
    '[[Configurable]]': true,
    '[[Enumerable]]': true,
    '[[Get]]': true,
    '[[Set]]': true,
    '[[Value]]': true,
    '[[Writable]]': true
  };

  for (var key in Desc) {
    // eslint-disable-line
    if (has(Desc, key) && !allowed[key]) {
      return false;
    }
  }

  if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
    throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
  }

  return true;
};
},{"../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","has":"../../node_modules/has/src/index.js"}],"../../node_modules/es-abstract/helpers/callBind.js":[function(require,module,exports) {
'use strict';

var bind = require('function-bind');

var GetIntrinsic = require('../GetIntrinsic');

var $Function = GetIntrinsic('%Function%');
var $apply = $Function.apply;
var $call = $Function.call;

module.exports = function callBind() {
  return bind.apply($call, arguments);
};

module.exports.apply = function applyBind() {
  return bind.apply($apply, arguments);
};
},{"function-bind":"../../node_modules/function-bind/index.js","../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js"}],"../../node_modules/es-abstract/helpers/callBound.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var callBind = require('./callBind');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic(name, !!allowMissing);

  if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
    return callBind(intrinsic);
  }

  return intrinsic;
};
},{"../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","./callBind":"../../node_modules/es-abstract/helpers/callBind.js"}],"../../node_modules/es-abstract/helpers/regexTester.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $test = GetIntrinsic('RegExp.prototype.test');

var callBind = require('./callBind');

module.exports = function regexTester(regex) {
  return callBind($test, regex);
};
},{"../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","./callBind":"../../node_modules/es-abstract/helpers/callBind.js"}],"../../node_modules/es-abstract/helpers/getIteratorMethod.js":[function(require,module,exports) {
'use strict';

var hasSymbols = require('has-symbols')();

var GetIntrinsic = require('../GetIntrinsic');

var callBound = require('./callBound');

var $iterator = GetIntrinsic('%Symbol.iterator%', true);
var $stringSlice = callBound('String.prototype.slice');

module.exports = function getIteratorMethod(ES, iterable) {
  var usingIterator;

  if (hasSymbols) {
    usingIterator = ES.GetMethod(iterable, $iterator);
  } else if (ES.IsArray(iterable)) {
    usingIterator = function () {
      var i = -1;
      var arr = this; // eslint-disable-line no-invalid-this

      return {
        next: function () {
          i += 1;
          return {
            done: i >= arr.length,
            value: arr[i]
          };
        }
      };
    };
  } else if (ES.Type(iterable) === 'String') {
    usingIterator = function () {
      var i = 0;
      return {
        next: function () {
          var nextIndex = ES.AdvanceStringIndex(iterable, i, true);
          var value = $stringSlice(iterable, i, nextIndex);
          i = nextIndex;
          return {
            done: nextIndex > iterable.length,
            value: value
          };
        }
      };
    };
  }

  return usingIterator;
};
},{"has-symbols":"../../node_modules/has-symbols/index.js","../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","./callBound":"../../node_modules/es-abstract/helpers/callBound.js"}],"../../node_modules/es-abstract/helpers/getInferredName.js":[function(require,module,exports) {
'use strict';

var getInferredName;

try {
  // eslint-disable-next-line no-new-func
  getInferredName = Function('s', 'return { [s]() {} }[s].name;');
} catch (e) {}

var inferred = function () {};

module.exports = getInferredName && inferred.name === 'inferred' ? getInferredName : null;
},{}],"../../node_modules/es-abstract/helpers/getSymbolDescription.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var callBound = require('./callBound');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var symToStr = callBound('Symbol.prototype.toString', true);

var getInferredName = require('./getInferredName');

module.exports = function getSymbolDescription(symbol) {
  if (!symToStr) {
    throw new $SyntaxError('Symbols are not supported in this environment');
  }

  var str = symToStr(symbol); // will throw if not a symbol

  if (getInferredName) {
    var name = getInferredName(symbol);

    if (name === '') {
      return;
    } // eslint-disable-next-line consistent-return


    return name.slice(1, -1); // name.slice('['.length, -']'.length);
  }

  var desc = str.slice(7, -1); // str.slice('Symbol('.length, -')'.length);

  if (desc) {
    // eslint-disable-next-line consistent-return
    return desc;
  }
};
},{"../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","./callBound":"../../node_modules/es-abstract/helpers/callBound.js","./getInferredName":"../../node_modules/es-abstract/helpers/getInferredName.js"}],"../../node_modules/es-abstract/helpers/setProto.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var originalSetProto = GetIntrinsic('%Object.setPrototypeOf%', true);
var $ArrayProto = GetIntrinsic('%Array.prototype%');
module.exports = originalSetProto || ( // eslint-disable-next-line no-proto, no-negated-condition
[].__proto__ !== $ArrayProto ? null : function (O, proto) {
  O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign

  return O;
});
},{"../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js"}],"../../node_modules/es-abstract/helpers/isPrefixOf.js":[function(require,module,exports) {
'use strict';

var $strSlice = require('../helpers/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
  if (prefix === string) {
    return true;
  }

  if (prefix.length > string.length) {
    return false;
  }

  return $strSlice(string, 0, prefix.length) === prefix;
};
},{"../helpers/callBound":"../../node_modules/es-abstract/helpers/callBound.js"}],"../../node_modules/es-to-primitive/es5.js":[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable'); // http://ecma-international.org/ecma-262/5.1/#sec-8.12.8


var ES5internalSlots = {
  '[[DefaultValue]]': function (O) {
    var actualHint;

    if (arguments.length > 1) {
      actualHint = arguments[1];
    } else {
      actualHint = toStr.call(O) === '[object Date]' ? String : Number;
    }

    if (actualHint === String || actualHint === Number) {
      var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
      var value, i;

      for (i = 0; i < methods.length; ++i) {
        if (isCallable(O[methods[i]])) {
          value = O[methods[i]]();

          if (isPrimitive(value)) {
            return value;
          }
        }
      }

      throw new TypeError('No default value');
    }

    throw new TypeError('invalid [[DefaultValue]] hint supplied');
  }
}; // http://ecma-international.org/ecma-262/5.1/#sec-9.1

module.exports = function ToPrimitive(input) {
  if (isPrimitive(input)) {
    return input;
  }

  if (arguments.length > 1) {
    return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
  }

  return ES5internalSlots['[[DefaultValue]]'](input);
};
},{"./helpers/isPrimitive":"../../node_modules/es-to-primitive/helpers/isPrimitive.js","is-callable":"../../node_modules/is-callable/index.js"}],"../../node_modules/es-abstract/es5.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var $Object = GetIntrinsic('%Object%');
var $EvalError = GetIntrinsic('%EvalError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');
var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');
var $floor = GetIntrinsic('%Math.floor%');
var $DateUTC = GetIntrinsic('%Date.UTC%');
var $abs = GetIntrinsic('%Math.abs%');

var assertRecord = require('./helpers/assertRecord');

var isPropertyDescriptor = require('./helpers/isPropertyDescriptor');

var $isNaN = require('./helpers/isNaN');

var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');

var mod = require('./helpers/mod');

var isPrefixOf = require('./helpers/isPrefixOf');

var callBound = require('./helpers/callBound');

var IsCallable = require('is-callable');

var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');
var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000; // https://es5.github.io/#x9

var ES5 = {
  ToPrimitive: toPrimitive,
  ToBoolean: function ToBoolean(value) {
    return !!value;
  },
  ToNumber: function ToNumber(value) {
    return +value; // eslint-disable-line no-implicit-coercion
  },
  ToInteger: function ToInteger(value) {
    var number = this.ToNumber(value);

    if ($isNaN(number)) {
      return 0;
    }

    if (number === 0 || !$isFinite(number)) {
      return number;
    }

    return sign(number) * Math.floor(Math.abs(number));
  },
  ToInt32: function ToInt32(x) {
    return this.ToNumber(x) >> 0;
  },
  ToUint32: function ToUint32(x) {
    return this.ToNumber(x) >>> 0;
  },
  ToUint16: function ToUint16(value) {
    var number = this.ToNumber(value);

    if ($isNaN(number) || number === 0 || !$isFinite(number)) {
      return 0;
    }

    var posInt = sign(number) * Math.floor(Math.abs(number));
    return mod(posInt, 0x10000);
  },
  ToString: function ToString(value) {
    return $String(value);
  },
  ToObject: function ToObject(value) {
    this.CheckObjectCoercible(value);
    return $Object(value);
  },
  CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
    /* jshint eqnull:true */
    if (value == null) {
      throw new $TypeError(optMessage || 'Cannot call method on ' + value);
    }

    return value;
  },
  IsCallable: IsCallable,
  SameValue: function SameValue(x, y) {
    if (x === y) {
      // 0 === -0, but they are not identical.
      if (x === 0) {
        return 1 / x === 1 / y;
      }

      return true;
    }

    return $isNaN(x) && $isNaN(y);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-8
  Type: function Type(x) {
    if (x === null) {
      return 'Null';
    }

    if (typeof x === 'undefined') {
      return 'Undefined';
    }

    if (typeof x === 'function' || typeof x === 'object') {
      return 'Object';
    }

    if (typeof x === 'number') {
      return 'Number';
    }

    if (typeof x === 'boolean') {
      return 'Boolean';
    }

    if (typeof x === 'string') {
      return 'String';
    }
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
  IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
    return isPropertyDescriptor(this, Desc);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
  IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
    if (typeof Desc === 'undefined') {
      return false;
    }

    assertRecord(this, 'Property Descriptor', 'Desc', Desc);

    if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
      return false;
    }

    return true;
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
  IsDataDescriptor: function IsDataDescriptor(Desc) {
    if (typeof Desc === 'undefined') {
      return false;
    }

    assertRecord(this, 'Property Descriptor', 'Desc', Desc);

    if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
      return false;
    }

    return true;
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
  IsGenericDescriptor: function IsGenericDescriptor(Desc) {
    if (typeof Desc === 'undefined') {
      return false;
    }

    assertRecord(this, 'Property Descriptor', 'Desc', Desc);

    if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
      return true;
    }

    return false;
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
  FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
    if (typeof Desc === 'undefined') {
      return Desc;
    }

    assertRecord(this, 'Property Descriptor', 'Desc', Desc);

    if (this.IsDataDescriptor(Desc)) {
      return {
        value: Desc['[[Value]]'],
        writable: !!Desc['[[Writable]]'],
        enumerable: !!Desc['[[Enumerable]]'],
        configurable: !!Desc['[[Configurable]]']
      };
    } else if (this.IsAccessorDescriptor(Desc)) {
      return {
        get: Desc['[[Get]]'],
        set: Desc['[[Set]]'],
        enumerable: !!Desc['[[Enumerable]]'],
        configurable: !!Desc['[[Configurable]]']
      };
    } else {
      throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
    }
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
  ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
    if (this.Type(Obj) !== 'Object') {
      throw new $TypeError('ToPropertyDescriptor requires an object');
    }

    var desc = {};

    if (has(Obj, 'enumerable')) {
      desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
    }

    if (has(Obj, 'configurable')) {
      desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
    }

    if (has(Obj, 'value')) {
      desc['[[Value]]'] = Obj.value;
    }

    if (has(Obj, 'writable')) {
      desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
    }

    if (has(Obj, 'get')) {
      var getter = Obj.get;

      if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
        throw new TypeError('getter must be a function');
      }

      desc['[[Get]]'] = getter;
    }

    if (has(Obj, 'set')) {
      var setter = Obj.set;

      if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
        throw new $TypeError('setter must be a function');
      }

      desc['[[Set]]'] = setter;
    }

    if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
      throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
    }

    return desc;
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-11.9.3
  'Abstract Equality Comparison': function AbstractEqualityComparison(x, y) {
    var xType = this.Type(x);
    var yType = this.Type(y);

    if (xType === yType) {
      return x === y; // ES6+ specified this shortcut anyways.
    }

    if (x == null && y == null) {
      return true;
    }

    if (xType === 'Number' && yType === 'String') {
      return this['Abstract Equality Comparison'](x, this.ToNumber(y));
    }

    if (xType === 'String' && yType === 'Number') {
      return this['Abstract Equality Comparison'](this.ToNumber(x), y);
    }

    if (xType === 'Boolean') {
      return this['Abstract Equality Comparison'](this.ToNumber(x), y);
    }

    if (yType === 'Boolean') {
      return this['Abstract Equality Comparison'](x, this.ToNumber(y));
    }

    if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
      return this['Abstract Equality Comparison'](x, this.ToPrimitive(y));
    }

    if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
      return this['Abstract Equality Comparison'](this.ToPrimitive(x), y);
    }

    return false;
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-11.9.6
  'Strict Equality Comparison': function StrictEqualityComparison(x, y) {
    var xType = this.Type(x);
    var yType = this.Type(y);

    if (xType !== yType) {
      return false;
    }

    if (xType === 'Undefined' || xType === 'Null') {
      return true;
    }

    return x === y; // shortcut for steps 4-7
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-11.8.5
  // eslint-disable-next-line max-statements
  'Abstract Relational Comparison': function AbstractRelationalComparison(x, y, LeftFirst) {
    if (this.Type(LeftFirst) !== 'Boolean') {
      throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
    }

    var px;
    var py;

    if (LeftFirst) {
      px = this.ToPrimitive(x, $Number);
      py = this.ToPrimitive(y, $Number);
    } else {
      py = this.ToPrimitive(y, $Number);
      px = this.ToPrimitive(x, $Number);
    }

    var bothStrings = this.Type(px) === 'String' && this.Type(py) === 'String';

    if (!bothStrings) {
      var nx = this.ToNumber(px);
      var ny = this.ToNumber(py);

      if ($isNaN(nx) || $isNaN(ny)) {
        return undefined;
      }

      if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
        return false;
      }

      if (nx === 0 && ny === 0) {
        return false;
      }

      if (nx === Infinity) {
        return false;
      }

      if (ny === Infinity) {
        return true;
      }

      if (ny === -Infinity) {
        return false;
      }

      if (nx === -Infinity) {
        return true;
      }

      return nx < ny; // by now, these are both nonzero, finite, and not equal
    }

    if (isPrefixOf(py, px)) {
      return false;
    }

    if (isPrefixOf(px, py)) {
      return true;
    }

    return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
  msFromTime: function msFromTime(t) {
    return mod(t, msPerSecond);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
  SecFromTime: function SecFromTime(t) {
    return mod($floor(t / msPerSecond), SecondsPerMinute);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
  MinFromTime: function MinFromTime(t) {
    return mod($floor(t / msPerMinute), MinutesPerHour);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
  HourFromTime: function HourFromTime(t) {
    return mod($floor(t / msPerHour), HoursPerDay);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
  Day: function Day(t) {
    return $floor(t / msPerDay);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
  TimeWithinDay: function TimeWithinDay(t) {
    return mod(t, msPerDay);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
  DayFromYear: function DayFromYear(y) {
    return 365 * (y - 1970) + $floor((y - 1969) / 4) - $floor((y - 1901) / 100) + $floor((y - 1601) / 400);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
  TimeFromYear: function TimeFromYear(y) {
    return msPerDay * this.DayFromYear(y);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
  YearFromTime: function YearFromTime(t) {
    // largest y such that this.TimeFromYear(y) <= t
    return $getUTCFullYear(new $Date(t));
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.6
  WeekDay: function WeekDay(t) {
    return mod(this.Day(t) + 4, 7);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
  DaysInYear: function DaysInYear(y) {
    if (mod(y, 4) !== 0) {
      return 365;
    }

    if (mod(y, 100) !== 0) {
      return 366;
    }

    if (mod(y, 400) !== 0) {
      return 365;
    }

    return 366;
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
  InLeapYear: function InLeapYear(t) {
    var days = this.DaysInYear(this.YearFromTime(t));

    if (days === 365) {
      return 0;
    }

    if (days === 366) {
      return 1;
    }

    throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
  DayWithinYear: function DayWithinYear(t) {
    return this.Day(t) - this.DayFromYear(this.YearFromTime(t));
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
  MonthFromTime: function MonthFromTime(t) {
    var day = this.DayWithinYear(t);

    if (0 <= day && day < 31) {
      return 0;
    }

    var leap = this.InLeapYear(t);

    if (31 <= day && day < 59 + leap) {
      return 1;
    }

    if (59 + leap <= day && day < 90 + leap) {
      return 2;
    }

    if (90 + leap <= day && day < 120 + leap) {
      return 3;
    }

    if (120 + leap <= day && day < 151 + leap) {
      return 4;
    }

    if (151 + leap <= day && day < 181 + leap) {
      return 5;
    }

    if (181 + leap <= day && day < 212 + leap) {
      return 6;
    }

    if (212 + leap <= day && day < 243 + leap) {
      return 7;
    }

    if (243 + leap <= day && day < 273 + leap) {
      return 8;
    }

    if (273 + leap <= day && day < 304 + leap) {
      return 9;
    }

    if (304 + leap <= day && day < 334 + leap) {
      return 10;
    }

    if (334 + leap <= day && day < 365 + leap) {
      return 11;
    }
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.5
  DateFromTime: function DateFromTime(t) {
    var m = this.MonthFromTime(t);
    var d = this.DayWithinYear(t);

    if (m === 0) {
      return d + 1;
    }

    if (m === 1) {
      return d - 30;
    }

    var leap = this.InLeapYear(t);

    if (m === 2) {
      return d - 58 - leap;
    }

    if (m === 3) {
      return d - 89 - leap;
    }

    if (m === 4) {
      return d - 119 - leap;
    }

    if (m === 5) {
      return d - 150 - leap;
    }

    if (m === 6) {
      return d - 180 - leap;
    }

    if (m === 7) {
      return d - 211 - leap;
    }

    if (m === 8) {
      return d - 242 - leap;
    }

    if (m === 9) {
      return d - 272 - leap;
    }

    if (m === 10) {
      return d - 303 - leap;
    }

    if (m === 11) {
      return d - 333 - leap;
    }

    throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.12
  MakeDay: function MakeDay(year, month, date) {
    if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
      return NaN;
    }

    var y = this.ToInteger(year);
    var m = this.ToInteger(month);
    var dt = this.ToInteger(date);
    var ym = y + $floor(m / 12);
    var mn = mod(m, 12);
    var t = $DateUTC(ym, mn, 1);

    if (this.YearFromTime(t) !== ym || this.MonthFromTime(t) !== mn || this.DateFromTime(t) !== 1) {
      return NaN;
    }

    return this.Day(t) + dt - 1;
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.13
  MakeDate: function MakeDate(day, time) {
    if (!$isFinite(day) || !$isFinite(time)) {
      return NaN;
    }

    return day * msPerDay + time;
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.11
  MakeTime: function MakeTime(hour, min, sec, ms) {
    if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
      return NaN;
    }

    var h = this.ToInteger(hour);
    var m = this.ToInteger(min);
    var s = this.ToInteger(sec);
    var milli = this.ToInteger(ms);
    var t = h * msPerHour + m * msPerMinute + s * msPerSecond + milli;
    return t;
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.14
  TimeClip: function TimeClip(time) {
    if (!$isFinite(time) || $abs(time) > 8.64e15) {
      return NaN;
    }

    return $Number(new $Date(this.ToNumber(time)));
  },
  // https://ecma-international.org/ecma-262/5.1/#sec-5.2
  modulo: function modulo(x, y) {
    return mod(x, y);
  }
};
module.exports = ES5;
},{"./GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","./helpers/assertRecord":"../../node_modules/es-abstract/helpers/assertRecord.js","./helpers/isPropertyDescriptor":"../../node_modules/es-abstract/helpers/isPropertyDescriptor.js","./helpers/isNaN":"../../node_modules/es-abstract/helpers/isNaN.js","./helpers/isFinite":"../../node_modules/es-abstract/helpers/isFinite.js","./helpers/sign":"../../node_modules/es-abstract/helpers/sign.js","./helpers/mod":"../../node_modules/es-abstract/helpers/mod.js","./helpers/isPrefixOf":"../../node_modules/es-abstract/helpers/isPrefixOf.js","./helpers/callBound":"../../node_modules/es-abstract/helpers/callBound.js","is-callable":"../../node_modules/is-callable/index.js","es-to-primitive/es5":"../../node_modules/es-to-primitive/es5.js","has":"../../node_modules/has/src/index.js"}],"../../node_modules/is-regex/index.js":[function(require,module,exports) {
'use strict';

var has = require('has');

var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
  try {
    var lastIndex = value.lastIndex;
    value.lastIndex = 0;
    regexExec.call(value);
    return true;
  } catch (e) {
    return false;
  } finally {
    value.lastIndex = lastIndex;
  }
};

var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
  if (!value || typeof value !== 'object') {
    return false;
  }

  if (!hasToStringTag) {
    return toStr.call(value) === regexClass;
  }

  var descriptor = gOPD(value, 'lastIndex');
  var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');

  if (!hasLastIndexDataProperty) {
    return false;
  }

  return tryRegexExecCall(value);
};
},{"has":"../../node_modules/has/src/index.js"}],"../../node_modules/es-abstract/es2015.js":[function(require,module,exports) {
'use strict';

var has = require('has');

var toPrimitive = require('es-to-primitive/es6');

var keys = require('object-keys');

var inspect = require('object-inspect');

var GetIntrinsic = require('./GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $RangeError = GetIntrinsic('%RangeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $Array = GetIntrinsic('%Array%');
var $ArrayPrototype = $Array.prototype;
var $String = GetIntrinsic('%String%');
var $Object = GetIntrinsic('%Object%');
var $Number = GetIntrinsic('%Number%');
var $Symbol = GetIntrinsic('%Symbol%', true);
var $RegExp = GetIntrinsic('%RegExp%');
var $Date = GetIntrinsic('%Date%');
var $Function = GetIntrinsic('%Function%');
var $preventExtensions = $Object.preventExtensions;

var hasSymbols = require('has-symbols')();

var assertRecord = require('./helpers/assertRecord');

var $isNaN = require('./helpers/isNaN');

var $isFinite = require('./helpers/isFinite');

var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

var MAX_SAFE_INTEGER = require('./helpers/maxSafeInteger');

var assign = require('./helpers/assign');

var sign = require('./helpers/sign');

var mod = require('./helpers/mod');

var isPrimitive = require('./helpers/isPrimitive');

var forEach = require('./helpers/forEach');

var every = require('./helpers/every');

var isSamePropertyDescriptor = require('./helpers/isSamePropertyDescriptor');

var isPropertyDescriptor = require('./helpers/isPropertyDescriptor');

var parseInteger = parseInt;

var callBound = require('./helpers/callBound');

var regexTester = require('./helpers/regexTester');

var getIteratorMethod = require('./helpers/getIteratorMethod');

var getSymbolDescription = require('./helpers/getSymbolDescription');

var $PromiseThen = callBound('Promise.prototype.then', true);
var arraySlice = callBound('Array.prototype.slice');
var strSlice = callBound('String.prototype.slice');
var $indexOf = callBound('Array.prototype.indexOf');
var $push = callBound('Array.prototype.push');
var isBinary = regexTester(/^0b[01]+$/i);
var isOctal = regexTester(/^0o[0-7]+$/i);
var isDigit = regexTester(/^[0-9]$/);
var regexExec = callBound('RegExp.prototype.exec');
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = regexTester(nonWSregex);
var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
var $charCodeAt = callBound('String.prototype.charCodeAt');
var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var toStr = callBound('Object.prototype.toString');
var $NumberValueOf = callBound('Number.prototype.valueOf');
var $BooleanValueOf = callBound('Boolean.prototype.valueOf');
var $StringValueOf = callBound('String.prototype.valueOf');
var $DateValueOf = callBound('Date.prototype.valueOf');
var $SymbolToString = callBound('Symbol.prototype.toString', true);
var $floor = Math.floor;
var $abs = Math.abs;
var $ObjectCreate = $Object.create;
var $gOPD = $Object.getOwnPropertyDescriptor;
var $gOPN = $Object.getOwnPropertyNames;
var $gOPS = $Object.getOwnPropertySymbols;
var $isExtensible = $Object.isExtensible;
var $defineProperty = $Object.defineProperty;

var $setProto = require('./helpers/setProto');

var DefineOwnProperty = function DefineOwnProperty(ES, O, P, desc) {
  if (!$defineProperty) {
    if (!ES.IsDataDescriptor(desc)) {
      // ES3 does not support getters/setters
      return false;
    }

    if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
      return false;
    } // fallback for ES3


    if (P in O && $isEnumerable(O, P) !== !!desc['[[Enumerable]]']) {
      // a non-enumerable existing property
      return false;
    } // property does not exist at all, or exists but is enumerable


    var V = desc['[[Value]]'];
    O[P] = V; // will use [[Define]]

    return ES.SameValue(O[P], V);
  }

  $defineProperty(O, P, ES.FromPropertyDescriptor(desc));
  return true;
}; // whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324


var ws = ['\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003', '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028', '\u2029\uFEFF'].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace = callBound('String.prototype.replace');

var trim = function (value) {
  return $replace(value, trimRegex, '');
};

var ES5 = require('./es5');

var hasRegExpMatcher = require('is-regex'); // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations


var ES6 = assign(assign({}, ES5), {
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
  Call: function Call(F, V) {
    var args = arguments.length > 2 ? arguments[2] : [];

    if (!this.IsCallable(F)) {
      throw new $TypeError(inspect(F) + ' is not a function');
    }

    return F.apply(V, args);
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
  ToPrimitive: toPrimitive,
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
  // ToBoolean: ES5.ToBoolean,
  // https://ecma-international.org/ecma-262/6.0/#sec-tonumber
  ToNumber: function ToNumber(argument) {
    var value = isPrimitive(argument) ? argument : toPrimitive(argument, $Number);

    if (typeof value === 'symbol') {
      throw new $TypeError('Cannot convert a Symbol value to a number');
    }

    if (typeof value === 'string') {
      if (isBinary(value)) {
        return this.ToNumber(parseInteger(strSlice(value, 2), 2));
      } else if (isOctal(value)) {
        return this.ToNumber(parseInteger(strSlice(value, 2), 8));
      } else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
        return NaN;
      } else {
        var trimmed = trim(value);

        if (trimmed !== value) {
          return this.ToNumber(trimmed);
        }
      }
    }

    return $Number(value);
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
  // ToInteger: ES5.ToNumber,
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
  // ToInt32: ES5.ToInt32,
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
  // ToUint32: ES5.ToUint32,
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
  ToInt16: function ToInt16(argument) {
    var int16bit = this.ToUint16(argument);
    return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
  // ToUint16: ES5.ToUint16,
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
  ToInt8: function ToInt8(argument) {
    var int8bit = this.ToUint8(argument);
    return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
  ToUint8: function ToUint8(argument) {
    var number = this.ToNumber(argument);

    if ($isNaN(number) || number === 0 || !$isFinite(number)) {
      return 0;
    }

    var posInt = sign(number) * $floor($abs(number));
    return mod(posInt, 0x100);
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
  ToUint8Clamp: function ToUint8Clamp(argument) {
    var number = this.ToNumber(argument);

    if ($isNaN(number) || number <= 0) {
      return 0;
    }

    if (number >= 0xFF) {
      return 0xFF;
    }

    var f = $floor(argument);

    if (f + 0.5 < number) {
      return f + 1;
    }

    if (number < f + 0.5) {
      return f;
    }

    if (f % 2 !== 0) {
      return f + 1;
    }

    return f;
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
  ToString: function ToString(argument) {
    if (typeof argument === 'symbol') {
      throw new $TypeError('Cannot convert a Symbol value to a string');
    }

    return $String(argument);
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
  ToObject: function ToObject(value) {
    this.RequireObjectCoercible(value);
    return $Object(value);
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
  ToPropertyKey: function ToPropertyKey(argument) {
    var key = this.ToPrimitive(argument, $String);
    return typeof key === 'symbol' ? key : this.ToString(key);
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  ToLength: function ToLength(argument) {
    var len = this.ToInteger(argument);

    if (len <= 0) {
      return 0;
    } // includes converting -0 to +0


    if (len > MAX_SAFE_INTEGER) {
      return MAX_SAFE_INTEGER;
    }

    return len;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
  CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
    if (toStr(argument) !== '[object String]') {
      throw new $TypeError('must be a string');
    }

    if (argument === '-0') {
      return -0;
    }

    var n = this.ToNumber(argument);

    if (this.SameValue(this.ToString(n), argument)) {
      return n;
    }

    return void 0;
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
  RequireObjectCoercible: ES5.CheckObjectCoercible,
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
  IsArray: $Array.isArray || function IsArray(argument) {
    return toStr(argument) === '[object Array]';
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
  // IsCallable: ES5.IsCallable,
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
  IsConstructor: function IsConstructor(argument) {
    return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument` or Proxy
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
  IsExtensible: $preventExtensions ? function IsExtensible(obj) {
    if (isPrimitive(obj)) {
      return false;
    }

    return $isExtensible(obj);
  } : function isExtensible(obj) {
    return true;
  },
  // eslint-disable-line no-unused-vars
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
  IsInteger: function IsInteger(argument) {
    if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
      return false;
    }

    var abs = $abs(argument);
    return $floor(abs) === abs;
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
  IsPropertyKey: function IsPropertyKey(argument) {
    return typeof argument === 'string' || typeof argument === 'symbol';
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-isregexp
  IsRegExp: function IsRegExp(argument) {
    if (!argument || typeof argument !== 'object') {
      return false;
    }

    if (hasSymbols) {
      var isRegExp = argument[$Symbol.match];

      if (typeof isRegExp !== 'undefined') {
        return ES5.ToBoolean(isRegExp);
      }
    }

    return hasRegExpMatcher(argument);
  },
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
  // SameValue: ES5.SameValue,
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
  SameValueZero: function SameValueZero(x, y) {
    return x === y || $isNaN(x) && $isNaN(y);
  },

  /**
   * 7.3.2 GetV (V, P)
   * 1. Assert: IsPropertyKey(P) is true.
   * 2. Let O be ToObject(V).
   * 3. ReturnIfAbrupt(O).
   * 4. Return O.[[Get]](P, V).
   */
  GetV: function GetV(V, P) {
    // 7.3.2.1
    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
    } // 7.3.2.2-3


    var O = this.ToObject(V); // 7.3.2.4

    return O[P];
  },

  /**
   * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
   * 1. Assert: IsPropertyKey(P) is true.
   * 2. Let func be GetV(O, P).
   * 3. ReturnIfAbrupt(func).
   * 4. If func is either undefined or null, return undefined.
   * 5. If IsCallable(func) is false, throw a TypeError exception.
   * 6. Return func.
   */
  GetMethod: function GetMethod(O, P) {
    // 7.3.9.1
    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
    } // 7.3.9.2


    var func = this.GetV(O, P); // 7.3.9.4

    if (func == null) {
      return void 0;
    } // 7.3.9.5


    if (!this.IsCallable(func)) {
      throw new $TypeError(P + 'is not a function');
    } // 7.3.9.6


    return func;
  },

  /**
   * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
   * 1. Assert: Type(O) is Object.
   * 2. Assert: IsPropertyKey(P) is true.
   * 3. Return O.[[Get]](P, O).
   */
  Get: function Get(O, P) {
    // 7.3.1.1
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    } // 7.3.1.2


    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
    } // 7.3.1.3


    return O[P];
  },
  Type: function Type(x) {
    if (typeof x === 'symbol') {
      return 'Symbol';
    }

    return ES5.Type(x);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
  SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    var C = O.constructor;

    if (typeof C === 'undefined') {
      return defaultConstructor;
    }

    if (this.Type(C) !== 'Object') {
      throw new $TypeError('O.constructor is not an Object');
    }

    var S = hasSymbols && $Symbol.species ? C[$Symbol.species] : void 0;

    if (S == null) {
      return defaultConstructor;
    }

    if (this.IsConstructor(S)) {
      return S;
    }

    throw new $TypeError('no constructor found');
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor
  FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
    if (typeof Desc === 'undefined') {
      return Desc;
    }

    assertRecord(this, 'Property Descriptor', 'Desc', Desc);
    var obj = {};

    if ('[[Value]]' in Desc) {
      obj.value = Desc['[[Value]]'];
    }

    if ('[[Writable]]' in Desc) {
      obj.writable = Desc['[[Writable]]'];
    }

    if ('[[Get]]' in Desc) {
      obj.get = Desc['[[Get]]'];
    }

    if ('[[Set]]' in Desc) {
      obj.set = Desc['[[Set]]'];
    }

    if ('[[Enumerable]]' in Desc) {
      obj.enumerable = Desc['[[Enumerable]]'];
    }

    if ('[[Configurable]]' in Desc) {
      obj.configurable = Desc['[[Configurable]]'];
    }

    return obj;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor
  CompletePropertyDescriptor: function CompletePropertyDescriptor(Desc) {
    /* eslint no-param-reassign: 0 */
    assertRecord(this, 'Property Descriptor', 'Desc', Desc);

    if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
      if (!has(Desc, '[[Value]]')) {
        Desc['[[Value]]'] = void 0;
      }

      if (!has(Desc, '[[Writable]]')) {
        Desc['[[Writable]]'] = false;
      }
    } else {
      if (!has(Desc, '[[Get]]')) {
        Desc['[[Get]]'] = void 0;
      }

      if (!has(Desc, '[[Set]]')) {
        Desc['[[Set]]'] = void 0;
      }
    }

    if (!has(Desc, '[[Enumerable]]')) {
      Desc['[[Enumerable]]'] = false;
    }

    if (!has(Desc, '[[Configurable]]')) {
      Desc['[[Configurable]]'] = false;
    }

    return Desc;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw
  Set: function Set(O, P, V, Throw) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('O must be an Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('P must be a Property Key');
    }

    if (this.Type(Throw) !== 'Boolean') {
      throw new $TypeError('Throw must be a Boolean');
    }

    if (Throw) {
      O[P] = V;
      return true;
    } else {
      try {
        O[P] = V;
      } catch (e) {
        return false;
      }
    }
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty
  HasOwnProperty: function HasOwnProperty(O, P) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('O must be an Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('P must be a Property Key');
    }

    return has(O, P);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-hasproperty
  HasProperty: function HasProperty(O, P) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('O must be an Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('P must be a Property Key');
    }

    return P in O;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
  IsConcatSpreadable: function IsConcatSpreadable(O) {
    if (this.Type(O) !== 'Object') {
      return false;
    }

    if (hasSymbols && typeof $Symbol.isConcatSpreadable === 'symbol') {
      var spreadable = this.Get(O, Symbol.isConcatSpreadable);

      if (typeof spreadable !== 'undefined') {
        return this.ToBoolean(spreadable);
      }
    }

    return this.IsArray(O);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-invoke
  Invoke: function Invoke(O, P) {
    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('P must be a Property Key');
    }

    var argumentsList = arraySlice(arguments, 2);
    var func = this.GetV(O, P);
    return this.Call(func, O, argumentsList);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-getiterator
  GetIterator: function GetIterator(obj, method) {
    var actualMethod = method;

    if (arguments.length < 2) {
      actualMethod = getIteratorMethod(this, obj);
    }

    var iterator = this.Call(actualMethod, obj);

    if (this.Type(iterator) !== 'Object') {
      throw new $TypeError('iterator must return an object');
    }

    return iterator;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-iteratornext
  IteratorNext: function IteratorNext(iterator, value) {
    var result = this.Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);

    if (this.Type(result) !== 'Object') {
      throw new $TypeError('iterator next must return an object');
    }

    return result;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete
  IteratorComplete: function IteratorComplete(iterResult) {
    if (this.Type(iterResult) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
    }

    return this.ToBoolean(this.Get(iterResult, 'done'));
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue
  IteratorValue: function IteratorValue(iterResult) {
    if (this.Type(iterResult) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
    }

    return this.Get(iterResult, 'value');
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep
  IteratorStep: function IteratorStep(iterator) {
    var result = this.IteratorNext(iterator);
    var done = this.IteratorComplete(result);
    return done === true ? false : result;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose
  IteratorClose: function IteratorClose(iterator, completion) {
    if (this.Type(iterator) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(iterator) is not Object');
    }

    if (!this.IsCallable(completion)) {
      throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
    }

    var completionThunk = completion;
    var iteratorReturn = this.GetMethod(iterator, 'return');

    if (typeof iteratorReturn === 'undefined') {
      return completionThunk();
    }

    var completionRecord;

    try {
      var innerResult = this.Call(iteratorReturn, iterator, []);
    } catch (e) {
      // if we hit here, then "e" is the innerResult completion that needs re-throwing
      // if the completion is of type "throw", this will throw.
      completionRecord = completionThunk();
      completionThunk = null; // ensure it's not called twice.
      // if not, then return the innerResult completion

      throw e;
    }

    completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does

    completionThunk = null; // ensure it's not called twice.

    if (this.Type(innerResult) !== 'Object') {
      throw new $TypeError('iterator .return must return an object');
    }

    return completionRecord;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject
  CreateIterResultObject: function CreateIterResultObject(value, done) {
    if (this.Type(done) !== 'Boolean') {
      throw new $TypeError('Assertion failed: Type(done) is not Boolean');
    }

    return {
      value: value,
      done: done
    };
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-regexpexec
  RegExpExec: function RegExpExec(R, S) {
    if (this.Type(R) !== 'Object') {
      throw new $TypeError('R must be an Object');
    }

    if (this.Type(S) !== 'String') {
      throw new $TypeError('S must be a String');
    }

    var exec = this.Get(R, 'exec');

    if (this.IsCallable(exec)) {
      var result = this.Call(exec, R, [S]);

      if (result === null || this.Type(result) === 'Object') {
        return result;
      }

      throw new $TypeError('"exec" method must return `null` or an Object');
    }

    return regexExec(R, S);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate
  ArraySpeciesCreate: function ArraySpeciesCreate(originalArray, length) {
    if (!this.IsInteger(length) || length < 0) {
      throw new $TypeError('Assertion failed: length must be an integer >= 0');
    }

    var len = length === 0 ? 0 : length;
    var C;
    var isArray = this.IsArray(originalArray);

    if (isArray) {
      C = this.Get(originalArray, 'constructor'); // TODO: figure out how to make a cross-realm normal Array, a same-realm Array
      // if (this.IsConstructor(C)) {
      // 	if C is another realm's Array, C = undefined
      // 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
      // }

      if (this.Type(C) === 'Object' && hasSymbols && $Symbol.species) {
        C = this.Get(C, $Symbol.species);

        if (C === null) {
          C = void 0;
        }
      }
    }

    if (typeof C === 'undefined') {
      return $Array(len);
    }

    if (!this.IsConstructor(C)) {
      throw new $TypeError('C must be a constructor');
    }

    return new C(len); // this.Construct(C, len);
  },
  CreateDataProperty: function CreateDataProperty(O, P, V) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
    }

    var oldDesc = $gOPD(O, P);
    var extensible = oldDesc || this.IsExtensible(O);
    var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);

    if (immutable || !extensible) {
      return false;
    }

    return DefineOwnProperty(this, O, P, {
      '[[Configurable]]': true,
      '[[Enumerable]]': true,
      '[[Value]]': V,
      '[[Writable]]': true
    });
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow
  CreateDataPropertyOrThrow: function CreateDataPropertyOrThrow(O, P, V) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
    }

    var success = this.CreateDataProperty(O, P, V);

    if (!success) {
      throw new $TypeError('unable to create data property');
    }

    return success;
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-objectcreate
  ObjectCreate: function ObjectCreate(proto, internalSlotsList) {
    if (proto !== null && this.Type(proto) !== 'Object') {
      throw new $TypeError('Assertion failed: proto must be null or an object');
    }

    var slots = arguments.length < 2 ? [] : internalSlotsList;

    if (slots.length > 0) {
      throw new $SyntaxError('es-abstract does not yet support internal slots');
    }

    if (proto === null && !$ObjectCreate) {
      throw new $SyntaxError('native Object.create support is required to create null objects');
    }

    return $ObjectCreate(proto);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex
  AdvanceStringIndex: function AdvanceStringIndex(S, index, unicode) {
    if (this.Type(S) !== 'String') {
      throw new $TypeError('S must be a String');
    }

    if (!this.IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
      throw new $TypeError('Assertion failed: length must be an integer >= 0 and <= 2**53');
    }

    if (this.Type(unicode) !== 'Boolean') {
      throw new $TypeError('Assertion failed: unicode must be a Boolean');
    }

    if (!unicode) {
      return index + 1;
    }

    var length = S.length;

    if (index + 1 >= length) {
      return index + 1;
    }

    var first = $charCodeAt(S, index);

    if (first < 0xD800 || first > 0xDBFF) {
      return index + 1;
    }

    var second = $charCodeAt(S, index + 1);

    if (second < 0xDC00 || second > 0xDFFF) {
      return index + 1;
    }

    return index + 2;
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-createmethodproperty
  CreateMethodProperty: function CreateMethodProperty(O, P, V) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
    }

    var newDesc = {
      '[[Configurable]]': true,
      '[[Enumerable]]': false,
      '[[Value]]': V,
      '[[Writable]]': true
    };
    return DefineOwnProperty(this, O, P, newDesc);
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow
  DefinePropertyOrThrow: function DefinePropertyOrThrow(O, P, desc) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
    }

    var Desc = isPropertyDescriptor(this, desc) ? desc : this.ToPropertyDescriptor(desc);

    if (!isPropertyDescriptor(this, Desc)) {
      throw new $TypeError('Assertion failed: Desc is not a valid Property Descriptor');
    }

    return DefineOwnProperty(this, O, P, Desc);
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow
  DeletePropertyOrThrow: function DeletePropertyOrThrow(O, P) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
    }

    var success = delete O[P];

    if (!success) {
      throw new TypeError('Attempt to delete property failed.');
    }

    return success;
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-enumerableownnames
  EnumerableOwnNames: function EnumerableOwnNames(O) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    return keys(O);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object
  thisNumberValue: function thisNumberValue(value) {
    if (this.Type(value) === 'Number') {
      return value;
    }

    return $NumberValueOf(value);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object
  thisBooleanValue: function thisBooleanValue(value) {
    if (this.Type(value) === 'Boolean') {
      return value;
    }

    return $BooleanValueOf(value);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object
  thisStringValue: function thisStringValue(value) {
    if (this.Type(value) === 'String') {
      return value;
    }

    return $StringValueOf(value);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object
  thisTimeValue: function thisTimeValue(value) {
    return $DateValueOf(value);
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-setintegritylevel
  SetIntegrityLevel: function SetIntegrityLevel(O, level) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    if (level !== 'sealed' && level !== 'frozen') {
      throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
    }

    if (!$preventExtensions) {
      throw new $SyntaxError('SetIntegrityLevel requires native `Object.preventExtensions` support');
    }

    var status = $preventExtensions(O);

    if (!status) {
      return false;
    }

    if (!$gOPN) {
      throw new $SyntaxError('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
    }

    var theKeys = $gOPN(O);
    var ES = this;

    if (level === 'sealed') {
      forEach(theKeys, function (k) {
        ES.DefinePropertyOrThrow(O, k, {
          configurable: false
        });
      });
    } else if (level === 'frozen') {
      forEach(theKeys, function (k) {
        var currentDesc = $gOPD(O, k);

        if (typeof currentDesc !== 'undefined') {
          var desc;

          if (ES.IsAccessorDescriptor(ES.ToPropertyDescriptor(currentDesc))) {
            desc = {
              configurable: false
            };
          } else {
            desc = {
              configurable: false,
              writable: false
            };
          }

          ES.DefinePropertyOrThrow(O, k, desc);
        }
      });
    }

    return true;
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-testintegritylevel
  TestIntegrityLevel: function TestIntegrityLevel(O, level) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    if (level !== 'sealed' && level !== 'frozen') {
      throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
    }

    var status = this.IsExtensible(O);

    if (status) {
      return false;
    }

    var theKeys = $gOPN(O);
    var ES = this;
    return theKeys.length === 0 || every(theKeys, function (k) {
      var currentDesc = $gOPD(O, k);

      if (typeof currentDesc !== 'undefined') {
        if (currentDesc.configurable) {
          return false;
        }

        if (level === 'frozen' && ES.IsDataDescriptor(ES.ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
          return false;
        }
      }

      return true;
    });
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance
  OrdinaryHasInstance: function OrdinaryHasInstance(C, O) {
    if (this.IsCallable(C) === false) {
      return false;
    }

    if (this.Type(O) !== 'Object') {
      return false;
    }

    var P = this.Get(C, 'prototype');

    if (this.Type(P) !== 'Object') {
      throw new $TypeError('OrdinaryHasInstance called on an object with an invalid prototype property.');
    }

    return O instanceof C;
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty
  OrdinaryHasProperty: function OrdinaryHasProperty(O, P) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: P must be a Property Key');
    }

    return P in O;
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-instanceofoperator
  InstanceofOperator: function InstanceofOperator(O, C) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    var instOfHandler = hasSymbols && $Symbol.hasInstance ? this.GetMethod(C, $Symbol.hasInstance) : void 0;

    if (typeof instOfHandler !== 'undefined') {
      return this.ToBoolean(this.Call(instOfHandler, C, [O]));
    }

    if (!this.IsCallable(C)) {
      throw new $TypeError('`C` is not Callable');
    }

    return this.OrdinaryHasInstance(C, O);
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-ispromise
  IsPromise: function IsPromise(x) {
    if (this.Type(x) !== 'Object') {
      return false;
    }

    if (!$PromiseThen) {
      // Promises are not supported
      return false;
    }

    try {
      $PromiseThen(x); // throws if not a promise
    } catch (e) {
      return false;
    }

    return true;
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison
  'Abstract Equality Comparison': function AbstractEqualityComparison(x, y) {
    var xType = this.Type(x);
    var yType = this.Type(y);

    if (xType === yType) {
      return x === y; // ES6+ specified this shortcut anyways.
    }

    if (x == null && y == null) {
      return true;
    }

    if (xType === 'Number' && yType === 'String') {
      return this['Abstract Equality Comparison'](x, this.ToNumber(y));
    }

    if (xType === 'String' && yType === 'Number') {
      return this['Abstract Equality Comparison'](this.ToNumber(x), y);
    }

    if (xType === 'Boolean') {
      return this['Abstract Equality Comparison'](this.ToNumber(x), y);
    }

    if (yType === 'Boolean') {
      return this['Abstract Equality Comparison'](x, this.ToNumber(y));
    }

    if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
      return this['Abstract Equality Comparison'](x, this.ToPrimitive(y));
    }

    if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
      return this['Abstract Equality Comparison'](this.ToPrimitive(x), y);
    }

    return false;
  },
  // eslint-disable-next-line max-lines-per-function, max-statements, id-length, max-params
  ValidateAndApplyPropertyDescriptor: function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
    // this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
    var oType = this.Type(O);

    if (oType !== 'Undefined' && oType !== 'Object') {
      throw new $TypeError('Assertion failed: O must be undefined or an Object');
    }

    if (this.Type(extensible) !== 'Boolean') {
      throw new $TypeError('Assertion failed: extensible must be a Boolean');
    }

    if (!isPropertyDescriptor(this, Desc)) {
      throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
    }

    if (this.Type(current) !== 'Undefined' && !isPropertyDescriptor(this, current)) {
      throw new $TypeError('Assertion failed: current must be a Property Descriptor, or undefined');
    }

    if (oType !== 'Undefined' && !this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: if O is not undefined, P must be a Property Key');
    }

    if (this.Type(current) === 'Undefined') {
      if (!extensible) {
        return false;
      }

      if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
        if (oType !== 'Undefined') {
          DefineOwnProperty(this, O, P, {
            '[[Configurable]]': Desc['[[Configurable]]'],
            '[[Enumerable]]': Desc['[[Enumerable]]'],
            '[[Value]]': Desc['[[Value]]'],
            '[[Writable]]': Desc['[[Writable]]']
          });
        }
      } else {
        if (!this.IsAccessorDescriptor(Desc)) {
          throw new $TypeError('Assertion failed: Desc is not an accessor descriptor');
        }

        if (oType !== 'Undefined') {
          return DefineOwnProperty(this, O, P, Desc);
        }
      }

      return true;
    }

    if (this.IsGenericDescriptor(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
      return true;
    }

    if (isSamePropertyDescriptor(this, Desc, current)) {
      return true; // removed by ES2017, but should still be correct
    } // "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor


    if (!current['[[Configurable]]']) {
      if (Desc['[[Configurable]]']) {
        return false;
      }

      if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
        return false;
      }
    }

    if (this.IsGenericDescriptor(Desc)) {// no further validation is required.
    } else if (this.IsDataDescriptor(current) !== this.IsDataDescriptor(Desc)) {
      if (!current['[[Configurable]]']) {
        return false;
      }

      if (this.IsDataDescriptor(current)) {
        if (oType !== 'Undefined') {
          DefineOwnProperty(this, O, P, {
            '[[Configurable]]': current['[[Configurable]]'],
            '[[Enumerable]]': current['[[Enumerable]]'],
            '[[Get]]': undefined
          });
        }
      } else if (oType !== 'Undefined') {
        DefineOwnProperty(this, O, P, {
          '[[Configurable]]': current['[[Configurable]]'],
          '[[Enumerable]]': current['[[Enumerable]]'],
          '[[Value]]': undefined
        });
      }
    } else if (this.IsDataDescriptor(current) && this.IsDataDescriptor(Desc)) {
      if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
        if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
          return false;
        }

        if ('[[Value]]' in Desc && !this.SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
          return false;
        }

        return true;
      }
    } else if (this.IsAccessorDescriptor(current) && this.IsAccessorDescriptor(Desc)) {
      if (!current['[[Configurable]]']) {
        if ('[[Set]]' in Desc && !this.SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
          return false;
        }

        if ('[[Get]]' in Desc && !this.SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
          return false;
        }

        return true;
      }
    } else {
      throw new $TypeError('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
    }

    if (oType !== 'Undefined') {
      return DefineOwnProperty(this, O, P, Desc);
    }

    return true;
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty
  OrdinaryDefineOwnProperty: function OrdinaryDefineOwnProperty(O, P, Desc) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: O must be an Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: P must be a Property Key');
    }

    if (!isPropertyDescriptor(this, Desc)) {
      throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
    }

    var desc = $gOPD(O, P);
    var current = desc && this.ToPropertyDescriptor(desc);
    var extensible = this.IsExtensible(O);
    return this.ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty
  OrdinaryGetOwnProperty: function OrdinaryGetOwnProperty(O, P) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: O must be an Object');
    }

    if (!this.IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: P must be a Property Key');
    }

    if (!has(O, P)) {
      return void 0;
    }

    if (!$gOPD) {
      // ES3 fallback
      var arrayLength = this.IsArray(O) && P === 'length';
      var regexLastIndex = this.IsRegExp(O) && P === 'lastIndex';
      return {
        '[[Configurable]]': !(arrayLength || regexLastIndex),
        '[[Enumerable]]': $isEnumerable(O, P),
        '[[Value]]': O[P],
        '[[Writable]]': true
      };
    }

    return this.ToPropertyDescriptor($gOPD(O, P));
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-arraycreate
  ArrayCreate: function ArrayCreate(length) {
    if (!this.IsInteger(length) || length < 0) {
      throw new $TypeError('Assertion failed: `length` must be an integer Number >= 0');
    }

    if (length > MAX_ARRAY_LENGTH) {
      throw new $RangeError('length is greater than (2**32 - 1)');
    }

    var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
    var A = []; // steps 5 - 7, and 9

    if (proto !== $ArrayPrototype) {
      // step 8
      if (!$setProto) {
        throw new $SyntaxError('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
      }

      $setProto(A, proto);
    }

    if (length !== 0) {
      // bypasses the need for step 2
      A.length = length;
    }
    /* step 10, the above as a shortcut for the below
    this.OrdinaryDefineOwnProperty(A, 'length', {
    	'[[Configurable]]': false,
    	'[[Enumerable]]': false,
    	'[[Value]]': length,
    	'[[Writable]]': true
    });
    */


    return A;
  },
  // eslint-disable-next-line max-statements, max-lines-per-function
  ArraySetLength: function ArraySetLength(A, Desc) {
    if (!this.IsArray(A)) {
      throw new $TypeError('Assertion failed: A must be an Array');
    }

    if (!isPropertyDescriptor(this, Desc)) {
      throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
    }

    if (!('[[Value]]' in Desc)) {
      return this.OrdinaryDefineOwnProperty(A, 'length', Desc);
    }

    var newLenDesc = assign({}, Desc);
    var newLen = this.ToUint32(Desc['[[Value]]']);
    var numberLen = this.ToNumber(Desc['[[Value]]']);

    if (newLen !== numberLen) {
      throw new $RangeError('Invalid array length');
    }

    newLenDesc['[[Value]]'] = newLen;
    var oldLenDesc = this.OrdinaryGetOwnProperty(A, 'length');

    if (!this.IsDataDescriptor(oldLenDesc)) {
      throw new $TypeError('Assertion failed: an array had a non-data descriptor on `length`');
    }

    var oldLen = oldLenDesc['[[Value]]'];

    if (newLen >= oldLen) {
      return this.OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
    }

    if (!oldLenDesc['[[Writable]]']) {
      return false;
    }

    var newWritable;

    if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
      newWritable = true;
    } else {
      newWritable = false;
      newLenDesc['[[Writable]]'] = true;
    }

    var succeeded = this.OrdinaryDefineOwnProperty(A, 'length', newLenDesc);

    if (!succeeded) {
      return false;
    }

    while (newLen < oldLen) {
      oldLen -= 1;
      var deleteSucceeded = delete A[this.ToString(oldLen)];

      if (!deleteSucceeded) {
        newLenDesc['[[Value]]'] = oldLen + 1;

        if (!newWritable) {
          newLenDesc['[[Writable]]'] = false;
          this.OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
          return false;
        }
      }
    }

    if (!newWritable) {
      return this.OrdinaryDefineOwnProperty(A, 'length', {
        '[[Writable]]': false
      });
    }

    return true;
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-createhtml
  CreateHTML: function CreateHTML(string, tag, attribute, value) {
    if (this.Type(tag) !== 'String' || this.Type(attribute) !== 'String') {
      throw new $TypeError('Assertion failed: `tag` and `attribute` must be strings');
    }

    var str = this.RequireObjectCoercible(string);
    var S = this.ToString(str);
    var p1 = '<' + tag;

    if (attribute !== '') {
      var V = this.ToString(value);
      var escapedV = $replace(V, /\x22/g, '&quot;');
      p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
    }

    return p1 + '>' + S + '</' + tag + '>';
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys
  GetOwnPropertyKeys: function GetOwnPropertyKeys(O, Type) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }

    if (Type === 'Symbol') {
      return hasSymbols && $gOPS ? $gOPS(O) : [];
    }

    if (Type === 'String') {
      if (!$gOPN) {
        return keys(O);
      }

      return $gOPN(O);
    }

    throw new $TypeError('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring
  SymbolDescriptiveString: function SymbolDescriptiveString(sym) {
    if (this.Type(sym) !== 'Symbol') {
      throw new $TypeError('Assertion failed: `sym` must be a Symbol');
    }

    return $SymbolToString(sym);
  },
  // https://www.ecma-international.org/ecma-262/6.0/#sec-getsubstitution
  // eslint-disable-next-line max-statements, max-params, max-lines-per-function
  GetSubstitution: function GetSubstitution(matched, str, position, captures, replacement) {
    if (this.Type(matched) !== 'String') {
      throw new $TypeError('Assertion failed: `matched` must be a String');
    }

    var matchLength = matched.length;

    if (this.Type(str) !== 'String') {
      throw new $TypeError('Assertion failed: `str` must be a String');
    }

    var stringLength = str.length;

    if (!this.IsInteger(position) || position < 0 || position > stringLength) {
      throw new $TypeError('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
    }

    var ES = this;

    var isStringOrHole = function (capture, index, arr) {
      return ES.Type(capture) === 'String' || !(index in arr);
    };

    if (!this.IsArray(captures) || !every(captures, isStringOrHole)) {
      throw new $TypeError('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
    }

    if (this.Type(replacement) !== 'String') {
      throw new $TypeError('Assertion failed: `replacement` must be a String');
    }

    var tailPos = position + matchLength;
    var m = captures.length;
    var result = '';

    for (var i = 0; i < replacement.length; i += 1) {
      // if this is a $, and it's not the end of the replacement
      var current = replacement[i];
      var isLast = i + 1 >= replacement.length;
      var nextIsLast = i + 2 >= replacement.length;

      if (current === '$' && !isLast) {
        var next = replacement[i + 1];

        if (next === '$') {
          result += '$';
          i += 1;
        } else if (next === '&') {
          result += matched;
          i += 1;
        } else if (next === '`') {
          result += position === 0 ? '' : strSlice(str, 0, position - 1);
          i += 1;
        } else if (next === "'") {
          result += tailPos >= stringLength ? '' : strSlice(str, tailPos);
          i += 1;
        } else {
          var nextNext = nextIsLast ? null : replacement[i + 2];

          if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
            // $1 through $9, and not followed by a digit
            var n = parseInteger(next, 10); // if (n > m, impl-defined)

            result += n <= m && this.Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
            i += 1;
          } else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
            // $00 through $99
            var nn = next + nextNext;
            var nnI = parseInteger(nn, 10) - 1; // if nn === '00' or nn > m, impl-defined

            result += nn <= m && this.Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
            i += 2;
          } else {
            result += '$';
          }
        }
      } else {
        // the final $, or else not a $
        result += replacement[i];
      }
    }

    return result;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-todatestring
  ToDateString: function ToDateString(tv) {
    if (this.Type(tv) !== 'Number') {
      throw new $TypeError('Assertion failed: `tv` must be a Number');
    }

    if ($isNaN(tv)) {
      return 'Invalid Date';
    }

    return $Date(tv);
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
  CreateListFromArrayLike: function CreateListFromArrayLike(obj) {
    var elementTypes = arguments.length > 1 ? arguments[1] : ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

    if (this.Type(obj) !== 'Object') {
      throw new $TypeError('Assertion failed: `obj` must be an Object');
    }

    if (!this.IsArray(elementTypes)) {
      throw new $TypeError('Assertion failed: `elementTypes`, if provided, must be an array');
    }

    var len = this.ToLength(this.Get(obj, 'length'));
    var list = [];
    var index = 0;

    while (index < len) {
      var indexName = this.ToString(index);
      var next = this.Get(obj, indexName);
      var nextType = this.Type(next);

      if ($indexOf(elementTypes, nextType) < 0) {
        throw new $TypeError('item type ' + nextType + ' is not a valid elementType');
      }

      $push(list, next);
      index += 1;
    }

    return list;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor
  GetPrototypeFromConstructor: function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
    var intrinsic = GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic

    if (!this.IsConstructor(constructor)) {
      throw new $TypeError('Assertion failed: `constructor` must be a constructor');
    }

    var proto = this.Get(constructor, 'prototype');

    if (this.Type(proto) !== 'Object') {
      if (!(constructor instanceof $Function)) {
        // ignore other realms, for now
        throw new $TypeError('cross-realm constructors not currently supported');
      }

      proto = intrinsic;
    }

    return proto;
  },
  // https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname
  SetFunctionName: function SetFunctionName(F, name) {
    if (typeof F !== 'function') {
      throw new $TypeError('Assertion failed: `F` must be a function');
    }

    if (!this.IsExtensible(F) || has(F, 'name')) {
      throw new $TypeError('Assertion failed: `F` must be extensible, and must not have a `name` own property');
    }

    var nameType = this.Type(name);

    if (nameType !== 'Symbol' && nameType !== 'String') {
      throw new $TypeError('Assertion failed: `name` must be a Symbol or a String');
    }

    if (nameType === 'Symbol') {
      var description = getSymbolDescription(name);
      name = typeof description === 'undefined' ? '' : '[' + description + ']';
    }

    if (arguments.length > 2) {
      var prefix = arguments[2];
      name = prefix + ' ' + name;
    }

    return this.DefinePropertyOrThrow(F, 'name', {
      '[[Value]]': name,
      '[[Writable]]': false,
      '[[Enumerable]]': false,
      '[[Configurable]]': true
    });
  }
});
delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;
},{"has":"../../node_modules/has/src/index.js","es-to-primitive/es6":"../../node_modules/es-to-primitive/es6.js","object-keys":"../../node_modules/object-keys/index.js","object-inspect":"../../node_modules/object-inspect/index.js","./GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","has-symbols":"../../node_modules/has-symbols/index.js","./helpers/assertRecord":"../../node_modules/es-abstract/helpers/assertRecord.js","./helpers/isNaN":"../../node_modules/es-abstract/helpers/isNaN.js","./helpers/isFinite":"../../node_modules/es-abstract/helpers/isFinite.js","./helpers/maxSafeInteger":"../../node_modules/es-abstract/helpers/maxSafeInteger.js","./helpers/assign":"../../node_modules/es-abstract/helpers/assign.js","./helpers/sign":"../../node_modules/es-abstract/helpers/sign.js","./helpers/mod":"../../node_modules/es-abstract/helpers/mod.js","./helpers/isPrimitive":"../../node_modules/es-abstract/helpers/isPrimitive.js","./helpers/forEach":"../../node_modules/es-abstract/helpers/forEach.js","./helpers/every":"../../node_modules/es-abstract/helpers/every.js","./helpers/isSamePropertyDescriptor":"../../node_modules/es-abstract/helpers/isSamePropertyDescriptor.js","./helpers/isPropertyDescriptor":"../../node_modules/es-abstract/helpers/isPropertyDescriptor.js","./helpers/callBound":"../../node_modules/es-abstract/helpers/callBound.js","./helpers/regexTester":"../../node_modules/es-abstract/helpers/regexTester.js","./helpers/getIteratorMethod":"../../node_modules/es-abstract/helpers/getIteratorMethod.js","./helpers/getSymbolDescription":"../../node_modules/es-abstract/helpers/getSymbolDescription.js","./helpers/setProto":"../../node_modules/es-abstract/helpers/setProto.js","./es5":"../../node_modules/es-abstract/es5.js","is-regex":"../../node_modules/is-regex/index.js"}],"../../node_modules/es-abstract/helpers/getProto.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var originalGetProto = GetIntrinsic('%Object.getPrototypeOf%', true);
var $ArrayProto = GetIntrinsic('%Array.prototype%');
module.exports = originalGetProto || ( // eslint-disable-next-line no-proto
[].__proto__ === $ArrayProto ? function (O) {
  return O.__proto__; // eslint-disable-line no-proto
} : null);
},{"../GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js"}],"../../node_modules/es-abstract/es2016.js":[function(require,module,exports) {
'use strict';

var ES2015 = require('./es2015');

var GetIntrinsic = require('./GetIntrinsic');

var assign = require('./helpers/assign');

var $setProto = require('./helpers/setProto');

var callBound = require('./helpers/callBound');

var getIteratorMethod = require('./helpers/getIteratorMethod');

var $TypeError = GetIntrinsic('%TypeError%');
var $arrayPush = callBound('Array.prototype.push');

var $getProto = require('./helpers/getProto');

var ES2016 = assign(assign({}, ES2015), {
  // https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluenonnumber
  SameValueNonNumber: function SameValueNonNumber(x, y) {
    if (typeof x === 'number' || typeof x !== typeof y) {
      throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
    }

    return this.SameValue(x, y);
  },
  // https://www.ecma-international.org/ecma-262/7.0/#sec-iterabletoarraylike
  IterableToArrayLike: function IterableToArrayLike(items) {
    var usingIterator = getIteratorMethod(this, items);

    if (typeof usingIterator !== 'undefined') {
      var iterator = this.GetIterator(items, usingIterator);
      var values = [];
      var next = true;

      while (next) {
        next = this.IteratorStep(iterator);

        if (next) {
          var nextValue = this.IteratorValue(next);
          $arrayPush(values, nextValue);
        }
      }

      return values;
    }

    return this.ToObject(items);
  },
  // https://ecma-international.org/ecma-262/7.0/#sec-ordinarygetprototypeof
  OrdinaryGetPrototypeOf: function (O) {
    if (this.Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: O must be an Object');
    }

    if (!$getProto) {
      throw new $TypeError('This environment does not support fetching prototypes.');
    }

    return $getProto(O);
  },
  // https://ecma-international.org/ecma-262/7.0/#sec-ordinarysetprototypeof
  OrdinarySetPrototypeOf: function (O, V) {
    if (this.Type(V) !== 'Object' && this.Type(V) !== 'Null') {
      throw new $TypeError('Assertion failed: V must be Object or Null');
    }
    /*
    var extensible = this.IsExtensible(O);
    var current = this.OrdinaryGetPrototypeOf(O);
    if (this.SameValue(V, current)) {
    	return true;
    }
    if (!extensible) {
    	return false;
    }
    */


    try {
      $setProto(O, V);
    } catch (e) {
      return false;
    }

    return this.OrdinaryGetPrototypeOf(O) === V;
    /*
    var p = V;
    var done = false;
    while (!done) {
    	if (p === null) {
    		done = true;
    	} else if (this.SameValue(p, O)) {
    		return false;
    	} else {
    		if (wat) {
    			done = true;
    		} else {
    			p = p.[[Prototype]];
    		}
    	}
     }
     O.[[Prototype]] = V;
     return true;
     */
  }
});
module.exports = ES2016;
},{"./es2015":"../../node_modules/es-abstract/es2015.js","./GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","./helpers/assign":"../../node_modules/es-abstract/helpers/assign.js","./helpers/setProto":"../../node_modules/es-abstract/helpers/setProto.js","./helpers/callBound":"../../node_modules/es-abstract/helpers/callBound.js","./helpers/getIteratorMethod":"../../node_modules/es-abstract/helpers/getIteratorMethod.js","./helpers/getProto":"../../node_modules/es-abstract/helpers/getProto.js"}],"../../node_modules/es-abstract/es2017.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var ES2016 = require('./es2016');

var assign = require('./helpers/assign');

var forEach = require('./helpers/forEach');

var callBind = require('./helpers/callBind');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('./helpers/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));
var $arrayPush = callBound('Array.prototype.push');
var ES2017 = assign(assign({}, ES2016), {
  ToIndex: function ToIndex(value) {
    if (typeof value === 'undefined') {
      return 0;
    }

    var integerIndex = this.ToInteger(value);

    if (integerIndex < 0) {
      throw new RangeError('index must be >= 0');
    }

    var index = this.ToLength(integerIndex);

    if (!this.SameValueZero(integerIndex, index)) {
      throw new RangeError('index must be >= 0 and < 2 ** 53 - 1');
    }

    return index;
  },
  // https://www.ecma-international.org/ecma-262/8.0/#sec-enumerableownproperties
  EnumerableOwnProperties: function EnumerableOwnProperties(O, kind) {
    var keys = ES2016.EnumerableOwnNames(O);

    if (kind === 'key') {
      return keys;
    }

    if (kind === 'value' || kind === 'key+value') {
      var results = [];
      forEach(keys, function (key) {
        if ($isEnumerable(O, key)) {
          $pushApply(results, [kind === 'value' ? O[key] : [key, O[key]]]);
        }
      });
      return results;
    }

    throw new $TypeError('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
  },
  // https://www.ecma-international.org/ecma-262/8.0/#sec-iterabletolist
  IterableToList: function IterableToList(items, method) {
    var iterator = this.GetIterator(items, method);
    var values = [];
    var next = true;

    while (next) {
      next = this.IteratorStep(iterator);

      if (next) {
        var nextValue = this.IteratorValue(next);
        $arrayPush(values, nextValue);
      }
    }

    return values;
  }
});
delete ES2017.EnumerableOwnNames; // replaced with EnumerableOwnProperties

delete ES2017.IterableToArrayLike; // replaced with IterableToList

module.exports = ES2017;
},{"./GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","./es2016":"../../node_modules/es-abstract/es2016.js","./helpers/assign":"../../node_modules/es-abstract/helpers/assign.js","./helpers/forEach":"../../node_modules/es-abstract/helpers/forEach.js","./helpers/callBind":"../../node_modules/es-abstract/helpers/callBind.js","./helpers/callBound":"../../node_modules/es-abstract/helpers/callBound.js"}],"../../node_modules/es-abstract/es2018.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var keys = require('object-keys');

var inspect = require('object-inspect');

var ES2017 = require('./es2017');

var assign = require('./helpers/assign');

var forEach = require('./helpers/forEach');

var callBind = require('./helpers/callBind');

var every = require('./helpers/every');

var isPrefixOf = require('./helpers/isPrefixOf');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('./helpers/callBound');

var regexTester = require('./helpers/regexTester');

var $isNaN = require('./helpers/isNaN');

var $SymbolValueOf = callBound('Symbol.prototype.valueOf', true); // var $charAt = callBound('String.prototype.charAt');

var $strSlice = callBound('String.prototype.slice');
var $indexOf = callBound('String.prototype.indexOf');
var $parseInt = parseInt;
var isDigit = regexTester(/^[0-9]$/);
var $PromiseResolve = callBound('Promise.resolve', true);
var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));
var $gOPS = $SymbolValueOf ? GetIntrinsic('%Object.getOwnPropertySymbols%') : null;

var padTimeComponent = function padTimeComponent(c, count) {
  return $strSlice('00' + c, -(count || 2));
};

var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var OwnPropertyKeys = function OwnPropertyKeys(ES, source) {
  var ownKeys = keys(source);

  if ($gOPS) {
    $pushApply(ownKeys, $gOPS(source));
  }

  return ownKeys;
};

var ES2018 = assign(assign({}, ES2017), {
  EnumerableOwnPropertyNames: ES2017.EnumerableOwnProperties,
  // https://ecma-international.org/ecma-262/9.0/#sec-thissymbolvalue
  thisSymbolValue: function thisSymbolValue(value) {
    if (!$SymbolValueOf) {
      throw new SyntaxError('Symbols are not supported; thisSymbolValue requires that `value` be a Symbol or a Symbol object');
    }

    if (this.Type(value) === 'Symbol') {
      return value;
    }

    return $SymbolValueOf(value);
  },
  // https://www.ecma-international.org/ecma-262/9.0/#sec-isstringprefix
  IsStringPrefix: function IsStringPrefix(p, q) {
    if (this.Type(p) !== 'String') {
      throw new TypeError('Assertion failed: "p" must be a String');
    }

    if (this.Type(q) !== 'String') {
      throw new TypeError('Assertion failed: "q" must be a String');
    }

    return isPrefixOf(p, q);
    /*
    if (p === q || p === '') {
    	return true;
    }
    	var pLength = p.length;
    var qLength = q.length;
    if (pLength >= qLength) {
    	return false;
    }
    	// assert: pLength < qLength
    	for (var i = 0; i < pLength; i += 1) {
    	if ($charAt(p, i) !== $charAt(q, i)) {
    		return false;
    	}
    }
    return true;
    */
  },
  // https://www.ecma-international.org/ecma-262/9.0/#sec-tostring-applied-to-the-number-type
  NumberToString: function NumberToString(m) {
    if (this.Type(m) !== 'Number') {
      throw new TypeError('Assertion failed: "m" must be a String');
    }

    return $String(m);
  },
  // https://www.ecma-international.org/ecma-262/9.0/#sec-copydataproperties
  CopyDataProperties: function CopyDataProperties(target, source, excludedItems) {
    if (this.Type(target) !== 'Object') {
      throw new TypeError('Assertion failed: "target" must be an Object');
    }

    if (!this.IsArray(excludedItems)) {
      throw new TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
    }

    for (var i = 0; i < excludedItems.length; i += 1) {
      if (!this.IsPropertyKey(excludedItems[i])) {
        throw new TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
      }
    }

    if (typeof source === 'undefined' || source === null) {
      return target;
    }

    var ES = this;
    var fromObj = ES.ToObject(source);
    var sourceKeys = OwnPropertyKeys(ES, fromObj);
    forEach(sourceKeys, function (nextKey) {
      var excluded = false;
      forEach(excludedItems, function (e) {
        if (ES.SameValue(e, nextKey) === true) {
          excluded = true;
        }
      });
      var enumerable = $isEnumerable(fromObj, nextKey) || // this is to handle string keys being non-enumerable in older engines
      typeof source === 'string' && nextKey >= 0 && ES.IsInteger(ES.ToNumber(nextKey));

      if (excluded === false && enumerable) {
        var propValue = ES.Get(fromObj, nextKey);
        ES.CreateDataProperty(target, nextKey, propValue);
      }
    });
    return target;
  },
  // https://ecma-international.org/ecma-262/9.0/#sec-promise-resolve
  PromiseResolve: function PromiseResolve(C, x) {
    if (!$PromiseResolve) {
      throw new SyntaxError('This environment does not support Promises.');
    }

    return $PromiseResolve(C, x);
  },
  // http://www.ecma-international.org/ecma-262/9.0/#sec-getsubstitution
  // eslint-disable-next-line max-statements, max-params, max-lines-per-function
  GetSubstitution: function GetSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    if (this.Type(matched) !== 'String') {
      throw new $TypeError('Assertion failed: `matched` must be a String');
    }

    var matchLength = matched.length;

    if (this.Type(str) !== 'String') {
      throw new $TypeError('Assertion failed: `str` must be a String');
    }

    var stringLength = str.length;

    if (!this.IsInteger(position) || position < 0 || position > stringLength) {
      throw new $TypeError('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
    }

    var ES = this;

    var isStringOrHole = function (capture, index, arr) {
      return ES.Type(capture) === 'String' || !(index in arr);
    };

    if (!this.IsArray(captures) || !every(captures, isStringOrHole)) {
      throw new $TypeError('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
    }

    if (this.Type(replacement) !== 'String') {
      throw new $TypeError('Assertion failed: `replacement` must be a String');
    }

    var tailPos = position + matchLength;
    var m = captures.length;

    if (this.Type(namedCaptures) !== 'Undefined') {
      namedCaptures = this.ToObject(namedCaptures); // eslint-disable-line no-param-reassign
    }

    var result = '';

    for (var i = 0; i < replacement.length; i += 1) {
      // if this is a $, and it's not the end of the replacement
      var current = replacement[i];
      var isLast = i + 1 >= replacement.length;
      var nextIsLast = i + 2 >= replacement.length;

      if (current === '$' && !isLast) {
        var next = replacement[i + 1];

        if (next === '$') {
          result += '$';
          i += 1;
        } else if (next === '&') {
          result += matched;
          i += 1;
        } else if (next === '`') {
          result += position === 0 ? '' : $strSlice(str, 0, position - 1);
          i += 1;
        } else if (next === "'") {
          result += tailPos >= stringLength ? '' : $strSlice(str, tailPos);
          i += 1;
        } else {
          var nextNext = nextIsLast ? null : replacement[i + 2];

          if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
            // $1 through $9, and not followed by a digit
            var n = $parseInt(next, 10); // if (n > m, impl-defined)

            result += n <= m && this.Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
            i += 1;
          } else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
            // $00 through $99
            var nn = next + nextNext;
            var nnI = $parseInt(nn, 10) - 1; // if nn === '00' or nn > m, impl-defined

            result += nn <= m && this.Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
            i += 2;
          } else if (next === '<') {
            // eslint-disable-next-line max-depth
            if (this.Type(namedCaptures) === 'Undefined') {
              result += '$<';
              i += 2;
            } else {
              var endIndex = $indexOf(replacement, '>', i); // eslint-disable-next-line max-depth

              if (endIndex > -1) {
                var groupName = $strSlice(replacement, i, endIndex);
                var capture = this.Get(namedCaptures, groupName); // eslint-disable-next-line max-depth

                if (this.Type(capture) !== 'Undefined') {
                  result += this.ToString(capture);
                }

                i += '$<' + groupName + '>'.length;
              }
            }
          } else {
            result += '$';
          }
        }
      } else {
        // the final $, or else not a $
        result += replacement[i];
      }
    }

    return result;
  },
  // https://www.ecma-international.org/ecma-262/9.0/#sec-datestring
  DateString: function DateString(tv) {
    if (this.Type(tv) !== 'Number' || $isNaN(tv)) {
      throw new $TypeError('Assertion failed: `tv` must be a non-NaN Number');
    }

    var weekday = weekdays[this.WeekDay(tv)];
    var month = months[this.MonthFromTime(tv)];
    var day = padTimeComponent(this.DateFromTime(tv));
    var year = padTimeComponent(this.YearFromTime(tv), 4);
    return weekday + '\x20' + month + '\x20' + day + '\x20' + year;
  },
  // https://www.ecma-international.org/ecma-262/9.0/#sec-timestring
  TimeString: function TimeString(tv) {
    if (this.Type(tv) !== 'Number' || $isNaN(tv)) {
      throw new $TypeError('Assertion failed: `tv` must be a non-NaN Number');
    }

    var hour = this.HourFromTime(tv);
    var minute = this.MinFromTime(tv);
    var second = this.SecFromTime(tv);
    return padTimeComponent(hour) + ':' + padTimeComponent(minute) + ':' + padTimeComponent(second) + '\x20GMT';
  }
});
delete ES2018.EnumerableOwnProperties; // replaced with EnumerableOwnPropertyNames

delete ES2018.IsPropertyDescriptor; // not an actual abstract operation

module.exports = ES2018;
},{"./GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","object-keys":"../../node_modules/object-keys/index.js","object-inspect":"../../node_modules/object-inspect/index.js","./es2017":"../../node_modules/es-abstract/es2017.js","./helpers/assign":"../../node_modules/es-abstract/helpers/assign.js","./helpers/forEach":"../../node_modules/es-abstract/helpers/forEach.js","./helpers/callBind":"../../node_modules/es-abstract/helpers/callBind.js","./helpers/every":"../../node_modules/es-abstract/helpers/every.js","./helpers/isPrefixOf":"../../node_modules/es-abstract/helpers/isPrefixOf.js","./helpers/callBound":"../../node_modules/es-abstract/helpers/callBound.js","./helpers/regexTester":"../../node_modules/es-abstract/helpers/regexTester.js","./helpers/isNaN":"../../node_modules/es-abstract/helpers/isNaN.js"}],"../../node_modules/es-abstract/es2019.js":[function(require,module,exports) {
'use strict';

var trimStart = require('string.prototype.trimleft');

var trimEnd = require('string.prototype.trimright');

var inspect = require('object-inspect');

var ES2018 = require('./es2018');

var assign = require('./helpers/assign');

var MAX_SAFE_INTEGER = require('./helpers/maxSafeInteger');

var GetIntrinsic = require('./GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var ES2019 = assign(assign({}, ES2018), {
  // https://tc39.es/ecma262/#sec-add-entries-from-iterable
  AddEntriesFromIterable: function AddEntriesFromIterable(target, iterable, adder) {
    if (!this.IsCallable(adder)) {
      throw new $TypeError('Assertion failed: `adder` is not callable');
    }

    if (iterable == null) {
      throw new $TypeError('Assertion failed: `iterable` is present, and not nullish');
    }

    var iteratorRecord = this.GetIterator(iterable);

    while (true) {
      // eslint-disable-line no-constant-condition
      var next = this.IteratorStep(iteratorRecord);

      if (!next) {
        return target;
      }

      var nextItem = this.IteratorValue(next);

      if (this.Type(nextItem) !== 'Object') {
        var error = new $TypeError('iterator next must return an Object, got ' + inspect(nextItem));
        return this.IteratorClose(iteratorRecord, function () {
          throw error;
        } // eslint-disable-line no-loop-func
        );
      }

      try {
        var k = this.Get(nextItem, '0');
        var v = this.Get(nextItem, '1');
        this.Call(adder, target, [k, v]);
      } catch (e) {
        return this.IteratorClose(iteratorRecord, function () {
          throw e;
        });
      }
    }
  },
  // https://ecma-international.org/ecma-262/10.0/#sec-flattenintoarray
  // eslint-disable-next-line max-params, max-statements
  FlattenIntoArray: function FlattenIntoArray(target, source, sourceLen, start, depth) {
    var mapperFunction;

    if (arguments.length > 5) {
      mapperFunction = arguments[5];
    }

    var targetIndex = start;
    var sourceIndex = 0;

    while (sourceIndex < sourceLen) {
      var P = this.ToString(sourceIndex);
      var exists = this.HasProperty(source, P);

      if (exists === true) {
        var element = this.Get(source, P);

        if (typeof mapperFunction !== 'undefined') {
          if (arguments.length <= 6) {
            throw new $TypeError('Assertion failed: thisArg is required when mapperFunction is provided');
          }

          element = this.Call(mapperFunction, arguments[6], [element, sourceIndex, source]);
        }

        var shouldFlatten = false;

        if (depth > 0) {
          shouldFlatten = this.IsArray(element);
        }

        if (shouldFlatten) {
          var elementLen = this.ToLength(this.Get(element, 'length'));
          targetIndex = this.FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1);
        } else {
          if (targetIndex >= MAX_SAFE_INTEGER) {
            throw new $TypeError('index too large');
          }

          this.CreateDataPropertyOrThrow(target, this.ToString(targetIndex), element);
          targetIndex += 1;
        }
      }

      sourceIndex += 1;
    }

    return targetIndex;
  },
  // https://ecma-international.org/ecma-262/10.0/#sec-trimstring
  TrimString: function TrimString(string, where) {
    var str = this.RequireObjectCoercible(string);
    var S = this.ToString(str);
    var T;

    if (where === 'start') {
      T = trimStart(S);
    } else if (where === 'end') {
      T = trimEnd(S);
    } else if (where === 'start+end') {
      T = trimStart(trimEnd(S));
    } else {
      throw new $TypeError('Assertion failed: invalid `where` value; must be "start", "end", or "start+end"');
    }

    return T;
  }
});
module.exports = ES2019;
},{"string.prototype.trimleft":"../../node_modules/string.prototype.trimleft/index.js","string.prototype.trimright":"../../node_modules/string.prototype.trimright/index.js","object-inspect":"../../node_modules/object-inspect/index.js","./es2018":"../../node_modules/es-abstract/es2018.js","./helpers/assign":"../../node_modules/es-abstract/helpers/assign.js","./helpers/maxSafeInteger":"../../node_modules/es-abstract/helpers/maxSafeInteger.js","./GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js"}],"../../node_modules/regexp.prototype.flags/implementation.js":[function(require,module,exports) {
'use strict';

var toObject = Object;
var TypeErr = TypeError;

module.exports = function flags() {
  if (this != null && this !== toObject(this)) {
    throw new TypeErr('RegExp.prototype.flags getter called on non-object');
  }

  var result = '';

  if (this.global) {
    result += 'g';
  }

  if (this.ignoreCase) {
    result += 'i';
  }

  if (this.multiline) {
    result += 'm';
  }

  if (this.dotAll) {
    result += 's';
  }

  if (this.unicode) {
    result += 'u';
  }

  if (this.sticky) {
    result += 'y';
  }

  return result;
};
},{}],"../../node_modules/regexp.prototype.flags/polyfill.js":[function(require,module,exports) {
'use strict';

var implementation = require('./implementation');

var supportsDescriptors = require('define-properties').supportsDescriptors;

var gOPD = Object.getOwnPropertyDescriptor;
var TypeErr = TypeError;

module.exports = function getPolyfill() {
  if (!supportsDescriptors) {
    throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  }

  if (/a/mig.flags === 'gim') {
    var descriptor = gOPD(RegExp.prototype, 'flags');

    if (descriptor && typeof descriptor.get === 'function' && typeof /a/.dotAll === 'boolean') {
      return descriptor.get;
    }
  }

  return implementation;
};
},{"./implementation":"../../node_modules/regexp.prototype.flags/implementation.js","define-properties":"../../node_modules/define-properties/index.js"}],"../../node_modules/regexp.prototype.flags/shim.js":[function(require,module,exports) {
'use strict';

var supportsDescriptors = require('define-properties').supportsDescriptors;

var getPolyfill = require('./polyfill');

var gOPD = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var TypeErr = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;

module.exports = function shimFlags() {
  if (!supportsDescriptors || !getProto) {
    throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  }

  var polyfill = getPolyfill();
  var proto = getProto(regex);
  var descriptor = gOPD(proto, 'flags');

  if (!descriptor || descriptor.get !== polyfill) {
    defineProperty(proto, 'flags', {
      configurable: true,
      enumerable: false,
      get: polyfill
    });
  }

  return polyfill;
};
},{"define-properties":"../../node_modules/define-properties/index.js","./polyfill":"../../node_modules/regexp.prototype.flags/polyfill.js"}],"../../node_modules/regexp.prototype.flags/index.js":[function(require,module,exports) {

'use strict';

var define = require('define-properties');

var implementation = require('./implementation');

var getPolyfill = require('./polyfill');

var shim = require('./shim');

var flagsBound = Function.call.bind(implementation);
define(flagsBound, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim
});
module.exports = flagsBound;
},{"define-properties":"../../node_modules/define-properties/index.js","./implementation":"../../node_modules/regexp.prototype.flags/implementation.js","./polyfill":"../../node_modules/regexp.prototype.flags/polyfill.js","./shim":"../../node_modules/regexp.prototype.flags/shim.js"}],"../../node_modules/string.prototype.matchall/helpers/hidden.js":[function(require,module,exports) {

'use strict';

var define = require('define-properties');

module.exports = function getHiddenKeyManager() {
	var symbolCache = {};
	var makeKey = function key(prop) {
		if (symbolCache['$' + prop]) {
			return symbolCache['$' + prop];
		}
		if (typeof Symbol === 'function') {
			symbolCache['$' + prop] = Symbol(prop);
			return symbolCache['$' + prop];
		}
		return '___ ' + prop + ' ___';
	};
	return {
		get: function get(obj, prop) {
			return obj[makeKey(prop)];
		},
		has: function has(obj, prop) {
			return makeKey(prop) in obj;
		},
		set: function set(obj, prop, value) {
			var key = makeKey(prop);
			if (define.supportsDescriptors) {
				Object.defineProperty(obj, key, {
					configurable: false,
					enumerable: false,
					value: value,
					writable: true
				});
			} else {
				obj[key] = value;
			}
		}
	};
};

},{"define-properties":"../../node_modules/define-properties/index.js"}],"../../node_modules/string.prototype.matchall/helpers/RegExpStringIterator.js":[function(require,module,exports) {

var global = arguments[3];
'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es2019');
var GetIntrinsic = require('es-abstract/GetIntrinsic');
var hasSymbols = require('has-symbols')();

var hidden = require('./hidden')();
var undefined;

var RegExpStringIterator = function RegExpStringIterator(R, S, global, fullUnicode) {
	if (ES.Type(S) !== 'String') {
		throw new TypeError('S must be a string');
	}
	if (ES.Type(global) !== 'Boolean') {
		throw new TypeError('global must be a boolean');
	}
	if (ES.Type(fullUnicode) !== 'Boolean') {
		throw new TypeError('fullUnicode must be a boolean');
	}
	hidden.set(this, '[[IteratingRegExp]]', R);
	hidden.set(this, '[[IteratedString]]', S);
	hidden.set(this, '[[Global]]', global);
	hidden.set(this, '[[Unicode]]', fullUnicode);
	hidden.set(this, '[[Done]]', false);
};

var IteratorPrototype = GetIntrinsic('%IteratorPrototype%', true);
if (IteratorPrototype) {
	RegExpStringIterator.prototype = ES.ObjectCreate(IteratorPrototype);
}

define(RegExpStringIterator.prototype, {
	next: function next() {
		var O = this;
		if (ES.Type(O) !== 'Object') {
			throw new TypeError('receiver must be an object');
		}
		if (
			!(O instanceof RegExpStringIterator)
			|| !hidden.has(O, '[[IteratingRegExp]]')
			|| !hidden.has(O, '[[IteratedString]]')
			|| !hidden.has(O, '[[Global]]')
			|| !hidden.has(O, '[[Unicode]]')
			|| !hidden.has(O, '[[Done]]')
		) {
			throw new TypeError('"this" value must be a RegExpStringIterator instance');
		}
		if (hidden.get(O, '[[Done]]')) {
			return ES.CreateIterResultObject(undefined, true);
		}
		var R = hidden.get(O, '[[IteratingRegExp]]');
		var S = hidden.get(O, '[[IteratedString]]');
		var global = hidden.get(O, '[[Global]]');
		var fullUnicode = hidden.get(O, '[[Unicode]]');
		var match = ES.RegExpExec(R, S);
		if (match === null) {
			hidden.set(O, '[[Done]]', true);
			return ES.CreateIterResultObject(undefined, true);
		}
		if (global) {
			var matchStr = ES.ToString(ES.Get(match, '0'));
			if (matchStr === '') {
				var thisIndex = ES.ToLength(ES.Get(R, 'lastIndex'));
				var nextIndex = ES.AdvanceStringIndex(S, thisIndex, fullUnicode);
				ES.Set(R, 'lastIndex', nextIndex, true);
			}
			return ES.CreateIterResultObject(match, false);
		}
		hidden.set(O, '[[Done]]', true);
		return ES.CreateIterResultObject(match, false);
	}
});
if (hasSymbols) {
	var defineP = Object.defineProperty;
	if (Symbol.toStringTag) {
		if (defineP) {
			defineP(RegExpStringIterator.prototype, Symbol.toStringTag, {
				configurable: true,
				enumerable: false,
				value: 'RegExp String Iterator',
				writable: false
			});
		} else {
			RegExpStringIterator.prototype[Symbol.toStringTag] = 'RegExp String Iterator';
		}
	}

	if (!IteratorPrototype && Symbol.iterator) {
		var func = {};
		func[Symbol.iterator] = RegExpStringIterator.prototype[Symbol.iterator] || function SymbolIterator() {
			return this;
		};
		var predicate = {};
		predicate[Symbol.iterator] = function () {
			return RegExpStringIterator.prototype[Symbol.iterator] !== func[Symbol.iterator];
		};
		define(RegExpStringIterator.prototype, func, predicate);
	}
}

module.exports = RegExpStringIterator;

},{"define-properties":"../../node_modules/define-properties/index.js","es-abstract/es2019":"../../node_modules/es-abstract/es2019.js","es-abstract/GetIntrinsic":"../../node_modules/es-abstract/GetIntrinsic.js","has-symbols":"../../node_modules/has-symbols/index.js","./hidden":"../../node_modules/string.prototype.matchall/helpers/hidden.js"}],"../../node_modules/string.prototype.matchall/regexp-matchall.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var ES = require('es-abstract/es2019');
var flagsGetter = require('regexp.prototype.flags');

var RegExpStringIterator = require('./helpers/RegExpStringIterator');
var OrigRegExp = RegExp;

var CreateRegExpStringIterator = function CreateRegExpStringIterator(R, S, global, fullUnicode) {
	if (ES.Type(S) !== 'String') {
		throw new TypeError('"S" value must be a String');
	}
	if (ES.Type(global) !== 'Boolean') {
		throw new TypeError('"global" value must be a Boolean');
	}
	if (ES.Type(fullUnicode) !== 'Boolean') {
		throw new TypeError('"fullUnicode" value must be a Boolean');
	}

	var iterator = new RegExpStringIterator(R, S, global, fullUnicode);
	return iterator;
};

var supportsConstructingWithFlags = 'flags' in RegExp.prototype;

var constructRegexWithFlags = function constructRegex(C, R) {
	var matcher;
	// workaround for older engines that lack RegExp.prototype.flags
	var flags = 'flags' in R ? ES.Get(R, 'flags') : ES.ToString(flagsGetter(R));
	if (supportsConstructingWithFlags && typeof flags === 'string') {
		matcher = new C(R, flags);
	} else if (C === OrigRegExp) {
		// workaround for older engines that can not construct a RegExp with flags
		matcher = new C(R.source, flags);
	} else {
		matcher = new C(R, flags);
	}
	return { flags: flags, matcher: matcher };
};

var regexMatchAll = function SymbolMatchAll(string) {
	var R = this;
	if (ES.Type(R) !== 'Object') {
		throw new TypeError('"this" value must be an Object');
	}
	var S = ES.ToString(string);
	var C = ES.SpeciesConstructor(R, OrigRegExp);

	var tmp = constructRegexWithFlags(C, R);
	// var flags = ES.ToString(ES.Get(R, 'flags'));
	var flags = tmp.flags;
	// var matcher = ES.Construct(C, [R, flags]);
	var matcher = tmp.matcher;

	var lastIndex = ES.ToLength(ES.Get(R, 'lastIndex'));
	ES.Set(matcher, 'lastIndex', lastIndex, true);
	var global = flags.indexOf('g') > -1;
	var fullUnicode = flags.indexOf('u') > -1;
	return CreateRegExpStringIterator(matcher, S, global, fullUnicode);
};

var defineP = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

if (defineP && gOPD) {
	var desc = gOPD(regexMatchAll, 'name');
	if (desc && desc.configurable) {
		defineP(regexMatchAll, 'name', { value: '[Symbol.matchAll]' });
	}
}

module.exports = regexMatchAll;

},{"es-abstract/es2019":"../../node_modules/es-abstract/es2019.js","regexp.prototype.flags":"../../node_modules/regexp.prototype.flags/index.js","./helpers/RegExpStringIterator":"../../node_modules/string.prototype.matchall/helpers/RegExpStringIterator.js"}],"../../node_modules/string.prototype.matchall/polyfill-regexp-matchall.js":[function(require,module,exports) {
'use strict';

var hasSymbols = require('has-symbols')();
var regexpMatchAll = require('./regexp-matchall');

module.exports = function getRegExpMatchAllPolyfill() {
	if (!hasSymbols || typeof Symbol.matchAll !== 'symbol' || typeof RegExp.prototype[Symbol.matchAll] !== 'function') {
		return regexpMatchAll;
	}
	return RegExp.prototype[Symbol.matchAll];
};

},{"has-symbols":"../../node_modules/has-symbols/index.js","./regexp-matchall":"../../node_modules/string.prototype.matchall/regexp-matchall.js"}],"../../node_modules/string.prototype.matchall/implementation.js":[function(require,module,exports) {
'use strict';

var ES = require('es-abstract/es2019');
var hasSymbols = require('has-symbols')();

var regexpMatchAllPolyfill = require('./polyfill-regexp-matchall');

var getMatcher = function getMatcher(regexp) { // eslint-disable-line consistent-return
	var matcherPolyfill = regexpMatchAllPolyfill();
	if (hasSymbols && typeof Symbol.matchAll === 'symbol') {
		var matcher = ES.GetMethod(regexp, Symbol.matchAll);
		if (matcher === RegExp.prototype[Symbol.matchAll] && matcher !== matcherPolyfill) {
			return matcherPolyfill;
		}
		return matcher;
	}
	// fallback for pre-Symbol.matchAll environments
	if (ES.IsRegExp(regexp)) {
		return matcherPolyfill;
	}
};

module.exports = function matchAll(regexp) {
	var O = ES.RequireObjectCoercible(this);

	if (typeof regexp !== 'undefined' && regexp !== null) {
		var matcher = getMatcher(regexp);
		if (typeof matcher !== 'undefined') {
			return ES.Call(matcher, regexp, [O]);
		}
	}

	var S = ES.ToString(O);
	// var rx = ES.RegExpCreate(regexp, 'g');
	var rx = new RegExp(regexp, 'g');
	return ES.Call(getMatcher(rx), rx, [S]);
};

},{"es-abstract/es2019":"../../node_modules/es-abstract/es2019.js","has-symbols":"../../node_modules/has-symbols/index.js","./polyfill-regexp-matchall":"../../node_modules/string.prototype.matchall/polyfill-regexp-matchall.js"}],"../../node_modules/string.prototype.matchall/polyfill.js":[function(require,module,exports) {
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return String.prototype.matchAll || implementation;
};

},{"./implementation":"../../node_modules/string.prototype.matchall/implementation.js"}],"../../node_modules/string.prototype.matchall/shim.js":[function(require,module,exports) {

'use strict';

var define = require('define-properties');
var hasSymbols = require('has-symbols')();
var getPolyfill = require('./polyfill');
var regexpMatchAllPolyfill = require('./polyfill-regexp-matchall');

var defineP = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

module.exports = function shimMatchAll() {
	var polyfill = getPolyfill();
	define(
		String.prototype,
		{ matchAll: polyfill },
		{ matchAll: function () { return String.prototype.matchAll !== polyfill; } }
	);
	if (hasSymbols) {
		// eslint-disable-next-line no-restricted-properties
		var symbol = Symbol.matchAll || (Symbol['for'] ? Symbol['for']('Symbol.matchAll') : Symbol('Symbol.matchAll'));
		define(
			Symbol,
			{ matchAll: symbol },
			{ matchAll: function () { return Symbol.matchAll !== symbol; } }
		);

		if (defineP && gOPD) {
			var desc = gOPD(Symbol, symbol);
			if (!desc || desc.configurable) {
				defineP(Symbol, symbol, {
					configurable: false,
					enumerable: false,
					value: symbol,
					writable: false
				});
			}
		}

		var regexpMatchAll = regexpMatchAllPolyfill();
		var func = {};
		func[symbol] = regexpMatchAll;
		var predicate = {};
		predicate[symbol] = function () {
			return RegExp.prototype[symbol] !== regexpMatchAll;
		};
		define(RegExp.prototype, func, predicate);
	}
	return polyfill;
};

},{"define-properties":"../../node_modules/define-properties/index.js","has-symbols":"../../node_modules/has-symbols/index.js","./polyfill":"../../node_modules/string.prototype.matchall/polyfill.js","./polyfill-regexp-matchall":"../../node_modules/string.prototype.matchall/polyfill-regexp-matchall.js"}],"../../node_modules/string.prototype.matchall/index.js":[function(require,module,exports) {

'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundMatchAll = bind.call(Function.call, implementation);

define(boundMatchAll, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundMatchAll;

},{"function-bind":"../../node_modules/function-bind/index.js","define-properties":"../../node_modules/define-properties/index.js","./implementation":"../../node_modules/string.prototype.matchall/implementation.js","./polyfill":"../../node_modules/string.prototype.matchall/polyfill.js","./shim":"../../node_modules/string.prototype.matchall/shim.js"}],"../scripts/lib/matchall.js":[function(require,module,exports) {
"use strict";

var _stringPrototype = _interopRequireDefault(require("string.prototype.matchall"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// matchAll対応できないブラウザーの対策polyfill
// https://developers.google.com/web/updates/2019/02/string-matchall
_stringPrototype.default.shim();
},{"string.prototype.matchall":"../../node_modules/string.prototype.matchall/index.js"}],"../../node_modules/clipboard/dist/clipboard.js":[function(require,module,exports) {
var define;
/*!
 * clipboard.js v2.0.4
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (typeof exports === 'object') exports["ClipboardJS"] = factory();else root["ClipboardJS"] = factory();
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      var _clipboardAction = __webpack_require__(1);

      var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

      var _tinyEmitter = __webpack_require__(3);

      var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

      var _goodListener = __webpack_require__(4);

      var _goodListener2 = _interopRequireDefault(_goodListener);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * Base class which takes one or more elements, adds event listeners to them,
       * and instantiates a new `ClipboardAction` on each click.
       */


      var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);
        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */


        function Clipboard(trigger, options) {
          _classCallCheck(this, Clipboard);

          var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

          _this.resolveOptions(options);

          _this.listenClick(trigger);

          return _this;
        }
        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
          key: 'resolveOptions',
          value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            this.container = _typeof(options.container) === 'object' ? options.container : document.body;
          }
          /**
           * Adds a click event listener to the passed trigger.
           * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
           */

        }, {
          key: 'listenClick',
          value: function listenClick(trigger) {
            var _this2 = this;

            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
              return _this2.onClick(e);
            });
          }
          /**
           * Defines a new `ClipboardAction` on each click event.
           * @param {Event} e
           */

        }, {
          key: 'onClick',
          value: function onClick(e) {
            var trigger = e.delegateTarget || e.currentTarget;

            if (this.clipboardAction) {
              this.clipboardAction = null;
            }

            this.clipboardAction = new _clipboardAction2.default({
              action: this.action(trigger),
              target: this.target(trigger),
              text: this.text(trigger),
              container: this.container,
              trigger: trigger,
              emitter: this
            });
          }
          /**
           * Default `action` lookup function.
           * @param {Element} trigger
           */

        }, {
          key: 'defaultAction',
          value: function defaultAction(trigger) {
            return getAttributeValue('action', trigger);
          }
          /**
           * Default `target` lookup function.
           * @param {Element} trigger
           */

        }, {
          key: 'defaultTarget',
          value: function defaultTarget(trigger) {
            var selector = getAttributeValue('target', trigger);

            if (selector) {
              return document.querySelector(selector);
            }
          }
          /**
           * Returns the support of the given action, or all actions if no action is
           * given.
           * @param {String} [action]
           */

        }, {
          key: 'defaultText',

          /**
           * Default `text` lookup function.
           * @param {Element} trigger
           */
          value: function defaultText(trigger) {
            return getAttributeValue('text', trigger);
          }
          /**
           * Destroy lifecycle.
           */

        }, {
          key: 'destroy',
          value: function destroy() {
            this.listener.destroy();

            if (this.clipboardAction) {
              this.clipboardAction.destroy();
              this.clipboardAction = null;
            }
          }
        }], [{
          key: 'isSupported',
          value: function isSupported() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
            var actions = typeof action === 'string' ? [action] : action;
            var support = !!document.queryCommandSupported;
            actions.forEach(function (action) {
              support = support && !!document.queryCommandSupported(action);
            });
            return support;
          }
        }]);

        return Clipboard;
      }(_tinyEmitter2.default);
      /**
       * Helper function to retrieve attribute value.
       * @param {String} suffix
       * @param {Element} element
       */


      function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
          return;
        }

        return element.getAttribute(attribute);
      }

      module.exports = Clipboard;
      /***/
    },
    /* 1 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      var _select = __webpack_require__(2);

      var _select2 = _interopRequireDefault(_select);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * Inner class which performs selection from either `text` or `target`
       * properties and then executes copy or cut operations.
       */


      var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
          _classCallCheck(this, ClipboardAction);

          this.resolveOptions(options);
          this.initSelection();
        }
        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
          key: 'resolveOptions',
          value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this.action = options.action;
            this.container = options.container;
            this.emitter = options.emitter;
            this.target = options.target;
            this.text = options.text;
            this.trigger = options.trigger;
            this.selectedText = '';
          }
          /**
           * Decides which selection strategy is going to be applied based
           * on the existence of `text` and `target` properties.
           */

        }, {
          key: 'initSelection',
          value: function initSelection() {
            if (this.text) {
              this.selectFake();
            } else if (this.target) {
              this.selectTarget();
            }
          }
          /**
           * Creates a fake textarea element, sets its value from `text` property,
           * and makes a selection on it.
           */

        }, {
          key: 'selectFake',
          value: function selectFake() {
            var _this = this;

            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';
            this.removeFake();

            this.fakeHandlerCallback = function () {
              return _this.removeFake();
            };

            this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;
            this.fakeElem = document.createElement('textarea'); // Prevent zooming on iOS

            this.fakeElem.style.fontSize = '12pt'; // Reset box model

            this.fakeElem.style.border = '0';
            this.fakeElem.style.padding = '0';
            this.fakeElem.style.margin = '0'; // Move element out of screen horizontally

            this.fakeElem.style.position = 'absolute';
            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
            this.fakeElem.style.top = yPosition + 'px';
            this.fakeElem.setAttribute('readonly', '');
            this.fakeElem.value = this.text;
            this.container.appendChild(this.fakeElem);
            this.selectedText = (0, _select2.default)(this.fakeElem);
            this.copyText();
          }
          /**
           * Only removes the fake element after another click event, that way
           * a user can hit `Ctrl+C` to copy because selection still exists.
           */

        }, {
          key: 'removeFake',
          value: function removeFake() {
            if (this.fakeHandler) {
              this.container.removeEventListener('click', this.fakeHandlerCallback);
              this.fakeHandler = null;
              this.fakeHandlerCallback = null;
            }

            if (this.fakeElem) {
              this.container.removeChild(this.fakeElem);
              this.fakeElem = null;
            }
          }
          /**
           * Selects the content from element passed on `target` property.
           */

        }, {
          key: 'selectTarget',
          value: function selectTarget() {
            this.selectedText = (0, _select2.default)(this.target);
            this.copyText();
          }
          /**
           * Executes the copy operation based on the current selection.
           */

        }, {
          key: 'copyText',
          value: function copyText() {
            var succeeded = void 0;

            try {
              succeeded = document.execCommand(this.action);
            } catch (err) {
              succeeded = false;
            }

            this.handleResult(succeeded);
          }
          /**
           * Fires an event based on the copy operation result.
           * @param {Boolean} succeeded
           */

        }, {
          key: 'handleResult',
          value: function handleResult(succeeded) {
            this.emitter.emit(succeeded ? 'success' : 'error', {
              action: this.action,
              text: this.selectedText,
              trigger: this.trigger,
              clearSelection: this.clearSelection.bind(this)
            });
          }
          /**
           * Moves focus away from `target` and back to the trigger, removes current selection.
           */

        }, {
          key: 'clearSelection',
          value: function clearSelection() {
            if (this.trigger) {
              this.trigger.focus();
            }

            window.getSelection().removeAllRanges();
          }
          /**
           * Sets the `action` to be performed which can be either 'copy' or 'cut'.
           * @param {String} action
           */

        }, {
          key: 'destroy',

          /**
           * Destroy lifecycle.
           */
          value: function destroy() {
            this.removeFake();
          }
        }, {
          key: 'action',
          set: function set() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';
            this._action = action;

            if (this._action !== 'copy' && this._action !== 'cut') {
              throw new Error('Invalid "action" value, use either "copy" or "cut"');
            }
          }
          /**
           * Gets the `action` property.
           * @return {String}
           */
          ,
          get: function get() {
            return this._action;
          }
          /**
           * Sets the `target` property using an element
           * that will be have its content copied.
           * @param {Element} target
           */

        }, {
          key: 'target',
          set: function set(target) {
            if (target !== undefined) {
              if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                if (this.action === 'copy' && target.hasAttribute('disabled')) {
                  throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                }

                if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                  throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                }

                this._target = target;
              } else {
                throw new Error('Invalid "target" value, use a valid Element');
              }
            }
          }
          /**
           * Gets the `target` property.
           * @return {String|HTMLElement}
           */
          ,
          get: function get() {
            return this._target;
          }
        }]);

        return ClipboardAction;
      }();

      module.exports = ClipboardAction;
      /***/
    },
    /* 2 */

    /***/
    function (module, exports) {
      function select(element) {
        var selectedText;

        if (element.nodeName === 'SELECT') {
          element.focus();
          selectedText = element.value;
        } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
          var isReadOnly = element.hasAttribute('readonly');

          if (!isReadOnly) {
            element.setAttribute('readonly', '');
          }

          element.select();
          element.setSelectionRange(0, element.value.length);

          if (!isReadOnly) {
            element.removeAttribute('readonly');
          }

          selectedText = element.value;
        } else {
          if (element.hasAttribute('contenteditable')) {
            element.focus();
          }

          var selection = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(element);
          selection.removeAllRanges();
          selection.addRange(range);
          selectedText = selection.toString();
        }

        return selectedText;
      }

      module.exports = select;
      /***/
    },
    /* 3 */

    /***/
    function (module, exports) {
      function E() {// Keep this empty so it's easier to inherit from
        // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
      }

      E.prototype = {
        on: function (name, callback, ctx) {
          var e = this.e || (this.e = {});
          (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx
          });
          return this;
        },
        once: function (name, callback, ctx) {
          var self = this;

          function listener() {
            self.off(name, listener);
            callback.apply(ctx, arguments);
          }

          ;
          listener._ = callback;
          return this.on(name, listener, ctx);
        },
        emit: function (name) {
          var data = [].slice.call(arguments, 1);
          var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
          var i = 0;
          var len = evtArr.length;

          for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
          }

          return this;
        },
        off: function (name, callback) {
          var e = this.e || (this.e = {});
          var evts = e[name];
          var liveEvents = [];

          if (evts && callback) {
            for (var i = 0, len = evts.length; i < len; i++) {
              if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
            }
          } // Remove event from queue to prevent memory leak
          // Suggested by https://github.com/lazd
          // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910


          liveEvents.length ? e[name] = liveEvents : delete e[name];
          return this;
        }
      };
      module.exports = E;
      /***/
    },
    /* 4 */

    /***/
    function (module, exports, __webpack_require__) {
      var is = __webpack_require__(5);

      var delegate = __webpack_require__(6);
      /**
       * Validates all params and calls the right
       * listener function based on its target type.
       *
       * @param {String|HTMLElement|HTMLCollection|NodeList} target
       * @param {String} type
       * @param {Function} callback
       * @return {Object}
       */


      function listen(target, type, callback) {
        if (!target && !type && !callback) {
          throw new Error('Missing required arguments');
        }

        if (!is.string(type)) {
          throw new TypeError('Second argument must be a String');
        }

        if (!is.fn(callback)) {
          throw new TypeError('Third argument must be a Function');
        }

        if (is.node(target)) {
          return listenNode(target, type, callback);
        } else if (is.nodeList(target)) {
          return listenNodeList(target, type, callback);
        } else if (is.string(target)) {
          return listenSelector(target, type, callback);
        } else {
          throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
        }
      }
      /**
       * Adds an event listener to a HTML element
       * and returns a remove listener function.
       *
       * @param {HTMLElement} node
       * @param {String} type
       * @param {Function} callback
       * @return {Object}
       */


      function listenNode(node, type, callback) {
        node.addEventListener(type, callback);
        return {
          destroy: function () {
            node.removeEventListener(type, callback);
          }
        };
      }
      /**
       * Add an event listener to a list of HTML elements
       * and returns a remove listener function.
       *
       * @param {NodeList|HTMLCollection} nodeList
       * @param {String} type
       * @param {Function} callback
       * @return {Object}
       */


      function listenNodeList(nodeList, type, callback) {
        Array.prototype.forEach.call(nodeList, function (node) {
          node.addEventListener(type, callback);
        });
        return {
          destroy: function () {
            Array.prototype.forEach.call(nodeList, function (node) {
              node.removeEventListener(type, callback);
            });
          }
        };
      }
      /**
       * Add an event listener to a selector
       * and returns a remove listener function.
       *
       * @param {String} selector
       * @param {String} type
       * @param {Function} callback
       * @return {Object}
       */


      function listenSelector(selector, type, callback) {
        return delegate(document.body, selector, type, callback);
      }

      module.exports = listen;
      /***/
    },
    /* 5 */

    /***/
    function (module, exports) {
      /**
       * Check if argument is a HTML element.
       *
       * @param {Object} value
       * @return {Boolean}
       */
      exports.node = function (value) {
        return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
      };
      /**
       * Check if argument is a list of HTML elements.
       *
       * @param {Object} value
       * @return {Boolean}
       */


      exports.nodeList = function (value) {
        var type = Object.prototype.toString.call(value);
        return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
      };
      /**
       * Check if argument is a string.
       *
       * @param {Object} value
       * @return {Boolean}
       */


      exports.string = function (value) {
        return typeof value === 'string' || value instanceof String;
      };
      /**
       * Check if argument is a function.
       *
       * @param {Object} value
       * @return {Boolean}
       */


      exports.fn = function (value) {
        var type = Object.prototype.toString.call(value);
        return type === '[object Function]';
      };
      /***/

    },
    /* 6 */

    /***/
    function (module, exports, __webpack_require__) {
      var closest = __webpack_require__(7);
      /**
       * Delegates event to a selector.
       *
       * @param {Element} element
       * @param {String} selector
       * @param {String} type
       * @param {Function} callback
       * @param {Boolean} useCapture
       * @return {Object}
       */


      function _delegate(element, selector, type, callback, useCapture) {
        var listenerFn = listener.apply(this, arguments);
        element.addEventListener(type, listenerFn, useCapture);
        return {
          destroy: function () {
            element.removeEventListener(type, listenerFn, useCapture);
          }
        };
      }
      /**
       * Delegates event to a selector.
       *
       * @param {Element|String|Array} [elements]
       * @param {String} selector
       * @param {String} type
       * @param {Function} callback
       * @param {Boolean} useCapture
       * @return {Object}
       */


      function delegate(elements, selector, type, callback, useCapture) {
        // Handle the regular Element usage
        if (typeof elements.addEventListener === 'function') {
          return _delegate.apply(null, arguments);
        } // Handle Element-less usage, it defaults to global delegation


        if (typeof type === 'function') {
          // Use `document` as the first parameter, then apply arguments
          // This is a short way to .unshift `arguments` without running into deoptimizations
          return _delegate.bind(null, document).apply(null, arguments);
        } // Handle Selector-based usage


        if (typeof elements === 'string') {
          elements = document.querySelectorAll(elements);
        } // Handle Array-like based usage


        return Array.prototype.map.call(elements, function (element) {
          return _delegate(element, selector, type, callback, useCapture);
        });
      }
      /**
       * Finds closest match and invokes callback.
       *
       * @param {Element} element
       * @param {String} selector
       * @param {String} type
       * @param {Function} callback
       * @return {Function}
       */


      function listener(element, selector, type, callback) {
        return function (e) {
          e.delegateTarget = closest(e.target, selector);

          if (e.delegateTarget) {
            callback.call(element, e);
          }
        };
      }

      module.exports = delegate;
      /***/
    },
    /* 7 */

    /***/
    function (module, exports) {
      var DOCUMENT_NODE_TYPE = 9;
      /**
       * A polyfill for Element.matches()
       */

      if (typeof Element !== 'undefined' && !Element.prototype.matches) {
        var proto = Element.prototype;
        proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
      }
      /**
       * Finds the closest parent that matches a selector.
       *
       * @param {Element} element
       * @param {String} selector
       * @return {Function}
       */


      function closest(element, selector) {
        while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
          if (typeof element.matches === 'function' && element.matches(selector)) {
            return element;
          }

          element = element.parentNode;
        }
      }

      module.exports = closest;
      /***/
    }
    /******/
    ])
  );
});
},{}],"../scripts/buttons/copy.js":[function(require,module,exports) {
"use strict";

var _clipboard = _interopRequireDefault(require("clipboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var copyButtons = new _clipboard.default('.copy');
copyButtons.on('success', function (e) {
  e.trigger.classList.add('btn-success');
}).on('error', function (e) {
  e.trigger.classList.add('btn-error');
});
},{"clipboard":"../../node_modules/clipboard/dist/clipboard.js"}],"../../node_modules/js-file-download/file-download.js":[function(require,module,exports) {
module.exports = function(data, filename, mime, bom) {
    var blobData = (typeof bom !== 'undefined') ? [bom, data] : [data]
    var blob = new Blob(blobData, {type: mime || 'application/octet-stream'});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were 
        // revoked by closing the blob for which they were created. 
        // These URLs will no longer resolve as the data backing 
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename); 
        
        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking 
        // is enabled.
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}

},{}],"../scripts/buttons/download.js":[function(require,module,exports) {
"use strict";

var _jsFileDownload = _interopRequireDefault(require("js-file-download"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonBox = document.querySelector('#json');
var csvBox = document.querySelector('#csv');
var downloadButtons = document.querySelectorAll('.download'); // JSONダウンロードボタン

downloadButtons[0].addEventListener('click', function () {
  (0, _jsFileDownload.default)(jsonBox.value, 'event-calendar-mt.json');
}); // CSVダウンロードボタン

downloadButtons[1].addEventListener('click', function () {
  (0, _jsFileDownload.default)(csvBox.value, 'event-calendar-mt.csv');
});
},{"js-file-download":"../../node_modules/js-file-download/file-download.js"}],"../scripts/buttons/upload.js":[function(require,module,exports) {
var inputBox = document.querySelector('#svg');
var uploadButton = document.querySelector('#upload-file'); // アップロードボタン

uploadButton.addEventListener('change', function () {
  // eslint-disable-line func-names
  var file = this.files[0];
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = function () {
    inputBox.value = reader.result;
  };
});
},{}],"../../node_modules/papaparse/papaparse.min.js":[function(require,module,exports) {
var define;
/* @license
Papa Parse
v4.6.3
https://github.com/mholt/PapaParse
License: MIT
*/
Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()}(this,function(){"use strict";var s,e,f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{},n=!f.document&&!!f.postMessage,o=n&&/(\?|&)papaworker(=|&|$)/.test(f.location.search),a=!1,h={},u=0,k={parse:function(e,t){var r=(t=t||{}).dynamicTyping||!1;z(r)&&(t.dynamicTypingFunction=r,r={});if(t.dynamicTyping=r,t.transform=!!z(t.transform)&&t.transform,t.worker&&k.WORKERS_SUPPORTED){var i=function(){if(!k.WORKERS_SUPPORTED)return!1;if(!a&&null===k.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var e=k.SCRIPT_PATH||s;e+=(-1!==e.indexOf("?")?"&":"?")+"papaworker";var t=new f.Worker(e);return t.onmessage=m,t.id=u++,h[t.id]=t}();return i.userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=z(t.step),t.chunk=z(t.chunk),t.complete=z(t.complete),t.error=z(t.error),delete t.worker,void i.postMessage({input:e,config:t,workerId:i.id})}var n=null;k.NODE_STREAM_INPUT,"string"==typeof e?n=t.download?new c(t):new _(t):!0===e.readable&&z(e.read)&&z(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new p(t));return n.stream(e)},unparse:function(e,t){var i=!1,g=!0,m=",",y="\r\n",n='"',r=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||k.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter);("boolean"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(r=t.skipEmptyLines);"string"==typeof t.newline&&(y=t.newline);"string"==typeof t.quoteChar&&(n=t.quoteChar);"boolean"==typeof t.header&&(g=t.header)}();var s=new RegExp(M(n),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return o(null,e,r);if("object"==typeof e[0])return o(a(e[0]),e,r)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:a(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),o(e.fields||[],e.data||[],r);throw"exception: Unable to serialize unrecognized input";function a(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function o(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&g){for(var a=0;a<e.length;a++)0<a&&(i+=m),i+=v(e[a],a);0<t.length&&(i+=y)}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(r&&!n&&(u="greedy"===r?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===r&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c])}u=""===d.join("").trim()}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(i+=m);var _=n&&s?e[p]:p;i+=v(t[o][_],p)}o<t.length-1&&(!r||0<h&&!f)&&(i+=y)}}return i}function v(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);e=e.toString().replace(s,n+n);var r="boolean"==typeof i&&i||Array.isArray(i)&&i[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1}(e,k.BAD_DELIMITERS)||-1<e.indexOf(m)||" "===e.charAt(0)||" "===e.charAt(e.length-1);return r?n+e+n:e}}};if(k.RECORD_SEP=String.fromCharCode(30),k.UNIT_SEP=String.fromCharCode(31),k.BYTE_ORDER_MARK="\ufeff",k.BAD_DELIMITERS=["\r","\n",'"',k.BYTE_ORDER_MARK],k.WORKERS_SUPPORTED=!n&&!!f.Worker,k.SCRIPT_PATH=null,k.NODE_STREAM_INPUT=1,k.LocalChunkSize=10485760,k.RemoteChunkSize=5242880,k.DefaultDelimiter=",",k.Parser=v,k.ParserHandle=r,k.NetworkStreamer=c,k.FileStreamer=p,k.StringStreamer=_,k.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var r=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},r)})}),e(),this;function e(){if(0!==h.length){var e,t,r,i,n=h[0];if(z(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,r=n.inputElem,i=s.reason,void(z(o.error)&&o.error({name:e},t,r,i));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config))}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){z(a)&&a(e,n.file,n.inputElem),u()},k.parse(n.file,n.instanceConfig)}else z(o.complete)&&o.complete()}function u(){h.splice(0,1),e()}}}function l(e){this._handle=null,this._finished=!1,this._completed=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=E(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new r(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&z(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r)}this.isFirstChunk=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:k.WORKER_ID,finished:a});else if(z(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return;n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!z(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}},this._sendError=function(e){z(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:k.WORKER_ID,error:e,finished:!1})}}function c(e){var i;(e=e||{}).chunkSize||(e.chunkSize=k.RemoteChunkSize),l.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),n||(i.onload=w(this._chunkLoaded,this),i.onerror=w(this._chunkError,this)),i.open("GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)i.setRequestHeader(t,e[t])}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r),i.setRequestHeader("If-None-Match","webkit-no-cache")}try{i.send()}catch(e){this._chunkError(e.message)}n&&0===i.status?this._chunkError():this._start+=this._config.chunkSize}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return-1;return parseInt(t.substr(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)))},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t))}}function p(e){var i,n;(e=e||{}).chunkSize||(e.chunkSize=k.LocalChunkSize),l.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=w(this._chunkLoaded,this),i.onerror=w(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t)}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(i.error)}}function _(e){var r;l.call(this,e=e||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}}}function g(e){l.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){l.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){l.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=w(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=w(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=w(function(){this._streamCleanUp(),i=!0,this._streamData("")},this),this._streamCleanUp=w(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function r(g){var a,o,h,i=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,n=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,t=this,r=0,s=0,u=!1,e=!1,f=[],d={data:[],errors:[],meta:{}};if(z(g.step)){var l=g.step;g.step=function(e){if(d=e,p())c();else{if(c(),0===d.data.length)return;r+=e.data.length,g.preview&&r>g.preview?o.abort():l(d,t)}}}function m(e){return"greedy"===g.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function c(){if(d&&h&&(y("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+k.DefaultDelimiter+"'"),h=!1),g.skipEmptyLines)for(var e=0;e<d.data.length;e++)m(d.data[e])&&d.data.splice(e--,1);return p()&&function(){if(!d)return;for(var e=0;p()&&e<d.data.length;e++)for(var t=0;t<d.data[e].length;t++){var r=d.data[e][t];g.trimHeaders&&(r=r.trim()),f.push(r)}d.data.splice(0,1)}(),function(){if(!d||!g.header&&!g.dynamicTyping&&!g.transform)return d;for(var e=0;e<d.data.length;e++){var t,r=g.header?{}:[];for(t=0;t<d.data[e].length;t++){var i=t,n=d.data[e][t];g.header&&(i=t>=f.length?"__parsed_extra":f[t]),g.transform&&(n=g.transform(n,i)),n=_(i,n),"__parsed_extra"===i?(r[i]=r[i]||[],r[i].push(n)):r[i]=n}d.data[e]=r,g.header&&(t>f.length?y("FieldMismatch","TooManyFields","Too many fields: expected "+f.length+" fields but parsed "+t,s+e):t<f.length&&y("FieldMismatch","TooFewFields","Too few fields: expected "+f.length+" fields but parsed "+t,s+e))}g.header&&d.meta&&(d.meta.fields=f);return s+=d.data.length,d}()}function p(){return g.header&&0===f.length}function _(e,t){return r=e,g.dynamicTypingFunction&&void 0===g.dynamicTyping[r]&&(g.dynamicTyping[r]=g.dynamicTypingFunction(r)),!0===(g.dynamicTyping[r]||g.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(i.test(t)?parseFloat(t):n.test(t)?new Date(t):""===t?null:t):t;var r}function y(e,t,r,i){d.errors.push({type:e,code:t,message:r,row:i})}this.parse=function(e,t,r){var i=g.quoteChar||'"';if(g.newline||(g.newline=function(e,t){e=e.substr(0,1048576);var r=new RegExp(M(t)+"([^]*?)"+M(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return"\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(e,i)),h=!1,g.delimiter)z(g.delimiter)&&(g.delimiter=g.delimiter(e),d.meta.delimiter=g.delimiter);else{var n=function(e,t,r,i){for(var n,s,a,o=[",","\t","|",";",k.RECORD_SEP,k.UNIT_SEP],h=0;h<o.length;h++){var u=o[h],f=0,d=0,l=0;a=void 0;for(var c=new v({comments:i,delimiter:u,newline:t,preview:10}).parse(e),p=0;p<c.data.length;p++)if(r&&m(c.data[p]))l++;else{var _=c.data[p].length;d+=_,void 0!==a?1<_&&(f+=Math.abs(_-a),a=_):a=0}0<c.data.length&&(d/=c.data.length-l),(void 0===s||s<f)&&1.99<d&&(s=f,n=u)}return{successful:!!(g.delimiter=n),bestDelimiter:n}}(e,g.newline,g.skipEmptyLines,g.comments);n.successful?g.delimiter=n.bestDelimiter:(h=!0,g.delimiter=k.DefaultDelimiter),d.meta.delimiter=g.delimiter}var s=E(g);return g.preview&&g.header&&s.preview++,a=e,o=new v(s),d=o.parse(a,t,r),c(),u?{meta:{paused:!0}}:d||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,o.abort(),a=a.substr(o.getCharIndex())},this.resume=function(){u=!1,t.streamer.parseChunk(a,!0)},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),d.meta.aborted=!0,z(g.complete)&&g.complete(d),a=""}}function M(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function v(e){var S,O=(e=e||{}).delimiter,x=e.newline,T=e.comments,I=e.step,A=e.preview,D=e.fastMode,L=S=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(L=e.escapeChar),("string"!=typeof O||-1<k.BAD_DELIMITERS.indexOf(O))&&(O=","),T===O)throw"Comment character same as delimiter";!0===T?T="#":("string"!=typeof T||-1<k.BAD_DELIMITERS.indexOf(T))&&(T=!1),"\n"!==x&&"\r"!==x&&"\r\n"!==x&&(x="\n");var P=0,F=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw"Input must be a string";var n=i.length,e=O.length,s=x.length,a=T.length,o=z(I),h=[],u=[],f=[],d=P=0;if(!i)return C();if(D||!1!==D&&-1===i.indexOf(S)){for(var l=i.split(x),c=0;c<l.length;c++){if(f=l[c],P+=f.length,c!==l.length-1)P+=x.length;else if(r)return C();if(!T||f.substr(0,a)!==T){if(o){if(h=[],k(f.split(O)),R(),F)return C()}else k(f.split(O));if(A&&A<=c)return h=h.slice(0,A),C(!0)}}return C()}for(var p,_=i.indexOf(O,P),g=i.indexOf(x,P),m=new RegExp(M(L)+M(S),"g");;)if(i[P]!==S)if(T&&0===f.length&&i.substr(P,a)===T){if(-1===g)return C();P=g+s,g=i.indexOf(x,P),_=i.indexOf(O,P)}else if(-1!==_&&(_<g||-1===g))f.push(i.substring(P,_)),P=_+e,_=i.indexOf(O,P);else{if(-1===g)break;if(f.push(i.substring(P,g)),w(g+s),o&&(R(),F))return C();if(A&&h.length>=A)return C(!0)}else for(p=P,P++;;){if(-1===(p=i.indexOf(S,p+1)))return r||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:P}),E();if(p===n-1)return E(i.substring(P,p).replace(m,S));if(S!==L||i[p+1]!==L){if(S===L||0===p||i[p-1]!==L){var y=b(-1===g?_:Math.min(_,g));if(i[p+1+y]===O){f.push(i.substring(P,p).replace(m,S)),P=p+1+y+e,_=i.indexOf(O,P),g=i.indexOf(x,P);break}var v=b(g);if(i.substr(p+1+v,s)===x){if(f.push(i.substring(P,p).replace(m,S)),w(p+1+v+s),_=i.indexOf(O,P),o&&(R(),F))return C();if(A&&h.length>=A)return C(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:P}),p++}}else p++}return E();function k(e){h.push(e),d=P}function b(e){var t=0;if(-1!==e){var r=i.substring(p+1,e);r&&""===r.trim()&&(t=r.length)}return t}function E(e){return r||(void 0===e&&(e=i.substr(P)),f.push(e),P=n,k(f),o&&R()),C()}function w(e){P=e,k(f),f=[],g=i.indexOf(x,P)}function C(e){return{data:h,errors:u,meta:{delimiter:O,linebreak:x,aborted:F,truncated:!!e,cursor:d+(t||0)}}}function R(){I(C()),h=[],u=[]}},this.abort=function(){F=!0},this.getCharIndex=function(){return P}}function m(e){var t=e.data,r=h[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,y(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:b,resume:b};if(z(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:[t.results.data[s]],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results}else z(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!i&&y(t.workerId,t.results)}function y(e,t){var r=h[e];z(r.userComplete)&&r.userComplete(t),r.terminate(),delete h[e]}function b(){throw"Not implemented."}function E(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=E(e[r]);return t}function w(e,t){return function(){e.apply(t,arguments)}}function z(e){return"function"==typeof e}return o?f.onmessage=function(e){var t=e.data;void 0===k.WORKER_ID&&t&&(k.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:k.WORKER_ID,results:k.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var r=k.parse(t.input,t.config);r&&f.postMessage({workerId:k.WORKER_ID,results:r,finished:!0})}}:k.WORKERS_SUPPORTED&&(e=document.getElementsByTagName("script"),s=e.length?e[e.length-1].src:"",document.body?document.addEventListener("DOMContentLoaded",function(){a=!0},!0):a=!0),(c.prototype=Object.create(l.prototype)).constructor=c,(p.prototype=Object.create(l.prototype)).constructor=p,(_.prototype=Object.create(_.prototype)).constructor=_,(g.prototype=Object.create(l.prototype)).constructor=g,k});
},{}],"../../node_modules/moment/moment.js":[function(require,module,exports) {
var define;
var global = arguments[3];
//! moment.js

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

},{}],"../../node_modules/moment-range/dist/moment-range.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("moment")):"function"==typeof define&&define.amd?define("moment-range",["moment"],e):"object"==typeof exports?exports["moment-range"]=e(require("moment")):t["moment-range"]=e(t.moment)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,n){"use strict";var r=n(5)();t.exports=function(t){return t!==r&&null!==t}},function(t,e,n){"use strict";t.exports=n(18)()?Symbol:n(20)},function(e,n){e.exports=t},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t){return t.range=function(e,n){var r=this;return"string"==typeof e&&y.hasOwnProperty(e)?new h(t(r).startOf(e),t(r).endOf(e)):new h(e,n)},t.rangeFromInterval=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t();if(t.isMoment(r)||(r=t(r)),!r.isValid())throw new Error("Invalid date.");var o=r.clone().add(n,e),i=[];return i.push(t.min(r,o)),i.push(t.max(r,o)),new h(i)},t.rangeFromISOString=function(e){var n=a(e),r=t.parseZone(n[0]),o=t.parseZone(n[1]);return new h(r,o)},t.parseZoneRange=t.rangeFromISOString,t.fn.range=t.range,t.range.constructor=h,t.isRange=function(t){return t instanceof h},t.fn.within=function(t){return t.contains(this.toDate())},t}function a(t){return t.split("/")}Object.defineProperty(e,"__esModule",{value:!0}),e.DateRange=void 0;var s=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.extendMoment=u;var l=n(2),v=r(l),d=n(1),p=r(d),y={year:!0,quarter:!0,month:!0,week:!0,day:!0,hour:!0,minute:!0,second:!0},h=e.DateRange=function(){function t(e,n){i(this,t);var r=e,o=n;if(1===arguments.length||void 0===n)if("object"===(void 0===e?"undefined":c(e))&&2===e.length){var u=s(e,2);r=u[0],o=u[1]}else if("string"==typeof e){var f=a(e),l=s(f,2);r=l[0],o=l[1]}this.start=r||0===r?(0,v.default)(r):(0,v.default)(-864e13),this.end=o||0===o?(0,v.default)(o):(0,v.default)(864e13)}return f(t,[{key:"adjacent",value:function(t){var e=this.start.isSame(t.end),n=this.end.isSame(t.start);return e&&t.start.valueOf()<=this.start.valueOf()||n&&t.end.valueOf()>=this.end.valueOf()}},{key:"add",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{adjacent:!1};return this.overlaps(t,e)?new this.constructor(v.default.min(this.start,t.start),v.default.max(this.end,t.end)):null}},{key:"by",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{excludeEnd:!1,step:1},n=this;return o({},p.default.iterator,function(){var r=e.step||1,o=Math.abs(n.start.diff(n.end,t))/r,i=e.excludeEnd||!1,u=0;return e.hasOwnProperty("exclusive")&&(i=e.exclusive),{next:function(){var e=n.start.clone().add(u*r,t),a=i?!(u<o):!(u<=o);return u++,{done:a,value:a?void 0:e}}}})}},{key:"byRange",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{excludeEnd:!1,step:1},n=this,r=e.step||1,i=this.valueOf()/t.valueOf()/r,u=Math.floor(i),a=e.excludeEnd||!1,s=0;return e.hasOwnProperty("exclusive")&&(a=e.exclusive),o({},p.default.iterator,function(){return u===1/0?{done:!0}:{next:function(){var e=(0,v.default)(n.start.valueOf()+t.valueOf()*s*r),o=u===i&&a?!(s<u):!(s<=u);return s++,{done:o,value:o?void 0:e}}}})}},{key:"center",value:function(){var t=this.start.valueOf()+this.diff()/2;return(0,v.default)(t)}},{key:"clone",value:function(){return new this.constructor(this.start.clone(),this.end.clone())}},{key:"contains",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{excludeStart:!1,excludeEnd:!1},r=this.start.valueOf(),o=this.end.valueOf(),i=e.valueOf(),u=e.valueOf(),a=n.excludeStart||!1,s=n.excludeEnd||!1;n.hasOwnProperty("exclusive")&&(a=s=n.exclusive),e instanceof t&&(i=e.start.valueOf(),u=e.end.valueOf());var c=r<i||r<=i&&!a,f=o>u||o>=u&&!s;return c&&f}},{key:"diff",value:function(t,e){return this.end.diff(this.start,t,e)}},{key:"duration",value:function(t,e){return this.diff(t,e)}},{key:"intersect",value:function(t){var e=this.start.valueOf(),n=this.end.valueOf(),r=t.start.valueOf(),o=t.end.valueOf(),i=e==n,u=r==o;if(i){var a=e;if(a==r||a==o)return null;if(a>r&&a<o)return this.clone()}else if(u){var s=r;if(s==e||s==n)return null;if(s>e&&s<n)return new this.constructor(s,s)}return e<=r&&r<n&&n<o?new this.constructor(r,n):r<e&&e<o&&o<=n?new this.constructor(e,o):r<e&&e<=n&&n<o?this.clone():e<=r&&r<=o&&o<=n?new this.constructor(r,o):null}},{key:"isEqual",value:function(t){return this.start.isSame(t.start)&&this.end.isSame(t.end)}},{key:"isSame",value:function(t){return this.isEqual(t)}},{key:"overlaps",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{adjacent:!1},n=null!==this.intersect(t);return e.adjacent&&!n?this.adjacent(t):n}},{key:"reverseBy",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{excludeStart:!1,step:1},n=this;return o({},p.default.iterator,function(){var r=e.step||1,o=Math.abs(n.start.diff(n.end,t))/r,i=e.excludeStart||!1,u=0;return e.hasOwnProperty("exclusive")&&(i=e.exclusive),{next:function(){var e=n.end.clone().subtract(u*r,t),a=i?!(u<o):!(u<=o);return u++,{done:a,value:a?void 0:e}}}})}},{key:"reverseByRange",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{excludeStart:!1,step:1},n=this,r=e.step||1,i=this.valueOf()/t.valueOf()/r,u=Math.floor(i),a=e.excludeStart||!1,s=0;return e.hasOwnProperty("exclusive")&&(a=e.exclusive),o({},p.default.iterator,function(){return u===1/0?{done:!0}:{next:function(){var e=(0,v.default)(n.end.valueOf()-t.valueOf()*s*r),o=u===i&&a?!(s<u):!(s<=u);return s++,{done:o,value:o?void 0:e}}}})}},{key:"snapTo",value:function(t){var e=this.clone();return e.start.isSame((0,v.default)(-864e13))||(e.start=e.start.startOf(t)),e.end.isSame((0,v.default)(864e13))||(e.end=e.end.endOf(t)),e}},{key:"subtract",value:function(t){var e=this.start.valueOf(),n=this.end.valueOf(),r=t.start.valueOf(),o=t.end.valueOf();return null===this.intersect(t)?[this]:r<=e&&e<n&&n<=o?[]:r<=e&&e<o&&o<n?[new this.constructor(o,n)]:e<r&&r<n&&n<=o?[new this.constructor(e,r)]:e<r&&r<o&&o<n?[new this.constructor(e,r),new this.constructor(o,n)]:e<r&&r<n&&o<n?[new this.constructor(e,r),new this.constructor(r,n)]:[]}},{key:"toDate",value:function(){return[this.start.toDate(),this.end.toDate()]}},{key:"toString",value:function(){return this.start.format()+"/"+this.end.format()}},{key:"valueOf",value:function(){return this.end.valueOf()-this.start.valueOf()}}]),t}()},function(t,e,n){"use strict";var r,o=n(6),i=n(13),u=n(9),a=n(15);r=t.exports=function(t,e){var n,r,u,s,c;return arguments.length<2||"string"!=typeof t?(s=e,e=t,t=null):s=arguments[2],null==t?(n=u=!0,r=!1):(n=a.call(t,"c"),r=a.call(t,"e"),u=a.call(t,"w")),c={value:e,configurable:n,enumerable:r,writable:u},s?o(i(s),c):c},r.gs=function(t,e,n){var r,s,c,f;return"string"!=typeof t?(c=n,n=e,e=t,t=null):c=arguments[3],null==e?e=void 0:u(e)?null==n?n=void 0:u(n)||(c=n,n=void 0):(c=e,e=n=void 0),null==t?(r=!0,s=!1):(r=a.call(t,"c"),s=a.call(t,"e")),f={get:e,set:n,configurable:r,enumerable:s},c?o(i(c),f):f}},function(t,e,n){"use strict";t.exports=function(){}},function(t,e,n){"use strict";t.exports=n(7)()?Object.assign:n(8)},function(t,e,n){"use strict";t.exports=function(){var t,e=Object.assign;return"function"==typeof e&&(t={foo:"raz"},e(t,{bar:"dwa"},{trzy:"trzy"}),t.foo+t.bar+t.trzy==="razdwatrzy")}},function(t,e,n){"use strict";var r=n(10),o=n(14),i=Math.max;t.exports=function(t,e){var n,u,a,s=i(arguments.length,2);for(t=Object(o(t)),a=function(r){try{t[r]=e[r]}catch(t){n||(n=t)}},u=1;u<s;++u)e=arguments[u],r(e).forEach(a);if(void 0!==n)throw n;return t}},function(t,e,n){"use strict";t.exports=function(t){return"function"==typeof t}},function(t,e,n){"use strict";t.exports=n(11)()?Object.keys:n(12)},function(t,e,n){"use strict";t.exports=function(){try{return Object.keys("primitive"),!0}catch(t){return!1}}},function(t,e,n){"use strict";var r=n(0),o=Object.keys;t.exports=function(t){return o(r(t)?Object(t):t)}},function(t,e,n){"use strict";var r=n(0),o=Array.prototype.forEach,i=Object.create,u=function(t,e){var n;for(n in t)e[n]=t[n]};t.exports=function(t){var e=i(null);return o.call(arguments,function(t){r(t)&&u(Object(t),e)}),e}},function(t,e,n){"use strict";var r=n(0);t.exports=function(t){if(!r(t))throw new TypeError("Cannot use null or undefined");return t}},function(t,e,n){"use strict";t.exports=n(16)()?String.prototype.contains:n(17)},function(t,e,n){"use strict";var r="razdwatrzy";t.exports=function(){return"function"==typeof r.contains&&(!0===r.contains("dwa")&&!1===r.contains("foo"))}},function(t,e,n){"use strict";var r=String.prototype.indexOf;t.exports=function(t){return r.call(this,t,arguments[1])>-1}},function(t,e,n){"use strict";var r={object:!0,symbol:!0};t.exports=function(){var t;if("function"!=typeof Symbol)return!1;t=Symbol("test symbol");try{String(t)}catch(t){return!1}return!!r[typeof Symbol.iterator]&&(!!r[typeof Symbol.toPrimitive]&&!!r[typeof Symbol.toStringTag])}},function(t,e,n){"use strict";t.exports=function(t){return!!t&&("symbol"==typeof t||!!t.constructor&&("Symbol"===t.constructor.name&&"Symbol"===t[t.constructor.toStringTag]))}},function(t,e,n){"use strict";var r,o,i,u,a=n(4),s=n(21),c=Object.create,f=Object.defineProperties,l=Object.defineProperty,v=Object.prototype,d=c(null);if("function"==typeof Symbol){r=Symbol;try{String(r()),u=!0}catch(t){}}var p=function(){var t=c(null);return function(e){for(var n,r,o=0;t[e+(o||"")];)++o;return e+=o||"",t[e]=!0,n="@@"+e,l(v,n,a.gs(null,function(t){r||(r=!0,l(this,n,a(t)),r=!1)})),n}}();i=function(t){if(this instanceof i)throw new TypeError("Symbol is not a constructor");return o(t)},t.exports=o=function t(e){var n;if(this instanceof t)throw new TypeError("Symbol is not a constructor");return u?r(e):(n=c(i.prototype),e=void 0===e?"":String(e),f(n,{__description__:a("",e),__name__:a("",p(e))}))},f(o,{for:a(function(t){return d[t]?d[t]:d[t]=o(String(t))}),keyFor:a(function(t){var e;s(t);for(e in d)if(d[e]===t)return e}),hasInstance:a("",r&&r.hasInstance||o("hasInstance")),isConcatSpreadable:a("",r&&r.isConcatSpreadable||o("isConcatSpreadable")),iterator:a("",r&&r.iterator||o("iterator")),match:a("",r&&r.match||o("match")),replace:a("",r&&r.replace||o("replace")),search:a("",r&&r.search||o("search")),species:a("",r&&r.species||o("species")),split:a("",r&&r.split||o("split")),toPrimitive:a("",r&&r.toPrimitive||o("toPrimitive")),toStringTag:a("",r&&r.toStringTag||o("toStringTag")),unscopables:a("",r&&r.unscopables||o("unscopables"))}),f(i.prototype,{constructor:a(o),toString:a("",function(){return this.__name__})}),f(o.prototype,{toString:a(function(){return"Symbol ("+s(this).__description__+")"}),valueOf:a(function(){return s(this)})}),l(o.prototype,o.toPrimitive,a("",function(){var t=s(this);return"symbol"==typeof t?t:t.toString()})),l(o.prototype,o.toStringTag,a("c","Symbol")),l(i.prototype,o.toStringTag,a("c",o.prototype[o.toStringTag])),l(i.prototype,o.toPrimitive,a("c",o.prototype[o.toPrimitive]))},function(t,e,n){"use strict";var r=n(19);t.exports=function(t){if(!r(t))throw new TypeError(t+" is not a symbol");return t}}])});

},{"moment":"../../node_modules/moment/moment.js"}],"../scripts/lib/moment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment.default);
var _default = moment;
exports.default = _default;
},{"moment":"../../node_modules/moment/moment.js","moment-range":"../../node_modules/moment-range/dist/moment-range.js"}],"../scripts/eventItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventContent = function EventContent() {
  _classCallCheck(this, EventContent);

  return {
    class: 'entry',
    id: '',
    status: 1,
    author: 'himeji_portal_user',
    authored_on: (0, _moment.default)().format('YYYY/M/DD HH:mm:ss'),
    modified_on: (0, _moment.default)().format('YYYY/M/DD HH:mm:ss'),
    unpublished_on: '',
    convert_breaks: 'richtext',
    title: '',
    text: '',
    text_more: '',
    excerpt: '',
    keywords: '',
    categories: 'イベントカレンダー記事',
    tags: '',
    allow_comments: 1,
    allow_pings: 0,
    assets: '',
    basename: '',
    event_calendar_image: '',
    event_calendar_date: '',
    event_calendar_info: '',
    event_calendar_area: '',
    event_calendar_spot: '',
    event_calendar_address: '',
    event_calendar_time: '',
    event_calendar_parking: '',
    event_calendar_contact: '',
    event_calendar_tel: '',
    event_calendar_start_day: '',
    event_calendar_end_day: '',
    event_calendar_price: ''
  };
};

exports.default = EventContent;
},{"moment":"../../node_modules/moment/moment.js"}],"../scripts/lib/flatMap.js":[function(require,module,exports) {
if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function () {
    return Array.prototype.map.apply(this, arguments).flat(1);
  };
}
},{}],"../scripts/lib/flat.js":[function(require,module,exports) {
if (!Array.prototype.flat) {
  Array.prototype.flat = function () {
    var depth = arguments[0];
    depth = depth === undefined ? 1 : Math.floor(depth);
    if (depth < 1) return Array.prototype.slice.call(this);
    return function flat(arr, depth) {
      var len = arr.length >>> 0;
      var flattened = [];
      var i = 0;

      while (i < len) {
        if (i in arr) {
          var el = arr[i];
          if (Array.isArray(el) && depth > 0) flattened = flattened.concat(flat(el, depth - 1));else flattened.push(el);
        }

        i++;
      }

      return flattened;
    }(this, depth);
  };
}
},{}],"../scripts/parseContent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseContent;

var _papaparse = _interopRequireDefault(require("papaparse"));

var _moment = _interopRequireDefault(require("./lib/moment"));

var _eventItem = _interopRequireDefault(require("./eventItem"));

require("./lib/flatMap");

require("./lib/flat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * CSV入力欄に入っているデーターをJSONに変換する
 */
function parseContent(inputCsv) {
  var results = _papaparse.default.parse(inputCsv, {
    header: true,
    skipEmptyLines: true,
    beforeFirstChunk: function beforeFirstChunk(chunk) {
      return chunk.replace(/.*,{10,}\n/gm, '');
    },
    // CSVコメントを取り去る
    transform: function transform(value) {
      return value.replace(/(\r\n|\n|\r|\s)/g, '');
    } // 空白を取り去る

  });

  return results.data.flatMap(function (item) {
    var eventCollection = [];
    var datePattern = /(\d{1,2})(?:月)?(\d{1,2})?(?:日)?(?:.*?[（|(].+?[）|)])?(?:.*?(～|、|まで|から))?/g; // https://regex101.com/r/hhA8KY/16

    var datesForEvent = _toConsumableArray(item['日付'].matchAll(datePattern));

    var year = (0, _moment.default)().format('YYYY');
    datesForEvent.forEach(function (_ref, i) {
      var _ref2 = _slicedToArray(_ref, 4),
          month = _ref2[1],
          day = _ref2[2],
          divider = _ref2[3];

      var newEvent = new _eventItem.default(); // 新規イベント項目テンプレートを初期化

      var startAndEndDates = []; // 日付の検出処理終わったら開催日と終了日をこの配列に入れる

      day = day || 1; // もし日がないなら1日に設定する

      month -= 1; // JSの月は０から始まる

      if (divider && (divider.includes('～') || divider.includes('から'))) {
        // 連続日付のイベントは
        var _datesForEvent$splice = datesForEvent.splice(i + 1, 1).flat(),
            _datesForEvent$splice2 = _slicedToArray(_datesForEvent$splice, 3),
            endMonth = _datesForEvent$splice2[1],
            endDay = _datesForEvent$splice2[2];

        var endDayNormalized = endDay || 1;
        startAndEndDates.push((0, _moment.default)([year, month, day]).format('YYYYMMDD'), (0, _moment.default)([year, endMonth - 1, endDayNormalized]).format('YYYYMMDD'));
      } else if (divider && divider.includes('まで')) {
        startAndEndDates.push((0, _moment.default)([2019, 2, 1]).format('YYYYMMDD'), (0, _moment.default)([year, month, day]).format('YYYYMMDD'));
      } else {
        startAndEndDates.push((0, _moment.default)([year, month, day]).format('YYYYMMDD'), (0, _moment.default)([year, month, day]).format('YYYYMMDD'));
      }

      var dateSpan = _moment.default.range(startAndEndDates);

      newEvent.title = item['タイトル'];
      newEvent.keywords = item['エリア'];
      newEvent.text = item['詳細/コメント'];
      newEvent.excerpt = item['詳細/コメント'];
      newEvent.event_calendar_area = item['エリア'];
      newEvent.tags = item['エリア'];
      newEvent.event_calendar_spot = item['場所'];
      newEvent.event_calendar_image = item['画像'];
      newEvent.event_calendar_date = item['日付'];
      newEvent.event_calendar_address = item['住所'];
      newEvent.event_calendar_time = item['開催時間'];
      newEvent.event_calendar_parking = item['駐車場'];
      newEvent.event_calendar_contact = item['お問い合わせ'];
      newEvent.event_calendar_start_day = (0, _moment.default)(dateSpan.start).format('YYYYMMDD');
      newEvent.event_calendar_end_day = (0, _moment.default)(dateSpan.end).format('YYYYMMDD');
      newEvent.event_calendar_info = item['雨天'];
      newEvent.event_calendar_price = item['料金'];

      if (dateSpan.diff('days') === 1) {
        Object.keys(dateSpan).forEach(function (k) {
          var subEvent = new _eventItem.default(); // 新規イベント項目テンプレートを初期化

          subEvent.title = item['タイトル'];
          subEvent.keywords = item['エリア'];
          subEvent.text = item['詳細/コメント'];
          subEvent.excerpt = item['詳細/コメント'];
          subEvent.event_calendar_area = item['エリア'];
          subEvent.tags = item['エリア'];
          subEvent.event_calendar_spot = item['場所'];
          subEvent.event_calendar_image = item['画像'];
          subEvent.event_calendar_date = item['日付'];
          subEvent.event_calendar_address = item['住所'];
          subEvent.event_calendar_time = item['開催時間'];
          subEvent.event_calendar_parking = item['駐車場'];
          subEvent.event_calendar_contact = item['お問い合わせ'];
          subEvent.event_calendar_info = item['雨天'];
          subEvent.event_calendar_price = item['料金'];
          subEvent.event_calendar_start_day = (0, _moment.default)(dateSpan[k]).format('YYYYMMDD');
          subEvent.event_calendar_end_day = (0, _moment.default)(dateSpan[k]).format('YYYYMMDD');
          eventCollection.push(subEvent);
        });
      } else {
        eventCollection.push(newEvent);
      }
    });
    return eventCollection.flat();
  });
}
},{"papaparse":"../../node_modules/papaparse/papaparse.min.js","./lib/moment":"../scripts/lib/moment.js","./eventItem":"../scripts/eventItem.js","./lib/flatMap":"../scripts/lib/flatMap.js","./lib/flat":"../scripts/lib/flat.js"}],"../scripts/displayResults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = displayResults;

var _papaparse = _interopRequireDefault(require("papaparse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ページ内の要素
var jsonBox = document.querySelector('#json');
var csvBox = document.querySelector('#csv');
/**
 * ページ内の入力欄に結果を表示する
 * @param {string} data - 結果になるJSONデーター
 */

function displayResults(data) {
  var jsonOutput = JSON.stringify(data, null, 2);
  jsonBox.value = jsonOutput;

  var csvOutput = _papaparse.default.unparse(jsonOutput);

  csvBox.value = csvOutput;
} // export default 'displayResults';
},{"papaparse":"../../node_modules/papaparse/papaparse.min.js"}],"../scripts/buttons/convert.js":[function(require,module,exports) {
"use strict";

var _parseContent = _interopRequireDefault(require("../parseContent"));

var _displayResults = _interopRequireDefault(require("../displayResults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputBox = document.querySelector('#svg');
var convertButton = document.querySelector('#convert');
convertButton.addEventListener('click', function () {
  (0, _displayResults.default)((0, _parseContent.default)(inputBox.value));
});
},{"../parseContent":"../scripts/parseContent.js","../displayResults":"../scripts/displayResults.js"}],"../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../styles/index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../scripts/index.js":[function(require,module,exports) {
"use strict";

require("./lib/matchall");

require("./buttons/copy");

require("./buttons/download");

require("./buttons/upload");

require("./buttons/convert");

require("../styles/index.scss");
},{"./lib/matchall":"../scripts/lib/matchall.js","./buttons/copy":"../scripts/buttons/copy.js","./buttons/download":"../scripts/buttons/download.js","./buttons/upload":"../scripts/buttons/upload.js","./buttons/convert":"../scripts/buttons/convert.js","../styles/index.scss":"../styles/index.scss"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58749" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../scripts/index.js"], null)
//# sourceMappingURL=/scripts.3cddadf4.js.map