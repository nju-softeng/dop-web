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

var _datePickTool = require('./module/date-pick-tool.js');

var _datePickTool2 = _interopRequireDefault(_datePickTool);

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

var DatePickerPanel = (_temp = _class = function (_Component) {
    _inherits(DatePickerPanel, _Component);

    function DatePickerPanel(props, context) {
        _classCallCheck(this, DatePickerPanel);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            base: props.base ? (0, _nextMoment2['default'])(props.base) : (0, _nextMoment2['default'])(),
            value: props.value ? (0, _nextMoment2['default'])(props.value) : (0, _nextMoment2['default'])(),
            mode: props.mode,
            animate: false
        };
        return _this;
    }

    DatePickerPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if ('base' in newProps) {
            this.setState({
                base: newProps.base ? (0, _nextMoment2['default'])(newProps.base) : (0, _nextMoment2['default'])()
            });
        }

        if ('value' in newProps) {
            this.setState({
                value: newProps.value ? (0, _nextMoment2['default'])(newProps.value) : (0, _nextMoment2['default'])()
            });
        }

        if ('mode' in newProps) {
            this.setState({
                mode: newProps.mode
            });
        }
    };

    DatePickerPanel.prototype.onChange = function onChange(needChange, nextState) {
        var base = nextState.base,
            mode = nextState.mode;


        if (needChange) {
            this.setState({
                base: base,
                mode: mode
            });
        }

        // Important: 兼容 0.x BR
        // see http://gitlab.alibaba-inc.com/next/work/issues/311
        if (mode === 'date' && this.props.onSelect) {
            _nextUtil.log.deprecated('onSelect', 'onChange', 'Calendar.DatePickerPanel');
            this.props.onSelect(base);
        }

        this.props.onChange(nextState);
    };

    DatePickerPanel.prototype.onAnimate = function onAnimate(animate) {
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

    DatePickerPanel.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props = this.props,
            className = _props.className,
            others = _objectWithoutProperties(_props, ['className']);

        var prefix = this.context.prefix || others.prefix;
        var _state = this.state,
            base = _state.base,
            value = _state.value,
            mode = _state.mode,
            animate = _state.animate;


        var calendarCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'calendar', true), _defineProperty(_classNames, prefix + 'calendar-card', true), _defineProperty(_classNames, className, className), _classNames));
        var calendarBodyCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'calendar-body', true), _defineProperty(_classNames2, '' + animate, animate), _classNames2));

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: calendarCls, ref: 'date-picker-panel' }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'calendar-header' },
                _react2['default'].createElement(_datePickTool2['default'], _extends({}, others, { base: base, mode: mode, onChange: this.onChange.bind(this, true), onAnimate: this.onAnimate.bind(this) }))
            ),
            _react2['default'].createElement(
                'div',
                { className: calendarBodyCls },
                _react2['default'].createElement(_calendarTable2['default'], _extends({}, others, { type: 'card', base: base, value: value, mode: mode, onChange: this.onChange.bind(this, false) }))
            )
        );
    };

    return DatePickerPanel;
}(_react.Component), _class.propTypes = {
    onChange: _propTypes2['default'].func,
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    mode: 'month',
    onChange: function onChange() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
DatePickerPanel.displayName = 'DatePickerPanel';


(0, _calendarMixin2['default'])(DatePickerPanel);

exports['default'] = (0, _nextLocaleProvider2['default'])(DatePickerPanel);
module.exports = exports['default'];