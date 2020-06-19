'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextUtil = require('../../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Button */
var Button = (_temp = _class = function (_Component) {
    _inherits(Button, _Component);

    function Button() {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Button.prototype.onMouseUp = function onMouseUp(e) {
        _reactDom2['default'].findDOMNode(this).blur();

        if (this.props.onMouseUp) {
            this.props.onMouseUp(e);
        }
    };

    Button.prototype.getType = function getType() {
        var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';
        var type = arguments[1];

        var typeMap = {
            ghost: {
                primary: 'dark',
                secondary: 'dark',
                normal: 'light',
                dark: 'dark',
                light: 'light'
            },
            warning: {
                primary: 'primary',
                secondary: 'normal',
                normal: 'normal',
                dark: 'primary',
                light: 'normal'
            },
            normal: {
                primary: 'primary',
                secondary: 'secondary',
                normal: 'normal',
                dark: 'primary',
                light: 'normal'
            }
        };
        var shapeMap = typeMap[shape] || typeMap.normal;

        return shapeMap[type];
    };

    Button.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            className = _props.className,
            type = _props.type,
            size = _props.size,
            htmlType = _props.htmlType,
            loading = _props.loading,
            children = _props.children,
            shape = _props.shape,
            component = _props.component,
            others = _objectWithoutProperties(_props, ['className', 'type', 'size', 'htmlType', 'loading', 'children', 'shape', 'component']);

        var prefix = this.context.prefix || this.props.prefix;
        var pickProps = (0, _nextUtil.pickAttrs)(others);
        var realType = this.getType(shape, type);

        // 样式
        var btnCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'btn', true), _defineProperty(_classNames, prefix + 'btn-' + shape, shape), _defineProperty(_classNames, prefix + 'btn-' + realType, realType), _defineProperty(_classNames, prefix + 'btn-' + size, size), _defineProperty(_classNames, prefix + 'btn-loading', loading), _defineProperty(_classNames, className, className), _classNames));

        var count = _react.Children.count(children);
        var cloneChildren = _react.Children.map(children, function (child, index) {
            if (child && child.type === _nextIcon2['default']) {
                var _classNames2;

                var iconCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'icon-first', count > 1 && index === 0), _defineProperty(_classNames2, prefix + 'icon-last', count > 1 && index === count - 1), _defineProperty(_classNames2, prefix + 'icon-alone', count === 1), _defineProperty(_classNames2, child.props.className, !!child.props.className), _classNames2));

                var iconSize = {
                    large: 'small',
                    medium: 'xs',
                    small: 'xs'
                }[size];

                return _react2['default'].cloneElement(child, {
                    className: iconCls,
                    size: child.props.size || iconSize
                });
            }

            return child;
        });

        // 自定义属性
        var TagName = component;
        var finalAttrs = {
            type: htmlType,
            className: btnCls
        };

        if (TagName === 'a') {
            delete finalAttrs.type;

            // a 标签在禁用状态下无跳转
            if (pickProps.disabled && pickProps.href) {
                delete pickProps.href;
            }
        }

        // 设置特殊tag name没有浏览器默认禁用行为
        if (pickProps.disabled) {
            delete pickProps.onClick;
        }

        return _react2['default'].createElement(
            TagName,
            _extends({}, pickProps, finalAttrs, { onMouseUp: this.onMouseUp.bind(this) }),
            cloneChildren
        );
    };

    return Button;
}(_react.Component), _class.propTypes = {
    /**
     * 组件样式的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 按钮的类型
     */
    type: _propTypes2['default'].oneOf(['primary', 'secondary', 'normal', 'dark', 'light']),
    /**
     * 按钮的尺寸
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 按钮的形态
     */
    shape: _propTypes2['default'].oneOf(['ghost', 'text', 'warning']),
    /**
     * 设置 `button` 标签的原生 `type` 值
     */
    htmlType: _propTypes2['default'].string,
    /**
     * 设置标签类型
     */
    component: _propTypes2['default'].oneOf(['button', 'span', 'a', 'div']),
    /**
     * 设置按钮的载入状态
     */
    loading: _propTypes2['default'].bool,
    /**
     * 点击按钮的回调
     * @param {Object} e Event Object
     */
    onClick: _propTypes2['default'].func,
    /**
     * 自定义样式
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    type: 'normal',
    size: 'medium',
    htmlType: 'button',
    component: 'button',
    loading: false,
    onClick: function onClick() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Button.displayName = 'Button';
exports['default'] = Button;
module.exports = exports['default'];