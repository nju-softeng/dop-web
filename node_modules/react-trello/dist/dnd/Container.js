'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _smoothDnd = require('smooth-dnd');

var _smoothDnd2 = _interopRequireDefault(_smoothDnd);

var _Draggable = require('./Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_smoothDnd2.default.dropHandler = _smoothDnd.dropHandlers.reactDropHandler().handler;
_smoothDnd2.default.wrapChild = function (p) {
	return p;
}; // dont wrap children they will already be wrapped

var Container = function (_Component) {
	(0, _inherits3.default)(Container, _Component);

	function Container(props) {
		(0, _classCallCheck3.default)(this, Container);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).call(this, props));

		_this.getContainerOptions = _this.getContainerOptions.bind(_this);
		_this.setRef = _this.setRef.bind(_this);
		_this.prevContainer = null;
		return _this;
	}

	(0, _createClass3.default)(Container, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.containerDiv = this.containerDiv || _reactDom2.default.findDOMNode(this);
			this.prevContainer = this.containerDiv;
			this.container = (0, _smoothDnd2.default)(this.containerDiv, this.getContainerOptions(this.props));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.container.dispose();
			this.container = null;
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.containerDiv = this.containerDiv || _reactDom2.default.findDOMNode(this);
			if (this.containerDiv) {
				if (this.prevContainer && this.prevContainer !== this.containerDiv) {
					this.container.dispose();
					this.container = (0, _smoothDnd2.default)(this.containerDiv, this.getContainerOptions(this.props));
					this.prevContainer = this.containerDiv;
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.props.render) {
				return this.props.render(this.setRef);
			} else {
				return _react2.default.createElement(
					'div',
					{ style: this.props.style, ref: this.setRef },
					this.props.children
				);
			}
		}
	}, {
		key: 'setRef',
		value: function setRef(element) {
			this.containerDiv = element;
		}
	}, {
		key: 'getContainerOptions',
		value: function getContainerOptions(props) {
			return (0, _assign2.default)({}, props);
		}
	}]);
	return Container;
}(_react.Component);

Container.propTypes = {
	behaviour: _propTypes2.default.oneOf(["move", "copy", "drag-zone"]),
	groupName: _propTypes2.default.string,
	orientation: _propTypes2.default.oneOf(["horizontal", "vertical"]),
	style: _propTypes2.default.object,
	dragHandleSelector: _propTypes2.default.string,
	nonDragAreaSelector: _propTypes2.default.string,
	dragBeginDelay: _propTypes2.default.number,
	animationDuration: _propTypes2.default.number,
	autoScrollEnabled: _propTypes2.default.string,
	lockAxis: _propTypes2.default.string,
	dragClass: _propTypes2.default.string,
	dropClass: _propTypes2.default.string,
	onDragStart: _propTypes2.default.func,
	onDragEnd: _propTypes2.default.func,
	onDrop: _propTypes2.default.func,
	getChildPayload: _propTypes2.default.func,
	shouldAnimateDrop: _propTypes2.default.func,
	shouldAcceptDrop: _propTypes2.default.func,
	onDragEnter: _propTypes2.default.func,
	onDragLeave: _propTypes2.default.func,
	render: _propTypes2.default.func
};

Container.defaultProps = {
	behaviour: 'move',
	orientation: 'vertical'
};

exports.default = Container;