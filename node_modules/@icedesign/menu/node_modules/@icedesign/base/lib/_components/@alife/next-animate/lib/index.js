'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _class2, _temp2, _class3, _temp3;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _nextUtil = require('../../next-util/lib/index.js');

var _nextDom = require('../../next-dom/lib/index.js');

var _names = require('./names.js');

var _names2 = _interopRequireDefault(_names);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};
var on = _nextDom.events.on;
var addClass = _nextDom.classList.addClass;
var removeClass = _nextDom.classList.removeClass;

var AnimateChild = (_temp = _class = function (_React$Component) {
    _inherits(AnimateChild, _React$Component);

    function AnimateChild() {
        _classCallCheck(this, AnimateChild);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    AnimateChild.prototype.componentDidMount = function componentDidMount() {
        this.node = (0, _reactDom.findDOMNode)(this);
        this.onAnimateEnd = this.onAnimateEnd.bind(this);
        if (this.props.useTransition && _nextUtil.support.transition) {
            this._animation = on(this.node, _nextUtil.support.transition.end, this.onAnimateEnd);
        } else if (_nextUtil.support.animation) {
            this._animation = on(this.node, _nextUtil.support.animation.end, this.onAnimateEnd);
        }
    };

    AnimateChild.prototype.fakeAnimationEvent = function fakeAnimationEvent() {
        if (!_nextUtil.support.animation || this.props.useTransition && !_nextUtil.support.transition) {
            this.timeoutEnd = setTimeout(this.onAnimateEnd, 10);
        }
    };

    AnimateChild.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this._animation && this._animation.off) {
            this._animation.off();
        }
        clearTimeout(this.timeoutEnd);
    };

    AnimateChild.prototype.componentWillAppear = function componentWillAppear(done) {
        if (this.props.animationAppear) {
            this.playAction('appear', done);
        } else {
            done();
        }
        this.props.beforeAppear();
        this.fakeAnimationEvent();
    };

    AnimateChild.prototype.componentDidAppear = function componentDidAppear() {
        this.props.afterAppear();
    };

    AnimateChild.prototype.componentWillEnter = function componentWillEnter(done) {
        this.playAction('enter', done);
        this.props.beforeEnter();
        this.fakeAnimationEvent();
    };

    AnimateChild.prototype.componentDidEnter = function componentDidEnter() {
        this.props.afterEnter();
    };

    AnimateChild.prototype.componentWillLeave = function componentWillLeave(done) {
        this.playAction('leave', done);
        this.props.beforeLeave();
        this.fakeAnimationEvent();
    };

    AnimateChild.prototype.componentDidLeave = function componentDidLeave() {
        this.props.afterLeave();
    };

    AnimateChild.prototype.onAnimateEnd = function onAnimateEnd(e) {
        if (e && e.target !== this.node) {
            return;
        }
        clearTimeout(this.timeout);
        if (this._done) {
            this._done();
        }
        e && e.stopPropagation();
    };

    AnimateChild.prototype.playAction = function playAction(type, done) {
        var node = (0, _reactDom.findDOMNode)(this),
            animation = this.props.animation,
            res = animation[type];

        if (typeof res === 'string') {
            Object.keys(animation).forEach(function (key) {
                if (typeof animation[key] === 'string') {
                    removeClass(node, animation[key]);
                    removeClass(node, animation[key] + '-active');
                }
            });
            addClass(node, res);
            this.addActiveClass(node, res + '-active');
            this._done = done;
        } else if (typeof res === 'function') {
            res(node, done);
        } else {
            done();
        }
        this.node = node;
    };

    AnimateChild.prototype.addActiveClass = function addActiveClass(node, className) {
        this.timeout = setTimeout(function () {
            addClass(node, className);
        }, 20);
    };

    AnimateChild.prototype.render = function render() {
        return this.props.children;
    };

    return AnimateChild;
}(_react2['default'].Component), _class.propTypes = {
    beforeAppear: _propTypes2['default'].func,
    afterAppear: _propTypes2['default'].func,
    beforeEnter: _propTypes2['default'].func,
    afterEnter: _propTypes2['default'].func,
    beforeLeave: _propTypes2['default'].func,
    afterLeave: _propTypes2['default'].func,
    children: _propTypes2['default'].any,
    useTransition: _propTypes2['default'].bool,
    animationAppear: _propTypes2['default'].bool
}, _class.defaultProps = {
    animationAppear: true
}, _temp);

/* eslint-disable react/no-multi-comp*/

AnimateChild.displayName = 'AnimateChild';
var SingeChildWrapper = (_temp2 = _class2 = function (_React$Component2) {
    _inherits(SingeChildWrapper, _React$Component2);

    function SingeChildWrapper() {
        _classCallCheck(this, SingeChildWrapper);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    SingeChildWrapper.prototype.render = function render() {
        var children = _react2['default'].Children.toArray(this.props.children);
        return children[0] || null;
    };

    return SingeChildWrapper;
}(_react2['default'].Component), _class2.propTypes = {
    children: _propTypes2['default'].any
}, _temp2);

/**
 * Animate
 */

SingeChildWrapper.displayName = 'SingeChildWrapper';
var Animate = (_temp3 = _class3 = function (_React$Component3) {
    _inherits(Animate, _React$Component3);

    function Animate() {
        _classCallCheck(this, Animate);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    Animate.prototype.render = function render() {
        var _props = this.props,
            animation = _props.animation,
            children = _props.children,
            component = _props.component,
            animationAppear = _props.animationAppear,
            afterAppear = _props.afterAppear,
            afterEnter = _props.afterEnter,
            afterLeave = _props.afterLeave,
            singleMode = _props.singleMode,
            useTransition = _props.useTransition,
            beforeAppear = _props.beforeAppear,
            beforeEnter = _props.beforeEnter,
            beforeLeave = _props.beforeLeave,
            others = _objectWithoutProperties(_props, ['animation', 'children', 'component', 'animationAppear', 'afterAppear', 'afterEnter', 'afterLeave', 'singleMode', 'useTransition', 'beforeAppear', 'beforeEnter', 'beforeLeave']),
            attrs = {
            afterAppear: afterAppear,
            afterEnter: afterEnter,
            afterLeave: afterLeave,
            beforeAppear: beforeAppear,
            beforeEnter: beforeEnter,
            beforeLeave: beforeLeave,
            animationAppear: animationAppear,
            animation: this.normalizeAnimation(animation)
        },
            length = _react2['default'].Children.count(children),
            animateChildren = _react2['default'].Children.map(children, function (child, index) {
            var key = child.key;
            if (!key) {
                key = 'animate-' + index;
            }
            return _react2['default'].createElement(
                AnimateChild,
                _extends({}, attrs, { key: key, useTransition: useTransition }),
                child
            );
        });

        if (!component && length <= 1 && singleMode) {
            component = SingeChildWrapper;
        }

        return _react2['default'].createElement(
            _TransitionGroup2['default'],
            _extends({ component: component }, others),
            animateChildren
        );
    };

    Animate.prototype.normalizeAnimation = function normalizeAnimation(animation) {
        if (typeof animation === 'string') {
            return { appear: animation + '-appear', enter: animation + '-enter', leave: animation + '-leave' };
        }
        return animation;
    };

    return Animate;
}(_react2['default'].Component), _class3.propTypes = {
    children: _propTypes2['default'].any,
    /**
    * 配置动画的播放方式, 详见[animation](#animation)
    */
    animation: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
    beforeAppear: _propTypes2['default'].func,
    /**
    * 在初始动画播放完毕触发的事件
    */
    afterAppear: _propTypes2['default'].func,
    beforeEnter: _propTypes2['default'].func,
    /**
    * 在进场动画播放完毕触发的事件
    */
    afterEnter: _propTypes2['default'].func,
    beforeLeave: _propTypes2['default'].func,
    /**
    * 在离开动画播放完毕触发的事件
    */
    afterLeave: _propTypes2['default'].func,
    /**
    * 在针对多个子节点播放动画的时候包裹的标签
    */
    component: _propTypes2['default'].any,
    /**
    * 是否是有单个节点，如果有多个动画的孩子节点，设置该选项为false
    */
    singleMode: _propTypes2['default'].bool,
    useTransition: _propTypes2['default'].bool,
    /**
    * 是否在初始的时候播放动画
    */
    animationAppear: _propTypes2['default'].bool
}, _class3.defaultProps = {
    animation: {
        appear: noop,
        enter: noop,
        leave: noop
    },
    beforeAppear: noop,
    afterAppear: noop,
    beforeEnter: noop,
    afterEnter: noop,
    beforeLeave: noop,
    afterLeave: noop,
    singleMode: true,
    animationAppear: true,
    useTransition: false
}, _temp3);
Animate.displayName = 'Animate';
exports['default'] = Animate;


Animate.names = _names2['default'];
module.exports = exports['default'];