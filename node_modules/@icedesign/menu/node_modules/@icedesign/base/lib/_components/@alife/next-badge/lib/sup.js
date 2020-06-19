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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextAnimate = require('../../next-animate/lib/index.js');

var _nextAnimate2 = _interopRequireDefault(_nextAnimate);

var _nextUtil = require('../../next-util/lib/index.js');

var _nextDom = require('../../next-dom/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Sup = (_temp = _class = function (_Component) {
    _inherits(Sup, _Component);

    function Sup(props, context) {
        _classCallCheck(this, Sup);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.lastCount = 0;
        return _this;
    }

    Sup.prototype.componentDidMount = function componentDidMount() {
        this.computeStyle(true);
    };

    Sup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('count' in nextProps) {
            if (this.props.count === nextProps.count) {
                return;
            }
            this.lastCount = this.props.count;
        }
    };

    Sup.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        var _this2 = this;

        if (prevProps.count !== this.props.count) {
            this.computeStyle(false);

            setTimeout(function () {
                _this2.computeStyle(true, true);
            }, 300);
        }
    };

    Sup.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    Sup.prototype.computeStyle = function computeStyle(removeTransition, revert) {
        var _this3 = this;

        var prefix = this.getPrefix();
        var _props = this.props,
            count = _props.count,
            overflowCount = _props.overflowCount;

        var sup = this.refs.sup;
        if (sup && _nextDom.classList.hasClass(sup, prefix + 'badge-count')) {
            var scrollNums = sup.querySelectorAll('.' + prefix + 'badge-scroll-number-only');
            if (scrollNums.length) {
                var height = window.getComputedStyle(sup).height;
                scrollNums = [].slice.call(scrollNums, 0).reverse();
                this.getDigitArray(count).forEach(function (digit, i) {
                    var position = _this3.getPositionByDigit(digit, i, revert);
                    var transformTo = -position * parseFloat(height);
                    removeTransition = removeTransition || typeof _this3.getDigitArray(_this3.lastCount)[i] === 'undefined' || _this3.lastCount > overflowCount || _this3.lastCount <= 0;
                    var scrollStyle = _nextUtil.support.animation ? {
                        transition: removeTransition ? 'none' : 'transform .3s cubic-bezier(.645, .045, .355, 1), -webkit-transform .3s cubic-bezier(.645, .045, .355, 1)',
                        WebkitTransform: 'translateY(' + transformTo + 'px)',
                        transform: 'translateY(' + transformTo + 'px)',
                        height: height,
                        lineHeight: height
                    } : {
                        top: transformTo + 'px',
                        height: height,
                        lineHeight: height
                    };

                    Object.keys(scrollStyle).forEach(function (key) {
                        scrollNums[i].style[key] = scrollStyle[key];
                    });
                });
            }
        }
    };

    Sup.prototype.getDigitArray = function getDigitArray(num) {
        return num.toString().split('').reverse().map(function (i) {
            return parseInt(i, 10);
        });
    };

    Sup.prototype.getPositionByDigit = function getPositionByDigit(digit, i, revert) {
        if (revert) {
            return 10 + digit;
        }
        var lastDigit = this.getDigitArray(this.lastCount)[i] || 0;

        if (this.props.count > this.lastCount) {
            if (digit >= lastDigit) {
                return 10 + digit;
            }
            return 20 + digit;
        }
        if (digit <= lastDigit) {
            return 10 + digit;
        }
        return digit;
    };

    Sup.prototype.renderDigit = function renderDigit(digit, i) {
        var prefix = this.getPrefix();
        var children = [];
        for (var _i = 0; _i < 30; _i++) {
            children.push(_react2['default'].createElement(
                'span',
                { key: _i },
                _i % 10
            ));
        }

        return _react2['default'].createElement(
            'span',
            { className: prefix + 'badge-scroll-number-only', key: i },
            children
        );
    };

    Sup.prototype.renderNumber = function renderNumber() {
        var _this4 = this;

        return this.getDigitArray(this.props.count).map(function (digit, i) {
            return _this4.renderDigit(digit, i);
        }).reverse();
    };

    Sup.prototype.render = function render() {
        var _cx;

        var prefix = this.getPrefix();
        /* eslint-disable no-unused-vars */
        var _props2 = this.props,
            propsPrefix = _props2.prefix,
            count = _props2.count,
            overflowCount = _props2.overflowCount,
            dot = _props2.dot,
            alignLeft = _props2.alignLeft,
            style = _props2.style;
        /* eslint-enable */

        var classes = (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, prefix + 'badge-scroll-number', true), _defineProperty(_cx, prefix + 'badge-count', !!count), _defineProperty(_cx, prefix + 'badge-dot', dot), _defineProperty(_cx, prefix + 'badge-dot-left', alignLeft), _cx));

        var show = false;
        var children = null;

        if (dot) {
            show = true;
        } else if (count) {
            var realCount = parseInt(count, 10);
            if (!isNaN(realCount) && realCount > 0) {
                show = true;

                if (overflowCount) {
                    var realOverflowCount = parseInt(overflowCount, 10);
                    if (!isNaN(realOverflowCount) && realOverflowCount > 0) {
                        realCount = realCount > realOverflowCount ? realOverflowCount + '+' : realCount;
                    }
                }

                if (isNaN(realCount)) {
                    children = realCount;
                } else {
                    children = this.renderNumber();
                }
            }
        }

        var animation = {
            appear: 'fadeIn',
            enter: 'fadeIn',
            leave: 'fadeOut'
        };

        var wrapper = _nextUtil.support.animation ? _react2['default'].createElement(_nextAnimate2['default'], { component: '', animation: animation }) : _react2['default'].createElement('span', null);
        var element = show ? _react2['default'].createElement(
            'sup',
            { ref: 'sup', className: classes, style: style },
            children
        ) : null;

        return _react2['default'].cloneElement(wrapper, {}, element);
    };

    return Sup;
}(_react.Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    prefix: _propTypes2['default'].string,
    count: _propTypes2['default'].number,
    overflowCount: _propTypes2['default'].number,
    dot: _propTypes2['default'].bool,
    alignLeft: _propTypes2['default'].bool,
    style: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-',
    count: 0,
    overflowCount: 99,
    dot: false,
    alignLeft: false
}, _temp);
Sup.displayName = 'Sup';
exports['default'] = Sup;
module.exports = exports['default'];