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

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextInput = require('../../../next-input/lib/index.js');

var _nextInput2 = _interopRequireDefault(_nextInput);

var _nextOverlay = require('../../../next-overlay/lib/index.js');

var _nextCalendar = require('../../../next-calendar/lib/index.js');

var _nextUtil = require('../../../next-util/lib/index.js');

var _nextMoment = require('../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

var _nextLocaleProvider = require('../../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** DatePicker.YearPicker */
var YearPicker = (_temp = _class = function (_Component) {
    _inherits(YearPicker, _Component);

    function YearPicker(props, context) {
        _classCallCheck(this, YearPicker);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var normalizeValue = _this.normalizeValue(props.value || props.defaultValue, false);

        _this.state = {
            value: normalizeValue,
            base: props.defaultBase || normalizeValue,
            mode: 'decade',
            inputValue: _this.parseValue(normalizeValue),
            inputValueCorrect: normalizeValue || normalizeValue === '',
            open: props.open || props.defaultOpen
        };
        return _this;
    }

    YearPicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            var normalizeValue = this.normalizeValue(nextProps.value, false);

            this.setState({
                value: normalizeValue,
                inputValue: this.parseValue(normalizeValue),
                inputValueCorrect: normalizeValue || normalizeValue === ''
            });
        }

        if ('open' in nextProps) {
            this.setState({
                open: nextProps.open
            });
        }
    };

    YearPicker.prototype.normalizeValue = function normalizeValue(value) {
        var checkDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var _props = this.props,
            format = _props.format,
            disabledYear = _props.disabledYear;

        var mode = this.state ? this.state.mode : 'decade';
        var resultValue = '';

        if (!value) {
            return resultValue;
        }

        if (typeof value === 'number') {
            resultValue = (0, _nextMoment2['default'])(value);
        } else {
            resultValue = (0, _nextMoment2['default'])(value, [format]).isValid() ? (0, _nextMoment2['default'])(value, [format]) : '';
        }

        if (checkDisabled && resultValue && mode === 'decade') {
            var calendarDate = (0, _utils.getCalendarDate)(resultValue);
            resultValue = (0, _utils.isValidCalendarDate)(calendarDate, disabledYear) ? resultValue : '';
        }

        return resultValue;
    };

    YearPicker.prototype.parseValue = function parseValue(value) {
        if (!value) {
            return '';
        }

        return (0, _nextMoment2['default'])(value).isValid() ? (0, _nextMoment2['default'])(value).format(this.props.format) : value;
    };

    YearPicker.prototype.onChange = function onChange(nextState) {
        var format = this.props.format;
        var base = nextState.base,
            mode = nextState.mode,
            value = nextState.value;


        var newBase = base;
        var newMode = mode;

        if (value) {
            var formatValue = this.parseValue(value);
            var nextValue = (0, _nextMoment2['default'])(formatValue, [format]);

            switch (mode) {
                case 'year':
                    newMode = 'decade';
                    newBase = nextValue;

                    if (!('value' in this.props)) {
                        this.setState({
                            inputValue: formatValue,
                            value: nextValue
                        });
                    }
                    this.onOpenChange(false);
                    this.props.onChange(new Date(nextValue.valueOf()), formatValue);
                    break;
            }
        }

        this.setState({
            base: newBase,
            mode: newMode
        });
    };

    YearPicker.prototype.onOpenChange = function onOpenChange(open) {
        if (!('open' in this.props)) {
            this.setState({
                open: open
            });
        }

        this.props.onOpenChange(open);
    };

    YearPicker.prototype.onInputChange = function onInputChange(nextInputValue, event) {
        var _props2 = this.props,
            format = _props2.format,
            disabledYear = _props2.disabledYear;

        var _getStrRegExp = (0, _utils.getStrRegExp)(format),
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
            var isValid = nextValue.isValid() && (0, _utils.isValidCalendarDate)((0, _utils.getCalendarDate)(nextValue), disabledYear);

            if (isValid) {
                this.onChange({
                    base: nextValue,
                    value: nextValue,
                    mode: 'year'
                });
            } else {
                this.setState({
                    inputValueCorrect: false
                });
            }
        }

        // 清空
        if (nextInputValue === '') {
            this.clearValue(event);
        }
    };

    YearPicker.prototype.clearValue = function clearValue(event) {
        event.stopPropagation();

        this.setState({
            inputValue: '',
            value: ''
        });
        this.onOpenChange(false);
        this.props.onChange(null, '');
    };

    YearPicker.prototype.render = function render() {
        var _classNames;

        var _props3 = this.props,
            id = _props3.id,
            style = _props3.style,
            className = _props3.className,
            size = _props3.size,
            disabled = _props3.disabled,
            locale = _props3.locale,
            format = _props3.format,
            popupStyle = _props3.popupStyle,
            popupAlign = _props3.popupAlign,
            popupOffset = _props3.popupOffset,
            hasClear = _props3.hasClear,
            onChange = _props3.onChange,
            others = _objectWithoutProperties(_props3, ['id', 'style', 'className', 'size', 'disabled', 'locale', 'format', 'popupStyle', 'popupAlign', 'popupOffset', 'hasClear', 'onChange']);

        var _state = this.state,
            value = _state.value,
            base = _state.base,
            mode = _state.mode,
            inputValue = _state.inputValue,
            inputValueCorrect = _state.inputValueCorrect,
            open = _state.open;

        var prefix = this.context.prefix || this.props.prefix;

        // 获得格式日期
        var formatValue = this.parseValue(value);

        // 样式
        var triggerCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'year-picker', true), _defineProperty(_classNames, prefix + 'year-picker-' + size, size), _defineProperty(_classNames, prefix + 'year-picker-disabled', disabled), _defineProperty(_classNames, className, className), _classNames));
        var iconSize = {
            large: 'medium',
            medium: 'small',
            small: 'xs'
        }[size];
        var inputCls = (0, _classnames2['default'])(_defineProperty({}, 'error', !inputValueCorrect));

        // 组件
        var yearPanel = _react2['default'].createElement(
            'div',
            { className: prefix + 'year-picker-panel', style: popupStyle },
            _react2['default'].createElement(
                'div',
                { className: prefix + 'year-picker-input' },
                _react2['default'].createElement(_nextInput2['default'], {
                    className: inputCls,
                    placeholder: format,
                    disabled: disabled,
                    size: 'medium',
                    value: inputValue,
                    onChange: this.onInputChange.bind(this) })
            ),
            _react2['default'].createElement(_nextCalendar.DatePickerPanel, _extends({}, others, {
                mode: mode,
                locale: locale,
                base: base,
                value: value,
                onChange: this.onChange.bind(this) }))
        );
        var yearTrigger = _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { id: id, className: triggerCls, style: style }),
            _react2['default'].createElement(_nextInput2['default'], {
                placeholder: locale.yearPlaceholder,
                disabled: disabled,
                size: size,
                value: formatValue }),
            formatValue && !disabled && hasClear ? _react2['default'].createElement(_nextIcon2['default'], { type: 'delete-filling', size: iconSize, title: locale.clear, onClick: this.clearValue.bind(this) }) : _react2['default'].createElement(_nextIcon2['default'], { type: 'calendar', size: iconSize })
        );

        return _react2['default'].createElement(
            _nextOverlay.Popup,
            _extends({}, others, {
                autoFocus: false,
                disabled: disabled,
                visible: open,
                trigger: yearTrigger,
                triggerType: 'click',
                align: popupAlign,
                offset: popupOffset,
                onVisibleChange: this.onOpenChange.bind(this)
            }),
            yearPanel
        );
    };

    return YearPicker;
}(_react.Component), _class.propTypes = {
    /**
     * 品牌的样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 默认的基准日期
     */
    defaultBase: _propTypes2['default'].string,
    /**
     * 默认日期
     */
    defaultValue: _propTypes2['default'].any,
    /**
     * 日期
     */
    value: _propTypes2['default'].any,
    /**
     * 时间发生变化的回调
     * @param {String} date         改变后的日期
     * @param {String} formateDate  格式化的日期
     */
    onChange: _propTypes2['default'].func,
    /**
     * 默认是否展开
     */
    defaultOpen: _propTypes2['default'].bool,
    /**
     * 是否展开
     */
    open: _propTypes2['default'].bool,
    /**
     * 当面板展开状态改变时的回调
     * @param {Boolean} open  面板的展开状态
     */
    onOpenChange: _propTypes2['default'].func,
    /**
     * 输入框尺寸
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 语言
     */
    language: _propTypes2['default'].oneOf(['en-us', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'ru', 'zh-cn', 'zh-hk', 'zh-tw']),
    /**
     * 国际化配置，[参考](http://gitlab.alibaba-inc.com/next/date-picker/blob/master/src/locale/index.js)
     */
    locale: _propTypes2['default'].object,
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
     * 日期格式
     */
    format: _propTypes2['default'].string,
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否展示清空按钮
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 自定义组件样式
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    size: 'medium',
    popupAlign: 'tl tl',
    popupOffset: [0, 0],
    format: 'YYYY',
    hasClear: true,
    onChange: function onChange() {},
    onOpenChange: function onOpenChange() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
YearPicker.displayName = 'YearPicker';
exports['default'] = (0, _nextLocaleProvider2['default'])(YearPicker);
module.exports = exports['default'];