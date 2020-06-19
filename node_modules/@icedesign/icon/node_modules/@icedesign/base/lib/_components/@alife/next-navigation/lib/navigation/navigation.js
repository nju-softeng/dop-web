'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _helper = require('../util/helper.js');

var _helper2 = _interopRequireDefault(_helper);

var _index = require('../group/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Navigation = (_temp = _class = function (_React$Component) {
    _inherits(Navigation, _React$Component);

    Navigation.prototype.getChildContext = function getChildContext() {
        var props = this.props,
            context = this.context;

        return {
            // 最顶层navigation对象
            rootNavigation: context.rootNavigation || this,
            // 顶层已经初始化
            rootMount: context.rootMount || true,
            // 最近navigation对象
            navigation: this,
            // Tree分支缩进
            branchPadding: context.branchPadding || props.branchPadding,
            // 类名前缀
            prefix: context.prefix || props.prefix,
            // navigation 类型
            type: context.type || props.type,
            // Tree 分支图标
            leaf: context.leaf || props.leaf,
            // 是否显示分支图标
            hasLeaf: context.hasLeaf || props.hasLeaf,
            // 是否暴露选择样式
            selectedStyle: context.selectedStyle || props.selectedStyle,
            // 激活条位置
            activeDirection: context.activeDirection || props.activeDirection,
            // navigation失去焦点收起菜单
            isBlurDispear: context.isBlurDispear || props.isBlurDispear || props.blurHide,
            // 子组件是否阻止事件冒泡
            isStopPropagation: context.isStopPropagation || props.isStopPropagation,
            // 子组件内容排版
            contentAlign: context.contentAlign || props.contentAlign || props.menuAlign,
            // navigation 标题
            title: context.title || props.title,
            // 触发类型
            trigger: context.trigger || props.trigger,
            // 点击处理函数
            onItemClick: context.onItemClick || this.onItemClick,
            // 鼠标进入处理函数
            onItemMouseEnter: context.onItemMouseEnter || this.onItemMouseEnter,
            // 鼠标移动处理函数
            onItemMouseMove: context.onItemMouseMove || this.onItemMouseMove,
            // 鼠标离开处理函数
            onItemMouseLeave: context.onItemMouseLeave || this.onItemMouseLeave,
            // Item选中处理函数
            onItemSelect: context.onItemSelect || this.onItemSelect,
            // Tree折叠处理函数
            onItemFold: context.onItemFold || this.onItemFold,
            // Tree展开处理函数
            onItemUnFold: context.onItemUnFold || this.onItemUnFold,
            // 或者、设置顶级state函数
            getRootState: context.getRootState || this.keepState,
            // 默认选中
            selectedKey: context.selectedKey || this.props.selectedKey,
            // 默认打开
            openedKeys: context.openedKeys || this.props.openedKeys,
            // 手风琴展开
            accordion: context.accordion || this.props.accordion || false,
            // 嵌套层级
            branchLevel: context.branchLevel || this.props.branchLevel || 1,
            // 更多菜单
            morePositionKey: context.morePositionKey || this.props.morePositionKey || null,
            // 更多
            moreText: context.moreText || this.props.moreText
        };
    };

    function Navigation(props, context) {
        _classCallCheck(this, Navigation);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        var prefix = context.prefix,
            type = context.type;


        prefix = (prefix || props.prefix) + 'navigation';
        type = type || props.type;

        _this.navigationClassName = prefix;
        _this.directionClassName = prefix + '-' + _this.getDirectionClassName();
        _this.typeClassName = prefix + '-' + type;
        _this.rootClassName = prefix + '-root';
        _this.subClassName = prefix + '-sub';

        _this.state = {
            selectedKey: _this.props.selectedKey || null
        };

        _this.getRootState = _this.getRootState.bind(_this);
        return _this;
    }

    Navigation.prototype.componentDidMount = function componentDidMount() {
        this.isMount = true;
    };

    Navigation.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var state = {};

        if (nextProps.selectedKey) {
            state.selectedKey = nextProps.selectedKey;
        }

        this.setState(state);
    };

    /**
     * 判断DOM对象是否在navigation内
     * @method inNavigation
     * @return {Boolean}       返回true 或者 false
     */


    Navigation.prototype.inNavigation = function inNavigation(dom) {
        var content = this.refs.navigation,
            hasCmp = content.compareDocumentPosition,
            contain = content[hasCmp ? 'compareDocumentPosition' : 'contains'],
            value = hasCmp ? 20 : true;

        return dom === content || contain.call(content, dom) === value;
    };

    /**
     * 判断DOM对象是否在navigation内
     * @method keepState
     * @return {*}
     * 1、当value === undefined，如果有key，则返回key状态；如果没有则返回state对象
     * 2、如果value !== undefined，则设置值
     */


    Navigation.prototype.getRootState = function getRootState() {
        return this.state;
    };

    /**
     * 获取组件direction值，根据type修正direction值
     * @method getDirectionClassName
     * @return {String}
     */


    Navigation.prototype.getDirectionClassName = function getDirectionClassName() {
        var _props = this.props,
            direction = _props.direction,
            type = _props.type;


        type = this.context.type || this.props.type;

        if (direction) {
            return direction === 'hoz' ? 'horizontal' : 'vertical';
        }

        if (type === 'text' || type === 'line' || type === 'filling' || type === undefined) {
            return 'horizontal';
        }

        return 'vertical';
    };

    /**
     * 处理Item点击事件
     * @method onItemClick
     */


    Navigation.prototype.onItemClick = function onItemClick() {
        var argv = [].slice.call(arguments);

        argv.splice(2, 0, this);

        this.props.onClick.apply(this, argv);
    };

    /**
     * 调用属性传递的onSelect事件
     * @method onItemSelect
     */


    Navigation.prototype.onItemSelect = function onItemSelect() {
        var argv = [].slice.call(arguments);

        argv.splice(2, 0, this);

        this.props.onSelect.apply(this, argv);
    };

    /**
     * 调用属性传递的onMouseEnter事件
     * @method onItemMouseEnter
     */


    Navigation.prototype.onItemMouseEnter = function onItemMouseEnter() {
        var argv = [].slice.call(arguments);

        argv.splice(2, 0, this);

        this.props.onMouseEnter.apply(this, argv);
    };

    /**
     * 调用属性传递的onMouseLeave事件
     * @method onItemMouseLeave
     */


    Navigation.prototype.onItemMouseLeave = function onItemMouseLeave() {
        var argv = [].slice.call(arguments);

        argv.splice(2, 0, this);

        this.props.onMouseLeave.apply(this, argv);
    };

    /**
     * 调用属性传递的onMouseMove事件
     * @method onItemMouseMove
     */


    Navigation.prototype.onItemMouseMove = function onItemMouseMove() {
        var argv = [].slice.call(arguments);

        argv.splice(2, 0, this);

        this.props.onMouseMove.apply(this, argv);
    };

    /**
     * 克隆子组件函数;过滤掉undefined，null情况
     * @method cloneChildElement
     * @return {Array}
     */


    Navigation.prototype.cloneChildElement = function cloneChildElement(groupChildren) {
        var _this2 = this;

        var children = this.props.children;


        return _react2['default'].Children.map(groupChildren || children, function (child, index) {
            var key = void 0,
                type = void 0,
                props = void 0;

            if (child === undefined || child === null) {
                return child;
            }

            key = child.props.itemid || child.key || index;
            type = child.type;

            if (type === _index2['default']) {
                return _react2['default'].createElement(
                    _index2['default'],
                    child.props,
                    _this2.cloneChildElement(child.props.children)
                );
            }

            props = type.componentMark ? _this2.cloneChildProperty(child, key) : child.props;

            return _react2['default'].cloneElement(child, props);
        });
    };

    /**
     * 克隆item属性数据;根据状态处理props对应的值
     * @method cloneChildProperty
     * @return {Object}
     */


    Navigation.prototype.cloneChildProperty = function cloneChildProperty(child, key) {
        var state = void 0,
            context = this.context,
            isMount = this.isMount,
            navigation = context.rootNavigation || this,
            hasChildren = !!child.props.children,
            hasSelectedKey = context.selectedKey || this.props.selectedKey,
            selected = void 0;

        state = navigation.getRootState ? navigation.getRootState() : this.state;

        if (!isMount) {
            if (!hasSelectedKey) {
                if (typeof child.props.selected === 'string') {
                    if (child.props.selected === 'true') {
                        state.selectedKey = key;
                    }
                } else {
                    if (child.props.selected) {
                        state.selectedKey = key;
                    }
                }
            }
        }

        if (state.selectedKey === key) {
            selected = true;
        }

        return {
            key: key,
            itemid: key,
            selected: selected,
            hasChildren: hasChildren ? this.context.type || this.props.type : undefined,
            hasLeaf: hasChildren
        };
    };

    /**
     * navigation传递title;自动嵌套<Group />
     * @method renderGroup
     * @return {Object}
     */


    Navigation.prototype.renderGroup = function renderGroup() {
        var title = this.props.title;


        var children = this.cloneChildElement();

        if (title) {
            return _react2['default'].createElement(
                _index2['default'],
                { title: title },
                children
            );
        }

        return children;
    };

    Navigation.prototype.render = function render() {
        var _classNames;

        var _props2 = this.props,
            className = _props2.className,
            style = _props2.style;
        var rootNavigation = this.context.rootNavigation;


        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this.navigationClassName, true), _defineProperty(_classNames, this.directionClassName, true), _defineProperty(_classNames, this.typeClassName, true), _defineProperty(_classNames, undefined === rootNavigation ? this.rootClassName : this.subClassName, true), _defineProperty(_classNames, className, !!className), _classNames));

        return _react2['default'].createElement(
            'ul',
            {
                style: style,
                className: classes,
                ref: 'navigation'
            },
            this.renderGroup()
        );
    };

    return Navigation;
}(_react2['default'].Component), _class.childContextTypes = _helper2['default'].propTypes, _class.contextTypes = _helper2['default'].propTypes, _class.propTypes = _helper2['default'].propTypes, _class.componentMark = 'navigation', _temp);
Navigation.displayName = 'Navigation';


Navigation.defaultProps = {
    prefix: 'next-',
    type: 'text',
    leaf: 'arrow-down',
    contentAlign: 'center',
    trigger: 'hover',
    title: null,
    activeDirection: null,
    selectedStyle: true,
    hasLeaf: true,
    isStopPropagation: true,
    isBlurDispear: true,
    branchPadding: 20,
    branchLevel: 0,
    morePositionKey: null,
    moreText: '更多'
};

['onClick', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onSelect', 'onFold', 'onUnFold'].forEach(function (name) {
    return Navigation.defaultProps[name] = _helper2['default'].empty;
});

exports['default'] = Navigation;
module.exports = exports['default'];