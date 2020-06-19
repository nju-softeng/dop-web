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

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextAnimate = require('../../next-animate/lib/index.js');

var _nextAnimate2 = _interopRequireDefault(_nextAnimate);

var _nextUtil = require('../../next-util/lib/index.js');

var _nextDom = require('../../next-dom/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

var typesMap = {
    prompt: 'prompt',
    warning: 'warning',
    system: 'warning'
};

var oneTransitionEnd = function oneTransitionEnd(node, done) {
    var handler = function handler(e) {
        if (e.target === node) {
            ['notice-enter', 'notice-enter-active', 'notice-leave', 'notice-leave-active'].forEach(function (className) {
                _nextDom.classList.removeClass(node, className);
            });
            _nextDom.style.set(node, 'height', null);
            _nextDom.events.off(node, _nextUtil.support.transition.end, handler);
            done();
        }
    };
    _nextDom.events.on(node, _nextUtil.support.transition.end, handler);
};
var enterHook = function enterHook(node, done) {
    _nextDom.classList.addClass(node, 'out-screen');
    _nextDom.classList.removeClass(node, 'hide');
    var height = node.offsetHeight + 'px';
    _nextDom.classList.addClass(node, 'notice-enter');
    _nextDom.classList.removeClass(node, 'out-screen');
    setTimeout(function () {
        _nextDom.classList.addClass(node, 'notice-enter-active');
        _nextDom.style.set(node, 'height', height);
    }, 1);

    oneTransitionEnd(node, done);
};
var leaveHook = function leaveHook(node, done) {
    var height = node.offsetHeight + 'px';
    _nextDom.style.set(node, 'height', height);
    _nextDom.classList.addClass(node, 'notice-leave');
    setTimeout(function () {
        _nextDom.classList.addClass(node, 'notice-leave-active');
        _nextDom.style.set(node, 'height', 0);
    }, 1);

    oneTransitionEnd(node, done);
};

/**
 * Notice
 */
var Notice = (_temp = _class = function (_Component) {
    _inherits(Notice, _Component);

    function Notice(props, context) {
        _classCallCheck(this, Notice);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            visible: 'visible' in props ? props.visible : props.defaultVisible
        };
        _this.handleClose = _this.handleClose.bind(_this);
        _this.visibleChanged = _this.state.visible;
        return _this;
    }

    Notice.prototype.componentDidMount = function componentDidMount() {
        if (this.visibleChanged) {
            this.visibleChanged = false;
        }
    };

    Notice.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps) {
            this.setState({
                visible: nextProps.visible
            });
            if (nextProps.visible !== this.props.visible) {
                this.visibleChanged = true;
            }
        }
    };

    Notice.prototype.componentDidUpdate = function componentDidUpdate() {
        if (this.visibleChanged) {
            this.visibleChanged = false;
        }
    };

    Notice.prototype.handleClose = function handleClose() {
        if (!('visible' in this.props)) {
            this.setState({
                visible: false
            });
            this.visibleChanged = true;
        }

        var _props = this.props,
            onClose = _props.onClose,
            afterClose = _props.afterClose,
            animation = _props.animation;

        onClose();
        if (!_nextUtil.support.transition || !animation) {
            afterClose();
        }
    };

    Notice.prototype.render = function render() {
        var _cx;

        var prefix = this.context.prefix || this.props.prefix;
        /* eslint-disable no-unused-vars */

        var _props2 = this.props,
            propsPrefix = _props2.prefix,
            type = _props2.type,
            shape = _props2.shape,
            size = _props2.size,
            className = _props2.className,
            title = _props2.title,
            children = _props2.children,
            visible = _props2.visible,
            defaultVisible = _props2.defaultVisible,
            closable = _props2.closable,
            onClose = _props2.onClose,
            afterClose = _props2.afterClose,
            specifcIconType = _props2.iconType,
            animation = _props2.animation,
            others = _objectWithoutProperties(_props2, ['prefix', 'type', 'shape', 'size', 'className', 'title', 'children', 'visible', 'defaultVisible', 'closable', 'onClose', 'afterClose', 'iconType', 'animation']);
        /* eslint-enable no-unused-vars */


        var noticePrefix = prefix + 'notice';
        var iconType = specifcIconType || typesMap[type];
        var classes = (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, noticePrefix, true), _defineProperty(_cx, noticePrefix + '-' + type, type), _defineProperty(_cx, noticePrefix + '-' + shape, shape), _defineProperty(_cx, noticePrefix + '-' + size, size), _defineProperty(_cx, noticePrefix + '-title-content', !!title), _defineProperty(_cx, noticePrefix + '-only-content', !title && !!children), _defineProperty(_cx, 'hide', _nextUtil.support.transition && animation && this.visibleChanged && this.state.visible), _defineProperty(_cx, className, className), _cx));

        var notice = this.state.visible ? _react2['default'].createElement(
            'div',
            _extends({}, others, { className: classes }),
            _react2['default'].createElement(_nextIcon2['default'], { className: noticePrefix + '-symbol', type: iconType }),
            closable && shape !== 'addon' && _react2['default'].createElement(
                'a',
                { href: 'javascript:;', className: noticePrefix + '-close', onClick: this.handleClose },
                _react2['default'].createElement(_nextIcon2['default'], { type: 'close' })
            ),
            title && _react2['default'].createElement(
                'div',
                { className: noticePrefix + '-title' },
                title
            ),
            children && _react2['default'].createElement(
                'div',
                { className: noticePrefix + '-content' },
                children
            )
        ) : null;

        if (_nextUtil.support.transition && animation) {
            var hooks = {
                appear: enterHook,
                enter: enterHook,
                leave: leaveHook
            };
            return _react2['default'].createElement(
                _nextAnimate2['default'],
                { useTransition: true, animation: hooks, afterLeave: afterClose },
                notice
            );
        }

        return notice;
    };

    return Notice;
}(_react.Component), _class.contextTypes = {
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
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     * 提示类型
     */
    type: _propTypes2['default'].oneOf(['prompt', 'warning', 'system']),
    /**
     * 外观形状
     */
    shape: _propTypes2['default'].oneOf(['standalone', 'addon']),
    /**
     * 尺寸大小
     */
    size: _propTypes2['default'].oneOf(['medium', 'large']),
    /**
     * 标题
     */
    title: _propTypes2['default'].node,
    /**
     * 内容
     */
    children: _propTypes2['default'].node,
    /**
     * 默认是否显示
     */
    defaultVisible: _propTypes2['default'].bool,
    /**
     * 当前是否显示
     */
    visible: _propTypes2['default'].bool,
    /**
     * 是否可关闭
     */
    closable: _propTypes2['default'].bool,
    /**
     * 关闭时的回调函数
     */
    onClose: _propTypes2['default'].func,
    /**
     * 关闭后（动画播放完毕）的回调函数
     */
    afterClose: _propTypes2['default'].func,
    /**
     * 自定义图标类型，支持Icon列表请参考[Icon组件](http://fusion-demo.alibaba-inc.com/components?type=next&themeId=next&name=icon#Icon-0)
     */
    iconType: _propTypes2['default'].string,
    /**
     * 是否开启动画
     */
    animation: _propTypes2['default'].bool
}, _class.defaultProps = {
    prefix: 'next-',
    type: 'prompt',
    shape: 'standalone',
    size: 'medium',
    title: '',
    defaultVisible: true,
    closable: false,
    onClose: noop,
    afterClose: noop,
    animation: true
}, _temp);
Notice.displayName = 'Notice';
exports['default'] = Notice;
module.exports = exports['default'];