'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSlideClasses = function getSlideClasses(spec) {
    var _classnames;

    var prefix = spec.prefix;
    var slickActive = void 0,
        slickCenter = void 0;
    var centerOffset = void 0,
        index = void 0;

    if (spec.rtl) {
        index = spec.slideCount - 1 - spec.index;
    } else {
        index = spec.index;
    }

    var slickCloned = index < 0 || index >= spec.slideCount;
    if (spec.centerMode) {
        centerOffset = Math.floor(spec.slidesToShow / 2);
        slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;
        if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
            slickActive = true;
        }
    } else {
        slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
    }

    return (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'slick-slide', true), _defineProperty(_classnames, prefix + 'slick-active', slickActive), _defineProperty(_classnames, prefix + 'slick-center', slickCenter), _defineProperty(_classnames, prefix + 'slick-cloned', slickCloned), _classnames));
};

var getSlideStyle = function getSlideStyle(spec) {
    var style = {};

    if (spec.variableWidth === undefined || spec.variableWidth === false) {
        style.width = spec.slideWidth;
    }

    if (spec.fade) {
        style.position = 'relative';

        style.opacity = spec.currentSlide === spec.index ? 1 : 0;
        style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
        style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;

        if (spec.vertical) {
            style.top = -spec.index * spec.slideHeight;
        } else {
            style.left = -spec.index * spec.slideWidth;
        }
    }

    return style;
};

var getKey = function getKey(child, fallbackKey) {
    // key could be a zero
    return child.key === null || child.key === undefined ? fallbackKey : child.key;
};

var renderSlides = function renderSlides(spec) {
    var key = void 0;
    var slides = [];
    var preCloneSlides = [];
    var postCloneSlides = [];
    var count = _react2['default'].Children.count(spec.children);
    var child = void 0;

    _react2['default'].Children.forEach(spec.children, function (elem, index) {
        var childOnClickOptions = {
            message: 'children',
            index: index,
            slidesToScroll: spec.slidesToScroll,
            currentSlide: spec.currentSlide
        };

        if (!spec.lazyLoad | (spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0)) {
            child = elem;
        } else {
            child = _react2['default'].createElement('div', null);
        }
        var childStyle = getSlideStyle(_extends({}, spec, { index: index }));
        var slickClasses = getSlideClasses(_extends({ index: index }, spec));
        var cssClasses = void 0;

        if (child.props.className) {
            cssClasses = (0, _classnames3['default'])(slickClasses, child.props.className);
        } else {
            cssClasses = slickClasses;
        }

        var onClick = function onClick(e) {
            child.props && child.props.onClick && child.props.onClick(e);
            if (spec.focusOnSelect) {
                spec.focusOnSelect(childOnClickOptions);
            }
        };

        slides.push(_react2['default'].cloneElement(child, {
            key: 'original' + getKey(child, index),
            'data-index': index,
            className: cssClasses,
            tabIndex: '-1',
            style: _extends({ outline: 'none' }, child.props.style, childStyle),
            onClick: onClick
        }));

        // variableWidth doesn't wrap properly.
        if (spec.infinite && spec.fade === false) {
            var infiniteCount = spec.variableWidth ? spec.slidesToShow + 1 : spec.slidesToShow;

            if (index >= count - infiniteCount) {
                key = -(count - index);
                preCloneSlides.push(_react2['default'].cloneElement(child, {
                    key: 'precloned' + getKey(child, key),
                    'data-index': key,
                    className: cssClasses,
                    style: _extends({}, child.props.style, childStyle)
                }));
            }

            if (index < infiniteCount) {
                key = count + index;
                postCloneSlides.push(_react2['default'].cloneElement(child, {
                    key: 'postcloned' + getKey(child, key),
                    'data-index': key,
                    className: cssClasses,
                    style: _extends({}, child.props.style, childStyle)
                }));
            }
        }
    });

    if (spec.rtl) {
        return preCloneSlides.concat(slides, postCloneSlides).reverse();
    } else {
        return preCloneSlides.concat(slides, postCloneSlides);
    }
};

// PureComponent 不支持 IE8
var Track = (_temp = _class = function (_Component) {
    _inherits(Track, _Component);

    function Track() {
        _classCallCheck(this, Track);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Track.prototype.render = function render() {
        var slides = renderSlides(this.props);
        return _react2['default'].createElement(
            'div',
            { className: this.props.prefix + 'slick-track', style: this.props.trackStyle },
            slides
        );
    };

    return Track;
}(_react.Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    trackStyle: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-'
}, _temp);
Track.displayName = 'Track';
exports['default'] = Track;
module.exports = exports['default'];