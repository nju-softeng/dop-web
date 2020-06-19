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

var _nextUtil = require('../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Switch*/
var Switch = (_temp = _class = function (_React$Component) {
    _inherits(Switch, _React$Component);

    function Switch(props, context) {
        _classCallCheck(this, Switch);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        var checked = props.checked || props.defaultChecked;
        _this.onChange = _this.onChange.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.state = {
            checked: checked
        };
        return _this;
    }

    Switch.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            prefix = _props.prefix,
            className = _props.className,
            disabled = _props.disabled,
            size = _props.size,
            checkedChildren = _props.checkedChildren,
            unCheckedChildren = _props.unCheckedChildren,
            others = _objectWithoutProperties(_props, ['prefix', 'className', 'disabled', 'size', 'checkedChildren', 'unCheckedChildren']),
            status = this.state.checked ? 'on' : 'off',
            children = this.state.checked ? checkedChildren : unCheckedChildren;

        if (size !== 'small' && size !== 'medium') {
            size = 'medium';
        }

        prefix = this.context.prefix || prefix;
        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'switch', true), _defineProperty(_classNames, prefix + 'switch-' + status, true), _defineProperty(_classNames, prefix + 'switch-' + size, true), _defineProperty(_classNames, className, className), _classNames));
        var attrs = void 0;

        var triggerCls = (0, _classnames2['default'])(_defineProperty({}, this.props.prefix + 'switch-trigger', true));
        if (!disabled) {
            attrs = {
                onClick: this.onChange,
                tabIndex: 0,
                onKeyDown: this.onKeyDown,
                disabled: disabled
            };
        } else {
            attrs = {
                disabled: disabled
            };
        }

        if (size === 'small') {
            // size small不允许设置内容
            children = null;
        }

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: classes }, attrs, { 'aria-checked': this.state.checked }),
            _react2['default'].createElement('div', { className: triggerCls }),
            _react2['default'].createElement(
                'div',
                { className: this.props.prefix + 'switch-children' },
                children
            )
        );
    };

    Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('checked' in nextProps) {
            var checked = nextProps.checked;
            if (checked === undefined) {
                checked = false;
            }
            this.setState({
                checked: checked
            });
        }
    };

    Switch.prototype.onChange = function onChange(ev) {
        var checked = !this.state.checked;

        if (!('checked' in this.props)) {
            this.setState({
                checked: checked
            });
        }
        this.props.onChange(checked, ev);
        this.props.onClick && this.props.onClick(ev);
    };

    Switch.prototype.onKeyDown = function onKeyDown(e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            this.onChange(e);
        }
        this.props.onKeyDown && this.props.onKeyDown(e);
    };

    return Switch;
}(_react2['default'].Component), _class.contextTypes = {
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
     * 自定义内敛样式
     */
    style: _propTypes2['default'].object,
    /**
     * 打开时的内容
     */
    checkedChildren: _propTypes2['default'].any,
    /**
     * 关闭时的内容
     */
    unCheckedChildren: _propTypes2['default'].any,
    /**
     * 开关状态改变是触发此事件
     * @param {Boolean} checked 是否为打开状态
     * @param {Event} e DOM事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 开关当前的值(针对受控组件)
     */
    checked: _propTypes2['default'].bool,
    /**
     * 开关默认值 (针对非受控组件)
     */
    defaultChecked: _propTypes2['default'].bool,
    /**
     * 表示开关被禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * switch的尺寸
     * @enumdesc 正常大小, 缩小版大小
     */
    size: _propTypes2['default'].oneOf(['medium', 'small']),
    /**
     * 鼠标点击事件
     * @param {Event} e DOM事件对象
     */
    onClick: _propTypes2['default'].func,
    /**
     * 键盘按键事件
     * @param {Event} e DOM事件对象
     */
    onKeyDown: _propTypes2['default'].func
}, _class.defaultProps = {
    prefix: 'next-',
    disabled: false,
    size: 'medium',
    onChange: function onChange() {}
}, _temp);
Switch.displayName = 'Switch';
exports['default'] = Switch;
module.exports = exports['default'];