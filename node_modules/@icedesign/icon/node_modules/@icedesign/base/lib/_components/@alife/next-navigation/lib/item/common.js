'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

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

var Common = function (_Item) {
    _inherits(Common, _Item);

    function Common(props, context) {
        _classCallCheck(this, Common);

        var _this = _possibleConstructorReturn(this, _Item.call(this, props, context));

        _this.textAlignCenterClassName = context.prefix + 'navigation-item-align';
        _this.activeDirectionClassName = context.prefix + 'navigation-item-selected';
        return _this;
    }

    // click默认处理函数
    // 调用顶层navigation onItemClick 方法
    // 转化click事件为select事件


    Common.prototype.onClick = function onClick(e) {
        var _props = this.props,
            onClick = _props.onClick,
            onSelect = _props.onSelect,
            selected = _props.selected,
            focused = _props.focused,
            selectedStyle = _props.selectedStyle,
            itemid = _props.itemid,
            hasChildren = _props.hasChildren;

        var context = this.context,
            argv = [itemid, this].concat([].slice.call(arguments));

        argv.splice(2, 0, this);

        onClick.apply(this, argv);
        context.onItemClick.apply(context.rootNavigation, argv);

        if (hasChildren && (selected || !focused)) {
            return this;
        }

        if (hasChildren) {
            if (this.inItemContent(e.target)) {
                return this;
            }
        }

        onSelect.apply(this, argv);

        if (selectedStyle) {
            context.onItemSelect.apply(context.rootNavigation, argv);
        }
    };

    Common.prototype.render = function render(className) {
        var _classNames;

        var _props2 = this.props,
            selected = _props2.selected,
            activeDirection = _props2.activeDirection,
            contentAlign = _props2.contentAlign,
            menuAlign = _props2.menuAlign,
            context = this.context;


        contentAlign = menuAlign || contentAlign || context.contentAlign;
        activeDirection = activeDirection || context.activeDirection;

        var classes = void 0,
            alignClassName = this.textAlignCenterClassName + '-' + contentAlign,
            activeClassName = this.activeDirectionClassName + '-' + activeDirection;

        classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this.selectedClassName, selected), _defineProperty(_classNames, activeClassName, activeDirection && selected), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, alignClassName, true), _classNames));

        return _Item.prototype.render.call(this, classes);
    };

    return Common;
}(_item2['default']);

exports['default'] = Common;
module.exports = exports['default'];