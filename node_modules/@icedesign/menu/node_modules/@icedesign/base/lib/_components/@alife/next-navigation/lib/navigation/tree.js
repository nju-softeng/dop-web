'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _navigation = require('./navigation.js');

var _navigation2 = _interopRequireDefault(_navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Tree = function (_Navigation) {
    _inherits(Tree, _Navigation);

    function Tree(props, context) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, _Navigation.call(this, props, context));

        _this.state.openedKeys = _this.props.openedKeys || [];
        _this.state.openedKey = null;

        _this.theSameLevelKeys = [];
        return _this;
    }

    // 由item子组件click触发select处理函数
    // 分局子组件selected状态决定是否调用该处理函数


    Tree.prototype.onItemSelect = function onItemSelect(itemid) {
        if (itemid === this.state.itemid) {
            return this;
        }

        _Navigation.prototype.onItemSelect.apply(this, arguments);

        if (this.props.selectedStyle) {
            this.setState({
                selectedKey: itemid
            });
        }
    };

    Tree.prototype.componentWillMount = function componentWillMount() {
        var branchLevel = this.context.branchLevel;

        this.context.branchLevel = branchLevel + 1;

        this.branchLevel = this.context.branchLevel;
    };

    Tree.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var state = {};

        _Navigation.prototype.componentWillReceiveProps.call(this, nextProps);

        if (nextProps.openedKeys) {
            state.openedKeys = nextProps.openedKeys;
        }

        this.setState(state);
    };

    // 折叠处理函数
    // 仅限Tree组件事件


    Tree.prototype.onItemFold = function onItemFold(itemid) {
        var argv = [].slice.call(arguments);
        var index = this.state.openedKeys.indexOf(itemid);

        if (index > -1) {
            this.state.openedKeys.splice(index, 1);
        }

        argv.splice(2, 0, this);

        this.props.onFold.apply(this, argv);
    };

    // 展开处理函数
    // 仅限Tree组件


    Tree.prototype.onItemUnFold = function onItemUnFold(itemid) {
        var argv = [].slice.call(arguments);
        var hasThisKey = this.state.openedKeys.indexOf(itemid) > -1;

        if (!hasThisKey) {
            this.state.openedKeys.push(itemid);
        }

        argv.splice(2, 0, this);

        this.props.onUnFold.apply(this, argv);
    };

    /**
     * 克隆子组件属性值;根据状态设置新的属性值；一般用来处理selected、opened、focused属性
     * 克隆子组件函数;过滤掉undefined，null情况
     * @method cloneChildProperty
     * @return {Object}
     */


    Tree.prototype.cloneChildProperty = function cloneChildProperty(child, key, _cloneChildProperty) {
        var props = _Navigation.prototype.cloneChildProperty.call(this, child, key, _cloneChildProperty),
            isMount = this.isMount,
            context = this.context,
            navigation = context.rootNavigation || this,
            hasOpenedKey = context.openedKeys || this.props.openedKeys,
            opened = void 0,
            state = void 0;

        state = navigation ? navigation.getRootState() : this.state;

        if (this.theSameLevelKeys.indexOf(key) === -1) {
            this.theSameLevelKeys.push(key);
        }

        if (!isMount) {
            if (!hasOpenedKey) {
                if (typeof child.props.opened === 'string') {
                    if (child.props.opened === 'true') {
                        state.openedKeys.push(key);
                        this.state.openedKey = key;
                    }
                } else {
                    if (child.props.opened) {
                        state.openedKeys.push(key);
                        this.state.openedKey = key;
                    }
                }
            }
        }

        if (state.openedKeys.indexOf(key) > -1) {
            opened = true;
            this.state.openedKey = key;
        } else {
            opened = false;
        }

        props.opened = opened;
        props.branchLevel = this.branchLevel;

        return props;
    };

    return Tree;
}(_navigation2['default']);

exports['default'] = Tree;


Tree.defaultProps.type = 'tree';
module.exports = exports['default'];