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

var _nextUtil = require('../../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Circle = (_temp = _class = function (_Component) {
    _inherits(Circle, _Component);

    function Circle(props) {
        _classCallCheck(this, Circle);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            underlayStrokeWidth: 8,
            overlayStrokeWidth: 8
        };
        return _this;
    }

    Circle.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (this.underlay && this.overlay) {
            this.setState({
                underlayStrokeWidth: this._getCssValue(this.underlay, 'stroke-width') || 8,
                overlayStrokeWidth: this._getCssValue(this.overlay, 'stroke-width') || 8
            });

            // 如果开启了动效，延迟设置样式，为了增加一个默认的载入动效
            if (this.props.animation) {
                this.timeout = setTimeout(function () {
                    _this2.overlay.style.strokeDashoffset = _this2._computeOverlayStrokeDashOffset() + 'px';
                }, 100);
            }
        }
    };

    Circle.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.props.animation && prevProps.percent !== this.props.percent && this.overlay) {
            this.overlay.style.strokeDashoffset = this._computeOverlayStrokeDashOffset() + 'px';
        }
    };

    Circle.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };

    Circle.prototype._getCssValue = function _getCssValue(dom, name) {
        var css = window.getComputedStyle(dom).getPropertyValue(name);
        var regExp = /(\d*)px/g;
        var result = regExp.exec(css);

        return result instanceof Array ? Number(result[1]) : 0;
    };

    Circle.prototype._underlayRefHandler = function _underlayRefHandler(ref) {
        this.underlay = ref;
    };

    Circle.prototype._overlayRefHandler = function _overlayRefHandler(ref) {
        this.overlay = ref;
    };

    Circle.prototype._computeOverlayStrokeDashOffset = function _computeOverlayStrokeDashOffset() {
        var _state = this.state,
            underlayStrokeWidth = _state.underlayStrokeWidth,
            overlayStrokeWidth = _state.overlayStrokeWidth;

        var overlayRadius = 50 - overlayStrokeWidth / 2 - (underlayStrokeWidth - overlayStrokeWidth) / 2;
        var overlayLen = Math.PI * 2 * overlayRadius;
        return (100 - this.props.percent) / 100 * overlayLen;
    };

    Circle.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props = this.props,
            prefix = _props.prefix,
            className = _props.className,
            animation = _props.animation,
            others = _objectWithoutProperties(_props, ['prefix', 'className', 'animation']);

        var size = others.size,
            showInfo = others.showInfo,
            type = others.type,
            suffix = others.suffix,
            state = others.state,
            percent = others.percent;
        var _state2 = this.state,
            underlayStrokeWidth = _state2.underlayStrokeWidth,
            overlayStrokeWidth = _state2.overlayStrokeWidth;

        // underlay path

        var underlayRadius = 50 - underlayStrokeWidth / 2;
        var underlayPathString = 'M 50,50 m 0,-' + underlayRadius + '\n            a ' + underlayRadius + ',' + underlayRadius + ' 0 1 1 0,' + 2 * underlayRadius + '\n            a ' + underlayRadius + ',' + underlayRadius + ' 0 1 1 0,-' + 2 * underlayRadius;

        // overlay path (为居中，减去相对于underlay的宽度)
        var overlayRadius = 50 - overlayStrokeWidth / 2 - (underlayStrokeWidth - overlayStrokeWidth) / 2;
        var overlayLen = Math.PI * 2 * overlayRadius;
        var overlayPathString = 'M 50,50 m 0,-' + overlayRadius + '\n            a ' + overlayRadius + ',' + overlayRadius + ' 0 1 1 0,' + 2 * overlayRadius + '\n            a ' + overlayRadius + ',' + overlayRadius + ' 0 1 1 0,-' + 2 * overlayRadius;
        var overlayPathStyle = {
            strokeDasharray: overlayLen + 'px ' + overlayLen + 'px',
            strokeDashoffset: animation ? // 根据动效是否开启，决定是否设置 dom 的实际取值
            overlayLen + 'px' : this._computeOverlayStrokeDashOffset() + 'px'
        };

        var wrapCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'progress-circle', true), _defineProperty(_classNames, prefix + 'progress-circle-' + size, size), _defineProperty(_classNames, prefix + 'progress-circle-show-info', showInfo), _defineProperty(_classNames, prefix + 'progress-circle-' + type, type), _defineProperty(_classNames, className, className), _classNames));
        var pathCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'progress-circle-overlay', true), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-normal', true), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-' + state, state), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-started', type === 'progressive' && percent <= 30), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-middle', type === 'progressive' && percent > 30 && percent < 80), _defineProperty(_classNames2, prefix + 'progress-circle-overlay-almostfinished', type === 'progressive' && percent >= 80), _classNames2));

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: wrapCls }),
            _react2['default'].createElement(
                'svg',
                { className: prefix + 'progress-circle-container', viewBox: '0 0 100 100' },
                _react2['default'].createElement('path', { className: prefix + 'progress-circle-underlay', d: underlayPathString, fillOpacity: '0', ref: this._underlayRefHandler.bind(this) }),
                _react2['default'].createElement('path', { className: pathCls, d: overlayPathString, fillOpacity: '0', style: overlayPathStyle, ref: this._overlayRefHandler.bind(this) })
            ),
            showInfo ? _react2['default'].createElement(
                'div',
                { className: prefix + 'progress-circle-text' },
                suffix
            ) : null
        );
    };

    return Circle;
}(_react.Component), _class.propTypes = {
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    percent: _propTypes2['default'].number,
    showInfo: _propTypes2['default'].bool,
    type: _propTypes2['default'].oneOf(['normal', 'progressive']),
    suffix: _propTypes2['default'].any,
    state: _propTypes2['default'].oneOf(['success', 'error'])
}, _class.defaultProps = {
    size: 'medium',
    percent: 0,
    showInfo: true,
    type: 'normal'
}, _temp);
Circle.displayName = 'Circle';
exports['default'] = Circle;
module.exports = exports['default'];