'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nextMoment = require('../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CommonMixin = {
    normalizeValue: function normalizeValue(value) {
        var format = this.props.format;

        var resultValue = value && (0, _nextMoment2['default'])(value, [format]).isValid() ? (0, _nextMoment2['default'])(value, [format]) : '';

        if (resultValue) {
            resultValue = this.isValid(resultValue) ? resultValue : '';
        }

        return resultValue;
    },
    isValid: function isValid(nextValue) {
        var _props = this.props,
            disabledHours = _props.disabledHours,
            disabledMinutes = _props.disabledMinutes,
            disabledSeconds = _props.disabledSeconds;

        var ret = true;

        disabledHours = disabledHours && disabledHours instanceof Function ? disabledHours() : [];
        disabledMinutes = disabledMinutes && disabledMinutes instanceof Function ? disabledMinutes() : [];
        disabledSeconds = disabledSeconds && disabledSeconds instanceof Function ? disabledSeconds() : [];

        if (disabledHours.indexOf(nextValue.hour()) >= 0) {
            ret = false;
        }
        if (disabledMinutes.indexOf(nextValue.minute()) >= 0) {
            ret = false;
        }
        if (disabledSeconds.indexOf(nextValue.second()) >= 0) {
            ret = false;
        }

        return ret;
    },
    scrollTo: function scrollTo(element, to, duration) {
        var _this = this;

        var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout(callback) {
            return setTimeout(callback, 10);
        };

        if (duration <= 0) {
            element.scrollTop = to;
            return;
        }

        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        requestAnimationFrame(function () {
            element.scrollTop = element.scrollTop + perTick;

            if (element.scrollTop === to) {
                return;
            }

            _this.scrollTo(element, to, duration - 10);
        });
    },
    isInArray: function isInArray(value, array) {
        var ret = false;

        if (!array instanceof Array) {
            return ret;
        }

        array.forEach(function (item) {
            if (value === item) {
                ret = true;
            }
        });

        return ret;
    }
};

function extend(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
}

function CommonMixinTo(Component) {
    ['defaultProps', 'propTypes'].forEach(function (prop) {
        Component[prop] = Component[prop] || {};
    });

    extend(Component.prototype, CommonMixin);
}

exports['default'] = CommonMixinTo;
module.exports = exports['default'];