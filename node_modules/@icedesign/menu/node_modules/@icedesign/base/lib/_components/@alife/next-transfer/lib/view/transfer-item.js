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

var _nextCheckbox = require('../../../next-checkbox/lib/index.js');

var _nextCheckbox2 = _interopRequireDefault(_nextCheckbox);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TransferItem = (_temp = _class = function (_Component) {
    _inherits(TransferItem, _Component);

    function TransferItem(props) {
        _classCallCheck(this, TransferItem);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            highlight: false
        };

        _this.getItemDOM = _this.getItemDOM.bind(_this);
        return _this;
    }

    TransferItem.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (this.props.playTransition) {
            this.addHighlightTimer = setTimeout(function () {
                _this2.setState({
                    highlight: true
                });
            }, 1);
            this.removeHighlightTimer = setTimeout(function () {
                _this2.setState({
                    highlight: false
                });
            }, 201);
        }
    };

    TransferItem.prototype.componentWillUnmount = function componentWillUnmount() {
        clearTimeout(this.addHighlightTimer);
        clearTimeout(this.removeHighlightTimer);
    };

    TransferItem.prototype.getItemDOM = function getItemDOM(ref) {
        this.item = ref;
    };

    TransferItem.prototype.render = function render() {
        var _cx;

        var _props = this.props,
            prefix = _props.prefix,
            value = _props.value,
            item = _props.item,
            onCheck = _props.onCheck;
        var highlight = this.state.highlight;

        var itemPrefix = prefix + 'transfer-panel-item';

        var classNames = (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, itemPrefix, true), _defineProperty(_cx, 'item-highlight', highlight), _defineProperty(_cx, 'disabled', item.disabled), _cx));

        return _react2['default'].createElement(
            'li',
            { className: classNames, ref: this.getItemDOM },
            _react2['default'].createElement(
                'label',
                { className: itemPrefix + '-label' },
                _react2['default'].createElement(_nextCheckbox2['default'], { checked: value.indexOf(item.value) > -1, disabled: item.disabled, onChange: onCheck.bind(this, item.value) }),
                _react2['default'].createElement(
                    'span',
                    { className: itemPrefix + '-text', title: item.label },
                    item.label
                )
            )
        );
    };

    return TransferItem;
}(_react.Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    value: _propTypes2['default'].array,
    item: _propTypes2['default'].object,
    onCheck: _propTypes2['default'].func,
    playTransition: _propTypes2['default'].bool
}, _temp);
TransferItem.displayName = 'TransferItem';
exports['default'] = TransferItem;
module.exports = exports['default'];