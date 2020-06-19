'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _keyCode = require('./key-code.js');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _nav = require('./nav.js');

var _nav2 = _interopRequireDefault(_nav);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function noop() {}

var Tabs = (_temp = _class = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs(props, context) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {
            activeKey: _this._getDefaultActiveKey(props),
            contentHeight: 0
        };
        return _this;
    }

    Tabs.prototype.componentDidMount = function componentDidMount() {
        this._setContentHeight(this.props);
    };

    Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('activeKey' in nextProps) {
            var newActiveKey = nextProps.activeKey;
            /* eslint-disable eqeqeq */
            if (newActiveKey != undefined) {
                this.setState({
                    activeKey: newActiveKey
                });
            }
        }
        if ('tabPosition' in nextProps && nextProps.tabPosition !== this.props.tabPosition) {
            this._setContentHeight(nextProps);
        }
    };

    Tabs.prototype.componentDidUpdate = function componentDidUpdate() {
        this._setContentHeight(this.props);
    };

    Tabs.prototype.onNavKeyDown = function onNavKeyDown(e) {
        var eventKeyCode = e.keyCode;
        if (eventKeyCode >= _keyCode2['default'].LEFT && eventKeyCode <= _keyCode2['default'].DOWN) {
            e.preventDefault();
        }
        if (eventKeyCode === _keyCode2['default'].RIGHT || eventKeyCode === _keyCode2['default'].DOWN) {
            var nextKey = this._getNextActiveKey(true);
            this.handleUserBehavior(this.props.triggerType, nextKey);
        } else if (eventKeyCode === _keyCode2['default'].LEFT || eventKeyCode === _keyCode2['default'].UP) {
            var previousKey = this._getNextActiveKey(false);
            this.handleUserBehavior(this.props.triggerType, previousKey);
        }
    };

    Tabs.prototype.handleUserBehavior = function handleUserBehavior(eventType, key) {
        var triggerType = this.props.triggerType;

        if (triggerType === eventType) {
            this._setActiveKey(key);
            if (this.state.activeKey !== key) {
                this.props.onChange(key);
            }
        }
    };

    // 设置 content 的最小高度


    Tabs.prototype._setContentHeight = function _setContentHeight(_ref) {
        var tabPosition = _ref.tabPosition,
            contentStyle = _ref.contentStyle;

        var contentHeight = (0, _utils.getHeight)(this.tabContent);
        if ((tabPosition === 'left' || tabPosition === 'right') && !contentStyle.minHeight) {
            var navHeight = (0, _utils.getHeight)(_reactDom2['default'].findDOMNode(this.tabNav));
            this.tabContent.style.minHeight = navHeight + 'px';
        }
        if (this.state.contentHeight !== contentHeight) {
            this.setState({ contentHeight: contentHeight });
        }
    };

    Tabs.prototype._setActiveKey = function _setActiveKey(key) {
        var currentActiveKey = this.state.activeKey;
        if (currentActiveKey === key || 'activeKey' in this.props) {
            return;
        }
        if (!currentActiveKey) {
            this.setState({
                activeKey: key
            });
        } else {
            var _getIndexPair2 = this._getIndexPair(this.props, currentActiveKey, key),
                currentIndex = _getIndexPair2.currentIndex,
                nextIndex = _getIndexPair2.nextIndex;

            var tabMovingDirection = currentIndex > nextIndex ? 'backward' : 'forward';
            this.setState({
                activeKey: key,
                tabMovingDirection: tabMovingDirection
            });
        }
    };

    // 获取索引对 currentIndex 和 nextIndex


    Tabs.prototype._getIndexPair = function _getIndexPair(props, currentActiveKey, activeKey) {
        var keys = [];
        _react2['default'].Children.forEach(props.children, function (child) {
            keys.push(child.key);
        });
        var currentIndex = keys.indexOf(currentActiveKey);
        var nextIndex = keys.indexOf(activeKey);
        return {
            currentIndex: currentIndex, nextIndex: nextIndex
        };
    };

    Tabs.prototype._getDefaultActiveKey = function _getDefaultActiveKey(props) {
        var activeKey = void 0;
        if ('activeKey' in props) {
            activeKey = props.activeKey;
        } else if ('defaultActiveKey' in props) {
            activeKey = props.defaultActiveKey;
        } else {
            _react2['default'].Children.forEach(props.children, function (child) {
                if (activeKey == undefined && !child.props.disabled) {
                    activeKey = child.key;
                }
            });
        }
        return activeKey;
    };

    // 获取 content 下的 tabpane 列表


    Tabs.prototype._getTabPanes = function _getTabPanes() {
        var activeKey = this.state.activeKey;
        var _props = this.props,
            children = _props.children,
            prefix = _props.prefix,
            lazyLoad = _props.lazyLoad;

        var newChildren = [];
        _react2['default'].Children.forEach(children, function (child) {
            // react 会将整型的 key 转为字符串，而 preact 不会，这里使用 == 判断
            var active = activeKey == child.key;
            newChildren.push(_react2['default'].cloneElement(child, {
                active: active,
                prefix: prefix,
                lazyLoad: lazyLoad,

                // reset tab-content events
                onClick: noop,
                onMouseEnter: noop,
                onMouseLeave: noop
            }));
        });
        return newChildren;
    };

    Tabs.prototype._getNextActiveKey = function _getNextActiveKey(isNext) {
        var _this2 = this;

        var children = [];
        _react2['default'].Children.forEach(this.props.children, function (child) {
            if (!child.props.disabled) {
                if (isNext) {
                    children.push(child);
                } else {
                    children.unshift(child);
                }
            }
        });

        var length = children.length;
        var ret = length && children[0].key;
        children.forEach(function (child, i) {
            if (child.key === _this2.state.activeKey) {
                if (i === length - 1) {
                    ret = children[0].key;
                } else {
                    ret = children[i + 1].key;
                }
            }
        });
        return ret;
    };

    Tabs.prototype._contentRefHandler = function _contentRefHandler(ref) {
        this.tabContent = ref;
    };

    Tabs.prototype._navRefHandler = function _navRefHandler(ref) {
        this.tabNav = ref;
    };

    Tabs.prototype.render = function render() {
        var _classnames;

        var _props2 = this.props,
            prefix = _props2.prefix,
            type = _props2.type,
            size = _props2.size,
            animation = _props2.animation,
            tabPosition = _props2.tabPosition,
            resDirection = _props2.resDirection,
            tabBarExtraContent = _props2.tabBarExtraContent,
            navStyle = _props2.navStyle,
            contentStyle = _props2.contentStyle,
            destroyInactiveTabPane = _props2.destroyInactiveTabPane,
            lazyLoad = _props2.lazyLoad,
            style = _props2.style,
            className = _props2.className,
            children = _props2.children;


        var state = this.state;
        var tabPrefix = prefix + 'tabs';
        var shape = type === 'bar' ? 'strip' : type; // bar 类型 和组件内的 bar 组件有冲突, 这里使用 strip 替代 bar

        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, tabPrefix, true), _defineProperty(_classnames, tabPrefix + '-' + shape, shape), _defineProperty(_classnames, tabPrefix + '-' + size, size), _defineProperty(_classnames, tabPrefix + '-vertical', ['left', 'right'].indexOf(tabPosition) >= 0), _defineProperty(_classnames, tabPrefix + '-' + tabPosition, true), _defineProperty(_classnames, className, !!className), _classnames));

        var tabPanes = this._getTabPanes();

        if (destroyInactiveTabPane) {
            tabPanes = tabPanes.filter(function (panel) {
                return panel.props.active;
            });
        }

        var navProps = {
            prefix: tabPrefix,
            activeKey: state.activeKey,
            type: type,
            size: size,
            animation: animation,
            tabBarExtraContent: tabBarExtraContent,
            tabPosition: tabPosition,
            resDirection: resDirection,
            lazyLoad: lazyLoad,
            style: navStyle,
            panels: children,
            contentHeight: state.contentHeight,
            onKeyDown: this.onNavKeyDown.bind(this),
            onTabEvent: this.handleUserBehavior.bind(this)
        };

        var contents = [_react2['default'].createElement(_nav2['default'], _extends({}, navProps, { key: 'tab-nav', ref: this._navRefHandler.bind(this) })), _react2['default'].createElement(
            'div',
            { key: 'tab-content', className: tabPrefix + '-content', style: contentStyle, ref: this._contentRefHandler.bind(this) },
            tabPanes
        )];

        if (tabPosition === 'bottom') {
            contents.reverse();
        }

        return _react2['default'].createElement(
            'div',
            { className: cls, style: style },
            contents
        );
    };

    return Tabs;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    activeKey: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    defaultActiveKey: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    type: _propTypes2['default'].oneOf(['bar', 'wrapped', 'wrapped-detached', 'text', 'capsule']),
    animation: _propTypes2['default'].bool,
    resDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    tabPosition: _propTypes2['default'].oneOf(['top', 'bottom', 'left', 'right']),
    size: _propTypes2['default'].oneOf(['small', 'medium']),
    closeable: _propTypes2['default'].bool,
    triggerType: _propTypes2['default'].oneOf(['hover', 'click']),
    lazyLoad: _propTypes2['default'].bool,
    /**
     * 销毁非活跃的 TabPane
     * TODO: 1.x 重构去掉或重命名
     */
    destroyInactiveTabPane: _propTypes2['default'].bool,
    navStyle: _propTypes2['default'].object,
    contentStyle: _propTypes2['default'].object,
    tabBarExtraContent: _propTypes2['default'].node,
    onChange: _propTypes2['default'].func,
    onClose: _propTypes2['default'].func,
    style: _propTypes2['default'].object,
    className: _propTypes2['default'].string,
    children: _propTypes2['default'].any
}, _temp);
Tabs.displayName = 'Tabs';
exports['default'] = Tabs;
module.exports = exports['default'];