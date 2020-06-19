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

/** Table.Column */
var Column = (_temp = _class = function (_React$Component) {
  _inherits(Column, _React$Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Column.prototype.render = function render() {
    return null;
  };

  return Column;
}(_react2['default'].Component), _class.propTypes = {
  /**
   * 指定列对应的字段，支持`a.b`形式的快速取值
   */
  dataIndex: _propTypes2['default'].string,
  /**
   * 行渲染的逻辑
   * Function(value, index, record) => Element
   */
  cell: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].node, _propTypes2['default'].func]),
  /**
   * 表头显示的内容
   */
  title: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].node, _propTypes2['default'].func]),
  /**
   * 是否支持排序
   */
  sortable: _propTypes2['default'].bool,
  /**
   * 在锁列的情况下需要配置的宽度
   */
  width: _propTypes2['default'].node,
  /**
   * 单元格的对齐方式
   */
  align: _propTypes2['default'].oneOf(['left', 'center', 'right']),
  /**
   * 生成标题过滤的菜单, 格式为`[{label:'xxx', value:'xxx'}]`
   */
  filters: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
    label: _propTypes2['default'].string,
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].string])
  })),
  /**
   * 过滤的模式是单选还是多选
   */
  filterMode: _propTypes2['default'].oneOf(['single', 'multiple']),
  /**
   * 是否支持锁列,可选值为`left`,`right`, `true`
   */
  lock: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].string])
}, _class._tableMark = 'column', _class.contextTypes = {
  parent: _propTypes2['default'].any
}, _class.defaultProps = {
  cell: function cell(value) {
    return value;
  },
  filterMode: 'multiple',
  title: 'column'
}, _temp);
Column.displayName = 'Column';
exports['default'] = Column;
module.exports = exports['default'];