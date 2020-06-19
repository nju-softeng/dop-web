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

var _nextAnimate = require('../../next-animate/lib/index.js');

var _nextAnimate2 = _interopRequireDefault(_nextAnimate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = require('../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

function normalize(number) {
    if (number > 99) {
        return '99+';
    }
    return number;
}

/** Tag */
var Tag = (_temp = _class = function (_Component) {
    _inherits(Tag, _Component);

    function Tag(props, context) {
        _classCallCheck(this, Tag);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            selected: props.selected || props.defaultSelected,
            closed: props.closed || props.defaultClosed,
            count: props.count ? Number(props.count) : 0,
            marked: props.marked,
            clickInteractiveIcon: false // 是否点击了交互型的 Icon
        };
        return _this;
    }

    Tag.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('selected' in nextProps && this.props.selected !== nextProps.selected) {
            this.setState({
                selected: nextProps.selected
            });
        }
        if ('closed' in nextProps) {
            this.setState({
                closed: nextProps.closed
            });
        }
    };

    Tag.prototype.onToggle = function onToggle() {
        var _this2 = this;

        this.setState(function (prevState) {
            return {
                marked: !prevState.marked,
                count: prevState.marked ? --prevState.count : ++prevState.count,
                clickInteractiveIcon: true
            };
        });

        this.props.onChange(this.state.count);

        // +/- 的移除动效
        if (this.props.animation) {
            setTimeout(function () {
                _this2.setState({ clickInteractiveIcon: false });
            }, 300);
        }
    };

    Tag.prototype.onClose = function onClose() {
        if (!('closed' in this.props)) {
            this.setState({ closed: true });
        }
        this.props.onClose(this.props.value, this.state.closed);
        this.props.onChange(this.state.closed);
    };

    Tag.prototype.onSelect = function onSelect() {
        var _props = this.props,
            shape = _props.shape,
            onSelect = _props.onSelect,
            onChange = _props.onChange;

        if (shape === 'selectable') {
            var selected = !this.state.selected;
            if (!('selected' in this.props)) {
                this.setState({ selected: selected });
            }
            onSelect(selected);
            onChange(selected);
        }
    };

    Tag.prototype.animationInit = function animationInit() {
        this.props.afterAppear();
    };

    Tag.prototype.animationEnd = function animationEnd() {
        this.props.afterClose();
    };

    Tag.prototype._getClosableSelectable = function _getClosableSelectable(shape) {
        var closable = false;
        var selectable = false;

        if (shape === 'selectable') {
            closable = false;
            selectable = true;
        } else if (shape === 'deletable') {
            closable = true;
            selectable = false;
        }
        return {
            closable: closable,
            selectable: selectable
        };
    };

    Tag.prototype._animatedTag = function _animatedTag(children, animation, style) {
        if (animation) {
            return _react2['default'].createElement(
                _nextAnimate2['default'],
                { animation: style, afterLeave: this.animationEnd.bind(this), afterAppear: this.animationInit.bind(this) },
                children
            );
        }
        return children;
    };

    Tag.prototype.render = function render() {
        var _classNames;

        // Hint: 根据设计稿暂时不支持 large ，如果用户取 size = 'large' ，则使用 medium 的样式
        // Discussion: http://gitlab.alibaba-inc.com/next/tag/issues/10#note_2884687
        var _props2 = this.props,
            prefixCls = _props2.prefixCls,
            shape = _props2.shape,
            type = _props2.type,
            size = _props2.size,
            className = _props2.className,
            disabled = _props2.disabled,
            children = _props2.children,
            animation = _props2.animation,
            others = _objectWithoutProperties(_props2, ['prefixCls', 'shape', 'type', 'size', 'className', 'disabled', 'children', 'animation']);

        var prefix = this.context.prefix || prefixCls || this.props.prefix;
        if (prefixCls) {
            _nextUtil.log.deprecated('prefixCls', 'prefix', 'Tag');
        }
        var state = this.state;

        var _getClosableSelectabl = this._getClosableSelectable(shape),
            closable = _getClosableSelectabl.closable,
            selectable = _getClosableSelectabl.selectable;

        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'tag', true), _defineProperty(_classNames, prefix + 'tag-' + shape, shape), _defineProperty(_classNames, prefix + 'tag-level-' + type, type), _defineProperty(_classNames, prefix + 'tag-' + size, size), _defineProperty(_classNames, prefix + 'tag-deletable', closable), _defineProperty(_classNames, prefix + 'tag-selectable', selectable), _defineProperty(_classNames, 'selected', state.selected), _defineProperty(_classNames, 'disabled', disabled), _defineProperty(_classNames, className, className), _classNames));
        var body = void 0,
            tail = void 0;

        if (shape === 'interactive') {
            body = children;
            var iconCls = animation && state.clickInteractiveIcon ? 'clicked' : '';
            tail = _react2['default'].createElement(
                'div',
                { className: prefix + 'tag-tail' },
                state.count ? _react2['default'].createElement(
                    'span',
                    { className: prefix + 'tag-number' },
                    normalize(state.count)
                ) : null,
                _react2['default'].createElement(
                    'span',
                    { className: prefix + 'tag-opt', onClick: this.onToggle.bind(this) },
                    _react2['default'].createElement(_nextIcon2['default'], { type: state.marked ? 'subtract' : 'add', className: iconCls })
                )
            );
        } else {
            body = [children];
            state.count && body.push(_react2['default'].createElement(
                'span',
                { className: prefix + 'tag-number', key: 'tag-tail-number' },
                '(',
                state.count,
                ')'
            ));
            tail = closable ? _react2['default'].createElement(
                'div',
                { className: prefix + 'tag-tail', onClick: this.onClose.bind(this) },
                _react2['default'].createElement(
                    'span',
                    { className: prefix + 'tag-opt' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'close' })
                )
            ) : null;
        }

        var realTag = state.closed ? null : _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: classes, onClick: this.onSelect.bind(this) }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'tag-body' },
                _react2['default'].Children.map(body, function (el, i) {
                    return typeof el === 'function' ? _react2['default'].cloneElement(el, { key: i }) : el;
                })
            ),
            tail
        );

        return this._animatedTag(realTag, animation, prefix + 'tag-zoom');
    };

    return Tag;
}(_react.Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    prefixCls: _propTypes2['default'].string, // for compatibility
    /**
     * 标签的形态
     */
    shape: _propTypes2['default'].oneOf(['selectable', 'deletable', 'interactive', 'link', 'readonly']),
    /**
     * 标签的类型
     */
    type: _propTypes2['default'].oneOf(['normal', 'primary', 'secondary']),
    /**
     * 标签的尺寸（large 尺寸为兼容表单场景 large = medium）
     */
    size: _propTypes2['default'].oneOf(['medium', 'small', 'large']),
    /**
     * 标签是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 标签附加显示的重复次数
     */
    count: _propTypes2['default'].number,
    /**
     * 选择型标签是否被选中（受控）
     */
    selected: _propTypes2['default'].bool,
    /**
     * 选型型标签默认是否被选中（非受控）
     */
    defaultSelected: _propTypes2['default'].bool,
    /**
     * 可删除标签是否被关闭（受控）
     */
    closed: _propTypes2['default'].bool,
    /**
     * 可删除标签默认是否被关闭（非受控）
     */
    defaultClosed: _propTypes2['default'].bool,
    /**
     * 互动型标签是否被标记过（受控）
     */
    marked: _propTypes2['default'].bool,
    /**
     * 标签暂存的值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].array, _propTypes2['default'].object, _propTypes2['default'].bool]),
    /**
     * 是否开启动效
     */
    animation: _propTypes2['default'].bool,
    /**
     * 互动型标签被 mark 的数量变化时的回调
     * @param {Number} count 被标记的次数
     */
    onChange: _propTypes2['default'].func,
    /**
     * 可删除标签被关闭时的回调
     * @param {String} value 值
     * @param {Boolean} closed 是否关闭状态
     */
    onClose: _propTypes2['default'].func,
    /**
     * 可选择标签被选中时的回调
     * @param {Boolean} selected 是否被选择
     */
    onSelect: _propTypes2['default'].func,
    /**
     * 标签出现后执行的回调
     * Function() => void
     */
    afterAppear: _propTypes2['default'].func,
    /**
     * 标签关闭后执行的回调
     * Function() => void
     */
    afterClose: _propTypes2['default'].func,
    className: _propTypes2['default'].string,
    children: _propTypes2['default'].any
}, _class.defaultProps = {
    prefix: 'next-',
    shape: 'selectable',
    type: 'normal',
    size: 'medium',
    disabled: false,
    defaultSelected: false,
    defaultClosed: false,
    marked: false,
    animation: true,
    onChange: noop,
    onClose: noop,
    onSelect: noop,
    afterAppear: noop,
    afterClose: noop
}, _temp);
Tag.displayName = 'Tag';
exports['default'] = Tag;
module.exports = exports['default'];