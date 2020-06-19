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

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextInput = require('../../next-input/lib/index.js');

var _nextInput2 = _interopRequireDefault(_nextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function noop() {}

function preventDefault(e) {
    e.preventDefault();
}

/** NumberPicker */
var NumberPicker = (_temp = _class = function (_React$Component) {
    _inherits(NumberPicker, _React$Component);

    function NumberPicker(props) {
        _classCallCheck(this, NumberPicker);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        var value = void 0;
        if ('value' in props) {
            value = props.value;
        } else {
            value = props.defaultValue;
        }
        value = _this.toPrecisionAsStep(value);
        _this.state = {
            value: value,
            focused: props.autoFocus
        };
        return _this;
    }

    NumberPicker.prototype.componentDidMount = function componentDidMount() {
        this.componentDidUpdate();
    };

    NumberPicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            if (nextProps.value === undefined) {
                this.setState({
                    value: ''
                });
                return;
            }
            var value = this.toPrecisionAsStep(nextProps.value);
            this.setState({
                value: value
            });
        }
    };

    NumberPicker.prototype.componentDidUpdate = function componentDidUpdate() {
        if (this.state.focused && document.activeElement !== this.refs.input.getInputNode()) {
            this.refs.input.getInputNode().focus();
        }
    };

    NumberPicker.prototype.onChange = function onChange(value, e) {
        if (this.props.editable === true) {
            value = value.trim();
            // ignore space
            if (this.state.value === value) {
                return;
            }

            // in case of autoCorrect ('0.'=>0, '0.0'=>0) , we have these steps
            if (value) {
                // ignore when input start form '-'
                if (value === '-' || this.state.value === '-') {
                    this.setState({
                        value: value
                    });
                    return;
                }
                // ignore when next value = last value.
                // ps: Number('0.')=0 ; Number('0.0')=0;
                // but take care of Number('')=0;
                if (Number(this.state.value) === Number(value)) {
                    this.setState({
                        value: value
                    });
                    return;
                }
                // ignore when value < min (because number is inputted one by one)
                if (!isNaN(value) && Number(value) < this.props.min) {
                    this.setState({
                        value: value
                    });
                    return;
                }
            }

            this.setInputValue(value, e);
        }
    };

    NumberPicker.prototype.onCorrect = function onCorrect(currentValue, oldValue) {
        this.props.onCorrect({
            currentValue: currentValue,
            oldValue: oldValue
        });
    };

    NumberPicker.prototype.onKeyDown = function onKeyDown(e) {
        var _props;

        if (e.keyCode === 38) {
            this.up(e);
        } else if (e.keyCode === 40) {
            this.down(e);
        }

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        (_props = this.props).onKeyDown.apply(_props, [e].concat(args));
    };

    NumberPicker.prototype.onFocus = function onFocus() {
        var _props2;

        this.setState({
            focused: true
        });
        (_props2 = this.props).onFocus.apply(_props2, arguments);
    };

    NumberPicker.prototype.onBlur = function onBlur(e) {
        var _props3;

        this.setState({
            focused: false
        });
        var value = this.getCurrentValidValue(e.target.value.trim());
        if (this.state.value !== value) {
            this.setValue(value, e);
        }

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }

        (_props3 = this.props).onBlur.apply(_props3, [e].concat(args));
    };

    NumberPicker.prototype.onStepMouseDown = function onStepMouseDown(e) {
        e.preventDefault();
        var value = this.getCurrentValidValue(this.state.value);
        this.setState({ value: value });
    };

    NumberPicker.prototype.getCurrentValidValue = function getCurrentValidValue(value) {
        var val = value;
        var props = this.props;
        if (val === '') {
            val = '';
        } else if (!isNaN(val)) {
            val = Number(val);
            if (val < props.min) {
                val = props.min;
            }
            if (val > props.max) {
                val = props.max;
            }
        } else {
            val = this.state.value;
        }

        var correctValue = this.toPrecisionAsStep(val);
        if ('' + correctValue !== '' + value) {
            this.onCorrect(correctValue, value);
        }

        return correctValue;
    };

    NumberPicker.prototype.setValue = function setValue(v, e) {
        if (!('value' in this.props)) {
            this.setState({
                value: v
            });
        }
        this.props.onChange(isNaN(v) || v === '' ? undefined : v, e);
    };

    NumberPicker.prototype.setInputValue = function setInputValue(v, e) {
        var value = this.getCurrentValidValue(v);
        this.setValue(value, e);
    };

    NumberPicker.prototype.getPrecision = function getPrecision() {
        var props = this.props;
        var stepString = props.step.toString();
        if (stepString.indexOf('e-') >= 0) {
            return parseInt(stepString.slice(stepString.indexOf('e-')), 10);
        }
        var precision = 0;
        if (stepString.indexOf('.') >= 0) {
            precision = stepString.length - stepString.indexOf('.') - 1;
        }
        return precision;
    };

    NumberPicker.prototype.getPrecisionFactor = function getPrecisionFactor() {
        var precision = this.getPrecision();
        return Math.pow(10, precision);
    };

    NumberPicker.prototype.toPrecisionAsStep = function toPrecisionAsStep(num) {
        if (isNaN(num) || num === '') {
            return num;
        }
        var precision = this.getPrecision();
        return Number(Number(num).toFixed(precision));
    };

    NumberPicker.prototype.upStep = function upStep(val) {
        var _props4 = this.props,
            step = _props4.step,
            min = _props4.min;

        var precisionFactor = this.getPrecisionFactor();
        var result = void 0;
        if (typeof val === 'number') {
            result = (precisionFactor * val + precisionFactor * step) / precisionFactor;
        } else {
            result = min === -Infinity ? step : min;
        }
        return this.toPrecisionAsStep(result);
    };

    NumberPicker.prototype.downStep = function downStep(val) {
        var _props5 = this.props,
            step = _props5.step,
            min = _props5.min;

        var precisionFactor = this.getPrecisionFactor();
        var result = void 0;
        if (typeof val === 'number') {
            result = (precisionFactor * val - precisionFactor * step) / precisionFactor;
        } else {
            result = min === -Infinity ? -step : min;
        }
        return this.toPrecisionAsStep(result);
    };

    NumberPicker.prototype.step = function step(type, e) {
        if (e) {
            e.preventDefault();
        }
        var props = this.props;
        if (props.disabled) {
            return;
        }
        var value = this.state.value;
        if (isNaN(value)) {
            return;
        }
        var val = this[type + 'Step'](value);
        if (val > props.max || val < props.min) {
            return;
        }
        var ne = _extends({ triggerType: type }, e);
        this.setValue(val, ne);
        this.setState({
            focused: true
        });
    };

    NumberPicker.prototype.down = function down(e) {
        this.step('down', e);
    };

    NumberPicker.prototype.up = function up(e) {
        this.step('up', e);
    };

    NumberPicker.prototype.focus = function focus() {
        this.refs.input.getInputNode().focus();
    };

    NumberPicker.prototype.render = function render() {
        var _classNames;

        /* eslint-disable no-unused-vars */
        var _props6 = this.props,
            type = _props6.type,
            prefix = _props6.prefix,
            editable = _props6.editable,
            inputWidth = _props6.inputWidth,
            className = _props6.className,
            props = _objectWithoutProperties(_props6, ['type', 'prefix', 'editable', 'inputWidth', 'className']);
        /* eslint-enable */


        var inputStyle = {
            width: inputWidth
        };

        var prefixCls = (this.context.prefix || prefix) + 'number-picker';

        // Remove React warning.
        // Warning: Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both).
        delete props.defaultValue;

        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-' + this.props.type, this.props.type), _defineProperty(_classNames, prefixCls + '-disabled', props.disabled), _defineProperty(_classNames, className, className), _classNames));

        var upDisabledClass = '';
        var downDisabledClass = '';
        var value = this.state.value;
        if (!isNaN(value)) {
            var val = Number(value);
            if (val >= props.max) {
                upDisabledClass = prefixCls + '-handler-up-disabled';
            }
            if (val <= props.min) {
                downDisabledClass = prefixCls + '-handler-down-disabled';
            }
        } else {
            upDisabledClass = prefixCls + '-handler-up-disabled';
            downDisabledClass = prefixCls + '-handler-down-disabled';
        }

        // ref for test
        return _react2['default'].createElement(
            'div',
            { className: classes, style: props.style },
            _react2['default'].createElement(
                'div',
                { className: prefixCls + '-handler-wrap' },
                _react2['default'].createElement(
                    'a',
                    { unselectable: 'unselectable',
                        ref: 'up',
                        onClick: upDisabledClass ? this.props.onDisabled : this.up.bind(this),
                        onMouseDown: this.onStepMouseDown.bind(this),
                        className: prefixCls + '-handler ' + prefixCls + '-handler-up ' + upDisabledClass },
                    _react2['default'].createElement(
                        'span',
                        { unselectable: 'unselectable', className: prefixCls + '-handler-up-inner',
                            onClick: preventDefault },
                        _react2['default'].createElement(_nextIcon2['default'], { type: 'add' })
                    )
                ),
                _react2['default'].createElement(
                    'a',
                    { unselectable: 'unselectable',
                        ref: 'down',
                        onMouseDown: this.onStepMouseDown.bind(this),
                        onClick: downDisabledClass ? this.props.onDisabled : this.down.bind(this),
                        className: prefixCls + '-handler ' + prefixCls + '-handler-down ' + downDisabledClass },
                    _react2['default'].createElement(
                        'span',
                        { unselectable: 'unselectable', className: prefixCls + '-handler-down-inner',
                            onClick: preventDefault },
                        _react2['default'].createElement(_nextIcon2['default'], { type: 'minus' })
                    )
                )
            ),
            _react2['default'].createElement(
                'div',
                { className: prefixCls + '-input-wrap' },
                _react2['default'].createElement(_nextInput2['default'], _extends({}, props, {
                    style: inputStyle,
                    className: prefixCls + '-input',
                    autoComplete: 'off',
                    onFocus: this.onFocus.bind(this),
                    onBlur: this.onBlur.bind(this),
                    onKeyDown: this.onKeyDown.bind(this),
                    autoFocus: props.autoFocus,
                    readOnly: !editable,
                    onChange: this.onChange.bind(this),
                    ref: 'input',
                    value: this.state.value
                }))
            )
        );
    };

    return NumberPicker;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 设置类型
     * @enumdesc 普通, 内联
     */
    type: _propTypes2['default'].oneOf(['normal', 'inline']),
    /**
     * 当前值
     */
    value: _propTypes2['default'].number,
    /**
     * 默认值
     */
    defaultValue: _propTypes2['default'].number,
    /**
     * 步长
     */
    step: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    /**
     * 用户是否可以输入
     */
    editable: _propTypes2['default'].bool,
    autoFocus: _propTypes2['default'].bool,
    /**
     * 输入框的宽度
     */
    inputWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    /**
     * 数值被改变的事件
     * @param {Number} value 数据
     * @param {Event} e DOM事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 键盘按下
     */
    onKeyDown: _propTypes2['default'].func,
    /**
     * 焦点获得
     */
    onFocus: _propTypes2['default'].func,
    /**
     * 焦点失去
     */
    onBlur: _propTypes2['default'].func,
    /**
     * 按钮被禁用时候点击的回调
     * @param {Event} e DOM事件对象
     */
    onDisabled: _propTypes2['default'].func,
    /**
     * 数值订正后的回调
     * @param {Object} obj {currentValue,oldValue:String}
     */
    onCorrect: _propTypes2['default'].func,
    /**
     * 最大值
     */
    max: _propTypes2['default'].number,
    /**
     * 最小值
     */
    min: _propTypes2['default'].number,
    /**
     * 自定义class
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-',
    max: Infinity,
    min: -Infinity,
    type: 'normal',
    step: 1,
    style: {},
    defaultValue: 0,
    editable: true,
    onChange: noop,
    onKeyDown: noop,
    onFocus: noop,
    onBlur: noop,
    onDisabled: noop,
    onCorrect: noop
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
NumberPicker.displayName = 'NumberPicker';
exports['default'] = NumberPicker;
module.exports = exports['default'];