'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextUtil = require('../../../next-util/lib/index.js');

var _utils = require('../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Slider = (_temp = _class = function (_React$Component) {
    _inherits(Slider, _React$Component);

    function Slider() {
        _classCallCheck(this, Slider);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Slider.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            prefix = _props.prefix,
            hasMovingClass = _props.hasMovingClass;

        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'range-slider', true), _defineProperty(_classNames, prefix + 'range-slider-moving', hasMovingClass), _classNames));

        return (
            /* 透传props, 让它接受tooltip注入的属性 */
            _react2['default'].createElement('div', _extends({}, (0, _nextUtil.pickAttrs)(this.props), { className: classes, style: this._getStyle() }))
        );
    };

    Slider.prototype._getStyle = function _getStyle() {
        var _props2 = this.props,
            min = _props2.min,
            max = _props2.max,
            value = _props2.value;


        return {
            left: (0, _utils.getPercent)(min, max, value) + '%',
            zIndex: 100
        };
    };

    return Slider;
}(_react2['default'].Component), _class.propTypes = {
    min: _propTypes2['default'].number,
    max: _propTypes2['default'].number,
    value: _propTypes2['default'].number,
    prefix: _propTypes2['default'].string,
    hasMovingClass: _propTypes2['default'].bool
}, _class.defaultProps = {
    prefix: 'next-',
    min: 0,
    max: 100,
    value: 0,
    hasMovingClass: false
}, _temp);
Slider.displayName = 'Slider';
exports['default'] = Slider;
module.exports = exports['default'];