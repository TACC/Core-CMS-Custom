var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __restKey = (key) => typeof key === "symbol" ? key : key + "";
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b = "function" === typeof Symbol && Symbol.for;
    var c = b ? Symbol.for("react.element") : 60103;
    var d = b ? Symbol.for("react.portal") : 60106;
    var e = b ? Symbol.for("react.fragment") : 60107;
    var f = b ? Symbol.for("react.strict_mode") : 60108;
    var g = b ? Symbol.for("react.profiler") : 60114;
    var h = b ? Symbol.for("react.provider") : 60109;
    var k = b ? Symbol.for("react.context") : 60110;
    var l = b ? Symbol.for("react.async_mode") : 60111;
    var m = b ? Symbol.for("react.concurrent_mode") : 60111;
    var n = b ? Symbol.for("react.forward_ref") : 60112;
    var p = b ? Symbol.for("react.suspense") : 60113;
    var q = b ? Symbol.for("react.suspense_list") : 60120;
    var r2 = b ? Symbol.for("react.memo") : 60115;
    var t = b ? Symbol.for("react.lazy") : 60116;
    var v = b ? Symbol.for("react.block") : 60121;
    var w = b ? Symbol.for("react.fundamental") : 60117;
    var x = b ? Symbol.for("react.responder") : 60118;
    var y = b ? Symbol.for("react.scope") : 60119;
    function z(a) {
      if ("object" === typeof a && null !== a) {
        var u = a.$$typeof;
        switch (u) {
          case c:
            switch (a = a.type, a) {
              case l:
              case m:
              case e:
              case g:
              case f:
              case p:
                return a;
              default:
                switch (a = a && a.$$typeof, a) {
                  case k:
                  case n:
                  case t:
                  case r2:
                  case h:
                    return a;
                  default:
                    return u;
                }
            }
          case d:
            return u;
        }
      }
    }
    function A(a) {
      return z(a) === m;
    }
    exports.AsyncMode = l;
    exports.ConcurrentMode = m;
    exports.ContextConsumer = k;
    exports.ContextProvider = h;
    exports.Element = c;
    exports.ForwardRef = n;
    exports.Fragment = e;
    exports.Lazy = t;
    exports.Memo = r2;
    exports.Portal = d;
    exports.Profiler = g;
    exports.StrictMode = f;
    exports.Suspense = p;
    exports.isAsyncMode = function(a) {
      return A(a) || z(a) === l;
    };
    exports.isConcurrentMode = A;
    exports.isContextConsumer = function(a) {
      return z(a) === k;
    };
    exports.isContextProvider = function(a) {
      return z(a) === h;
    };
    exports.isElement = function(a) {
      return "object" === typeof a && null !== a && a.$$typeof === c;
    };
    exports.isForwardRef = function(a) {
      return z(a) === n;
    };
    exports.isFragment = function(a) {
      return z(a) === e;
    };
    exports.isLazy = function(a) {
      return z(a) === t;
    };
    exports.isMemo = function(a) {
      return z(a) === r2;
    };
    exports.isPortal = function(a) {
      return z(a) === d;
    };
    exports.isProfiler = function(a) {
      return z(a) === g;
    };
    exports.isStrictMode = function(a) {
      return z(a) === f;
    };
    exports.isSuspense = function(a) {
      return z(a) === p;
    };
    exports.isValidElementType = function(a) {
      return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r2 || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
    };
    exports.typeOf = z;
  }
});

// node_modules/hoist-non-react-statics/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/hoist-non-react-statics/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_is_production_min();
    } else {
      module.exports = null;
    }
  }
});

// node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module) {
    "use strict";
    var reactIs = require_react_is();
    var REACT_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var FORWARD_REF_STATICS = {
      "$$typeof": true,
      render: true,
      defaultProps: true,
      displayName: true,
      propTypes: true
    };
    var MEMO_STATICS = {
      "$$typeof": true,
      compare: true,
      defaultProps: true,
      displayName: true,
      propTypes: true,
      type: true
    };
    var TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
      }
      return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = Object.prototype;
    function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e) {
            }
          }
        }
      }
      return targetComponent;
    }
    module.exports = hoistNonReactStatics;
  }
});

// node_modules/react-is/cjs/react-is.production.js
var require_react_is_production = __commonJS({
  "node_modules/react-is/cjs/react-is.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var REACT_LAZY_TYPE = Symbol.for("react.lazy");
    var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
    var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
    function typeOf(object) {
      if ("object" === typeof object && null !== object) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            switch (object = object.type, object) {
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
              case REACT_SUSPENSE_LIST_TYPE:
              case REACT_VIEW_TRANSITION_TYPE:
                return object;
              default:
                switch (object = object && object.$$typeof, object) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                    return object;
                  case REACT_CONSUMER_TYPE:
                    return object;
                  default:
                    return $$typeof;
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }
    }
    exports.ContextConsumer = REACT_CONSUMER_TYPE;
    exports.ContextProvider = REACT_CONTEXT_TYPE;
    exports.Element = REACT_ELEMENT_TYPE;
    exports.ForwardRef = REACT_FORWARD_REF_TYPE;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Lazy = REACT_LAZY_TYPE;
    exports.Memo = REACT_MEMO_TYPE;
    exports.Portal = REACT_PORTAL_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
    exports.isContextConsumer = function(object) {
      return typeOf(object) === REACT_CONSUMER_TYPE;
    };
    exports.isContextProvider = function(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    };
    exports.isElement = function(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    };
    exports.isForwardRef = function(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    };
    exports.isFragment = function(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    };
    exports.isLazy = function(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    };
    exports.isMemo = function(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    };
    exports.isPortal = function(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    };
    exports.isProfiler = function(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    };
    exports.isStrictMode = function(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    };
    exports.isSuspense = function(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    };
    exports.isSuspenseList = function(object) {
      return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
    };
    exports.isValidElementType = function(type) {
      return "string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE || void 0 !== type.getModuleId) ? true : false;
    };
    exports.typeOf = typeOf;
  }
});

// node_modules/react-is/index.js
var require_react_is2 = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_is_production();
    } else {
      module.exports = null;
    }
  }
});

// src/modal.tsx
import { useState as useState9 } from "react";

// node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js
function formatMuiErrorMessage(code, ...args) {
  const url = new URL(`https://mui.com/production-error/?code=${code}`);
  args.forEach((arg2) => url.searchParams.append("args[]", arg2));
  return `Minified MUI error #${code}; visit ${url} for the full message.`;
}

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r2 in t) ({}).hasOwnProperty.call(t, r2) && (n[r2] = t[r2]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

// node_modules/@emotion/react/dist/emotion-element-f0de968e.browser.esm.js
import * as React2 from "react";
import { useContext as useContext2, forwardRef as forwardRef2 } from "react";

// node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
var isDevelopment = false;
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
  return void 0;
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? !isDevelopment : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      var _tag$parentNode;
      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };
  return StyleSheet2;
}();

// node_modules/stylis/src/Enum.js
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";

// node_modules/stylis/src/Utility.js
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end2) {
  return value.slice(begin, end2);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}

// node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end2) {
  return substr(characters, begin, end2);
}
function token(type) {
  switch (type) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      // ] ) " '
      case type:
        return position;
      // " '
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      // (
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      // \
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}

// node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset2 = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference2 = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      // (
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      // \
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      // /
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      // {
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      // } ; \0
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          // \0 }
          case 0:
          case 125:
            scanning = 0;
          // ;
          case 59 + offset2:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          // @ ;
          case 59:
            characters2 += ";";
          // { rule/at-rule
          default:
            append(reference2 = ruleset(characters2, root, parent, index, offset2, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset2 === 0)
                parse(characters2, root, reference2, reference2, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference2, reference2, rule && append(ruleset(value, reference2, reference2, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference2, reference2, reference2, [""], children, 0, points, children);
                }
        }
        index = offset2 = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      // :
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          // &
          case 38:
            ampersand = offset2 > 0 ? 1 : (characters2 += "\f", -1);
            break;
          // ,
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          // @
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset2 = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          // -
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset2, rules, points, type, props, children, length2) {
  var post = offset2 - 1;
  var rule = offset2 === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset2 === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}

// node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}

// node_modules/stylis/src/Middleware.js
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}

// node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn2) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg2) {
    if (cache[arg2] === void 0) cache[arg2] = fn2(arg2);
    return cache[arg2];
  };
}

// node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      // fallthrough
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }
  var value = element.value;
  var parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent) return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (
      // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98
    ) {
      element["return"] = "";
      element.value = "";
    }
  }
};
function prefix(value, length2) {
  switch (hash(value, length2)) {
    // color-adjust
    case 5103:
      return WEBKIT + "print-" + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    // align-items
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    // align-self
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    // align-content
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    // flex-shrink
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    // flex-basis
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    // flex-grow
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    // transition
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    // cursor
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    // background, background-image
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    // justify-content
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6) switch (charat(value, length2 + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (charat(value, length2 + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
        // (s)tretch
        case 115:
          return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
      }
      break;
    // position: sticky
    case 4949:
      if (charat(value, length2 + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        // stic(k)y
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        // (inline-)?fl(e)x
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    // writing-mode
    case 5936:
      switch (charat(value, length2 + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        // vertical-r(l)
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        // horizontal(-)tb
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index, children, callback) {
  if (element.length > -1) {
    if (!element["return"]) switch (element.type) {
      case DECLARATION:
        element["return"] = prefix(element.value, element.length);
        break;
      case KEYFRAMES:
        return serialize([copy(element, {
          value: replace(element.value, "@", "@" + WEBKIT)
        })], callback);
      case RULESET:
        if (element.length) return combine(element.props, function(value) {
          switch (match(value, /(::plac\w+|:read-\w+)/)) {
            // :read-(only|write)
            case ":read-only":
            case ":read-write":
              return serialize([copy(element, {
                props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
              })], callback);
            // :placeholder
            case "::placeholder":
              return serialize([copy(element, {
                props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
              })], callback);
          }
          return "";
        });
    }
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles3) {
      return serialize(compile(styles3), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

// node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else if (className) {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache, serialized, isStringTag2) {
  var className = cache.key + "-" + serialized.name;
  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag2 === false || // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser === false) && cache.registered[className] === void 0
  ) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache, serialized, isStringTag2) {
  registerStyles(cache, serialized, isStringTag2);
  var className = cache.key + "-" + serialized.name;
  if (cache.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};

// node_modules/@emotion/hash/dist/emotion-hash.esm.js
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

// node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

// node_modules/@emotion/serialize/dist/emotion-serialize.esm.js
var isDevelopment2 = false;
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  var componentSelector = interpolation;
  if (componentSelector.__emotion_styles !== void 0) {
    return componentSelector;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      var keyframes2 = interpolation;
      if (keyframes2.anim === 1) {
        cursor = {
          name: keyframes2.name,
          styles: keyframes2.styles,
          next: cursor
        };
        return keyframes2.name;
      }
      var serializedStyles = interpolation;
      if (serializedStyles.styles !== void 0) {
        var next2 = serializedStyles.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles3 = serializedStyles.styles + ";";
        return styles3;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      }
      break;
    }
  }
  var asString = interpolation;
  if (registered == null) {
    return asString;
  }
  var cached = registered[asString];
  return cached !== void 0 ? cached : asString;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];
      if (typeof value !== "object") {
        var asString = value;
        if (registered != null && registered[asString] !== void 0) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (key === "NO_COMPONENT_SELECTOR" && isDevelopment2) {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (key) {
            case "animation":
            case "animationName": {
              string += processStyleName(key) + ":" + interpolated + ";";
              break;
            }
            default: {
              string += key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g;
var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles3 = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles3 += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;
    styles3 += asTemplateStringsArr[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles3 += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      var templateStringsArr = strings;
      styles3 += templateStringsArr[i];
    }
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles3)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles3) + identifierName;
  return {
    name,
    styles: styles3,
    next: cursor
  };
}

// node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
import * as React from "react";
var syncFallback = function syncFallback2(create) {
  return create();
};
var useInsertionEffect2 = React["useInsertionEffect"] ? React["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect2 || syncFallback;

// node_modules/@emotion/react/dist/emotion-element-f0de968e.browser.esm.js
var isDevelopment3 = false;
var EmotionCacheContext = /* @__PURE__ */ React2.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
    key: "css"
  }) : null
);
var CacheProvider = EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ forwardRef2(function(props, ref) {
    var cache = useContext2(EmotionCacheContext);
    return func(props, cache, ref);
  });
};
var ThemeContext = /* @__PURE__ */ React2.createContext({});
var hasOwn = {}.hasOwnProperty;
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps2(type, props) {
  var newProps = {};
  for (var _key in props) {
    if (hasOwn.call(props, _key)) {
      newProps[_key] = props[_key];
    }
  }
  newProps[typePropName] = type;
  return newProps;
};
var Insertion = function Insertion2(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag2 = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag2);
  useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache, serialized, isStringTag2);
  });
  return null;
};
var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
  var cssProp = props.css;
  if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) {
    cssProp = cache.registered[cssProp];
  }
  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = "";
  if (typeof props.className === "string") {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }
  var serialized = serializeStyles(registeredStyles, void 0, React2.useContext(ThemeContext));
  className += cache.key + "-" + serialized.name;
  var newProps = {};
  for (var _key2 in props) {
    if (hasOwn.call(props, _key2) && _key2 !== "css" && _key2 !== typePropName && !isDevelopment3) {
      newProps[_key2] = props[_key2];
    }
  }
  newProps.className = className;
  if (ref) {
    newProps.ref = ref;
  }
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(Insertion, {
    cache,
    serialized,
    isStringTag: typeof WrappedComponent === "string"
  }), /* @__PURE__ */ React2.createElement(WrappedComponent, newProps));
});
var Emotion$1 = Emotion;

// node_modules/@emotion/react/dist/emotion-react.browser.esm.js
import * as React3 from "react";
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var jsx = function jsx2(type, props) {
  var args = arguments;
  if (props == null || !hasOwn.call(props, "css")) {
    return React3.createElement.apply(void 0, args);
  }
  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion$1;
  createElementArgArray[1] = createEmotionProps(type, props);
  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }
  return React3.createElement.apply(null, createElementArgArray);
};
(function(_jsx23) {
  var JSX;
  /* @__PURE__ */ (function(_JSX) {
  })(JSX || (JSX = _jsx23.JSX || (_jsx23.JSX = {})));
})(jsx || (jsx = {}));
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}

// node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js
import * as React4 from "react";

// node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);

// node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js
var isDevelopment4 = false;
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp2;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp2 !== "function" && isReal) {
    shouldForwardProp2 = tag.__emotion_forwardProp;
  }
  return shouldForwardProp2;
};
var Insertion3 = function Insertion4(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag2 = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag2);
  useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache, serialized, isStringTag2);
  });
  return null;
};
var createStyled = function createStyled2(tag, options) {
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles3 = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles3.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles3.push.apply(styles3, args);
    } else {
      var templateStringsArr = args[0];
      styles3.push(templateStringsArr[0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        styles3.push(args[i], templateStringsArr[i]);
      }
    }
    var Styled = withEmotionCache(function(props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = React4.useContext(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles3.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as") continue;
        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      if (ref) {
        newProps.ref = ref;
      }
      return /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement(Insertion3, {
        cache,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ React4.createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles3;
    Styled.__emotion_forwardProp = shouldForwardProp2;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && isDevelopment4) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      var newStyled2 = createStyled2(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      }));
      return newStyled2.apply(void 0, styles3);
    };
    return Styled;
  };
};

// node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js
import "react";
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled = createStyled.bind(null);
tags.forEach(function(tagName) {
  newStyled[tagName] = newStyled(tagName);
});

// node_modules/@mui/styled-engine/esm/index.js
function styled(tag, options) {
  const stylesFactory = newStyled(tag, options);
  if (false) {
    return (...styles3) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles3.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n"));
      } else if (styles3.some((style3) => style3 === void 0)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles3);
    };
  }
  return stylesFactory;
}
function internal_mutateStyles(tag, processor) {
  if (Array.isArray(tag.__emotion_styles)) {
    tag.__emotion_styles = processor(tag.__emotion_styles);
  }
}
var wrapper = [];
function internal_serializeStyles(styles3) {
  wrapper[0] = styles3;
  return serializeStyles(wrapper);
}

// node_modules/@mui/utils/esm/deepmerge/deepmerge.js
var import_react_is = __toESM(require_react_is2(), 1);
import * as React5 from "react";
function isPlainObject(item) {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(item);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in item) && !(Symbol.iterator in item);
}
function deepClone(source) {
  if (/* @__PURE__ */ React5.isValidElement(source) || (0, import_react_is.isValidElementType)(source) || !isPlainObject(source)) {
    return source;
  }
  const output = {};
  Object.keys(source).forEach((key) => {
    output[key] = deepClone(source[key]);
  });
  return output;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? __spreadValues({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (/* @__PURE__ */ React5.isValidElement(source[key]) || (0, import_react_is.isValidElementType)(source[key])) {
        output[key] = source[key];
      } else if (isPlainObject(source[key]) && // Avoid prototype pollution
      Object.prototype.hasOwnProperty.call(target, key) && isPlainObject(target[key])) {
        output[key] = deepmerge(target[key], source[key], options);
      } else if (options.clone) {
        output[key] = isPlainObject(source[key]) ? deepClone(source[key]) : source[key];
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

// node_modules/@mui/system/esm/createBreakpoints/createBreakpoints.js
var sortBreakpointsValues = (values3) => {
  const breakpointsAsArray = Object.keys(values3).map((key) => ({
    key,
    val: values3[key]
  })) || [];
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return __spreadProps(__spreadValues({}, acc), {
      [obj.key]: obj.val
    });
  }, {});
};
function createBreakpoints(breakpoints) {
  const _a = breakpoints, {
    values: values3 = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit = "px",
    step = 5
  } = _a, other = __objRest(_a, [
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    "values",
    "unit",
    "step"
  ]);
  const sortedValues = sortBreakpointsValues(values3);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start2, end2) {
    const endIndex = keys.indexOf(end2);
    return `@media (min-width:${typeof values3[start2] === "number" ? values3[start2] : start2}${unit}) and (max-width:${(endIndex !== -1 && typeof values3[keys[endIndex]] === "number" ? values3[keys[endIndex]] : end2) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  return __spreadValues({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}

// node_modules/@mui/system/esm/cssContainerQueries/cssContainerQueries.js
function sortContainerQueries(theme, css2) {
  if (!theme.containerQueries) {
    return css2;
  }
  const sorted = Object.keys(css2).filter((key) => key.startsWith("@container")).sort((a, b) => {
    var _a, _b;
    const regex = /min-width:\s*([0-9.]+)/;
    return +(((_a = a.match(regex)) == null ? void 0 : _a[1]) || 0) - +(((_b = b.match(regex)) == null ? void 0 : _b[1]) || 0);
  });
  if (!sorted.length) {
    return css2;
  }
  return sorted.reduce((acc, key) => {
    const value = css2[key];
    delete acc[key];
    acc[key] = value;
    return acc;
  }, __spreadValues({}, css2));
}
function isCqShorthand(breakpointKeys, value) {
  return value === "@" || value.startsWith("@") && (breakpointKeys.some((key) => value.startsWith(`@${key}`)) || !!value.match(/^@\d/));
}
function getContainerQuery(theme, shorthand) {
  const matches = shorthand.match(/^@([^/]+)?\/?(.+)?$/);
  if (!matches) {
    if (false) {
      throw new Error(false ? `MUI: The provided shorthand ${`(${shorthand})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : formatMuiErrorMessage(18, `(${shorthand})`));
    }
    return null;
  }
  const [, containerQuery, containerName] = matches;
  const value = Number.isNaN(+containerQuery) ? containerQuery || 0 : +containerQuery;
  return theme.containerQueries(containerName).up(value);
}
function cssContainerQueries(themeInput) {
  const toContainerQuery = (mediaQuery, name) => mediaQuery.replace("@media", name ? `@container ${name}` : "@container");
  function attachCq(node3, name) {
    node3.up = (...args) => toContainerQuery(themeInput.breakpoints.up(...args), name);
    node3.down = (...args) => toContainerQuery(themeInput.breakpoints.down(...args), name);
    node3.between = (...args) => toContainerQuery(themeInput.breakpoints.between(...args), name);
    node3.only = (...args) => toContainerQuery(themeInput.breakpoints.only(...args), name);
    node3.not = (...args) => {
      const result = toContainerQuery(themeInput.breakpoints.not(...args), name);
      if (result.includes("not all and")) {
        return result.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or");
      }
      return result;
    };
  }
  const node2 = {};
  const containerQueries = (name) => {
    attachCq(node2, name);
    return node2;
  };
  attachCq(containerQueries);
  return __spreadProps(__spreadValues({}, themeInput), {
    containerQueries
  });
}

// node_modules/@mui/system/esm/createTheme/shape.js
var shape = {
  borderRadius: 4
};
var shape_default = shape;

// node_modules/@mui/system/esm/merge/merge.js
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
    // No need to clone deep, it's way faster.
  });
}
var merge_default = merge;

// node_modules/@mui/system/esm/breakpoints/breakpoints.js
var values = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
};
var defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (key) => `@media (min-width:${values[key]}px)`
};
var defaultContainerQueries = {
  containerQueries: (containerName) => ({
    up: (key) => {
      let result = typeof key === "number" ? key : values[key] || key;
      if (typeof result === "number") {
        result = `${result}px`;
      }
      return containerName ? `@container ${containerName} (min-width:${result})` : `@container (min-width:${result})`;
    }
  })
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (isCqShorthand(themeBreakpoints.keys, breakpoint)) {
        const containerKey = getContainerQuery(theme.containerQueries ? theme : defaultContainerQueries, breakpoint);
        if (containerKey) {
          acc[containerKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
        }
      } else if (Object.keys(themeBreakpoints.values || values).includes(breakpoint)) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _a;
  const breakpointsInOrder = (_a = breakpointsInput.keys) == null ? void 0 : _a.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style3) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style3);
}

// node_modules/@mui/utils/esm/capitalize/capitalize.js
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(false ? "MUI: `capitalize(string)` expects a string argument." : formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// node_modules/@mui/system/esm/style/style.js
function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== "string") {
    return null;
  }
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split(".").reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getStyleValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform) {
    value = transform(value, userValue, themeMapping);
  }
  return value;
}
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;
  const fn2 = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn2.propTypes = false ? {
    [prop]: responsivePropType_default
  } : {};
  fn2.filterProps = [prop];
  return fn2;
}
var style_default = style;

// node_modules/@mui/system/esm/memoize/memoize.js
function memoize2(fn2) {
  const cache = {};
  return (arg2) => {
    if (cache[arg2] === void 0) {
      cache[arg2] = fn2(arg2);
    }
    return cache[arg2];
  };
}

// node_modules/@mui/system/esm/spacing/spacing.js
var properties = {
  m: "margin",
  p: "padding"
};
var directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
};
var aliases = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
};
var getCssProperties = memoize2((prop) => {
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a, b] = prop.split("");
  const property = properties[a];
  const direction = directions[b] || "";
  return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
});
var marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
var paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
var spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _a;
  const themeSpacing = (_a = getPath(theme, themeKey, true)) != null ? _a : defaultValue;
  if (typeof themeSpacing === "number" || typeof themeSpacing === "string") {
    return (val) => {
      if (typeof val === "string") {
        return val;
      }
      if (false) {
        if (typeof val !== "number") {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${val}.`);
        }
      }
      if (typeof themeSpacing === "string") {
        if (themeSpacing.startsWith("var(") && val === 0) {
          return 0;
        }
        if (themeSpacing.startsWith("var(") && val === 1) {
          return themeSpacing;
        }
        return `calc(${val} * ${themeSpacing})`;
      }
      return themeSpacing * val;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (val) => {
      if (typeof val === "string") {
        return val;
      }
      const abs2 = Math.abs(val);
      if (false) {
        if (!Number.isInteger(abs2)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs2 > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs2}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs2} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      const transformed = themeSpacing[abs2];
      if (val >= 0) {
        return transformed;
      }
      if (typeof transformed === "number") {
        return -transformed;
      }
      if (typeof transformed === "string" && transformed.startsWith("var(")) {
        return `calc(-1 * ${transformed})`;
      }
      return `-${transformed}`;
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (false) {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
  }
  return () => void 0;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  return transformer(propValue);
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  if (!keys.includes(prop)) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style2(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge_default, {});
}
function margin(props) {
  return style2(props, marginKeys);
}
margin.propTypes = false ? marginKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
margin.filterProps = marginKeys;
function padding(props) {
  return style2(props, paddingKeys);
}
padding.propTypes = false ? paddingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
padding.filterProps = paddingKeys;
function spacing(props) {
  return style2(props, spacingKeys);
}
spacing.propTypes = false ? spacingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
spacing.filterProps = spacingKeys;

// node_modules/@mui/system/esm/createTheme/createSpacing.js
function createSpacing(spacingInput = 8, transform = createUnarySpacing({
  spacing: spacingInput
})) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const spacing2 = (...argsInput) => {
    if (false) {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}

// node_modules/@mui/system/esm/compose/compose.js
function compose(...styles3) {
  const handlers = styles3.reduce((acc, style3) => {
    style3.filterProps.forEach((prop) => {
      acc[prop] = style3;
    });
    return acc;
  }, {});
  const fn2 = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge_default(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn2.propTypes = false ? styles3.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}) : {};
  fn2.filterProps = styles3.reduce((acc, style3) => acc.concat(style3.filterProps), []);
  return fn2;
}
var compose_default = compose;

// node_modules/@mui/system/esm/borders/borders.js
function borderTransform(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
function createBorderStyle(prop, transform) {
  return style_default({
    prop,
    themeKey: "borders",
    transform
  });
}
var border = createBorderStyle("border", borderTransform);
var borderTop = createBorderStyle("borderTop", borderTransform);
var borderRight = createBorderStyle("borderRight", borderTransform);
var borderBottom = createBorderStyle("borderBottom", borderTransform);
var borderLeft = createBorderStyle("borderLeft", borderTransform);
var borderColor = createBorderStyle("borderColor");
var borderTopColor = createBorderStyle("borderTopColor");
var borderRightColor = createBorderStyle("borderRightColor");
var borderBottomColor = createBorderStyle("borderBottomColor");
var borderLeftColor = createBorderStyle("borderLeftColor");
var outline = createBorderStyle("outline", borderTransform);
var outlineColor = createBorderStyle("outlineColor");
var borderRadius = (props) => {
  if (props.borderRadius !== void 0 && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
    const styleFromPropValue = (propValue) => ({
      borderRadius: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = false ? {
  borderRadius: responsivePropType_default
} : {};
borderRadius.filterProps = ["borderRadius"];
var borders = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);

// node_modules/@mui/system/esm/cssGrid/cssGrid.js
var gap = (props) => {
  if (props.gap !== void 0 && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
    const styleFromPropValue = (propValue) => ({
      gap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = false ? {
  gap: responsivePropType_default
} : {};
gap.filterProps = ["gap"];
var columnGap = (props) => {
  if (props.columnGap !== void 0 && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
    const styleFromPropValue = (propValue) => ({
      columnGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = false ? {
  columnGap: responsivePropType_default
} : {};
columnGap.filterProps = ["columnGap"];
var rowGap = (props) => {
  if (props.rowGap !== void 0 && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
    const styleFromPropValue = (propValue) => ({
      rowGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = false ? {
  rowGap: responsivePropType_default
} : {};
rowGap.filterProps = ["rowGap"];
var gridColumn = style_default({
  prop: "gridColumn"
});
var gridRow = style_default({
  prop: "gridRow"
});
var gridAutoFlow = style_default({
  prop: "gridAutoFlow"
});
var gridAutoColumns = style_default({
  prop: "gridAutoColumns"
});
var gridAutoRows = style_default({
  prop: "gridAutoRows"
});
var gridTemplateColumns = style_default({
  prop: "gridTemplateColumns"
});
var gridTemplateRows = style_default({
  prop: "gridTemplateRows"
});
var gridTemplateAreas = style_default({
  prop: "gridTemplateAreas"
});
var gridArea = style_default({
  prop: "gridArea"
});
var grid = compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);

// node_modules/@mui/system/esm/palette/palette.js
function paletteTransform(value, userValue) {
  if (userValue === "grey") {
    return userValue;
  }
  return value;
}
var color = style_default({
  prop: "color",
  themeKey: "palette",
  transform: paletteTransform
});
var bgcolor = style_default({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: paletteTransform
});
var backgroundColor = style_default({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: paletteTransform
});
var palette = compose_default(color, bgcolor, backgroundColor);

// node_modules/@mui/system/esm/sizing/sizing.js
function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
var width = style_default({
  prop: "width",
  transform: sizingTransform
});
var maxWidth = (props) => {
  if (props.maxWidth !== void 0 && props.maxWidth !== null) {
    const styleFromPropValue = (propValue) => {
      var _a, _b, _c, _d, _e;
      const breakpoint = ((_c = (_b = (_a = props.theme) == null ? void 0 : _a.breakpoints) == null ? void 0 : _b.values) == null ? void 0 : _c[propValue]) || values[propValue];
      if (!breakpoint) {
        return {
          maxWidth: sizingTransform(propValue)
        };
      }
      if (((_e = (_d = props.theme) == null ? void 0 : _d.breakpoints) == null ? void 0 : _e.unit) !== "px") {
        return {
          maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`
        };
      }
      return {
        maxWidth: breakpoint
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ["maxWidth"];
var minWidth = style_default({
  prop: "minWidth",
  transform: sizingTransform
});
var height = style_default({
  prop: "height",
  transform: sizingTransform
});
var maxHeight = style_default({
  prop: "maxHeight",
  transform: sizingTransform
});
var minHeight = style_default({
  prop: "minHeight",
  transform: sizingTransform
});
var sizeWidth = style_default({
  prop: "size",
  cssProperty: "width",
  transform: sizingTransform
});
var sizeHeight = style_default({
  prop: "size",
  cssProperty: "height",
  transform: sizingTransform
});
var boxSizing = style_default({
  prop: "boxSizing"
});
var sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);

// node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js
var defaultSxConfig = {
  // borders
  border: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderTop: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderRight: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderBottom: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderLeft: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: borderTransform
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: borderRadius
  },
  // palette
  color: {
    themeKey: "palette",
    transform: paletteTransform
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: paletteTransform
  },
  backgroundColor: {
    themeKey: "palette",
    transform: paletteTransform
  },
  // spacing
  p: {
    style: padding
  },
  pt: {
    style: padding
  },
  pr: {
    style: padding
  },
  pb: {
    style: padding
  },
  pl: {
    style: padding
  },
  px: {
    style: padding
  },
  py: {
    style: padding
  },
  padding: {
    style: padding
  },
  paddingTop: {
    style: padding
  },
  paddingRight: {
    style: padding
  },
  paddingBottom: {
    style: padding
  },
  paddingLeft: {
    style: padding
  },
  paddingX: {
    style: padding
  },
  paddingY: {
    style: padding
  },
  paddingInline: {
    style: padding
  },
  paddingInlineStart: {
    style: padding
  },
  paddingInlineEnd: {
    style: padding
  },
  paddingBlock: {
    style: padding
  },
  paddingBlockStart: {
    style: padding
  },
  paddingBlockEnd: {
    style: padding
  },
  m: {
    style: margin
  },
  mt: {
    style: margin
  },
  mr: {
    style: margin
  },
  mb: {
    style: margin
  },
  ml: {
    style: margin
  },
  mx: {
    style: margin
  },
  my: {
    style: margin
  },
  margin: {
    style: margin
  },
  marginTop: {
    style: margin
  },
  marginRight: {
    style: margin
  },
  marginBottom: {
    style: margin
  },
  marginLeft: {
    style: margin
  },
  marginX: {
    style: margin
  },
  marginY: {
    style: margin
  },
  marginInline: {
    style: margin
  },
  marginInlineStart: {
    style: margin
  },
  marginInlineEnd: {
    style: margin
  },
  marginBlock: {
    style: margin
  },
  marginBlockStart: {
    style: margin
  },
  marginBlockEnd: {
    style: margin
  },
  // display
  displayPrint: {
    cssProperty: false,
    transform: (value) => ({
      "@media print": {
        display: value
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: gap
  },
  rowGap: {
    style: rowGap
  },
  columnGap: {
    style: columnGap
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: sizingTransform
  },
  maxWidth: {
    style: maxWidth
  },
  minWidth: {
    transform: sizingTransform
  },
  height: {
    transform: sizingTransform
  },
  maxHeight: {
    transform: sizingTransform
  },
  minHeight: {
    transform: sizingTransform
  },
  boxSizing: {},
  // typography
  font: {
    themeKey: "font"
  },
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: false,
    themeKey: "typography"
  }
};
var defaultSxConfig_default = defaultSxConfig;

// node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg2) {
  return typeof maybeFn === "function" ? maybeFn(arg2) : maybeFn;
}
function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config) {
    const props = {
      [prop]: val,
      theme
    };
    const options = config[prop];
    if (!options) {
      return {
        [prop]: val
      };
    }
    const {
      cssProperty = prop,
      themeKey,
      transform,
      style: style3
    } = options;
    if (val == null) {
      return null;
    }
    if (themeKey === "typography" && val === "inherit") {
      return {
        [prop]: val
      };
    }
    const themeMapping = getPath(theme, themeKey) || {};
    if (style3) {
      return style3(props);
    }
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, val, styleFromPropValue);
  }
  function styleFunctionSx2(props) {
    var _a;
    const {
      sx,
      theme = {}
    } = props || {};
    if (!sx) {
      return null;
    }
    const config = (_a = theme.unstable_sxConfig) != null ? _a : defaultSxConfig_default;
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === "function") {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== "object") {
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css2 = emptyBreakpoints;
      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            if (config[styleKey]) {
              css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, (x) => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css2[styleKey] = styleFunctionSx2({
                  sx: value,
                  theme
                });
              } else {
                css2 = merge_default(css2, breakpointsValues);
              }
            }
          } else {
            css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config));
          }
        }
      });
      return sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css2));
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx2;
}
var styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ["sx"];
var styleFunctionSx_default = styleFunctionSx;

// node_modules/@mui/system/esm/createTheme/applyStyles.js
function applyStyles(key, styles3) {
  var _a;
  const theme = this;
  if (theme.vars) {
    if (!((_a = theme.colorSchemes) == null ? void 0 : _a[key]) || typeof theme.getColorSchemeSelector !== "function") {
      return {};
    }
    let selector = theme.getColorSchemeSelector(key);
    if (selector === "&") {
      return styles3;
    }
    if (selector.includes("data-") || selector.includes(".")) {
      selector = `*:where(${selector.replace(/\s*&$/, "")}) &`;
    }
    return {
      [selector]: styles3
    };
  }
  if (theme.palette.mode === key) {
    return styles3;
  }
  return {};
}

// node_modules/@mui/system/esm/createTheme/createTheme.js
function createTheme(options = {}, ...args) {
  const _a = options, {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = _a, other = __objRest(_a, [
    "breakpoints",
    "palette",
    "spacing",
    "shape"
  ]);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: __spreadValues({
      mode: "light"
    }, paletteInput),
    spacing: spacing2,
    shape: __spreadValues(__spreadValues({}, shape_default), shapeInput)
  }, other);
  muiTheme = cssContainerQueries(muiTheme);
  muiTheme.applyStyles = applyStyles;
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  muiTheme.unstable_sxConfig = __spreadValues(__spreadValues({}, defaultSxConfig_default), other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
var createTheme_default = createTheme;

// node_modules/@mui/system/esm/useThemeWithoutDefault/useThemeWithoutDefault.js
import * as React6 from "react";
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme2(defaultTheme4 = null) {
  const contextTheme = React6.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme4 : contextTheme;
}
var useThemeWithoutDefault_default = useTheme2;

// node_modules/@mui/system/esm/useTheme/useTheme.js
var systemDefaultTheme = createTheme_default();
function useTheme3(defaultTheme4 = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme4);
}
var useTheme_default = useTheme3;

// node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js
var splitProps = (props) => {
  var _a, _b;
  const result = {
    systemProps: {},
    otherProps: {}
  };
  const config = (_b = (_a = props == null ? void 0 : props.theme) == null ? void 0 : _a.unstable_sxConfig) != null ? _b : defaultSxConfig_default;
  Object.keys(props).forEach((prop) => {
    if (config[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};
function extendSxProp(props) {
  const _a = props, {
    sx: inSx
  } = _a, other = __objRest(_a, [
    "sx"
  ]);
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === "function") {
    finalSx = (...args) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return __spreadValues(__spreadValues({}, systemProps), result);
    };
  } else {
    finalSx = __spreadValues(__spreadValues({}, systemProps), inSx);
  }
  return __spreadProps(__spreadValues({}, otherProps), {
    sx: finalSx
  });
}

// node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js
var defaultGenerator = (componentName) => componentName;
var createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },
    generate(componentName) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    }
  };
};
var ClassNameGenerator = createClassNameGenerator();
var ClassNameGenerator_default = ClassNameGenerator;

// node_modules/@mui/system/esm/createBox/createBox.js
import * as React7 from "react";

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// node_modules/@mui/system/esm/createBox/createBox.js
import { jsx as _jsx } from "react/jsx-runtime";
function createBox(options = {}) {
  const {
    themeId,
    defaultTheme: defaultTheme4,
    defaultClassName = "MuiBox-root",
    generateClassName
  } = options;
  const BoxRoot = styled("div", {
    shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as"
  })(styleFunctionSx_default);
  const Box2 = /* @__PURE__ */ React7.forwardRef(function Box3(inProps, ref) {
    const theme = useTheme_default(defaultTheme4);
    const _a = extendSxProp(inProps), {
      className,
      component = "div"
    } = _a, other = __objRest(_a, [
      "className",
      "component"
    ]);
    return /* @__PURE__ */ _jsx(BoxRoot, __spreadValues({
      as: component,
      ref,
      className: clsx_default(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme: themeId ? theme[themeId] || theme : theme
    }, other));
  });
  return Box2;
}

// node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
var globalStateClasses = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator_default.generate(componentName)}-${slot}`;
}

// node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}

// node_modules/@mui/system/esm/preprocessStyles.js
function preprocessStyles(input) {
  const _a = input, {
    variants
  } = _a, style3 = __objRest(_a, [
    "variants"
  ]);
  const result = {
    variants,
    style: internal_serializeStyles(style3),
    isProcessed: true
  };
  if (result.style === style3) {
    return result;
  }
  if (variants) {
    variants.forEach((variant) => {
      if (typeof variant.style !== "function") {
        variant.style = internal_serializeStyles(variant.style);
      }
    });
  }
  return result;
}

// node_modules/@mui/system/esm/createStyled/createStyled.js
var systemDefaultTheme2 = createTheme_default();
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
function defaultOverridesResolver(slot) {
  if (!slot) {
    return null;
  }
  return (_props, styles3) => styles3[slot];
}
function attachTheme(props, themeId, defaultTheme4) {
  props.theme = isObjectEmpty2(props.theme) ? defaultTheme4 : props.theme[themeId] || props.theme;
}
function processStyle(props, style3) {
  const resolvedStyle = typeof style3 === "function" ? style3(props) : style3;
  if (Array.isArray(resolvedStyle)) {
    return resolvedStyle.flatMap((subStyle) => processStyle(props, subStyle));
  }
  if (Array.isArray(resolvedStyle == null ? void 0 : resolvedStyle.variants)) {
    let rootStyle;
    if (resolvedStyle.isProcessed) {
      rootStyle = resolvedStyle.style;
    } else {
      const _a = resolvedStyle, {
        variants
      } = _a, otherStyles = __objRest(_a, [
        "variants"
      ]);
      rootStyle = otherStyles;
    }
    return processStyleVariants(props, resolvedStyle.variants, [rootStyle]);
  }
  if (resolvedStyle == null ? void 0 : resolvedStyle.isProcessed) {
    return resolvedStyle.style;
  }
  return resolvedStyle;
}
function processStyleVariants(props, variants, results = []) {
  var _a;
  let mergedState;
  variantLoop: for (let i = 0; i < variants.length; i += 1) {
    const variant = variants[i];
    if (typeof variant.props === "function") {
      mergedState != null ? mergedState : mergedState = __spreadProps(__spreadValues(__spreadValues({}, props), props.ownerState), {
        ownerState: props.ownerState
      });
      if (!variant.props(mergedState)) {
        continue;
      }
    } else {
      for (const key in variant.props) {
        if (props[key] !== variant.props[key] && ((_a = props.ownerState) == null ? void 0 : _a[key]) !== variant.props[key]) {
          continue variantLoop;
        }
      }
    }
    if (typeof variant.style === "function") {
      mergedState != null ? mergedState : mergedState = __spreadProps(__spreadValues(__spreadValues({}, props), props.ownerState), {
        ownerState: props.ownerState
      });
      results.push(variant.style(mergedState));
    } else {
      results.push(variant.style);
    }
  }
  return results;
}
function createStyled3(input = {}) {
  const {
    themeId,
    defaultTheme: defaultTheme4 = systemDefaultTheme2,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp: slotShouldForwardProp2 = shouldForwardProp
  } = input;
  function styleAttachTheme(props) {
    attachTheme(props, themeId, defaultTheme4);
  }
  const styled4 = (tag, inputOptions = {}) => {
    internal_mutateStyles(tag, (styles3) => styles3.filter((style3) => style3 !== styleFunctionSx_default));
    const _a = inputOptions, {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver: overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot))
    } = _a, options = __objRest(_a, [
      "name",
      "slot",
      "skipVariantsResolver",
      "skipSx",
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      "overridesResolver"
    ]);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      componentSlot && componentSlot !== "Root" && componentSlot !== "root" || false
    );
    const skipSx = inputSkipSx || false;
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root" || componentSlot === "root") {
      shouldForwardPropOption = rootShouldForwardProp2;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp2;
    } else if (isStringTag(tag)) {
      shouldForwardPropOption = void 0;
    }
    const defaultStyledResolver = styled(tag, __spreadValues({
      shouldForwardProp: shouldForwardPropOption,
      label: generateStyledLabel(componentName, componentSlot)
    }, options));
    const transformStyle = (style3) => {
      if (typeof style3 === "function" && style3.__emotion_real !== style3) {
        return function styleFunctionProcessor(props) {
          return processStyle(props, style3);
        };
      }
      if (isPlainObject(style3)) {
        const serialized = preprocessStyles(style3);
        if (!serialized.variants) {
          return serialized.style;
        }
        return function styleObjectProcessor(props) {
          return processStyle(props, serialized);
        };
      }
      return style3;
    };
    const muiStyledResolver = (...expressionsInput) => {
      const expressionsHead = [];
      const expressionsBody = expressionsInput.map(transformStyle);
      const expressionsTail = [];
      expressionsHead.push(styleAttachTheme);
      if (componentName && overridesResolver) {
        expressionsTail.push(function styleThemeOverrides(props) {
          var _a2, _b;
          const theme = props.theme;
          const styleOverrides = (_b = (_a2 = theme.components) == null ? void 0 : _a2[componentName]) == null ? void 0 : _b.styleOverrides;
          if (!styleOverrides) {
            return null;
          }
          const resolvedStyleOverrides = {};
          for (const slotKey in styleOverrides) {
            resolvedStyleOverrides[slotKey] = processStyle(props, styleOverrides[slotKey]);
          }
          return overridesResolver(props, resolvedStyleOverrides);
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsTail.push(function styleThemeVariants(props) {
          var _a2, _b;
          const theme = props.theme;
          const themeVariants = (_b = (_a2 = theme == null ? void 0 : theme.components) == null ? void 0 : _a2[componentName]) == null ? void 0 : _b.variants;
          if (!themeVariants) {
            return null;
          }
          return processStyleVariants(props, themeVariants);
        });
      }
      if (!skipSx) {
        expressionsTail.push(styleFunctionSx_default);
      }
      if (Array.isArray(expressionsBody[0])) {
        const inputStrings = expressionsBody.shift();
        const placeholdersHead = new Array(expressionsHead.length).fill("");
        const placeholdersTail = new Array(expressionsTail.length).fill("");
        let outputStrings;
        {
          outputStrings = [...placeholdersHead, ...inputStrings, ...placeholdersTail];
          outputStrings.raw = [...placeholdersHead, ...inputStrings.raw, ...placeholdersTail];
        }
        expressionsHead.unshift(outputStrings);
      }
      const expressions = [...expressionsHead, ...expressionsBody, ...expressionsTail];
      const Component = defaultStyledResolver(...expressions);
      if (tag.muiName) {
        Component.muiName = tag.muiName;
      }
      if (false) {
        Component.displayName = generateDisplayName(componentName, componentSlot, tag);
      }
      return Component;
    };
    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }
    return muiStyledResolver;
  };
  return styled4;
}
function generateStyledLabel(componentName, componentSlot) {
  let label;
  if (false) {
    if (componentName) {
      label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
    }
  }
  return label;
}
function isObjectEmpty2(object) {
  for (const _ in object) {
    return false;
  }
  return true;
}
function isStringTag(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96;
}
function lowercaseFirstLetter(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// node_modules/@mui/system/esm/styled/styled.js
var styled2 = createStyled3();
var styled_default = styled2;

// node_modules/@mui/utils/esm/resolveProps/resolveProps.js
function resolveProps(defaultProps2, props) {
  const output = __spreadValues({}, props);
  for (const key in defaultProps2) {
    if (Object.prototype.hasOwnProperty.call(defaultProps2, key)) {
      const propName = key;
      if (propName === "components" || propName === "slots") {
        output[propName] = __spreadValues(__spreadValues({}, defaultProps2[propName]), output[propName]);
      } else if (propName === "componentsProps" || propName === "slotProps") {
        const defaultSlotProps = defaultProps2[propName];
        const slotProps = props[propName];
        if (!slotProps) {
          output[propName] = defaultSlotProps || {};
        } else if (!defaultSlotProps) {
          output[propName] = slotProps;
        } else {
          output[propName] = __spreadValues({}, slotProps);
          for (const slotKey in defaultSlotProps) {
            if (Object.prototype.hasOwnProperty.call(defaultSlotProps, slotKey)) {
              const slotPropName = slotKey;
              output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName]);
            }
          }
        }
      } else if (output[propName] === void 0) {
        output[propName] = defaultProps2[propName];
      }
    }
  }
  return output;
}

// node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}

// node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme: defaultTheme4,
  themeId
}) {
  let theme = useTheme_default(defaultTheme4);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  return getThemeProps({
    theme,
    name,
    props
  });
}

// node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js
import * as React8 from "react";
var useEnhancedEffect = typeof window !== "undefined" ? React8.useLayoutEffect : React8.useEffect;
var useEnhancedEffect_default = useEnhancedEffect;

// node_modules/@mui/utils/esm/clamp/clamp.js
function clamp(val, min2 = Number.MIN_SAFE_INTEGER, max2 = Number.MAX_SAFE_INTEGER) {
  return Math.max(min2, Math.min(val, max2));
}
var clamp_default = clamp;

// node_modules/@mui/system/esm/colorManipulator/colorManipulator.js
function clampWrapper(value, min2 = 0, max2 = 1) {
  if (false) {
    if (value < min2 || value > max2) {
      console.error(`MUI: The value provided ${value} is out of range [${min2}, ${max2}].`);
    }
  }
  return clamp_default(value, min2, max2);
}
function hexToRgb(color2) {
  color2 = color2.slice(1);
  const re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  if (false) {
    if (color2.length !== color2.trim().length) {
      console.error(`MUI: The color: "${color2}" is invalid. Make sure the color input doesn't contain leading/trailing space.`);
    }
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function decomposeColor(color2) {
  if (color2.type) {
    return color2;
  }
  if (color2.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color2));
  }
  const marker = color2.indexOf("(");
  const type = color2.substring(0, marker);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(type)) {
    throw new Error(false ? `MUI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color2));
  }
  let values3 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values3 = values3.split(" ");
    colorSpace = values3.shift();
    if (values3.length === 4 && values3[3].charAt(0) === "/") {
      values3[3] = values3[3].slice(1);
    }
    if (!["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(colorSpace)) {
      throw new Error(false ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values3 = values3.split(",");
  }
  values3 = values3.map((value) => parseFloat(value));
  return {
    type,
    values: values3,
    colorSpace
  };
}
var colorChannel = (color2) => {
  const decomposedColor = decomposeColor(color2);
  return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.includes("hsl") && idx !== 0 ? `${val}%` : val).join(" ");
};
var private_safeColorChannel = (color2, warning) => {
  try {
    return colorChannel(color2);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
};
function recomposeColor(color2) {
  const {
    type,
    colorSpace
  } = color2;
  let {
    values: values3
  } = color2;
  if (type.includes("rgb")) {
    values3 = values3.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.includes("hsl")) {
    values3[1] = `${values3[1]}%`;
    values3[2] = `${values3[2]}%`;
  }
  if (type.includes("color")) {
    values3 = `${colorSpace} ${values3.join(" ")}`;
  } else {
    values3 = `${values3.join(", ")}`;
  }
  return `${type}(${values3})`;
}
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values3
  } = color2;
  const h = values3[0];
  const s = values3[1] / 100;
  const l = values3[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values3[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" || color2.type === "hsla" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  rgb = rgb.map((val) => {
    if (color2.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function alpha(color2, value) {
  color2 = decomposeColor(color2);
  value = clampWrapper(value);
  if (color2.type === "rgb" || color2.type === "hsl") {
    color2.type += "a";
  }
  if (color2.type === "color") {
    color2.values[3] = `/${value}`;
  } else {
    color2.values[3] = value;
  }
  return recomposeColor(color2);
}
function private_safeAlpha(color2, value, warning) {
  try {
    return alpha(color2, value);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
}
function darken(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clampWrapper(coefficient);
  if (color2.type.includes("hsl")) {
    color2.values[2] *= 1 - coefficient;
  } else if (color2.type.includes("rgb") || color2.type.includes("color")) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color2);
}
function private_safeDarken(color2, coefficient, warning) {
  try {
    return darken(color2, coefficient);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
}
function lighten(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clampWrapper(coefficient);
  if (color2.type.includes("hsl")) {
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  } else if (color2.type.includes("rgb")) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (255 - color2.values[i]) * coefficient;
    }
  } else if (color2.type.includes("color")) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (1 - color2.values[i]) * coefficient;
    }
  }
  return recomposeColor(color2);
}
function private_safeLighten(color2, coefficient, warning) {
  try {
    return lighten(color2, coefficient);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
}
function emphasize(color2, coefficient = 0.15) {
  return getLuminance(color2) > 0.5 ? darken(color2, coefficient) : lighten(color2, coefficient);
}
function private_safeEmphasize(color2, coefficient, warning) {
  try {
    return emphasize(color2, coefficient);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
}

// node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}

// node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node2) {
  return node2 && node2.ownerDocument || document;
}

// node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js
function ownerWindow(node2) {
  const doc = ownerDocument(node2);
  return doc.defaultView || window;
}

// node_modules/@mui/utils/esm/setRef/setRef.js
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

// node_modules/@mui/utils/esm/useId/useId.js
import * as React9 from "react";
var globalId = 0;
function useGlobalId(idOverride) {
  const [defaultId, setDefaultId] = React9.useState(idOverride);
  const id = idOverride || defaultId;
  React9.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
}
var safeReact = __spreadValues({}, React9);
var maybeReactUseId = safeReact.useId;
function useId(idOverride) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride != null ? idOverride : reactId;
  }
  return useGlobalId(idOverride);
}

// node_modules/@mui/utils/esm/useControlled/useControlled.js
import * as React10 from "react";
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React10.useRef(controlled !== void 0);
  const [valueState, setValue] = React10.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (false) {
    React10.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        console.error([`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React10.useRef(defaultProp);
    React10.useEffect(() => {
      if (!isControlled && !Object.is(defaultValue, defaultProp)) {
        console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [JSON.stringify(defaultProp)]);
  }
  const setValueIfUncontrolled = React10.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}

// node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
import * as React11 from "react";
function useEventCallback(fn2) {
  const ref = React11.useRef(fn2);
  useEnhancedEffect_default(() => {
    ref.current = fn2;
  });
  return React11.useRef((...args) => (
    // @ts-expect-error hide `this`
    (0, ref.current)(...args)
  )).current;
}
var useEventCallback_default = useEventCallback;

// node_modules/@mui/utils/esm/useForkRef/useForkRef.js
import * as React12 from "react";
function useForkRef(...refs) {
  const cleanupRef = React12.useRef(void 0);
  const refEffect = React12.useCallback((instance) => {
    const cleanups = refs.map((ref) => {
      if (ref == null) {
        return null;
      }
      if (typeof ref === "function") {
        const refCallback = ref;
        const refCleanup = refCallback(instance);
        return typeof refCleanup === "function" ? refCleanup : () => {
          refCallback(null);
        };
      }
      ref.current = instance;
      return () => {
        ref.current = null;
      };
    });
    return () => {
      cleanups.forEach((refCleanup) => refCleanup == null ? void 0 : refCleanup());
    };
  }, refs);
  return React12.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = void 0;
      }
      if (value != null) {
        cleanupRef.current = refEffect(value);
      }
    };
  }, refs);
}

// node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js
import * as React13 from "react";
var UNINITIALIZED = {};
function useLazyRef(init, initArg) {
  const ref = React13.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}

// node_modules/@mui/utils/esm/useOnMount/useOnMount.js
import * as React14 from "react";
var EMPTY = [];
function useOnMount(fn2) {
  React14.useEffect(fn2, EMPTY);
}

// node_modules/@mui/utils/esm/useTimeout/useTimeout.js
var Timeout = class _Timeout {
  constructor() {
    __publicField(this, "currentId", null);
    __publicField(this, "clear", () => {
      if (this.currentId !== null) {
        clearTimeout(this.currentId);
        this.currentId = null;
      }
    });
    __publicField(this, "disposeEffect", () => {
      return this.clear;
    });
  }
  static create() {
    return new _Timeout();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn2) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = null;
      fn2();
    }, delay);
  }
};
function useTimeout() {
  const timeout2 = useLazyRef(Timeout.create).current;
  useOnMount(timeout2.disposeEffect);
  return timeout2;
}

// node_modules/@mui/utils/esm/isFocusVisible/isFocusVisible.js
function isFocusVisible(element) {
  try {
    return element.matches(":focus-visible");
  } catch (error) {
    if (false) {
      console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join("\n"));
    }
  }
  return false;
}

// node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js
function getScrollbarSize(win = window) {
  const documentWidth = win.document.documentElement.clientWidth;
  return win.innerWidth - documentWidth;
}

// node_modules/@mui/utils/esm/composeClasses/composeClasses.js
function composeClasses(slots, getUtilityClass, classes = void 0) {
  const output = {};
  for (const slotName in slots) {
    const slot = slots[slotName];
    let buffer = "";
    let start2 = true;
    for (let i = 0; i < slot.length; i += 1) {
      const value = slot[i];
      if (value) {
        buffer += (start2 === true ? "" : " ") + getUtilityClass(value);
        start2 = false;
        if (classes && classes[value]) {
          buffer += " " + classes[value];
        }
      }
    }
    output[slotName] = buffer;
  }
  return output;
}

// node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var isHostComponent_default = isHostComponent;

// node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent_default(elementType)) {
    return otherProps;
  }
  return __spreadProps(__spreadValues({}, otherProps), {
    ownerState: __spreadValues(__spreadValues({}, otherProps.ownerState), ownerState)
  });
}
var appendOwnerState_default = appendOwnerState;

// node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var extractEventHandlers_default = extractEventHandlers;

// node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var omitEventHandlers_default = omitEventHandlers;

// node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_default(additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
    const mergedStyle2 = __spreadValues(__spreadValues(__spreadValues({}, additionalProps == null ? void 0 : additionalProps.style), externalForwardedProps == null ? void 0 : externalForwardedProps.style), externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = __spreadValues(__spreadValues(__spreadValues({}, additionalProps), externalForwardedProps), externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers_default(__spreadValues(__spreadValues({}, externalForwardedProps), externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers_default(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers_default(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, internalSlotProps == null ? void 0 : internalSlotProps.style), additionalProps == null ? void 0 : additionalProps.style), externalForwardedProps == null ? void 0 : externalForwardedProps.style), externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, internalSlotProps), additionalProps), otherPropsWithoutEventHandlers), componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}
var mergeSlotProps_default = mergeSlotProps;

// node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}
var resolveComponentProps_default = resolveComponentProps;

// node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js
function useSlotProps(parameters) {
  var _b;
  const _a = parameters, {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false
  } = _a, other = __objRest(_a, [
    "elementType",
    "externalSlotProps",
    "ownerState",
    "skipResolvingSlotProps"
  ]);
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps_default(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps_default(__spreadProps(__spreadValues({}, other), {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_b = parameters.additionalProps) == null ? void 0 : _b.ref);
  const props = appendOwnerState_default(elementType, __spreadProps(__spreadValues({}, mergedProps), {
    ref
  }), ownerState);
  return props;
}
var useSlotProps_default = useSlotProps;

// node_modules/@mui/utils/esm/getReactElementRef/getReactElementRef.js
import * as React15 from "react";
function getReactElementRef(element) {
  var _a;
  if (parseInt(React15.version, 10) >= 19) {
    return ((_a = element == null ? void 0 : element.props) == null ? void 0 : _a.ref) || null;
  }
  return (element == null ? void 0 : element.ref) || null;
}

// node_modules/@mui/system/esm/RtlProvider/index.js
import * as React16 from "react";
import { jsx as _jsx2 } from "react/jsx-runtime";
var RtlContext = /* @__PURE__ */ React16.createContext();
false ? RtlProvider.propTypes = {
  children: import_prop_types.default.node,
  value: import_prop_types.default.bool
} : void 0;
var useRtl = () => {
  const value = React16.useContext(RtlContext);
  return value != null ? value : false;
};

// node_modules/@mui/system/esm/DefaultPropsProvider/DefaultPropsProvider.js
import * as React17 from "react";
import { jsx as _jsx3 } from "react/jsx-runtime";
var PropsContext = /* @__PURE__ */ React17.createContext(void 0);
false ? DefaultPropsProvider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * @ignore
   */
  value: import_prop_types.default.object
} : void 0;
function getThemeProps2(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name]) {
    return props;
  }
  const config = theme.components[name];
  if (config.defaultProps) {
    return resolveProps(config.defaultProps, props);
  }
  if (!config.styleOverrides && !config.variants) {
    return resolveProps(config, props);
  }
  return props;
}
function useDefaultProps({
  props,
  name
}) {
  const ctx = React17.useContext(PropsContext);
  return getThemeProps2({
    props,
    name,
    theme: {
      components: ctx
    }
  });
}

// node_modules/@mui/system/esm/memoTheme.js
var arg = {
  theme: void 0
};
function unstable_memoTheme(styleFn) {
  let lastValue;
  let lastTheme;
  return function styleMemoized(props) {
    let value = lastValue;
    if (value === void 0 || props.theme !== lastTheme) {
      arg.theme = props.theme;
      value = preprocessStyles(styleFn(arg));
      lastValue = value;
      lastTheme = props.theme;
    }
    return value;
  };
}

// node_modules/@mui/system/esm/cssVars/createGetCssVar.js
function createGetCssVar(prefix2 = "") {
  function appendVar(...vars) {
    if (!vars.length) {
      return "";
    }
    const value = vars[0];
    if (typeof value === "string" && !value.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/)) {
      return `, var(--${prefix2 ? `${prefix2}-` : ""}${value}${appendVar(...vars.slice(1))})`;
    }
    return `, ${value}`;
  }
  const getCssVar = (field, ...fallbacks) => {
    return `var(--${prefix2 ? `${prefix2}-` : ""}${field}${appendVar(...fallbacks)})`;
  };
  return getCssVar;
}

// node_modules/@mui/system/esm/cssVars/cssVarsParser.js
var assignNestedKeys = (obj, keys, value, arrayKeys = []) => {
  let temp = obj;
  keys.forEach((k, index) => {
    if (index === keys.length - 1) {
      if (Array.isArray(temp)) {
        temp[Number(k)] = value;
      } else if (temp && typeof temp === "object") {
        temp[k] = value;
      }
    } else if (temp && typeof temp === "object") {
      if (!temp[k]) {
        temp[k] = arrayKeys.includes(k) ? [] : {};
      }
      temp = temp[k];
    }
  });
};
var walkObjectDeep = (obj, callback, shouldSkipPaths) => {
  function recurse(object, parentKeys = [], arrayKeys = []) {
    Object.entries(object).forEach(([key, value]) => {
      if (!shouldSkipPaths || shouldSkipPaths && !shouldSkipPaths([...parentKeys, key])) {
        if (value !== void 0 && value !== null) {
          if (typeof value === "object" && Object.keys(value).length > 0) {
            recurse(value, [...parentKeys, key], Array.isArray(value) ? [...arrayKeys, key] : arrayKeys);
          } else {
            callback([...parentKeys, key], value, arrayKeys);
          }
        }
      }
    });
  }
  recurse(obj);
};
var getCssValue = (keys, value) => {
  if (typeof value === "number") {
    if (["lineHeight", "fontWeight", "opacity", "zIndex"].some((prop) => keys.includes(prop))) {
      return value;
    }
    const lastKey = keys[keys.length - 1];
    if (lastKey.toLowerCase().includes("opacity")) {
      return value;
    }
    return `${value}px`;
  }
  return value;
};
function cssVarsParser(theme, options) {
  const {
    prefix: prefix2,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2
  } = options || {};
  const css2 = {};
  const vars = {};
  const varsWithDefaults = {};
  walkObjectDeep(
    theme,
    (keys, value, arrayKeys) => {
      if (typeof value === "string" || typeof value === "number") {
        if (!shouldSkipGeneratingVar2 || !shouldSkipGeneratingVar2(keys, value)) {
          const cssVar = `--${prefix2 ? `${prefix2}-` : ""}${keys.join("-")}`;
          const resolvedValue = getCssValue(keys, value);
          Object.assign(css2, {
            [cssVar]: resolvedValue
          });
          assignNestedKeys(vars, keys, `var(${cssVar})`, arrayKeys);
          assignNestedKeys(varsWithDefaults, keys, `var(${cssVar}, ${resolvedValue})`, arrayKeys);
        }
      }
    },
    (keys) => keys[0] === "vars"
    // skip 'vars/*' paths
  );
  return {
    css: css2,
    vars,
    varsWithDefaults
  };
}

// node_modules/@mui/system/esm/cssVars/prepareCssVars.js
function prepareCssVars(theme, parserConfig = {}) {
  const {
    getSelector = defaultGetSelector,
    disableCssColorScheme,
    colorSchemeSelector: selector
  } = parserConfig;
  const _a = theme, {
    colorSchemes = {},
    components,
    defaultColorScheme = "light"
  } = _a, otherTheme = __objRest(_a, [
    "colorSchemes",
    "components",
    "defaultColorScheme"
  ]);
  const {
    vars: rootVars,
    css: rootCss,
    varsWithDefaults: rootVarsWithDefaults
  } = cssVarsParser(otherTheme, parserConfig);
  let themeVars = rootVarsWithDefaults;
  const colorSchemesMap = {};
  const _b = colorSchemes, {
    [defaultColorScheme]: defaultScheme
  } = _b, otherColorSchemes = __objRest(_b, [
    __restKey(defaultColorScheme)
  ]);
  Object.entries(otherColorSchemes || {}).forEach(([key, scheme]) => {
    const {
      vars,
      css: css2,
      varsWithDefaults
    } = cssVarsParser(scheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[key] = {
      css: css2,
      vars
    };
  });
  if (defaultScheme) {
    const {
      css: css2,
      vars,
      varsWithDefaults
    } = cssVarsParser(defaultScheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[defaultColorScheme] = {
      css: css2,
      vars
    };
  }
  function defaultGetSelector(colorScheme, cssObject) {
    var _a2, _b2;
    let rule = selector;
    if (selector === "class") {
      rule = ".%s";
    }
    if (selector === "data") {
      rule = "[data-%s]";
    }
    if ((selector == null ? void 0 : selector.startsWith("data-")) && !selector.includes("%s")) {
      rule = `[${selector}="%s"]`;
    }
    if (colorScheme) {
      if (rule === "media") {
        if (theme.defaultColorScheme === colorScheme) {
          return ":root";
        }
        const mode = ((_b2 = (_a2 = colorSchemes[colorScheme]) == null ? void 0 : _a2.palette) == null ? void 0 : _b2.mode) || colorScheme;
        return {
          [`@media (prefers-color-scheme: ${mode})`]: {
            ":root": cssObject
          }
        };
      }
      if (rule) {
        if (theme.defaultColorScheme === colorScheme) {
          return `:root, ${rule.replace("%s", String(colorScheme))}`;
        }
        return rule.replace("%s", String(colorScheme));
      }
    }
    return ":root";
  }
  const generateThemeVars = () => {
    let vars = __spreadValues({}, rootVars);
    Object.entries(colorSchemesMap).forEach(([, {
      vars: schemeVars
    }]) => {
      vars = deepmerge(vars, schemeVars);
    });
    return vars;
  };
  const generateStyleSheets = () => {
    var _b2, _c;
    const stylesheets = [];
    const colorScheme = theme.defaultColorScheme || "light";
    function insertStyleSheet(key, css2) {
      if (Object.keys(css2).length) {
        stylesheets.push(typeof key === "string" ? {
          [key]: __spreadValues({}, css2)
        } : key);
      }
    }
    insertStyleSheet(getSelector(void 0, __spreadValues({}, rootCss)), rootCss);
    const _a2 = colorSchemesMap, {
      [colorScheme]: defaultSchemeVal
    } = _a2, other = __objRest(_a2, [
      __restKey(colorScheme)
    ]);
    if (defaultSchemeVal) {
      const {
        css: css2
      } = defaultSchemeVal;
      const cssColorSheme = (_c = (_b2 = colorSchemes[colorScheme]) == null ? void 0 : _b2.palette) == null ? void 0 : _c.mode;
      const finalCss = !disableCssColorScheme && cssColorSheme ? __spreadValues({
        colorScheme: cssColorSheme
      }, css2) : __spreadValues({}, css2);
      insertStyleSheet(getSelector(colorScheme, __spreadValues({}, finalCss)), finalCss);
    }
    Object.entries(other).forEach(([key, {
      css: css2
    }]) => {
      var _a3, _b3;
      const cssColorSheme = (_b3 = (_a3 = colorSchemes[key]) == null ? void 0 : _a3.palette) == null ? void 0 : _b3.mode;
      const finalCss = !disableCssColorScheme && cssColorSheme ? __spreadValues({
        colorScheme: cssColorSheme
      }, css2) : __spreadValues({}, css2);
      insertStyleSheet(getSelector(key, __spreadValues({}, finalCss)), finalCss);
    });
    return stylesheets;
  };
  return {
    vars: themeVars,
    generateThemeVars,
    generateStyleSheets
  };
}
var prepareCssVars_default = prepareCssVars;

// node_modules/@mui/system/esm/cssVars/getColorSchemeSelector.js
function createGetColorSchemeSelector(selector) {
  return function getColorSchemeSelector(colorScheme) {
    if (selector === "media") {
      if (false) {
        if (colorScheme !== "light" && colorScheme !== "dark") {
          console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${colorScheme}'.`);
        }
      }
      return `@media (prefers-color-scheme: ${colorScheme})`;
    }
    if (selector) {
      if (selector.startsWith("data-") && !selector.includes("%s")) {
        return `[${selector}="${colorScheme}"] &`;
      }
      if (selector === "class") {
        return `.${colorScheme} &`;
      }
      if (selector === "data") {
        return `[data-${colorScheme}] &`;
      }
      return `${selector.replace("%s", colorScheme)} &`;
    }
    return "&";
  };
}

// node_modules/@mui/system/esm/Container/createContainer.js
import * as React18 from "react";
import { jsx as _jsx4 } from "react/jsx-runtime";
var defaultTheme = createTheme_default();
var defaultCreateStyledComponent = styled_default("div", {
  name: "MuiContainer",
  slot: "Root",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, styles3[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles3.fixed, ownerState.disableGutters && styles3.disableGutters];
  }
});
var useThemePropsDefault = (inProps) => useThemeProps({
  props: inProps,
  name: "MuiContainer",
  defaultTheme
});
var useUtilityClasses = (ownerState, componentName) => {
  const getContainerUtilityClass = (slot) => {
    return generateUtilityClass(componentName, slot);
  };
  const {
    classes,
    fixed,
    disableGutters,
    maxWidth: maxWidth2
  } = ownerState;
  const slots = {
    root: ["root", maxWidth2 && `maxWidth${capitalize(String(maxWidth2))}`, fixed && "fixed", disableGutters && "disableGutters"]
  };
  return composeClasses(slots, getContainerUtilityClass, classes);
};
function createContainer(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps: useThemeProps2 = useThemePropsDefault,
    componentName = "MuiContainer"
  } = options;
  const ContainerRoot = createStyledComponent(({
    theme,
    ownerState
  }) => __spreadValues({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto"
  }, !ownerState.disableGutters && {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    // @ts-ignore module augmentation fails if custom breakpoints are used
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  }), ({
    theme,
    ownerState
  }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
    const breakpoint = breakpointValueKey;
    const value = theme.breakpoints.values[breakpoint];
    if (value !== 0) {
      acc[theme.breakpoints.up(breakpoint)] = {
        maxWidth: `${value}${theme.breakpoints.unit}`
      };
    }
    return acc;
  }, {}), ({
    theme,
    ownerState
  }) => __spreadValues(__spreadValues({}, ownerState.maxWidth === "xs" && {
    // @ts-ignore module augmentation fails if custom breakpoints are used
    [theme.breakpoints.up("xs")]: {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      maxWidth: Math.max(theme.breakpoints.values.xs, 444)
    }
  }), ownerState.maxWidth && // @ts-ignore module augmentation fails if custom breakpoints are used
  ownerState.maxWidth !== "xs" && {
    // @ts-ignore module augmentation fails if custom breakpoints are used
    [theme.breakpoints.up(ownerState.maxWidth)]: {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
    }
  }));
  const Container2 = /* @__PURE__ */ React18.forwardRef(function Container3(inProps, ref) {
    const props = useThemeProps2(inProps);
    const _a = props, {
      className,
      component = "div",
      disableGutters = false,
      fixed = false,
      maxWidth: maxWidth2 = "lg",
      classes: classesProp
    } = _a, other = __objRest(_a, [
      "className",
      "component",
      "disableGutters",
      "fixed",
      "maxWidth",
      "classes"
    ]);
    const ownerState = __spreadProps(__spreadValues({}, props), {
      component,
      disableGutters,
      fixed,
      maxWidth: maxWidth2
    });
    const classes = useUtilityClasses(ownerState, componentName);
    return (
      // @ts-ignore theme is injected by the styled util
      /* @__PURE__ */ _jsx4(ContainerRoot, __spreadValues({
        as: component,
        ownerState,
        className: clsx_default(classes.root, className),
        ref
      }, other))
    );
  });
  false ? Container2.propTypes = {
    children: import_prop_types.default.node,
    classes: import_prop_types.default.object,
    className: import_prop_types.default.string,
    component: import_prop_types.default.elementType,
    disableGutters: import_prop_types.default.bool,
    fixed: import_prop_types.default.bool,
    maxWidth: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types.default.string]),
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
  } : void 0;
  return Container2;
}

// node_modules/@mui/material/esm/styles/identifier.js
var identifier_default = "$$material";

// node_modules/@mui/material/esm/colors/common.js
var common = {
  black: "#000",
  white: "#fff"
};
var common_default = common;

// node_modules/@mui/material/esm/colors/grey.js
var grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
var grey_default = grey;

// node_modules/@mui/material/esm/colors/purple.js
var purple = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
var purple_default = purple;

// node_modules/@mui/material/esm/colors/red.js
var red = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
var red_default = red;

// node_modules/@mui/material/esm/colors/orange.js
var orange = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
var orange_default = orange;

// node_modules/@mui/material/esm/colors/blue.js
var blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
var blue_default = blue;

// node_modules/@mui/material/esm/colors/lightBlue.js
var lightBlue = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
var lightBlue_default = lightBlue;

// node_modules/@mui/material/esm/colors/green.js
var green = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
var green_default = green;

// node_modules/@mui/material/esm/styles/createPalette.js
function getLight() {
  return {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: "rgba(0, 0, 0, 0.87)",
      // Secondary text.
      secondary: "rgba(0, 0, 0, 0.6)",
      // Disabled text have even lower visual prominence.
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    // The color used to divide different elements.
    divider: "rgba(0, 0, 0, 0.12)",
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: common_default.white,
      default: common_default.white
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: "rgba(0, 0, 0, 0.54)",
      // The color of an hovered action.
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: "rgba(0, 0, 0, 0.26)",
      // The background color of a disabled action.
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  };
}
var light = getLight();
function getDark() {
  return {
    text: {
      primary: common_default.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)"
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#121212",
      default: "#121212"
    },
    action: {
      active: common_default.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    }
  };
}
var dark = getDark();
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue_default[200],
      light: blue_default[50],
      dark: blue_default[400]
    };
  }
  return {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple_default[200],
      light: purple_default[50],
      dark: purple_default[400]
    };
  }
  return {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red_default[500],
      light: red_default[300],
      dark: red_default[700]
    };
  }
  return {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue_default[400],
      light: lightBlue_default[300],
      dark: lightBlue_default[700]
    };
  }
  return {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green_default[400],
      light: green_default[300],
      dark: green_default[700]
    };
  }
  return {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange_default[400],
      light: orange_default[300],
      dark: orange_default[700]
    };
  }
  return {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: orange_default[500],
    dark: orange_default[900]
  };
}
function createPalette(palette2) {
  const _a = palette2, {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = _a, other = __objRest(_a, [
    "mode",
    "contrastThreshold",
    "tonalOffset"
  ]);
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (false) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = __spreadValues({}, color2);
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(false ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(false ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  };
  let modeHydrated;
  if (mode === "light") {
    modeHydrated = getLight();
  } else if (mode === "dark") {
    modeHydrated = getDark();
  }
  if (false) {
    if (!modeHydrated) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge(__spreadValues({
    // A collection of common colors.
    common: __spreadValues({}, common_default),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: "success"
    }),
    // The grey colors.
    grey: grey_default,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset
  }, modeHydrated), other);
  return paletteOutput;
}

// node_modules/@mui/system/esm/cssVars/prepareTypographyVars.js
function prepareTypographyVars(typography) {
  const vars = {};
  const entries = Object.entries(typography);
  entries.forEach((entry) => {
    const [key, value] = entry;
    if (typeof value === "object") {
      vars[key] = `${value.fontStyle ? `${value.fontStyle} ` : ""}${value.fontVariant ? `${value.fontVariant} ` : ""}${value.fontWeight ? `${value.fontWeight} ` : ""}${value.fontStretch ? `${value.fontStretch} ` : ""}${value.fontSize || ""}${value.lineHeight ? `/${value.lineHeight} ` : ""}${value.fontFamily || ""}`;
    }
  });
  return vars;
}

// node_modules/@mui/material/esm/styles/createMixins.js
function createMixins(breakpoints, mixins) {
  return __spreadValues({
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}

// node_modules/@mui/material/esm/styles/createTypography.js
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
var caseAllCaps = {
  textTransform: "uppercase"
};
var defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(palette2, typography) {
  const _a = typeof typography === "function" ? typography(palette2) : typography, {
    fontFamily = defaultFontFamily,
    fontSize: fontSize = 14,
    fontWeightLight: fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize: htmlFontSize = 16,
    allVariants: allVariants,
    pxToRem: pxToRem2
  } = _a, other = __objRest(_a, [
    "fontFamily",
    // The default font size of the Material Specification.
    "fontSize",
    // px
    "fontWeightLight",
    "fontWeightRegular",
    "fontWeightMedium",
    "fontWeightBold",
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    "htmlFontSize",
    // Apply the CSS properties to all the variants.
    "allVariants",
    "pxToRem"
  ]);
  if (false) {
    if (typeof fontSize !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => __spreadValues(__spreadValues(__spreadValues({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight
  }, fontFamily === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing / size)}em`
  } : {}), casing), allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return deepmerge(__spreadValues({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
    // No need to clone deep
  });
}

// node_modules/@mui/material/esm/styles/shadows.js
var shadowKeyUmbraOpacity = 0.2;
var shadowKeyPenumbraOpacity = 0.14;
var shadowAmbientShadowOpacity = 0.12;
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
var shadows_default = shadows;

// node_modules/@mui/material/esm/styles/createTransitions.js
var easing = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
var duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.min(Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10), 3e3);
}
function createTransitions(inputTransitions) {
  const mergedEasing = __spreadValues(__spreadValues({}, easing), inputTransitions.easing);
  const mergedDuration = __spreadValues(__spreadValues({}, duration), inputTransitions.duration);
  const create = (props = ["all"], options = {}) => {
    const _a = options, {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = _a, other = __objRest(_a, [
      "duration",
      "easing",
      "delay"
    ]);
    if (false) {
      const isString = (value) => typeof value === "string";
      const isNumber = (value) => !Number.isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (typeof options !== "object") {
        console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join("\n"));
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return __spreadProps(__spreadValues({
    getAutoHeightDuration,
    create
  }, inputTransitions), {
    easing: mergedEasing,
    duration: mergedDuration
  });
}

// node_modules/@mui/material/esm/styles/zIndex.js
var zIndex = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var zIndex_default = zIndex;

// node_modules/@mui/material/esm/styles/stringifyTheme.js
function isSerializable(val) {
  return isPlainObject(val) || typeof val === "undefined" || typeof val === "string" || typeof val === "boolean" || typeof val === "number" || Array.isArray(val);
}
function stringifyTheme(baseTheme = {}) {
  const serializableTheme = __spreadValues({}, baseTheme);
  function serializeTheme(object) {
    const array = Object.entries(object);
    for (let index = 0; index < array.length; index++) {
      const [key, value] = array[index];
      if (!isSerializable(value) || key.startsWith("unstable_")) {
        delete object[key];
      } else if (isPlainObject(value)) {
        object[key] = __spreadValues({}, value);
        serializeTheme(object[key]);
      }
    }
  }
  serializeTheme(serializableTheme);
  return `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(serializableTheme, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}

// node_modules/@mui/material/esm/styles/createThemeNoVars.js
function createThemeNoVars(options = {}, ...args) {
  const _a = options, {
    breakpoints: breakpointsInput,
    mixins: mixinsInput = {},
    spacing: spacingInput,
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {},
    shape: shapeInput
  } = _a, other = __objRest(_a, [
    "breakpoints",
    "mixins",
    "spacing",
    "palette",
    "transitions",
    "typography",
    "shape"
  ]);
  if (options.vars && // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  options.generateThemeVars === void 0) {
    throw new Error(false ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name or follow the [docs](https://mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature." : formatMuiErrorMessage(20));
  }
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme_default(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette: palette2,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows_default.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: __spreadValues({}, zIndex_default)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (false) {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node2, component) => {
      let key;
      for (key in node2) {
        const child = node2[key];
        if (stateClasses.includes(key) && Object.keys(child).length > 0) {
          if (false) {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node2, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
          }
          node2[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.startsWith("Mui")) {
        traverse(styleOverrides, component);
      }
    });
  }
  muiTheme.unstable_sxConfig = __spreadValues(__spreadValues({}, defaultSxConfig_default), other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  muiTheme.toRuntimeSource = stringifyTheme;
  return muiTheme;
}
var createThemeNoVars_default = createThemeNoVars;

// node_modules/@mui/material/esm/styles/getOverlayAlpha.js
function getOverlayAlpha(elevation) {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return Math.round(alphaValue * 10) / 1e3;
}

// node_modules/@mui/material/esm/styles/createColorScheme.js
var defaultDarkOverlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return "none";
  }
  const overlay = getOverlayAlpha(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});
function getOpacity(mode) {
  return {
    inputPlaceholder: mode === "dark" ? 0.5 : 0.42,
    inputUnderline: mode === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: mode === "dark" ? 0.2 : 0.12,
    switchTrack: mode === "dark" ? 0.3 : 0.38
  };
}
function getOverlays(mode) {
  return mode === "dark" ? defaultDarkOverlays : [];
}
function createColorScheme(options) {
  const _a = options, {
    palette: paletteInput = {
      mode: "light"
    },
    opacity: opacity,
    overlays
  } = _a, rest = __objRest(_a, [
    "palette",
    // need to cast to avoid module augmentation test
    "opacity",
    "overlays"
  ]);
  const palette2 = createPalette(paletteInput);
  return __spreadValues({
    palette: palette2,
    opacity: __spreadValues(__spreadValues({}, getOpacity(palette2.mode)), opacity),
    overlays: overlays || getOverlays(palette2.mode)
  }, rest);
}

// node_modules/@mui/material/esm/styles/shouldSkipGeneratingVar.js
function shouldSkipGeneratingVar(keys) {
  var _a;
  return !!keys[0].match(/(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!keys[0].match(/sxConfig$/) || // ends with sxConfig
  keys[0] === "palette" && !!((_a = keys[1]) == null ? void 0 : _a.match(/(mode|contrastThreshold|tonalOffset)/));
}

// node_modules/@mui/material/esm/styles/excludeVariablesFromRoot.js
var excludeVariablesFromRoot = (cssVarPrefix) => [...[...Array(25)].map((_, index) => `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}overlays-${index}`), `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkBg`, `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkColor`];
var excludeVariablesFromRoot_default = excludeVariablesFromRoot;

// node_modules/@mui/material/esm/styles/createGetSelector.js
var createGetSelector_default = (theme) => (colorScheme, css2) => {
  const root = theme.rootSelector || ":root";
  const selector = theme.colorSchemeSelector;
  let rule = selector;
  if (selector === "class") {
    rule = ".%s";
  }
  if (selector === "data") {
    rule = "[data-%s]";
  }
  if ((selector == null ? void 0 : selector.startsWith("data-")) && !selector.includes("%s")) {
    rule = `[${selector}="%s"]`;
  }
  if (theme.defaultColorScheme === colorScheme) {
    if (colorScheme === "dark") {
      const excludedVariables = {};
      excludeVariablesFromRoot_default(theme.cssVarPrefix).forEach((cssVar) => {
        excludedVariables[cssVar] = css2[cssVar];
        delete css2[cssVar];
      });
      if (rule === "media") {
        return {
          [root]: css2,
          [`@media (prefers-color-scheme: dark)`]: {
            [root]: excludedVariables
          }
        };
      }
      if (rule) {
        return {
          [rule.replace("%s", colorScheme)]: excludedVariables,
          [`${root}, ${rule.replace("%s", colorScheme)}`]: css2
        };
      }
      return {
        [root]: __spreadValues(__spreadValues({}, css2), excludedVariables)
      };
    }
    if (rule && rule !== "media") {
      return `${root}, ${rule.replace("%s", String(colorScheme))}`;
    }
  } else if (colorScheme) {
    if (rule === "media") {
      return {
        [`@media (prefers-color-scheme: ${String(colorScheme)})`]: {
          [root]: css2
        }
      };
    }
    if (rule) {
      return rule.replace("%s", String(colorScheme));
    }
  }
  return root;
};

// node_modules/@mui/material/esm/styles/createThemeWithVars.js
function assignNode(obj, keys) {
  keys.forEach((k) => {
    if (!obj[k]) {
      obj[k] = {};
    }
  });
}
function setColor(obj, key, defaultValue) {
  if (!obj[key] && defaultValue) {
    obj[key] = defaultValue;
  }
}
function toRgb(color2) {
  if (typeof color2 !== "string" || !color2.startsWith("hsl")) {
    return color2;
  }
  return hslToRgb(color2);
}
function setColorChannel(obj, key) {
  if (!(`${key}Channel` in obj)) {
    obj[`${key}Channel`] = private_safeColorChannel(toRgb(obj[key]), `MUI: Can't create \`palette.${key}Channel\` because \`palette.${key}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${key}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`);
  }
}
function getSpacingVal(spacingInput) {
  if (typeof spacingInput === "number") {
    return `${spacingInput}px`;
  }
  if (typeof spacingInput === "string" || typeof spacingInput === "function" || Array.isArray(spacingInput)) {
    return spacingInput;
  }
  return "8px";
}
var silent = (fn2) => {
  try {
    return fn2();
  } catch (error) {
  }
  return void 0;
};
var createGetCssVar2 = (cssVarPrefix = "mui") => createGetCssVar(cssVarPrefix);
function attachColorScheme(colorSchemes, scheme, restTheme, colorScheme) {
  if (!scheme) {
    return void 0;
  }
  scheme = scheme === true ? {} : scheme;
  const mode = colorScheme === "dark" ? "dark" : "light";
  if (!restTheme) {
    colorSchemes[colorScheme] = createColorScheme(__spreadProps(__spreadValues({}, scheme), {
      palette: __spreadValues({
        mode
      }, scheme == null ? void 0 : scheme.palette)
    }));
    return void 0;
  }
  const _a = createThemeNoVars_default(__spreadProps(__spreadValues({}, restTheme), {
    palette: __spreadValues({
      mode
    }, scheme == null ? void 0 : scheme.palette)
  })), {
    palette: palette2
  } = _a, muiTheme = __objRest(_a, [
    "palette"
  ]);
  colorSchemes[colorScheme] = __spreadProps(__spreadValues({}, scheme), {
    palette: palette2,
    opacity: __spreadValues(__spreadValues({}, getOpacity(mode)), scheme == null ? void 0 : scheme.opacity),
    overlays: (scheme == null ? void 0 : scheme.overlays) || getOverlays(mode)
  });
  return muiTheme;
}
function createThemeWithVars(options = {}, ...args) {
  const _a = options, {
    colorSchemes: colorSchemesInput = {
      light: true
    },
    defaultColorScheme: defaultColorSchemeInput,
    disableCssColorScheme = false,
    cssVarPrefix = "mui",
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2 = shouldSkipGeneratingVar,
    colorSchemeSelector: selector = colorSchemesInput.light && colorSchemesInput.dark ? "media" : void 0,
    rootSelector = ":root"
  } = _a, input = __objRest(_a, [
    "colorSchemes",
    "defaultColorScheme",
    "disableCssColorScheme",
    "cssVarPrefix",
    "shouldSkipGeneratingVar",
    "colorSchemeSelector",
    "rootSelector"
  ]);
  const firstColorScheme = Object.keys(colorSchemesInput)[0];
  const defaultColorScheme = defaultColorSchemeInput || (colorSchemesInput.light && firstColorScheme !== "light" ? "light" : firstColorScheme);
  const getCssVar = createGetCssVar2(cssVarPrefix);
  const _b = colorSchemesInput, {
    [defaultColorScheme]: defaultSchemeInput,
    light: builtInLight,
    dark: builtInDark
  } = _b, customColorSchemes = __objRest(_b, [
    __restKey(defaultColorScheme),
    "light",
    "dark"
  ]);
  const colorSchemes = __spreadValues({}, customColorSchemes);
  let defaultScheme = defaultSchemeInput;
  if (defaultColorScheme === "dark" && !("dark" in colorSchemesInput) || defaultColorScheme === "light" && !("light" in colorSchemesInput)) {
    defaultScheme = true;
  }
  if (!defaultScheme) {
    throw new Error(false ? `MUI: The \`colorSchemes.${defaultColorScheme}\` option is either missing or invalid.` : formatMuiErrorMessage(21, defaultColorScheme));
  }
  const muiTheme = attachColorScheme(colorSchemes, defaultScheme, input, defaultColorScheme);
  if (builtInLight && !colorSchemes.light) {
    attachColorScheme(colorSchemes, builtInLight, void 0, "light");
  }
  if (builtInDark && !colorSchemes.dark) {
    attachColorScheme(colorSchemes, builtInDark, void 0, "dark");
  }
  let theme = __spreadProps(__spreadValues({
    defaultColorScheme
  }, muiTheme), {
    cssVarPrefix,
    colorSchemeSelector: selector,
    rootSelector,
    getCssVar,
    colorSchemes,
    font: __spreadValues(__spreadValues({}, prepareTypographyVars(muiTheme.typography)), muiTheme.font),
    spacing: getSpacingVal(input.spacing)
  });
  Object.keys(theme.colorSchemes).forEach((key) => {
    const palette2 = theme.colorSchemes[key].palette;
    const setCssVarColor = (cssVar) => {
      const tokens = cssVar.split("-");
      const color2 = tokens[1];
      const colorToken = tokens[2];
      return getCssVar(cssVar, palette2[color2][colorToken]);
    };
    if (palette2.mode === "light") {
      setColor(palette2.common, "background", "#fff");
      setColor(palette2.common, "onBackground", "#000");
    }
    if (palette2.mode === "dark") {
      setColor(palette2.common, "background", "#000");
      setColor(palette2.common, "onBackground", "#fff");
    }
    assignNode(palette2, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]);
    if (palette2.mode === "light") {
      setColor(palette2.Alert, "errorColor", private_safeDarken(palette2.error.light, 0.6));
      setColor(palette2.Alert, "infoColor", private_safeDarken(palette2.info.light, 0.6));
      setColor(palette2.Alert, "successColor", private_safeDarken(palette2.success.light, 0.6));
      setColor(palette2.Alert, "warningColor", private_safeDarken(palette2.warning.light, 0.6));
      setColor(palette2.Alert, "errorFilledBg", setCssVarColor("palette-error-main"));
      setColor(palette2.Alert, "infoFilledBg", setCssVarColor("palette-info-main"));
      setColor(palette2.Alert, "successFilledBg", setCssVarColor("palette-success-main"));
      setColor(palette2.Alert, "warningFilledBg", setCssVarColor("palette-warning-main"));
      setColor(palette2.Alert, "errorFilledColor", silent(() => palette2.getContrastText(palette2.error.main)));
      setColor(palette2.Alert, "infoFilledColor", silent(() => palette2.getContrastText(palette2.info.main)));
      setColor(palette2.Alert, "successFilledColor", silent(() => palette2.getContrastText(palette2.success.main)));
      setColor(palette2.Alert, "warningFilledColor", silent(() => palette2.getContrastText(palette2.warning.main)));
      setColor(palette2.Alert, "errorStandardBg", private_safeLighten(palette2.error.light, 0.9));
      setColor(palette2.Alert, "infoStandardBg", private_safeLighten(palette2.info.light, 0.9));
      setColor(palette2.Alert, "successStandardBg", private_safeLighten(palette2.success.light, 0.9));
      setColor(palette2.Alert, "warningStandardBg", private_safeLighten(palette2.warning.light, 0.9));
      setColor(palette2.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
      setColor(palette2.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
      setColor(palette2.Alert, "successIconColor", setCssVarColor("palette-success-main"));
      setColor(palette2.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
      setColor(palette2.AppBar, "defaultBg", setCssVarColor("palette-grey-100"));
      setColor(palette2.Avatar, "defaultBg", setCssVarColor("palette-grey-400"));
      setColor(palette2.Button, "inheritContainedBg", setCssVarColor("palette-grey-300"));
      setColor(palette2.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-A100"));
      setColor(palette2.Chip, "defaultBorder", setCssVarColor("palette-grey-400"));
      setColor(palette2.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-700"));
      setColor(palette2.Chip, "defaultIconColor", setCssVarColor("palette-grey-700"));
      setColor(palette2.FilledInput, "bg", "rgba(0, 0, 0, 0.06)");
      setColor(palette2.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)");
      setColor(palette2.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)");
      setColor(palette2.LinearProgress, "primaryBg", private_safeLighten(palette2.primary.main, 0.62));
      setColor(palette2.LinearProgress, "secondaryBg", private_safeLighten(palette2.secondary.main, 0.62));
      setColor(palette2.LinearProgress, "errorBg", private_safeLighten(palette2.error.main, 0.62));
      setColor(palette2.LinearProgress, "infoBg", private_safeLighten(palette2.info.main, 0.62));
      setColor(palette2.LinearProgress, "successBg", private_safeLighten(palette2.success.main, 0.62));
      setColor(palette2.LinearProgress, "warningBg", private_safeLighten(palette2.warning.main, 0.62));
      setColor(palette2.Skeleton, "bg", `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.11)`);
      setColor(palette2.Slider, "primaryTrack", private_safeLighten(palette2.primary.main, 0.62));
      setColor(palette2.Slider, "secondaryTrack", private_safeLighten(palette2.secondary.main, 0.62));
      setColor(palette2.Slider, "errorTrack", private_safeLighten(palette2.error.main, 0.62));
      setColor(palette2.Slider, "infoTrack", private_safeLighten(palette2.info.main, 0.62));
      setColor(palette2.Slider, "successTrack", private_safeLighten(palette2.success.main, 0.62));
      setColor(palette2.Slider, "warningTrack", private_safeLighten(palette2.warning.main, 0.62));
      const snackbarContentBackground = private_safeEmphasize(palette2.background.default, 0.8);
      setColor(palette2.SnackbarContent, "bg", snackbarContentBackground);
      setColor(palette2.SnackbarContent, "color", silent(() => palette2.getContrastText(snackbarContentBackground)));
      setColor(palette2.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette2.background.paper, 0.15));
      setColor(palette2.StepConnector, "border", setCssVarColor("palette-grey-400"));
      setColor(palette2.StepContent, "border", setCssVarColor("palette-grey-400"));
      setColor(palette2.Switch, "defaultColor", setCssVarColor("palette-common-white"));
      setColor(palette2.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-100"));
      setColor(palette2.Switch, "primaryDisabledColor", private_safeLighten(palette2.primary.main, 0.62));
      setColor(palette2.Switch, "secondaryDisabledColor", private_safeLighten(palette2.secondary.main, 0.62));
      setColor(palette2.Switch, "errorDisabledColor", private_safeLighten(palette2.error.main, 0.62));
      setColor(palette2.Switch, "infoDisabledColor", private_safeLighten(palette2.info.main, 0.62));
      setColor(palette2.Switch, "successDisabledColor", private_safeLighten(palette2.success.main, 0.62));
      setColor(palette2.Switch, "warningDisabledColor", private_safeLighten(palette2.warning.main, 0.62));
      setColor(palette2.TableCell, "border", private_safeLighten(private_safeAlpha(palette2.divider, 1), 0.88));
      setColor(palette2.Tooltip, "bg", private_safeAlpha(palette2.grey[700], 0.92));
    }
    if (palette2.mode === "dark") {
      setColor(palette2.Alert, "errorColor", private_safeLighten(palette2.error.light, 0.6));
      setColor(palette2.Alert, "infoColor", private_safeLighten(palette2.info.light, 0.6));
      setColor(palette2.Alert, "successColor", private_safeLighten(palette2.success.light, 0.6));
      setColor(palette2.Alert, "warningColor", private_safeLighten(palette2.warning.light, 0.6));
      setColor(palette2.Alert, "errorFilledBg", setCssVarColor("palette-error-dark"));
      setColor(palette2.Alert, "infoFilledBg", setCssVarColor("palette-info-dark"));
      setColor(palette2.Alert, "successFilledBg", setCssVarColor("palette-success-dark"));
      setColor(palette2.Alert, "warningFilledBg", setCssVarColor("palette-warning-dark"));
      setColor(palette2.Alert, "errorFilledColor", silent(() => palette2.getContrastText(palette2.error.dark)));
      setColor(palette2.Alert, "infoFilledColor", silent(() => palette2.getContrastText(palette2.info.dark)));
      setColor(palette2.Alert, "successFilledColor", silent(() => palette2.getContrastText(palette2.success.dark)));
      setColor(palette2.Alert, "warningFilledColor", silent(() => palette2.getContrastText(palette2.warning.dark)));
      setColor(palette2.Alert, "errorStandardBg", private_safeDarken(palette2.error.light, 0.9));
      setColor(palette2.Alert, "infoStandardBg", private_safeDarken(palette2.info.light, 0.9));
      setColor(palette2.Alert, "successStandardBg", private_safeDarken(palette2.success.light, 0.9));
      setColor(palette2.Alert, "warningStandardBg", private_safeDarken(palette2.warning.light, 0.9));
      setColor(palette2.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
      setColor(palette2.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
      setColor(palette2.Alert, "successIconColor", setCssVarColor("palette-success-main"));
      setColor(palette2.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
      setColor(palette2.AppBar, "defaultBg", setCssVarColor("palette-grey-900"));
      setColor(palette2.AppBar, "darkBg", setCssVarColor("palette-background-paper"));
      setColor(palette2.AppBar, "darkColor", setCssVarColor("palette-text-primary"));
      setColor(palette2.Avatar, "defaultBg", setCssVarColor("palette-grey-600"));
      setColor(palette2.Button, "inheritContainedBg", setCssVarColor("palette-grey-800"));
      setColor(palette2.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-700"));
      setColor(palette2.Chip, "defaultBorder", setCssVarColor("palette-grey-700"));
      setColor(palette2.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-300"));
      setColor(palette2.Chip, "defaultIconColor", setCssVarColor("palette-grey-300"));
      setColor(palette2.FilledInput, "bg", "rgba(255, 255, 255, 0.09)");
      setColor(palette2.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)");
      setColor(palette2.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)");
      setColor(palette2.LinearProgress, "primaryBg", private_safeDarken(palette2.primary.main, 0.5));
      setColor(palette2.LinearProgress, "secondaryBg", private_safeDarken(palette2.secondary.main, 0.5));
      setColor(palette2.LinearProgress, "errorBg", private_safeDarken(palette2.error.main, 0.5));
      setColor(palette2.LinearProgress, "infoBg", private_safeDarken(palette2.info.main, 0.5));
      setColor(palette2.LinearProgress, "successBg", private_safeDarken(palette2.success.main, 0.5));
      setColor(palette2.LinearProgress, "warningBg", private_safeDarken(palette2.warning.main, 0.5));
      setColor(palette2.Skeleton, "bg", `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.13)`);
      setColor(palette2.Slider, "primaryTrack", private_safeDarken(palette2.primary.main, 0.5));
      setColor(palette2.Slider, "secondaryTrack", private_safeDarken(palette2.secondary.main, 0.5));
      setColor(palette2.Slider, "errorTrack", private_safeDarken(palette2.error.main, 0.5));
      setColor(palette2.Slider, "infoTrack", private_safeDarken(palette2.info.main, 0.5));
      setColor(palette2.Slider, "successTrack", private_safeDarken(palette2.success.main, 0.5));
      setColor(palette2.Slider, "warningTrack", private_safeDarken(palette2.warning.main, 0.5));
      const snackbarContentBackground = private_safeEmphasize(palette2.background.default, 0.98);
      setColor(palette2.SnackbarContent, "bg", snackbarContentBackground);
      setColor(palette2.SnackbarContent, "color", silent(() => palette2.getContrastText(snackbarContentBackground)));
      setColor(palette2.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette2.background.paper, 0.15));
      setColor(palette2.StepConnector, "border", setCssVarColor("palette-grey-600"));
      setColor(palette2.StepContent, "border", setCssVarColor("palette-grey-600"));
      setColor(palette2.Switch, "defaultColor", setCssVarColor("palette-grey-300"));
      setColor(palette2.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-600"));
      setColor(palette2.Switch, "primaryDisabledColor", private_safeDarken(palette2.primary.main, 0.55));
      setColor(palette2.Switch, "secondaryDisabledColor", private_safeDarken(palette2.secondary.main, 0.55));
      setColor(palette2.Switch, "errorDisabledColor", private_safeDarken(palette2.error.main, 0.55));
      setColor(palette2.Switch, "infoDisabledColor", private_safeDarken(palette2.info.main, 0.55));
      setColor(palette2.Switch, "successDisabledColor", private_safeDarken(palette2.success.main, 0.55));
      setColor(palette2.Switch, "warningDisabledColor", private_safeDarken(palette2.warning.main, 0.55));
      setColor(palette2.TableCell, "border", private_safeDarken(private_safeAlpha(palette2.divider, 1), 0.68));
      setColor(palette2.Tooltip, "bg", private_safeAlpha(palette2.grey[700], 0.92));
    }
    setColorChannel(palette2.background, "default");
    setColorChannel(palette2.background, "paper");
    setColorChannel(palette2.common, "background");
    setColorChannel(palette2.common, "onBackground");
    setColorChannel(palette2, "divider");
    Object.keys(palette2).forEach((color2) => {
      const colors = palette2[color2];
      if (color2 !== "tonalOffset" && colors && typeof colors === "object") {
        if (colors.main) {
          setColor(palette2[color2], "mainChannel", private_safeColorChannel(toRgb(colors.main)));
        }
        if (colors.light) {
          setColor(palette2[color2], "lightChannel", private_safeColorChannel(toRgb(colors.light)));
        }
        if (colors.dark) {
          setColor(palette2[color2], "darkChannel", private_safeColorChannel(toRgb(colors.dark)));
        }
        if (colors.contrastText) {
          setColor(palette2[color2], "contrastTextChannel", private_safeColorChannel(toRgb(colors.contrastText)));
        }
        if (color2 === "text") {
          setColorChannel(palette2[color2], "primary");
          setColorChannel(palette2[color2], "secondary");
        }
        if (color2 === "action") {
          if (colors.active) {
            setColorChannel(palette2[color2], "active");
          }
          if (colors.selected) {
            setColorChannel(palette2[color2], "selected");
          }
        }
      }
    });
  });
  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);
  const parserConfig = {
    prefix: cssVarPrefix,
    disableCssColorScheme,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2,
    getSelector: createGetSelector_default(theme)
  };
  const {
    vars,
    generateThemeVars,
    generateStyleSheets
  } = prepareCssVars_default(theme, parserConfig);
  theme.vars = vars;
  Object.entries(theme.colorSchemes[theme.defaultColorScheme]).forEach(([key, value]) => {
    theme[key] = value;
  });
  theme.generateThemeVars = generateThemeVars;
  theme.generateStyleSheets = generateStyleSheets;
  theme.generateSpacing = function generateSpacing() {
    return createSpacing(input.spacing, createUnarySpacing(this));
  };
  theme.getColorSchemeSelector = createGetColorSchemeSelector(selector);
  theme.spacing = theme.generateSpacing();
  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar2;
  theme.unstable_sxConfig = __spreadValues(__spreadValues({}, defaultSxConfig_default), input == null ? void 0 : input.unstable_sxConfig);
  theme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  theme.toRuntimeSource = stringifyTheme;
  return theme;
}

// node_modules/@mui/material/esm/styles/createTheme.js
function attachColorScheme2(theme, scheme, colorScheme) {
  if (!theme.colorSchemes) {
    return void 0;
  }
  if (colorScheme) {
    theme.colorSchemes[scheme] = __spreadProps(__spreadValues({}, colorScheme !== true && colorScheme), {
      palette: createPalette(__spreadProps(__spreadValues({}, colorScheme === true ? {} : colorScheme.palette), {
        mode: scheme
      }))
      // cast type to skip module augmentation test
    });
  }
}
function createTheme2(options = {}, ...args) {
  const _a = options, {
    palette: palette2,
    cssVariables = false,
    colorSchemes: initialColorSchemes = !palette2 ? {
      light: true
    } : void 0,
    defaultColorScheme: initialDefaultColorScheme = palette2 == null ? void 0 : palette2.mode
  } = _a, rest = __objRest(_a, [
    "palette",
    "cssVariables",
    "colorSchemes",
    "defaultColorScheme"
  ]);
  const defaultColorSchemeInput = initialDefaultColorScheme || "light";
  const defaultScheme = initialColorSchemes == null ? void 0 : initialColorSchemes[defaultColorSchemeInput];
  const colorSchemesInput = __spreadValues(__spreadValues({}, initialColorSchemes), palette2 ? {
    [defaultColorSchemeInput]: __spreadProps(__spreadValues({}, typeof defaultScheme !== "boolean" && defaultScheme), {
      palette: palette2
    })
  } : void 0);
  if (cssVariables === false) {
    if (!("colorSchemes" in options)) {
      return createThemeNoVars_default(options, ...args);
    }
    let paletteOptions = palette2;
    if (!("palette" in options)) {
      if (colorSchemesInput[defaultColorSchemeInput]) {
        if (colorSchemesInput[defaultColorSchemeInput] !== true) {
          paletteOptions = colorSchemesInput[defaultColorSchemeInput].palette;
        } else if (defaultColorSchemeInput === "dark") {
          paletteOptions = {
            mode: "dark"
          };
        }
      }
    }
    const theme = createThemeNoVars_default(__spreadProps(__spreadValues({}, options), {
      palette: paletteOptions
    }), ...args);
    theme.defaultColorScheme = defaultColorSchemeInput;
    theme.colorSchemes = colorSchemesInput;
    if (theme.palette.mode === "light") {
      theme.colorSchemes.light = __spreadProps(__spreadValues({}, colorSchemesInput.light !== true && colorSchemesInput.light), {
        palette: theme.palette
      });
      attachColorScheme2(theme, "dark", colorSchemesInput.dark);
    }
    if (theme.palette.mode === "dark") {
      theme.colorSchemes.dark = __spreadProps(__spreadValues({}, colorSchemesInput.dark !== true && colorSchemesInput.dark), {
        palette: theme.palette
      });
      attachColorScheme2(theme, "light", colorSchemesInput.light);
    }
    return theme;
  }
  if (!palette2 && !("light" in colorSchemesInput) && defaultColorSchemeInput === "light") {
    colorSchemesInput.light = true;
  }
  return createThemeWithVars(__spreadValues(__spreadProps(__spreadValues({}, rest), {
    colorSchemes: colorSchemesInput,
    defaultColorScheme: defaultColorSchemeInput
  }), typeof cssVariables !== "boolean" && cssVariables), ...args);
}

// node_modules/@mui/material/esm/styles/useTheme.js
import * as React19 from "react";

// node_modules/@mui/material/esm/styles/defaultTheme.js
var defaultTheme2 = createTheme2();
var defaultTheme_default = defaultTheme2;

// node_modules/@mui/material/esm/styles/useTheme.js
function useTheme4() {
  const theme = useTheme_default(defaultTheme_default);
  if (false) {
    React19.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

// node_modules/@mui/material/esm/styles/slotShouldForwardProp.js
function slotShouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
var slotShouldForwardProp_default = slotShouldForwardProp;

// node_modules/@mui/material/esm/styles/rootShouldForwardProp.js
var rootShouldForwardProp = (prop) => slotShouldForwardProp_default(prop) && prop !== "classes";
var rootShouldForwardProp_default = rootShouldForwardProp;

// node_modules/@mui/material/esm/styles/styled.js
var styled3 = createStyled3({
  themeId: identifier_default,
  defaultTheme: defaultTheme_default,
  rootShouldForwardProp: rootShouldForwardProp_default
});
var styled_default2 = styled3;

// node_modules/@mui/material/esm/Box/boxClasses.js
var boxClasses = generateUtilityClasses("MuiBox", ["root"]);
var boxClasses_default = boxClasses;

// node_modules/@mui/material/esm/Box/Box.js
var defaultTheme3 = createTheme2();
var Box = createBox({
  themeId: identifier_default,
  defaultTheme: defaultTheme3,
  defaultClassName: boxClasses_default.root,
  generateClassName: ClassNameGenerator_default.generate
});
false ? Box.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Box_default = Box;

// node_modules/@mui/material/esm/Modal/ModalManager.js
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, hide2) {
  if (hide2) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
  const forbiddenTagNames = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"];
  const isForbiddenTagName = forbiddenTagNames.includes(element.tagName);
  const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
  return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, hide2) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, (element) => {
    const isNotExcludedElement = !blacklist.includes(element);
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, hide2);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerWindow(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements2 = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements2, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    let scrollContainer;
    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    }
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
var ModalManager = class {
  constructor() {
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal, ariaHiddenState = true) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, ariaHiddenState);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
};

// node_modules/@mui/material/esm/Modal/Modal.js
import * as React30 from "react";

// node_modules/@mui/material/esm/Unstable_TrapFocus/FocusTrap.js
import * as React20 from "react";
import { jsx as _jsx5, jsxs as _jsxs } from "react/jsx-runtime";
var candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function getTabIndex(node2) {
  const tabindexAttr = parseInt(node2.getAttribute("tabindex") || "", 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node2.contentEditable === "true" || (node2.nodeName === "AUDIO" || node2.nodeName === "VIDEO" || node2.nodeName === "DETAILS") && node2.getAttribute("tabindex") === null) {
    return 0;
  }
  return node2.tabIndex;
}
function isNonTabbableRadio(node2) {
  if (node2.tagName !== "INPUT" || node2.type !== "radio") {
    return false;
  }
  if (!node2.name) {
    return false;
  }
  const getRadio = (selector) => node2.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node2.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node2.name}"]`);
  }
  return roving !== node2;
}
function isNodeMatchingSelectorFocusable(node2) {
  if (node2.disabled || node2.tagName === "INPUT" && node2.type === "hidden" || isNonTabbableRadio(node2)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node2, i) => {
    const nodeTabIndex = getTabIndex(node2);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node2)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node2);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node: node2
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function FocusTrap(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React20.useRef(false);
  const sentinelStart = React20.useRef(null);
  const sentinelEnd = React20.useRef(null);
  const nodeToRestore = React20.useRef(null);
  const reactFocusEventTarget = React20.useRef(null);
  const activated = React20.useRef(false);
  const rootRef = React20.useRef(null);
  const handleRef = useForkRef(getReactElementRef(children), rootRef);
  const lastKeydown = React20.useRef(null);
  React20.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React20.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        if (false) {
          console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join("\n"));
        }
        rootRef.current.setAttribute("tabIndex", "-1");
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  React20.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        if (sentinelEnd.current) {
          sentinelEnd.current.focus();
        }
      }
    };
    const contain = () => {
      var _a, _b;
      const rootElement = rootRef.current;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (rootElement.contains(doc.activeElement)) {
        return;
      }
      if (disableEnforceFocus && doc.activeElement !== sentinelStart.current && doc.activeElement !== sentinelEnd.current) {
        return;
      }
      if (doc.activeElement !== reactFocusEventTarget.current) {
        reactFocusEventTarget.current = null;
      } else if (reactFocusEventTarget.current !== null) {
        return;
      }
      if (!activated.current) {
        return;
      }
      let tabbable = [];
      if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
        tabbable = getTabbable(rootRef.current);
      }
      if (tabbable.length > 0) {
        const isShiftTab = Boolean(((_a = lastKeydown.current) == null ? void 0 : _a.shiftKey) && ((_b = lastKeydown.current) == null ? void 0 : _b.key) === "Tab");
        const focusNext = tabbable[0];
        const focusPrevious = tabbable[tabbable.length - 1];
        if (typeof focusNext !== "string" && typeof focusPrevious !== "string") {
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        }
      } else {
        rootElement.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement && doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return /* @__PURE__ */ _jsxs(React20.Fragment, {
    children: [/* @__PURE__ */ _jsx5("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ React20.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /* @__PURE__ */ _jsx5("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-testid": "sentinelEnd"
    })]
  });
}
false ? FocusTrap.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: import_prop_types.default.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: import_prop_types.default.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: import_prop_types.default.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: import_prop_types.default.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: import_prop_types.default.func,
  /**
   * If `true`, focus is locked.
   */
  open: import_prop_types.default.bool.isRequired
} : void 0;
if (false) {
  FocusTrap["propTypes"] = exactProp(FocusTrap.propTypes);
}
var FocusTrap_default = FocusTrap;

// node_modules/@mui/material/esm/Portal/Portal.js
import * as React21 from "react";
import * as ReactDOM from "react-dom";
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
var Portal = /* @__PURE__ */ React21.forwardRef(function Portal2(props, forwardedRef) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = React21.useState(null);
  const handleRef = useForkRef(/* @__PURE__ */ React21.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
  useEnhancedEffect_default(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect_default(() => {
    if (mountNode && !disablePortal) {
      setRef(forwardedRef, mountNode);
      return () => {
        setRef(forwardedRef, null);
      };
    }
    return void 0;
  }, [forwardedRef, mountNode, disablePortal]);
  if (disablePortal) {
    if (/* @__PURE__ */ React21.isValidElement(children)) {
      const newProps = {
        ref: handleRef
      };
      return /* @__PURE__ */ React21.cloneElement(children, newProps);
    }
    return children;
  }
  return mountNode ? /* @__PURE__ */ ReactDOM.createPortal(children, mountNode) : mountNode;
});
false ? Portal.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: import_prop_types.default.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types.default.bool
} : void 0;
if (false) {
  Portal["propTypes"] = exactProp(Portal.propTypes);
}
var Portal_default = Portal;

// node_modules/@mui/material/esm/zero-styled/index.js
import * as React22 from "react";
import { jsx as _jsx6 } from "react/jsx-runtime";
function internal_createExtendSxProp() {
  return extendSxProp;
}

// node_modules/@mui/material/esm/utils/memoTheme.js
var memoTheme = unstable_memoTheme;
var memoTheme_default = memoTheme;

// node_modules/@mui/material/esm/DefaultPropsProvider/DefaultPropsProvider.js
import * as React23 from "react";
import { jsx as _jsx7 } from "react/jsx-runtime";
false ? DefaultPropsProvider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * @ignore
   */
  value: import_prop_types.default.object.isRequired
} : void 0;
function useDefaultProps2(params) {
  return useDefaultProps(params);
}

// node_modules/@mui/material/esm/Backdrop/Backdrop.js
import * as React28 from "react";

// node_modules/@mui/material/esm/utils/useSlot.js
function useSlot(name, parameters) {
  const _a = parameters, {
    className,
    elementType: initialElementType,
    ownerState,
    externalForwardedProps,
    internalForwardedProps,
    shouldForwardComponentProp = false
  } = _a, useSlotPropsParams = __objRest(_a, [
    "className",
    "elementType",
    "ownerState",
    "externalForwardedProps",
    "internalForwardedProps",
    "shouldForwardComponentProp"
  ]);
  const _b = externalForwardedProps, {
    component: rootComponent,
    slots = {
      [name]: void 0
    },
    slotProps = {
      [name]: void 0
    }
  } = _b, other = __objRest(_b, [
    "component",
    "slots",
    "slotProps"
  ]);
  const elementType = slots[name] || initialElementType;
  const resolvedComponentsProps = resolveComponentProps_default(slotProps[name], ownerState);
  const _c = mergeSlotProps_default(__spreadProps(__spreadValues({
    className
  }, useSlotPropsParams), {
    externalForwardedProps: name === "root" ? other : void 0,
    externalSlotProps: resolvedComponentsProps
  })), {
    props: _d
  } = _c, _e = _d, {
    component: slotComponent
  } = _e, mergedProps = __objRest(_e, [
    "component"
  ]), {
    internalRef
  } = _c;
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, parameters.ref);
  const LeafComponent = name === "root" ? slotComponent || rootComponent : slotComponent;
  const props = appendOwnerState_default(elementType, __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, name === "root" && !rootComponent && !slots[name] && internalForwardedProps), name !== "root" && !slots[name] && internalForwardedProps), mergedProps), LeafComponent && !shouldForwardComponentProp && {
    as: LeafComponent
  }), LeafComponent && shouldForwardComponentProp && {
    component: LeafComponent
  }), {
    ref
  }), ownerState);
  return [elementType, props];
}

// node_modules/@mui/material/esm/Fade/Fade.js
import * as React27 from "react";

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r2, e) {
  if (null == r2) return {};
  var t = {};
  for (var n in r2) if ({}.hasOwnProperty.call(r2, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r2[n];
  }
  return t;
}

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}

// node_modules/react-transition-group/esm/Transition.js
import React25 from "react";
import ReactDOM2 from "react-dom";

// node_modules/react-transition-group/esm/config.js
var config_default = {
  disabled: false
};

// node_modules/react-transition-group/esm/TransitionGroupContext.js
import React24 from "react";
var TransitionGroupContext_default = React24.createContext(null);

// node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow2(node2) {
  return node2.scrollTop;
};

// node_modules/react-transition-group/esm/Transition.js
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout2 = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout2;
    if (timeout2 != null && typeof timeout2 !== "number") {
      exit = timeout2.exit;
      enter = timeout2.enter;
      appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node2 = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM2.findDOMNode(this);
          if (node2) forceReflow(node2);
        }
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM2.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config_default.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : ReactDOM2.findDOMNode(this);
    if (!exit || config_default.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
    this.setNextCallback(handler);
    var node2 = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM2.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
    if (!node2 || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node2, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout2 != null) {
      setTimeout(this.nextCallback, timeout2);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children, _in = _this$props.in, _mountOnEnter = _this$props.mountOnEnter, _unmountOnExit = _this$props.unmountOnExit, _appear = _this$props.appear, _enter = _this$props.enter, _exit = _this$props.exit, _timeout = _this$props.timeout, _addEndListener = _this$props.addEndListener, _onEnter = _this$props.onEnter, _onEntering = _this$props.onEntering, _onEntered = _this$props.onEntered, _onExit = _this$props.onExit, _onExiting = _this$props.onExiting, _onExited = _this$props.onExited, _nodeRef = _this$props.nodeRef, childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ React25.createElement(TransitionGroupContext_default.Provider, {
        value: null
      }, typeof children === "function" ? children(status, childProps) : React25.cloneElement(React25.Children.only(children), childProps))
    );
  };
  return Transition2;
}(React25.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = false ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: import_prop_types.default.shape({
    current: typeof Element === "undefined" ? import_prop_types.default.any : function(propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return import_prop_types.default.instanceOf(value && "ownerDocument" in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: import_prop_types.default.oneOfType([import_prop_types.default.func.isRequired, import_prop_types.default.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: import_prop_types.default.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: import_prop_types.default.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: import_prop_types.default.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: import_prop_types.default.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: import_prop_types.default.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: import_prop_types.default.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return pt.apply(void 0, [props].concat(args));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: import_prop_types.default.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: import_prop_types.default.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: import_prop_types.default.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: import_prop_types.default.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: import_prop_types.default.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: import_prop_types.default.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: import_prop_types.default.func
} : {};
function noop() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition_default = Transition;

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

// node_modules/react-transition-group/esm/TransitionGroup.js
import React26 from "react";

// node_modules/react-transition-group/esm/utils/ChildMapping.js
import { Children, cloneElement as cloneElement3, isValidElement as isValidElement3 } from "react";
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && isValidElement3(child) ? mapFn(child) : child;
  };
  var result = /* @__PURE__ */ Object.create(null);
  if (children) Children.map(children, function(c) {
    return c;
  }).forEach(function(child) {
    result[child.key] = mapper(child);
  });
  return result;
}
function mergeChildMappings(prev2, next2) {
  prev2 = prev2 || {};
  next2 = next2 || {};
  function getValueForKey(key) {
    return key in next2 ? next2[key] : prev2[key];
  }
  var nextKeysPending = /* @__PURE__ */ Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev2) {
    if (prevKey in next2) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i;
  var childMapping = {};
  for (var nextKey in next2) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return cloneElement3(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!isValidElement3(child)) return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = isValidElement3(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = cloneElement3(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = cloneElement3(child, {
        in: false
      });
    } else if (hasNext && hasPrev && isValidElement3(prevChild)) {
      children[key] = cloneElement3(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}

// node_modules/react-transition-group/esm/TransitionGroup.js
var values2 = Object.values || function(obj) {
  return Object.keys(obj).map(function(k) {
    return obj[k];
  });
};
var defaultProps = {
  component: "div",
  childFactory: function childFactory(child) {
    return child;
  }
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };
  _proto.handleExited = function handleExited(child, node2) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping) return;
    if (child.props.onExited) {
      child.props.onExited(node2);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, Component = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values2(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component === null) {
      return /* @__PURE__ */ React26.createElement(TransitionGroupContext_default.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ React26.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, /* @__PURE__ */ React26.createElement(Component, props, children));
  };
  return TransitionGroup2;
}(React26.Component);
TransitionGroup.propTypes = false ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: import_prop_types.default.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: import_prop_types.default.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: import_prop_types.default.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: import_prop_types.default.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: import_prop_types.default.bool,
  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: import_prop_types.default.func
} : {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;

// node_modules/@mui/material/esm/transitions/utils.js
var reflow = (node2) => node2.scrollTop;
function getTransitionProps(props, options) {
  var _a, _b;
  const {
    timeout: timeout2,
    easing: easing2,
    style: style3 = {}
  } = props;
  return {
    duration: (_a = style3.transitionDuration) != null ? _a : typeof timeout2 === "number" ? timeout2 : timeout2[options.mode] || 0,
    easing: (_b = style3.transitionTimingFunction) != null ? _b : typeof easing2 === "object" ? easing2[options.mode] : easing2,
    delay: style3.transitionDelay
  };
}

// node_modules/@mui/material/esm/utils/useForkRef.js
var useForkRef_default = useForkRef;

// node_modules/@mui/material/esm/Fade/Fade.js
import { jsx as _jsx8 } from "react/jsx-runtime";
var styles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};
var Fade = /* @__PURE__ */ React27.forwardRef(function Fade2(props, ref) {
  const theme = useTheme4();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const _a = props, {
    addEndListener,
    appear = true,
    children,
    easing: easing2,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style: style3,
    timeout: timeout2 = defaultTimeout,
    TransitionComponent: TransitionComponent = Transition_default
  } = _a, other = __objRest(_a, [
    "addEndListener",
    "appear",
    "children",
    "easing",
    "in",
    "onEnter",
    "onEntered",
    "onEntering",
    "onExit",
    "onExited",
    "onExiting",
    "style",
    "timeout",
    // eslint-disable-next-line react/prop-types
    "TransitionComponent"
  ]);
  const enableStrictModeCompat = true;
  const nodeRef = React27.useRef(null);
  const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node2 = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node2);
      } else {
        callback(node2, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node2, isAppearing) => {
    reflow(node2);
    const transitionProps = getTransitionProps({
      style: style3,
      timeout: timeout2,
      easing: easing2
    }, {
      mode: "enter"
    });
    node2.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node2.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onEnter) {
      onEnter(node2, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node2) => {
    const transitionProps = getTransitionProps({
      style: style3,
      timeout: timeout2,
      easing: easing2
    }, {
      mode: "exit"
    });
    node2.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node2.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onExit) {
      onExit(node2);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next2) => {
    if (addEndListener) {
      addEndListener(nodeRef.current, next2);
    }
  };
  return /* @__PURE__ */ _jsx8(TransitionComponent, __spreadProps(__spreadValues({
    appear,
    in: inProp,
    nodeRef: enableStrictModeCompat ? nodeRef : void 0,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout: timeout2
  }, other), {
    children: (state, _b) => {
      var _c = _b, {
        ownerState
      } = _c, restChildProps = __objRest(_c, [
        "ownerState"
      ]);
      return /* @__PURE__ */ React27.cloneElement(children, __spreadValues({
        style: __spreadValues(__spreadValues(__spreadValues({
          opacity: 0,
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles[state]), style3), children.props.style),
        ref: handleRef
      }, restChildProps));
    }
  }));
});
false ? Fade.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: import_prop_types.default.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: import_prop_types.default.bool,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: import_prop_types.default.oneOfType([import_prop_types.default.shape({
    enter: import_prop_types.default.string,
    exit: import_prop_types.default.string
  }), import_prop_types.default.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: import_prop_types.default.bool,
  /**
   * @ignore
   */
  onEnter: import_prop_types.default.func,
  /**
   * @ignore
   */
  onEntered: import_prop_types.default.func,
  /**
   * @ignore
   */
  onEntering: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExit: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExited: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExiting: import_prop_types.default.func,
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
    appear: import_prop_types.default.number,
    enter: import_prop_types.default.number,
    exit: import_prop_types.default.number
  })])
} : void 0;
var Fade_default = Fade;

// node_modules/@mui/material/esm/Backdrop/backdropClasses.js
function getBackdropUtilityClass(slot) {
  return generateUtilityClass("MuiBackdrop", slot);
}
var backdropClasses = generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);

// node_modules/@mui/material/esm/Backdrop/Backdrop.js
import { jsx as _jsx9 } from "react/jsx-runtime";
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ["root", invisible && "invisible"]
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};
var BackdropRoot = styled_default2("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, ownerState.invisible && styles3.invisible];
  }
})({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent",
  variants: [{
    props: {
      invisible: true
    },
    style: {
      backgroundColor: "transparent"
    }
  }]
});
var Backdrop = /* @__PURE__ */ React28.forwardRef(function Backdrop2(inProps, ref) {
  const props = useDefaultProps2({
    props: inProps,
    name: "MuiBackdrop"
  });
  const _a = props, {
    children,
    className,
    component = "div",
    invisible = false,
    open,
    components = {},
    componentsProps = {},
    slotProps = {},
    slots = {},
    TransitionComponent: TransitionComponentProp,
    transitionDuration
  } = _a, other = __objRest(_a, [
    "children",
    "className",
    "component",
    "invisible",
    "open",
    "components",
    "componentsProps",
    "slotProps",
    "slots",
    "TransitionComponent",
    "transitionDuration"
  ]);
  const ownerState = __spreadProps(__spreadValues({}, props), {
    component,
    invisible
  });
  const classes = useUtilityClasses2(ownerState);
  const backwardCompatibleSlots = __spreadValues({
    transition: TransitionComponentProp,
    root: components.Root
  }, slots);
  const backwardCompatibleSlotProps = __spreadValues(__spreadValues({}, componentsProps), slotProps);
  const externalForwardedProps = {
    slots: backwardCompatibleSlots,
    slotProps: backwardCompatibleSlotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: BackdropRoot,
    externalForwardedProps,
    className: clsx_default(classes.root, className),
    ownerState
  });
  const [TransitionSlot, transitionProps] = useSlot("transition", {
    elementType: Fade_default,
    externalForwardedProps,
    ownerState
  });
  return /* @__PURE__ */ _jsx9(TransitionSlot, __spreadProps(__spreadValues(__spreadValues({
    in: open,
    timeout: transitionDuration
  }, other), transitionProps), {
    children: /* @__PURE__ */ _jsx9(RootSlot, __spreadProps(__spreadValues({
      "aria-hidden": true
    }, rootProps), {
      classes,
      ref,
      children
    }))
  }));
});
false ? Backdrop.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The components used for each slot inside.
   *
   * @deprecated Use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: import_prop_types.default.shape({
    Root: import_prop_types.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: import_prop_types.default.shape({
    root: import_prop_types.default.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: import_prop_types.default.bool,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types.default.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    transition: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    root: import_prop_types.default.elementType,
    transition: import_prop_types.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   * @deprecated Use `slots.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionComponent: import_prop_types.default.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
    appear: import_prop_types.default.number,
    enter: import_prop_types.default.number,
    exit: import_prop_types.default.number
  })])
} : void 0;
var Backdrop_default = Backdrop;

// node_modules/@mui/material/esm/Modal/useModal.js
import * as React29 from "react";
function getContainer2(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
  return children ? children.props.hasOwnProperty("in") : false;
}
var noop2 = () => {
};
var manager = new ModalManager();
function useModal(parameters) {
  const {
    container,
    disableEscapeKeyDown = false,
    disableScrollLock = false,
    closeAfterTransition = false,
    onTransitionEnter,
    onTransitionExited,
    children,
    onClose,
    open,
    rootRef
  } = parameters;
  const modal = React29.useRef({});
  const mountNodeRef = React29.useRef(null);
  const modalRef = React29.useRef(null);
  const handleRef = useForkRef(modalRef, rootRef);
  const [exited, setExited] = React29.useState(!open);
  const hasTransition = getHasTransition(children);
  let ariaHiddenProp = true;
  if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) {
    ariaHiddenProp = false;
  }
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mount = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };
  const handleOpen = useEventCallback_default(() => {
    const resolvedContainer = getContainer2(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = () => manager.isTopModal(getModal());
  const handlePortalRef = useEventCallback_default((node2) => {
    mountNodeRef.current = node2;
    if (!node2) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });
  const handleClose = React29.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp]);
  React29.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  React29.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onKeyDown) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.key !== "Escape" || event.which === 229 || // Wait until IME is settled.
    !isTopModal()) {
      return;
    }
    if (!disableEscapeKeyDown) {
      event.stopPropagation();
      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };
  const createHandleBackdropClick = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onClick) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers_default(parameters);
    delete propsEventHandlers.onTransitionEnter;
    delete propsEventHandlers.onTransitionExited;
    const externalEventHandlers = __spreadValues(__spreadValues({}, propsEventHandlers), otherHandlers);
    return __spreadProps(__spreadValues({
      /*
       * Marking an element with the role presentation indicates to assistive technology
       * that this element should be ignored; it exists to support the web application and
       * is not meant for humans to interact with directly.
       * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
       */
      role: "presentation"
    }, externalEventHandlers), {
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef
    });
  };
  const getBackdropProps = (otherHandlers = {}) => {
    const externalEventHandlers = otherHandlers;
    return __spreadProps(__spreadValues({
      "aria-hidden": true
    }, externalEventHandlers), {
      onClick: createHandleBackdropClick(externalEventHandlers),
      open
    });
  };
  const getTransitionProps2 = () => {
    var _a, _b;
    const handleEnter = () => {
      setExited(false);
      if (onTransitionEnter) {
        onTransitionEnter();
      }
    };
    const handleExited = () => {
      setExited(true);
      if (onTransitionExited) {
        onTransitionExited();
      }
      if (closeAfterTransition) {
        handleClose();
      }
    };
    return {
      onEnter: createChainedFunction(handleEnter, (_a = children == null ? void 0 : children.props.onEnter) != null ? _a : noop2),
      onExited: createChainedFunction(handleExited, (_b = children == null ? void 0 : children.props.onExited) != null ? _b : noop2)
    };
  };
  return {
    getRootProps,
    getBackdropProps,
    getTransitionProps: getTransitionProps2,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    isTopModal,
    exited,
    hasTransition
  };
}
var useModal_default = useModal;

// node_modules/@mui/material/esm/Modal/modalClasses.js
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
var modalClasses = generateUtilityClasses("MuiModal", ["root", "hidden", "backdrop"]);

// node_modules/@mui/material/esm/Modal/Modal.js
import { jsx as _jsx10, jsxs as _jsxs2 } from "react/jsx-runtime";
var useUtilityClasses3 = (ownerState) => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ["root", !open && exited && "hidden"],
    backdrop: ["backdrop"]
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};
var ModalRoot = styled_default2("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, !ownerState.open && ownerState.exited && styles3.hidden];
  }
})(memoTheme_default(({
  theme
}) => ({
  position: "fixed",
  zIndex: (theme.vars || theme).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.open && ownerState.exited,
    style: {
      visibility: "hidden"
    }
  }]
})));
var ModalBackdrop = styled_default2(Backdrop_default, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (props, styles3) => {
    return styles3.backdrop;
  }
})({
  zIndex: -1
});
var Modal = /* @__PURE__ */ React30.forwardRef(function Modal2(inProps, ref) {
  const props = useDefaultProps2({
    name: "MuiModal",
    props: inProps
  });
  const _a = props, {
    BackdropComponent = ModalBackdrop,
    BackdropProps,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    children,
    container,
    component,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onClose,
    onTransitionEnter,
    onTransitionExited,
    open,
    slotProps = {},
    slots = {},
    theme: theme
  } = _a, other = __objRest(_a, [
    "BackdropComponent",
    "BackdropProps",
    "classes",
    "className",
    "closeAfterTransition",
    "children",
    "container",
    "component",
    "components",
    "componentsProps",
    "disableAutoFocus",
    "disableEnforceFocus",
    "disableEscapeKeyDown",
    "disablePortal",
    "disableRestoreFocus",
    "disableScrollLock",
    "hideBackdrop",
    "keepMounted",
    "onClose",
    "onTransitionEnter",
    "onTransitionExited",
    "open",
    "slotProps",
    "slots",
    // eslint-disable-next-line react/prop-types
    "theme"
  ]);
  const propsWithDefaults = __spreadProps(__spreadValues({}, props), {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  });
  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps: getTransitionProps2,
    portalRef,
    isTopModal,
    exited,
    hasTransition
  } = useModal_default(__spreadProps(__spreadValues({}, propsWithDefaults), {
    rootRef: ref
  }));
  const ownerState = __spreadProps(__spreadValues({}, propsWithDefaults), {
    exited
  });
  const classes = useUtilityClasses3(ownerState);
  const childProps = {};
  if (children.props.tabIndex === void 0) {
    childProps.tabIndex = "-1";
  }
  if (hasTransition) {
    const {
      onEnter,
      onExited
    } = getTransitionProps2();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }
  const externalForwardedProps = {
    slots: __spreadValues({
      root: components.Root,
      backdrop: components.Backdrop
    }, slots),
    slotProps: __spreadValues(__spreadValues({}, componentsProps), slotProps)
  };
  const [RootSlot, rootProps] = useSlot("root", {
    ref,
    elementType: ModalRoot,
    externalForwardedProps: __spreadProps(__spreadValues(__spreadValues({}, externalForwardedProps), other), {
      component
    }),
    getSlotProps: getRootProps,
    ownerState,
    className: clsx_default(className, classes == null ? void 0 : classes.root, !ownerState.open && ownerState.exited && (classes == null ? void 0 : classes.hidden))
  });
  const [BackdropSlot, backdropProps] = useSlot("backdrop", {
    ref: BackdropProps == null ? void 0 : BackdropProps.ref,
    elementType: BackdropComponent,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    additionalProps: BackdropProps,
    getSlotProps: (otherHandlers) => {
      return getBackdropProps(__spreadProps(__spreadValues({}, otherHandlers), {
        onClick: (event) => {
          if (otherHandlers == null ? void 0 : otherHandlers.onClick) {
            otherHandlers.onClick(event);
          }
        }
      }));
    },
    className: clsx_default(BackdropProps == null ? void 0 : BackdropProps.className, classes == null ? void 0 : classes.backdrop),
    ownerState
  });
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  return /* @__PURE__ */ _jsx10(Portal_default, {
    ref: portalRef,
    container,
    disablePortal,
    children: /* @__PURE__ */ _jsxs2(RootSlot, __spreadProps(__spreadValues({}, rootProps), {
      children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ _jsx10(BackdropSlot, __spreadValues({}, backdropProps)) : null, /* @__PURE__ */ _jsx10(FocusTrap_default, {
        disableEnforceFocus,
        disableAutoFocus,
        disableRestoreFocus,
        isEnabled: isTopModal,
        open,
        children: /* @__PURE__ */ React30.cloneElement(children, childProps)
      })]
    }))
  });
});
false ? Modal.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: import_prop_types.default.elementType,
  /**
   * Props applied to the [`Backdrop`](https://mui.com/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: import_prop_types.default.object,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: import_prop_types.default.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The components used for each slot inside.
   *
   * @deprecated Use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: import_prop_types.default.shape({
    Backdrop: import_prop_types.default.elementType,
    Root: import_prop_types.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: import_prop_types.default.shape({
    backdrop: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: import_prop_types.default.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: import_prop_types.default.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: import_prop_types.default.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types.default.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: import_prop_types.default.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: import_prop_types.default.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: import_prop_types.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: import_prop_types.default.bool,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: import_prop_types.default.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: import_prop_types.default.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: import_prop_types.default.func,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types.default.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    backdrop: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    backdrop: import_prop_types.default.elementType,
    root: import_prop_types.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Modal_default = Modal;

// node_modules/@mui/material/esm/Fab/Fab.js
import * as React35 from "react";

// node_modules/@mui/material/esm/ButtonBase/ButtonBase.js
import * as React34 from "react";

// node_modules/@mui/material/esm/utils/useEventCallback.js
var useEventCallback_default2 = useEventCallback_default;

// node_modules/@mui/material/esm/useLazyRipple/useLazyRipple.js
import * as React31 from "react";
var LazyRipple = class _LazyRipple {
  constructor() {
    __publicField(this, "mountEffect", () => {
      if (this.shouldMount && !this.didMount) {
        if (this.ref.current !== null) {
          this.didMount = true;
          this.mounted.resolve();
        }
      }
    });
    this.ref = {
      current: null
    };
    this.mounted = null;
    this.didMount = false;
    this.shouldMount = false;
    this.setShouldMount = null;
  }
  /** React ref to the ripple instance */
  /** If the ripple component should be mounted */
  /** Promise that resolves when the ripple component is mounted */
  /** If the ripple component has been mounted */
  /** React state hook setter */
  static create() {
    return new _LazyRipple();
  }
  static use() {
    const ripple = useLazyRef(_LazyRipple.create).current;
    const [shouldMount, setShouldMount] = React31.useState(false);
    ripple.shouldMount = shouldMount;
    ripple.setShouldMount = setShouldMount;
    React31.useEffect(ripple.mountEffect, [shouldMount]);
    return ripple;
  }
  mount() {
    if (!this.mounted) {
      this.mounted = createControlledPromise();
      this.shouldMount = true;
      this.setShouldMount(this.shouldMount);
    }
    return this.mounted;
  }
  /* Ripple API */
  start(...args) {
    this.mount().then(() => {
      var _a;
      return (_a = this.ref.current) == null ? void 0 : _a.start(...args);
    });
  }
  stop(...args) {
    this.mount().then(() => {
      var _a;
      return (_a = this.ref.current) == null ? void 0 : _a.stop(...args);
    });
  }
  pulsate(...args) {
    this.mount().then(() => {
      var _a;
      return (_a = this.ref.current) == null ? void 0 : _a.pulsate(...args);
    });
  }
};
function useLazyRipple() {
  return LazyRipple.use();
}
function createControlledPromise() {
  let resolve;
  let reject;
  const p = new Promise((resolveFn, rejectFn) => {
    resolve = resolveFn;
    reject = rejectFn;
  });
  p.resolve = resolve;
  p.reject = reject;
  return p;
}

// node_modules/@mui/material/esm/ButtonBase/TouchRipple.js
import * as React33 from "react";

// node_modules/@mui/material/esm/ButtonBase/Ripple.js
import * as React32 from "react";
import { jsx as _jsx11 } from "react/jsx-runtime";
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout: timeout2
  } = props;
  const [leaving, setLeaving] = React32.useState(false);
  const rippleClassName = clsx_default(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx_default(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React32.useEffect(() => {
    if (!inProp && onExited != null) {
      const timeoutId = setTimeout(onExited, timeout2);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return void 0;
  }, [onExited, inProp, timeout2]);
  return /* @__PURE__ */ _jsx11("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /* @__PURE__ */ _jsx11("span", {
      className: childClassName
    })
  });
}
false ? Ripple.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object.isRequired,
  className: import_prop_types.default.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: import_prop_types.default.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: import_prop_types.default.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: import_prop_types.default.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: import_prop_types.default.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: import_prop_types.default.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: import_prop_types.default.number,
  /**
   * exit delay
   */
  timeout: import_prop_types.default.number.isRequired
} : void 0;
var Ripple_default = Ripple;

// node_modules/@mui/material/esm/ButtonBase/touchRippleClasses.js
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
var touchRippleClasses_default = touchRippleClasses;

// node_modules/@mui/material/esm/ButtonBase/TouchRipple.js
import { jsx as _jsx12 } from "react/jsx-runtime";
var DURATION = 550;
var DELAY_RIPPLE = 80;
var enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
var exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
var pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
var TouchRippleRoot = styled_default2("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
});
var TouchRippleRipple = styled_default2(Ripple_default, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses_default.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({
  theme
}) => theme.transitions.easing.easeInOut};
  }

  &.${touchRippleClasses_default.ripplePulsate} {
    animation-duration: ${({
  theme
}) => theme.transitions.duration.shorter}ms;
  }

  & .${touchRippleClasses_default.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses_default.childLeaving} {
    opacity: 0;
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({
  theme
}) => theme.transitions.easing.easeInOut};
  }

  & .${touchRippleClasses_default.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme
}) => theme.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;
var TouchRipple = /* @__PURE__ */ React33.forwardRef(function TouchRipple2(inProps, ref) {
  const props = useDefaultProps2({
    props: inProps,
    name: "MuiTouchRipple"
  });
  const _a = props, {
    center: centerProp = false,
    classes = {},
    className
  } = _a, other = __objRest(_a, [
    "center",
    "classes",
    "className"
  ]);
  const [ripples, setRipples] = React33.useState([]);
  const nextKey = React33.useRef(0);
  const rippleCallback = React33.useRef(null);
  React33.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  const ignoringMouseDown = React33.useRef(false);
  const startTimer = useTimeout();
  const startTimerCommit = React33.useRef(null);
  const container = React33.useRef(null);
  const startCommit = React33.useCallback((params) => {
    const {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ _jsx12(TouchRippleRipple, {
      classes: {
        ripple: clsx_default(classes.ripple, touchRippleClasses_default.ripple),
        rippleVisible: clsx_default(classes.rippleVisible, touchRippleClasses_default.rippleVisible),
        ripplePulsate: clsx_default(classes.ripplePulsate, touchRippleClasses_default.ripplePulsate),
        child: clsx_default(classes.child, touchRippleClasses_default.child),
        childLeaving: clsx_default(classes.childLeaving, touchRippleClasses_default.childLeaving),
        childPulsate: clsx_default(classes.childPulsate, touchRippleClasses_default.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start2 = React33.useCallback((event = {}, options = {}, cb = () => {
  }) => {
    const {
      pulsate: pulsate2 = false,
      center = centerProp || options.pulsate,
      fakeElement = false
      // For test purposes
    } = options;
    if ((event == null ? void 0 : event.type) === "mousedown" && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if ((event == null ? void 0 : event.type) === "touchstart") {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let rippleX;
    let rippleY;
    let rippleSize;
    if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }
    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }
    if (event == null ? void 0 : event.touches) {
      if (startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({
            pulsate: pulsate2,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        startTimer.start(DELAY_RIPPLE, () => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        });
      }
    } else {
      startCommit({
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit, startTimer]);
  const pulsate = React33.useCallback(() => {
    start2({}, {
      pulsate: true
    });
  }, [start2]);
  const stop = React33.useCallback((event, cb) => {
    startTimer.clear();
    if ((event == null ? void 0 : event.type) === "touchend" && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.start(0, () => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRipples((oldRipples) => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, [startTimer]);
  React33.useImperativeHandle(ref, () => ({
    pulsate,
    start: start2,
    stop
  }), [pulsate, start2, stop]);
  return /* @__PURE__ */ _jsx12(TouchRippleRoot, __spreadProps(__spreadValues({
    className: clsx_default(touchRippleClasses_default.root, classes.root, className),
    ref: container
  }, other), {
    children: /* @__PURE__ */ _jsx12(TransitionGroup_default, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
});
false ? TouchRipple.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: import_prop_types.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string
} : void 0;
var TouchRipple_default = TouchRipple;

// node_modules/@mui/material/esm/ButtonBase/buttonBaseClasses.js
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);
var buttonBaseClasses_default = buttonBaseClasses;

// node_modules/@mui/material/esm/ButtonBase/ButtonBase.js
import { jsx as _jsx13, jsxs as _jsxs3 } from "react/jsx-runtime";
var useUtilityClasses4 = (ownerState) => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
var ButtonBaseRoot = styled_default2("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (props, styles3) => styles3.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
    // Remove Firefox dotted outline.
  },
  [`&.${buttonBaseClasses_default.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
var ButtonBase = /* @__PURE__ */ React34.forwardRef(function ButtonBase2(inProps, ref) {
  const props = useDefaultProps2({
    props: inProps,
    name: "MuiButtonBase"
  });
  const _a = props, {
    action,
    centerRipple = false,
    children,
    className,
    component = "button",
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    focusVisibleClassName,
    LinkComponent = "a",
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type
  } = _a, other = __objRest(_a, [
    "action",
    "centerRipple",
    "children",
    "className",
    "component",
    "disabled",
    "disableRipple",
    "disableTouchRipple",
    "focusRipple",
    "focusVisibleClassName",
    "LinkComponent",
    "onBlur",
    "onClick",
    "onContextMenu",
    "onDragLeave",
    "onFocus",
    "onFocusVisible",
    "onKeyDown",
    "onKeyUp",
    "onMouseDown",
    "onMouseLeave",
    "onMouseUp",
    "onTouchEnd",
    "onTouchMove",
    "onTouchStart",
    "tabIndex",
    "TouchRippleProps",
    "touchRippleRef",
    "type"
  ]);
  const buttonRef = React34.useRef(null);
  const ripple = useLazyRipple();
  const handleRippleRef = useForkRef_default(ripple.ref, touchRippleRef);
  const [focusVisible, setFocusVisible] = React34.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React34.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
  React34.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      ripple.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, ripple]);
  const handleMouseDown = useRippleHandler(ripple, "start", onMouseDown, disableTouchRipple);
  const handleContextMenu = useRippleHandler(ripple, "stop", onContextMenu, disableTouchRipple);
  const handleDragLeave = useRippleHandler(ripple, "stop", onDragLeave, disableTouchRipple);
  const handleMouseUp = useRippleHandler(ripple, "stop", onMouseUp, disableTouchRipple);
  const handleMouseLeave = useRippleHandler(ripple, "stop", (event) => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }, disableTouchRipple);
  const handleTouchStart = useRippleHandler(ripple, "start", onTouchStart, disableTouchRipple);
  const handleTouchEnd = useRippleHandler(ripple, "stop", onTouchEnd, disableTouchRipple);
  const handleTouchMove = useRippleHandler(ripple, "stop", onTouchMove, disableTouchRipple);
  const handleBlur = useRippleHandler(ripple, "stop", (event) => {
    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback_default2((event) => {
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    if (isFocusVisible(event.target)) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component && component !== "button" && !(button.tagName === "A" && button.href);
  };
  const handleKeyDown = useEventCallback_default2((event) => {
    if (focusRipple && !event.repeat && focusVisible && event.key === " ") {
      ripple.stop(event, () => {
        ripple.start(event);
      });
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback_default2((event) => {
    if (focusRipple && event.key === " " && focusVisible && !event.defaultPrevented) {
      ripple.stop(event, () => {
        ripple.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;
  if (ComponentProp === "button" && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }
  const buttonProps = {};
  if (ComponentProp === "button") {
    buttonProps.type = type === void 0 ? "button" : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = "button";
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
    }
  }
  const handleRef = useForkRef_default(ref, buttonRef);
  const ownerState = __spreadProps(__spreadValues({}, props), {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });
  const classes = useUtilityClasses4(ownerState);
  return /* @__PURE__ */ _jsxs3(ButtonBaseRoot, __spreadProps(__spreadValues(__spreadValues({
    as: ComponentProp,
    className: clsx_default(classes.root, className),
    ownerState,
    onBlur: handleBlur,
    onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type
  }, buttonProps), other), {
    children: [children, enableTouchRipple ? /* @__PURE__ */ _jsx13(TouchRipple_default, __spreadValues({
      ref: handleRippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
});
function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
  return useEventCallback_default2((event) => {
    if (eventCallback) {
      eventCallback(event);
    }
    if (!skipRippleAction) {
      ripple[rippleAction](event);
    }
    return true;
  });
}
false ? ButtonBase.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: refType_default,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: import_prop_types.default.bool,
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef_default,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: import_prop_types.default.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: import_prop_types.default.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: import_prop_types.default.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: import_prop_types.default.string,
  /**
   * @ignore
   */
  href: import_prop_types.default.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: import_prop_types.default.elementType,
  /**
   * @ignore
   */
  onBlur: import_prop_types.default.func,
  /**
   * @ignore
   */
  onClick: import_prop_types.default.func,
  /**
   * @ignore
   */
  onContextMenu: import_prop_types.default.func,
  /**
   * @ignore
   */
  onDragLeave: import_prop_types.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types.default.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: import_prop_types.default.func,
  /**
   * @ignore
   */
  onKeyDown: import_prop_types.default.func,
  /**
   * @ignore
   */
  onKeyUp: import_prop_types.default.func,
  /**
   * @ignore
   */
  onMouseDown: import_prop_types.default.func,
  /**
   * @ignore
   */
  onMouseLeave: import_prop_types.default.func,
  /**
   * @ignore
   */
  onMouseUp: import_prop_types.default.func,
  /**
   * @ignore
   */
  onTouchEnd: import_prop_types.default.func,
  /**
   * @ignore
   */
  onTouchMove: import_prop_types.default.func,
  /**
   * @ignore
   */
  onTouchStart: import_prop_types.default.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * @default 0
   */
  tabIndex: import_prop_types.default.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: import_prop_types.default.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({
    current: import_prop_types.default.shape({
      pulsate: import_prop_types.default.func.isRequired,
      start: import_prop_types.default.func.isRequired,
      stop: import_prop_types.default.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  type: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["button", "reset", "submit"]), import_prop_types.default.string])
} : void 0;
var ButtonBase_default = ButtonBase;

// node_modules/@mui/material/esm/utils/capitalize.js
var capitalize_default = capitalize;

// node_modules/@mui/material/esm/Fab/fabClasses.js
function getFabUtilityClass(slot) {
  return generateUtilityClass("MuiFab", slot);
}
var fabClasses = generateUtilityClasses("MuiFab", ["root", "primary", "secondary", "extended", "circular", "focusVisible", "disabled", "colorInherit", "sizeSmall", "sizeMedium", "sizeLarge", "info", "error", "warning", "success"]);
var fabClasses_default = fabClasses;

// node_modules/@mui/material/esm/utils/createSimplePaletteValueFilter.js
function hasCorrectMainProperty(obj) {
  return typeof obj.main === "string";
}
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
  if (!hasCorrectMainProperty(obj)) {
    return false;
  }
  for (const value of additionalPropertiesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== "string") {
      return false;
    }
  }
  return true;
}
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
  return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}

// node_modules/@mui/material/esm/Fab/Fab.js
import { jsx as _jsx14 } from "react/jsx-runtime";
var useUtilityClasses5 = (ownerState) => {
  const {
    color: color2,
    variant,
    classes,
    size
  } = ownerState;
  const slots = {
    root: ["root", variant, `size${capitalize_default(size)}`, color2 === "inherit" ? "colorInherit" : color2]
  };
  const composedClasses = composeClasses(slots, getFabUtilityClass, classes);
  return __spreadValues(__spreadValues({}, classes), composedClasses);
};
var FabRoot = styled_default2(ButtonBase_default, {
  name: "MuiFab",
  slot: "Root",
  shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, styles3[ownerState.variant], styles3[`size${capitalize_default(ownerState.size)}`], ownerState.color === "inherit" && styles3.colorInherit, styles3[capitalize_default(ownerState.size)], styles3[ownerState.color]];
  }
})(memoTheme_default(({
  theme
}) => {
  var _a, _b;
  return __spreadProps(__spreadValues({}, theme.typography.button), {
    minHeight: 36,
    transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
      duration: theme.transitions.duration.short
    }),
    borderRadius: "50%",
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    zIndex: (theme.vars || theme).zIndex.fab,
    boxShadow: (theme.vars || theme).shadows[6],
    "&:active": {
      boxShadow: (theme.vars || theme).shadows[12]
    },
    color: theme.vars ? theme.vars.palette.grey[900] : (_b = (_a = theme.palette).getContrastText) == null ? void 0 : _b.call(_a, theme.palette.grey[300]),
    backgroundColor: (theme.vars || theme).palette.grey[300],
    "&:hover": {
      backgroundColor: (theme.vars || theme).palette.grey.A100,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: (theme.vars || theme).palette.grey[300]
      },
      textDecoration: "none"
    },
    [`&.${fabClasses_default.focusVisible}`]: {
      boxShadow: (theme.vars || theme).shadows[6]
    },
    variants: [{
      props: {
        size: "small"
      },
      style: {
        width: 40,
        height: 40
      }
    }, {
      props: {
        size: "medium"
      },
      style: {
        width: 48,
        height: 48
      }
    }, {
      props: {
        variant: "extended"
      },
      style: {
        borderRadius: 48 / 2,
        padding: "0 16px",
        width: "auto",
        minHeight: "auto",
        minWidth: 48,
        height: 48
      }
    }, {
      props: {
        variant: "extended",
        size: "small"
      },
      style: {
        width: "auto",
        padding: "0 8px",
        borderRadius: 34 / 2,
        minWidth: 34,
        height: 34
      }
    }, {
      props: {
        variant: "extended",
        size: "medium"
      },
      style: {
        width: "auto",
        padding: "0 16px",
        borderRadius: 40 / 2,
        minWidth: 40,
        height: 40
      }
    }, {
      props: {
        color: "inherit"
      },
      style: {
        color: "inherit"
      }
    }]
  });
}), memoTheme_default(({
  theme
}) => ({
  variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark", "contrastText"])).map(([color2]) => ({
    props: {
      color: color2
    },
    style: {
      color: (theme.vars || theme).palette[color2].contrastText,
      backgroundColor: (theme.vars || theme).palette[color2].main,
      "&:hover": {
        backgroundColor: (theme.vars || theme).palette[color2].dark,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: (theme.vars || theme).palette[color2].main
        }
      }
    }
  }))]
})), memoTheme_default(({
  theme
}) => ({
  [`&.${fabClasses_default.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    boxShadow: (theme.vars || theme).shadows[0],
    backgroundColor: (theme.vars || theme).palette.action.disabledBackground
  }
})));
var Fab = /* @__PURE__ */ React35.forwardRef(function Fab2(inProps, ref) {
  const props = useDefaultProps2({
    props: inProps,
    name: "MuiFab"
  });
  const _a = props, {
    children,
    className,
    color: color2 = "default",
    component = "button",
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = "large",
    variant = "circular"
  } = _a, other = __objRest(_a, [
    "children",
    "className",
    "color",
    "component",
    "disabled",
    "disableFocusRipple",
    "focusVisibleClassName",
    "size",
    "variant"
  ]);
  const ownerState = __spreadProps(__spreadValues({}, props), {
    color: color2,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses5(ownerState);
  return /* @__PURE__ */ _jsx14(FabRoot, __spreadProps(__spreadValues({
    className: clsx_default(classes.root, className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_default(classes.focusVisible, focusVisibleClassName),
    ownerState,
    ref
  }, other), {
    classes,
    children
  }));
});
false ? Fab.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["default", "error", "info", "inherit", "primary", "secondary", "success", "warning"]), import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: import_prop_types.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: import_prop_types.default.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: import_prop_types.default.string,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: import_prop_types.default.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'large'
   */
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["small", "medium", "large"]), import_prop_types.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["circular", "extended"]), import_prop_types.default.string])
} : void 0;
var Fab_default = Fab;

// src/modal.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function InteractiveNavModal({ children }) {
  const [open, setOpen] = useState9(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx3(Fab_default, { onClick: handleOpen, sx: {
      position: "fixed",
      bottom: 50,
      right: 50,
      height: 70,
      width: 70,
      backgroundColor: "#FFF",
      padding: 0
    }, children: /* @__PURE__ */ jsx3("img", { src: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/cfde_unified_icon.svg", alt: "nav-but", width: 120, height: 120 }) }),
    /* @__PURE__ */ jsx3(
      Modal_default,
      {
        open,
        onClose: handleClose,
        "aria-labelledby": "modal-modal-title",
        "aria-describedby": "modal-modal-description",
        children: /* @__PURE__ */ jsx3(Box_default, { children })
      }
    )
  ] });
}

// node_modules/@mui/material/esm/utils/useId.js
var useId_default = useId;

// node_modules/@mui/material/esm/utils/useControlled.js
var useControlled_default = useControlled;

// node_modules/@mui/material/esm/CircularProgress/CircularProgress.js
import * as React36 from "react";

// node_modules/@mui/material/esm/CircularProgress/circularProgressClasses.js
function getCircularProgressUtilityClass(slot) {
  return generateUtilityClass("MuiCircularProgress", slot);
}
var circularProgressClasses = generateUtilityClasses("MuiCircularProgress", ["root", "determinate", "indeterminate", "colorPrimary", "colorSecondary", "svg", "circle", "circleDeterminate", "circleIndeterminate", "circleDisableShrink"]);

// node_modules/@mui/material/esm/CircularProgress/CircularProgress.js
import { jsx as _jsx15 } from "react/jsx-runtime";
var SIZE = 44;
var circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
var circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;
var rotateAnimation = typeof circularRotateKeyframe !== "string" ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      ` : null;
var dashAnimation = typeof circularDashKeyframe !== "string" ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      ` : null;
var useUtilityClasses6 = (ownerState) => {
  const {
    classes,
    variant,
    color: color2,
    disableShrink
  } = ownerState;
  const slots = {
    root: ["root", variant, `color${capitalize_default(color2)}`],
    svg: ["svg"],
    circle: ["circle", `circle${capitalize_default(variant)}`, disableShrink && "circleDisableShrink"]
  };
  return composeClasses(slots, getCircularProgressUtilityClass, classes);
};
var CircularProgressRoot = styled_default2("span", {
  name: "MuiCircularProgress",
  slot: "Root",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, styles3[ownerState.variant], styles3[`color${capitalize_default(ownerState.color)}`]];
  }
})(memoTheme_default(({
  theme
}) => ({
  display: "inline-block",
  variants: [{
    props: {
      variant: "determinate"
    },
    style: {
      transition: theme.transitions.create("transform")
    }
  }, {
    props: {
      variant: "indeterminate"
    },
    style: rotateAnimation || {
      animation: `${circularRotateKeyframe} 1.4s linear infinite`
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color2]) => ({
    props: {
      color: color2
    },
    style: {
      color: (theme.vars || theme).palette[color2].main
    }
  }))]
})));
var CircularProgressSVG = styled_default2("svg", {
  name: "MuiCircularProgress",
  slot: "Svg",
  overridesResolver: (props, styles3) => styles3.svg
})({
  display: "block"
  // Keeps the progress centered
});
var CircularProgressCircle = styled_default2("circle", {
  name: "MuiCircularProgress",
  slot: "Circle",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.circle, styles3[`circle${capitalize_default(ownerState.variant)}`], ownerState.disableShrink && styles3.circleDisableShrink];
  }
})(memoTheme_default(({
  theme
}) => ({
  stroke: "currentColor",
  variants: [{
    props: {
      variant: "determinate"
    },
    style: {
      transition: theme.transitions.create("stroke-dashoffset")
    }
  }, {
    props: {
      variant: "indeterminate"
    },
    style: {
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: "80px, 200px",
      strokeDashoffset: 0
      // Add the unit to fix a Edge 16 and below bug.
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.variant === "indeterminate" && !ownerState.disableShrink,
    style: dashAnimation || {
      // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
      animation: `${circularDashKeyframe} 1.4s ease-in-out infinite`
    }
  }]
})));
var CircularProgress = /* @__PURE__ */ React36.forwardRef(function CircularProgress2(inProps, ref) {
  const props = useDefaultProps2({
    props: inProps,
    name: "MuiCircularProgress"
  });
  const _a = props, {
    className,
    color: color2 = "primary",
    disableShrink = false,
    size = 40,
    style: style3,
    thickness = 3.6,
    value = 0,
    variant = "indeterminate"
  } = _a, other = __objRest(_a, [
    "className",
    "color",
    "disableShrink",
    "size",
    "style",
    "thickness",
    "value",
    "variant"
  ]);
  const ownerState = __spreadProps(__spreadValues({}, props), {
    color: color2,
    disableShrink,
    size,
    thickness,
    value,
    variant
  });
  const classes = useUtilityClasses6(ownerState);
  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};
  if (variant === "determinate") {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps["aria-valuenow"] = Math.round(value);
    circleStyle.strokeDashoffset = `${((100 - value) / 100 * circumference).toFixed(3)}px`;
    rootStyle.transform = "rotate(-90deg)";
  }
  return /* @__PURE__ */ _jsx15(CircularProgressRoot, __spreadProps(__spreadValues(__spreadValues({
    className: clsx_default(classes.root, className),
    style: __spreadValues(__spreadValues({
      width: size,
      height: size
    }, rootStyle), style3),
    ownerState,
    ref,
    role: "progressbar"
  }, rootProps), other), {
    children: /* @__PURE__ */ _jsx15(CircularProgressSVG, {
      className: classes.svg,
      ownerState,
      viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
      children: /* @__PURE__ */ _jsx15(CircularProgressCircle, {
        className: classes.circle,
        style: circleStyle,
        ownerState,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness
      })
    })
  }));
});
false ? CircularProgress.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["inherit", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: chainPropTypes(import_prop_types.default.bool, (props) => {
    if (props.disableShrink && props.variant && props.variant !== "indeterminate") {
      return new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect.");
    }
    return null;
  }),
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 40
   */
  size: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: import_prop_types.default.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: import_prop_types.default.number,
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: import_prop_types.default.oneOf(["determinate", "indeterminate"])
} : void 0;
var CircularProgress_default = CircularProgress;

// node_modules/@mui/material/esm/Typography/Typography.js
import * as React37 from "react";

// node_modules/@mui/material/esm/Typography/typographyClasses.js
function getTypographyUtilityClass(slot) {
  return generateUtilityClass("MuiTypography", slot);
}
var typographyClasses = generateUtilityClasses("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);

// node_modules/@mui/material/esm/Typography/Typography.js
import { jsx as _jsx16 } from "react/jsx-runtime";
var v6Colors = {
  primary: true,
  secondary: true,
  error: true,
  info: true,
  success: true,
  warning: true,
  textPrimary: true,
  textSecondary: true,
  textDisabled: true
};
var extendSxProp2 = internal_createExtendSxProp();
var useUtilityClasses7 = (ownerState) => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, ownerState.align !== "inherit" && `align${capitalize_default(align)}`, gutterBottom && "gutterBottom", noWrap && "noWrap", paragraph && "paragraph"]
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};
var TypographyRoot = styled_default2("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, ownerState.variant && styles3[ownerState.variant], ownerState.align !== "inherit" && styles3[`align${capitalize_default(ownerState.align)}`], ownerState.noWrap && styles3.noWrap, ownerState.gutterBottom && styles3.gutterBottom, ownerState.paragraph && styles3.paragraph];
  }
})(memoTheme_default(({
  theme
}) => {
  var _a;
  return {
    margin: 0,
    variants: [{
      props: {
        variant: "inherit"
      },
      style: {
        // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
        font: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit"
      }
    }, ...Object.entries(theme.typography).filter(([variant, value]) => variant !== "inherit" && value && typeof value === "object").map(([variant, value]) => ({
      props: {
        variant
      },
      style: value
    })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color2]) => ({
      props: {
        color: color2
      },
      style: {
        color: (theme.vars || theme).palette[color2].main
      }
    })), ...Object.entries(((_a = theme.palette) == null ? void 0 : _a.text) || {}).filter(([, value]) => typeof value === "string").map(([color2]) => ({
      props: {
        color: `text${capitalize_default(color2)}`
      },
      style: {
        color: (theme.vars || theme).palette.text[color2]
      }
    })), {
      props: ({
        ownerState
      }) => ownerState.align !== "inherit",
      style: {
        textAlign: "var(--Typography-textAlign)"
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.noWrap,
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.gutterBottom,
      style: {
        marginBottom: "0.35em"
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.paragraph,
      style: {
        marginBottom: 16
      }
    }]
  };
}));
var defaultVariantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
};
var Typography = /* @__PURE__ */ React37.forwardRef(function Typography2(inProps, ref) {
  const _a = useDefaultProps2({
    props: inProps,
    name: "MuiTypography"
  }), {
    color: color2
  } = _a, themeProps = __objRest(_a, [
    "color"
  ]);
  const isSxColor = !v6Colors[color2];
  const props = extendSxProp2(__spreadValues(__spreadValues({}, themeProps), isSxColor && {
    color: color2
  }));
  const _b = props, {
    align = "inherit",
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = "body1",
    variantMapping = defaultVariantMapping
  } = _b, other = __objRest(_b, [
    "align",
    "className",
    "component",
    "gutterBottom",
    "noWrap",
    "paragraph",
    "variant",
    "variantMapping"
  ]);
  const ownerState = __spreadProps(__spreadValues({}, props), {
    align,
    color: color2,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  });
  const Component = component || (paragraph ? "p" : variantMapping[variant] || defaultVariantMapping[variant]) || "span";
  const classes = useUtilityClasses7(ownerState);
  return /* @__PURE__ */ _jsx16(TypographyRoot, __spreadProps(__spreadValues({
    as: Component,
    ref,
    className: clsx_default(classes.root, className)
  }, other), {
    ownerState,
    style: __spreadValues(__spreadValues({}, align !== "inherit" && {
      "--Typography-textAlign": align
    }), other.style)
  }));
});
false ? Typography.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: import_prop_types.default.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: import_prop_types.default.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: import_prop_types.default.bool,
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   * @deprecated Use the `component` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  paragraph: import_prop_types.default.bool,
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), import_prop_types.default.string]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: import_prop_types.default.object
} : void 0;
var Typography_default = Typography;

// node_modules/@mui/material/esm/Popper/Popper.js
import * as React39 from "react";

// node_modules/@mui/material/esm/Popper/BasePopper.js
import * as React38 from "react";

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node2) {
  if (node2 == null) {
    return window;
  }
  if (node2.toString() !== "[object Window]") {
    var ownerDocument2 = node2.ownerDocument;
    return ownerDocument2 ? ownerDocument2.defaultView || window : window;
  }
  return node2;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node2) {
  var OwnElement = getWindow(node2).Element;
  return node2 instanceof OwnElement || node2 instanceof Element;
}
function isHTMLElement(node2) {
  var OwnElement = getWindow(node2).HTMLElement;
  return node2 instanceof OwnElement || node2 instanceof HTMLElement;
}
function isShadowRoot(node2) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node2).ShadowRoot;
  return node2 instanceof OwnElement || node2 instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles2(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style3 = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style3);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style3 = styleProperties.reduce(function(style4, property) {
        style4[property] = "";
        return style4;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style3);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles2,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round2 = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round2(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round2(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width2 = clientRect.width / scaleX;
  var height2 = clientRect.height / scaleY;
  return {
    width: width2,
    height: height2,
    top: y,
    right: x + width2,
    bottom: y + height2,
    left: x,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width2 = element.offsetWidth;
  var height2 = element.offsetHeight;
  if (Math.abs(clientRect.width - width2) <= 1) {
    width2 = clientRect.width;
  }
  if (Math.abs(clientRect.height - height2) <= 1) {
    height2 = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width2,
    height: height2
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next2 = child;
    do {
      if (next2 && parent.isSameNode(next2)) {
        return true;
      }
      next2 = next2.parentNode || next2.host;
    } while (next2);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css2 = getComputedStyle(currentNode);
    if (css2.transform !== "none" || css2.perspective !== "none" || css2.contain === "paint" || ["transform", "perspective"].indexOf(css2.willChange) !== -1 || isFirefox && css2.willChange === "filter" || isFirefox && css2.filter && css2.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding2, state) {
  padding2 = typeof padding2 === "function" ? padding2(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding2;
  return mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round2(x * dpr) / dpr || 0,
    y: round2(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position2 = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position2 === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position2
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash2 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash3 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash3[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node2) {
  var win = getWindow(node2);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width2 = html.clientWidth;
  var height2 = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width2 = visualViewport.width;
    height2 = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width: width2,
    height: height2,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width2 = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height2 = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width2;
  }
  return {
    width: width2,
    height: height2,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node2) {
  if (["html", "body", "#document"].indexOf(getNodeName(node2)) >= 0) {
    return node2.ownerDocument.body;
  }
  if (isHTMLElement(node2) && isScrollParent(node2)) {
    return node2;
  }
  return getScrollParent(getParentNode(node2));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding2 = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding2 = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding2 = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding: padding2
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding2 = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding: padding2,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node2) {
  if (node2 === getWindow(node2) || !isHTMLElement(node2)) {
    return getWindowScroll(node2);
  } else {
    return getHTMLElementScroll(node2);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round2(rect.width) / element.offsetWidth || 1;
  var scaleY = round2(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// node_modules/@mui/material/esm/Popper/popperClasses.js
function getPopperUtilityClass(slot) {
  return generateUtilityClass("MuiPopper", slot);
}
var popperClasses = generateUtilityClasses("MuiPopper", ["root"]);

// node_modules/@mui/material/esm/Popper/BasePopper.js
import { jsx as _jsx17 } from "react/jsx-runtime";
function flipPlacement(placement, direction) {
  if (direction === "ltr") {
    return placement;
  }
  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
function isHTMLElement2(element) {
  return element.nodeType !== void 0;
}
var useUtilityClasses8 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getPopperUtilityClass, classes);
};
var defaultPopperOptions = {};
var PopperTooltip = /* @__PURE__ */ React38.forwardRef(function PopperTooltip2(props, forwardedRef) {
  var _b;
  const _a = props, {
    anchorEl,
    children,
    direction,
    disablePortal,
    modifiers,
    open,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    slotProps = {},
    slots = {},
    TransitionProps,
    ownerState: ownerStateProp
  } = _a, other = __objRest(_a, [
    "anchorEl",
    "children",
    "direction",
    "disablePortal",
    "modifiers",
    "open",
    "placement",
    "popperOptions",
    "popperRef",
    "slotProps",
    "slots",
    "TransitionProps",
    // @ts-ignore internal logic
    "ownerState"
  ]);
  const tooltipRef = React38.useRef(null);
  const ownRef = useForkRef(tooltipRef, forwardedRef);
  const popperRef = React38.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React38.useRef(handlePopperRef);
  useEnhancedEffect_default(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React38.useImperativeHandle(popperRefProp, () => popperRef.current, []);
  const rtlPlacement = flipPlacement(initialPlacement, direction);
  const [placement, setPlacement] = React38.useState(rtlPlacement);
  const [resolvedAnchorElement, setResolvedAnchorElement] = React38.useState(resolveAnchorEl(anchorEl));
  React38.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });
  React38.useEffect(() => {
    if (anchorEl) {
      setResolvedAnchorElement(resolveAnchorEl(anchorEl));
    }
  }, [anchorEl]);
  useEnhancedEffect_default(() => {
    if (!resolvedAnchorElement || !open) {
      return void 0;
    }
    const handlePopperUpdate = (data) => {
      setPlacement(data.placement);
    };
    if (false) {
      if (resolvedAnchorElement && isHTMLElement2(resolvedAnchorElement) && resolvedAnchorElement.nodeType === 1) {
        const box = resolvedAnchorElement.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      }
    }
    let popperModifiers = [{
      name: "preventOverflow",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "flip",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "onUpdate",
      enabled: true,
      phase: "afterWrite",
      fn: ({
        state
      }) => {
        handlePopperUpdate(state);
      }
    }];
    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }
    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }
    const popper2 = createPopper(resolvedAnchorElement, tooltipRef.current, __spreadProps(__spreadValues({
      placement: rtlPlacement
    }, popperOptions), {
      modifiers: popperModifiers
    }));
    handlePopperRefRef.current(popper2);
    return () => {
      popper2.destroy();
      handlePopperRefRef.current(null);
    };
  }, [resolvedAnchorElement, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
  const childProps = {
    placement
  };
  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }
  const classes = useUtilityClasses8(props);
  const Root = (_b = slots.root) != null ? _b : "div";
  const rootProps = useSlotProps_default({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: "tooltip",
      ref: ownRef
    },
    ownerState: props,
    className: classes.root
  });
  return /* @__PURE__ */ _jsx17(Root, __spreadProps(__spreadValues({}, rootProps), {
    children: typeof children === "function" ? children(childProps) : children
  }));
});
var Popper = /* @__PURE__ */ React38.forwardRef(function Popper2(props, forwardedRef) {
  const _a = props, {
    anchorEl,
    children,
    container: containerProp,
    direction = "ltr",
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement = "bottom",
    popperOptions = defaultPopperOptions,
    popperRef,
    style: style3,
    transition = false,
    slotProps = {},
    slots = {}
  } = _a, other = __objRest(_a, [
    "anchorEl",
    "children",
    "container",
    "direction",
    "disablePortal",
    "keepMounted",
    "modifiers",
    "open",
    "placement",
    "popperOptions",
    "popperRef",
    "style",
    "transition",
    "slotProps",
    "slots"
  ]);
  const [exited, setExited] = React38.useState(true);
  const handleEnter = () => {
    setExited(false);
  };
  const handleExited = () => {
    setExited(true);
  };
  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }
  let container;
  if (containerProp) {
    container = containerProp;
  } else if (anchorEl) {
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    container = resolvedAnchorEl && isHTMLElement2(resolvedAnchorEl) ? ownerDocument(resolvedAnchorEl).body : ownerDocument(null).body;
  }
  const display = !open && keepMounted && (!transition || exited) ? "none" : void 0;
  const transitionProps = transition ? {
    in: open,
    onEnter: handleEnter,
    onExited: handleExited
  } : void 0;
  return /* @__PURE__ */ _jsx17(Portal_default, {
    disablePortal,
    container,
    children: /* @__PURE__ */ _jsx17(PopperTooltip, __spreadProps(__spreadValues({
      anchorEl,
      direction,
      disablePortal,
      modifiers,
      ref: forwardedRef,
      open: transition ? !exited : open,
      placement,
      popperOptions,
      popperRef,
      slotProps,
      slots
    }, other), {
      style: __spreadValues({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display
      }, style3),
      TransitionProps: transitionProps,
      children
    }))
  });
});
false ? Popper.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: chainPropTypes(import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.object, import_prop_types.default.func]), (props) => {
    if (props.open) {
      const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
      if (resolvedAnchorEl && isHTMLElement2(resolvedAnchorEl) && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || isVirtualElement(resolvedAnchorEl) && resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) {
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join("\n"));
      }
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: import_prop_types.default.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: import_prop_types.default.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: import_prop_types.default.arrayOf(import_prop_types.default.shape({
    data: import_prop_types.default.object,
    effect: import_prop_types.default.func,
    enabled: import_prop_types.default.bool,
    fn: import_prop_types.default.func,
    name: import_prop_types.default.any,
    options: import_prop_types.default.object,
    phase: import_prop_types.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types.default.arrayOf(import_prop_types.default.string),
    requiresIfExists: import_prop_types.default.arrayOf(import_prop_types.default.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types.default.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: import_prop_types.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: import_prop_types.default.shape({
    modifiers: import_prop_types.default.array,
    onFirstUpdate: import_prop_types.default.func,
    placement: import_prop_types.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types.default.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType_default,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    root: import_prop_types.default.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: import_prop_types.default.bool
} : void 0;
var BasePopper_default = Popper;

// node_modules/@mui/material/esm/Popper/Popper.js
import { jsx as _jsx18 } from "react/jsx-runtime";
var PopperRoot = styled_default2(BasePopper_default, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (props, styles3) => styles3.root
})({});
var Popper3 = /* @__PURE__ */ React39.forwardRef(function Popper4(inProps, ref) {
  var _b;
  const isRtl = useRtl();
  const props = useDefaultProps2({
    props: inProps,
    name: "MuiPopper"
  });
  const _a = props, {
    anchorEl,
    component,
    components,
    componentsProps,
    container,
    disablePortal,
    keepMounted,
    modifiers,
    open,
    placement,
    popperOptions,
    popperRef,
    transition,
    slots,
    slotProps
  } = _a, other = __objRest(_a, [
    "anchorEl",
    "component",
    "components",
    "componentsProps",
    "container",
    "disablePortal",
    "keepMounted",
    "modifiers",
    "open",
    "placement",
    "popperOptions",
    "popperRef",
    "transition",
    "slots",
    "slotProps"
  ]);
  const RootComponent = (_b = slots == null ? void 0 : slots.root) != null ? _b : components == null ? void 0 : components.Root;
  const otherProps = __spreadValues({
    anchorEl,
    container,
    disablePortal,
    keepMounted,
    modifiers,
    open,
    placement,
    popperOptions,
    popperRef,
    transition
  }, other);
  return /* @__PURE__ */ _jsx18(PopperRoot, __spreadProps(__spreadValues({
    as: component,
    direction: isRtl ? "rtl" : "ltr",
    slots: {
      root: RootComponent
    },
    slotProps: slotProps != null ? slotProps : componentsProps
  }, otherProps), {
    ref
  }));
});
false ? Popper3.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.object, import_prop_types.default.func]),
  /**
   * Popper render function or node.
   */
  children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  components: import_prop_types.default.shape({
    Root: import_prop_types.default.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  componentsProps: import_prop_types.default.shape({
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: import_prop_types.default.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: import_prop_types.default.arrayOf(import_prop_types.default.shape({
    data: import_prop_types.default.object,
    effect: import_prop_types.default.func,
    enabled: import_prop_types.default.bool,
    fn: import_prop_types.default.func,
    name: import_prop_types.default.any,
    options: import_prop_types.default.object,
    phase: import_prop_types.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types.default.arrayOf(import_prop_types.default.string),
    requiresIfExists: import_prop_types.default.arrayOf(import_prop_types.default.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types.default.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: import_prop_types.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: import_prop_types.default.shape({
    modifiers: import_prop_types.default.array,
    onFirstUpdate: import_prop_types.default.func,
    placement: import_prop_types.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types.default.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType_default,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    root: import_prop_types.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: import_prop_types.default.bool
} : void 0;
var Popper_default = Popper3;

// node_modules/@mui/material/esm/Button/Button.js
import * as React42 from "react";

// node_modules/@mui/material/esm/Button/buttonClasses.js
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge", "loading", "loadingWrapper", "loadingIconPlaceholder", "loadingIndicator", "loadingPositionCenter", "loadingPositionStart", "loadingPositionEnd"]);
var buttonClasses_default = buttonClasses;

// node_modules/@mui/material/esm/ButtonGroup/ButtonGroupContext.js
import * as React40 from "react";
var ButtonGroupContext = /* @__PURE__ */ React40.createContext({});
if (false) {
  ButtonGroupContext.displayName = "ButtonGroupContext";
}
var ButtonGroupContext_default = ButtonGroupContext;

// node_modules/@mui/material/esm/ButtonGroup/ButtonGroupButtonContext.js
import * as React41 from "react";
var ButtonGroupButtonContext = /* @__PURE__ */ React41.createContext(void 0);
if (false) {
  ButtonGroupButtonContext.displayName = "ButtonGroupButtonContext";
}
var ButtonGroupButtonContext_default = ButtonGroupButtonContext;

// node_modules/@mui/material/esm/Button/Button.js
import { jsx as _jsx19, jsxs as _jsxs4 } from "react/jsx-runtime";
var useUtilityClasses9 = (ownerState) => {
  const {
    color: color2,
    disableElevation,
    fullWidth,
    size,
    variant,
    loading,
    loadingPosition,
    classes
  } = ownerState;
  const slots = {
    root: ["root", loading && "loading", variant, `${variant}${capitalize_default(color2)}`, `size${capitalize_default(size)}`, `${variant}Size${capitalize_default(size)}`, `color${capitalize_default(color2)}`, disableElevation && "disableElevation", fullWidth && "fullWidth", loading && `loadingPosition${capitalize_default(loadingPosition)}`],
    startIcon: ["icon", "startIcon", `iconSize${capitalize_default(size)}`],
    endIcon: ["icon", "endIcon", `iconSize${capitalize_default(size)}`],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return __spreadValues(__spreadValues({}, classes), composedClasses);
};
var commonIconStyles = [{
  props: {
    size: "small"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 18
    }
  }
}, {
  props: {
    size: "medium"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 20
    }
  }
}, {
  props: {
    size: "large"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 22
    }
  }
}];
var ButtonRoot = styled_default2(ButtonBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, styles3[ownerState.variant], styles3[`${ownerState.variant}${capitalize_default(ownerState.color)}`], styles3[`size${capitalize_default(ownerState.size)}`], styles3[`${ownerState.variant}Size${capitalize_default(ownerState.size)}`], ownerState.color === "inherit" && styles3.colorInherit, ownerState.disableElevation && styles3.disableElevation, ownerState.fullWidth && styles3.fullWidth, ownerState.loading && styles3.loading];
  }
})(memoTheme_default(({
  theme
}) => {
  const inheritContainedBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800];
  const inheritContainedHoverBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey.A100 : theme.palette.grey[700];
  return __spreadProps(__spreadValues({}, theme.typography.button), {
    minWidth: 64,
    padding: "6px 16px",
    border: 0,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: theme.transitions.duration.short
    }),
    "&:hover": {
      textDecoration: "none"
    },
    [`&.${buttonClasses_default.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled
    },
    variants: [{
      props: {
        variant: "contained"
      },
      style: {
        color: `var(--variant-containedColor)`,
        backgroundColor: `var(--variant-containedBg)`,
        boxShadow: (theme.vars || theme).shadows[2],
        "&:hover": {
          boxShadow: (theme.vars || theme).shadows[4],
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            boxShadow: (theme.vars || theme).shadows[2]
          }
        },
        "&:active": {
          boxShadow: (theme.vars || theme).shadows[8]
        },
        [`&.${buttonClasses_default.focusVisible}`]: {
          boxShadow: (theme.vars || theme).shadows[6]
        },
        [`&.${buttonClasses_default.disabled}`]: {
          color: (theme.vars || theme).palette.action.disabled,
          boxShadow: (theme.vars || theme).shadows[0],
          backgroundColor: (theme.vars || theme).palette.action.disabledBackground
        }
      }
    }, {
      props: {
        variant: "outlined"
      },
      style: {
        padding: "5px 15px",
        border: "1px solid currentColor",
        borderColor: `var(--variant-outlinedBorder, currentColor)`,
        backgroundColor: `var(--variant-outlinedBg)`,
        color: `var(--variant-outlinedColor)`,
        [`&.${buttonClasses_default.disabled}`]: {
          border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
        }
      }
    }, {
      props: {
        variant: "text"
      },
      style: {
        padding: "6px 8px",
        color: `var(--variant-textColor)`,
        backgroundColor: `var(--variant-textBg)`
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color2]) => ({
      props: {
        color: color2
      },
      style: {
        "--variant-textColor": (theme.vars || theme).palette[color2].main,
        "--variant-outlinedColor": (theme.vars || theme).palette[color2].main,
        "--variant-outlinedBorder": theme.vars ? `rgba(${theme.vars.palette[color2].mainChannel} / 0.5)` : alpha(theme.palette[color2].main, 0.5),
        "--variant-containedColor": (theme.vars || theme).palette[color2].contrastText,
        "--variant-containedBg": (theme.vars || theme).palette[color2].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (theme.vars || theme).palette[color2].dark,
            "--variant-textBg": theme.vars ? `rgba(${theme.vars.palette[color2].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[color2].main, theme.palette.action.hoverOpacity),
            "--variant-outlinedBorder": (theme.vars || theme).palette[color2].main,
            "--variant-outlinedBg": theme.vars ? `rgba(${theme.vars.palette[color2].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[color2].main, theme.palette.action.hoverOpacity)
          }
        }
      }
    })), {
      props: {
        color: "inherit"
      },
      style: {
        color: "inherit",
        borderColor: "currentColor",
        "--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
            "--variant-textBg": theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
            "--variant-outlinedBg": theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity)
          }
        }
      }
    }, {
      props: {
        size: "small",
        variant: "text"
      },
      style: {
        padding: "4px 5px",
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "text"
      },
      style: {
        padding: "8px 11px",
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        padding: "3px 9px",
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "outlined"
      },
      style: {
        padding: "7px 21px",
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "contained"
      },
      style: {
        padding: "4px 10px",
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "contained"
      },
      style: {
        padding: "8px 22px",
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        disableElevation: true
      },
      style: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        },
        [`&.${buttonClasses_default.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${buttonClasses_default.disabled}`]: {
          boxShadow: "none"
        }
      }
    }, {
      props: {
        fullWidth: true
      },
      style: {
        width: "100%"
      }
    }, {
      props: {
        loadingPosition: "center"
      },
      style: {
        transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
          duration: theme.transitions.duration.short
        }),
        [`&.${buttonClasses_default.loading}`]: {
          color: "transparent"
        }
      }
    }]
  });
}));
var ButtonStartIcon = styled_default2("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.startIcon, ownerState.loading && styles3.startIconLoadingStart, styles3[`iconSize${capitalize_default(ownerState.size)}`]];
  }
})(({
  theme
}) => ({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginLeft: -2
    }
  }, {
    props: {
      loadingPosition: "start",
      loading: true
    },
    style: {
      transition: theme.transitions.create(["opacity"], {
        duration: theme.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: "start",
      loading: true,
      fullWidth: true
    },
    style: {
      marginRight: -8
    }
  }, ...commonIconStyles]
}));
var ButtonEndIcon = styled_default2("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.endIcon, ownerState.loading && styles3.endIconLoadingEnd, styles3[`iconSize${capitalize_default(ownerState.size)}`]];
  }
})(({
  theme
}) => ({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginRight: -2
    }
  }, {
    props: {
      loadingPosition: "end",
      loading: true
    },
    style: {
      transition: theme.transitions.create(["opacity"], {
        duration: theme.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: "end",
      loading: true,
      fullWidth: true
    },
    style: {
      marginLeft: -8
    }
  }, ...commonIconStyles]
}));
var ButtonLoadingIndicator = styled_default2("span", {
  name: "MuiButton",
  slot: "LoadingIndicator",
  overridesResolver: (props, styles3) => styles3.loadingIndicator
})(({
  theme
}) => ({
  display: "none",
  position: "absolute",
  visibility: "visible",
  variants: [{
    props: {
      loading: true
    },
    style: {
      display: "flex"
    }
  }, {
    props: {
      loadingPosition: "start"
    },
    style: {
      left: 14
    }
  }, {
    props: {
      loadingPosition: "start",
      size: "small"
    },
    style: {
      left: 10
    }
  }, {
    props: {
      variant: "text",
      loadingPosition: "start"
    },
    style: {
      left: 6
    }
  }, {
    props: {
      loadingPosition: "center"
    },
    style: {
      left: "50%",
      transform: "translate(-50%)",
      color: (theme.vars || theme).palette.action.disabled
    }
  }, {
    props: {
      loadingPosition: "end"
    },
    style: {
      right: 14
    }
  }, {
    props: {
      loadingPosition: "end",
      size: "small"
    },
    style: {
      right: 10
    }
  }, {
    props: {
      variant: "text",
      loadingPosition: "end"
    },
    style: {
      right: 6
    }
  }, {
    props: {
      loadingPosition: "start",
      fullWidth: true
    },
    style: {
      position: "relative",
      left: -10
    }
  }, {
    props: {
      loadingPosition: "end",
      fullWidth: true
    },
    style: {
      position: "relative",
      right: -10
    }
  }]
}));
var ButtonLoadingIconPlaceholder = styled_default2("span", {
  name: "MuiButton",
  slot: "LoadingIconPlaceholder",
  overridesResolver: (props, styles3) => styles3.loadingIconPlaceholder
})({
  display: "inline-block",
  width: "1em",
  height: "1em"
});
var Button = /* @__PURE__ */ React42.forwardRef(function Button2(inProps, ref) {
  const contextProps = React42.useContext(ButtonGroupContext_default);
  const buttonGroupButtonContextPositionClassName = React42.useContext(ButtonGroupButtonContext_default);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps2({
    props: resolvedProps,
    name: "MuiButton"
  });
  const _a = props, {
    children,
    color: color2 = "primary",
    component = "button",
    className,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    id: idProp,
    loading = null,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = "center",
    size = "medium",
    startIcon: startIconProp,
    type,
    variant = "text"
  } = _a, other = __objRest(_a, [
    "children",
    "color",
    "component",
    "className",
    "disabled",
    "disableElevation",
    "disableFocusRipple",
    "endIcon",
    "focusVisibleClassName",
    "fullWidth",
    "id",
    "loading",
    "loadingIndicator",
    "loadingPosition",
    "size",
    "startIcon",
    "type",
    "variant"
  ]);
  const loadingId = useId_default(idProp);
  const loadingIndicator = loadingIndicatorProp != null ? loadingIndicatorProp : /* @__PURE__ */ _jsx19(CircularProgress_default, {
    "aria-labelledby": loadingId,
    color: "inherit",
    size: 16
  });
  const ownerState = __spreadProps(__spreadValues({}, props), {
    color: color2,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    loading,
    loadingIndicator,
    loadingPosition,
    size,
    type,
    variant
  });
  const classes = useUtilityClasses9(ownerState);
  const startIcon = (startIconProp || loading && loadingPosition === "start") && /* @__PURE__ */ _jsx19(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState,
    children: startIconProp || /* @__PURE__ */ _jsx19(ButtonLoadingIconPlaceholder, {
      className: classes.loadingIconPlaceholder,
      ownerState
    })
  });
  const endIcon = (endIconProp || loading && loadingPosition === "end") && /* @__PURE__ */ _jsx19(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState,
    children: endIconProp || /* @__PURE__ */ _jsx19(ButtonLoadingIconPlaceholder, {
      className: classes.loadingIconPlaceholder,
      ownerState
    })
  });
  const positionClassName = buttonGroupButtonContextPositionClassName || "";
  const loader = typeof loading === "boolean" ? (
    // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ _jsx19("span", {
      className: classes.loadingWrapper,
      style: {
        display: "contents"
      },
      children: loading && /* @__PURE__ */ _jsx19(ButtonLoadingIndicator, {
        className: classes.loadingIndicator,
        ownerState,
        children: loadingIndicator
      })
    })
  ) : null;
  return /* @__PURE__ */ _jsxs4(ButtonRoot, __spreadProps(__spreadValues({
    ownerState,
    className: clsx_default(contextProps.className, classes.root, className, positionClassName),
    component,
    disabled: disabled || loading,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_default(classes.focusVisible, focusVisibleClassName),
    ref,
    type,
    id: loading ? loadingId : idProp
  }, other), {
    classes,
    children: [startIcon, loadingPosition !== "end" && loader, children, loadingPosition === "end" && loader, endIcon]
  }));
});
false ? Button.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: import_prop_types.default.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: import_prop_types.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: import_prop_types.default.bool,
  /**
   * Element placed after the children.
   */
  endIcon: import_prop_types.default.node,
  /**
   * @ignore
   */
  focusVisibleClassName: import_prop_types.default.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: import_prop_types.default.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: import_prop_types.default.string,
  /**
   * @ignore
   */
  id: import_prop_types.default.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: import_prop_types.default.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: import_prop_types.default.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: import_prop_types.default.oneOf(["center", "end", "start"]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["small", "medium", "large"]), import_prop_types.default.string]),
  /**
   * Element placed before the children.
   */
  startIcon: import_prop_types.default.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * @ignore
   */
  type: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["button", "reset", "submit"]), import_prop_types.default.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["contained", "outlined", "text"]), import_prop_types.default.string])
} : void 0;
var Button_default = Button;

// node_modules/@mui/material/esm/Container/Container.js
var Container = createContainer({
  createStyledComponent: styled_default2("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (props, styles3) => {
      const {
        ownerState
      } = props;
      return [styles3.root, styles3[`maxWidth${capitalize_default(String(ownerState.maxWidth))}`], ownerState.fixed && styles3.fixed, ownerState.disableGutters && styles3.disableGutters];
    }
  }),
  useThemeProps: (inProps) => useDefaultProps2({
    props: inProps,
    name: "MuiContainer"
  })
});
false ? Container.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: import_prop_types.default.bool,
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed: import_prop_types.default.bool,
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Container_default = Container;

// node_modules/@mui/material/esm/Grow/Grow.js
import * as React43 from "react";
import { jsx as _jsx20 } from "react/jsx-runtime";
function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}
var styles2 = {
  entering: {
    opacity: 1,
    transform: getScale(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
};
var isWebKit154 = typeof navigator !== "undefined" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent);
var Grow = /* @__PURE__ */ React43.forwardRef(function Grow2(props, ref) {
  const _a = props, {
    addEndListener,
    appear = true,
    children,
    easing: easing2,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style: style3,
    timeout: timeout2 = "auto",
    TransitionComponent: TransitionComponent = Transition_default
  } = _a, other = __objRest(_a, [
    "addEndListener",
    "appear",
    "children",
    "easing",
    "in",
    "onEnter",
    "onEntered",
    "onEntering",
    "onExit",
    "onExited",
    "onExiting",
    "style",
    "timeout",
    // eslint-disable-next-line react/prop-types
    "TransitionComponent"
  ]);
  const timer = useTimeout();
  const autoTimeout = React43.useRef();
  const theme = useTheme4();
  const nodeRef = React43.useRef(null);
  const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node2 = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node2);
      } else {
        callback(node2, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node2, isAppearing) => {
    reflow(node2);
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style: style3,
      timeout: timeout2,
      easing: easing2
    }, {
      mode: "enter"
    });
    let duration2;
    if (timeout2 === "auto") {
      duration2 = theme.transitions.getAutoHeightDuration(node2.clientHeight);
      autoTimeout.current = duration2;
    } else {
      duration2 = transitionDuration;
    }
    node2.style.transition = [theme.transitions.create("opacity", {
      duration: duration2,
      delay
    }), theme.transitions.create("transform", {
      duration: isWebKit154 ? duration2 : duration2 * 0.666,
      delay,
      easing: transitionTimingFunction
    })].join(",");
    if (onEnter) {
      onEnter(node2, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node2) => {
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style: style3,
      timeout: timeout2,
      easing: easing2
    }, {
      mode: "exit"
    });
    let duration2;
    if (timeout2 === "auto") {
      duration2 = theme.transitions.getAutoHeightDuration(node2.clientHeight);
      autoTimeout.current = duration2;
    } else {
      duration2 = transitionDuration;
    }
    node2.style.transition = [theme.transitions.create("opacity", {
      duration: duration2,
      delay
    }), theme.transitions.create("transform", {
      duration: isWebKit154 ? duration2 : duration2 * 0.666,
      delay: isWebKit154 ? delay : delay || duration2 * 0.333,
      easing: transitionTimingFunction
    })].join(",");
    node2.style.opacity = 0;
    node2.style.transform = getScale(0.75);
    if (onExit) {
      onExit(node2);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next2) => {
    if (timeout2 === "auto") {
      timer.start(autoTimeout.current || 0, next2);
    }
    if (addEndListener) {
      addEndListener(nodeRef.current, next2);
    }
  };
  return /* @__PURE__ */ _jsx20(TransitionComponent, __spreadProps(__spreadValues({
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout: timeout2 === "auto" ? null : timeout2
  }, other), {
    children: (state, _b) => {
      var _c = _b, {
        ownerState
      } = _c, restChildProps = __objRest(_c, [
        "ownerState"
      ]);
      return /* @__PURE__ */ React43.cloneElement(children, __spreadValues({
        style: __spreadValues(__spreadValues(__spreadValues({
          opacity: 0,
          transform: getScale(0.75),
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles2[state]), style3), children.props.style),
        ref: handleRef
      }, restChildProps));
    }
  }));
});
false ? Grow.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: import_prop_types.default.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: import_prop_types.default.bool,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: import_prop_types.default.oneOfType([import_prop_types.default.shape({
    enter: import_prop_types.default.string,
    exit: import_prop_types.default.string
  }), import_prop_types.default.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: import_prop_types.default.bool,
  /**
   * @ignore
   */
  onEnter: import_prop_types.default.func,
  /**
   * @ignore
   */
  onEntered: import_prop_types.default.func,
  /**
   * @ignore
   */
  onEntering: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExit: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExited: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExiting: import_prop_types.default.func,
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["auto"]), import_prop_types.default.number, import_prop_types.default.shape({
    appear: import_prop_types.default.number,
    enter: import_prop_types.default.number,
    exit: import_prop_types.default.number
  })])
} : void 0;
if (Grow) {
  Grow.muiSupportAuto = true;
}
var Grow_default = Grow;

// node_modules/@mui/material/esm/Link/Link.js
import * as React44 from "react";

// node_modules/@mui/material/esm/Link/linkClasses.js
function getLinkUtilityClass(slot) {
  return generateUtilityClass("MuiLink", slot);
}
var linkClasses = generateUtilityClasses("MuiLink", ["root", "underlineNone", "underlineHover", "underlineAlways", "button", "focusVisible"]);
var linkClasses_default = linkClasses;

// node_modules/@mui/material/esm/Link/getTextDecoration.js
var getTextDecoration = ({
  theme,
  ownerState
}) => {
  const transformedColor = ownerState.color;
  const color2 = getPath(theme, `palette.${transformedColor}.main`, false) || getPath(theme, `palette.${transformedColor}`, false) || ownerState.color;
  const channelColor = getPath(theme, `palette.${transformedColor}.mainChannel`) || getPath(theme, `palette.${transformedColor}Channel`);
  if ("vars" in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }
  return alpha(color2, 0.4);
};
var getTextDecoration_default = getTextDecoration;

// node_modules/@mui/material/esm/Link/Link.js
import { jsx as _jsx21 } from "react/jsx-runtime";
var v6Colors2 = {
  primary: true,
  secondary: true,
  error: true,
  info: true,
  success: true,
  warning: true,
  textPrimary: true,
  textSecondary: true,
  textDisabled: true
};
var useUtilityClasses10 = (ownerState) => {
  const {
    classes,
    component,
    focusVisible,
    underline
  } = ownerState;
  const slots = {
    root: ["root", `underline${capitalize_default(underline)}`, component === "button" && "button", focusVisible && "focusVisible"]
  };
  return composeClasses(slots, getLinkUtilityClass, classes);
};
var LinkRoot = styled_default2(Typography_default, {
  name: "MuiLink",
  slot: "Root",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, styles3[`underline${capitalize_default(ownerState.underline)}`], ownerState.component === "button" && styles3.button];
  }
})(memoTheme_default(({
  theme
}) => {
  return {
    variants: [{
      props: {
        underline: "none"
      },
      style: {
        textDecoration: "none"
      }
    }, {
      props: {
        underline: "hover"
      },
      style: {
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline"
        }
      }
    }, {
      props: {
        underline: "always"
      },
      style: {
        textDecoration: "underline",
        "&:hover": {
          textDecorationColor: "inherit"
        }
      }
    }, {
      props: ({
        underline,
        ownerState
      }) => underline === "always" && ownerState.color !== "inherit",
      style: {
        textDecorationColor: "var(--Link-underlineColor)"
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color2]) => ({
      props: {
        underline: "always",
        color: color2
      },
      style: {
        "--Link-underlineColor": theme.vars ? `rgba(${theme.vars.palette[color2].mainChannel} / 0.4)` : alpha(theme.palette[color2].main, 0.4)
      }
    })), {
      props: {
        underline: "always",
        color: "textPrimary"
      },
      style: {
        "--Link-underlineColor": theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.4)` : alpha(theme.palette.text.primary, 0.4)
      }
    }, {
      props: {
        underline: "always",
        color: "textSecondary"
      },
      style: {
        "--Link-underlineColor": theme.vars ? `rgba(${theme.vars.palette.text.secondaryChannel} / 0.4)` : alpha(theme.palette.text.secondary, 0.4)
      }
    }, {
      props: {
        underline: "always",
        color: "textDisabled"
      },
      style: {
        "--Link-underlineColor": (theme.vars || theme).palette.text.disabled
      }
    }, {
      props: {
        component: "button"
      },
      style: {
        position: "relative",
        WebkitTapHighlightColor: "transparent",
        backgroundColor: "transparent",
        // Reset default value
        // We disable the focus ring for mouse, touch and keyboard users.
        outline: 0,
        border: 0,
        margin: 0,
        // Remove the margin in Safari
        borderRadius: 0,
        padding: 0,
        // Remove the padding in Firefox
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        MozAppearance: "none",
        // Reset
        WebkitAppearance: "none",
        // Reset
        "&::-moz-focus-inner": {
          borderStyle: "none"
          // Remove Firefox dotted outline.
        },
        [`&.${linkClasses_default.focusVisible}`]: {
          outline: "auto"
        }
      }
    }]
  };
}));
var Link = /* @__PURE__ */ React44.forwardRef(function Link2(inProps, ref) {
  const props = useDefaultProps2({
    props: inProps,
    name: "MuiLink"
  });
  const theme = useTheme4();
  const _a = props, {
    className,
    color: color2 = "primary",
    component = "a",
    onBlur,
    onFocus,
    TypographyClasses,
    underline = "always",
    variant = "inherit",
    sx
  } = _a, other = __objRest(_a, [
    "className",
    "color",
    "component",
    "onBlur",
    "onFocus",
    "TypographyClasses",
    "underline",
    "variant",
    "sx"
  ]);
  const [focusVisible, setFocusVisible] = React44.useState(false);
  const handleBlur = (event) => {
    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = (event) => {
    if (isFocusVisible(event.target)) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  const ownerState = __spreadProps(__spreadValues({}, props), {
    color: color2,
    component,
    focusVisible,
    underline,
    variant
  });
  const classes = useUtilityClasses10(ownerState);
  return /* @__PURE__ */ _jsx21(LinkRoot, __spreadProps(__spreadValues({
    color: color2,
    className: clsx_default(classes.root, className),
    classes: TypographyClasses,
    component,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ref,
    ownerState,
    variant
  }, other), {
    sx: [...v6Colors2[color2] === void 0 ? [{
      color: color2
    }] : [], ...Array.isArray(sx) ? sx : [sx]],
    style: __spreadValues(__spreadValues({}, other.style), underline === "always" && color2 !== "inherit" && !v6Colors2[color2] && {
      "--Link-underlineColor": getTextDecoration_default({
        theme,
        ownerState
      })
    })
  }));
});
false ? Link.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the link.
   * @default 'primary'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef_default,
  /**
   * @ignore
   */
  onBlur: import_prop_types.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types.default.func,
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * `classes` prop applied to the [`Typography`](https://mui.com/material-ui/api/typography/) element.
   */
  TypographyClasses: import_prop_types.default.object,
  /**
   * Controls when the link should have an underline.
   * @default 'always'
   */
  underline: import_prop_types.default.oneOf(["always", "hover", "none"]),
  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), import_prop_types.default.string])
} : void 0;
var Link_default = Link;

// node_modules/@mui/material/esm/Tooltip/Tooltip.js
import * as React45 from "react";

// node_modules/@mui/material/esm/Tooltip/tooltipClasses.js
function getTooltipUtilityClass(slot) {
  return generateUtilityClass("MuiTooltip", slot);
}
var tooltipClasses = generateUtilityClasses("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);
var tooltipClasses_default = tooltipClasses;

// node_modules/@mui/material/esm/Tooltip/Tooltip.js
import { jsx as _jsx22, jsxs as _jsxs5 } from "react/jsx-runtime";
function round3(value) {
  return Math.round(value * 1e5) / 1e5;
}
var useUtilityClasses11 = (ownerState) => {
  const {
    classes,
    disableInteractive,
    arrow: arrow2,
    touch,
    placement
  } = ownerState;
  const slots = {
    popper: ["popper", !disableInteractive && "popperInteractive", arrow2 && "popperArrow"],
    tooltip: ["tooltip", arrow2 && "tooltipArrow", touch && "touch", `tooltipPlacement${capitalize_default(placement.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return composeClasses(slots, getTooltipUtilityClass, classes);
};
var TooltipPopper = styled_default2(Popper_default, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.popper, !ownerState.disableInteractive && styles3.popperInteractive, ownerState.arrow && styles3.popperArrow, !ownerState.open && styles3.popperClose];
  }
})(memoTheme_default(({
  theme
}) => ({
  zIndex: (theme.vars || theme).zIndex.tooltip,
  pointerEvents: "none",
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disableInteractive,
    style: {
      pointerEvents: "auto"
    }
  }, {
    props: ({
      open
    }) => !open,
    style: {
      pointerEvents: "none"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow,
    style: {
      [`&[data-popper-placement*="bottom"] .${tooltipClasses_default.arrow}`]: {
        top: 0,
        marginTop: "-0.71em",
        "&::before": {
          transformOrigin: "0 100%"
        }
      },
      [`&[data-popper-placement*="top"] .${tooltipClasses_default.arrow}`]: {
        bottom: 0,
        marginBottom: "-0.71em",
        "&::before": {
          transformOrigin: "100% 0"
        }
      },
      [`&[data-popper-placement*="right"] .${tooltipClasses_default.arrow}`]: {
        height: "1em",
        width: "0.71em",
        "&::before": {
          transformOrigin: "100% 100%"
        }
      },
      [`&[data-popper-placement*="left"] .${tooltipClasses_default.arrow}`]: {
        height: "1em",
        width: "0.71em",
        "&::before": {
          transformOrigin: "0 0"
        }
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow && !ownerState.isRtl,
    style: {
      [`&[data-popper-placement*="right"] .${tooltipClasses_default.arrow}`]: {
        left: 0,
        marginLeft: "-0.71em"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow && !!ownerState.isRtl,
    style: {
      [`&[data-popper-placement*="right"] .${tooltipClasses_default.arrow}`]: {
        right: 0,
        marginRight: "-0.71em"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow && !ownerState.isRtl,
    style: {
      [`&[data-popper-placement*="left"] .${tooltipClasses_default.arrow}`]: {
        right: 0,
        marginRight: "-0.71em"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow && !!ownerState.isRtl,
    style: {
      [`&[data-popper-placement*="left"] .${tooltipClasses_default.arrow}`]: {
        left: 0,
        marginLeft: "-0.71em"
      }
    }
  }]
})));
var TooltipTooltip = styled_default2("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.tooltip, ownerState.touch && styles3.touch, ownerState.arrow && styles3.tooltipArrow, styles3[`tooltipPlacement${capitalize_default(ownerState.placement.split("-")[0])}`]];
  }
})(memoTheme_default(({
  theme
}) => ({
  backgroundColor: theme.vars ? theme.vars.palette.Tooltip.bg : alpha(theme.palette.grey[700], 0.92),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  color: (theme.vars || theme).palette.common.white,
  fontFamily: theme.typography.fontFamily,
  padding: "4px 8px",
  fontSize: theme.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: theme.typography.fontWeightMedium,
  [`.${tooltipClasses_default.popper}[data-popper-placement*="left"] &`]: {
    transformOrigin: "right center"
  },
  [`.${tooltipClasses_default.popper}[data-popper-placement*="right"] &`]: {
    transformOrigin: "left center"
  },
  [`.${tooltipClasses_default.popper}[data-popper-placement*="top"] &`]: {
    transformOrigin: "center bottom",
    marginBottom: "14px"
  },
  [`.${tooltipClasses_default.popper}[data-popper-placement*="bottom"] &`]: {
    transformOrigin: "center top",
    marginTop: "14px"
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.arrow,
    style: {
      position: "relative",
      margin: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.touch,
    style: {
      padding: "8px 16px",
      fontSize: theme.typography.pxToRem(14),
      lineHeight: `${round3(16 / 14)}em`,
      fontWeight: theme.typography.fontWeightRegular
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.isRtl,
    style: {
      [`.${tooltipClasses_default.popper}[data-popper-placement*="left"] &`]: {
        marginRight: "14px"
      },
      [`.${tooltipClasses_default.popper}[data-popper-placement*="right"] &`]: {
        marginLeft: "14px"
      }
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.isRtl && ownerState.touch,
    style: {
      [`.${tooltipClasses_default.popper}[data-popper-placement*="left"] &`]: {
        marginRight: "24px"
      },
      [`.${tooltipClasses_default.popper}[data-popper-placement*="right"] &`]: {
        marginLeft: "24px"
      }
    }
  }, {
    props: ({
      ownerState
    }) => !!ownerState.isRtl,
    style: {
      [`.${tooltipClasses_default.popper}[data-popper-placement*="left"] &`]: {
        marginLeft: "14px"
      },
      [`.${tooltipClasses_default.popper}[data-popper-placement*="right"] &`]: {
        marginRight: "14px"
      }
    }
  }, {
    props: ({
      ownerState
    }) => !!ownerState.isRtl && ownerState.touch,
    style: {
      [`.${tooltipClasses_default.popper}[data-popper-placement*="left"] &`]: {
        marginLeft: "24px"
      },
      [`.${tooltipClasses_default.popper}[data-popper-placement*="right"] &`]: {
        marginRight: "24px"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.touch,
    style: {
      [`.${tooltipClasses_default.popper}[data-popper-placement*="top"] &`]: {
        marginBottom: "24px"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.touch,
    style: {
      [`.${tooltipClasses_default.popper}[data-popper-placement*="bottom"] &`]: {
        marginTop: "24px"
      }
    }
  }]
})));
var TooltipArrow = styled_default2("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (props, styles3) => styles3.arrow
})(memoTheme_default(({
  theme
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: theme.vars ? theme.vars.palette.Tooltip.bg : alpha(theme.palette.grey[700], 0.9),
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)"
  }
})));
var hystersisOpen = false;
var hystersisTimer = new Timeout();
var cursorPosition = {
  x: 0,
  y: 0
};
function composeEventHandler(handler, eventHandler) {
  return (event, ...params) => {
    if (eventHandler) {
      eventHandler(event, ...params);
    }
    handler(event, ...params);
  };
}
var Tooltip = /* @__PURE__ */ React45.forwardRef(function Tooltip2(inProps, ref) {
  var _b, _c, _d;
  const props = useDefaultProps2({
    props: inProps,
    name: "MuiTooltip"
  });
  const _a = props, {
    arrow: arrow2 = false,
    children: childrenProp,
    classes: classesProp,
    components = {},
    componentsProps = {},
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = "bottom",
    PopperComponent: PopperComponentProp,
    PopperProps = {},
    slotProps = {},
    slots = {},
    title,
    TransitionComponent: TransitionComponentProp,
    TransitionProps
  } = _a, other = __objRest(_a, [
    "arrow",
    "children",
    "classes",
    "components",
    "componentsProps",
    "describeChild",
    "disableFocusListener",
    "disableHoverListener",
    "disableInteractive",
    "disableTouchListener",
    "enterDelay",
    "enterNextDelay",
    "enterTouchDelay",
    "followCursor",
    "id",
    "leaveDelay",
    "leaveTouchDelay",
    "onClose",
    "onOpen",
    "open",
    "placement",
    "PopperComponent",
    "PopperProps",
    "slotProps",
    "slots",
    "title",
    "TransitionComponent",
    "TransitionProps"
  ]);
  const children = /* @__PURE__ */ React45.isValidElement(childrenProp) ? childrenProp : /* @__PURE__ */ _jsx22("span", {
    children: childrenProp
  });
  const theme = useTheme4();
  const isRtl = useRtl();
  const [childNode, setChildNode] = React45.useState();
  const [arrowRef, setArrowRef] = React45.useState(null);
  const ignoreNonTouchEvents = React45.useRef(false);
  const disableInteractive = disableInteractiveProp || followCursor;
  const closeTimer = useTimeout();
  const enterTimer = useTimeout();
  const leaveTimer = useTimeout();
  const touchTimer = useTimeout();
  const [openState, setOpenState] = useControlled_default({
    controlled: openProp,
    default: false,
    name: "Tooltip",
    state: "open"
  });
  let open = openState;
  if (false) {
    const {
      current: isControlled
    } = React45.useRef(openProp !== void 0);
    React45.useEffect(() => {
      if (childNode && childNode.disabled && !isControlled && title !== "" && childNode.tagName.toLowerCase() === "button") {
        console.warn(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join("\n"));
      }
    }, [title, childNode, isControlled]);
  }
  const id = useId_default(idProp);
  const prevUserSelect = React45.useRef();
  const stopTouchInteraction = useEventCallback_default2(() => {
    if (prevUserSelect.current !== void 0) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = void 0;
    }
    touchTimer.clear();
  });
  React45.useEffect(() => stopTouchInteraction, [stopTouchInteraction]);
  const handleOpen = (event) => {
    hystersisTimer.clear();
    hystersisOpen = true;
    setOpenState(true);
    if (onOpen && !open) {
      onOpen(event);
    }
  };
  const handleClose = useEventCallback_default2(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (event) => {
      hystersisTimer.start(800 + leaveDelay, () => {
        hystersisOpen = false;
      });
      setOpenState(false);
      if (onClose && open) {
        onClose(event);
      }
      closeTimer.start(theme.transitions.duration.shortest, () => {
        ignoreNonTouchEvents.current = false;
      });
    }
  );
  const handleMouseOver = (event) => {
    if (ignoreNonTouchEvents.current && event.type !== "touchstart") {
      return;
    }
    if (childNode) {
      childNode.removeAttribute("title");
    }
    enterTimer.clear();
    leaveTimer.clear();
    if (enterDelay || hystersisOpen && enterNextDelay) {
      enterTimer.start(hystersisOpen ? enterNextDelay : enterDelay, () => {
        handleOpen(event);
      });
    } else {
      handleOpen(event);
    }
  };
  const handleMouseLeave = (event) => {
    enterTimer.clear();
    leaveTimer.start(leaveDelay, () => {
      handleClose(event);
    });
  };
  const [, setChildIsFocusVisible] = React45.useState(false);
  const handleBlur = (event) => {
    if (!isFocusVisible(event.target)) {
      setChildIsFocusVisible(false);
      handleMouseLeave(event);
    }
  };
  const handleFocus = (event) => {
    if (!childNode) {
      setChildNode(event.currentTarget);
    }
    if (isFocusVisible(event.target)) {
      setChildIsFocusVisible(true);
      handleMouseOver(event);
    }
  };
  const detectTouchStart = (event) => {
    ignoreNonTouchEvents.current = true;
    const childrenProps2 = children.props;
    if (childrenProps2.onTouchStart) {
      childrenProps2.onTouchStart(event);
    }
  };
  const handleTouchStart = (event) => {
    detectTouchStart(event);
    leaveTimer.clear();
    closeTimer.clear();
    stopTouchInteraction();
    prevUserSelect.current = document.body.style.WebkitUserSelect;
    document.body.style.WebkitUserSelect = "none";
    touchTimer.start(enterTouchDelay, () => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleMouseOver(event);
    });
  };
  const handleTouchEnd = (event) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }
    stopTouchInteraction();
    leaveTimer.start(leaveTouchDelay, () => {
      handleClose(event);
    });
  };
  React45.useEffect(() => {
    if (!open) {
      return void 0;
    }
    function handleKeyDown(nativeEvent) {
      if (nativeEvent.key === "Escape") {
        handleClose(nativeEvent);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, open]);
  const handleRef = useForkRef_default(getReactElementRef(children), setChildNode, ref);
  if (!title && title !== 0) {
    open = false;
  }
  const popperRef = React45.useRef();
  const handleMouseMove = (event) => {
    const childrenProps2 = children.props;
    if (childrenProps2.onMouseMove) {
      childrenProps2.onMouseMove(event);
    }
    cursorPosition = {
      x: event.clientX,
      y: event.clientY
    };
    if (popperRef.current) {
      popperRef.current.update();
    }
  };
  const nameOrDescProps = {};
  const titleIsString = typeof title === "string";
  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps["aria-describedby"] = open ? id : null;
  } else {
    nameOrDescProps["aria-label"] = titleIsString ? title : null;
    nameOrDescProps["aria-labelledby"] = open && !titleIsString ? id : null;
  }
  const childrenProps = __spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues({}, nameOrDescProps), other), children.props), {
    className: clsx_default(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  }), followCursor ? {
    onMouseMove: handleMouseMove
  } : {});
  if (false) {
    childrenProps["data-mui-internal-clone-element"] = true;
    React45.useEffect(() => {
      if (childNode && !childNode.getAttribute("data-mui-internal-clone-element")) {
        console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join("\n"));
      }
    }, [childNode]);
  }
  const interactiveWrapperListeners = {};
  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }
  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);
    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }
  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);
    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }
  if (false) {
    if (children.props.title) {
      console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${children.props.title}\` or the Tooltip component.`].join("\n"));
    }
  }
  const ownerState = __spreadProps(__spreadValues({}, props), {
    isRtl,
    arrow: arrow2,
    disableInteractive,
    placement,
    PopperComponentProp,
    touch: ignoreNonTouchEvents.current
  });
  const resolvedPopperProps = typeof slotProps.popper === "function" ? slotProps.popper(ownerState) : slotProps.popper;
  const popperOptions = React45.useMemo(() => {
    var _a2, _b2;
    let tooltipModifiers = [{
      name: "arrow",
      enabled: Boolean(arrowRef),
      options: {
        element: arrowRef,
        padding: 4
      }
    }];
    if ((_a2 = PopperProps.popperOptions) == null ? void 0 : _a2.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
    }
    if ((_b2 = resolvedPopperProps == null ? void 0 : resolvedPopperProps.popperOptions) == null ? void 0 : _b2.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(resolvedPopperProps.popperOptions.modifiers);
    }
    return __spreadProps(__spreadValues(__spreadValues({}, PopperProps.popperOptions), resolvedPopperProps == null ? void 0 : resolvedPopperProps.popperOptions), {
      modifiers: tooltipModifiers
    });
  }, [arrowRef, PopperProps.popperOptions, resolvedPopperProps == null ? void 0 : resolvedPopperProps.popperOptions]);
  const classes = useUtilityClasses11(ownerState);
  const resolvedTransitionProps = typeof slotProps.transition === "function" ? slotProps.transition(ownerState) : slotProps.transition;
  const externalForwardedProps = {
    slots: __spreadValues({
      popper: components.Popper,
      transition: (_b = components.Transition) != null ? _b : TransitionComponentProp,
      tooltip: components.Tooltip,
      arrow: components.Arrow
    }, slots),
    slotProps: {
      arrow: (_c = slotProps.arrow) != null ? _c : componentsProps.arrow,
      popper: __spreadValues(__spreadValues({}, PopperProps), resolvedPopperProps != null ? resolvedPopperProps : componentsProps.popper),
      // resolvedPopperProps can be spread because it's already an object
      tooltip: (_d = slotProps.tooltip) != null ? _d : componentsProps.tooltip,
      transition: __spreadValues(__spreadValues({}, TransitionProps), resolvedTransitionProps != null ? resolvedTransitionProps : componentsProps.transition)
    }
  };
  const [PopperSlot, popperSlotProps] = useSlot("popper", {
    elementType: TooltipPopper,
    externalForwardedProps,
    ownerState,
    className: clsx_default(classes.popper, PopperProps == null ? void 0 : PopperProps.className)
  });
  const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
    elementType: Grow_default,
    externalForwardedProps,
    ownerState
  });
  const [TooltipSlot, tooltipSlotProps] = useSlot("tooltip", {
    elementType: TooltipTooltip,
    className: classes.tooltip,
    externalForwardedProps,
    ownerState
  });
  const [ArrowSlot, arrowSlotProps] = useSlot("arrow", {
    elementType: TooltipArrow,
    className: classes.arrow,
    externalForwardedProps,
    ownerState,
    ref: setArrowRef
  });
  return /* @__PURE__ */ _jsxs5(React45.Fragment, {
    children: [/* @__PURE__ */ React45.cloneElement(children, childrenProps), /* @__PURE__ */ _jsx22(PopperSlot, __spreadProps(__spreadValues(__spreadValues({
      as: PopperComponentProp != null ? PopperComponentProp : Popper_default,
      placement,
      anchorEl: followCursor ? {
        getBoundingClientRect: () => ({
          top: cursorPosition.y,
          left: cursorPosition.x,
          right: cursorPosition.x,
          bottom: cursorPosition.y,
          width: 0,
          height: 0
        })
      } : childNode,
      popperRef,
      open: childNode ? open : false,
      id,
      transition: true
    }, interactiveWrapperListeners), popperSlotProps), {
      popperOptions,
      children: ({
        TransitionProps: TransitionPropsInner
      }) => /* @__PURE__ */ _jsx22(TransitionSlot, __spreadProps(__spreadValues(__spreadValues({
        timeout: theme.transitions.duration.shorter
      }, TransitionPropsInner), transitionSlotProps), {
        children: /* @__PURE__ */ _jsxs5(TooltipSlot, __spreadProps(__spreadValues({}, tooltipSlotProps), {
          children: [title, arrow2 ? /* @__PURE__ */ _jsx22(ArrowSlot, __spreadValues({}, arrowSlotProps)) : null]
        }))
      }))
    }))]
  });
});
false ? Tooltip.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: import_prop_types.default.bool,
  /**
   * Tooltip reference element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: import_prop_types.default.shape({
    Arrow: import_prop_types.default.elementType,
    Popper: import_prop_types.default.elementType,
    Tooltip: import_prop_types.default.elementType,
    Transition: import_prop_types.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: import_prop_types.default.shape({
    arrow: import_prop_types.default.object,
    popper: import_prop_types.default.object,
    tooltip: import_prop_types.default.object,
    transition: import_prop_types.default.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: import_prop_types.default.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: import_prop_types.default.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: import_prop_types.default.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: import_prop_types.default.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: import_prop_types.default.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: import_prop_types.default.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: import_prop_types.default.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: import_prop_types.default.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: import_prop_types.default.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: import_prop_types.default.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: import_prop_types.default.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: import_prop_types.default.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: import_prop_types.default.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: import_prop_types.default.func,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types.default.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: import_prop_types.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @deprecated use the `slots.popper` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  PopperComponent: import_prop_types.default.elementType,
  /**
   * Props applied to the [`Popper`](https://mui.com/material-ui/api/popper/) element.
   * @deprecated use the `slotProps.popper` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  PopperProps: import_prop_types.default.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    arrow: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    popper: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    tooltip: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    transition: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    arrow: import_prop_types.default.elementType,
    popper: import_prop_types.default.elementType,
    tooltip: import_prop_types.default.elementType,
    transition: import_prop_types.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: import_prop_types.default.node,
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @deprecated use the `slots.transition` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionComponent: import_prop_types.default.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated use the `slotProps.transition` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  TransitionProps: import_prop_types.default.object
} : void 0;
var Tooltip_default = Tooltip;

// src/interactive.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var dccs = [
  {
    id: "65af85ae-82d5-5b81-bc66-6bddaa6420ce",
    short_label: "Kids First",
    homepage: "https://info.cfde.cloud/dccs/Kids First",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/Kids First.png",
    description: "Data, tools, and resources empowering pediatric research"
  },
  {
    id: "e332dadd-8084-5fbc-be41-29d75775aab3",
    short_label: "A2CPS",
    homepage: "https://info.cfde.cloud/dccs/A2CPS",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/A2CPS.png",
    description: "Understanding the complex biological processes underlying chronic pain"
  },
  {
    id: "803ad44d-e7a2-550a-95c6-57855bf06be8",
    short_label: "HuBMAP",
    homepage: "https://info.cfde.cloud/dccs/HuBMAP",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/HuBMAP.png",
    description: "Cellular spatial atlas of the human body"
  },
  {
    id: "d6bb00c3-7224-5001-b9c5-9838622fba40",
    short_label: "4DN",
    homepage: "https://info.cfde.cloud/dccs/4DN",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/4DN.png",
    description: "Nuclear organization in space and time"
  },
  {
    id: "f3f490cf-fd69-579c-8ea3-472c7cf3fb59",
    short_label: "LINCS",
    homepage: "https://info.cfde.cloud/dccs/LINCS",
    icon: "https://cfde-drc.s3.amazonaws.com/assets/img/LINCS-logo.png",
    description: "Omics signatures for drug & target discovery"
  },
  {
    id: "a1289ebb-0306-59a1-b0fc-e4d03a4790d7",
    short_label: "IDG",
    homepage: "https://info.cfde.cloud/dccs/IDG",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/IDG.png",
    description: "Illuminating GPCRs, kinases, ion channels, & other drug targets"
  },
  {
    id: void 0,
    short_label: "NPH",
    homepage: "https://commonfund.nih.gov/nutritionforprecisionhealth",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/nph.png",
    description: "Predictive algorithms to advance nutrition research"
  },
  {
    id: "e31052b0-ac50-5ede-9828-698ff3610427",
    short_label: "GlyGen",
    homepage: "https://info.cfde.cloud/dccs/GlyGen",
    icon: "https://cfde-drc.s3.amazonaws.com/assets/img/glygen.png",
    description: "Computational and informatics resources for glycoscience"
  },
  {
    id: "75b3be39-a021-5d80-b7e2-2a7938a1e11a",
    short_label: "Bridge2AI",
    homepage: "https://info.cfde.cloud/dccs/Bridge2AI",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/Bridge2AI.png",
    description: "Biomedical AI \u2194 people, data & ethics"
  },
  {
    id: "a9aeab22-4fbc-5329-aef6-21110f463c23",
    short_label: "MoTrPAC",
    homepage: "https://info.cfde.cloud/dccs/MoTrPAC",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/MoTrPAC.png",
    description: "The molecular map of exercise"
  },
  {
    id: "089d8d63-3364-526f-9706-80d62d0ec88c",
    short_label: "Metabolomics",
    homepage: "https://info.cfde.cloud/dccs/Metabolomics",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/Metabolomics.png",
    description: "Metabolomics"
  },
  {
    id: void 0,
    short_label: "SCGE",
    homepage: "https://commonfund.nih.gov/editing",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/scge.png",
    description: "Reducing the burden of diseases caused by genetic changes"
  },
  {
    id: "2399794e-74c6-5735-a039-0782cdeeb1e2",
    short_label: "SPARC",
    homepage: "https://info.cfde.cloud/dccs/SPARC",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/SPARC.svg",
    description: "Bridging the body and brain"
  },
  {
    id: void 0,
    short_label: "SMaHT",
    homepage: "https://info.cfde.cloud/dcc/SMaHT",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/smath.png",
    description: "Mapping somatic mutations' health implications"
  },
  {
    id: "cbfd44b8-684d-56b9-bfd4-45c0e259f896",
    short_label: "HMP",
    homepage: "https://info.cfde.cloud/dccs/HMP",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/HMP.png",
    description: "Human microbiome in health and disease"
  },
  {
    id: "b3028db2-209c-5862-8f4d-33c5b312332e",
    short_label: "GTEx",
    homepage: "https://info.cfde.cloud/dccs/GTEx",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/GTEx.png",
    description: "Gene expression and regulation across human tissues"
  },
  {
    id: "dd66e8a5-0e05-5a43-a0ca-18cc3698bb36",
    short_label: "SenNet",
    homepage: "https://info.cfde.cloud/dccs/SenNet",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/SenNet.png",
    description: "Mapping senescent cells"
  },
  {
    id: "f65babf7-2875-5725-9635-210d654533f1",
    short_label: "ExRNA",
    homepage: "https://info.cfde.cloud/dccs/ExRNA",
    icon: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/exRNA.png",
    description: "Extracellular RNA communication"
  }
];
var centers = [
  {
    label: "cloud",
    endpoint: "https://info.cfde.cloud/centers/CWIC",
    rotate: "-72deg",
    position: {
      left: { md: 85, xs: 60 },
      top: { md: 310, xs: 320 }
    },
    text_position: {
      top: { md: 80, xs: 55 },
      left: { md: "50%", xs: "63%" }
    },
    image_position: {
      top: 90,
      left: "20%"
    },
    image_position_small: {
      top: 70,
      left: "30%"
    }
  },
  {
    label: "knowledge",
    endpoint: "https://info.cfde.cloud/centers/KC",
    position: {
      left: { md: 58, xs: 40 },
      top: { md: 449, xs: 420 }
    },
    text_position: {
      top: { md: 125, xs: 100 },
      left: "10%"
    },
    image_position: {
      top: 53,
      left: "13%"
    },
    image_position_small: {
      top: 45,
      left: "15%"
    }
  },
  {
    label: "training",
    endpoint: "https://info.cfde.cloud/centers/TC",
    rotate: "72deg",
    position: {
      left: { md: -83, xs: -65 },
      top: { md: 467, xs: 434 }
    },
    text_position: {
      top: { md: 105, xs: 85 },
      left: "15%"
    },
    image_position: {
      top: 35,
      left: "45%"
    },
    image_position_small: {
      top: 30,
      left: "42%"
    }
  },
  {
    label: "data",
    endpoint: "https://info.cfde.cloud/centers/DRC",
    rotate: "144deg",
    position: {
      left: { md: -143, xs: -110 },
      top: { md: 338, xs: 337 }
    },
    text_position: {
      top: { md: 50, xs: 30 },
      left: { md: "25%", xs: "12%" }
    },
    image_position: {
      top: 65,
      left: "55%"
    },
    image_position_small: {
      top: 55,
      left: "45%"
    }
  },
  {
    label: "coordination",
    endpoint: "https://info.cfde.cloud/centers/ICC",
    rotate: "216deg",
    position: {
      left: { md: -39, xs: -31 },
      top: { md: 240, xs: 265 }
    },
    text_position: {
      top: { md: 60, xs: 30 },
      left: "23%"
    },
    image_position: {
      top: 100,
      left: "47%"
    },
    image_position_small: {
      top: 55,
      left: "47%"
    }
  }
];
var radius = 280;
var radius_small = 195;
var pie_chunk = 2 * Math.PI / dccs.length;
function InteractiveNavComponent() {
  return /* @__PURE__ */ jsxs2(Container_default, { sx: { position: "relative", width: 200 }, children: [
    dccs.map((dcc, i) => {
      const angle = pie_chunk * i;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle) + 400;
      const x_small = radius_small * Math.cos(angle);
      const y_small = radius_small * Math.sin(angle) + 400;
      return /* @__PURE__ */ jsx4(Tooltip_default, { title: /* @__PURE__ */ jsx4(Typography_default, { children: dcc.description }), children: /* @__PURE__ */ jsx4(
        Button_default,
        {
          variant: "contained",
          sx: {
            background: "#fff",
            borderRadius: 1e3,
            width: { md: 90, xs: 60 },
            height: { md: 90, xs: 60 },
            position: "absolute",
            transform: { md: `translate(${x}px, ${y}px)`, xs: `translate(${x_small}px, ${y_small}px)` }
          },
          children: /* @__PURE__ */ jsx4(Link_default, { href: dcc.homepage, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx4(
            Box_default,
            {
              sx: {
                position: "relative",
                width: { md: 60, xs: 40 },
                overflow: "hidden",
                height: { md: 60, xs: 40 }
              },
              children: /* @__PURE__ */ jsx4("img", { src: dcc.icon || "", alt: dcc.short_label || "", style: {
                top: 0,
                left: 0,
                position: "absolute",
                maxWidth: "100%",
                height: "100%",
                objectFit: "contain",
                color: "transparent"
              } })
            }
          ) })
        }
      ) }, dcc.short_label || "");
    }),
    centers.map((center, i) => {
      return /* @__PURE__ */ jsx4(Button_default, { sx: __spreadValues({
        position: "absolute",
        width: { md: 190, xs: 150 },
        height: { md: 190, xs: 150 }
      }, center.position || {}), children: /* @__PURE__ */ jsx4(Container_default, { sx: {
        position: "relative",
        width: { md: 170, xs: 125 },
        height: { md: 170, xs: 125 }
      }, children: /* @__PURE__ */ jsxs2("a", { href: center.endpoint, children: [
        /* @__PURE__ */ jsx4("img", { src: `https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/${center.label}.png`, alt: center.label, loading: "lazy", decoding: "async", sizes: "100vw", style: {
          position: "absolute",
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          inset: "0px",
          objectFit: "contain",
          color: "transparent",
          display: "block",
          transform: `rotate(${center.rotate || "0deg"})`
        } }),
        /* @__PURE__ */ jsx4(Typography_default, { sx: __spreadValues({ color: "#FFF", position: "absolute", textTransform: "uppercase", fontSize: { md: 16, xs: 11.5 } }, center.text_position || {}), children: /* @__PURE__ */ jsx4("b", { children: center.label }) }),
        /* @__PURE__ */ jsx4(Container_default, { sx: { display: { md: "block", xs: "none" } }, children: /* @__PURE__ */ jsx4("img", { src: `https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/${center.label} 1.png`, alt: center.label, style: __spreadValues({ position: "absolute", width: 40, height: 40, zIndex: 100 }, center.image_position || {}) }) }),
        /* @__PURE__ */ jsx4(Container_default, { sx: { display: { md: "none", xs: "block" } }, children: /* @__PURE__ */ jsx4("img", { src: `https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/${center.label} 1.png`, alt: center.label, style: __spreadValues({ position: "absolute", zIndex: 100, width: 30, height: 30 }, center.image_position_small || {}) }) })
      ] }) }) }, center.label);
    }),
    /* @__PURE__ */ jsx4(
      Button_default,
      {
        variant: "contained",
        sx: {
          background: "#fff",
          borderRadius: 1e3,
          width: { md: 120, xs: 110 },
          height: { md: 120, xs: 110 },
          position: "absolute",
          top: { md: 395, xs: 365 },
          left: { md: 5, xs: -5 },
          padding: 1,
          zIndex: 100
        },
        children: /* @__PURE__ */ jsx4(Link_default, { href: "https://info.cfde.cloud", children: /* @__PURE__ */ jsx4(
          Box_default,
          {
            sx: {
              position: "relative",
              width: { md: 100, xs: 80 },
              overflow: "hidden",
              height: { md: 100, xs: 80 },
              zIndex: 100
            },
            children: /* @__PURE__ */ jsx4("img", { src: "https://cfde-drc.s3.us-east-2.amazonaws.com/assets/img/CFDE_logo.png", alt: "CFDE_Logo", style: {
              top: 0,
              left: 0,
              position: "absolute",
              maxWidth: "100%",
              height: "100%",
              objectFit: "contain",
              color: "transparent"
            } })
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx4(
      Container_default,
      {
        sx: {
          background: "#000",
          borderRadius: "50%",
          width: { md: 230, xs: 200 },
          height: { md: 230, xs: 200 },
          position: "absolute",
          top: { md: 340, xs: 320 },
          left: { md: -50, xs: -50 },
          opacity: "0.5"
        }
      }
    )
  ] });
}

// src/index.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var CFDEWheel = () => {
  return /* @__PURE__ */ jsx5(InteractiveNavModal, { children: /* @__PURE__ */ jsx5(InteractiveNavComponent, {}) });
};
var index_default = CFDEWheel;
export {
  index_default as default
};
/*! Bundled license information:

react-is/cjs/react-is.production.min.js:
  (** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.production.js:
  (**
   * @license React
   * react-is.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@mui/styled-engine/esm/index.js:
  (**
   * @mui/styled-engine v7.0.2
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@mui/utils/esm/index.js:
  (**
   * @mui/utils v7.0.2
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@mui/system/esm/index.js:
  (**
   * @mui/system v7.0.2
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@mui/material/esm/index.js:
  (**
   * @mui/material v7.0.2
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
