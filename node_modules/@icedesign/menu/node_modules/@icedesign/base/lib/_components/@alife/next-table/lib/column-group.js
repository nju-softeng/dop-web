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

/** Table.ColumnGroup */
var ColumnGroup = (_temp = _class = function (_React$Component) {
    _inherits(ColumnGroup, _React$Component);

    function ColumnGroup() {
        _classCallCheck(this, ColumnGroup);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    ColumnGroup.prototype.getChildContext = function getChildContext() {
        return {
            parent: this
        };
    };

    ColumnGroup.prototype.render = function render() {
        return null;
    };

    return ColumnGroup;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 表头显示的内容
     */
    title: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].node, _propTypes2['default'].func])
}, _class._tableMark = 'column-group', _class.childContextTypes = {
    parent: _propTypes2['default'].any
}, _class.defaultProps = {
    title: 'column-group'
}, _temp);
ColumnGroup.displayName = 'ColumnGroup';
exports['default'] = ColumnGroup;
module.exports = exports['default'];