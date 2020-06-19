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

var _progressLine = require('./view/progress-line.js');

var _progressLine2 = _interopRequireDefault(_progressLine);

var _progressCircle = require('./view/progress-circle.js');

var _progressCircle2 = _interopRequireDefault(_progressCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Progress
 */
var Progress = (_temp = _class = function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    _classCallCheck(this, Progress);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Progress.prototype.render = function render() {
    var _props = this.props,
        prefix = _props.prefix,
        shape = _props.shape,
        suffix = _props.suffix,
        percent = _props.percent,
        others = _objectWithoutProperties(_props, ['prefix', 'shape', 'suffix', 'percent']);

    var newSuffix = suffix ? suffix : percent + '%';
    var newPrefix = this.context.prefix || prefix;
    var props = _extends({}, others, { percent: percent, suffix: newSuffix, prefix: newPrefix });
    return shape === 'circle' ? _react2['default'].createElement(_progressCircle2['default'], props) : _react2['default'].createElement(_progressLine2['default'], props);
  };

  return Progress;
}(_react.Component), _class.propTypes = {
  /**
   * 样式的品牌前缀
   */
  prefix: _propTypes2['default'].string,
  /**
   * 形态
   */
  shape: _propTypes2['default'].oneOf(['circle', 'line']),
  /**
   * 类型
   */
  type: _propTypes2['default'].oneOf(['normal', 'progressive']),
  /**
   * 尺寸
   */
  size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
  /**
   * 所占百分比
   */
  percent: _propTypes2['default'].number,
  /**
   * 进度条上的说明内容
   */
  suffix: _propTypes2['default'].node,
  /**
   * 是否展示内容
   */
  showInfo: _propTypes2['default'].bool,
  /**
   * 状态
   */
  state: _propTypes2['default'].oneOf(['success', 'error']),
  /**
   * 自定义样式名
   */
  className: _propTypes2['default'].string,
  /**
   * 是否开启动效
   */
  animation: _propTypes2['default'].bool
}, _class.defaultProps = {
  prefix: 'next-',
  shape: 'line',
  type: 'normal',
  size: 'medium',
  percent: 0,
  showInfo: true,
  animation: true
}, _class.contextTypes = {
  prefix: _propTypes2['default'].string
}, _temp);
Progress.displayName = 'Progress';
exports['default'] = Progress;
module.exports = exports['default'];