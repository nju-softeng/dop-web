'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _helper = require('../util/helper.js');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Group = (_temp = _class = function (_React$Component) {
    _inherits(Group, _React$Component);

    function Group(props, context) {
        _classCallCheck(this, Group);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        var prefix = context.prefix + 'navigation';

        _this.groupClassName = prefix + '-group';
        _this.titleClassName = prefix + '-group-title';
        _this.contentClassName = prefix + '-group-content';
        return _this;
    }

    Group.prototype.renderTitle = function renderTitle() {
        var title = this.props.title;


        return _react2['default'].createElement(
            'div',
            { className: this.titleClassName },
            title
        );
    };

    Group.prototype.renderChildren = function renderChildren() {
        var children = this.props.children;


        return _react2['default'].createElement(
            'ul',
            { className: this.contentClassName },
            children
        );
    };

    Group.prototype.renderContent = function renderContent() {
        var _classNames;

        var _props = this.props,
            className = _props.className,
            style = _props.style;


        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this.groupClassName, true), _defineProperty(_classNames, className, !!className), _classNames));

        return _react2['default'].createElement(
            'li',
            { className: classes, style: style },
            this.renderTitle(),
            this.renderChildren()
        );
    };

    Group.prototype.render = function render() {
        return this.renderContent();
    };

    return Group;
}(_react2['default'].Component), _class.contextTypes = _helper2['default'].propTypes, _class.propTypes = {
    className: _propTypes2['default'].string,
    title: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element]),
    children: _propTypes2['default'].any
}, _temp);
Group.displayName = 'Group';
exports['default'] = Group;
module.exports = exports['default'];