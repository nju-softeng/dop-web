'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextMenu = require('../../../next-menu/lib/index.js');

var _nextMenu2 = _interopRequireDefault(_nextMenu);

var _helper = require('../util/helper.js');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Item = (_temp = _class = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item(props, context) {
        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        var prefix = context.prefix + 'navigation-item';

        _this.itemClassName = '' + prefix;
        _this.selectedClassName = prefix + '-selected';
        _this.leafClassName = prefix + '-leaf-icon';
        _this.iconClassName = prefix + '-icon';
        _this.customClassName = prefix + '-custom-icon';
        _this.textClassName = prefix + '-text';
        _this.contentClassName = prefix + '-content';
        _this.childClassName = prefix + '-children';
        _this.innerClassName = prefix + '-content-inner';
        _this.menuClassName = prefix + '-children-menu';

        if (context.nestingPath) {
            _this.nestingPath = context.nestingPath.concat(_this);
        } else {
            _this.nestingPath = [_this];
        }

        _this.createMouseEvent();
        return _this;
    }

    Item.prototype.getChildContext = function getChildContext() {
        var context = this;

        return {
            nestingPath: context.nestingPath ? context.nestingPath.slice() : []
        };
    };

    /**
     * 绑定鼠标相关事件;事件类型：click,mouseleave,mousemove,mouseenter
     * @method createMouseEvent
     * @return {Object}
     */


    Item.prototype.createMouseEvent = function createMouseEvent() {
        var _this2 = this;

        if (this.mouseEvent) {
            return this.mouseEvent;
        }

        this.mouseEvent = {};

        ['onClick', 'onMouseLeave', 'onMouseEnter', 'onMouseMove'].forEach(function (e) {
            var evt = _this2[e],
                mouseEvent = _this2.mouseEvent || (_this2.mouseEvent = {});

            if (evt) {
                mouseEvent[e] = evt.bind(_this2);
            }
        });

        return this.mouseEvent;
    };

    /**
     * click默认处理函数;调用顶层navigation onItemClick 方法
     * @method onClick
     */


    Item.prototype.onClick = function onClick() {
        var _props = this.props,
            onClick = _props.onClick,
            itemid = _props.itemid;


        var argv = [].slice.call(arguments),
            context = this.context;

        argv = [itemid, this].concat(argv);

        onClick.apply(this, argv);
        context.onItemClick.apply(context.rootNavigation, argv);
    };

    // onMouseEnter默认处理函数
    // 调用顶层navigation onItemMouseEnter 方法


    Item.prototype.onMouseEnter = function onMouseEnter() {
        var _props2 = this.props,
            onMouseEnter = _props2.onMouseEnter,
            itemid = _props2.itemid;


        var argv = [].slice.call(arguments),
            context = this.context;

        argv = [itemid, this].concat(argv);

        onMouseEnter.apply(this, [itemid, this].concat(argv));
        context.onItemMouseEnter.apply(context.rootNavigation, argv);
    };

    /**
     * onMouseMove默认处理函数;调用顶层navigation onItemMouseMove 方法
     * @method onMouseMove
     */


    Item.prototype.onMouseMove = function onMouseMove() {
        var _props3 = this.props,
            onMouseMove = _props3.onMouseMove,
            itemid = _props3.itemid;


        var argv = [].slice.call(arguments),
            context = this.context;

        argv = [itemid, this].concat(argv);

        onMouseMove.apply(this, [itemid, this].concat(argv));
        context.onItemMouseMove.apply(context.rootNavigation, argv);
    };

    /**
     * onMouseLeave默认处理函数;调用顶层navigation onItemMouseLeave 方法
     * @method onMouseLeave
     */


    Item.prototype.onMouseLeave = function onMouseLeave() {
        var _props4 = this.props,
            onMouseLeave = _props4.onMouseLeave,
            itemid = _props4.itemid;


        var argv = [].slice.call(arguments),
            context = this.context;

        argv = [itemid, this].concat(argv);

        onMouseLeave.apply(this, [itemid, this].concat(argv));
        context.onItemMouseLeave.apply(context.rootNavigation, argv);
    };

    /**
     * 如果图片是使用对象传进，则克隆图标
     * @method onMouseLcloneIconeave
     * @return {Object}
     */


    Item.prototype.cloneIcon = function cloneIcon(icon, className) {
        var attr = void 0;

        attr = {
            className: className
        };

        return _react2['default'].cloneElement(icon, attr);
    };

    /**
     * 渲染自定义图标
     * @method renderCustomIcon
     * @return {Object}
     */


    Item.prototype.renderCustomIcon = function renderCustomIcon() {
        var _classNames;

        var icon = this.props.icon;


        var classes = void 0,
            attr = void 0;

        if (icon === undefined) {
            return undefined;
        }

        classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this.iconClassName, true), _defineProperty(_classNames, this.customClassName, true), _classNames));

        attr = {
            type: icon,
            ref: 'custom',
            className: classes
        };

        return (typeof icon === 'undefined' ? 'undefined' : _typeof(icon)) === 'object' ? this.cloneIcon(icon, classes) : _react2['default'].createElement(_nextIcon2['default'], attr);
    };

    /**
     * 渲染text文字
     * @method renderText
     * @return {Object}
     */


    Item.prototype.renderText = function renderText() {
        var text = this.props.text;


        if (text === undefined) {
            return undefined;
        }

        return _react2['default'].createElement(
            'span',
            { ref: 'text', className: this.textClassName },
            text
        );
    };

    /**
     * 渲染菜单branch图标
     * @method renderLeafIcon
     * @return {Object}
     */


    Item.prototype.renderLeafIcon = function renderLeafIcon() {
        var _classNames2;

        var _props5 = this.props,
            hasLeaf = _props5.hasLeaf,
            leaf = _props5.leaf,
            context = this.context;


        hasLeaf = hasLeaf === undefined ? context.hasLeaf : hasLeaf;
        leaf = leaf || context.leaf;

        var classes = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, this.iconClassName, true), _defineProperty(_classNames2, this.leafClassName, true), _classNames2)),
            cmp = _react2['default'].createElement(_nextIcon2['default'], { ref: 'leaf', type: leaf, className: classes });

        if (hasLeaf) {
            return cmp;
        }
    };

    /**
     * 判断DOM是否在Item内
     * @method inItem
     * @return {Boolean}
     */


    Item.prototype.inItem = function inItem(dom) {
        var content = this.refs.item,
            hasCmp = content.compareDocumentPosition,
            contain = content[hasCmp ? 'compareDocumentPosition' : 'contains'],
            value = hasCmp ? 20 : true;

        return dom === content || contain.call(content, dom) === value;
    };

    /**
     * 判断DOM是否在Item Content内
     * @method inItemContent
     * @return {Boolean}
     */


    Item.prototype.inItemContent = function inItemContent(dom) {
        var content = this.refs.itemContent,
            hasCmp = content.compareDocumentPosition,
            contain = content[hasCmp ? 'compareDocumentPosition' : 'contains'],
            value = hasCmp ? 20 : true;

        return dom === content || contain.call(content, dom) === value;
    };

    /**
     * 渲染主要内容：icon,text,leaf
     * @method renderLeafIcon
     * @return {Object}
     */


    Item.prototype.renderContent = function renderContent() {
        var _props6 = this.props,
            link = _props6.link,
            target = _props6.target,
            title = _props6.title,
            branchLevel = _props6.branchLevel,
            container = _props6.container;
        var Tag = link ? 'a' : 'div',
            branchPadding = this.context.branchPadding,
            content = this.props.content,
            attr = {
            className: this.innerClassName,
            href: link
        },
            style = void 0;


        style = {
            paddingLeft: branchPadding * (branchLevel - 1) + 'px'
        };

        if (target) {
            attr.target = target;
        }

        if (title) {
            attr.title = title;
        }

        if (!content) {
            content = _react2['default'].createElement(
                Tag,
                _extends({}, attr, { ref: 'itemContent' }),
                this.renderCustomIcon(),
                this.renderText(),
                this.renderLeafIcon()
            );
        } else {
            content = _react2['default'].createElement(
                Tag,
                attr,
                content
            );
        }

        if ((typeof container === 'undefined' ? 'undefined' : _typeof(container)) === 'object') {
            content = _react2['default'].cloneElement(container, null, content);
        }

        return _react2['default'].createElement(
            'div',
            { className: this.contentClassName, style: style },
            content
        );
    };

    /**
     * 渲染子组件；跟进不同标识选择不同组件处理；使用不同类名控制
     * @method renderLeafIcon
     * @return {Object}
     */


    Item.prototype.renderChildren = function renderChildren() {
        var _this3 = this;

        var _props7 = this.props,
            hasChildren = _props7.hasChildren,
            children = _props7.children;
        var isStopPropagation = this.props.isStopPropagation,
            content = [];


        isStopPropagation = isStopPropagation || this.context.isStopPropagation;

        if (!hasChildren) {
            return undefined;
        }

        _react2['default'].Children.forEach(children, function (child, i) {
            if (child.type === _nextMenu2['default']) {
                if (isStopPropagation) {
                    child = _this3.handleMenuComponent(child, i);
                }

                return content.push(child);
            }

            if (typeof child.type === 'function') {
                if (child.type.componentMark) {
                    child = _this3.handleNavigationComponent(child, i);

                    return content.push(child);
                }
            }

            child = _this3.handleUnknownComponent(child, i);

            content.push(child);
        });

        return content;
    };

    // 未知组件类型处理方法
    // 直接返回


    Item.prototype.handleUnknownComponent = function handleUnknownComponent(child, i) {
        return _react2['default'].createElement(
            'div',
            { className: this.unknowsClassName, key: i },
            child
        );
    };

    // 嵌套组件类型


    Item.prototype.handleNavigationComponent = function handleNavigationComponent(child, i) {
        return _react2['default'].createElement(
            'div',
            { className: this.childClassName, key: i },
            child
        );
    };

    // 针对菜单组件处理方法
    // 根据是否有事件冒泡阻止，注入onClick处理


    Item.prototype.handleMenuComponent = function handleMenuComponent(child, i) {
        var _this4 = this;

        var handlers = {},
            some = [].some;

        ['onClick'].forEach(function (type) {
            var refsHandler = child.props[type];
            var handler = void 0;

            handler = function handler(key, item, e, r) {
                var argv = getEventTarget(key, item, e, r);

                if (argv) {
                    if (_this4.inItem(argv.target)) {
                        _this4[type](argv);
                    }

                    argv.stopPropagation();
                }
            };

            if (refsHandler) {
                handler = function (key, item, e, r) {
                    var argv = getEventTarget(key, item, e, r);

                    refsHandler.apply(child.props, arguments);

                    if (argv) {
                        if (this.inItem(argv.target)) {
                            this[type](argv);
                        }

                        argv.stopPropagation();
                    }
                }.bind(_this4);
            }

            handlers[type] = handler;
        });

        function getEventTarget() {
            var ret = void 0;

            if (some.call(arguments, function (argv) {
                if ((typeof argv === 'undefined' ? 'undefined' : _typeof(argv)) === 'object') {
                    if (argv.target) {
                        return argv.target.nodeType === undefined ? false : ret = argv;
                    }
                }
            })) {
                return ret;
            }
        }

        return _react2['default'].createElement(
            'div',
            { className: this.menuClassName, key: i },
            _react2['default'].cloneElement(child, handlers)
        );
    };

    Item.prototype.render = function render(clsName) {
        var _classNames3;

        var _props8 = this.props,
            className = _props8.className,
            style = _props8.style;

        var classes = void 0;

        classes = (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, this.itemClassName, true), _defineProperty(_classNames3, clsName, !!clsName), _defineProperty(_classNames3, className, !!className), _classNames3));

        return _react2['default'].createElement(
            'li',
            _extends({
                ref: 'item'
            }, this.mouseEvent, {
                className: classes,
                style: style
            }),
            this.renderContent(),
            this.renderChildren()
        );
    };

    return Item;
}(_react2['default'].Component), _class.contextTypes = _helper2['default'].propTypes, _class.propTypes = _helper2['default'].propTypes, _class.childContextTypes = {}, _class.componentMark = 'item', _temp);
Item.displayName = 'Item';
exports['default'] = Item;


Item.propTypes.nestingPath = _propTypes2['default'].array;
Item.contextTypes.nestingPath = _propTypes2['default'].array;
Item.childContextTypes.nestingPath = _propTypes2['default'].array;

Item.defaultProps = {
    selectedStyle: true,
    hasLeaf: true,
    isStopPropagation: true
};

['onClick', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onSelect', 'onFold', 'onUnFold'].forEach(function (name) {
    var defaultProps = Item.defaultProps || (Item.defaultProps = {});

    defaultProps[name] = _helper2['default'].empty;
});
module.exports = exports['default'];