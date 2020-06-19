'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _navigation = require('./navigation.js');

var _navigation2 = _interopRequireDefault(_navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Slip = function (_Navigation) {
    _inherits(Slip, _Navigation);

    function Slip(props, context) {
        _classCallCheck(this, Slip);

        var _this = _possibleConstructorReturn(this, _Navigation.call(this, props, context));

        var prefix = context.prefix;


        prefix = (prefix || props.prefix) + 'navigation';

        _this.containerClassName = prefix + '-slip-container';
        _this.mainClassName = prefix + '-slip-main';
        _this.selectedClassName = prefix + '-slip-selected';

        _this.state.content = null;
        return _this;
    }

    Slip.prototype.setContent = function setContent(content) {
        this.setState({
            content: content
        });
    };

    Slip.prototype.onMainMouseLeave = function onMainMouseLeave() {
        this.setState({
            selectedKey: null,
            content: null
        });
    };

    Slip.prototype.onItemSelect = function onItemSelect(itemid, item) {
        var onSelect = this.props.onSelect;

        var content = item.props.childrenContent,
            root = this.context.rootNavigation;

        this.setState({
            selectedKey: itemid,
            content: content
        });

        onSelect.apply(this, arguments);

        if (root) {
            root.props.onSelect.apply(root, arguments);
        }
    };

    Slip.prototype.onItemMouseEnter = function onItemMouseEnter(itemid) {
        var context = this.context.rootNavigation || this,
            argv = [].slice.call(arguments);

        argv.splice(2, 0, this);

        _Navigation.prototype.onItemMouseEnter.apply(this, argv);

        if (itemid === this.state.selectedKey) {
            return this;
        }

        context.onItemSelect.apply(this, argv);
    };

    Slip.prototype.onItemMouseLeave = function onItemMouseLeave() {
        var argv = [].slice.call(arguments);

        argv.splice(2, 0, this);

        this.props.onMouseMove.apply(this, argv);
    };

    /**
     * 克隆item属性数据;根据状态处理props对应的值
     * @method cloneChildProperty
     * @return {Object}
     */


    Slip.prototype.cloneChildProperty = function cloneChildProperty(child, key) {
        var state = void 0,
            isMount = this.isMount;

        state = this.state;

        if (!isMount) {
            if (child.props.selected) {
                state.selectedKey = key;
            }
        }

        return {
            key: key,
            itemid: key,
            childrenContent: child.props.children,
            selected: !isMount ? child.props.selected : key === state.selectedKey,
            hasChildren: child.props.children ? this.context.type || this.props.type : undefined
        };
    };

    /**
     * 克隆container
     * @method cloneContainer
     * @return {Object}
     */


    Slip.prototype.cloneContainer = function cloneContainer() {
        var _classNames;

        var container = this.props.container;

        var classes = void 0;

        if (!container) {
            return undefined;
        }

        classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this.containerClassName, true), _defineProperty(_classNames, container.props.className, !!container.props.className), _classNames));

        return _react2['default'].cloneElement(container, {
            className: classes
        }, this.state.content);
    };

    /**
     * 渲染container
     * @method renderContainer
     * @return {Object}
     */


    Slip.prototype.renderContainer = function renderContainer() {
        var container = this.cloneContainer();

        if (container) {
            return container;
        }

        return _react2['default'].createElement(
            'div',
            { className: this.containerClassName },
            this.state.content
        );
    };

    Slip.prototype.render = function render() {
        var _classNames2;

        var classes = void 0,
            eventsBind = void 0;

        eventsBind = {
            onMouseLeave: this.onMainMouseLeave.bind(this)
        };

        classes = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, this.mainClassName, true), _defineProperty(_classNames2, this.selectedClassName, !!this.state.selectedKey), _classNames2));

        return _react2['default'].createElement(
            'div',
            _extends({
                style: this.props.style,
                className: classes
            }, eventsBind),
            _Navigation.prototype.render.call(this),
            this.renderContainer()
        );
    };

    return Slip;
}(_navigation2['default']);

exports['default'] = Slip;


Slip.defaultProps.type = 'slip';
module.exports = exports['default'];