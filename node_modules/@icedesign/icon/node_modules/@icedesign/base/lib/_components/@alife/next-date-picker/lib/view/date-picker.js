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

var _nextTimePicker = require('../../../next-time-picker/lib/index.js');

var _nextUtil = require('../../../next-util/lib/index.js');

var _nextMoment = require('../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

var _nextLocaleProvider = require('../../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _quickTool = require('./quick-tool.js');

var _quickTool2 = _interopRequireDefault(_quickTool);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** DatePicker */
var DatePicker = (_temp = _class = function (_Component) {
    _inherits(DatePicker, _Component);

    function DatePicker(props, context) {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var normalizeValue = _this.normalizeValue(props.value || props.defaultValue, false);

        _this.state = {
            value: normalizeValue,
            base: props.defaultBase || normalizeValue,
            mode: 'month',
            dateInputValue: _this.parseValue(normalizeValue, 'date'),
            timeInputValue: _this.parseValue(normalizeValue, 'time'),
            dateInputCorrect: normalizeValue || normalizeValue === '',
            timeInputCorrect: normalizeValue || normalizeValue === '',
            open: props.open || props.defaultOpen
        };
        return _this;
    }

    DatePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            var normalizeValue = this.normalizeValue(nextProps.value, false);

            this.setState({
                value: normalizeValue,
                dateInputValue: this.parseValue(normalizeValue, 'date'),
                timeInputValue: this.parseValue(normalizeValue, 'time'),
                dateInputCorrect: normalizeValue || normalizeValue === '',
                timeInputCorrect: normalizeValue || normalizeValue === ''
            });
        }

        if ('open' in nextProps) {
            this.setState({
                open: nextProps.open
            });
        }
    };

    DatePicker.prototype.normalizeValue = function normalizeValue(value) {
        var checkDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var _props = this.props,
            formater = _props.formater,
            disabledDate = _props.disabledDate;

        var mode = this.state ? this.state.mode : 'month';
        var resultValue = '';

        if (!value) {
            return resultValue;
        }

        if (typeof value === 'number' || (0, _utils.isISODate)(value)) {
            // check if value is unix timestamp or ISO Date
            // Attention: ISO date is not recommend to pass in
            resultValue = (0, _nextMoment2['default'])(value);
        } else {
            resultValue = (0, _nextMoment2['default'])(value, [formater.join(' ')]).isValid() ? (0, _nextMoment2['default'])(value, [formater.join(' ')]) : '';
        }

        if (checkDisabled && resultValue && mode === 'month') {
            var calendarDate = (0, _utils.getCalendarDate)(resultValue);
            resultValue = (0, _utils.isValidCalendarDate)(calendarDate, disabledDate) && this.isValidTime(resultValue) ? resultValue : '';
        }

        return resultValue;
    };

    DatePicker.prototype.parseValue = function parseValue(value, type) {
        if (!value || !(0, _nextMoment2['default'])(value).isValid()) {
            return '';
        }

        var result = '';
        var _props2 = this.props,
            showTime = _props2.showTime,
            formater = _props2.formater,
            format = _props2.format;


        switch (type) {
            case 'date':
                result = (0, _nextMoment2['default'])(value).format(formater[0]);
                break;
            case 'time':
                result = (0, _nextMoment2['default'])(value).format(formater[1]);
                break;
            case 'all':
                result = [];
                result.push((0, _nextMoment2['default'])(value).format(formater[0]));

                if (showTime && formater[1]) {
                    result.push((0, _nextMoment2['default'])(value).format(formater[1]));
                }

                result = result.join(' ');

                if (format) {
                    var date = (0, _nextMoment2['default'])(result, [formater.join(' ')]);
                    result = format instanceof Function ? format(date.valueOf()) : date.format(format);
                }
                break;
            default:
                break;
        }

        return result;
    };

    DatePicker.prototype.isValidTime = function isValidTime(nextValue) {
        var _props3 = this.props,
            disabledHours = _props3.disabledHours,
            disabledMinutes = _props3.disabledMinutes,
            disabledSeconds = _props3.disabledSeconds;


        var ret = true;
        var hours = disabledHours && disabledHours instanceof Function ? disabledHours() : [];
        var minutes = disabledMinutes && disabledMinutes instanceof Function ? disabledMinutes() : [];
        var seconds = disabledSeconds && disabledSeconds instanceof Function ? disabledSeconds() : [];

        if (hours.indexOf(nextValue.hour()) >= 0) {
            ret = false;
        }
        if (minutes.indexOf(nextValue.minute()) >= 0) {
            ret = false;
        }
        if (seconds.indexOf(nextValue.second()) >= 0) {
            ret = false;
        }

        return ret;
    };

    DatePicker.prototype.onDateChange = function onDateChange(nextState) {
        var _props4 = this.props,
            formater = _props4.formater,
            showTime = _props4.showTime;
        var base = nextState.base,
            mode = nextState.mode,
            value = nextState.value,
            from = nextState.from;


        if (value && value.isValid && !value.isValid()) {
            return false;
        }

        var newBase = base;
        var newMode = mode;

        if (value) {
            var normalizeValue = this.normalizeValue(value);

            // normalizeValue 可能存在不合法的情况
            if (!normalizeValue || !normalizeValue.isValid()) {
                return false;
            }

            // 非时间选择，这里判断有点复杂，优先判断用户是否设置了时间初值
            // 如果没有，判断用户是否选择了当天，非当天时间初始化为 00:00:00，当天则时间初始化为当前时间
            // @leiling.cp
            if (from !== 'select-time' && !this.state.value) {
                // 判断用户是否传入了时间默认值，如果传入了，则使用该默认值初始化时间
                if (showTime && showTime.defaultValue) {
                    var timeDefaultValue = (0, _utils.parseTime)(showTime.defaultValue, formater[1]);
                    if (timeDefaultValue && timeDefaultValue.isValid()) {
                        normalizeValue = normalizeValue.hour(timeDefaultValue.hour()).minute(timeDefaultValue.minute()).second(timeDefaultValue.second());
                    }
                } else if ((0, _nextMoment2['default'])().format(formater[0]) !== normalizeValue.format(formater[0])) {
                    // 如果选择了非当天，直接格式化为 00:00:00
                    normalizeValue = (0, _nextMoment2['default'])(normalizeValue.format(formater[0]));
                }
                // 如果用户选择的了今日，并且没有设置时间初值，则初始化为当前时间
            }

            // 时间格式化需要在特殊处理之后
            var formatValue = this.parseValue(normalizeValue, 'all');
            var formatDateValue = this.parseValue(normalizeValue, 'date');
            var formatTimeValue = this.parseValue(normalizeValue, 'time');

            switch (mode) {
                case 'year':
                case 'month':
                    newBase = !normalizeValue ? base.year(value.year()).month(value.month()) : normalizeValue;
                    break;
                case 'date':
                    newMode = from === 'select-time' ? 'date' : 'month';

                    if (!('value' in this.props)) {
                        this.setState({
                            dateInputValue: formatDateValue,
                            timeInputValue: formatTimeValue,
                            value: normalizeValue
                        });
                    }
                    if (!from && !this.props.showTime) {
                        this.onOpenChange(false);
                    }
                    this.props.onChange(new Date(normalizeValue.valueOf()), formatValue);
                    break;
            }
        }

        this.setState({
            base: newBase,
            mode: newMode
        });
    };

    DatePicker.prototype.onTimeChange = function onTimeChange(nextValue) {
        var value = this.state.value;

        var formatValue = [];

        // 如未选择日期，默认为当前日期
        value = value ? value : (0, _nextMoment2['default'])();

        var originFormatDateValue = this.parseValue(value, 'date');
        var nextFormatTimeValue = this.parseValue(nextValue, 'time');

        formatValue.push(originFormatDateValue);
        formatValue.push(nextFormatTimeValue);
        nextValue = (0, _nextMoment2['default'])(formatValue.join(' '), this.props.formater.join(' '));

        this.onDateChange({
            mode: 'date',
            value: nextValue,
            base: nextValue,
            from: 'select-time'
        });
    };

    DatePicker.prototype.onDateInputChange = function onDateInputChange(nextDateInputValue, event) {
        var _props5 = this.props,
            formater = _props5.formater,
            showTime = _props5.showTime,
            disabledDate = _props5.disabledDate;

        var _getStrRegExp = (0, _utils.getStrRegExp)(formater[0]),
            fuzzy = _getStrRegExp.fuzzy,
            exact = _getStrRegExp.exact;

        // 模糊匹配输入值


        if (fuzzy.test(nextDateInputValue)) {
            this.setState({
                dateInputValue: nextDateInputValue,
                dateInputCorrect: true
            });
        }

        // 精确匹配以修改值
        if (exact.test(nextDateInputValue)) {
            var nextValue = (0, _nextMoment2['default'])(nextDateInputValue, [formater[0]]);
            var isValid = nextValue.isValid() && (0, _utils.isValidCalendarDate)((0, _utils.getCalendarDate)(nextValue), disabledDate);

            if (isValid) {
                this.onDateChange({
                    base: nextValue,
                    value: nextValue,
                    mode: 'date'
                });
            } else {
                this.setState({
                    dateInputCorrect: false
                });
            }
        }

        // 清空
        if (nextDateInputValue === '' && !showTime) {
            this.clearValue(event);
        }
    };

    DatePicker.prototype.onTimeInputChange = function onTimeInputChange(nextTimeInputValue) {
        var formater = this.props.formater;

        var _getStrRegExp2 = (0, _utils.getStrRegExp)(formater[1]),
            fuzzy = _getStrRegExp2.fuzzy,
            exact = _getStrRegExp2.exact;

        // 模糊匹配输入值


        if (fuzzy.test(nextTimeInputValue)) {
            this.setState({
                timeInputValue: nextTimeInputValue,
                timeInputCorrect: true
            });
        }

        // 精确匹配以修改值
        if (exact.test(nextTimeInputValue)) {
            var nextValue = (0, _nextMoment2['default'])(nextTimeInputValue, [formater[1]]);
            var isValid = nextValue.isValid() && this.isValidTime(nextValue);

            if (isValid) {
                this.onTimeChange(nextValue);
            } else {
                this.setState({
                    timeInputCorrect: false
                });
            }
        }
    };

    DatePicker.prototype.onOpenChange = function onOpenChange(open) {
        if (!('open' in this.props)) {
            this.setState({
                open: open
            });
        }

        this.props.onOpenChange(open);
    };

    DatePicker.prototype.onQuickChange = function onQuickChange(type) {
        switch (type) {
            case 'now':
                {
                    var now = (0, _nextMoment2['default'])();
                    var nowStr = this.parseValue(now, 'all');

                    this.setState({
                        base: now,
                        value: now,
                        dateInputValue: this.parseValue(now, 'date'),
                        timeInputValue: this.parseValue(now, 'time'),
                        mode: 'month'
                    });
                    this.props.onChange(new Date(now.valueOf()), nowStr);
                    this.onOpenChange(false);
                    break;
                }
            case 'select-date':
                this.setState({
                    mode: 'month'
                });
                break;
            case 'select-time':
                this.setState({
                    mode: 'date'
                });
                break;
            case 'ok':
                this.onOpenChange(false);
                break;
            default:
                break;
        }
    };

    DatePicker.prototype.clearValue = function clearValue(event) {
        event.stopPropagation();

        this.setState({
            base: (0, _nextMoment2['default'])(),
            value: '',
            dateInputValue: '',
            timeInputValue: '',
            mode: 'month'
        });
        this.onOpenChange(false);
        this.props.onChange(null, '');
    };

    DatePicker.prototype.render = function render() {
        var _classNames, _classNames2, _classNames3, _classNames4;

        var _props6 = this.props,
            id = _props6.id,
            style = _props6.style,
            className = _props6.className,
            size = _props6.size,
            disabled = _props6.disabled,
            locale = _props6.locale,
            formater = _props6.formater,
            popupStyle = _props6.popupStyle,
            popupAlign = _props6.popupAlign,
            popupOffset = _props6.popupOffset,
            hasClear = _props6.hasClear,
            onChange = _props6.onChange,
            showTime = _props6.showTime,
            others = _objectWithoutProperties(_props6, ['id', 'style', 'className', 'size', 'disabled', 'locale', 'formater', 'popupStyle', 'popupAlign', 'popupOffset', 'hasClear', 'onChange', 'showTime']);

        var _state = this.state,
            value = _state.value,
            base = _state.base,
            mode = _state.mode,
            dateInputValue = _state.dateInputValue,
            timeInputValue = _state.timeInputValue,
            dateInputCorrect = _state.dateInputCorrect,
            timeInputCorrect = _state.timeInputCorrect,
            open = _state.open;

        var prefix = this.context.prefix || this.props.prefix;

        // 获得格式日期
        var formatValue = this.parseValue(value, 'all');
        var quickModule = showTime ? ['now', 'select'] : ['now'];

        // 样式
        var triggerCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'date-picker', true), _defineProperty(_classNames, prefix + 'date-picker-' + size, size), _defineProperty(_classNames, prefix + 'date-picker-disabled', disabled), _defineProperty(_classNames, prefix + 'date-picker-show-time', showTime), _defineProperty(_classNames, className, className), _classNames));
        var panelCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'date-picker-panel', true), _defineProperty(_classNames2, prefix + 'date-picker-panel-show-time', showTime), _classNames2));
        var iconSize = {
            large: 'medium',
            medium: 'small',
            small: 'xs'
        }[size];
        var dateInputCls = (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, 'error', !dateInputCorrect), _defineProperty(_classNames3, 'focus', mode !== 'date' && showTime), _classNames3));
        var timeInputCls = (0, _classnames2['default'])((_classNames4 = {}, _defineProperty(_classNames4, 'error', !timeInputCorrect), _defineProperty(_classNames4, 'focus', mode === 'date' && showTime), _classNames4));

        // 判断时分秒
        if (showTime && formater[1].indexOf('HH') < 0) {
            others.showHour = false;
        }

        if (showTime && formater[1].indexOf('mm') < 0) {
            others.showMinute = false;
        }

        if (showTime && formater[1].indexOf('ss') < 0) {
            others.showSecond = false;
        }

        // 组件
        var datePanel = _react2['default'].createElement(
            'div',
            { className: panelCls, style: popupStyle },
            _react2['default'].createElement(
                'div',
                { className: prefix + 'date-picker-input' },
                _react2['default'].createElement(_nextInput2['default'], {
                    className: dateInputCls,
                    placeholder: formater[0],
                    disabled: disabled,
                    size: 'medium',
                    value: dateInputValue,
                    onChange: this.onDateInputChange.bind(this),
                    onClick: this.onQuickChange.bind(this, 'select-date') }),
                showTime ? _react2['default'].createElement(_nextInput2['default'], {
                    className: timeInputCls,
                    placeholder: formater[1],
                    disabled: disabled || !value,
                    size: 'medium',
                    value: timeInputValue,
                    onChange: this.onTimeInputChange.bind(this),
                    onClick: !value ? null : this.onQuickChange.bind(this, 'select-time') }) : null
            ),
            mode === 'date' ? _react2['default'].createElement(_nextTimePicker.Panel, _extends({}, others, {
                locale: locale,
                value: value,
                onChange: this.onTimeChange.bind(this) })) : _react2['default'].createElement(_nextCalendar.DatePickerPanel, _extends({}, others, {
                mode: mode,
                locale: locale,
                base: base,
                value: value,
                onChange: this.onDateChange.bind(this) })),
            _react2['default'].createElement(_quickTool2['default'], _extends({}, others, { value: value, mode: mode, locale: locale, module: quickModule, onChange: this.onQuickChange.bind(this) }))
        );
        var dateTrigger = _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { id: id, className: triggerCls, style: style }),
            _react2['default'].createElement(_nextInput2['default'], {
                placeholder: locale.datePlaceholder,
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
                trigger: dateTrigger,
                triggerType: 'click',
                align: popupAlign,
                offset: popupOffset,
                onVisibleChange: this.onOpenChange.bind(this)
            }),
            datePanel
        );
    };

    return DatePicker;
}(_react.Component), _class.propTypes = {
    /**
     * 品牌样式前缀
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
     * 日期值
     */
    value: _propTypes2['default'].any,
    /**
     * 时间发生改变时的回调函数
     * @param {String} date       改变后的日期
     * @param {String} formatDate 改变后的格式化日期
     */
    onChange: _propTypes2['default'].func,
    /**
     * 是否默认展开
     */
    defaultOpen: _propTypes2['default'].bool,
    /**
     * 是否展开
     */
    open: _propTypes2['default'].bool,
    /**
     * 当面板展开状态改变时的回调函数
     * @param {Boolean} open 面板的展开状态
     */
    onOpenChange: _propTypes2['default'].func,
    /**
     * 输入框大小
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 语言
     */
    language: _propTypes2['default'].oneOf(['en-us', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'ru', 'zh-cn', 'zh-hk', 'zh-tw']),
    /**
     * 国际化配置, [参考](http://gitlab.alibaba-inc.com/next/date-picker/blob/master/src/locale/index.js)
     */
    locale: _propTypes2['default'].object,
    /**
     * 弹层面板样式
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
     * 输出日期值格式化
     */
    format: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
    /**
     * 日期格式化（可替代 format)
     */
    formater: _propTypes2['default'].array,
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否展示清空按钮
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 是否展示时间选择或传入 { defaultValue } 设置时间初值
     */
    showTime: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
    /**
     * 自定义组件样式
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    size: 'medium',
    popupAlign: 'tl tl',
    popupOffset: [0, 0],
    formater: ['YYYY-MM-DD', 'HH:mm:ss'],
    hasClear: true,
    onChange: function onChange() {},
    onOpenChange: function onOpenChange() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
DatePicker.displayName = 'DatePicker';
exports['default'] = (0, _nextLocaleProvider2['default'])(DatePicker);
module.exports = exports['default'];