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

var _classnames5 = require('classnames');

var _classnames6 = _interopRequireDefault(_classnames5);

var _nextMixinUiState = require('../../next-mixin-ui-state/lib/index.js');

var _nextMixinUiState2 = _interopRequireDefault(_nextMixinUiState);

var _nextUtil = require('../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Radio
 * @order 1
 */
var Radio = (_temp = _class = function (_UIState) {
    _inherits(Radio, _UIState);

    function Radio(props, context) {
        _classCallCheck(this, Radio);

        var _this = _possibleConstructorReturn(this, _UIState.call(this, props));

        var checked = void 0,
            disabled = void 0;
        if (context.__group__) {
            checked = context.selectedValue === props.value;
            disabled = context.disabled;
        } else if ('checked' in props) {
            checked = props.checked;
        } else {
            checked = props.defaultChecked;
        }
        _this.state = {
            checked: checked,
            disabled: disabled,
            isMouseDown: false
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    Radio.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.__group__) {
            var selectedValue = nextContext.selectedValue,
                disabled = nextContext.disabled;

            if ('selectedValue' in nextContext && 'disabled' in nextContext) {
                this.setState({
                    checked: selectedValue === nextProps.value,
                    disabled: disabled
                });
            }
        } else if ('checked' in nextProps) {
            this.setState({
                checked: nextProps.checked
            });
        }
    };

    Radio.prototype.onChange = function onChange(e) {
        var checked = e.target.checked;
        var value = this.props.value;

        if (this.context.__group__) {
            this.context.onChange(value, e);
        } else if (this.state.checked !== checked) {
            if (!('checked' in this.props)) {
                this.setState({
                    checked: checked
                });
            }
            this.props.onChange(checked, e);
        }
    };

    Radio.prototype.render = function render() {
        var _classnames, _classnames2, _classnames3;

        var _props = this.props,
            className = _props.className,
            children = _props.children,
            style = _props.style,
            other = _objectWithoutProperties(_props, ['className', 'children', 'style']);

        var checked = !!this.state.checked;
        var disabled = this.state.disabled || this.props.disabled;
        var isButton = this.context.isButton;
        var newOther = (0, _nextUtil.pickAttrs)(other);
        var prefix = this.context.prefix || this.props.prefix;

        var input = _react2['default'].createElement('input', _extends({
            type: 'radio'
        }, newOther, {
            disabled: disabled,
            checked: checked,
            onChange: this.onChange,
            'aria-checked': checked

        }));

        var child = this.getStateElement(input);
        var cls = (0, _classnames6['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'radio', true), _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'checked', checked), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, this.getStateClassName(), true), _classnames));
        var clsInner = (0, _classnames6['default'])((_classnames2 = {}, _defineProperty(_classnames2, prefix + 'radio-inner', true), _defineProperty(_classnames2, 'press', checked), _defineProperty(_classnames2, 'unpress', !checked), _classnames2));
        var clsWrapper = (0, _classnames6['default'])((_classnames3 = {}, _defineProperty(_classnames3, prefix + 'radio-wrapper', true), _defineProperty(_classnames3, className, !!className), _defineProperty(_classnames3, 'checked', checked), _defineProperty(_classnames3, 'disabled', disabled), _defineProperty(_classnames3, this.getStateClassName(), true), _classnames3));
        var childrenCls = (0, _classnames6['default'])(_defineProperty({}, prefix + 'radio-label', !!children));

        var radioComp = !isButton ? _react2['default'].createElement(
            'span',
            { className: cls, style: style
            },
            _react2['default'].createElement('span', { className: clsInner }),
            child
        ) : _react2['default'].createElement(
            'span',
            { className: prefix + 'radio-single-input'
            },
            child
        );

        return children ? _react2['default'].createElement(
            'label',
            {
                className: isButton ? clsWrapper : '', style: isButton ? style : {} },
            radioComp,
            _react2['default'].createElement(
                'span',
                { htmlFor: this.props.id, className: childrenCls },
                children
            )
        ) : _react2['default'].createElement(
            'label',
            {
                className: isButton ? clsWrapper : '', style: isButton ? style : {} },
            radioComp
        );
    };

    return Radio;
}(_nextMixinUiState2['default']), _class.displayName = 'Radio', _class.propTypes = {
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
     * 设置radio是否选中
     */
    checked: _propTypes2['default'].bool,
    /**
     * radio的默认选中
     */
    defaultChecked: _propTypes2['default'].bool,
    /**
     * 状态变化时触发的事件
     * @param {Boolean} checked 是否选中
     * @param {Event} e Dom 事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 表示radio被禁用
     */
    disabled: _propTypes2['default'].bool
}, _class.defaultProps = {
    onChange: function onChange() {},
    prefix: 'next-'
}, _class.contextTypes = {
    onChange: _propTypes2['default'].func,
    __group__: _propTypes2['default'].bool,
    isButton: _propTypes2['default'].bool,
    selectedValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].bool]),
    disabled: _propTypes2['default'].bool,
    prefix: _propTypes2['default'].string
}, _temp);
exports['default'] = Radio;
module.exports = exports['default'];