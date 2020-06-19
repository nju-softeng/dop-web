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

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextProgress = require('../../../next-progress/lib/index.js');

var _nextProgress2 = _interopRequireDefault(_nextProgress);

var _nextUtil = require('../../../next-util/lib/index.js');

var _nextDom = require('../../../next-dom/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Step.Item */
var StepItem = (_temp = _class = function (_Component) {
    _inherits(StepItem, _Component);

    function StepItem(props) {
        _classCallCheck(this, StepItem);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.removeClickedCls = _this.removeClickedCls.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this._nodeRefHandler = _this._nodeRefHandler.bind(_this);
        return _this;
    }

    StepItem.prototype.getNode = function getNode() {
        var _props = this.props,
            prefix = _props.prefix,
            index = _props.index,
            status = _props.status,
            icon = _props.icon,
            type = _props.type,
            percent = _props.percent;

        var nodeElement = icon;
        if (type === 'dot') {
            nodeElement = icon ? _react2['default'].createElement(_nextIcon2['default'], { type: icon }) : _react2['default'].createElement('span', { className: prefix + 'step-item-node-dot' });
        } else if (type === 'circle' && percent) {
            nodeElement = _react2['default'].createElement(_nextProgress2['default'], { shape: 'circle', percent: percent, className: prefix + 'step-item-progress' });
        } else {
            nodeElement = _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-node-circle' },
                icon ? _react2['default'].createElement(_nextIcon2['default'], { type: icon }) : this._itemRender(index, status)
            );
        }

        return nodeElement;
    };

    StepItem.prototype.getStyle = function getStyle() {
        var _props2 = this.props,
            parentWidth = _props2.parentWidth,
            parentHeight = _props2.parentHeight,
            direction = _props2.direction,
            total = _props2.total,
            type = _props2.type;

        var width = 'auto';

        if (!_nextUtil.support.flex && Number(parentWidth) && Number(parentHeight)) {
            if (type === 'arrow') {
                width = Math.floor(parentWidth / total - parentHeight / 2 - parentHeight / 8);
            } else {
                width = direction === 'horizontal' ? Math.floor(parentWidth / total) : 'auto';
            }
        }

        return {
            width: width
        };
    };

    StepItem.prototype.onClick = function onClick() {
        var _props3 = this.props,
            index = _props3.index,
            disabled = _props3.disabled,
            readOnly = _props3.readOnly,
            animation = _props3.animation;

        if (disabled || readOnly) {
            return false;
        }

        if (animation && this.stepNode) {
            _nextDom.classList.hasClass(this.stepNode, 'clicked') ? _nextDom.classList.removeClass(this.stepNode, 'clicked') : _nextDom.classList.addClass(this.stepNode, 'clicked');
        }
        this.props.onClick(index);
    };

    StepItem.prototype.removeClickedCls = function removeClickedCls() {
        var _props4 = this.props,
            animation = _props4.animation,
            prefix = _props4.prefix;

        if (animation && this.stepNode && _nextDom.classList.hasClass(this.stepNode, 'clicked')) {
            _nextDom.classList.removeClass(this.stepNode, 'clicked');
        }
    };

    // 节点的渲染方法


    StepItem.prototype._itemRender = function _itemRender(index, status) {
        var itemRender = this.props.itemRender;

        if (itemRender) {
            return itemRender(index, status);
        }
        return status === 'finish' ? _react2['default'].createElement(_nextIcon2['default'], { type: 'select' }) : index + 1;
    };

    StepItem.prototype._nodeRefHandler = function _nodeRefHandler(ref) {
        this.stepNode = ref;
    };

    StepItem.prototype.render = function render() {
        var _classNames;

        var _props5 = this.props,
            prefix = _props5.prefix,
            className = _props5.className,
            status = _props5.status,
            title = _props5.title,
            index = _props5.index,
            total = _props5.total,
            type = _props5.type,
            content = _props5.content,
            direction = _props5.direction,
            disabled = _props5.disabled,
            onClick = _props5.onClick,
            readOnly = _props5.readOnly,
            animation = _props5.animation,
            others = _objectWithoutProperties(_props5, ['prefix', 'className', 'status', 'title', 'index', 'total', 'type', 'content', 'direction', 'disabled', 'onClick', 'readOnly', 'animation']);

        var nodeElement = this.getNode();
        var pickProps = (0, _nextUtil.pickAttrs)(others);

        var stepCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'step-item', true), _defineProperty(_classNames, prefix + 'step-item-' + status, status), _defineProperty(_classNames, prefix + 'step-item-first', index === 0), _defineProperty(_classNames, prefix + 'step-item-last', index === total - 1), _defineProperty(_classNames, prefix + 'step-item-disabled', disabled), _defineProperty(_classNames, prefix + 'step-item-read-only', readOnly), _defineProperty(_classNames, className, className), _classNames));

        var nodeCls = (0, _classnames2['default'])(_defineProperty({}, prefix + 'step-item-node', true));

        var overlayCls = status === 'finish' ? { width: '100%' } : null;

        var arrowElement = _react2['default'].createElement(
            'div',
            _extends({}, pickProps, { style: this.getStyle(), className: stepCls, onClick: this.onClick }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-container' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-title' },
                    title
                )
            )
        );
        var otherElement = _react2['default'].createElement(
            'div',
            _extends({}, pickProps, { style: this.getStyle(), className: stepCls }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-tail' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-tail-underlay' },
                    _react2['default'].createElement('div', { className: prefix + 'step-item-tail-overlay', style: overlayCls })
                )
            ),
            direction === 'vertical' ? _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-container' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-node-placeholder', onClick: this.onClick },
                    _react2['default'].createElement(
                        'div',
                        {
                            className: prefix + 'step-item-node',
                            ref: this._nodeRefHandler,
                            onTransitionEnd: this.removeClickedCls },
                        nodeElement
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-body' },
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'step-item-title' },
                        title
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'step-item-content' },
                        content
                    )
                )
            ) : _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-container' },
                _react2['default'].createElement(
                    'div',
                    {
                        className: prefix + 'step-item-node',
                        onClick: this.onClick,
                        ref: this._nodeRefHandler,
                        onTransitionEnd: this.removeClickedCls },
                    nodeElement
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-title' },
                    title
                )
            )
        );

        return type === 'arrow' ? arrowElement : otherElement;
    };

    return StepItem;
}(_react.Component), _class.propTypes = {
    /**
     * 组件的样式品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 步骤的状态，如不传，会根据外层的 Step 的 current 属性生成，可选值为 `wait`, `process`, `finish`
     */
    status: _propTypes2['default'].oneOf(['wait', 'process', 'finish']),
    /**
     * 标题
     */
    title: _propTypes2['default'].node,
    direction: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    type: _propTypes2['default'].oneOf(['circle', 'arrow', 'dot']),
    /**
     * 图标
     */
    icon: _propTypes2['default'].string,
    /**
     * 内容，用于垂直状态下的内容填充
     */
    content: _propTypes2['default'].node,
    /**
     * StepItem 的自定义渲染
     * @param {Number} index   节点索引
     * @param {String} status  节点状态
     * @returns {Node} 节点的渲染结果
     */
    itemRender: _propTypes2['default'].func,
    /**
     * 百分比
     */
    percent: _propTypes2['default'].number,
    index: _propTypes2['default'].number,
    total: _propTypes2['default'].number,
    animation: _propTypes2['default'].bool, // 是否开启动效，由父级传入
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    parentWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    parentHeight: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 点击步骤时的回调
     * @param {Number} index 节点索引
     */
    onClick: _propTypes2['default'].func,
    /**
     * 自定义样式
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    direction: 'horizontal',
    type: 'circle',
    index: 0,
    total: 1,
    onClick: function onClick() {}
}, _temp);
StepItem.displayName = 'StepItem';
exports['default'] = StepItem;
module.exports = exports['default'];