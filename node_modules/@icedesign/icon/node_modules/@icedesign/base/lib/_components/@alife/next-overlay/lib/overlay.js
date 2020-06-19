'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextDom = require('../../next-dom/lib/index.js');

var _nextUtil = require('../../next-util/lib/index.js');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _manager = require('./manager.js');

var _manager2 = _interopRequireDefault(_manager);

var _gateway = require('./gateway.js');

var _gateway2 = _interopRequireDefault(_gateway);

var _position = require('./position.js');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var REACT_VERSION = parseInt(_react2['default'].version, 10);

var Children = _react2['default'].Children,
    makeChain = _nextUtil.func.makeChain,
    noop = function noop() {},
    saveLastFocusNode = _nextUtil.focus.saveLastFocusNode,
    getFocusNodeList = _nextUtil.focus.getFocusNodeList,
    backLastFocusNode = _nextUtil.focus.backLastFocusNode,
    ANIMATION_CLS = 'animated';


var hasScroll = function hasScroll() {
    var doc = document.documentElement;
    return doc.scrollHeight > doc.clientHeight;
};

// <Overlay>
//  <content></content>
// </Overlay>

/** Overlay */
var Overlay = (_temp = _class = function (_React$Component) {
    _inherits(Overlay, _React$Component);

    Overlay.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    function Overlay(props, context) {
        _classCallCheck(this, Overlay);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {
            visible: props.visible
        };
        _this.Manager = _manager2['default'];
        _this._onDocumentKeyDown = _this._onDocumentKeyDown.bind(_this);
        _this._onDocumentClick = _this._onDocumentClick.bind(_this);
        _this._onMaskClick = _this._onMaskClick.bind(_this);
        _this._onPosition = _this._onPosition.bind(_this);
        _this._safeClickNode = [];
        _this.beforeOpen = _this.beforeOpen.bind(_this);
        _this.afterClose = _this.afterClose.bind(_this);
        _this.onAnimateEnd = _this.onAnimateEnd.bind(_this);
        return _this;
    }

    Overlay.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.animation) {
            if (!this.state.visible && nextProps.visible) {
                this.enter();
            } else if (this.state.visible && !nextProps.visible) {
                this.leave();
            } else if (this.hasEntered) {
                this.keep();
            }
        } else {
            this.setState({
                visible: nextProps.visible
            });
        }
    };

    Overlay.prototype.componentWillMount = function componentWillMount() {
        if (this.props.visible && this.props.animation) {
            this.enter();
        }
        this._throwPropEvents(this.props, this.state);
    };

    Overlay.prototype._initAnimationEvents = function _initAnimationEvents(flag) {
        var node = this.getContentNode();

        // react 16 中，在 componentDidMount 中调用初始化方法中并不能保证节点完成渲染
        if (REACT_VERSION > 15 && !node && flag !== 'try') {
            return setTimeout(this._initAnimationEvents.bind(this, 'try'));
        }

        if (node && this.props.animation) {
            if (_nextUtil.support.animation) {
                this._animation = _nextDom.events.on(node, _nextUtil.support.animation.end, this.onAnimateEnd);
            } else {
                if (this._animation) {
                    clearTimeout(this._animation);
                }
                this._animation = setTimeout(this.onAnimateEnd, 10);
            }
        }
    };

    Overlay.prototype.enter = function enter() {
        var _this2 = this;

        this.setState({
            visible: true,
            animationType: 'in'
        }, function () {
            if (REACT_VERSION > 15) {
                // in react 16, callback will be called before DOM mounted.
                setTimeout(function () {
                    !_this2.isDestroyed && _this2.onEntering && _this2.onEntering();
                });
            } else {
                _this2.onEntering && _this2.onEntering();
            }
        });
    };

    Overlay.prototype.leave = function leave() {
        if (this._animation) {
            this.setState({
                animationType: 'out'
            });
            this.onLeaving && this.onLeaving();
        } else {
            this.setState({
                visible: false
            });
        }
    };

    Overlay.prototype.keep = function keep() {
        this.setState({
            animationType: 'none'
        });
    };

    Overlay.prototype.onAnimateEnd = function onAnimateEnd() {
        if (this.state.animationType === 'out') {
            this.setState({
                visible: false
            });
            this.onLeaved && this.onLeaved();
            this.hasEntered = false;
        } else {
            this.onEntered && this.onEntered();
            this.hasEntered = true;
        }
    };

    Overlay.prototype.getAnimationCls = function getAnimationCls(config) {
        var className = void 0;
        switch (this.state.animationType) {
            case 'in':
                className = ANIMATION_CLS + ' ' + config['in'];
                break;
            case 'out':
                className = ANIMATION_CLS + ' ' + config.out;
                break;
            case 'none':
                className = '';
        }
        return className;
    };

    Overlay.prototype.getContentNode = function getContentNode() {
        return _reactDom2['default'].findDOMNode(this.getContent());
    };

    Overlay.prototype.getContent = function getContent() {
        return this.refs[this.contentRef];
    };

    Overlay.prototype.getWrapperNode = function getWrapperNode() {
        return this.refs.gateway ? this.refs.gateway.getContentNode() : null;
    };

    Overlay.prototype.getContentRef = function getContentRef(child) {
        return child.ref || 'content';
    };

    Overlay.prototype.render = function render() {
        /* eslint-disable no-unused-vars */
        var _props = this.props,
            animation = _props.animation,
            cache = _props.cache,
            container = _props.container,
            className = _props.className,
            hasMask = _props.hasMask,
            shouldUpdatePosition = _props.shouldUpdatePosition,
            target = _props.target,
            offset = _props.offset,
            align = _props.align,
            onPosition = _props.onPosition,
            beforePosition = _props.beforePosition,
            needAdjust = _props.needAdjust,
            children = _props.children,
            safeId = _props.safeId,
            canCloseByOutSideClick = _props.canCloseByOutSideClick,
            canCloseByEsc = _props.canCloseByEsc,
            visible = _props.visible,
            beforeOpen = _props.beforeOpen,
            beforeClose = _props.beforeClose,
            afterOpen = _props.afterOpen,
            afterClose = _props.afterClose,
            onOpen = _props.onOpen,
            onClose = _props.onClose,
            onRequestClose = _props.onRequestClose,
            wrapperCls = _props.wrapperClassName,
            others = _objectWithoutProperties(_props, ['animation', 'cache', 'container', 'className', 'hasMask', 'shouldUpdatePosition', 'target', 'offset', 'align', 'onPosition', 'beforePosition', 'needAdjust', 'children', 'safeId', 'canCloseByOutSideClick', 'canCloseByEsc', 'visible', 'beforeOpen', 'beforeClose', 'afterOpen', 'afterClose', 'onOpen', 'onClose', 'onRequestClose', 'wrapperClassName']),
            prefix = this.getPrefix(),
            animationCls = void 0,
            cls = void 0,
            child = void 0,
            wrapperClassName = void 0,
            style = {
            display: this.state.visible ? '' : 'none'
        };

        children = this.state.visible || cache && this._isMounted ? children : null;
        onPosition = makeChain(this._onPosition, onPosition);

        if (animation) {
            animationCls = this.getAnimationCls(animation);
        } else {
            animationCls = false;
        }
        if (children) {
            var _classnames, _classnames2;

            child = Children.only(children);
            // eslint-disable-next-line
            cls = (0, _classnames4['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'overlay-inner', true), _defineProperty(_classnames, animationCls, animationCls), _defineProperty(_classnames, child.props.className, child.props.className), _defineProperty(_classnames, className, className), _classnames)), wrapperClassName = (0, _classnames4['default'])((_classnames2 = {}, _defineProperty(_classnames2, prefix + 'overlay-wrapper', true), _defineProperty(_classnames2, wrapperCls, wrapperCls), _classnames2));

            this.contentRef = this.getContentRef(child);

            children = _react2['default'].cloneElement(child, {
                className: cls,
                ref: this.contentRef,
                id: child.props.id ? child.props.id : safeId
            });

            if (this.state.animationType === 'out') {
                shouldUpdatePosition = false;
            }

            if (this.props.align) {
                children = _react2['default'].createElement(
                    _position2['default'],
                    {
                        target: target,
                        offset: offset,
                        align: align,
                        beforePosition: beforePosition,
                        onPosition: onPosition,
                        needAdjust: needAdjust,
                        shouldUpdatePosition: shouldUpdatePosition },
                    children
                );
            }
            children = _react2['default'].createElement(
                'div',
                { className: wrapperClassName, style: style },
                hasMask ? _react2['default'].createElement('div', { className: prefix + 'overlay-backdrop', onClick: this._onMaskClick }) : null,
                children
            );
        }
        return _react2['default'].createElement(
            _gateway2['default'],
            { container: container, ref: 'gateway', target: target },
            children
        );
    };

    Overlay.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
        this._throwPropEvents(nextProps, nextState);
        this._isMounted = true;
    };

    Overlay.prototype._throwPropEvents = function _throwPropEvents(props, state) {
        if (state.visible) {
            this.beforeOpen();
            props.beforeOpen();
        } else {
            props.beforeClose();
        }
    };

    Overlay.prototype.beforeOpen = function beforeOpen() {
        if (this.props.disableScroll) {
            var value = {
                overflowY: 'hidden'
            };
            if (hasScroll()) {
                /* eslint-disable eqeqeq */
                if (this.bodyPaddingRight == null) {
                    this.bodyPaddingRight = _nextDom.style.get(document.body, 'paddingRight');
                }
                value.paddingRight = this.bodyPaddingRight + (0, _nextUtil.scrollbar)().width + 'px';
            }
            _nextDom.style.set(document.body, value);
        }
    };

    Overlay.prototype.afterClose = function afterClose() {
        if (this.props.disableScroll) {
            _nextDom.style.set(document.body, {
                overflowY: 'auto',
                paddingRight: this.bodyPaddingRight || 0
            });
        }
    };

    Overlay.prototype.componentDidMount = function componentDidMount() {
        //如果设置了动画，需要等到动画执行完毕再设置焦点
        //使用onEntered方法
        this.componentDidUpdate();
    };

    Overlay.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        var wrapperNode = this.getWrapperNode();
        if (!this.props.animation) {
            this._setFocusNode(prevProps, prevState);
            if (this.state.visible) {
                this.props.onOpen();
                this.props.afterOpen();
                wrapperNode && _nextDom.classList.addClass(wrapperNode, 'opened');
                _manager2['default'].addOverlay(this);
            } else if (prevState && prevState.visible === true) {
                this.props.onClose();
                this.props.afterClose();
                this.afterClose();
                wrapperNode && _nextDom.classList.removeClass(wrapperNode, 'opened');
                _manager2['default'].removeOverlay(this);
            }
        }
        this.prevProps = prevProps;
        this.prevState = prevState;
        this._initAnimationEvents();
        this.handleDocumentEvents();
    };

    Overlay.prototype.handleDocumentEvents = function handleDocumentEvents() {
        if (this.state.visible) {
            if (this.props.canCloseByEsc && !this._keydownEvents) {
                this._keydownEvents = _nextDom.events.on(document, 'keydown', this._onDocumentKeyDown);
            }
            if (this.props.canCloseByOutSideClick && !this._documentEvents) {
                this._documentEvents = _nextDom.events.on(document, 'click', this._onDocumentClick);
            }
            return;
        }
        this.clearHandleDocumentEvents();
    };

    Overlay.prototype.clearHandleDocumentEvents = function clearHandleDocumentEvents() {
        if (this._keydownEvents) {
            this._keydownEvents.off();
            this._keydownEvents = null;
        }
        if (this._documentEvents) {
            this._documentEvents.off();
            this._documentEvents = null;
        }
    };

    Overlay.prototype.onEntering = function onEntering() {
        var wrapperNode = this.getWrapperNode();
        this.props.onOpen();
        wrapperNode && _nextDom.classList.addClass(wrapperNode, 'opened');
    };

    Overlay.prototype.onLeaving = function onLeaving() {
        var wrapperNode = this.getWrapperNode();
        this.props.onClose();
        wrapperNode && _nextDom.classList.removeClass(wrapperNode, 'opened');
    };

    Overlay.prototype.onEntered = function onEntered() {
        this._setFocusNode(this.prevProps, this.prevState);
        this.props.afterOpen();
        _manager2['default'].addOverlay(this);
    };

    Overlay.prototype.onLeaved = function onLeaved() {
        this._setFocusNode(this.prevProps, this.prevState);
        this.props.afterClose();
        this.afterClose();
        _manager2['default'].removeOverlay(this);
    };

    //保留弹出层之前的焦点
    //当弹层消失的时候返回之前的焦点


    Overlay.prototype._setFocusNode = function _setFocusNode(prevProps, prevState) {
        var _this3 = this;

        var oldState = prevState || {};
        if (this.props.autoFocus) {
            if (this.state.visible && !this._hasFocused) {
                saveLastFocusNode();
                //这个时候很可能上一个弹层的关闭事件还未触发，导致焦点已经back触发的元素
                //这里延时处理一下，延时的时间为document.click捕获触发的延时时间
                this.focusTimeout = setTimeout(function () {
                    var node = _this3.getContentNode();

                    if (node) {
                        var focusNodeList = getFocusNodeList(node);
                        if (focusNodeList.length) {
                            focusNodeList[0].focus();
                        }
                        _this3._hasFocused = true;
                    }
                }, 100);
            } else if (!this.state.visible && this._hasFocused) {
                backLastFocusNode();
                this._hasFocused = false;
            }
        }
    };

    Overlay.prototype.componentWillUnmount = function componentWillUnmount() {
        this.isDestroyed = true;
        _manager2['default'].removeOverlay(this);
        this._isMounted = false;
        this.clearHandleDocumentEvents();
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
        }
        if (this._animation) {
            if (this._animation.off) {
                this._animation.off();
            } else {
                clearTimeout(this._animation);
            }
            this._animation = null;
        }
        this.afterClose();
    };

    Overlay.prototype._onMaskClick = function _onMaskClick(e) {
        if (this.props.canCloseByMask) {
            this.props.onRequestClose('maskClick', e);
        }
    };

    Overlay.prototype._getSafeNode = function _getSafeNode(safeNode) {
        if (typeof safeNode === 'function') {
            safeNode = safeNode(this.props);
        }
        if (typeof safeNode === 'string') {
            safeNode = document.getElementById(safeNode);
        } else {
            try {
                safeNode = _reactDom2['default'].findDOMNode(safeNode);
            } catch (e) {
                // regardless of error
            }
        }

        return safeNode;
    };

    Overlay.prototype._onDocumentKeyDown = function _onDocumentKeyDown(e) {

        if (e.keyCode === 27) {
            if (this.Manager && this.Manager.isCurrentOverlay(this) || !this.Manager) {
                this.props.onRequestClose('keyboard', e);
            }
        }
    };

    Overlay.prototype._onDocumentClick = function _onDocumentClick(e) {

        this.initSafeNode();
        for (var i = 0; i < this._safeClickNode.length; i++) {
            var node = this._safeClickNode[i],
                nodeGroup = node.getAttribute('data-overlay-group'),
                _target = e.target,
                targetGroup = _target.getAttribute && _target.getAttribute('data-overlay-group') || '';
            if (node.contains(_target) || nodeGroup === targetGroup || node === _target || !document.documentElement.contains(e.target)) {
                return;
            }
        }
        this.props.onRequestClose('docClick', e);
    };

    Overlay.prototype.initSafeNode = function initSafeNode() {
        var node = this.getWrapperNode && this.getWrapperNode() || _reactDom2['default'].findDOMNode(this),
            safeNode = this.props.safeNode;


        if (Array.isArray(safeNode)) {
            safeNode.push(node);
        } else {
            safeNode = [node, safeNode];
        }
        this.addNodeForSafeClick(safeNode);
    };

    Overlay.prototype.addNodeForSafeClick = function addNodeForSafeClick(node) {
        var _this4 = this;

        if (Array.isArray(node)) {
            node.forEach(function (n) {
                _this4.addNodeForSafeClick(n);
            });
        } else {
            var safeNode = this._getSafeNode(node);
            if (safeNode && this._safeClickNode.indexOf(safeNode) === -1) {
                this._safeClickNode.push(safeNode);
            }
        }
    };

    Overlay.prototype._onPosition = function _onPosition(res) {
        if (this.state.visible) {
            // 很可能我们访问不到contentNode节点，尤其当contentNode的ref为函数的时候
            var contentNode = this.getContentNode();
            if (contentNode) {
                var align = res.align[0];
                var className = contentNode.className.split(' ');
                className.forEach(function (cls) {
                    if (cls.indexOf('position') > -1) {
                        _nextDom.classList.removeClass(contentNode, cls);
                    }
                });
                _nextDom.classList.addClass(contentNode, this.props.prefix + 'position-' + align);
            }
        }
    };

    return Overlay;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    children: _propTypes2['default'].any,
    /**
     * 是否显示浮层, 如果此属性为false，浮层不会被渲染
     */
    visible: _propTypes2['default'].bool,
    /**
     * 是否支持esc按键关闭浮层
     */
    canCloseByEsc: _propTypes2['default'].bool,
    /**
     * 点击浮层外的区域是否关闭浮层
     */
    canCloseByOutSideClick: _propTypes2['default'].bool,
    /**
     * 点击遮罩区域是否关闭浮层
     */
    canCloseByMask: _propTypes2['default'].bool,
    /**
     * 配置动画的播放方式
     * @param {String} in 进场动画
     * @param {String} out 出场动画
     */
    animation: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].bool]),
    /**
     * 配置浮层定位的参照元素
     */
    target: _propTypes2['default'].any,
    /**
     * 浮层相对于target的定位, 详见开发指南的[定位部分](#定位)
     */
    align: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].bool]),
    /**
     * 浮层相对于target定位的微调
     */
    offset: _propTypes2['default'].array,
    /**
     * 浮层关闭前触发的事件
     */
    beforeClose: _propTypes2['default'].func,
    /**
     * 浮层关闭后触发的事件
     */
    onClose: _propTypes2['default'].func,
    /**
     * 浮层关闭后触发的事件, 如果有动画，则在动画结束后触发
     */
    afterClose: _propTypes2['default'].func,
    /**
     * 浮层打开前触发的事件
     */
    beforeOpen: _propTypes2['default'].func,
    /**
     * 浮层打开后触发的事件
     */
    onOpen: _propTypes2['default'].func,
    /**
     * 浮层打开后触发的事件, 如果有动画，则在动画结束后触发
     */
    afterOpen: _propTypes2['default'].func,
    /**
     * 浮层请求关闭触发的事件
     * @param {String} reason 浮层关闭的来源
     * @param {Event} e DOM事件
     */
    onRequestClose: _propTypes2['default'].func,
    /**
     * 浮层定位完成前触发的事件
     */
    beforePosition: _propTypes2['default'].func,
    /**
     * 浮层定位完成后触发的事件
     * @param {Object} config 定位的参数
     * @param {Object} node 定位的元素
     */
    onPosition: _propTypes2['default'].func,
    /**
     * 浮层打开的时候是否让里面的元素自动获取焦点
     */
    autoFocus: _propTypes2['default'].bool,
    /**
     * 是否显示遮罩
     */
    hasMask: _propTypes2['default'].bool,
    /**
     * 隐藏时是否保留子节点
     */
    cache: _propTypes2['default'].bool,
    safeId: _propTypes2['default'].string,
    /**
     * 安全节点,当点击document的时候, 如果包含该节点则不会关闭浮层, 如果是函数需要返回ref, 如果是字符串则是该DOM的id, 也可以直接传入DOM节点
     */
    safeNode: _propTypes2['default'].any,
    /**
     * 浮层的根节点的样式类
     */
    wrapperClassName: _propTypes2['default'].string,
    /**
     * 指定渲染组件的容器
     */
    container: _propTypes2['default'].any,
    /**
     * 强制更新定位信息
     */
    shouldUpdatePosition: _propTypes2['default'].bool,
    /**
     * 是否自动调整定位的位置
     */
    needAdjust: _propTypes2['default'].bool,
    /**
     * 是否禁用页面滚动
     */
    disableScroll: _propTypes2['default'].bool
}, _class.defaultProps = {
    align: 'tl bl',
    offset: [0, 0],
    visible: false,
    canCloseByEsc: true,
    canCloseByOutSideClick: true,
    canCloseByMask: true,
    target: _position2['default'].VIEWPORT,
    animation: {
        'in': 'expandInDown',
        out: 'expandOutUp'
    },
    afterClose: noop,
    beforeClose: noop,
    afterOpen: noop,
    beforeOpen: noop,
    onRequestClose: noop,
    onOpen: noop,
    onClose: noop,
    onPosition: noop,
    autoFocus: false,
    hasMask: false,
    prefix: 'next-',
    cache: false,
    safeId: null,
    disableScroll: false
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Overlay.displayName = 'Overlay';
exports['default'] = Overlay;
module.exports = exports['default'];