'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var getDotCount = function getDotCount(spec) {
    return Math.ceil(spec.slideCount / spec.slidesToScroll);
};

var Dots = (_temp = _class = function (_React$Component) {
    _inherits(Dots, _React$Component);

    function Dots() {
        _classCallCheck(this, Dots);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Dots.prototype.clickHandler = function clickHandler(options, e) {
        // In Autoplay the focus stays on clicked button even after transition
        // to next slide. That only goes away by click somewhere outside
        e.preventDefault();
        this.props.clickHandler(options);
    };

    Dots.prototype.render = function render() {
        var _classnames,
            _this2 = this;

        var _props = this.props,
            prefix = _props.prefix,
            slideCount = _props.slideCount,
            slidesToScroll = _props.slidesToScroll,
            currentSlide = _props.currentSlide,
            dotsClass = _props.dotsClass,
            dotsDirection = _props.dotsDirection;


        var dotsClasses = (0, _classnames4['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'slick-dots', true), _defineProperty(_classnames, dotsDirection, dotsDirection === 'vertical' || dotsDirection === 'horizontal'), _classnames), dotsClass);

        var dotCount = getDotCount({
            slideCount: slideCount,
            slidesToScroll: slidesToScroll
        });

        // Apply join & split to Array to pre-fill it for IE8
        //
        // Credit: http://stackoverflow.com/a/13735425/1849458
        /*eslint prefer-spread:0*/
        var dots = Array.apply(null, Array(dotCount + 1).join('0').split('')).map(function (x, i) {
            var _classnames2;

            var leftBound = i * _this2.props.slidesToScroll;
            var rightBound = i * _this2.props.slidesToScroll + (_this2.props.slidesToScroll - 1);
            var className = (0, _classnames4['default'])((_classnames2 = {}, _defineProperty(_classnames2, prefix + 'slick-dots-item', true), _defineProperty(_classnames2, 'active', _this2.props.currentSlide >= leftBound && _this2.props.currentSlide <= rightBound), _classnames2));

            var dotOptions = {
                message: 'dots',
                index: i,
                slidesToScroll: slidesToScroll,
                currentSlide: currentSlide
            };

            return _react2['default'].createElement(
                'li',
                { key: i, className: className },
                _react2['default'].createElement('button', { onClick: _this2.clickHandler.bind(_this2, dotOptions) })
            );
        });

        return _react2['default'].createElement(
            'ul',
            { className: dotsClasses },
            dots
        );
    };

    return Dots;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    currentSlide: _propTypes2['default'].number,
    clickHandler: _propTypes2['default'].func,
    dotsClass: _propTypes2['default'].string,
    slideCount: _propTypes2['default'].number,
    slidesToScroll: _propTypes2['default'].number,
    dotsDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical'])
}, _temp);
Dots.displayName = 'Dots';
exports['default'] = Dots;
module.exports = exports['default'];