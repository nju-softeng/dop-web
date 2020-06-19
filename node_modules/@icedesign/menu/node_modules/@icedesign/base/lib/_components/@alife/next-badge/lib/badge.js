'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _sup = require('./sup.js');

var _sup2 = _interopRequireDefault(_sup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Badge
 */
var Badge = (_temp = _class = function (_Component) {
    _inherits(Badge, _Component);

    function Badge() {
        _classCallCheck(this, Badge);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Badge.prototype.render = function render() {
        var _cx;

        var prefix = this.context.prefix || this.props.prefix;
        /* eslint-disable */

        var _props = this.props,
            propsPrefix = _props.prefix,
            count = _props.count,
            overflowCount = _props.overflowCount,
            dot = _props.dot,
            align = _props.align,
            className = _props.className,
            children = _props.children,
            style = _props.style,
            others = _objectWithoutProperties(_props, ['prefix', 'count', 'overflowCount', 'dot', 'align', 'className', 'children', 'style']);
        /* eslint-enable */


        count = parseInt(count, 10);
        overflowCount = parseInt(overflowCount, 10);

        var classes = (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, prefix + 'badge', true), _defineProperty(_cx, prefix + 'badge-not-a-wrapper', !children), _defineProperty(_cx, className, !!className), _cx));

        var spanProps = { className: classes };
        if (!dot) {
            spanProps.title = count;
        }
        spanProps = _extends({}, spanProps, others);

        return _react2['default'].createElement(
            'span',
            spanProps,
            children,
            _react2['default'].createElement(_sup2['default'], { prefix: prefix, count: count, overflowCount: overflowCount, dot: dot, alignLeft: align === 'left', style: style })
        );
    };

    return Badge;
}(_react.Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内连样式
     */
    style: _propTypes2['default'].object,
    /**
     * 徽章依托的内容
     */
    children: _propTypes2['default'].node,
    /**
     * 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏
     */
    count: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    /**
     * 展示的封顶的数字
     */
    overflowCount: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    /**
     * 不展示数字，只展示一个小红点
     */
    dot: _propTypes2['default'].bool,
    /**
     * 徽章显示的位置
     */
    align: _propTypes2['default'].oneOf(['left']) // TODO modify to alignLeft boolean prop in 1.x
}, _class.defaultProps = {
    prefix: 'next-',
    count: 0,
    overflowCount: 99,
    dot: false
}, _temp);
Badge.displayName = 'Badge';
exports['default'] = Badge;
module.exports = exports['default'];