'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextMoment = require('../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

var _nextUtil = require('../../../next-util/lib/index.js');

var _commonMixin = require('./common-mixin.js');

var _commonMixin2 = _interopRequireDefault(_commonMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TimePickerPanel = (_temp = _class = function (_Component) {
    _inherits(TimePickerPanel, _Component);

    function TimePickerPanel(props, context) {
        _classCallCheck(this, TimePickerPanel);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            value: props.value ? (0, _nextMoment2['default'])(props.value) : (0, _nextMoment2['default'])()
        };
        return _this;
    }

    TimePickerPanel.prototype.componentDidMount = function componentDidMount() {
        this.scrollToSelected(0);
    };

    TimePickerPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if ('value' in newProps) {
            this.setState({
                value: newProps.value ? (0, _nextMoment2['default'])(newProps.value) : (0, _nextMoment2['default'])()
            });
        }
    };

    TimePickerPanel.prototype.componentDidUpdate = function componentDidUpdate() {
        this.scrollToSelected(120);
    };

    TimePickerPanel.prototype.scrollToSelected = function scrollToSelected(duration) {
        var value = this.state.value;


        var hourDuration = 0,
            minuteDuration = 0,
            secondDuration = 0;

        if (this.currentSelectType === 'hour') {
            hourDuration = duration;
        } else if (this.currentSelectType === 'minute') {
            minuteDuration = duration;
        } else {
            secondDuration = duration;
        }

        if (this.hourSelect && this.hourList) {
            this.scrollTo(this.hourSelect, this.hourList.children[value.hour()].offsetTop, hourDuration);
        }

        if (this.minuteSelect && this.minuteList) {
            this.scrollTo(this.minuteSelect, this.minuteList.children[value.minute()].offsetTop, minuteDuration);
        }

        if (this.secondSelect && this.secondList) {
            this.scrollTo(this.secondSelect, this.secondList.children[value.second()].offsetTop, secondDuration);
        }
    };

    TimePickerPanel.prototype.onChange = function onChange(key, nextValue) {
        var value = this.state.value;


        switch (key) {
            case 'hour':
                value = (0, _nextMoment2['default'])(value).hour(nextValue);
                break;
            case 'minute':
                value = (0, _nextMoment2['default'])(value).minute(nextValue);
                break;
            case 'second':
                value = (0, _nextMoment2['default'])(value).second(nextValue);
                break;
            default:
                break;
        }
        this.currentSelectType = key;
        this.props.onChange(value);
    };

    TimePickerPanel.prototype.normalizeDisabledOptions = function normalizeDisabledOptions(options) {
        options = options && options instanceof Function ? options() : [];
        return options;
    };

    TimePickerPanel.prototype.renderPanel = function renderPanel(type, show) {
        var prefix = this.context.prefix || this.props.prefix;
        var value = this.state.value;


        var disabledOptions = this.normalizeDisabledOptions(this.props['disabled' + type.charAt(0).toUpperCase() + type.substr(1) + 's']);
        var count = type === 'hour' ? 24 : 60;
        var html = [];

        if (!show) {
            disabledOptions = [];
            for (var i = 0; i < count; i++) {
                disabledOptions.push(i);
            }
        }

        for (var _i = 0; _i < count; _i++) {
            var _classNames;

            var cls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'time-picker-cell-' + type, true), _defineProperty(_classNames, prefix + 'time-picker-cell-selected', value[type]() === _i), _defineProperty(_classNames, prefix + 'time-picker-cell-disabled', this.isInArray(_i, disabledOptions)), _classNames));
            var attrs = {
                onClick: this.isInArray(_i, disabledOptions) ? null : this.onChange.bind(this, type, _i)
            };

            html.push(_react2['default'].createElement(
                'li',
                _extends({ className: cls }, attrs, { key: _i }),
                _i
            ));
        }
        return html;
    };

    TimePickerPanel.prototype._setInstance = function _setInstance(name, ref) {
        this[name] = ref;
    };

    TimePickerPanel.prototype.render = function render() {
        var _props = this.props,
            showHour = _props.showHour,
            showMinute = _props.showMinute,
            showSecond = _props.showSecond,
            locale = _props.locale,
            others = _objectWithoutProperties(_props, ['showHour', 'showMinute', 'showSecond', 'locale']);

        var prefix = this.context.prefix || this.props.prefix;

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: prefix + 'time-picker-panel' }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'time-picker-panel-title' },
                _react2['default'].createElement(
                    'span',
                    { className: prefix + 'time-picker-panel-title-cell' },
                    locale.hour
                ),
                _react2['default'].createElement(
                    'span',
                    { className: prefix + 'time-picker-panel-title-cell' },
                    locale.minute
                ),
                _react2['default'].createElement(
                    'span',
                    { className: prefix + 'time-picker-panel-title-cell' },
                    locale.second
                )
            ),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'time-picker-panel-body' },
                _react2['default'].createElement(
                    'div',
                    { ref: this._setInstance.bind(this, 'hourSelect'), className: prefix + 'time-picker-select' },
                    _react2['default'].createElement(
                        'ul',
                        { ref: this._setInstance.bind(this, 'hourList') },
                        this.renderPanel('hour', showHour)
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { ref: this._setInstance.bind(this, 'minuteSelect'), className: prefix + 'time-picker-select' },
                    _react2['default'].createElement(
                        'ul',
                        { ref: this._setInstance.bind(this, 'minuteList') },
                        this.renderPanel('minute', showMinute)
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { ref: this._setInstance.bind(this, 'secondSelect'), className: prefix + 'time-picker-select' },
                    _react2['default'].createElement(
                        'ul',
                        { ref: this._setInstance.bind(this, 'secondList') },
                        this.renderPanel('second', showSecond)
                    )
                )
            )
        );
    };

    return TimePickerPanel;
}(_react.Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    value: _propTypes2['default'].any,
    onChange: _propTypes2['default'].func,
    showHour: _propTypes2['default'].bool,
    showMinute: _propTypes2['default'].bool,
    showSecond: _propTypes2['default'].bool,
    disabledHours: _propTypes2['default'].func,
    disabledMinutes: _propTypes2['default'].func,
    disabledSeconds: _propTypes2['default'].func
}, _class.defaultProps = {
    prefix: 'next-',
    locale: {},
    onChange: function onChange() {},
    showHour: true,
    showMinute: true,
    showSecond: true
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
TimePickerPanel.displayName = 'TimePickerPanel';
exports['default'] = TimePickerPanel;


(0, _commonMixin2['default'])(TimePickerPanel);
module.exports = exports['default'];