'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextMoment = require('../../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

var _nextIcon = require('../../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

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

var RangePickTool = (_temp = _class = function (_Component) {
    _inherits(RangePickTool, _Component);

    function RangePickTool(props) {
        _classCallCheck(this, RangePickTool);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            base: props.base,
            mode: props.mode,
            animate: false
        };
        return _this;
    }

    RangePickTool.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
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

    RangePickTool.prototype.onChange = function onChange(key, nextBase) {
        var _this2 = this;

        var _state = this.state,
            base = _state.base,
            mode = _state.mode;

        var cacheBase = base.valueOf();

        switch (key) {
            case 'year':
                base = (0, _nextMoment2['default'])(base).year(nextBase);
                break;
            case 'month':
                {
                    var nowYear = (0, _nextMoment2['default'])(base).year();

                    if (nextBase < 0) {
                        base = (0, _nextMoment2['default'])(base).year(nowYear - 1).month(11);
                    } else if (nextBase > 11) {
                        base = (0, _nextMoment2['default'])(base).year(nowYear + 1).month(0);
                    } else {
                        base = (0, _nextMoment2['default'])(base).month(nextBase);
                    }
                    break;
                }
            case 'mode':
                mode = nextBase;
                break;
        }

        if (base.valueOf() !== cacheBase) {
            var animate = base.valueOf() > cacheBase ? 'enter-to-right' : 'enter-to-left';
            this.props.onAnimate(animate);
            this.setState({
                animate: animate
            });
            setTimeout(function () {
                _this2.setState({
                    animate: false
                });
            }, 400);
        }

        this.props.onChange({
            base: base,
            mode: mode
        });
    };

    RangePickTool.prototype.getPicker = function getPicker() {
        var _classNames, _classNames2;

        var _props = this.props,
            prefix = _props.prefix,
            locale = _props.locale,
            language = _props.language;
        var _state2 = this.state,
            base = _state2.base,
            mode = _state2.mode,
            animate = _state2.animate;

        var picker = [];

        var selectMoment = (0, _nextMoment2['default'])(base).locale(language);
        var selectMonth = selectMoment.month();
        var selectMonthDisplay = locale.format ? locale.format.shortMonths[selectMonth] : selectMoment.format('MMMM');
        var selectYear = selectMoment.year();
        var selectYearDisplay = selectMoment.format('YYYY');
        var decadeYears = this.getDecadeYears(selectYear);
        var decadeYearsDisplay = decadeYears[0] + ' - ' + decadeYears[decadeYears.length - 1];
        var nextMonth = selectMonth + 1 > 11 ? 0 : selectMonth + 1;
        var nextMonthDisplay = locale.format ? locale.format.shortMonths[nextMonth] : selectMoment.month(nextMonth).format('MMMM');
        var nextYear = selectMonth + 1 > 11 ? selectYear + 1 : selectYear;
        var nextYearDisplay = selectMoment.year(nextYear).format('YYYY');

        // 动效
        var blockCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'calendar-pick-tool-block', true), _defineProperty(_classNames, '' + animate, animate), _classNames));
        var rangeBlockCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'calendar-pick-tool-block', true), _defineProperty(_classNames2, prefix + 'calendar-pick-tool-block-range', true), _defineProperty(_classNames2, '' + animate, animate), _classNames2));

        switch (mode) {
            case 'decade':
                picker.push(_react2['default'].createElement(
                    'a',
                    { className: prefix + 'calendar-prev-decade-btn', key: 'prev-decade', title: locale.prevYear, onClick: this.onChange.bind(this, 'year', selectYear - 1) },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-double-left' })
                ));
                picker.push(_react2['default'].createElement(
                    'div',
                    { className: blockCls, key: 'select' },
                    _react2['default'].createElement(
                        'span',
                        { className: prefix + 'calendar-ym-select' },
                        _react2['default'].createElement(
                            'span',
                            { className: prefix + 'calendar-decade-selected' },
                            decadeYearsDisplay
                        )
                    )
                ));
                picker.push(_react2['default'].createElement(
                    'a',
                    { className: prefix + 'calendar-next-decade-btn', key: 'next-decade', title: locale.nextYear, onClick: this.onChange.bind(this, 'year', selectYear + 1) },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-double-right' })
                ));
                break;
            case 'year':
                picker.push(_react2['default'].createElement(
                    'a',
                    { className: prefix + 'calendar-prev-year-btn', key: 'prev-year', title: locale.prevYear, onClick: this.onChange.bind(this, 'year', selectYear - 1) },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-double-left' })
                ));
                picker.push(_react2['default'].createElement(
                    'div',
                    { className: blockCls, key: 'select' },
                    _react2['default'].createElement(
                        'span',
                        { className: prefix + 'calendar-ym-select' },
                        _react2['default'].createElement(
                            'a',
                            { className: prefix + 'calendar-year-select', title: locale.yearSelect, onClick: this.onChange.bind(this, 'mode', 'decade') },
                            selectYearDisplay
                        )
                    )
                ));
                picker.push(_react2['default'].createElement(
                    'a',
                    { className: prefix + 'calendar-next-year-btn', key: 'next-year', title: locale.nextYear, onClick: this.onChange.bind(this, 'year', selectYear + 1) },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-double-right' })
                ));
                break;
            case 'month':
                picker.push(_react2['default'].createElement(
                    'a',
                    { className: prefix + 'calendar-prev-year-btn', title: locale.prevYear, onClick: this.onChange.bind(this, 'year', selectYear - 1), key: 'prev-year' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-double-left' })
                ));
                picker.push(_react2['default'].createElement(
                    'a',
                    { className: prefix + 'calendar-prev-month-btn', title: locale.prevMonth, onClick: this.onChange.bind(this, 'month', selectMonth - 1), key: 'prev-month' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-left' })
                ));
                picker.push(_react2['default'].createElement(
                    'div',
                    { className: rangeBlockCls, key: 'range-left' },
                    _react2['default'].createElement(
                        'span',
                        { className: prefix + 'calendar-ym-select' },
                        _react2['default'].createElement(
                            'a',
                            { className: prefix + 'calendar-month-select', title: locale.monthSelect, onClick: this.onChange.bind(this, 'mode', 'year') },
                            selectMonthDisplay
                        ),
                        _react2['default'].createElement(
                            'a',
                            { className: prefix + 'calendar-year-select', title: locale.yearSelect, onClick: this.onChange.bind(this, 'mode', 'decade') },
                            selectYearDisplay
                        )
                    )
                ));
                picker.push(_react2['default'].createElement(
                    'div',
                    { className: rangeBlockCls, key: 'range-right' },
                    _react2['default'].createElement(
                        'span',
                        { className: prefix + 'calendar-ym-select' },
                        _react2['default'].createElement(
                            'a',
                            { className: prefix + 'calendar-month-select', title: locale.monthSelect, onClick: this.onChange.bind(this, 'mode', 'year') },
                            nextMonthDisplay
                        ),
                        _react2['default'].createElement(
                            'a',
                            { className: prefix + 'calendar-year-select', title: locale.yearSelect, onClick: this.onChange.bind(this, 'mode', 'decade') },
                            nextYearDisplay
                        )
                    )
                ));
                picker.push(_react2['default'].createElement(
                    'a',
                    { className: prefix + 'calendar-next-month-btn', title: locale.nextMonth, onClick: this.onChange.bind(this, 'month', selectMonth + 1), key: 'next-month' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-right' })
                ));
                picker.push(_react2['default'].createElement(
                    'a',
                    { className: prefix + 'calendar-next-year-btn', title: locale.nextYear, onClick: this.onChange.bind(this, 'year', selectYear + 1), key: 'next-year' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-double-right' })
                ));
                break;
            default:
                break;
        }

        return picker;
    };

    RangePickTool.prototype.render = function render() {
        var _classNames3;

        var prefix = this.props.prefix;

        var picker = this.getPicker();

        var rangeCls = (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, prefix + 'calendar-pick-tool', true), _defineProperty(_classNames3, prefix + 'calendar-range-pick-tool', true), _classNames3));

        return _react2['default'].createElement(
            'div',
            { className: rangeCls, ref: 'calendar-picker' },
            picker
        );
    };

    return RangePickTool;
}(_react.Component), _class.propTypes = {
    onChange: _propTypes2['default'].func,
    onAnimate: _propTypes2['default'].func
}, _class.defaultProps = {
    onAnimate: function onAnimate() {}
}, _temp);
RangePickTool.displayName = 'RangePickTool';


(0, _calendarMixin2['default'])(RangePickTool);

exports['default'] = RangePickTool;
module.exports = exports['default'];