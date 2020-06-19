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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _calendarThead = require('./calendar-thead.js');

var _calendarThead2 = _interopRequireDefault(_calendarThead);

var _calendarTbody = require('./calendar-tbody.js');

var _calendarTbody2 = _interopRequireDefault(_calendarTbody);

var _calendarMixin = require('../calendar-mixin.js');

var _calendarMixin2 = _interopRequireDefault(_calendarMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CalendarTable = (_temp = _class = function (_Component) {
    _inherits(CalendarTable, _Component);

    function CalendarTable(props) {
        _classCallCheck(this, CalendarTable);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            value: props.value,
            base: props.base,
            mode: props.mode
        };
        return _this;
    }

    CalendarTable.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
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

    CalendarTable.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            prefix = _props.prefix,
            onChange = _props.onChange,
            others = _objectWithoutProperties(_props, ['prefix', 'onChange']);

        var type = others.type;
        var _state = this.state,
            value = _state.value,
            base = _state.base,
            mode = _state.mode;


        var tableCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'calendar-table', true), _defineProperty(_classNames, prefix + 'calendar-' + mode + '-table', mode), _defineProperty(_classNames, prefix + 'calendar-' + type + '-table', type), _classNames));

        return _react2['default'].createElement(
            'table',
            { className: tableCls, ref: 'calendar-table' },
            mode === 'month' ? _react2['default'].createElement(_calendarThead2['default'], _extends({}, this.props, { value: value })) : null,
            _react2['default'].createElement(_calendarTbody2['default'], _extends({}, others, { base: base, value: value, mode: mode, onChange: onChange }))
        );
    };

    return CalendarTable;
}(_react.Component), _class.propTypes = {
    type: _propTypes2['default'].oneOf(['fullscreen', 'card']),
    onChange: _propTypes2['default'].func
}, _temp);
CalendarTable.displayName = 'CalendarTable';


(0, _calendarMixin2['default'])(CalendarTable);

exports['default'] = CalendarTable;
module.exports = exports['default'];