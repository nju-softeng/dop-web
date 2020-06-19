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

var _nextIcon = require('../../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextMoment = require('../../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _calendarMixin = require('../calendar-mixin.js');

var _calendarMixin2 = _interopRequireDefault(_calendarMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CalendarBody = (_temp = _class = function (_Component) {
    _inherits(CalendarBody, _Component);

    function CalendarBody(props) {
        _classCallCheck(this, CalendarBody);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            value: props.value,
            base: props.base,
            mode: props.mode
        };
        return _this;
    }

    CalendarBody.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if ('value' in newProps) {
            this.setState({
                value: newProps.value
            });
        }

        if ('base' in newProps) {
            this.setState({
                base: newProps.base
            });
        }

        if ('mode' in newProps) {
            this.setState({
                mode: newProps.mode
            });
        }
    };

    CalendarBody.prototype.onChange = function onChange(key, nextValue) {
        var _state = this.state,
            base = _state.base,
            value = _state.value;


        switch (key) {
            case 'decade':
                base = (0, _nextMoment2['default'])(base).year(nextValue);
                break;
            case 'year':
                if (value instanceof Array) {
                    base = (0, _nextMoment2['default'])(base).year(nextValue);
                } else {
                    value = (0, _nextMoment2['default'])(value).year(nextValue);
                }
                break;
            case 'month':
                if (value instanceof Array) {
                    base = (0, _nextMoment2['default'])(base).year(nextValue.year).month(nextValue.month);
                } else {
                    value = (0, _nextMoment2['default'])(value).year(nextValue.year).month(nextValue.month);
                }
                break;
            case 'date':
                if (value instanceof Array) {
                    var _nextValue = nextValue,
                        year = _nextValue.year,
                        month = _nextValue.month,
                        date = _nextValue.date;

                    nextValue = (0, _nextMoment2['default'])().year(nextValue.year).month(nextValue.month).date(nextValue.date);

                    if (value[0] && !value[1] && value[0].valueOf() <= nextValue.valueOf()) {
                        value[1] = nextValue;
                    } else if (value[0] && !value[1] && value[0].valueOf() > nextValue.valueOf()) {
                        value[0] = nextValue;
                    } else {
                        value = [nextValue, ''];
                    }
                } else {
                    value = (0, _nextMoment2['default'])(value).year(nextValue.year).month(nextValue.month).date(nextValue.date);
                }
                break;
            default:
                break;
        }

        this.props.onChange({
            base: base,
            value: value,
            mode: key
        });
    };

    CalendarBody.prototype.getDatePanel = function getDatePanel() {
        var _props = this.props,
            prefix = _props.prefix,
            rangeMode = _props.rangeMode,
            language = _props.language,
            locale = _props.locale,
            dateCellRender = _props.dateCellRender;
        var _state2 = this.state,
            base = _state2.base,
            value = _state2.value;

        // get calendar

        var calendar = this.getCalendar(base, language, locale);
        var weekHtml = [];
        var monthHtml = [];

        for (var windex = 0; windex < calendar.length; windex++) {
            var week = calendar[windex];

            for (var dindex = 0; dindex < week.length; dindex++) {
                var _classNames;

                var dayBase = week[dindex].base,
                    dayValue = week[dindex].value,
                    isToday = false,
                    isSelectedDate = false,
                    isRangeDate = false,
                    isAllowedDate = this.isAllowedDate(dayValue);

                // 进行各种校验
                if (value instanceof Array) {
                    var rangeStart = value[0] ? value[0].valueOf() : null;
                    var rangeEnd = value[1] ? value[1].valueOf() : null;

                    isSelectedDate = this.isSameDay(dayValue.timestamp, rangeStart) || this.isSameDay(dayValue.timestamp, rangeEnd);
                    isRangeDate = rangeStart && rangeEnd && this.isRangeDay(dayValue.timestamp, [rangeStart, rangeEnd]);
                } else {
                    isSelectedDate = this.isSameDay(dayValue.timestamp, value.valueOf());
                }

                isToday = this.isSameDay(dayValue.timestamp, (0, _nextMoment2['default'])().valueOf());

                var cellCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'calendar-cell', true), _defineProperty(_classNames, prefix + 'calendar-cell-prev-month', dayValue.month < dayBase.month), _defineProperty(_classNames, prefix + 'calendar-cell-next-month', dayValue.month > dayBase.month), _defineProperty(_classNames, prefix + 'calendar-cell-today', isToday), _defineProperty(_classNames, prefix + 'calendar-cell-selected', isSelectedDate), _defineProperty(_classNames, prefix + 'calendar-cell-range', isRangeDate), _defineProperty(_classNames, prefix + 'calendar-cell-range-mode', rangeMode), _defineProperty(_classNames, prefix + 'calendar-cell-disabled', !isAllowedDate), _classNames));
                var dateAttrs = {
                    title: dayValue.year + '-' + (dayValue.month + 1) + '-' + dayValue.date,
                    onClick: isAllowedDate ? this.onChange.bind(this, 'date', dayValue) : null
                };

                weekHtml.push(_react2['default'].createElement(
                    'td',
                    { key: dindex, className: cellCls },
                    _react2['default'].createElement(
                        'div',
                        _extends({}, dateAttrs, { className: prefix + 'calendar-date' }),
                        dateCellRender ? dateCellRender(dayValue) : dayValue.date
                    )
                ));
            }

            monthHtml.push(_react2['default'].createElement(
                'tr',
                { key: windex },
                weekHtml
            ));
            weekHtml = [];
        }

        return monthHtml;
    };

    CalendarBody.prototype.getMonthPanel = function getMonthPanel() {
        var _this2 = this;

        var _props2 = this.props,
            prefix = _props2.prefix,
            locale = _props2.locale,
            language = _props2.language,
            monthCellRender = _props2.monthCellRender;
        var _state3 = this.state,
            base = _state3.base,
            value = _state3.value;

        // get locale

        var monthsLocale = locale.format ? locale.format.shortMonths : this.getMonthsLocale(language);
        var selectedMonth = value instanceof Array ? '' : value.month();

        // monthsLocale 0~11
        var monthHtml = [],
            yearHtml = [];

        var _loop = function _loop(mindex) {
            var _classNames2;

            var theDate = (0, _nextMoment2['default'])(base).month(mindex);
            var calendarDate = {
                timestamp: theDate.valueOf(),
                year: theDate.year(),
                month: mindex,
                date: theDate.date(),
                week: theDate.isoWeekday(),
                valueOf: function valueOf() {
                    return theDate.valueOf();
                }
            };
            // 校验合法性
            var isAllowedMonth = _this2.isAllowedMonth(calendarDate);
            var monthAttrs = {
                title: monthsLocale[mindex],
                onClick: isAllowedMonth ? _this2.onChange.bind(_this2, 'month', calendarDate) : null
            };

            // get class
            var cellCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'calendar-cell', true), _defineProperty(_classNames2, prefix + 'calendar-cell-selected', mindex === selectedMonth), _defineProperty(_classNames2, prefix + 'calendar-cell-disabled', !isAllowedMonth), _classNames2));

            monthHtml.push(_react2['default'].createElement(
                'td',
                { key: mindex, className: cellCls },
                _react2['default'].createElement(
                    'div',
                    _extends({}, monthAttrs, { className: prefix + 'calendar-month' }),
                    monthCellRender ? monthCellRender(calendarDate) : monthsLocale[mindex]
                )
            ));

            if (mindex % 3 === 2) {
                yearHtml.push(_react2['default'].createElement(
                    'tr',
                    { key: mindex },
                    monthHtml
                ));
                monthHtml = [];
            }
        };

        for (var mindex = 0; mindex < monthsLocale.length; mindex++) {
            _loop(mindex);
        }

        return yearHtml;
    };

    CalendarBody.prototype.getYearPanel = function getYearPanel() {
        var _this3 = this;

        var _props3 = this.props,
            prefix = _props3.prefix,
            yearCellRender = _props3.yearCellRender;
        var _state4 = this.state,
            base = _state4.base,
            value = _state4.value;

        // get decade years

        var selectedYear = value instanceof Array ? '' : value.year();
        var baseYear = base.year();
        var decadeYears = this.getDecadeYears(baseYear);

        var yearHtml = [];
        var cellHtml = void 0;
        var decadeHtml = [];

        for (var i = 0; i < decadeYears.length + 2; i++) {
            var _classNames3;

            var theYear = decadeYears[i - 1];
            var isAllowedYear = true;

            if (i === 0) {
                cellHtml = _react2['default'].createElement(
                    'div',
                    { className: prefix + 'calendar-year', onClick: this.onChange.bind(this, 'decade', baseYear - 10) },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-left', size: 'xs' })
                );
            } else if (i === decadeYears.length + 1) {
                cellHtml = _react2['default'].createElement(
                    'div',
                    { className: prefix + 'calendar-year', onClick: this.onChange.bind(this, 'decade', baseYear + 10) },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-right', size: 'xs' })
                );
            } else {
                (function () {
                    var theDate = (0, _nextMoment2['default'])(base).year(theYear);
                    var calendarDate = {
                        timestamp: theDate.valueOf(),
                        year: theYear,
                        month: theDate.month(),
                        date: theDate.date(),
                        week: theDate.isoWeekday(),
                        valueOf: function valueOf() {
                            return theDate.valueOf();
                        }
                    };

                    // 校验合法性
                    isAllowedYear = _this3.isAllowedYear(calendarDate);

                    var yearAttrs = {
                        title: theYear,
                        onClick: isAllowedYear ? _this3.onChange.bind(_this3, 'year', theYear) : null
                    };
                    cellHtml = _react2['default'].createElement(
                        'div',
                        _extends({}, yearAttrs, { className: prefix + 'calendar-year' }),
                        yearCellRender ? yearCellRender(calendarDate) : theYear
                    );
                })();
            }

            var cellCls = (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, prefix + 'calendar-cell', true), _defineProperty(_classNames3, prefix + 'calendar-cell-selected', theYear && theYear === selectedYear), _defineProperty(_classNames3, prefix + 'calendar-cell-disabled', !isAllowedYear), _classNames3));

            yearHtml.push(_react2['default'].createElement(
                'td',
                { key: i, className: cellCls },
                cellHtml
            ));

            if (i % 3 === 2) {
                decadeHtml.push(_react2['default'].createElement(
                    'tr',
                    { key: '3-' + i / 3 },
                    yearHtml
                ));
                yearHtml = [];
            }
        }

        return decadeHtml;
    };

    CalendarBody.prototype.render = function render() {
        var _classNames4;

        var _props4 = this.props,
            prefix = _props4.prefix,
            type = _props4.type;
        var mode = this.state.mode;

        var bodyHtml = [];

        if (mode === 'decade') {
            bodyHtml = this.getYearPanel();
        } else if (mode === 'year') {
            bodyHtml = this.getMonthPanel();
        } else if (mode === 'month') {
            bodyHtml = this.getDatePanel();
        }

        var bodyCls = (0, _classnames2['default'])((_classNames4 = {}, _defineProperty(_classNames4, prefix + 'calendar-tbody', true), _defineProperty(_classNames4, prefix + 'calendar-' + type + '-tbody', type), _classNames4));

        return _react2['default'].createElement(
            'tbody',
            { className: bodyCls, ref: 'calendar-tbody' },
            bodyHtml
        );
    };

    return CalendarBody;
}(_react.Component), _class.propTypes = {
    type: _propTypes2['default'].oneOf(['fullscreen', 'card']),
    rangeMode: _propTypes2['default'].bool,
    onChange: _propTypes2['default'].func
}, _temp);
CalendarBody.displayName = 'CalendarBody';


(0, _calendarMixin2['default'])(CalendarBody);

exports['default'] = CalendarBody;
module.exports = exports['default'];