'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextUtil = require('../../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/** Tab.TabPane */
var TabPane = (_temp = _class = function (_React$Component) {
    _inherits(TabPane, _React$Component);

    function TabPane() {
        _classCallCheck(this, TabPane);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    TabPane.prototype.render = function render() {
        var _classnames;

        var _props = this.props,
            prefix = _props.prefix,
            active = _props.active,
            className = _props.className,
            lazyLoad = _props.lazyLoad,
            onClick = _props.onClick,
            children = _props.children,
            others = _objectWithoutProperties(_props, ['prefix', 'active', 'className', 'lazyLoad', 'onClick', 'children']);

        this._isActived = this._isActived || active;
        if (!this._isActived && lazyLoad) {
            return null;
        }
        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'tabs-tabpane', true), _defineProperty(_classnames, '' + (active ? 'active' : 'hidden'), true), _defineProperty(_classnames, className, !!className), _classnames));
        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { role: 'tabpanel', 'aria-hidden': active ? 'false' : 'true', className: cls, onClick: onClick }),
            children
        );
    };

    return TabPane;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    active: _propTypes2['default'].bool,
    /**
     * 单个选项卡是否可关闭
     */
    closeable: _propTypes2['default'].bool,
    /**
     * 单个选项卡的补充样式
     */
    tabStyle: _propTypes2['default'].object, // 用于控制 next-tabs-tab-inner 的样式
    /**
     * 单个选项卡的附加样式类
     */
    tabClassName: _propTypes2['default'].string, // 用于控制 next-tabs-tab 的样式
    className: _propTypes2['default'].string, // 用于控制 next-tabs-tabpane 的样式
    children: _propTypes2['default'].any,
    /**
     * 点击单个选项卡时触发的回调
     * @param {String} key 选项卡的 key
     */
    onClick: _propTypes2['default'].func,
    /**
     * 鼠标进入时触发的回调
     * @param {String} key 选项卡的 key
     */
    onMouseEnter: _propTypes2['default'].func,
    /**
     * 鼠标离开时出发的回调
     * @param {String} key 选项卡的 key
     */
    onMouseLeave: _propTypes2['default'].func,
    lazyLoad: _propTypes2['default'].bool // 由 Tab 传入，用户不要传
}, _class.defaultProps = {
    prefix: 'next-',
    closeable: true, // 默认为可关闭，标记单个 tabpane 是否可关闭
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop
}, _temp);
TabPane.displayName = 'TabPane';
exports['default'] = TabPane;
module.exports = exports['default'];