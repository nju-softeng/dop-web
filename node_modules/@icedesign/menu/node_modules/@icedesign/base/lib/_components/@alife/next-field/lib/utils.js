'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getValueFromEvent = getValueFromEvent;
exports.getDefaultValue = getDefaultValue;
exports.getErrorStrs = getErrorStrs;
exports.getParams = getParams;
exports.setIn = setIn;
exports.getIn = getIn;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getValueFromEvent(e) {
    // support custom element
    if (!e || !e.target) {
        return e;
    }
    var target = e.target;


    if (target.type === 'checkbox') {
        return target.checked;
    } else if (target.type === 'radio') {
        //兼容radioGroup
        if (target.value) {
            return target.value;
        } else {
            return target.checked;
        }
    }
    return target.value;
}

function getDefaultValue(ref, valueName) {
    if (!ref) {
        return undefined;
    }

    if (ref.nodeType && ref.nodeType === 1) {
        //原生
        if (ref.nodeName === 'INPUT') {
            switch (ref.type) {
                case 'checkbox':
                case 'radio':
                    if ('defaultChecked' in ref) {
                        return ref.defaultChecked;
                    }
                    break;
            }
        }

        if ('defaultValue' in ref) {
            return ref.defaultValue;
        } else if ('value' in ref) {
            //原生的select设置defaultValue，但是ref上面只有value属性
            return ref.value;
        }
    } else {
        var defaultValue = 'default' + valueName.substring(0, 1).toUpperCase() + valueName.substring(1);
        if (defaultValue in ref.props) {
            return ref.props[defaultValue];
        }

        if ('defaultValue' in ref.props) {
            return ref.props.defaultValue;
        } else if ('defaultChecked' in ref.props) {
            return ref.props.defaultChecked;
        }
    }

    return undefined;
}
function getErrorStrs(errors) {
    if (errors) {
        return errors.map(function (e) {
            if ('message' in e) {
                return e.message;
            }
            return e;
        });
    }
    return errors;
}

// export function isEmptyObject(obj) {
//     return Object.keys(obj).length === 0;
// }

// export function flattenArray(arr) {
//     return Array.prototype.concat.apply([], arr);
// }

// export function mirror(obj) {
//     return obj;
// }

// export function hasRules(validate) {
//     if (validate) {
//         return validate.some((item) => {
//             return !!item.rules && item.rules.length;
//         });
//     }
//     return false;
// }

function getParams(ns, opt, cb) {
    var names = typeof ns === 'string' ? [ns] : ns;
    var callback = cb;
    var options = opt;
    if (cb === undefined) {
        if (typeof names === 'function') {
            callback = names;
            options = {};
            names = undefined;
        } else if (Array.isArray(names)) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            } else {
                options = options || {};
            }
        } else {
            callback = options;
            options = names || {};
            names = undefined;
        }
    }
    return {
        names: names,
        callback: callback,
        options: options
    };
}

/**
 * get value from key like 'a.b.c'
 * @param obj
 * @param strKey like a.b.c
 * @returns {*}
 */
// export function getValueByStringKey(obj, strKey = '') {
//     if (!strKey) {
//         return obj;
//     }

//     return strKey.split('.').reduce((previousValue, currentValue) => {
//         return previousValue[currentValue];
//     }, obj);
// }

/**
 * set value by key like 'a.b.c'
 * @param obj a.b.c = value
 * @param strKey
 * @param value
 */
// export function setValueByStringKey(obj, strKey = '', value) {
//     if (!strKey) {
//         return obj;
//     }

//     return strKey.split('.').reduce((previousValue, currentValue, i, arr) => {
//         if (!(currentValue in previousValue)) {
//             previousValue[currentValue] = {};
//         }
//         if (i === arr.length - 1) {
//             previousValue[currentValue] = value;
//         }
//         return previousValue[currentValue];
//     }, obj);
// }

var setInWithPath = function setInWithPath(state, value, path, pathIndex) {
    if (pathIndex >= path.length) {
        return value;
    }

    var first = path[pathIndex];
    var next = setInWithPath(state && state[first], value, path, pathIndex + 1);

    if (!state) {
        var initialized = isNaN(first) ? {} : [];
        initialized[first] = next;
        return initialized;
    }

    if (Array.isArray(state)) {
        var copy = [].concat(state);
        copy[first] = next;
        return copy;
    }

    return _extends({}, state, _defineProperty({}, first, next));
};

function setIn(state, name, value) {
    return setInWithPath(state, value, name.replace(/\[/, '.').replace(/\]/, '').split('.'), 0);
}

function getIn(state, name) {
    if (!state) {
        return state;
    }

    var path = name.replace(/\[/, '.').replace(/\]/, '').split('.');
    var length = path.length;
    if (!length) {
        return undefined;
    }

    var result = state;
    for (var i = 0; i < length && !!result; ++i) {
        result = result[path[i]];
    }

    return result;
}