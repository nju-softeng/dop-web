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

var PrevArrow = (_temp = _class = function (_React$Component) {
    _inherits(PrevArrow, _React$Component);

    function PrevArrow() {
        _classCallCheck(this, PrevArrow);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    PrevArrow.prototype.clickHandler = function clickHandler(options, e) {
        e.preventDefault();
        this.props.clickHandler(options, e);
    };

    PrevArrow.prototype.render = function render() {
        var _prevClasses;

        var _props = this.props,
            prefix = _props.prefix,
            infinite = _props.infinite,
            currentSlide = _props.currentSlide,
            slideCount = _props.slideCount,
            slidesToShow = _props.slidesToShow,
            arrowSize = _props.arrowSize,
            arrowPos = _props.arrowPos,
            arrowDirection = _props.arrowDirection,
            onMouseEnter = _props.onMouseEnter,
            onMouseLeave = _props.onMouseLeave,
            others = _objectWithoutProperties(_props, ['prefix', 'infinite', 'currentSlide', 'slideCount', 'slidesToShow', 'arrowSize', 'arrowPos', 'arrowDirection', 'onMouseEnter', 'onMouseLeave']);

        var sizeArrow = arrowSize;

        /* istanbul ignore if */
        if (arrowSize === 'normal') {
            _nextUtil.log.warning('please using medium instead of normal for props arrowSize');
            sizeArrow = 'medium';
        }

        var prevClasses = (_prevClasses = {}, _defineProperty(_prevClasses, prefix + 'slick-arrow', true), _defineProperty(_prevClasses, prefix + 'slick-prev', true), _defineProperty(_prevClasses, arrowPos, arrowPos), _defineProperty(_prevClasses, sizeArrow, sizeArrow), _defineProperty(_prevClasses, arrowDirection, ['horizontal', 'vertical'].indexOf(arrowDirection) > -1), _prevClasses);

        var prevHandler = this.clickHandler.bind(this, { message: 'previous' });
        var prevMouseEnterHandler = onMouseEnter;
        var prevMouseLeaveHandler = onMouseLeave;

        if (!infinite && (currentSlide === 0 || slideCount <= slidesToShow)) {
            prevClasses.disabled = true;
            prevHandler = null;
            prevMouseEnterHandler = null;
            prevMouseLeaveHandler = null;
        }

        var prevArrowProps = _extends({}, others, {
            key: '0',
            'data-role': 'none',
            className: (0, _classnames2['default'])(prevClasses),
            style: { display: 'block' },
            onClick: prevHandler,
            onMouseEnter: prevMouseEnterHandler,
            onMouseLeave: prevMouseLeaveHandler
        });

        var arrowType = void 0;
        if (arrowDirection === 'horizontal') {
            arrowType = 'arrow-left';
        } else {
            arrowType = 'arrow-up';
        }

        var prevArrow = void 0;

        if (this.props.prevArrow) {
            prevArrow = _react2['default'].cloneElement(this.props.prevArrow, prevArrowProps);
        } else {
            prevArrow = _react2['default'].createElement(
                'div',
                (0, _nextUtil.pickAttrs)(prevArrowProps),
                _react2['default'].createElement(_nextIcon2['default'], { type: arrowType })
            );
        }

        return prevArrow;
    };

    return PrevArrow;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    clickHandler: _propTypes2['default'].func,
    infinite: _propTypes2['default'].bool,
    currentSlide: _propTypes2['default'].number,
    slideCount: _propTypes2['default'].number,
    slidesToShow: _propTypes2['default'].number,
    prevArrow: _propTypes2['default'].element,
    arrowSize: _propTypes2['default'].string,
    arrowPos: _propTypes2['default'].string,
    arrowDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    onMouseEnter: _propTypes2['default'].func,
    onMouseLeave: _propTypes2['default'].func
}, _class.defaultProps = {
    onMouseEnter: noop,
    onMouseLeave: noop
}, _temp);
PrevArrow.displayName = 'PrevArrow';
exports['default'] = PrevArrow;
module.exports = exports['default'];