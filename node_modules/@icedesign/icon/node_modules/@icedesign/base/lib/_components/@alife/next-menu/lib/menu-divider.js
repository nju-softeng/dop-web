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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Menu.Divider */
var MenuDivider = (_temp = _class = function (_React$Component) {
    _inherits(MenuDivider, _React$Component);

    function MenuDivider() {
        _classCallCheck(this, MenuDivider);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    MenuDivider.prototype.render = function render() {
        var prefix = this.context.prefix || this.props.prefix;
        var className = prefix + 'menu-divider';

        return _react2['default'].createElement('li', { className: className });
    };

    return MenuDivider;
}(_react2['default'].Component), _class._menuItem = true, _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string
}, _class.defaultProps = {
    disabled: true,
    prefix: 'next-'
}, _temp);
MenuDivider.displayName = 'MenuDivider';
exports['default'] = MenuDivider;
module.exports = exports['default'];