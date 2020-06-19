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

/** DatePicker.RangePicker */
var RangePicker = (_temp = _class = function (_Component) {
    _inherits(RangePicker, _Component);

    function RangePicker(props, context) {
        _classCallCheck(this, RangePicker);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var normalizeValue = _this.normalizeValue(props.value || props.defaultValue, false);
        var formatValue = _this.parseValue(normalizeValue);

        _this.state = {
            value: normalizeValue,
            base: props.defaultBase || normalizeValue[0],
            mode: 'month',
            startDateInputValue: formatValue.startDate,
            startTimeInputValue: formatValue.startTime,
            startDateInputCorrect: formatValue.startDate || formatValue.startDate === '',
            startTimeInputCorrect: formatValue.startTime || formatValue.startTime === '',
            endDateInputValue: formatValue.endDate,
            endTimeInputValue: formatValue.endTime,
            lastSelectedTimes: [formatValue.startTime, formatValue.endTime], // 前一次选中的起始时间
            endDateInputCorrect: formatValue.endDate || formatValue.endDate === '',
            endTimeInputCorrect: formatValue.endTime || formatValue.endTime === '',
            open: props.open || props.defaultOpen
        };
        return _this;
    }

    RangePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            var normalizeValue = this.normalizeValue(nextProps.value, false);
            var formatValue = this.parseValue(normalizeValue);

            this.setState({
                value: normalizeValue,
                base: normalizeValue[0],
                startDateInputValue: formatValue.startDate,
                startTimeInputValue: formatValue.startTime,
                startDateInputCorrect: formatValue.startDate || formatValue.startDate === '',
                startTimeInputCorrect: formatValue.startTime || formatValue.startTime === '',
                endDateInputValue: formatValue.endDate,
                endTimeInputValue: formatValue.endTime,
                endDateInputCorrect: formatValue.endDate || formatValue.endDate === '',
                endTimeInputCorrect: formatValue.endTime || formatValue.endTime === ''
            });
        }

        if ('open' in nextProps) {
            this.setState({
                open: nextProps.open
            });
        }
    };

    /**
     * 规格化输入日期值
     * @param {Array} value 输入日期值数组
     * @return {Array} 返回 moment 包裹后的日期数组
     */


    RangePicker.prototype.normalizeValue = function normalizeValue(value) {
        var checkDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var formater = this.props.formater;

        var startValue = value && value[0] ? value[0] : '';
        var endValue = value && value[1] ? value[1] : '';

        if (startValue) {
            if (typeof startValue === 'number') {
                startValue = (0, _nextMoment2['default'])(startValue);
            } else {
                startValue = (0, _nextMoment2['default'])(startValue, [formater.join(' ')]).isValid() ? (0, _nextMoment2['default'])(startValue, [formater.join(' ')]) : '';
            }
        }
        if (endValue) {
            if (typeof endValue === 'number') {
                endValue = (0, _nextMoment2['default'])(endValue);
            } else {
                endValue = (0, _nextMoment2['default'])(endValue, [formater.join(' ')]).isValid() ? (0, _nextMoment2['default'])(endValue, [formater.join(' ')]) : '';
            }
        }

        var resultValue = [startValue, endValue];

        if (checkDisabled) {
            var ret = true;
            var calendarDate = void 0;

            if (startValue) {
                calendarDate = (0, _utils.getCalendarDate)(startValue);
                ret = (0, _utils.isValidCalendarDate)(calendarDate) && this.isValidTime(startValue);
            }
            if (endValue) {
                calendarDate = (0, _utils.getCalendarDate)(endValue);
                ret = (0, _utils.isValidCalendarDate)(calendarDate) && this.isValidTime(endValue);
            }
            if (!ret) {
                resultValue = ['', ''];
            }
        }

        return resultValue;
    };

    /**
     * 从日期值中解析出日期范围对象
     * @param {Array} value 规格化后的日期值
     * @return {Object} { startDate, startTime, endDate, endTime, all }
     */


    RangePicker.prototype.parseValue = function parseValue(value) {
        if (!value || !(value instanceof Array)) {
            return {
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
                all: ['', '']
            };
        }

        var startDate = '',
            startTime = '',
            endDate = '',
            endTime = '',
            all = ['', ''];

        var _props = this.props,
            showTime = _props.showTime,
            formater = _props.formater,
            format = _props.format;


        if (value[0]) {
            startDate = (0, _nextMoment2['default'])(value[0]).format(formater[0]);
            startTime = showTime ? (0, _nextMoment2['default'])(value[0]).format(formater[1]) : '';
            all[0] = this.props.showTime ? startDate + ' ' + startTime : startDate;
        }
        if (value[1]) {
            endDate = (0, _nextMoment2['default'])(value[1]).format(formater[0]);
            endTime = showTime ? (0, _nextMoment2['default'])(value[1]).format(formater[1]) : '';
            all[1] = this.props.showTime ? endDate + ' ' + endTime : endDate;
        }

        if (format) {
            var startDateTime = value[0] ? (0, _nextMoment2['default'])(value[0], [formater.join(' ')]) : '';
            var endDateTime = value[1] ? (0, _nextMoment2['default'])(value[1], [formater.join(' ')]) : '';

            if (format instanceof Function) {
                startDateTime = startDateTime ? startDateTime.valueOf() : '';
                endDateTime = endDateTime ? endDateTime.valueOf() : '';
                all = format([startDateTime, endDateTime]);
            } else {
                all[0] = startDateTime ? startDateTime.format(format) : '';
                all[1] = endDateTime ? endDateTime.format(format) : '';
            }
        }

        return {
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            all: all
        };
    };

    RangePicker.prototype.isValidTime = function isValidTime(nextValue) {
        var _props2 = this.props,
            disabledHours = _props2.disabledHours,
            disabledMinutes = _props2.disabledMinutes,
            disabledSeconds = _props2.disabledSeconds;


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

    RangePicker.prototype.onDateChange = function onDateChange(nextState) {
        var _props3 = this.props,
            formater = _props3.formater,
            showTime = _props3.showTime,
            resetTime = _props3.resetTime;
        var base = nextState.base,
            mode = nextState.mode,
            value = nextState.value,
            from = nextState.from;

        var state = this.state;

        var newBase = base;
        var newMode = mode;

        if (value) {
            switch (mode) {
                case 'year':
                    break;
                case 'month':
                    break;
                case 'date':
                    {
                        var normalizeValue = this.normalizeValue(value);
                        var isFromValid = ['select-time', 'quick-select'].indexOf(from) < 0;

                        // 判断是否需要格式化时间
                        if (normalizeValue[0] && isFromValid) {
                            // 根据 resetTime 属性来判断是否使用上次选择的时间
                            if (!resetTime && state.lastSelectedTimes[0]) {
                                var dateStr = (0, _nextMoment2['default'])(normalizeValue[0]).format(formater[0]) + ' ' + state.lastSelectedTimes[0];
                                normalizeValue[0] = (0, _nextMoment2['default'])(dateStr);
                            } else if (showTime && showTime.defaultValue && showTime.defaultValue[0]) {
                                // 如果设置了时间初值，则设时间为时间初值 showTime.defaultValue[0]
                                var formatDefaultStartTime = (0, _utils.parseTime)(showTime.defaultValue[0], formater[1]);
                                if (formatDefaultStartTime && formatDefaultStartTime.isValid()) {
                                    var _dateStr = (0, _nextMoment2['default'])(normalizeValue[0]).format(formater[0]) + ' ' + formatDefaultStartTime.format(formater[1]);
                                    normalizeValue[0] = (0, _nextMoment2['default'])(_dateStr);
                                }
                            } else {
                                // 如果没设置时间初值，则重置为 00:00:00
                                normalizeValue[0] = (0, _nextMoment2['default'])(normalizeValue[0].format(formater[0]));
                            }
                        }

                        if (normalizeValue[1] && isFromValid) {
                            if (!resetTime && state.lastSelectedTimes[1]) {
                                var _dateStr2 = (0, _nextMoment2['default'])(normalizeValue[1]).format(formater[0]) + ' ' + state.lastSelectedTimes[1];
                                normalizeValue[1] = (0, _nextMoment2['default'])(_dateStr2);
                            } else if (showTime && showTime.defaultValue && showTime.defaultValue[1]) {
                                var formatDefaultEndTime = (0, _utils.parseTime)(showTime.defaultValue[1], formater[1]);
                                if (formatDefaultEndTime && formatDefaultEndTime.isValid()) {
                                    var _dateStr3 = (0, _nextMoment2['default'])(normalizeValue[1]).format(formater[0]) + ' ' + formatDefaultEndTime.format(formater[1]);
                                    normalizeValue[1] = (0, _nextMoment2['default'])(_dateStr3);
                                }
                            } else {
                                normalizeValue[1] = (0, _nextMoment2['default'])(normalizeValue[1].format(formater[0]));
                            }
                        }

                        // 时间格式化需要在特殊处理之后
                        var formatValue = this.parseValue(normalizeValue);

                        newMode = from === 'select-time' ? 'date' : 'month';
                        newBase = state.base; // 屏蔽区间日期请求的基准日期更改

                        // 兼容原有API
                        var resultValue = [];
                        resultValue[0] = new Date(normalizeValue[0].valueOf());
                        resultValue[1] = new Date(normalizeValue[1].valueOf());

                        if (normalizeValue[0] && (!state.value[0] || state.value[0].valueOf() !== normalizeValue[0].valueOf())) {
                            this.props.onStartChange(resultValue[0], formatValue[0]);
                        }

                        if (normalizeValue[1]) {
                            this.props.onEndChange(resultValue[1], formatValue[1]);
                        }

                        if (normalizeValue[0] && normalizeValue[1]) {
                            this.props.onChange(resultValue, formatValue.all);
                        }

                        // 判断收起弹层
                        if (!from && !this.props.showTime && normalizeValue[0] && normalizeValue[1]) {
                            this.onOpenChange(false);
                        }

                        var newState = {
                            startDateInputValue: formatValue.startDate,
                            startTimeInputValue: formatValue.startTime,
                            endDateInputValue: formatValue.endDate,
                            endTimeInputValue: formatValue.endTime,
                            value: normalizeValue
                        };

                        // 记住上一次选中的时间
                        if (formatValue.startTime && formatValue.endTime) {
                            newState.lastSelectedTimes = [formatValue.startTime, formatValue.endTime];
                        }

                        // 非受控修改状态，range因为中间值的修改不会触发onChange，因此所有状态都要触发setState
                        this.setState(newState);
                        break;
                    }
            }
        }

        this.setState({
            base: newBase,
            mode: newMode
        });
    };

    RangePicker.prototype.onTimeChange = function onTimeChange(type, nextValue) {
        var value = this.state.value;

        var formatValue = [];

        // 如未选择日期，默认为当前日期
        var normalizeValue = this.normalizeValue(value);
        normalizeValue[0] = !normalizeValue[0] ? (0, _nextMoment2['default'])() : normalizeValue[0];
        normalizeValue[1] = !normalizeValue[1] ? (0, _nextMoment2['default'])() : normalizeValue[1];

        var originFormatValue = this.parseValue(normalizeValue);

        if (type === 'start') {
            var nextFormatValue = this.parseValue([nextValue, '']);

            formatValue.push(originFormatValue.startDate);
            formatValue.push(nextFormatValue.startTime);
            value[0] = (0, _nextMoment2['default'])(formatValue.join(' '), this.props.formater.join(' '));
        } else {
            var _nextFormatValue = this.parseValue(['', nextValue]);

            formatValue.push(originFormatValue.endDate);
            formatValue.push(_nextFormatValue.endTime);
            value[1] = (0, _nextMoment2['default'])(formatValue.join(' '), this.props.formater.join(' '));
        }

        this.onDateChange({
            mode: 'date',
            value: value,
            base: type === 'start' ? value[0] : value[1],
            from: 'select-time'
        });
    };

    RangePicker.prototype.onDateInputChange = function onDateInputChange(type, nextDateInputValue) {
        var value = this.state.value;
        var _props4 = this.props,
            formater = _props4.formater,
            disabledDate = _props4.disabledDate;

        var _getStrRegExp = (0, _utils.getStrRegExp)(formater[0]),
            fuzzy = _getStrRegExp.fuzzy,
            exact = _getStrRegExp.exact;

        // 模糊匹配输入值


        if (fuzzy.test(nextDateInputValue)) {
            if (type === 'start') {
                this.setState({
                    startDateInputValue: nextDateInputValue,
                    startDateInputCorrect: true
                });
            } else {
                this.setState({
                    endDateInputValue: nextDateInputValue,
                    endDateInputCorrect: true
                });
            }
        }

        // 精确匹配以修改值
        if (exact.test(nextDateInputValue)) {
            var nextValue = (0, _nextMoment2['default'])(nextDateInputValue, [formater[0]]);
            var isValid = nextValue.isValid() && (0, _utils.isValidCalendarDate)((0, _utils.getCalendarDate)(nextValue), disabledDate);

            if (isValid) {
                if (type === 'start') {
                    value[0] = nextValue;
                } else {
                    value[1] = nextValue;
                }

                this.onDateChange({
                    base: nextValue,
                    value: value,
                    mode: 'date'
                });
            } else {
                if (type === 'start') {
                    this.setState({
                        startDateInputCorrect: false
                    });
                } else {
                    this.setState({
                        endDateInputCorrect: false
                    });
                }
            }
        }
    };

    RangePicker.prototype.onTimeInputChange = function onTimeInputChange(type, nextTimeInputValue) {
        var formater = this.props.formater;

        var _getStrRegExp2 = (0, _utils.getStrRegExp)(formater[1]),
            fuzzy = _getStrRegExp2.fuzzy,
            exact = _getStrRegExp2.exact;

        // 模糊匹配输入值


        if (fuzzy.test(nextTimeInputValue)) {
            if (type === 'start') {
                this.setState({
                    startTimeInputValue: nextTimeInputValue,
                    startTimeInputCorrect: true
                });
            } else {
                this.setState({
                    endTimeInputValue: nextTimeInputValue,
                    endTimeInputCorrect: true
                });
            }
        }

        // 精确匹配以修改值
        if (exact.test(nextTimeInputValue)) {
            var nextValue = (0, _nextMoment2['default'])(nextTimeInputValue, [formater[1]]);
            var isValid = nextValue.isValid() && this.isValidTime(nextValue);

            if (isValid) {
                this.onTimeChange(type, nextValue);
            } else {
                if (type === 'start') {
                    this.setState({
                        startTimeInputCorrect: false
                    });
                } else {
                    this.setState({
                        endTimeInputCorrect: false
                    });
                }
            }
        }
    };

    RangePicker.prototype.onOpenChange = function onOpenChange(open) {
        if (!('open' in this.props)) {
            this.setState({
                open: open
            });
        }

        this.props.onOpenChange(open);
    };

    RangePicker.prototype.onQuickChange = function onQuickChange(type, value) {
        var _props5 = this.props,
            formater = _props5.formater,
            ranges = _props5.ranges;

        var now = (0, _nextMoment2['default'])();
        var nowStr = this.parseValue(now, 'all');

        switch (type) {
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
            case 'quick-select':
                {
                    // 判断是否是快捷选择操作
                    var range = ranges[value];
                    if (range && value) {
                        var normalizeValue = this.normalizeValue(range);
                        var formatValue = this.parseValue(normalizeValue);
                        var newState = {
                            value: normalizeValue,
                            base: normalizeValue[0],
                            startDateInputValue: formatValue.startDate,
                            startTimeInputValue: formatValue.startTime,
                            endDateInputValue: formatValue.endDate,
                            endTimeInputValue: formatValue.endTime
                        };
                        this.setState(newState);
                        this.onDateChange({
                            mode: 'date',
                            value: normalizeValue,
                            base: normalizeValue[0],
                            from: 'quick-select'
                        });
                        this.onOpenChange(false);
                    }
                    break;
                }
            default:
                break;
        }
    };

    RangePicker.prototype.disabledTime = function disabledTime(formatValue) {
        var _props6 = this.props,
            disabledHours = _props6.disabledHours,
            disabledMinutes = _props6.disabledMinutes,
            disabledSeconds = _props6.disabledSeconds;
        var startDate = formatValue.startDate,
            endDate = formatValue.endDate,
            startTime = formatValue.startTime,
            endTime = formatValue.endTime;

        var disabledTime = {};

        if (startDate && startTime && startDate === endDate) {
            var formatStartTime = (0, _nextMoment2['default'])(startTime, this.props.formater[1]);
            var formatEndTime = (0, _nextMoment2['default'])(endTime, this.props.formater[1]);

            var newDisabledHours = function newDisabledHours() {
                var result = disabledHours instanceof Function ? disabledHours() : [];

                for (var i = 0; i < formatStartTime.hour(); i++) {
                    result.push(i);
                }
                return result;
            };
            var newDisabledMinutes = function newDisabledMinutes() {
                var result = disabledMinutes instanceof Function ? disabledMinutes() : [];

                if (formatStartTime.hour() === formatEndTime.hour()) {
                    for (var i = 0; i < formatStartTime.minute(); i++) {
                        result.push(i);
                    }
                }
                return result;
            };
            var newDisabledSeconds = function newDisabledSeconds() {
                var result = disabledSeconds instanceof Function ? disabledSeconds() : [];

                if (formatStartTime.hour() === formatEndTime.hour() && formatStartTime.minute() === formatEndTime.minute()) {
                    for (var i = 0; i <= formatStartTime.second(); i++) {
                        result.push(i);
                    }
                }
                return result;
            };

            disabledTime = {
                disabledHours: newDisabledHours,
                disabledMinutes: newDisabledMinutes,
                disabledSeconds: newDisabledSeconds
            };
        }

        return disabledTime;
    };

    RangePicker.prototype.clearValue = function clearValue(e) {
        e.stopPropagation();

        this.setState({
            value: '',
            base: (0, _nextMoment2['default'])(),
            mode: 'month',
            startDateInputValue: '',
            startTimeInputValue: '',
            endDateInputValue: '',
            endTimeInputValue: '',
            lastSelectedTimes: []
        });
        this.onOpenChange(false);
        this.props.onStartChange(null, '');
        this.props.onEndChange(null, '');
        this.props.onChange([null, null], ['', '']);
    };

    RangePicker.prototype.render = function render() {
        var _classNames, _classNames2, _classNames3, _classNames4, _classNames5, _classNames6;

        var _props7 = this.props,
            id = _props7.id,
            style = _props7.style,
            className = _props7.className,
            size = _props7.size,
            disabled = _props7.disabled,
            locale = _props7.locale,
            formater = _props7.formater,
            popupStyle = _props7.popupStyle,
            popupAlign = _props7.popupAlign,
            popupOffset = _props7.popupOffset,
            hasClear = _props7.hasClear,
            onChange = _props7.onChange,
            showTime = _props7.showTime,
            ranges = _props7.ranges,
            others = _objectWithoutProperties(_props7, ['id', 'style', 'className', 'size', 'disabled', 'locale', 'formater', 'popupStyle', 'popupAlign', 'popupOffset', 'hasClear', 'onChange', 'showTime', 'ranges']);

        var _state = this.state,
            value = _state.value,
            base = _state.base,
            mode = _state.mode,
            startDateInputValue = _state.startDateInputValue,
            startTimeInputValue = _state.startTimeInputValue,
            endDateInputValue = _state.endDateInputValue,
            endTimeInputValue = _state.endTimeInputValue,
            startDateInputCorrect = _state.startDateInputCorrect,
            startTimeInputCorrect = _state.startTimeInputCorrect,
            endDateInputCorrect = _state.endDateInputCorrect,
            endTimeInputCorrect = _state.endTimeInputCorrect,
            open = _state.open;

        var prefix = this.context.prefix || this.props.prefix;

        // 获得格式日期
        var formatValue = this.parseValue(value);
        var quickModule = showTime ? ['select'] : [];

        // 样式
        var triggerCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'date-picker', true), _defineProperty(_classNames, prefix + 'range-picker', true), _defineProperty(_classNames, prefix + 'range-picker-' + size, size), _defineProperty(_classNames, prefix + 'range-picker-disabled', disabled), _defineProperty(_classNames, prefix + 'range-picker-show-time', showTime), _defineProperty(_classNames, className, className), _classNames));
        var panelCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'range-picker-panel', true), _defineProperty(_classNames2, prefix + 'range-picker-panel-show-time', showTime), _classNames2));
        var iconSize = {
            large: 'medium',
            medium: 'small',
            small: 'xs'
        }[size];
        var startDateInputCls = (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, 'focus', mode !== 'date' && !value[0] && showTime), _defineProperty(_classNames3, 'error', !startDateInputCorrect), _classNames3));
        var startTimeInputCls = (0, _classnames2['default'])((_classNames4 = {}, _defineProperty(_classNames4, prefix + 'range-picker-panel-time-input', true), _defineProperty(_classNames4, 'focus', mode === 'date' && !value[0] && showTime), _defineProperty(_classNames4, 'error', !startTimeInputCorrect), _classNames4));
        var endDateInputCls = (0, _classnames2['default'])((_classNames5 = {}, _defineProperty(_classNames5, 'focus', mode !== 'date' && !value[1] && showTime), _defineProperty(_classNames5, 'error', !endDateInputCorrect), _classNames5));
        var endTimeInputCls = (0, _classnames2['default'])((_classNames6 = {}, _defineProperty(_classNames6, prefix + 'range-picker-panel-time-input', true), _defineProperty(_classNames6, 'focus', mode === 'date' && !value[1] && showTime), _defineProperty(_classNames6, 'error', !endTimeInputCorrect), _classNames6));

        // 判断时分秒
        if (showTime && formater[1].indexOf('ss') < 0) {
            others.showSecond = false;
        }
        if (showTime && formater[1].indexOf('HH') < 0) {
            others.showHour = false;
        }

        // 同一天禁用时间
        var disabledTime = this.disabledTime(formatValue);

        // 组件
        var datePanel = _react2['default'].createElement(
            'div',
            { className: panelCls, style: popupStyle },
            _react2['default'].createElement(
                'div',
                { className: prefix + 'range-picker-input' },
                _react2['default'].createElement(_nextInput2['default'], {
                    className: startDateInputCls,
                    placeholder: formater[0],
                    disabled: disabled,
                    size: 'medium',
                    value: startDateInputValue,
                    onChange: this.onDateInputChange.bind(this, 'start'),
                    onClick: this.onQuickChange.bind(this, 'select-date') }),
                showTime ? _react2['default'].createElement(_nextInput2['default'], {
                    className: startTimeInputCls,
                    placeholder: formater[1],
                    disabled: disabled || !value[0] || !value[1],
                    size: 'medium',
                    value: startTimeInputValue,
                    onChange: this.onTimeInputChange.bind(this, 'start'),
                    onClick: this.onQuickChange.bind(this, 'select-time') }) : null,
                _react2['default'].createElement(
                    'span',
                    { className: prefix + 'range-picker-input-separator' },
                    '-'
                ),
                _react2['default'].createElement(_nextInput2['default'], {
                    className: endDateInputCls,
                    placeholder: formater[0],
                    disabled: disabled,
                    size: 'medium',
                    value: endDateInputValue,
                    onChange: this.onDateInputChange.bind(this, 'end'),
                    onClick: this.onQuickChange.bind(this, 'select-date') }),
                showTime ? _react2['default'].createElement(_nextInput2['default'], {
                    className: endTimeInputCls,
                    placeholder: formater[1],
                    disabled: disabled || !value[0] || !value[1],
                    size: 'medium',
                    value: endTimeInputValue,
                    onChange: this.onTimeInputChange.bind(this, 'end'),
                    onClick: this.onQuickChange.bind(this, 'select-time') }) : null
            ),
            mode === 'date' ? _react2['default'].createElement(
                'div',
                { className: prefix + 'range-picker-panel-time' },
                _react2['default'].createElement(_nextTimePicker.Panel, _extends({}, others, {
                    locale: locale,
                    value: value[0],
                    onChange: this.onTimeChange.bind(this, 'start') })),
                _react2['default'].createElement(_nextTimePicker.Panel, _extends({}, others, disabledTime, {
                    locale: locale,
                    value: value[1],
                    onChange: this.onTimeChange.bind(this, 'end') }))
            ) : _react2['default'].createElement(_nextCalendar.RangePickerPanel, _extends({}, others, {
                mode: mode,
                locale: locale,
                base: base,
                value: value,
                onChange: this.onDateChange.bind(this) })),
            _react2['default'].createElement(_quickTool2['default'], {
                value: value,
                mode: mode,
                locale: locale,
                module: quickModule,
                shortcuts: Object.keys(ranges),
                onChange: this.onQuickChange.bind(this) })
        );
        var dateTrigger = _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { id: id, className: triggerCls, style: style }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'range-picker-trigger' },
                _react2['default'].createElement(_nextInput2['default'], {
                    placeholder: locale.rangeStartPlaceholder,
                    disabled: disabled,
                    size: size,
                    value: formatValue.all[0] }),
                _react2['default'].createElement(
                    'span',
                    { className: prefix + 'range-picker-separator' },
                    '-'
                ),
                _react2['default'].createElement(_nextInput2['default'], {
                    placeholder: locale.rangeEndPlaceholder,
                    disabled: disabled,
                    size: size,
                    value: formatValue.all[1] })
            ),
            (formatValue.all[0] || formatValue.all[1]) && !disabled && hasClear ? _react2['default'].createElement(_nextIcon2['default'], { type: 'delete-filling', size: iconSize, title: locale.clear, onClick: this.clearValue.bind(this) }) : _react2['default'].createElement(_nextIcon2['default'], { type: 'calendar', size: iconSize })
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

    return RangePicker;
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
     * 默认日期值
     */
    defaultValue: _propTypes2['default'].array,
    /**
     * 日期值
     */
    value: _propTypes2['default'].array,
    /**
     * 时间发生改变的回调
     * @param {Array} dateRange        选中的日期区间数组
     * @param {Array} formatDateRnage  格式化后的选中的日期区间数组
     */
    onChange: _propTypes2['default'].func,
    /**
     * 开始日期变化时的回调
     * @param {String} date 开始日期
     */
    onStartChange: _propTypes2['default'].func,
    /**
     * 结束日期变化时的回调
     * @param {String} date 结束日期
     */
    onEndChange: _propTypes2['default'].func,
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
     * @param {Boolean} 面板的 open 状态
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
     * 国际化配置，[参考](http://gitlab.alibaba-inc.com/next/date-picker/blob/master/src/locale/index.js)
     */
    locale: _propTypes2['default'].object,
    /**
     * 弹层样式
     */
    popupStyle: _propTypes2['default'].object,
    /**
     * 弹层对其方式
     */
    popupAlign: _propTypes2['default'].string,
    /**
     * 弹层偏移
     */
    popupOffset: _propTypes2['default'].array,
    /**
     * 输出日期的格式
     */
    format: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
    /**
     * 日期值格式化（可替代 format）
     */
    formater: _propTypes2['default'].array,
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否有清空按钮
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 是否显示时间或传入 { defaultValue } 设置时间初值
     */
    showTime: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
    /**
     * 重新选择时是否重置时间
     */
    resetTime: _propTypes2['default'].bool,
    /**
     * 用户预设的快捷选择的日期范围
     */
    ranges: _propTypes2['default'].object,
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
    showTime: false,
    resetTime: true,
    ranges: {},
    onChange: function onChange() {},
    onStartChange: function onStartChange() {},
    onEndChange: function onEndChange() {},
    onOpenChange: function onOpenChange() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
RangePicker.displayName = 'RangePicker';
exports['default'] = (0, _nextLocaleProvider2['default'])(RangePicker);
module.exports = exports['default'];