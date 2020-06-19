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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextMenu = require('../../next-menu/lib/index.js');

var _nextMenu2 = _interopRequireDefault(_nextMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Nav
 * @description 继承自`Menu`的能力请查看`Menu`文档
 */
var Nav = (_temp = _class = function (_React$Component) {
    _inherits(Nav, _React$Component);

    function Nav() {
        _classCallCheck(this, Nav);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Nav.prototype.getChildContext = function getChildContext() {
        return {
            iconOnly: this.props.iconOnly,
            popupAlign: this.props.popupAlign,
            triggerType: this.props.trigger || this.props.triggerType, //TODO: trigger will be remove in 1.0
            hasTooltip: this.props.hasTooltip
        };
    };

    Nav.prototype.render = function render() {
        var _classNames;

        /*eslint-disable */
        var _props = this.props,
            className = _props.className,
            type = _props.type,
            style = _props.style,
            iconOnly = _props.iconOnly,
            activeDirection = _props.activeDirection,
            children = _props.children,
            popupAlign = _props.popupAlign,
            trigger = _props.trigger,
            hasArrow = _props.hasArrow,
            others = _objectWithoutProperties(_props, ['className', 'type', 'style', 'iconOnly', 'activeDirection', 'children', 'popupAlign', 'trigger', 'hasArrow']);

        /*eslint-enable */


        var prefix = this.context.prefix || this.props.prefix;
        var props = {
            selectMode: 'single',
            openMode: 'single'
        };

        // set default activeDirection
        var realActiveDirection = activeDirection;
        if (realActiveDirection && (this.props.direction === 'hoz' && (realActiveDirection === 'left' || realActiveDirection === 'right') || this.props.direction === 'ver' && (realActiveDirection === 'top' || realActiveDirection === 'bottom'))) {
            realActiveDirection = null;
        }

        if (!iconOnly && realActiveDirection === undefined) {
            realActiveDirection = this.props.direction === 'hoz' ? 'bottom' : type === 'line' ? 'right' : 'left';
        }

        if (this.props.direction === 'hoz' || popupAlign === 'outside') {
            props.openMode = 'multiple';
            props.shallowSelect = true;
        }

        var cls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'nav', true), _defineProperty(_classNames, prefix + 'nav-' + type, type), _defineProperty(_classNames, '' + this.props.direction, this.props.direction), _defineProperty(_classNames, 'active', realActiveDirection), _defineProperty(_classNames, '' + realActiveDirection, realActiveDirection), _defineProperty(_classNames, 'icononly', iconOnly), _defineProperty(_classNames, 'no-arrow', !hasArrow), _defineProperty(_classNames, className, !!className), _classNames));

        return _react2['default'].createElement(
            'div',
            { className: cls, style: style },
            _react2['default'].createElement(
                _nextMenu2['default'],
                _extends({}, props, others, { className: prefix + 'nav-menu' }),
                children
            )
        );
    };

    return Nav;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 导航类型
     * @enumdesc 正常, 主要, 次要, 文字, 线形
     */
    type: _propTypes2['default'].oneOf(['normal', 'primary', 'secondary', 'text', 'line']),
    /**
     * 导航方向
     * @enumdesc 水平, 垂直
     */
    direction: _propTypes2['default'].oneOf(['hoz', 'ver']),
    /**
     * 设置组件选中状态的active边方向
     * @enumdesc 无, 上, 下, 左, 右
     */
    activeDirection: _propTypes2['default'].oneOf([null, 'top', 'bottom', 'left', 'right']),
    /**
     * Tree 展开时候右侧子item的对齐方式
     */
    popupAlign: _propTypes2['default'].oneOf(['follow', 'outside']),
    /**
     * PopupItem触发方式
     */
    triggerType: _propTypes2['default'].oneOf(['click', 'hover']),
    trigger: _propTypes2['default'].oneOf(['click', 'hover']), // TODO: will deprecated in 1.0 release version
    /**
     * 自定义class
     */
    className: _propTypes2['default'].string,
    /**
     * 控制icon是否展示
     */
    iconOnly: _propTypes2['default'].bool,
    /**
     * 是否有ToolTIps(仅在iconOnly=true时生效)
     */
    hasTooltip: _propTypes2['default'].bool,
    /**
     * 是否显示右侧的箭头(仅在iconOnly=true时生效)
     */
    hasArrow: _propTypes2['default'].bool
}, _class.defaultProps = {
    prefix: 'next-',
    type: 'normal',
    direction: 'ver',
    popupAlign: 'follow',
    hasTooltip: false,
    hasArrow: true
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.childContextTypes = {
    iconOnly: _propTypes2['default'].bool,
    hasTooltip: _propTypes2['default'].bool,
    popupAlign: _propTypes2['default'].string,
    triggerType: _propTypes2['default'].string
}, _temp);
Nav.displayName = 'Nav';
exports['default'] = Nav;
module.exports = exports['default'];