'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nextUtil = require('../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var makeChain = _nextUtil.func.makeChain;


var lastCode = void 0;
var getCode = function getCode(keyCode) {
    return Object.keys(_nextUtil.keyCode).find(function (name) {
        return _nextUtil.keyCode[name] === keyCode;
    });
};

exports['default'] = {
    getKeyBinderElement: function getKeyBinderElement(element) {
        return _react2['default'].cloneElement(element, {
            onKeyDown: makeChain(this._onKeyBinderKeyDown.bind(this), element.props.onKeyDown),
            ref: 'keybinderNode'
        });
    },
    _onKeyBinderKeyDown: function _onKeyBinderKeyDown(e) {
        var code = void 0,
            match = void 0;
        var currentCode = getCode(e.keyCode);
        if (currentCode) {
            code = currentCode.toLowerCase();
        } else {
            code = String.fromCharCode(e.keyCode).toLowerCase();
        }

        var keyBinders = this.keyBinders;
        if (e.ctrlKey) {
            match = keyBinders['ctrl+' + code];
        } else if (e.shiftKey) {
            match = keyBinders['shift+' + code];
        } else if (e.altKey) {
            match = keyBinders['alt+' + code];
        } else {
            match = keyBinders[code];
        }
        if (!match) {
            if (lastCode) {
                match = keyBinders[lastCode + ' ' + code];
            }
        }
        if (typeof match === 'string') {
            match = this[match].bind(this);
        } else if (typeof match === 'function') {
            match = match.bind(this);
        }
        if (typeof match === 'function') {
            match(e);
        }
        lastCode = code;
    }
};
module.exports = exports['default'];