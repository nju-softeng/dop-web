'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextMoment = require('../../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

var _calendarMixin = require('../calendar-mixin.js');

var _calendarMixin2 = _interopRequireDefault(_calendarMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CalendarHead = function (_Component) {
    _inherits(CalendarHead, _Component);

    function CalendarHead() {
        _classCallCheck(this, CalendarHead);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    CalendarHead.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            prefix = _props.prefix,
            type = _props.type,
            locale = _props.locale,
            language = _props.language;

        // 设置多语言

        _nextMoment2['default'].locale(language);

        // 获得多语言数据
        var elements = [],
            localeData = _nextMoment2['default'].localeData(),
            weekdaysMin = locale.format ? locale.format.veryShortWeekdays : localeData.weekdaysMin(),
            firstDayOfWeek = locale.format ? 1 : localeData.firstDayOfWeek();

        for (var i = 0; i < weekdaysMin.length; i++) {
            elements.push(_react2['default'].createElement(
                'th',
                { key: i,
                    className: prefix + 'calendar-th' },
                _react2['default'].createElement(
                    'span',
                    { className: prefix + 'calendar-th-inner' },
                    weekdaysMin[(i + firstDayOfWeek) % 7]
                )
            ));
        }

        var theadCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'calendar-thead', true), _defineProperty(_classNames, prefix + 'calendar-' + type + '-thead', type), _classNames));

        return _react2['default'].createElement(
            'thead',
            { className: theadCls, ref: 'calendar-thead' },
            _react2['default'].createElement(
                'tr',
                null,
                elements
            )
        );
    };

    return CalendarHead;
}(_react.Component);

CalendarHead.displayName = 'CalendarHead';


(0, _calendarMixin2['default'])(CalendarHead);

exports['default'] = CalendarHead;
module.exports = exports['default'];