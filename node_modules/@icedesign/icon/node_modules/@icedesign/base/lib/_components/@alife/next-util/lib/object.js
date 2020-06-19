'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value);
    }
    if (_typeof('test'.__proto__) === 'object') {
        return value.__proto__;
    }
    return false;
}

var toString = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;

function isPlainObject(o) {
    if (!o || toString.call(o) !== '[object Object]' || o.nodeType || o === o.window) {
        return false;
    }

    var proto = getPrototype(o),
        funcToString = Function.prototype.toString,
        objectCtorString = funcToString.call(Object),
        constructor = void 0;

    if (proto === null) {
        return true;
    }
    var Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor === 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

exports.isPlainObject = isPlainObject;

function equal(objA, objB, compare, compareContext, deep) {
    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
    if (ret !== void 0) {
        return !!ret;
    }
    if (objA === objB) {
        return true;
    }
    if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
        return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    var len = keysA.length;

    if (len !== keysB.length) {
        return false;
    }
    compareContext = compareContext || null;
    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < len; i++) {
        var key = keysA[i];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        var valueA = objA[key];
        var valueB = objB[key];

        var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (deep) {
            if (_ret === false || _ret === void 0 && equal(valueA, valueB, compare, compareContext, deep)) {
                return false;
            }
        } else {
            if (_ret === false || _ret === void 0 && valueA !== valueB) {
                return false;
            }
        }
    }
    return true;
}

exports.shallowEqual = function (objA, objB, compare, compareContext) {
    return equal(objA, objB, compare, compareContext, false);
};

exports.deepEqual = function (objA, objB, compare, compareContext) {
    return equal(objA, objB, compare, compareContext, true);
};