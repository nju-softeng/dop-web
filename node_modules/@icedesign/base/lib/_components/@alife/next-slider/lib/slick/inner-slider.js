'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextUtil = require('../../../next-util/lib/index.js');

var _nextDom = require('../../../next-dom/lib/index.js');

var _nextDom2 = _interopRequireDefault(_nextDom);

var _eventHandlers = require('./mixins/event-handlers.js');

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _helpers = require('./mixins/helpers.js');

var _helpers2 = _interopRequireDefault(_helpers);

var _utils = require('../utils/utils.js');

var _track = require('./track.js');

var _track2 = _interopRequireDefault(_track);

var _dots = require('./dots.js');

var _dots2 = _interopRequireDefault(_dots);

var _prevArrow = require('./prev-arrow.js');

var _prevArrow2 = _interopRequireDefault(_prevArrow);

var _nextArrow = require('./next-arrow.js');

var _nextArrow2 = _interopRequireDefault(_nextArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

var InnerSlider = (_temp = _class = function (_React$Component) {
    _inherits(InnerSlider, _React$Component);

    function InnerSlider(props, context) {
        _classCallCheck(this, InnerSlider);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {
            animating: false,
            dragging: false,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: _this.props.initialSlide,
            direction: 1,
            listWidth: null,
            listHeight: null,
            slideCount: null,
            slideWidth: null,
            slideHeight: null,
            swipeLeft: null,
            touchObject: {
                startX: 0,
                startY: 0,
                curX: 0,
                curY: 0
            },

            lazyLoadedList: [],

            // added for react
            initialized: false,
            edgeDragged: false,
            swiped: false, // used by swipeEvent. differentites between touch and swipe.
            trackStyle: {},
            trackWidth: 0
        };
        _this.onWindowResized = _this.onWindowResized.bind(_this);
        return _this;
    }

    InnerSlider.prototype.componentWillMount = function componentWillMount() {
        this.setState({
            mounted: true
        });
        var lazyLoadedList = [];
        for (var i = 0; i < _react2['default'].Children.count(this.props.children); i++) {
            if (i >= this.state.currentSlide && i < this.state.currentSlide + this.props.slidesToShow) {
                lazyLoadedList.push(i);
            }
        }

        if (this.props.lazyLoad && this.state.lazyLoadedList.length === 0) {
            this.setState({
                lazyLoadedList: lazyLoadedList
            });
        }
    };

    InnerSlider.prototype.componentDidMount = function componentDidMount() {
        // Hack for autoplay -- Inspect Later
        this.initialize(this.props);
        this.adaptHeight();

        // Fallback for IE8
        this._setArrowPositonForIE8(this.props, _utils.isIE8);

        // 1.x TODO: remove slickGoTo
        if (this.props.slickGoTo) {
            this.slickGoTo(this.props.slickGoTo);
        }

        /* istanbul ignore if  */
        if (!window) {
            // To support server-side rendering
            return;
        }

        _nextDom2['default'].events.on(window, 'resize', this.onWindowResized);
    };

    InnerSlider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (this.props.initialSlide !== nextProps.initialSlide) {
            this.setState({
                currentSlide: nextProps.initialSlide
            });
        }

        if (this.props.slickGoTo !== nextProps.slickGoTo) {
            this.slickGoTo(nextProps.slickGoTo);
        } else if (this.state.currentSlide >= nextProps.children.length) {
            this.update(nextProps);
            this.changeSlide({
                message: 'index',
                index: nextProps.children.length - nextProps.slidesToShow,
                currentSlide: this.state.currentSlide
            });
        } else {
            var resetSlide = _react2['default'].Children.count(this.props.children) !== _react2['default'].Children.count(nextProps.children);
            this.update(nextProps, resetSlide);
        }
    };

    InnerSlider.prototype.componentDidUpdate = function componentDidUpdate() {
        this.adaptHeight();
    };

    InnerSlider.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.animationEndCallback) {
            clearTimeout(this.animationEndCallback);
        }

        _nextDom2['default'].events.off(window, 'resize', this.onWindowResized);

        if (this.state.autoPlayTimer) {
            clearTimeout(this.state.autoPlayTimer);
        }
    };

    InnerSlider.prototype.onWindowResized = function onWindowResized() {
        this.update(this.props, false);

        // Fallback for IE8
        this._setArrowPositonForIE8(_utils.isIE8);

        // animating state should be cleared while resizing, otherwise autoplay stops working
        this.setState({ animating: false });
        clearTimeout(this.animationEndCallback);
        delete this.animationEndCallback;
    };

    InnerSlider.prototype.slickGoTo = function slickGoTo(slide) {
        typeof slide === 'number' && this.changeSlide({
            message: 'index',
            index: slide,
            currentSlide: this.state.currentSlide
        });
    };

    InnerSlider.prototype.onEnterArrow = function onEnterArrow(msg) {
        this.arrowHoverHandler(msg);
    };

    InnerSlider.prototype.onLeaveArrow = function onLeaveArrow() {
        this.arrowHoverHandler();
    };

    InnerSlider.prototype._instanceRefHandler = function _instanceRefHandler(attr, ref) {
        this[attr] = ref;
    };

    InnerSlider.prototype._setArrowPositonForIE8 = function _setArrowPositonForIE8(_ref, isIE8) {
        var slideDirection = _ref.slideDirection;

        /* istanbul ignore if  */
        if (isIE8 && this.pArrow) {
            var listElem = (0, _reactDom.findDOMNode)(this.list);
            var pArrowElem = (0, _reactDom.findDOMNode)(this.pArrow);
            var nArrowElem = (0, _reactDom.findDOMNode)(this.nArrow);
            var listHeight = (0, _utils.getNodeHeight)(listElem);
            var listWidth = (0, _utils.getNodeWidth)(listElem);
            var arrowHeight = (0, _utils.getNodeHeight)(pArrowElem);
            var arrowWidth = (0, _utils.getNodeWidth)(pArrowElem);

            if (slideDirection === 'vertical') {
                // 垂直滑动时
                var arrowHorizontalPosition = (listWidth - arrowWidth) / 2 + 'px';
                pArrowElem.style.top = 0;
                pArrowElem.style.left = arrowHorizontalPosition;
                nArrowElem.style.bottom = 0;
                nArrowElem.style.left = arrowHorizontalPosition;
            } else {
                // 水平滑动时
                var arrowVerticalPosition = (listHeight - arrowHeight) / 2 + 'px';
                pArrowElem.style.top = arrowVerticalPosition;
                nArrowElem.style.top = arrowVerticalPosition;
            }
        }
    };

    InnerSlider.prototype.render = function render() {
        var _props = this.props,
            prefix = _props.prefix,
            animation = _props.animation,
            arrows = _props.arrows,
            arrowSize = _props.arrowSize,
            arrowPos = _props.arrowPos,
            arrowDirection = _props.arrowDirection,
            dots = _props.dots,
            dotsClass = _props.dotsClass,
            fade = _props.fade,
            cssEase = _props.cssEase,
            speed = _props.speed,
            infinite = _props.infinite,
            centerMode = _props.centerMode,
            lazyLoad = _props.lazyLoad,
            dotsDirection = _props.dotsDirection,
            rtl = _props.rtl,
            slidesToShow = _props.slidesToShow,
            slidesToScroll = _props.slidesToScroll,
            variableWidth = _props.variableWidth,
            vertical = _props.vertical,
            focusOnSelect = _props.focusOnSelect,
            children = _props.children,
            others = _objectWithoutProperties(_props, ['prefix', 'animation', 'arrows', 'arrowSize', 'arrowPos', 'arrowDirection', 'dots', 'dotsClass', 'fade', 'cssEase', 'speed', 'infinite', 'centerMode', 'lazyLoad', 'dotsDirection', 'rtl', 'slidesToShow', 'slidesToScroll', 'variableWidth', 'vertical', 'focusOnSelect', 'children']);

        var trackProps = {
            prefix: prefix,
            fade: fade,
            cssEase: cssEase,
            speed: speed,
            infinite: infinite,
            centerMode: centerMode,
            focusOnSelect: focusOnSelect ? this.selectHandler.bind(this) : null,
            currentSlide: this.state.currentSlide,
            lazyLoad: lazyLoad,
            lazyLoadedList: this.state.lazyLoadedList,
            rtl: rtl,
            slideWidth: this.state.slideWidth,
            slideHeight: this.state.slideHeight,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            slideCount: this.state.slideCount,
            trackStyle: this.state.trackStyle,
            variableWidth: variableWidth,
            vertical: vertical,
            clickHandler: this.changeSlide.bind(this)
        };

        var dotsEle = void 0;

        if (dots === true && this.state.slideCount > slidesToShow) {
            var dotProps = {
                prefix: prefix,
                dotsClass: dotsClass,
                slideCount: this.state.slideCount,
                slidesToShow: slidesToShow,
                currentSlide: this.state.currentSlide,
                slidesToScroll: slidesToScroll,
                dotsDirection: dotsDirection,
                clickHandler: this.changeSlide.bind(this)
            };

            dotsEle = _react2['default'].createElement(_dots2['default'], dotProps);
        }

        var prevArrow = void 0,
            nextArrow = void 0;

        var arrowProps = {
            prefix: prefix,
            arrowSize: arrowSize,
            arrowPos: arrowPos,
            arrowDirection: arrowDirection,
            infinite: infinite,
            centerMode: centerMode,
            currentSlide: this.state.currentSlide,
            slideCount: this.state.slideCount,
            slidesToShow: slidesToShow,
            prevArrow: this.props.prevArrow,
            nextArrow: this.props.nextArrow,
            clickHandler: this.changeSlide.bind(this)
        };

        if (arrows) {
            prevArrow = _react2['default'].createElement(_prevArrow2['default'], _extends({}, arrowProps, {
                ref: this._instanceRefHandler.bind(this, 'pArrow'),
                onMouseEnter: animation ? this.onEnterArrow.bind(this, 'prev') : noop,
                onMouseLeave: animation ? this.onLeaveArrow.bind(this, 'prev') : noop
            }));
            nextArrow = _react2['default'].createElement(_nextArrow2['default'], _extends({}, arrowProps, {
                ref: this._instanceRefHandler.bind(this, 'nArrow'),
                onMouseEnter: animation ? this.onEnterArrow.bind(this, 'next') : noop,
                onMouseLeave: animation ? this.onLeaveArrow.bind(this, 'next') : noop
            }));
        }

        var verticalHeightStyle = null;

        if (vertical) {
            verticalHeightStyle = {
                height: this.state.listHeight
            };
        }

        var centerPaddingStyle = void 0;

        if (centerMode) {
            centerPaddingStyle = vertical ? { padding: this.props.centerPadding + ' 0px' } : { padding: '0px ' + this.props.centerPadding };
        }

        var listStyle = _extends({}, verticalHeightStyle, centerPaddingStyle);

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: prefix + 'slick-inner ' + prefix + 'slick-initialized', onMouseEnter: this.onInnerSliderEnter.bind(this), onMouseLeave: this.onInnerSliderLeave.bind(this) }),
            _react2['default'].createElement(
                'div',
                {
                    ref: this._instanceRefHandler.bind(this, 'list'),
                    className: prefix + 'slick-list',
                    style: listStyle,
                    onMouseDown: this.swipeStart.bind(this),
                    onMouseMove: this.state.dragging ? this.swipeMove.bind(this) : null,
                    onMouseUp: this.swipeEnd.bind(this),
                    onMouseLeave: this.state.dragging ? this.swipeEnd.bind(this) : null,
                    onTouchStart: this.swipeStart.bind(this),
                    onTouchMove: this.state.dragging ? this.swipeMove.bind(this) : null,
                    onTouchEnd: this.swipeEnd.bind(this),
                    onTouchCancel: this.state.dragging ? this.swipeEnd.bind(this) : null },
                _react2['default'].createElement(
                    _track2['default'],
                    _extends({ ref: this._instanceRefHandler.bind(this, 'track') }, trackProps),
                    children
                )
            ),
            prevArrow,
            nextArrow,
            dotsEle
        );
    };

    return InnerSlider;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    animation: _propTypes2['default'].bool,
    arrows: _propTypes2['default'].bool,
    arrowSize: _propTypes2['default'].oneOf(['medium', 'large']),
    arrowPos: _propTypes2['default'].oneOf(['inline', 'outer']),
    arrowDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    centerPadding: _propTypes2['default'].any,
    children: _propTypes2['default'].any,
    centerMode: _propTypes2['default'].bool,
    dots: _propTypes2['default'].bool,
    dotsDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    dotsClass: _propTypes2['default'].string,
    fade: _propTypes2['default'].bool,
    focusOnSelect: _propTypes2['default'].bool,
    cssEase: _propTypes2['default'].string,
    speed: _propTypes2['default'].number,
    infinite: _propTypes2['default'].bool,
    initialSlide: _propTypes2['default'].number,
    rtl: _propTypes2['default'].bool,
    slidesToShow: _propTypes2['default'].number,
    lazyLoad: _propTypes2['default'].bool,
    slickGoTo: _propTypes2['default'].number,
    slidesToScroll: _propTypes2['default'].number,
    variableWidth: _propTypes2['default'].bool,
    vertical: _propTypes2['default'].bool,
    prevArrow: _propTypes2['default'].element,
    nextArrow: _propTypes2['default'].element
}, _class.defaultProps = {
    prefix: 'next-',
    arrowDirection: 'horizontal'
}, _temp);
InnerSlider.displayName = 'InnerSlider';


(0, _utils.mixinTo)(InnerSlider, _helpers2['default']);
(0, _utils.mixinTo)(InnerSlider, _eventHandlers2['default']);

exports['default'] = InnerSlider;
module.exports = exports['default'];