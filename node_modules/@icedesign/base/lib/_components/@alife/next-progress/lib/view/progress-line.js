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

var Line = (_temp = _class = function (_Component) {
    _inherits(Line, _Component);

    function Line() {
        _classCallCheck(this, Line);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Line.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (this.line && this.props.animation) {
            // 延迟设置样式，为了增加一个默认的载入动效
            this.timeout = setTimeout(function () {
                _this2.line.style.width = _this2.props.percent + '%';
            }, 100);
        }
    };

    Line.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (prevProps.percent !== this.props.percent && this.line) {
            this.line.style.width = this.props.percent + '%';
        }
    };

    Line.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };

    Line.prototype._lineRefHandler = function _lineRefHandler(ref) {
        this.line = ref;
    };

    Line.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props = this.props,
            prefix = _props.prefix,
            size = _props.size,
            showInfo = _props.showInfo,
            type = _props.type,
            suffix = _props.suffix,
            state = _props.state,
            percent = _props.percent,
            animation = _props.animation,
            className = _props.className,
            others = _objectWithoutProperties(_props, ['prefix', 'size', 'showInfo', 'type', 'suffix', 'state', 'percent', 'animation', 'className']);

        var wrapCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'progress-line', true), _defineProperty(_classNames, prefix + 'progress-line-' + size, size), _defineProperty(_classNames, prefix + 'progress-line-show-info', showInfo), _defineProperty(_classNames, prefix + 'progress-line-' + type, type), _defineProperty(_classNames, className, className), _classNames));
        var lineCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'progress-line-overlay', true), _defineProperty(_classNames2, prefix + 'progress-line-overlay-normal', true), _defineProperty(_classNames2, prefix + 'progress-line-overlay-' + state, state), _defineProperty(_classNames2, prefix + 'progress-line-overlay-started', type === 'progressive' && percent <= 30), _defineProperty(_classNames2, prefix + 'progress-line-overlay-middle', type === 'progressive' && percent > 30 && percent < 80), _defineProperty(_classNames2, prefix + 'progress-line-overlay-almostfinished', type === 'progressive' && percent >= 80), _classNames2));

        var lineStyle = animation ? { width: '0%' } : { width: percent + '%' };

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: wrapCls }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'progress-line-container' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'progress-line-underlay' },
                    _react2['default'].createElement('div', { className: lineCls, style: lineStyle, ref: this._lineRefHandler.bind(this) })
                )
            ),
            showInfo ? _react2['default'].createElement(
                'div',
                { className: prefix + 'progress-line-text' },
                suffix
            ) : null
        );
    };

    return Line;
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
Line.displayName = 'Line';
exports['default'] = Line;
module.exports = exports['default'];