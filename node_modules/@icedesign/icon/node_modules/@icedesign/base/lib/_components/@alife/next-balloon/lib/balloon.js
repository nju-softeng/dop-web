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

var _nextOverlay = require('../../next-overlay/lib/index.js');

var _nextUtil = require('../../next-util/lib/index.js');

var _inner = require('./inner.js');

var _inner2 = _interopRequireDefault(_inner);

var _alignMap = require('./alignMap.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

var alignMap = _alignMap.normalMap;

/** Balloon */
var Balloon = (_temp = _class = function (_React$Component) {
    _inherits(Balloon, _React$Component);

    function Balloon(props, context) {
        _classCallCheck(this, Balloon);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {
            align: props.align,
            visible: 'visible' in props ? props.visible : props.defaultVisible
        };
        return _this;
    }

    Balloon.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps) {
            this.setState({
                visible: nextProps.visible
            });
        }
    };

    Balloon.prototype._onVisibleChange = function _onVisibleChange(visible) {
        // Not Controlled
        if (!('visible' in this.props)) {
            this.setState({
                visible: visible
            });
        }
        var onVisibleChange = this.props.onVisibleChange;
        if (this.props.onChange) {
            // 存在onChange即提示
            _nextUtil.log.deprecated('onChange', 'onVisibleChange', 'balloon');
            // 如果没有onVisibleChange, 用老的onChange api
            if (onVisibleChange === undefined) {
                onVisibleChange = this.props.onChange;
            }
        }
        //既没有onChange,也没有onVisibleChange
        if (onVisibleChange === undefined) {
            onVisibleChange = noop;
        }
        onVisibleChange(visible);
    };

    Balloon.prototype._onClose = function _onClose(e) {
        //this.props.onClose();
        this._onVisibleChange(false);
        this.props.onCloseClick();
        //必须加上preventDefault,否则单测IE下报错,出现full page reload 异常
        e.preventDefault();
    };

    Balloon.prototype.render = function render() {
        var _props = this.props,
            type = _props.type,
            prefix = _props.prefix,
            className = _props.className,
            alignment = _props.alignment,
            trigger = _props.trigger,
            triggerType = _props.triggerType,
            children = _props.children,
            closable = _props.closable,
            shouldUpdatePosition = _props.shouldUpdatePosition,
            delay = _props.delay,
            needAdjust = _props.needAdjust,
            safeId = _props.safeId,
            autoFocus = _props.autoFocus,
            safeNode = _props.safeNode,
            onClick = _props.onClick,
            onHover = _props.onHover,
            animation = _props.animation,
            offset = _props.offset,
            style = _props.style,
            __isTooltip = _props.__isTooltip,
            container = _props.container,
            cache = _props.cache,
            others = _objectWithoutProperties(_props, ['type', 'prefix', 'className', 'alignment', 'trigger', 'triggerType', 'children', 'closable', 'shouldUpdatePosition', 'delay', 'needAdjust', 'safeId', 'autoFocus', 'safeNode', 'onClick', 'onHover', 'animation', 'offset', 'style', '__isTooltip', 'container', 'cache']),
            align = this.state.align;

        alignMap = alignment === 'normal' ? _alignMap.normalMap : _alignMap.edgeMap;
        prefix = this.context.prefix || prefix;

        offset = [alignMap[align].offset[0] + offset[0], alignMap[align].offset[1] + offset[1]];
        var transformOrigin = alignMap[align].trOrigin;
        style = _extends({ transformOrigin: transformOrigin }, style);
        var content = _react2['default'].createElement(
            _inner2['default'],
            _extends({
                prefix: prefix,
                closable: closable,
                onClose: this._onClose.bind(this),
                __isTooltip: __isTooltip,
                className: className,
                style: style,
                align: align,
                type: type,
                alignment: alignment
            }, (0, _nextUtil.pickAttrs)(others)),
            children
        );

        return _react2['default'].createElement(
            _nextOverlay.Popup,
            { trigger: trigger,
                cache: cache,
                safeId: safeId,
                triggerType: triggerType,
                align: alignMap[align].align,
                offset: offset,
                visible: this.state.visible,
                onPosition: this._onPosition.bind(this),
                onClick: onClick,
                onHover: onHover,
                onClose: this.props.onClose,
                afterClose: this.props.afterClose,
                onVisibleChange: this._onVisibleChange.bind(this),
                shouldUpdatePosition: shouldUpdatePosition,
                needAdjust: needAdjust,
                animation: animation,
                delay: delay,
                autoFocus: autoFocus,
                safeNode: safeNode,
                container: container
            },
            content
        );
    };

    Balloon.prototype._onPosition = function _onPosition(res) {
        alignMap = this.props.alignment === 'normal' ? _alignMap.normalMap : _alignMap.edgeMap;
        var newAlign = res.align.join(' ');
        var resAlign = void 0;

        for (var key in alignMap) {
            if (alignMap[key].align === newAlign) {
                resAlign = key;

                break;
            }
        }
        resAlign = resAlign || this.state.align;
        if (resAlign !== this.state.align) {
            this.setState({
                align: resAlign
            });
        }
    };

    return Balloon;
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
     * 浮层的内容
     */
    children: _propTypes2['default'].any,
    size: _propTypes2['default'].string,
    /**
     * 样式类型
     */
    type: _propTypes2['default'].oneOf(['normal', 'primary']),
    /**
     * 弹层当前显示的状态
     */
    visible: _propTypes2['default'].bool,
    /**
     * 弹层默认显示的状态
     */
    defaultVisible: _propTypes2['default'].bool,
    /**
     * 弹层在显示和隐藏触发的事件
     * @param {Boolean} visible 弹层是否隐藏和显示
     */
    onVisibleChange: _propTypes2['default'].func,
    /**
     * 弹出层对齐方式
     * @enumdesc 普通对齐 箭头居中, 边缘对齐 箭头可在trigger的边缘
     */
    alignment: _propTypes2['default'].oneOf(['normal', 'edge']),
    /**
     * 是否显示关闭按钮
     */
    closable: _propTypes2['default'].bool,
    /**
     * 弹出层位置
     * @enumdesc 上, 右, 下, 左, 上左, 上右, 下左, 下右, 左上, 左下, 右上, 右下
     */
    align: _propTypes2['default'].oneOf(['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br', 'lt', 'lb', 'rt', 'rb']),
    /**
     * 弹层相对于trigger的定位的微调
     */
    offset: _propTypes2['default'].array,
    /**
     * 触发元素
     */
    trigger: _propTypes2['default'].any,
    /**
     * 触发行为
     * @enumdesc 鼠标悬浮, 获取到焦点, 鼠标点击
     */
    triggerType: _propTypes2['default'].oneOf(['hover', 'focus', 'click']),
    onChange: _propTypes2['default'].func,

    onClick: _propTypes2['default'].func,
    /**
     * 任何visible为false时会触发的事件
     */
    onClose: _propTypes2['default'].func,
    /**
     * 点击关闭按钮的click事件
     */
    onCloseClick: _propTypes2['default'].func,
    onHover: _propTypes2['default'].func,
    /**
     * 是否进行自动位置调整
     */
    needAdjust: _propTypes2['default'].bool,
    /**
     * 弹层在触发以后的延时显示
     */
    delay: _propTypes2['default'].number,
    /**
     * 浮层关闭后触发的事件, 如果有动画，则在动画结束后触发
     */
    afterClose: _propTypes2['default'].func,
    /**
     * 强制更新定位信息
     */
    shouldUpdatePosition: _propTypes2['default'].bool,
    /**
     * 弹层出现后是否自动focus到内部第一个元素
     */
    autoFocus: _propTypes2['default'].bool,
    /**
     * 安全节点:对于triggetType为click的浮层,会在点击除了浮层外的其它区域时关闭浮层.safeNode用于添加不触发关闭的节点, 值可以是dom节点的id或者是节点的dom对象
     */
    safeNode: _propTypes2['default'].string,
    /**
     * 用来指定safeNode节点的id，和safeNode配合使用
     */
    safeId: _propTypes2['default'].string,
    /**
     * 配置动画的播放方式
     * @param {String} in 进场动画
     * @param {String} out 出场动画
     */
    animation: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].bool]),

    /**
     * 弹层的dom节点关闭时是否删除
     */
    cache: _propTypes2['default'].bool,
    /**
     * 指定浮层渲染的父节点, 可以为节点id的字符串，也可以返回节点的函数。
     */
    container: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
    __isTooltip: _propTypes2['default'].bool

}, _class.defaultProps = {
    prefix: 'next-',
    type: 'normal',
    closable: true,
    defaultVisible: false,
    size: 'medium',
    alignment: 'normal',
    align: 'b',
    offset: [0, 0],
    trigger: _react2['default'].createElement('span', null),
    onClose: noop,
    onCloseClick: noop,
    afterClose: noop,
    needAdjust: false,
    triggerType: 'hover',
    safeNode: undefined,
    safeId: null,
    autoFocus: false,
    animation: {
        'in': 'zoomIn',
        out: 'zoomOut'
    },
    cache: false,
    __isTooltip: false
}, _temp);
Balloon.displayName = 'Balloon';
exports['default'] = Balloon;
module.exports = exports['default'];