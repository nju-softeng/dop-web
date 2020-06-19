'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _smoothDnd = require('smooth-dnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapperClass = _smoothDnd.constants.wrapperClass;

var Draggable = function (_Component) {
	(0, _inherits3.default)(Draggable, _Component);

	function Draggable() {
		(0, _classCallCheck3.default)(this, Draggable);
		return (0, _possibleConstructorReturn3.default)(this, (Draggable.__proto__ || (0, _getPrototypeOf2.default)(Draggable)).apply(this, arguments));
	}

	(0, _createClass3.default)(Draggable, [{
		key: 'render',
		value: function render() {
			if (this.props.render) {
				return _react2.default.cloneElement(this.props.render(), { className: wrapperClass });
			}

			var clsName = '' + (this.props.className ? this.props.className + ' ' : '');
			return _react2.default.createElement(
				'div',
				(0, _extends3.default)({}, this.props, { className: '' + clsName + wrapperClass }),
				this.props.children
			);
		}
	}]);
	return Draggable;
}(_react.Component);

Draggable.propTypes = {
	render: _propTypes2.default.func
};

exports.default = Draggable;