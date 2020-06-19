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

/** Rating */
var Rating = (_temp = _class = function (_React$Component) {
    _inherits(Rating, _React$Component);

    function Rating(props, context) {
        _classCallCheck(this, Rating);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {
            value: props.value || props.defaultValue || 0,
            hoverValue: 0,
            iconSpace: 0,
            iconSize: 0,
            clicked: false // 标记组件是否被点击过
        };
        _this.timer = null;
        return _this;
    }

    Rating.prototype.componentDidMount = function componentDidMount() {
        this.getRenderResult();
    };

    Rating.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value || 0
            });
        }
    };

    Rating.prototype.componentWillUnmount = function componentWillUnmount() {
        // 延时设置
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };

    Rating.prototype.getRenderResult = function getRenderResult() {
        var count = this.props.count;
        var _state = this.state,
            iconSpace = _state.iconSpace,
            iconSize = _state.iconSize;

        var icon = this.refs['rating-icon-0'];

        if (icon && this.ratingUnderlay) {
            var newIconSize = icon.offsetWidth;
            var newIconSpace = (this.ratingUnderlay.offsetWidth - count * newIconSize) / (count + 1);

            if (newIconSize !== iconSize || newIconSpace !== iconSpace) {
                this.setState({
                    iconSpace: newIconSpace,
                    iconSize: newIconSize
                });
            }
        }
    };

    Rating.prototype.getValue = function getValue(e) {
        // 如定位不准，优先纠正定位
        this.getRenderResult();

        var _props = this.props,
            allowHalf = _props.allowHalf,
            count = _props.count;
        var _state2 = this.state,
            iconSpace = _state2.iconSpace,
            iconSize = _state2.iconSize;


        var pos = e.pageX - this.ratingUnderlay.getBoundingClientRect().left;
        var fullNum = Math.floor(pos / (iconSpace + iconSize));
        var surplusNum = (pos - fullNum * (iconSpace + iconSize)) / iconSize;
        var value = Number(fullNum) + Number(surplusNum.toFixed(1));

        if (value >= count) {
            value = count;
        } else if (allowHalf) {
            var floorValue = Math.floor(value);
            value = value - 0.5 >= floorValue ? floorValue + 1 : floorValue + 0.5;
        } else {
            value = Math.floor(value) + 1;
        }

        return value;
    };

    Rating.prototype.onHover = function onHover(e) {
        var _this2 = this;

        var value = this.getValue(e);
        if (value !== this.state.hoverValue) {
            // 延时设置
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(function () {
                _this2.setState({ hoverValue: value });
            }, 0);
        }
    };

    Rating.prototype.onLeave = function onLeave() {
        // 清除延时
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.setState({
            hoverValue: 0
        });
    };

    Rating.prototype.onClick = function onClick(e) {
        var _this3 = this;

        var value = this.getValue(e);

        if (!('value' in this.props)) {
            this.setState({ value: value, clicked: true });
        }

        this.props.onChange(value);

        setTimeout(function () {
            _this3.setState({ clicked: false });
        }, 100);
    };

    Rating.prototype.getOverlayWidth = function getOverlayWidth() {
        var _state3 = this.state,
            hoverValue = _state3.hoverValue,
            iconSpace = _state3.iconSpace,
            iconSize = _state3.iconSize;


        if (!iconSpace || !iconSize) {
            return 'auto';
        }

        var value = hoverValue ? hoverValue : this.state.value;
        var floorValue = Math.floor(value);
        return iconSize * value + (floorValue + 1) * iconSpace;
    };

    Rating.prototype.getInfoLeft = function getInfoLeft() {
        var _state4 = this.state,
            value = _state4.value,
            hoverValue = _state4.hoverValue,
            iconSpace = _state4.iconSpace,
            iconSize = _state4.iconSize;

        var infoValue = hoverValue || value;
        var ceilValue = Math.ceil(infoValue);
        return iconSize * (ceilValue - 1) + ceilValue * iconSpace;
    };

    Rating.prototype._ratingUnderlayRefHandler = function _ratingUnderlayRefHandler(ref) {
        this.ratingUnderlay = ref;
    };

    Rating.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props2 = this.props,
            className = _props2.className,
            type = _props2.type,
            count = _props2.count,
            size = _props2.size,
            disabled = _props2.disabled,
            showInfo = _props2.showInfo,
            others = _objectWithoutProperties(_props2, ['className', 'type', 'count', 'size', 'disabled', 'showInfo']);

        var _state5 = this.state,
            hoverValue = _state5.hoverValue,
            clicked = _state5.clicked;

        var prefix = this.context.prefix || this.props.prefix;
        var pickProps = (0, _nextUtil.pickAttrs)(others);
        var underlay = [],
            overlay = [];

        // 获得Value
        var value = hoverValue || this.state.value;
        value = value >= count ? count : value;
        value = value <= 0 ? 0 : value;

        // icon的sizeMap
        var sizeMap = {
            small: 'xs',
            medium: 'small',
            large: 'medium'
        }[size];

        for (var i = 0; i < count; i++) {
            var isCurrent = Math.ceil(value - 1) === i;
            var iconCls = (0, _classnames2['default'])({
                hover: hoverValue > 0 && isCurrent,
                clicked: clicked && isCurrent
            });

            underlay.push(_react2['default'].createElement(
                'span',
                { ref: 'rating-icon-' + i, key: 'underlay-' + i, className: prefix + 'rating-icon' },
                _react2['default'].createElement(_nextIcon2['default'], { type: 'favorites-filling', size: sizeMap, className: iconCls })
            ));
            overlay.push(_react2['default'].createElement(
                'span',
                { key: 'overlay-' + i, className: prefix + 'rating-icon' },
                _react2['default'].createElement(_nextIcon2['default'], { type: 'favorites-filling', size: sizeMap, className: iconCls })
            ));
        }

        var ratingCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'rating', true), _defineProperty(_classNames, prefix + 'rating-' + size, size), _defineProperty(_classNames, prefix + 'rating-grade-low', type === 'grade' && value <= count * 0.4), _defineProperty(_classNames, prefix + 'rating-grade-high', type === 'grade' && value > count * 0.4), _defineProperty(_classNames, 'hover', hoverValue > 0), _defineProperty(_classNames, className, className), _classNames));
        var baseCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'rating-base', true), _defineProperty(_classNames2, prefix + 'rating-base-disabled', disabled), _classNames2));
        var overlayStyle = {
            width: this.getOverlayWidth()
        };
        var infoStyle = {
            left: this.getInfoLeft(),
            display: hoverValue ? 'block' : 'none'
        };
        var finalAttrs = disabled ? {} : {
            onClick: this.onClick.bind(this),
            onMouseOver: this.onHover.bind(this),
            onMouseMove: this.onHover.bind(this),
            onMouseLeave: this.onLeave.bind(this)
        };

        return _react2['default'].createElement(
            'div',
            _extends({}, pickProps, { className: ratingCls }),
            _react2['default'].createElement(
                'div',
                _extends({ className: baseCls }, finalAttrs),
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'rating-underlay', ref: this._ratingUnderlayRefHandler.bind(this) },
                    underlay
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'rating-overlay', style: overlayStyle },
                    overlay
                )
            ),
            type === 'grade' ? _react2['default'].createElement(
                'div',
                { className: prefix + 'rating-info', style: infoStyle },
                showInfo instanceof Function ? showInfo(value) : '' + value
            ) : null,
            showInfo ? _react2['default'].createElement(
                'div',
                { className: prefix + 'rating-text' },
                showInfo instanceof Function ? showInfo(value) : '' + value
            ) : null
        );
    };

    return Rating;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 默认值
     */
    defaultValue: _propTypes2['default'].number,
    /**
     * 值
     */
    value: _propTypes2['default'].number,
    /**
     * 评分的总数
     */
    count: _propTypes2['default'].number,
    /**
     * 类型
     */
    type: _propTypes2['default'].oneOf(['normal', 'grade']),
    /**
     * 尺寸
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 是否允许半星评分
     */
    allowHalf: _propTypes2['default'].bool,
    /**
     * 用户点击评分时触发的回调
     * @param {String} value 评分值
     */
    onChange: _propTypes2['default'].func,
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否展示文本信息
     */
    showInfo: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].func]),
    /**
     * 自定义样式名
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    type: 'normal',
    size: 'medium',
    disabled: false,
    count: 5,
    defaultValue: 0,
    allowHalf: false,
    showInfo: false,
    onChange: function onChange() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Rating.displayName = 'Rating';
exports['default'] = Rating;
module.exports = exports['default'];