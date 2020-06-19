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

var _reactDom = require('react-dom');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextDom = require('../../next-dom/lib/index.js');

var _nextUtil = require('../../next-util/lib/index.js');

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Affix */
var Affix = (_temp = _class = function (_React$Component) {
    _inherits(Affix, _React$Component);

    function Affix(props, context) {
        _classCallCheck(this, Affix);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this._updateNodePosition = function () {
            var container = _this.props.container;

            var affixContainer = container();

            var containerScrollTop = (0, _util.getScroll)(affixContainer, true); // 容器在垂直位置上的滚动 offset
            var affixOffset = _this._getOffset(_this.affixNode, affixContainer); // 目标节点当前相对于容器的 offset
            var containerHeight = (0, _util.getNodeHeight)(affixContainer); // 容器的高度
            var affixHeight = _this.affixNode.offsetHeight;
            var containerRect = (0, _util.getRect)(affixContainer);

            var affixMode = _this.affixMode;

            if (affixMode.top && containerScrollTop > affixOffset.top - affixMode.offset) {
                // affix top
                _this._setAffixStyle({
                    position: 'fixed',
                    top: affixMode.offset + containerRect.top,
                    width: affixOffset.width
                });
                _this._setContainerStyle({
                    width: affixOffset.width,
                    height: affixHeight
                });
            } else if (affixMode.bottom && containerScrollTop < affixOffset.top + affixHeight + affixMode.offset - containerHeight) {
                // affix bottom
                _this._setAffixStyle({
                    position: 'fixed',
                    bottom: affixMode.offset,
                    width: affixOffset.width,
                    height: affixHeight
                });
                _this._setContainerStyle({
                    width: affixOffset.width,
                    height: affixHeight
                });
            } else {
                _this._setAffixStyle(null);
                _this._setContainerStyle(null);
            }
        };

        _this._affixNodeRefHandler = function (ref) {
            _this.affixNode = (0, _reactDom.findDOMNode)(ref);
        };

        _this.state = {
            style: null,
            containerStyle: null
        };
        _this.affixMode = _this._getAffixMode(props);
        return _this;
    }

    Affix.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        var container = this.props.container;
        // wait for parent rendered

        this.timeout = setTimeout(function () {
            _this2._setEventHandlerForContainer(container);
        });
    };

    Affix.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        var container = this.props.container;

        this._removeEventHandlerForContainer(container);
    };

    Affix.prototype._setEventHandlerForContainer = function _setEventHandlerForContainer(getContainer) {
        var container = getContainer();
        if (!container) {
            return;
        }

        _nextDom.events.on(container, 'scroll', this._updateNodePosition);
        _nextDom.events.on(container, 'resize', this._updateNodePosition);
    };

    Affix.prototype._removeEventHandlerForContainer = function _removeEventHandlerForContainer(getContainer) {
        var container = getContainer();
        if (container) {
            _nextDom.events.off(container, 'scroll', this._updateNodePosition);
            _nextDom.events.off(container, 'resize', this._updateNodePosition);
        }
    };

    Affix.prototype._getAffixMode = function _getAffixMode() {
        var _props = this.props,
            offsetTop = _props.offsetTop,
            offsetBottom = _props.offsetBottom;

        var affixMode = {
            top: false,
            bottom: false,
            offset: 0
        };

        if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
            // set default
            affixMode.top = true;
        } else if (typeof offsetTop === 'number') {
            affixMode.top = true;
            affixMode.offset = offsetTop;
        } else if (typeof offsetBottom === 'number') {
            affixMode.bottom = true;
            affixMode.offset = offsetBottom;
        }

        return affixMode;
    };

    Affix.prototype._setAffixStyle = function _setAffixStyle(affixStyle) {
        if (_nextUtil.obj.shallowEqual(affixStyle, this.state.style)) {
            return;
        }

        this.setState({
            style: affixStyle
        });

        var onAffix = this.props.onAffix;

        if (affixStyle && affixStyle.position === 'fixed') {
            onAffix(true);
        } else {
            onAffix(false);
        }
    };

    Affix.prototype._setContainerStyle = function _setContainerStyle(containerStyle) {
        if (_nextUtil.obj.shallowEqual(containerStyle, this.state.containerStyle)) {
            return;
        }
        this.setState({ containerStyle: containerStyle });
    };

    Affix.prototype._getOffset = function _getOffset(affixNode, affixContainer) {
        var affixRect = affixNode.getBoundingClientRect(); // affix 元素 相对浏览器窗口的位置
        var containerRect = (0, _util.getRect)(affixContainer); // affix 容器 相对浏览器窗口的位置
        var containerScrollTop = (0, _util.getScroll)(affixContainer, true);
        var containerScrollLeft = (0, _util.getScroll)(affixContainer, false);

        return {
            top: affixRect.top - containerRect.top + containerScrollTop,
            left: affixRect.left - containerRect.left + containerScrollLeft,
            width: affixRect.width,
            height: affixRect.height
        };
    };

    Affix.prototype.render = function render() {
        var _classnames;

        var _props2 = this.props,
            className = _props2.className,
            children = _props2.children,
            style = _props2.style;

        var state = this.state;
        var prefix = this.context.prefix || this.props.prefix;
        var classNames = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'affix', state.style), _defineProperty(_classnames, prefix + 'affix-top', !state.style && this.affixMode.top), _defineProperty(_classnames, prefix + 'affix-bottom', !state.style && this.affixMode.bottom), _defineProperty(_classnames, className, className), _classnames));
        var combinedStyle = _extends({}, state.containerStyle, style);

        return _react2['default'].createElement(
            'div',
            { ref: this._affixNodeRefHandler, style: combinedStyle },
            _react2['default'].createElement(
                'div',
                { className: classNames, style: state.style },
                children
            )
        );
    };

    return Affix;
}(_react2['default'].Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 品牌样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 设置 Affix 需要监听滚动事件的容器元素
     * @return {ReactElement} 目标容器元素的实例
     */
    container: _propTypes2['default'].func,
    /**
     * 距离窗口顶部达到指定偏移量后触发
     */
    offsetTop: _propTypes2['default'].number,
    /**
     * 距离窗口底部达到制定偏移量后触发
     */
    offsetBottom: _propTypes2['default'].number,
    /**
     * 当元素的样式发生固钉样式变化时触发的回调函数
     * @param {Boolean} affixed 元素是否被固钉
     */
    onAffix: _propTypes2['default'].func,
    /**
     * 自定义样式类名
     */
    className: _propTypes2['default'].string,
    style: _propTypes2['default'].object,
    children: _propTypes2['default'].any
}, _class.defaultProps = {
    prefix: 'next-',
    container: function container() {
        return window;
    },
    onAffix: function onAffix() {}
}, _temp);
Affix.displayName = 'Affix';
exports['default'] = Affix;
module.exports = exports['default'];