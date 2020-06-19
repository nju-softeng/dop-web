'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nextMenu = require('../../../next-menu/lib/index.js');

var _nextMenu2 = _interopRequireDefault(_nextMenu);

var _navigation = require('./navigation.js');

var _navigation2 = _interopRequireDefault(_navigation);

var _item = require('../item/index.js');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Vertical = (_temp = _class = function (_Navigation) {
    _inherits(Vertical, _Navigation);

    function Vertical(props, context) {
        _classCallCheck(this, Vertical);

        var _this = _possibleConstructorReturn(this, _Navigation.call(this, props, context));

        var prefix = context.prefix;


        prefix = (prefix || props.prefix) + 'navigation';

        _this.childrenShowClassName = prefix + '-children-show';
        _this.onMenuBlur = _this.onMenuBlur.bind(_this);
        _this.state.focusedKey = null;
        return _this;
    }

    Vertical.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var state = {};

        _Navigation.prototype.componentWillReceiveProps.call(this, nextProps);

        if (nextProps.focusedKey) {
            state.focusedKey = nextProps.focusedKey;
        }

        this.setState(state);
    };

    /**
     * 注册失去焦点，收起菜单操作
     * @method componentDidMount
     */


    Vertical.prototype.componentDidMount = function componentDidMount() {
        _Navigation.prototype.componentDidMount.call(this);

        var dispear = this.context.isBlurDispear || this.props.isBlurDispear;

        dispear = this.props.blurHide === undefined ? dispear : this.props.blurHide;

        if (dispear) {
            document.body.addEventListener('click', this.onMenuBlur, false);
        }
    };

    /**
     * 移除失去焦点，收起菜单操作
     * @method componentWillUnMount
     */


    Vertical.prototype.componentWillUnmount = function componentWillUnmount() {
        var dispear = this.context.isBlurDispear || this.props.isBlurDispear;

        if (dispear) {
            document.body.removeEventListener('click', this.onMenuBlur, false);
        }
    };

    /**
     * 在导航外触发click，收起菜单处理函数
     * @method onMenuBlur
     */


    Vertical.prototype.onMenuBlur = function onMenuBlur(e) {
        var dispear = this.context.isBlurDispear || this.props.isBlurDispear,
            refs = this.refs;

        if (dispear && refs.navigation) {
            if (!this.inNavigation(e.target)) {
                if (this.state.focusedKey) {
                    this.setState({
                        focusedKey: null
                    });
                }
            }
        }
    };

    /**
     * 由item子组件mouseLeave触发处理函数;该函数处理focusedKey状态;如果trigger为hover才会处理
     * @method onMenuBlur
     */


    Vertical.prototype.onItemMouseEnter = function onItemMouseEnter(itemid) {
        var trigger = this.context.trigger;


        trigger = trigger || this.props.trigger;

        if (trigger === 'hover') {
            if (itemid === this.state.focusedKey) {
                return this;
            }

            _Navigation.prototype.onItemMouseEnter.apply(this, arguments);

            if (this.props.selectedStyle) {
                this.setState({
                    focusedKey: itemid
                });
            }
        }
    };

    Vertical.prototype.onItemMouseLeave = function onItemMouseLeave() {
        var trigger = this.context.trigger;


        trigger = trigger || this.props.trigger;

        if (trigger === 'hover') {

            _Navigation.prototype.onItemMouseLeave.apply(this, arguments);

            if (this.props.selectedStyle) {
                this.setState({
                    focusedKey: null
                });
            }
        }
    };

    Vertical.prototype.onItemClick = function onItemClick(itemid, item) {
        var focused = item.props.focused;
        var trigger = this.context.trigger;


        trigger = trigger || this.props.trigger;

        if (trigger === 'hover') {
            if (itemid === Vertical.navigationMoreKey) {
                return this;
            }
        }

        if (focused) {
            if (itemid === Vertical.navigationMoreKey) {
                return this;
            }
        }

        if (trigger === 'click') {
            if (itemid === this.state.focusedKey) {
                if (focused) {
                    this.setState({
                        focusedKey: null
                    });
                }
            } else {
                this.setState({
                    focusedKey: itemid
                });
            }
        }

        _Navigation.prototype.onItemClick.apply(this, arguments);
    };

    Vertical.prototype.onItemSelect = function onItemSelect(itemid) {
        if (itemid === Vertical.navigationMoreKey) {
            return this;
        }

        if (itemid === this.state.selectedKey) {
            return this;
        }

        _Navigation.prototype.onItemSelect.apply(this, arguments);

        if (this.props.selectedStyle) {
            this.setState({
                selectedKey: itemid
            });
        }
    };

    /**
     * 克隆子组件函数;过滤掉undefined，null情况
     * @method cloneChildElement
     * @return {Array}
     */


    Vertical.prototype.cloneChildElement = function cloneChildElement() {
        var _this2 = this;

        var _props = this.props,
            morePositionKey = _props.morePositionKey,
            moreText = _props.moreText;

        var element = _Navigation.prototype.cloneChildElement.call(this);
        var moreMenus = [];
        var menus = [];
        var isMore = false;
        var refs = menus;

        if (morePositionKey) {
            _react2['default'].Children.forEach(element, function (child, index) {
                var key = void 0;

                if (child === undefined || child === null) {
                    return child;
                }

                key = child.props.itemid || child.key || index;

                if (!isMore) {
                    if (key === morePositionKey) {
                        isMore = true;
                        refs = moreMenus;
                    }
                }

                refs.push(child);
            });

            if (moreMenus.length > 0) {
                var moreKey = Vertical.navigationMoreKey;
                var moreChild = _react2['default'].createElement(
                    _item2['default'],
                    { text: moreText,
                        key: moreKey,
                        itemid: moreKey
                    },
                    _react2['default'].createElement(
                        _nextMenu2['default'],
                        null,
                        moreMenus.map(function (child) {
                            var key = child.props.itemid || child.key;
                            var children = void 0;

                            if (child === null || child === undefined) {
                                return child;
                            }

                            if (child && child.props) {
                                if (child.props.link) {
                                    children = _react2['default'].createElement(
                                        'a',
                                        { href: child.props.link,
                                            target: child.props.target },
                                        child.props.text
                                    );
                                } else {
                                    children = child.props.text;
                                }
                            }

                            return _react2['default'].createElement(
                                _nextMenu2['default'].Item,
                                {
                                    key: key,
                                    onClick: function onClick() {
                                        _this2.onItemClick(key, child);
                                        _this2.onItemSelect(key, child);
                                    }
                                },
                                children
                            );
                        })
                    )
                );

                menus.push(_react2['default'].cloneElement(moreChild, this.cloneChildProperty(moreChild, moreKey)));
            }

            return menus;
        }

        return element;
    };

    Vertical.prototype.cloneChildProperty = function cloneChildProperty(child, key) {
        var props = _Navigation.prototype.cloneChildProperty.call(this, child, key),
            context = this.context,
            navigation = context.rootNavigation || this,
            isMount = this.isMount,
            state = void 0;

        state = navigation.getRootState ? navigation.getRootState() : this.state;

        if (!isMount) {
            if (child.props.focused) {
                state.focusedKey = key;
            }
        }

        props.focused = !isMount ? child.props.focused : key === state.focusedKey;

        return props;
    };

    return Vertical;
}(_navigation2['default']), _class.navigationMoreKey = 'navigation.item.more.' + +new Date(), _temp);
exports['default'] = Vertical;
module.exports = exports['default'];