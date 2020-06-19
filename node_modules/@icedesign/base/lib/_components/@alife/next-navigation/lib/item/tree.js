'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _item = require('./item.js');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Tree = function (_Item) {
    _inherits(Tree, _Item);

    function Tree(props, context) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, _Item.call(this, props, context));

        var prefix = context.prefix + 'navigation';

        _this.openedClassName = prefix + '-item-opened';
        _this.leafAtFrontClassName = prefix + '-item-front';
        _this.treeTitleClassName = prefix + '-item-tree-title';
        _this.activeDirectionClassName = prefix + '-item-selected';

        _this.state = {
            opened: _this.props.opened
        };
        return _this;
    }

    Tree.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('opened' in nextProps) {
            this.setState({
                opened: nextProps.opened
            });
        }
    };

    // 处理tree触发click事件函数
    // 根据是否有hasChildren属性判断是select事件还是fold/unfold事件


    Tree.prototype.onClick = function onClick(e) {
        var _props = this.props,
            hasChildren = _props.hasChildren,
            onClick = _props.onClick,
            onSelect = _props.onSelect,
            onFold = _props.onFold,
            onUnFold = _props.onUnFold,
            selected = _props.selected,
            selectedStyle = _props.selectedStyle,
            itemid = _props.itemid;


        var context = this.context,
            prefix = context.prefix,
            navigation = context.navigation,
            rootNavigation = context.rootNavigation,
            accordion = context.accordion,
            argv = [itemid, this].concat([].slice.call(arguments)),
            index = void 0,
            cls = e.target.className;

        if (typeof cls === 'string') {
            if (cls.indexOf(prefix + 'navigation-item-leaf-icon') === -1) {
                onClick.apply(this, argv);
                context.onItemClick.apply(context.rootNavigation, argv);
            }
        }

        if (hasChildren === 'tree') {
            this.setState({
                opened: !this.state.opened
            });

            if (this.state.opened) {
                onFold.apply(this, argv);
                context.onItemFold.apply(context.rootNavigation, argv);

                // 手风琴逻辑
                if (accordion) {
                    if (navigation) {
                        if (navigation.state.openedKey === itemid) {
                            navigation.state.openedKey = null;
                        }
                    }
                }
            } else {
                // 手风琴逻辑
                if (accordion) {
                    if (navigation) {
                        if (navigation.state.openedKey === itemid) {
                            navigation.state.openedKey = null;
                        } else {
                            if (navigation.state.openedKey) {
                                index = rootNavigation.state.openedKeys.indexOf(navigation.state.openedKey);

                                if (index > -1) {
                                    rootNavigation.state.openedKeys.splice(index, 1);
                                    navigation.state.openedKey = itemid;
                                }
                            } else {
                                navigation.state.openedKey = itemid;
                            }
                        }
                    }
                }

                onUnFold.apply(this, argv);
                context.onItemUnFold.apply(context.rootNavigation, argv);
            }
        } else {
            if (!selected) {
                onSelect.apply(this, argv);

                if (selectedStyle) {
                    context.onItemSelect.apply(context.rootNavigation, argv);
                }
            }
        }

        e.stopPropagation();
    };

    // 渲染子组件图标函数


    Tree.prototype.renderLeafIcon = function renderLeafIcon() {
        var hasChildren = this.props.hasChildren;

        var cmp = void 0;

        if (hasChildren) {
            cmp = _Item.prototype.renderLeafIcon.call(this);

            if (cmp) {
                return _react2['default'].cloneElement(cmp, {
                    onClick: function onClick(e) {
                        e.preventDefault();
                    }
                });
            }
        }
    };

    Tree.prototype.render = function render() {
        var _classNames;

        var _props2 = this.props,
            leafAtFront = _props2.leafAtFront,
            selected = _props2.selected,
            hasChildren = _props2.hasChildren;
        var activeDirection = this.props.activeDirection;

        var context = this.context,
            activeClassName = void 0;

        activeDirection = activeDirection || context.activeDirection;
        activeClassName = this.activeDirectionClassName + '-' + activeDirection;

        var name = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this.selectedClassName, selected), _defineProperty(_classNames, this.openedClassName, this.state.opened), _defineProperty(_classNames, activeClassName, activeDirection && selected), _defineProperty(_classNames, this.leafAtFrontClassName, leafAtFront), _defineProperty(_classNames, this.treeTitleClassName, hasChildren), _classNames));

        return _Item.prototype.render.call(this, name);
    };

    return Tree;
}(_item2['default']);

exports['default'] = Tree;
module.exports = exports['default'];