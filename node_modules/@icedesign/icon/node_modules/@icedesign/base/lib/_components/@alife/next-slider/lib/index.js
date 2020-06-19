'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextUtil = require('../../next-util/lib/index.js');

var _utils = require('./utils/utils.js');

var _innerSlider = require('./slick/inner-slider.js');

var _innerSlider2 = _interopRequireDefault(_innerSlider);

var _json2mq = require('./utils/json2mq.js');

var _json2mq2 = _interopRequireDefault(_json2mq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ResponsiveMixin = {};
if (window) {
    require('./utils/matchmedia.js');
    require('./utils/matchmedia-listener.js');
    ResponsiveMixin = require('./slick/mixins/react-responsive-mixin.js');
}

/** Slider */
var Slider = (_temp = _class = function (_Component) {
    _inherits(Slider, _Component);

    function Slider(props, context) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            breakpoint: null
        };
        return _this;
    }

    Slider.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        // TODO: 1.x remove responsive
        var responsive = this.props.responsive;


        if (responsive) {
            var breakpoints = responsive.map(function (breakPt) {
                return breakPt.breakpoint;
            });
            breakpoints.sort(function (x, y) {
                return x - y;
            });

            breakpoints.forEach(function (breakpoint, index) {
                var bQuery = void 0;
                if (index === 0) {
                    bQuery = (0, _json2mq2['default'])({ minWidth: 0, maxWidth: breakpoint });
                } else {
                    bQuery = (0, _json2mq2['default'])({ minWidth: breakpoints[index - 1], maxWidth: breakpoint });
                }
                _this2.media(bQuery, function () {
                    _this2.setState({ breakpoint: breakpoint });
                });
            });

            // Register media query for full screen. Need to support resize from small to large
            var query = (0, _json2mq2['default'])({ minWidth: breakpoints.slice(-1)[0] });

            this.media(query, function () {
                _this2.setState({ breakpoint: null });
            });
        }
    };

    Slider.prototype.render = function render() {
        var _classnames,
            _this3 = this;

        var _props = this.props,
            prefixCls = _props.prefixCls,
            responsive = _props.responsive,
            arrowPos = _props.arrowPos,
            vertical = _props.vertical,
            slideDirection = _props.slideDirection,
            style = _props.style,
            className = _props.className,
            children = _props.children;

        var prefix = this.context.prefix || prefixCls || this.props.prefix;

        var settings = void 0;
        var newProps = void 0;
        var classNames = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'slick', true), _defineProperty(_classnames, prefix + 'slick-' + arrowPos, arrowPos), _defineProperty(_classnames, prefix + 'slick-' + slideDirection, slideDirection === 'vertical' || slideDirection === 'horizontal'), _classnames), className);

        /* istanbul ignore if  */
        if (this.state.breakpoint) {
            newProps = responsive.filter(function (resp) {
                return resp.breakpoint === _this3.state.breakpoint;
            });
            settings = newProps[0].settings === 'unslick' ? 'unslick' : _extends({}, this.props, newProps[0].settings, { prefix: prefix });
        } else {
            settings = _extends({}, this.props, { prefix: prefix }); // for rewrite the properties
            var slideCount = _react2['default'].Children.count(children);

            if (slideCount === 1) {
                settings.arrows = false;
                settings.autoplay = false;
                settings.draggable = false;
            } else if (slideCount === 0) {
                return null;
            }
        }

        // TODO: 1.0 时取消 vertical 属性
        // WARM: 1.0 时将不对外暴露 vertical ，原有 vertical 功能由 dotsDirection 取代， slideDirection 用于控制组件的滑动方向
        if (vertical) {
            _nextUtil.log.deprecated('vertical', 'dotsDirection', 'Slider');
            settings.dotsDirection = 'vertical';
            settings.vertical = false;
        }

        if (slideDirection === 'vertical') {
            settings.vertical = true; // 向下传递时使用 vertical 属性
        }

        // TODO: 1.0 时取消 prefixCls 属性
        if (prefixCls) {
            _nextUtil.log.deprecated('prefixCls', 'prefix', 'Slider');
            settings.prefix = prefixCls;
        }

        if (settings === 'unslick') {
            // if 'unslick' responsive breakpoint setting used, just return the <Slider> tag nested HTML
            return _react2['default'].createElement(
                'div',
                null,
                children
            );
        } else {
            return _react2['default'].createElement(
                'div',
                { className: classNames, style: style },
                _react2['default'].createElement(
                    _innerSlider2['default'],
                    settings,
                    children
                )
            );
        }
    };

    return Slider;
}(_react.Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    prefixCls: _propTypes2['default'].string, // obsolete
    /**
     * 自定义传入的样式
     */
    className: _propTypes2['default'].string,
    /**
     * 是否使用自适应高度
     */
    adaptiveHeight: _propTypes2['default'].bool,
    /**
     * 是否开启动效
     */
    animation: _propTypes2['default'].bool,
    /**
     * 是否显示箭头
     */
    arrows: _propTypes2['default'].bool,
    /**
     * 导航箭头大小
     */
    arrowSize: _propTypes2['default'].oneOf(['medium', 'large']),
    /**
     * 导航箭头位置
     */
    arrowPos: _propTypes2['default'].oneOf(['inline', 'outer']),
    /**
     * 导航箭头的方向
     */
    arrowDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    /**
     * 向后箭头
     */
    nextArrow: _propTypes2['default'].element,
    /**
     * 向后箭头
     */
    prevArrow: _propTypes2['default'].element,
    /**
     * 是否自动播放
     */
    autoplay: _propTypes2['default'].bool,
    /**
     * 自动播放的速度
     */
    autoplaySpeed: _propTypes2['default'].number,
    /**
     * 是否启用居中模式
     */
    centerMode: _propTypes2['default'].bool,
    /**
     * 是否显示导航锚点
     */
    dots: _propTypes2['default'].bool,
    /**
     * 导航锚点到位置
     */
    dotsDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    dotsClass: _propTypes2['default'].string,
    /**
     * 是否可拖拽
     */
    draggable: _propTypes2['default'].bool,
    /**
     * 是否使用淡入淡出效果
     */
    fade: _propTypes2['default'].bool,
    /**
     * 是否使用无穷循环模式
     */
    infinite: _propTypes2['default'].bool,
    /**
     * 初始被激活的轮播图
     */
    initialSlide: _propTypes2['default'].number,
    /**
     * 是否启用懒加载
     */
    lazyLoad: _propTypes2['default'].bool,
    vertical: _propTypes2['default'].bool,
    rtl: _propTypes2['default'].bool,
    slide: _propTypes2['default'].string,
    /**
     * 轮播方向
     */
    slideDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    /**
     * 同时展示的图片数量
     */
    slidesToShow: _propTypes2['default'].number,
    /**
     * 同时滑动到图片数量
     */
    slidesToScroll: _propTypes2['default'].number,
    /**
     * 轮播速度
     */
    speed: _propTypes2['default'].number,
    responsive: _propTypes2['default'].array,
    children: _propTypes2['default'].any,
    /**
     * 跳转到指定的轮播图（受控）
     */
    slickGoTo: _propTypes2['default'].number,
    /**
     * 轮播切换后的回调函数
     * @param {Number} index 当前幻灯片的索引
     */
    afterChange: _propTypes2['default'].func,
    /**
     * 轮播切换前的回调函数
     * @param {Number} currentIndex 当前幻灯片的索引
     * @param {Number} nextIndex    下一张幻灯片的索引
     */
    beforeChange: _propTypes2['default'].func,
    style: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-',
    animation: true,
    arrowSize: 'medium',
    arrowPos: 'inline',
    vertical: false,
    dots: true,
    dotsDirection: 'horizontal',
    arrows: true,
    arrowDirection: 'horizontal',
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    adaptiveHeight: false,
    centerMode: false,
    centerPadding: '50px',
    cssEase: 'ease',
    draggable: true,
    easing: 'linear',
    edgeFriction: 0.35,
    fade: false,
    focusOnSelect: false,
    initialSlide: 0,
    lazyLoad: false,
    pauseOnHover: false,
    responsive: null,
    rtl: false,
    slide: 'div',
    slideDirection: 'horizontal',
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: false,
    touchMove: true,
    touchThreshold: 5,
    useCSS: true,
    variableWidth: false,
    waitForAnimate: true,
    afterChange: null,
    beforeChange: null,
    edgeEvent: null,
    swipeEvent: null,
    nextArrow: null, // // nextArrow, prevArrow are react components
    prevArrow: null,
    style: null
}, _temp);
Slider.displayName = 'Slider';


(0, _utils.mixinTo)(Slider, ResponsiveMixin);

module.exports = Slider;