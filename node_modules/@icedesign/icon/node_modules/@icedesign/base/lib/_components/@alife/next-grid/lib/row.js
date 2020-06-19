'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils.js');

require('./media-query-hack.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Grid.Row
 * @order 1
 */
var Row = (_temp = _class = function (_Component) {
  _inherits(Row, _Component);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Row.prototype.render = function render() {
    var _extends3;

    var prefix = this.context.prefix || this.props.prefix;
    /* eslint-disable no-unused-vars */

    var _props = this.props,
        propsPrefix = _props.prefix,
        type = _props.type,
        fixedWidth = _props.fixedWidth,
        justify = _props.justify,
        align = _props.align,
        className = _props.className,
        children = _props.children,
        others = _objectWithoutProperties(_props, ['prefix', 'type', 'fixedWidth', 'justify', 'align', 'className', 'children']);
    /* eslint-enable no-unused-vars */

    var typeClassesObj = {};
    if (type) {
      var types = Array.isArray(type) ? type : [type];
      typeClassesObj = types.reduce(function (ret, type) {
        if (type) {
          ret[prefix + 'row-' + type] = true;
        }
        return ret;
      }, {});
    }

    var classes = (0, _classnames2['default'])(_extends(_defineProperty({}, prefix + 'row', true), typeClassesObj, (_extends3 = {}, _defineProperty(_extends3, prefix + 'row-fixed-' + fixedWidth, !!fixedWidth), _defineProperty(_extends3, prefix + 'row-justify-' + justify, !!justify), _defineProperty(_extends3, prefix + 'row-align-' + align, !!align), _defineProperty(_extends3, prefix + 'row-ie8', _utils.ieVersion && _utils.ieVersion <= 8), _defineProperty(_extends3, className, !!className), _extends3)));

    return _react2['default'].createElement(
      'div',
      _extends({ className: classes }, others),
      children
    );
  };

  return Row;
}(_react.Component), _class.contextTypes = {
  prefix: _propTypes2['default'].string
}, _class.propTypes = {
  /**
   * 样式类名的品牌前缀
   */
  prefix: _propTypes2['default'].string,
  /**
   * 自定义类名
   */
  className: _propTypes2['default'].string,
  /**
   * 自定义内联样式
   */
  style: _propTypes2['default'].object,
  /**
   * 行内容
   */
  children: _propTypes2['default'].node,
  // 'fluid', 'fixed', 'wrap', 'no-wrap', 'no-padding', 'across'
  // TODO 1.x default layout -> fluid
  /**
   * 布局方式 <br><br>**可选值**:<br>'fluid'(流体布局，仅设置最大宽度，宽度为各断点值，两侧根据分辨率情况自动留白)<br>'fixed'(固定宽度布局)<br>'wrap'(单行模式，列在行中宽度溢出后换行)<br>'no-wrap'(单行模式，列在行中宽度溢出后不换行)<br>'no-padding'(行边距以及所有列间距都为0)<br>'across'(通栏模式, 行边距为0)<br>'fixed'/'fluid', 'wrap'/'no-wrap', 'no-padding', 'across'可组合使用，例如: ['fixed', 'wrap', 'no-padding', 'across']
   * @default 默认布局方式为 display:flex;width:100%;，两侧有边距留白。
   */
  type: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
  /**
   * 固定宽度布局，指定固定宽度值后不再受断点值影响而变动
   * @enumdesc 320px, 480px, 720px, 990px, 1200px, 1500px
   */
  fixedWidth: _propTypes2['default'].oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl']),
  /**
   * (不支持IE9及以下浏览器)多列垂直方向对齐方式
   * @enumdesc 顶部对齐, 居中对齐, 底部对齐, 第一行文字基线对齐, 未设置高度或设为auto，将占满整个容器的高度，另还需手动设置 width:100%
   * @default 'stretch'
   */
  align: _propTypes2['default'].oneOf(['top', 'center', 'bottom', 'baseline', 'stretch']),
  /**
   * (不支持IE9及以下浏览器)行内具有多余空间时的布局方式
   * @enumdesc 左对齐, 居中对齐, 右对齐, 两端对齐，列之间间距相等, 每列具有相同的左右间距，行两端间距是列间距的二分之一
   * @default 'start'
   */
  justify: _propTypes2['default'].oneOf(['start', 'center', 'end', 'space-between', 'space-around'])
}, _class.defaultProps = {
  prefix: 'next-'
}, _temp);
Row.displayName = 'Row';
exports['default'] = Row;
module.exports = exports['default'];