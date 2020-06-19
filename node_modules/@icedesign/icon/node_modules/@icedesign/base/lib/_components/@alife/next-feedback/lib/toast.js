'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _mask = require('./mask.js');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var instance = void 0;
var hidingToast = void 0;

function handleConfig(config, type) {
    var newConfig = {};

    if (typeof config === 'string' || (0, _react.isValidElement)(config)) {
        newConfig.content = config;
    } else if (isObject(config)) {
        newConfig = _extends({}, config);
    }
    if (typeof newConfig.duration !== 'number') {
        newConfig.duration = 3000;
    }
    if (type) {
        newConfig.type = type;
    }

    return newConfig;
}

function isObject(obj) {
    return {}.toString.call(obj) === '[object Object]';
}

function open(config, type) {
    close();
    config = handleConfig(config, type);
    instance = _mask2['default'].create(config);
    if (config.duration > 0) {
        hidingToast && clearTimeout(hidingToast);
        hidingToast = setTimeout(close, config.duration);
    }
}

function close() {
    instance && instance.destroy();
    instance = null;
}

var toast = {
    show: function show(config) {
        open(config);
    },
    hide: function hide() {
        close();
    }
};
var types = ['success', 'prompt', 'error', 'help', 'loading'];
types.forEach(function (type) {
    toast[type] = function (config) {
        return open(config, type);
    };
});

exports['default'] = toast;
module.exports = exports['default'];