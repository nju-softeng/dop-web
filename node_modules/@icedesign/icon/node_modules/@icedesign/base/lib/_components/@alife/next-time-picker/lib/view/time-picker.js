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

var _nextOverlay = require('../../../next-overlay/lib/index.js');

var _nextInput = require('../../../next-input/lib/index.js');

var _nextInput2 = _interopRequireDefault(_nextInput);

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextMoment = require('../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextUtil = require('../../../next-util/lib/index.js');

var _commonMixin = require('./common-mixin.js');

var _commonMixin2 = _interopRequireDefault(_commonMixin);

var _timePickerPanel = require('./time-picker-panel.js');

var _timePickerPanel2 = _interopRequireDefault(_timePickerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** TimePicker */
var TimePicker = (_temp = _class = function (_Component) {
    _inherits(TimePicker, _Component);

    function TimePicker(props, context) {
        _classCallCheck(this, TimePicker);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var normalizeValue = _this.normalizeValue(props.value || props.defaultValue);

        _this.state = {
            value: normalizeValue,
            inputValue: _this.parseValue(normalizeValue),
            inputValueCorrect: normalizeValue || normalizeValue === '',
            open: props.open || props.defaultOpen
        };
        return _this;
    }

    TimePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if ('value' in newProps) {
            var normalizeValue = this.normalizeValue(newProps.value || newProps.defaultValue);

            this.setState({
                value: normalizeValue,
                inputValue: this.parseValue(normalizeValue),
                inputValueCorrect: normalizeValue || normalizeValue === ''
            });
        }

        if ('open' in newProps) {
            this.setState({
                open: newProps.open
            });
        }
    };

    TimePicker.prototype.parseValue = function parseValue(value) {
        if (!value) {
            return '';
        }

        return (0, _nextMoment2['default'])(value).isValid() ? (0, _nextMoment2['default'])(value).format(this.props.format) : value;
    };

    TimePicker.prototype.getStrRegExp = function getStrRegExp(format) {
        var exactRegExp = [];
        var fuzzyRegExp = [];

        for (var i = 0; i < format.length; i++) {
            if (/[a-zA-Z]/.test(format[i])) {
                exactRegExp.push('[0-9]');
            } else {
                exactRegExp.push(format[i]);

                if (fuzzyRegExp.indexOf(format[i]) === -1) {
                    fuzzyRegExp.push(format[i]);
                }
            }
        }

        return {
            fuzzy: new RegExp('^[0-9' + fuzzyRegExp.join('') + ']{0,' + exactRegExp.length + '}$'),
            exact: new RegExp('^' + exactRegExp.join('') + '$')
        };
    };

    TimePicker.prototype.onOpenChange = function onOpenChange(open) {
        if (!('open' in this.props)) {
            this.setState({
                open: open
            });
        }
        this.props.onOpenChange(open);
    };

    TimePicker.prototype.onChange = function onChange(value) {
        var formatValue = this.parseValue(value);
        var nextValue = (0, _nextMoment2['default'])(formatValue, [this.props.format]);

        if (!('value' in this.props)) {
            this.setState({
                inputValue: formatValue,
                value: nextValue
            });
        }

        this.props.onChange(new Date(nextValue.valueOf()), formatValue);
    };

    TimePicker.prototype.onInputChange = function onInputChange(nextInputValue, e) {
        var format = this.props.format;

        var _getStrRegExp = this.getStrRegExp(format),
            fuzzy = _getStrRegExp.fuzzy,
            exact = _getStrRegExp.exact;

        // 模糊匹配输入值


        if (fuzzy.test(nextInputValue)) {
            this.setState({
                inputValue: nextInputValue,
                inputValueCorrect: true
            });
        }

        // 精确匹配以修改值
        if (exact.test(nextInputValue)) {
            var nextValue = (0, _nextMoment2['default'])(nextInputValue, [format]);
            var isValid = nextValue.isValid() && this.isValid(nextValue);

            if (isValid) {
                this.onChange(nextValue);
            } else {
                this.setState({
                    inputValueCorrect: false
                });
            }
        }

        // 清空
        if (nextInputValue === '') {
            this.clearValue(e);
        }
    };

    TimePicker.prototype.clearValue = function clearValue(e) {
        e.stopPropagation();

        this.setState({
            value: null,
            inputValue: '',
            inputValueCorrect: true
        });
        this.onOpenChange(false);
        this.props.onChange(null, '');
    };

    TimePicker.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            id = _props.id,
            placeholder = _props.placeholder,
            style = _props.style,
            className = _props.className,
            others = _objectWithoutProperties(_props, ['id', 'placeholder', 'style', 'className']);

        var size = others.size,
            format = others.format,
            disabled = others.disabled,
            locale = others.locale,
            popupAlign = others.popupAlign,
            popupOffset = others.popupOffset,
            popupStyle = others.popupStyle,
            hasClear = others.hasClear;
        var _state = this.state,
            value = _state.value,
            open = _state.open,
            inputValue = _state.inputValue,
            inputValueCorrect = _state.inputValueCorrect;

        var prefix = this.context.prefix || this.props.prefix;

        var formatValue = this.parseValue(value);

        delete others.onChange; // 避免往下透传 onChange

        if (format.indexOf('ss') < 0) {
            others.showSecond = false;
        }
        if (format.indexOf('HH') < 0) {
            others.showHour = false;
        }

        // 样式
        var triggerCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'time-picker', true), _defineProperty(_classNames, prefix + 'time-picker-size-' + size, size), _defineProperty(_classNames, prefix + 'time-picker-disabled', disabled), _defineProperty(_classNames, className, className), _classNames));
        var iconSize = {
            large: 'medium',
            medium: 'small',
            small: 'xs'
        }[size];
        var inputCls = (0, _classnames2['default'])(_defineProperty({}, 'error', !inputValueCorrect));

        // 组件
        var panel = _react2['default'].createElement(
            'div',
            { className: prefix + 'time-picker-panel-wrapper', style: popupStyle },
            _react2['default'].createElement(
                'div',
                { className: prefix + 'time-picker-input' },
                _react2['default'].createElement(_nextInput2['default'], {
                    className: inputCls,
                    disbaled: disabled,
                    size: 'medium',
                    value: inputValue,
                    placeholder: format,
                    onChange: this.onInputChange.bind(this) })
            ),
            _react2['default'].createElement(_timePickerPanel2['default'], _extends({}, others, {
                value: value,
                onChange: this.onChange.bind(this)
            }))
        );
        var trigger = _react2['default'].createElement(
            'span',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { id: id, className: triggerCls, style: style }),
            _react2['default'].createElement(_nextInput2['default'], {
                placeholder: placeholder || locale.placeholder,
                disabled: disabled,
                size: size,
                value: formatValue }),
            formatValue && !disabled && hasClear ? _react2['default'].createElement(_nextIcon2['default'], { type: 'delete-filling', size: iconSize, title: locale.clear, onClick: this.clearValue.bind(this) }) : _react2['default'].createElement(_nextIcon2['default'], { type: 'clock', size: iconSize })
        );

        return _react2['default'].createElement(
            _nextOverlay.Popup,
            _extends({}, others, {
                disabled: disabled,
                visible: open,
                align: popupAlign,
                offset: popupOffset,
                trigger: trigger,
                triggerType: 'click',
                onVisibleChange: this.onOpenChange.bind(this)
            }),
            panel
        );
    };

    return TimePicker;
}(_react.Component), _class.propTypes = {
    /**
     * 样式的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 输入框提示文案
     */
    placeholder: _propTypes2['default'].string,
    /**
     * 默认时间
     */
    defaultValue: _propTypes2['default'].any,
    /**
     * 时间
     */
    value: _propTypes2['default'].any,
    /**
     * 时间值改变时的回调
     * @param {String} date 日期值
     * @param {String} formatDate 格式化后的日期值
     */
    onChange: _propTypes2['default'].func,
    /**
     * 默认是否展开
     */
    defaultOpen: _propTypes2['default'].bool,
    /**
     * 展开
     */
    open: _propTypes2['default'].bool,
    /**
     * 展开状态改变时的回调
     * @param {Boolean} open 是否展开
     */
    onOpenChange: _propTypes2['default'].func,
    /**
     * 展示的时间格式，目前只支持 24 小时值
     */
    format: _propTypes2['default'].string,
    /**
     * 禁用全部操作
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 输入框尺寸
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 弹层样式
     */
    popupStyle: _propTypes2['default'].object,
    /**
     * 弹层对齐方式
     */
    popupAlign: _propTypes2['default'].string,
    /**
     * 弹层偏移
     */
    popupOffset: _propTypes2['default'].array,
    /**
     * 禁止选择指定分小时
     * Function() => Array
     */
    disabledHours: _propTypes2['default'].func,
    /**
     * 禁止选择指定分钟
     * Function() => Array
     */
    disabledMinutes: _propTypes2['default'].func,
    /**
     * 禁止选择部分秒
     * Function() => Array
     */
    disabledSeconds: _propTypes2['default'].func,
    /**
     * 是否显示清空按钮
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 自定样式名
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    format: 'HH:mm:ss',
    size: 'medium',
    popupAlign: 'tl tl',
    popupOffset: [0, 0],
    hasClear: true,
    onChange: function onChange() {},
    onOpenChange: function onOpenChange() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
TimePicker.displayName = 'TimePicker';


(0, _commonMixin2['default'])(TimePicker);

exports['default'] = TimePicker;
module.exports = exports['default'];