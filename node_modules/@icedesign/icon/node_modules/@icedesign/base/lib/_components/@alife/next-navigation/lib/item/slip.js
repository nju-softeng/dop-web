'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _item = require('./item.js');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Slip = function (_Item) {
    _inherits(Slip, _Item);

    function Slip(props, context) {
        _classCallCheck(this, Slip);

        var _this = _possibleConstructorReturn(this, _Item.call(this, props, context));

        var prefix = context.prefix;


        _this.activeClassName = prefix + 'navigation-item-active';
        return _this;
    }

    // onMouseEnter默认处理函数
    // 调用上层navigation onItemMouseEnter 方法


    Slip.prototype.onMouseEnter = function onMouseEnter() {
        var _props = this.props,
            onMouseEnter = _props.onMouseEnter,
            itemid = _props.itemid;


        var argv = [].slice.call(arguments),
            context = this.context.navigation;

        argv = [itemid, this].concat(argv);

        onMouseEnter.apply(this, [itemid, this].concat(argv));
        context.onItemMouseEnter.apply(context, argv);
    };

    /**
     * onMouseMove默认处理函数;调用上层navigation onItemMouseMove 方法
     * @method onMouseMove
     */


    Slip.prototype.onMouseMove = function onMouseMove() {
        var _props2 = this.props,
            onMouseMove = _props2.onMouseMove,
            itemid = _props2.itemid;


        var argv = [].slice.call(arguments),
            context = this.context.navigation;

        argv = [itemid, this].concat(argv);

        onMouseMove.apply(this, [itemid, this].concat(argv));
        context.onItemMouseMove.apply(context, argv);
    };

    /**
     * onMouseLeave默认处理函数;调用上层navigation onItemMouseLeave 方法
     * @method onMouseLeave
     */


    Slip.prototype.onMouseLeave = function onMouseLeave() {
        var _props3 = this.props,
            onMouseLeave = _props3.onMouseLeave,
            itemid = _props3.itemid;


        var argv = [].slice.call(arguments),
            context = this.context.navigation;

        argv = [itemid, this].concat(argv);

        onMouseLeave.apply(this, [itemid, this].concat(argv));
        context.onItemMouseLeave.apply(context, argv);
    };

    Slip.prototype.renderChildren = function renderChildren() {};

    Slip.prototype.render = function render() {
        var selected = this.props.selected;

        var className = void 0;

        if (selected) {
            className = this.activeClassName;
        }

        return _Item.prototype.render.call(this, className);
    };

    return Slip;
}(_item2['default']);

exports['default'] = Slip;
module.exports = exports['default'];