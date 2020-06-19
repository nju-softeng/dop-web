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

var _nextMoment = require('../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

var _nextLocaleProvider = require('../../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _nextUtil = require('../../../next-util/lib/index.js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rangePickTool = require('./module/range-pick-tool.js');

var _rangePickTool2 = _interopRequireDefault(_rangePickTool);

var _calendarTable = require('./table/calendar-table.js');

var _calendarTable2 = _interopRequireDefault(_calendarTable);

var _calendarMixin = require('./calendar-mixin.js');

var _calendarMixin2 = _interopRequireDefault(_calendarMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var RangePickerPanel = (_temp = _class = function (_Component) {
    _inherits(RangePickerPanel, _Component);

    function RangePickerPanel(props, context) {
        _classCallCheck(this, RangePickerPanel);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            base: props.base ? (0, _nextMoment2['default'])(props.base) : (0, _nextMoment2['default'])(),
            value: _this.getRangeValue(props.value),
            mode: props.mode,
            animate: false
        };
        return _this;
    }

    RangePickerPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if ('base' in newProps) {
            this.setState({
                base: newProps.base ? (0, _nextMoment2['default'])(newProps.base) : (0, _nextMoment2['default'])()
            });
        }

        if ('value' in newProps) {
            this.setState({
                value: this.getRangeValue(newProps.value)
            });
        }

        if ('mode' in newProps) {
            this.setState({
                mode: newProps.mode
            });
        }
    };

    RangePickerPanel.prototype.onChange = function onChange(needChange, nextState) {
        if (needChange) {
            this.setState(nextState);
        }

        // Important: 兼容 0.x BR
        // see http://gitlab.alibaba-inc.com/next/work/issues/311
        if (nextState.mode === 'date' && this.props.onSelect) {
            _nextUtil.log.deprecated('onSelect', 'onChange', 'Calendar.RangePickerPanel');
            this.props.onSelect(nextState.value);
        }

        this.props.onChange(nextState);
    };

    RangePickerPanel.prototype.onAnimate = function onAnimate(animate) {
        var _this2 = this;

        this.setState({
            animate: animate
        });

        setTimeout(function () {
            _this2.setState({
                animate: false
            });
        }, 500);
    };

    RangePickerPanel.prototype.getRangeValue = function getRangeValue(value) {
        var rangeValue = [null, null];

        if (value && value instanceof Array) {
            rangeValue[0] = value[0] ? (0, _nextMoment2['default'])(value[0]) : null;
            rangeValue[1] = value[1] ? (0, _nextMoment2['default'])(value[1]) : null;
        } else {
            rangeValue[0] = value ? (0, _nextMoment2['default'])(value) : null;
        }

        return rangeValue;
    };

    RangePickerPanel.prototype.getRangeBase = function getRangeBase(base) {
        var nextMonth = base.month() + 1;
        var nextYear = base.year() + 1;
        var nextBase = nextMonth > 11 ? (0, _nextMoment2['default'])(base).year(nextYear).month(nextMonth % 12) : (0, _nextMoment2['default'])(base).month(nextMonth);

        return [base, nextBase];
    };

    RangePickerPanel.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props = this.props,
            className = _props.className,
            others = _objectWithoutProperties(_props, ['className']);

        var prefix = this.context.prefix || others.prefix;
        var _state = this.state,
            value = _state.value,
            base = _state.base,
            mode = _state.mode,
            animate = _state.animate;

        // get range base

        var rangeBase = this.getRangeBase(base);

        var calendarCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'calendar', true), _defineProperty(_classNames, prefix + 'calendar-card', true), _defineProperty(_classNames, className, className), _classNames));
        var calendarBodyCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'calendar-body', true), _defineProperty(_classNames2, prefix + 'calendar-range-body', true), _defineProperty(_classNames2, '' + animate, animate), _classNames2));

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: calendarCls, ref: 'range-picker-panel' }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'calendar-header' },
                _react2['default'].createElement(_rangePickTool2['default'], _extends({}, others, { base: base, mode: mode, onChange: this.onChange.bind(this, true), onAnimate: this.onAnimate.bind(this) }))
            ),
            mode === 'month' ? _react2['default'].createElement(
                'div',
                { className: calendarBodyCls },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'calendar-range-body-left' },
                    _react2['default'].createElement(_calendarTable2['default'], _extends({}, others, { type: 'card', base: rangeBase[0], value: value, mode: mode, rangeMode: true, onChange: this.onChange.bind(this, false) }))
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'calendar-range-body-right' },
                    _react2['default'].createElement(_calendarTable2['default'], _extends({}, others, { type: 'card', base: rangeBase[1], value: value, mode: mode, rangeMode: true, onChange: this.onChange.bind(this, false) }))
                )
            ) : _react2['default'].createElement(
                'div',
                { className: calendarBodyCls },
                _react2['default'].createElement(_calendarTable2['default'], _extends({}, others, { type: 'card', base: base, value: value, mode: mode, onChange: this.onChange.bind(this, false) }))
            )
        );
    };

    return RangePickerPanel;
}(_react.Component), _class.propTypes = {
    onChange: _propTypes2['default'].func,
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    mode: 'month',
    onChange: function onChange() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
RangePickerPanel.displayName = 'RangePickerPanel';


(0, _calendarMixin2['default'])(RangePickerPanel);

exports['default'] = (0, _nextLocaleProvider2['default'])(RangePickerPanel);
module.exports = exports['default'];