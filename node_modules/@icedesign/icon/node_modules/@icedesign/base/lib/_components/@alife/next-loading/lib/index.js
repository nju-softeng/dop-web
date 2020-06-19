'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = require('../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Loading */
var Loading = (_temp = _class = function (_React$Component) {
    _inherits(Loading, _React$Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Loading.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            tip = _props.tip,
            state = _props.state,
            _props$visible = _props.visible,
            visible = _props$visible === undefined ? state !== 'off' : _props$visible,
            children = _props.children,
            className = _props.className,
            style = _props.style,
            shape = _props.shape,
            color = _props.color;


        state && _nextUtil.log.deprecated('state', 'visible', 'Loading');

        var prefix = this.context.prefix || this.props.prefix;

        var tipDom = null;
        var dotCls = prefix + 'loading-dot';

        switch (shape) {
            case 'flower':
                tipDom = _react2['default'].createElement(
                    'span',
                    { className: prefix + 'loading-flower' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'loading', className: prefix + 'loading-icon', style: { color: color } })
                );
                break;
            case 'fusion-reactor':
                tipDom = _react2['default'].createElement(
                    'div',
                    { className: prefix + 'loading-fusion-reactor' },
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } }),
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } }),
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } }),
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } })
                );
                break;
            case 'dot-circle':
                tipDom = _react2['default'].createElement(
                    'div',
                    { className: prefix + 'loading-dot-circle' },
                    _react2['default'].createElement(
                        'div',
                        { className: dotCls, style: { color: color } },
                        'loading...'
                    )
                );
                break;
        }

        var loadingCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'loading', true), _defineProperty(_classNames, 'loading', visible), _defineProperty(_classNames, className, className), _classNames));

        return _react2['default'].createElement(
            'div',
            { className: loadingCls, style: style },
            visible ? _react2['default'].createElement(
                'div',
                { className: prefix + 'loading-tip' },
                tipDom,
                tip
            ) : null,
            _react2['default'].createElement(
                'div',
                { className: prefix + 'loading-component' },
                visible ? _react2['default'].createElement('div', { className: prefix + 'loading-masker' }) : null,
                children
            )
        );
    };

    return Loading;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义内容
     */
    tip: _propTypes2['default'].any,
    state: _propTypes2['default'].oneOf(['', 'on', 'off']),
    /**
     * loading 状态, 默认 true
     */
    visible: _propTypes2['default'].bool,
    /**
     * 自定义class
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     * 动画类型
     * @enumdesc 无, icon, fusion矢量, 点圈
     */
    shape: _propTypes2['default'].oneOf(['', 'flower', 'fusion-reactor', 'dot-circle']),
    /**
     * 动画颜色
     */
    color: _propTypes2['default'].string,
    /**
     * 子元素
     */
    children: _propTypes2['default'].any
}, _class.defaultProps = {
    prefix: 'next-',
    state: '', //TODO: deprecated in 1.0 release
    shape: ''
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Loading.displayName = 'Loading';
exports['default'] = Loading;
module.exports = exports['default'];