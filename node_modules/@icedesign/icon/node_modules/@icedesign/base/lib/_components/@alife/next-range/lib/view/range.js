'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextDom = require('../../../next-dom/lib/index.js');

var _nextBalloon = require('../../../next-balloon/lib/index.js');

var _nextBalloon2 = _interopRequireDefault(_nextBalloon);

var _nextUtil = require('../../../next-util/lib/index.js');

var _utils = require('../utils.js');

var _scale = require('./scale.js');

var _scale2 = _interopRequireDefault(_scale);

var _track = require('./track.js');

var _track2 = _interopRequireDefault(_track);

var _selected = require('./selected.js');

var _selected2 = _interopRequireDefault(_selected);

var _slider = require('./slider.js');

var _slider2 = _interopRequireDefault(_slider);

var _mark2 = require('./mark.js');

var _mark3 = _interopRequireDefault(_mark2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

var Tooltip = _nextBalloon2['default'].Tooltip;

/** Range */
var Range = (_temp = _class = function (_React$Component) {
    _inherits(Range, _React$Component);

    function Range(props) {
        _classCallCheck(this, Range);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        var min = props.min;

        var initialValue = _this._isMultiple() ? [min, min] : min;
        var defaultValue = 'defaultValue' in props ? props.defaultValue : initialValue;
        var value = props.value !== undefined ? props.value : defaultValue;

        _this.state = {
            // tooltipVisible: false,
            value: value,
            tempValue: value,
            hasMovingClass: false
        };
        return _this;
    }

    Range.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var min = this.props.min;

        var initialValue = this._isMultiple() ? [min, min] : min;
        if ('value' in nextProps) {
            var value = nextProps.value;

            if (value === undefined) {
                // value设置undefined,reset为初始值
                value = initialValue;
            }
            this.setState({
                value: value,
                tempValue: value
            });
        }
    };

    Range.prototype.render = function render() {
        var _classNames;

        var value = this._moving ? this.state.tempValue : this.state.value;

        var _props = this.props,
            prefix = _props.prefix,
            min = _props.min,
            max = _props.max,
            disabled = _props.disabled,
            style = _props.style,
            id = _props.id,
            slider = _props.slider,
            reverse = _props.reverse,
            className = _props.className;

        prefix = this.context.prefix || prefix;
        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'range', true), _defineProperty(_classNames, 'disabled', disabled), _defineProperty(_classNames, className, className), _classNames));

        if (Array.isArray(value)) {
            value.forEach(function (item, index) {
                if (item > max) {
                    value[index] = max;
                }
            });
        } else if (value > max) {
            value = max;
        }

        var commonProps = {
            prefix: prefix,
            min: min,
            max: max,
            value: value,
            reverse: reverse,
            slider: slider,
            hasMovingClass: this.state.hasMovingClass
        };

        // slider

        var _renderSlider2 = this._renderSlider(commonProps),
            lowerSlider = _renderSlider2.lowerSlider,
            upperSlider = _renderSlider2.upperSlider;

        return _react2['default'].createElement(
            'div',
            { ref: 'range', className: classes, id: id, onMouseDown: disabled ? noop : this._onMouseDown.bind(this),
                style: style },
            this._renderScale(commonProps),
            _react2['default'].createElement(_track2['default'], commonProps),
            _react2['default'].createElement(_selected2['default'], commonProps),
            lowerSlider,
            upperSlider,
            this._renderMark(commonProps)
        );
    };

    Range.prototype._isMultiple = function _isMultiple() {
        return this.props.slider === 'double';
    };

    Range.prototype._renderSlider = function _renderSlider(commonProps) {
        var lowerSlider = null;
        var upperSlider = null;
        var value = commonProps.value;

        var hasTips = this.props.hasTips;
        var hasTip = this.props.hasTip;

        if (hasTips !== undefined) {
            _nextUtil.log.deprecated('hasTips', 'hasTip', 'range');
            hasTip = hasTips;
        }

        var tipFormatter = this.props.tipFormatter;

        if (this._isMultiple()) {
            // override value
            lowerSlider = hasTip ? _react2['default'].createElement(Tooltip, {
                animation: {
                    'in': 'fadeInUp',
                    out: 'fadeOutDown'
                },
                shouldUpdatePosition: true,
                trigger: _react2['default'].createElement(_slider2['default'], _extends({}, commonProps, { value: value[0] })),
                align: 't',
                text: tipFormatter(value[0] + '')
            }) : _react2['default'].createElement(_slider2['default'], _extends({}, commonProps, { value: value[0] }));
            upperSlider = hasTip ? _react2['default'].createElement(Tooltip, {
                animation: {
                    'in': 'fadeInUp',
                    out: 'fadeOutDown'
                },
                shouldUpdatePosition: true, trigger: _react2['default'].createElement(_slider2['default'], _extends({}, commonProps, { value: value[1] })),
                align: 't',
                text: tipFormatter(value[1] + '')
            }) : _react2['default'].createElement(_slider2['default'], _extends({}, commonProps, { value: value[1] }));
        } else {
            upperSlider = hasTip ? _react2['default'].createElement(Tooltip, {
                animation: {
                    'in': 'fadeInUp',
                    out: 'fadeOutDown'
                },
                shouldUpdatePosition: true, trigger: _react2['default'].createElement(_slider2['default'], commonProps),
                align: 't',
                text: tipFormatter(value + '')
            }) : _react2['default'].createElement(_slider2['default'], commonProps);
        }

        return { lowerSlider: lowerSlider, upperSlider: upperSlider };
    };

    Range.prototype._marksToScales = function _marksToScales(marks) {
        var result = [];
        if (Object.prototype.toString.call(marks) === '[object Object]') {
            for (var key in marks) {
                if (Object.hasOwnProperty.call(marks, key)) {
                    result.push(parseInt(key));
                }
            }
        } else {
            result = marks;
        }
        return result;
    };

    Range.prototype._renderScale = function _renderScale(commonProps) {
        var _props2 = this.props,
            min = _props2.min,
            max = _props2.max,
            marks = _props2.marks;

        var scales = this._marksToScales(marks);
        var scale = null;

        if (scales !== false) {
            if (Array.isArray(scales)) {
                scale = _react2['default'].createElement(_scale2['default'], _extends({}, commonProps, { scales: scales }));
            } else {
                var pace = (max - min) / scales;
                var result = [];

                result.push(min);
                for (var i = 1; i < scales; i++) {
                    result.push(min + i * pace);
                }
                result.push(max);

                scale = _react2['default'].createElement(_scale2['default'], _extends({}, commonProps, { scales: result }));
            }
        } else {
            scale = _react2['default'].createElement(_scale2['default'], _extends({}, commonProps, { scales: [] }));
        }

        return scale;
    };

    Range.prototype._renderMark = function _renderMark(commonProps) {
        var _props3 = this.props,
            min = _props3.min,
            max = _props3.max,
            marks = _props3.marks;

        var mark = null;

        if (marks !== false) {
            var result = {};

            if (Array.isArray(marks)) {
                marks.forEach(function (m) {
                    result[m] = m.toString();
                });
            } else if (typeof marks === 'number') {
                var pace = (max - min) / marks;

                result[min] = min;
                for (var i = 1; i < marks; i++) {
                    var _mark = min + i * pace;
                    var precision = (0, _utils.getPrecision)(_mark);
                    if (precision > 2) {
                        precision = 2;
                    }
                    _mark = _mark.toFixed(precision);
                    result[_mark] = _mark;
                }
                result[max] = max;
            } else {
                result = marks;
            }

            mark = _react2['default'].createElement(_mark3['default'], _extends({}, commonProps, { marks: result }));
        }

        return mark;
    };

    Range.prototype._isEqule = function _isEqule(left, right) {
        if (Array.isArray(left)) {
            return left[0] === right[0] && left[1] === right[1];
        } else {
            return left === right;
        }
    };

    Range.prototype._onMouseDown = function _onMouseDown(e) {
        this.setState({
            hasMovingClass: true
        });
        this._start(e.pageX);
        this._addDocumentEvents();
        pauseEvent(e);
    };

    Range.prototype._start = function _start(position) {
        var tempValue = this.state.tempValue;

        var range = this.refs.range;
        var start = range.getBoundingClientRect().left;

        // Stabilize
        // position = start + length *

        this._moving = {
            start: start,
            end: start + range.clientWidth,
            startValue: tempValue
        };

        // change on start
        this._onProcess(position, true);
    };

    Range.prototype._end = function _end() {
        var startValue = this._moving.startValue;
        var _state = this.state,
            tempValue = _state.tempValue,
            value = _state.value;

        this._moving = null;
        this._removeDocumentEvents();
        this.setState({
            hasMovingClass: false
        });
        if (!this._isEqule(tempValue, startValue)) {
            // Not Controlled
            if (!('value' in this.props)) {
                this.setState({
                    value: tempValue
                });
            } else {
                this.setState({
                    // tooltipVisible: false,
                    tempValue: value,
                    value: value
                });
            }
            this.props.onChange(tempValue);
        }
    };

    Range.prototype._move = function _move(e) {
        this._onProcess(e.pageX);
    };

    Range.prototype._onProcess = function _onProcess(position, start) {
        var tempValue = this.state.tempValue;

        var current = this._positionToCurrent(position); //current 为当前click的value

        if (start) {
            this._moving.dragging = this._getDragging(current, tempValue);
        }
        // this.setState({
        //     tooltipVisible: true
        // })
        var nextValue = this._currentToValue(current, tempValue); //计算range的新value,可能是数组,可能是单个值
        if (!this._isEqule(nextValue, tempValue)) {
            this.setState({
                tempValue: nextValue
            });
            this.props.onProcess(nextValue);
        }
    };

    Range.prototype._addDocumentEvents = function _addDocumentEvents() {
        this._onMouseMoveListener = _nextDom.events.on(document, 'mousemove', this._move.bind(this));
        this._onMouseUpListener = _nextDom.events.on(document, 'mouseup', this._end.bind(this));
    };

    Range.prototype._removeDocumentEvents = function _removeDocumentEvents() {
        if (this._onMouseMoveListener) {
            this._onMouseMoveListener.off();
            this._onMouseMoveListener = null;
        }

        if (this._onMouseUpListener) {
            this._onMouseUpListener.off();
            this._onMouseUpListener = null;
        }
    };

    Range.prototype._getDragging = function _getDragging(current, preValue) {
        var dragging = 'upper';

        if (this._isMultiple()) {
            if (current > preValue[1]) {
                dragging = 'upper';
            } else if (current < preValue[0]) {
                dragging = 'lower';
            } else {
                var mid = (preValue[0] + preValue[1]) / 2;

                dragging = current < mid ? 'lower' : 'upper';
            }
        }

        return dragging;
    };

    // position => current (value type)


    Range.prototype._positionToCurrent = function _positionToCurrent(position) {
        var _moving = this._moving,
            start = _moving.start,
            end = _moving.end;
        var _props4 = this.props,
            step = _props4.step,
            min = _props4.min,
            max = _props4.max;


        if (position < start) {
            position = start;
        } else if (position > end) {
            position = end;
        }
        var pecent = (0, _utils.getPercent)(start, end, position);

        // reset by step
        var newValue = parseFloat((Math.round(pecent / 100 * (max - min) / step) * step).toFixed((0, _utils.getPrecision)(step)));

        return min + newValue;
    };

    Range.prototype._currentToValue = function _currentToValue(current, preValue) {
        var dragging = this._moving.dragging;


        if (!this._isMultiple()) {
            return current;
        } else {
            var result = void 0;

            if (dragging === 'lower') {
                if (current > preValue[1]) {
                    result = [preValue[1], current];
                    this._moving.dragging = 'upper';
                } else {
                    result = [current, preValue[1]];
                }
            } else if (dragging === 'upper') {
                if (current < preValue[0]) {
                    result = [current, preValue[0]];
                    this._moving.dragging = 'lower';
                } else {
                    result = [preValue[0], current];
                }
            }

            return result;
        }
    };

    return Range;
}(_react2['default'].Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内敛样式
     */
    style: _propTypes2['default'].object,
    /**
     * 滑块个数
     * @enumdesc 单个, 两个
     */
    slider: _propTypes2['default'].oneOf(['single', 'double']),
    /**
     * 最小值
     */
    min: _propTypes2['default'].number,
    /**
     * 最大值
     */
    max: _propTypes2['default'].number,
    /**
     * 步长，取值必须大于 0，并且可被 (max - min) 整除。
     */
    step: _propTypes2['default'].number,
    /**
     * 设置当前取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].arrayOf(_propTypes2['default'].number)]),
    tempValue: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].arrayOf(_propTypes2['default'].number)]),
    /**
     * 设置初始取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].arrayOf(_propTypes2['default'].number)]),

    /**
     * 刻度数值显示逻辑（false 代表不显示，array 枚举显示的值，number 代表按 number 平分，object 表示按 key 划分，value 值显示）
     */
    marks: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].number, _propTypes2['default'].arrayOf(_propTypes2['default'].number), _propTypes2['default'].object]),
    /**
     * 值为 `true` 时，滑块为禁用状态
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 当 Range 的值发生改变后，会触发 onChange 事件，并把改变后的值作为参数传入, 如果设置了value, 要配合此函数做受控使用
     * @param {String/number} value
     */
    onChange: _propTypes2['default'].func,
    /**
     * 滑块拖动的时候触发的事件,不建议在这里setState, 一般情况下不需要用, 滑动时有特殊需求时使用
     * @param {String/number} value
     */
    onProcess: _propTypes2['default'].func,
    hasTips: _propTypes2['default'].bool,
    /**
     * 是否显示tip
     */
    hasTip: _propTypes2['default'].bool,
    /**
     * tip文件自定义处理
     */
    tipFormatter: _propTypes2['default'].func,
    id: _propTypes2['default'].string,
    /**
     * 选中态反转
     */
    reverse: _propTypes2['default'].bool
}, _class.defaultProps = {
    prefix: 'next-',
    slider: 'single',
    min: 0,
    max: 100,
    step: 1,
    marks: false,
    disabled: false,
    hasTip: true,
    onChange: noop,
    onProcess: noop,
    tipFormatter: function tipFormatter(value) {
        return value;
    },
    reverse: false
}, _temp);
Range.displayName = 'Range';
exports['default'] = Range;


function pauseEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}
module.exports = exports['default'];