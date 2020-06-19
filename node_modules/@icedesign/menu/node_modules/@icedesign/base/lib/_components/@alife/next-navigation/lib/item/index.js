'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _slip = require('./slip.js');

var _slip2 = _interopRequireDefault(_slip);

var _tree = require('./tree.js');

var _tree2 = _interopRequireDefault(_tree);

var _line = require('./line.js');

var _line2 = _interopRequireDefault(_line);

var _text = require('./text.js');

var _text2 = _interopRequireDefault(_text);

var _filling = require('./filling.js');

var _filling2 = _interopRequireDefault(_filling);

var _normal = require('./normal.js');

var _normal2 = _interopRequireDefault(_normal);

var _icononly = require('./icononly.js');

var _icononly2 = _interopRequireDefault(_icononly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ItemMain = (_temp = _class = function (_React$Component) {
    _inherits(ItemMain, _React$Component);

    function ItemMain() {
        _classCallCheck(this, ItemMain);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    ItemMain.prototype.render = function render() {
        var type = this.context.type.toLowerCase();
        var component = ItemMain.typeMap[type];

        if (component) {
            return _react2['default'].createElement(component, this.props, this.props.children);
        }
    };

    return ItemMain;
}(_react2['default'].Component), _class.componentMark = 'item-main', _class.propTypes = {
    children: _propTypes2['default'].any
}, _class.typeMap = {
    line: _line2['default'],
    text: _text2['default'],
    slip: _slip2['default'],
    tree: _tree2['default'],
    normal: _normal2['default'],
    filling: _filling2['default'],
    icononly: _icononly2['default']
}, _temp);
ItemMain.displayName = 'ItemMain';
exports['default'] = ItemMain;


ItemMain.contextTypes = {
    type: _propTypes2['default'].string
};
module.exports = exports['default'];