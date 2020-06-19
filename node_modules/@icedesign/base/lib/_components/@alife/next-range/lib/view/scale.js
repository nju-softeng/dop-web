'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Scale = (_temp = _class = function (_React$Component) {
    _inherits(Scale, _React$Component);

    function Scale() {
        _classCallCheck(this, Scale);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Scale.prototype.render = function render() {
        var prefix = this.props.prefix;

        var classes = (0, _classnames2['default'])(_defineProperty({}, prefix + 'range-scale', true));
        var items = this._renderItems();

        return _react2['default'].createElement(
            'div',
            { className: classes },
            items
        );
    };

    Scale.prototype._renderItems = function _renderItems() {
        var _props = this.props,
            min = _props.min,
            max = _props.max,
            value = _props.value,
            prefix = _props.prefix,
            scales = _props.scales;

        var items = [];

        scales.forEach(function (scale, i) {
            var _classNames2;

            var classes = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'range-scale-item', true), _defineProperty(_classNames2, 'activated', (0, _utils.inRange)(scale, value, min)), _classNames2));
            var left = (0, _utils.getPercent)(min, max, scale) + '%';

            items.push(
            // "key" is for https://fb.me/react-warning-keys
            _react2['default'].createElement('span', { className: classes, style: { left: left }, key: i }));
        });

        return items;
    };

    return Scale;
}(_react2['default'].Component), _class.propTypes = {
    min: _propTypes2['default'].number,
    max: _propTypes2['default'].number,
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].arrayOf(_propTypes2['default'].number)]),
    prefix: _propTypes2['default'].string,
    scales: _propTypes2['default'].arrayOf(_propTypes2['default'].number)
}, _class.defaultProps = {
    prefix: 'next-',
    min: 0,
    max: 100,
    value: 0
}, _temp);
Scale.displayName = 'Scale';
exports['default'] = Scale;
module.exports = exports['default'];