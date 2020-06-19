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

var _nextUtil = require('../../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

var NextArrow = (_temp = _class = function (_React$Component) {
    _inherits(NextArrow, _React$Component);

    function NextArrow() {
        _classCallCheck(this, NextArrow);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    NextArrow.prototype.clickHandler = function clickHandler(options, e) {
        e.preventDefault();
        this.props.clickHandler(options, e);
    };

    NextArrow.prototype.render = function render() {
        var _nextClasses;

        var _props = this.props,
            prefix = _props.prefix,
            infinite = _props.infinite,
            centerMode = _props.centerMode,
            currentSlide = _props.currentSlide,
            slideCount = _props.slideCount,
            slidesToShow = _props.slidesToShow,
            arrowSize = _props.arrowSize,
            arrowPos = _props.arrowPos,
            arrowDirection = _props.arrowDirection,
            onMouseEnter = _props.onMouseEnter,
            onMouseLeave = _props.onMouseLeave,
            others = _objectWithoutProperties(_props, ['prefix', 'infinite', 'centerMode', 'currentSlide', 'slideCount', 'slidesToShow', 'arrowSize', 'arrowPos', 'arrowDirection', 'onMouseEnter', 'onMouseLeave']);

        var sizeArrow = arrowSize;

        /* istanbul ignore if */
        if (arrowSize === 'normal') {
            _nextUtil.log.warning('please using medium instead of normal for props arrowSize');
            sizeArrow = 'medium';
        }

        var nextClasses = (_nextClasses = {}, _defineProperty(_nextClasses, prefix + 'slick-arrow', true), _defineProperty(_nextClasses, prefix + 'slick-next', true), _defineProperty(_nextClasses, arrowPos, arrowPos), _defineProperty(_nextClasses, sizeArrow, sizeArrow), _defineProperty(_nextClasses, arrowDirection, ['horizontal', 'vertical'].indexOf(arrowDirection) > -1), _nextClasses);

        var nextHandler = this.clickHandler.bind(this, { message: 'next' });
        var nextMouseEnterHandler = onMouseEnter;
        var nextMouseLeaveHandler = onMouseLeave;

        if (!infinite) {
            if (centerMode && currentSlide >= slideCount - 1) {
                nextClasses.disabled = true;
                nextHandler = null;
                nextMouseEnterHandler = null;
                nextMouseLeaveHandler = null;
            } else if (currentSlide >= slideCount - slidesToShow) {
                nextClasses.disabled = true;
                nextHandler = null;
                nextMouseEnterHandler = null;
                nextMouseLeaveHandler = null;
            }

            if (slideCount <= slidesToShow) {
                nextClasses.disabled = true;
                nextHandler = null;
                nextMouseEnterHandler = null;
                nextMouseLeaveHandler = null;
            }
        }

        var nextArrowProps = _extends({}, others, {
            key: '1',
            'data-role': 'none',
            className: (0, _classnames2['default'])(nextClasses),
            style: { display: 'block' },
            onClick: nextHandler,
            onMouseEnter: nextMouseEnterHandler,
            onMouseLeave: nextMouseLeaveHandler
        });

        var arrowType = void 0;
        if (arrowDirection === 'horizontal') {
            arrowType = 'arrow-right';
        } else {
            arrowType = 'arrow-down';
        }

        var nextArrow = void 0;

        if (this.props.nextArrow) {
            nextArrow = _react2['default'].cloneElement(this.props.nextArrow, nextArrowProps);
        } else {
            nextArrow = _react2['default'].createElement(
                'div',
                (0, _nextUtil.pickAttrs)(nextArrowProps),
                _react2['default'].createElement(_nextIcon2['default'], { type: arrowType })
            );
        }

        return nextArrow;
    };

    return NextArrow;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    centerMode: _propTypes2['default'].bool,
    currentSlide: _propTypes2['default'].number,
    infinite: _propTypes2['default'].bool,
    clickHandler: _propTypes2['default'].func,
    slideCount: _propTypes2['default'].number,
    slidesToShow: _propTypes2['default'].number,
    nextArrow: _propTypes2['default'].element,
    arrowSize: _propTypes2['default'].string,
    arrowPos: _propTypes2['default'].string,
    arrowDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    onMouseEnter: _propTypes2['default'].func,
    onMouseLeave: _propTypes2['default'].func
}, _class.defaultProps = {
    onMouseEnter: noop,
    onMouseLeave: noop
}, _temp);
NextArrow.displayName = 'NextArrow';
exports['default'] = NextArrow;
module.exports = exports['default'];