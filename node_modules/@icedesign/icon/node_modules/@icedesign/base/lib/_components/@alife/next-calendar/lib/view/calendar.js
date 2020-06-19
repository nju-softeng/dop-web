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

var _basicPickTool = require('./module/basic-pick-tool.js');

var _basicPickTool2 = _interopRequireDefault(_basicPickTool);

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

/** Calendar */
var Calendar = (_temp = _class = function (_Component) {
    _inherits(Calendar, _Component);

    function Calendar(props, context) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            base: props.base ? (0, _nextMoment2['default'])(props.base) : (0, _nextMoment2['default'])(),
            value: props.value ? (0, _nextMoment2['default'])(props.value) : (0, _nextMoment2['default'])(),
            mode: props.mode
        };
        return _this;
    }

    Calendar.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
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

    Calendar.prototype.onChange = function onChange(needChange, nextState) {
        if (needChange) {
            this.setState(nextState);
        }

        this.props.onChange(nextState);
    };

    Calendar.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            className = _props.className,
            onChange = _props.onChange,
            others = _objectWithoutProperties(_props, ['className', 'onChange']);

        var type = others.type;

        var prefix = this.context.prefix || others.prefix;
        var state = this.state;

        var calendarCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'calendar', true), _defineProperty(_classNames, prefix + 'calendar-' + type, type), _defineProperty(_classNames, className, className), _classNames));

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: calendarCls, ref: 'calendar' }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'calendar-header' },
                _react2['default'].createElement(_basicPickTool2['default'], _extends({}, others, { base: state.base, value: state.value, mode: state.mode, onChange: this.onChange.bind(this, true) }))
            ),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'calendar-body' },
                _react2['default'].createElement(_calendarTable2['default'], _extends({}, others, { base: state.base, value: state.value, mode: state.mode, onChange: this.onChange.bind(this, false) }))
            )
        );
    };

    return Calendar;
}(_react.Component), _class.propTypes = {
    /**
     * 样式品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 基准日期
     */
    base: _propTypes2['default'].any,
    /**
     * 选中的日期值
     */
    value: _propTypes2['default'].any,
    /**
     * 面板选择模式
     */
    mode: _propTypes2['default'].oneOf(['month', 'year', 'decade']),
    /**
     * 类型
     */
    type: _propTypes2['default'].oneOf(['fullscreen', 'card']),
    /**
     * 日期改变时的回调
     * @param {Object} calendarDate 对应 Calendar 返回的自定义日期对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 自定义样式类
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义日期渲染函数
     * @param {Object} calendarDate 对应 Calendar 返回的自定义日期对象
     * @returns {Function}
     */
    dateCellRender: _propTypes2['default'].func,
    /**
     * 自定义月份渲染函数
     * @param {Object} calendarDate 对应 Calendar 返回的自定义日期对象
     * @returns {Function}
     */
    monthCellRender: _propTypes2['default'].func,
    /**
     * 自定义年份渲染函数
     * @param {Object} calendarDate 对应 Calendar 返回的自定义日期对象
     * @returns {Function}
     */
    yearCellRender: _propTypes2['default'].func,
    /**
     * 不可选择的日期
     * @param {Object} calendarDate 对应 Calendar 返回的自定义日期对象
     * @returns {Boolean}
     */
    disabledDate: _propTypes2['default'].func,
    /**
     * 不可选择的月份
     * @param {Object} calendarDate 对应 Calendar 返回的自定义日期对象
     * @returns {Boolean}
     */
    disabledMonth: _propTypes2['default'].func,
    /**
     * 不可选择的年份
     * @param {Object} calendarDate 对应 Calendar 返回的自定义日期对象
     * @returns {Boolean}
     */
    disabledYear: _propTypes2['default'].func,
    /**
     * 多语言选择
     */
    language: _propTypes2['default'].oneOf(['en-us', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'ru', 'zh-cn', 'zh-hk', 'zh-tw']),
    /**
     * 国际化配置
     */
    locale: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-',
    type: 'fullscreen',
    mode: 'month',
    onChange: function onChange() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Calendar.displayName = 'Calendar';


(0, _calendarMixin2['default'])(Calendar);

exports['default'] = (0, _nextLocaleProvider2['default'])(Calendar);
module.exports = exports['default'];