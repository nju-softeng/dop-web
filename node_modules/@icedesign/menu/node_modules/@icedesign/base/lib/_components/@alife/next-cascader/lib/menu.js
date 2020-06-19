'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextCheckbox = require('../../next-checkbox/lib/index.js');

var _nextCheckbox2 = _interopRequireDefault(_nextCheckbox);

var _nextUtil = require('../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

var scrollbarWidth = void 0;

var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu() {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Menu.prototype.componentDidMount = function componentDidMount() {
        this.computeMenuHeight();
        this.computeMenuWidth();

        var itemSelector = '.' + this.props.prefix + 'cascader-menu-item';
        var menu = this.refs.menu;
        var targetItem = menu.querySelector(itemSelector + '.expanded') || menu.querySelector(itemSelector + '.js-selected');
        if (targetItem) {
            menu.scrollTop = targetItem.offsetTop - Math.floor((menu.clientHeight / targetItem.clientHeight - 1) / 2) * targetItem.clientHeight;
        }
    };

    Menu.prototype.componentDidUpdate = function componentDidUpdate() {
        this.computeMenuHeight();
        this.computeMenuWidth();
    };

    Menu.prototype.computeMenuHeight = function computeMenuHeight() {
        var menu = this.refs.menu;
        var item = menu.querySelector('.' + this.props.prefix + 'cascader-menu-item');
        if (!item || !parseInt(item.clientHeight, 10)) {
            return;
        }

        menu.style.height = this.props.showItemCount * item.clientHeight + 'px';
    };

    Menu.prototype.computeMenuWidth = function computeMenuWidth() {
        var menu = this.refs.menu;
        if (typeof this.props.labelWidth === 'undefined') {
            if (scrollbarWidth === undefined) {
                scrollbarWidth = (0, _nextUtil.scrollbar)().width;
            }
            if (scrollbarWidth > 0) {
                menu.style.width = 'auto';
                if (menu.scrollHeight > menu.clientHeight) {
                    menu.style.width = menu.offsetWidth + scrollbarWidth + 'px';
                }
            }
        }
    };

    Menu.prototype.render = function render() {
        var _props = this.props,
            prefix = _props.prefix,
            children = _props.children;


        return _react2['default'].createElement(
            'div',
            { className: prefix + 'cascader-menu-wrapper' },
            _react2['default'].createElement(
                'ul',
                { className: prefix + 'cascader-menu', ref: 'menu' },
                children
            )
        );
    };

    return Menu;
}(_react.Component);

Menu.displayName = 'Menu';

var Item = function (_Component2) {
    _inherits(Item, _Component2);

    function Item(props) {
        _classCallCheck(this, Item);

        var _this2 = _possibleConstructorReturn(this, _Component2.call(this, props));

        _this2.state = {
            loading: false
        };

        _this2.handleClick = _this2.handleClick.bind(_this2);
        _this2.handleMouseEnter = _this2.handleMouseEnter.bind(_this2);
        _this2.removeLoading = _this2.removeLoading.bind(_this2);
        return _this2;
    }

    Item.prototype.addLoading = function addLoading() {
        this.setState({
            loading: true
        });
    };

    Item.prototype.removeLoading = function removeLoading() {
        this.setState({
            loading: false
        });
    };

    Item.prototype.setLoadingIfNeed = function setLoadingIfNeed(p) {
        if (p && typeof p.then === 'function') {
            this.addLoading();
            p.then(this.removeLoading)['catch'](this.removeLoading);
        }
    };

    Item.prototype.handleClick = function handleClick(e) {
        if ('onClick' in this.props) {
            this.setLoadingIfNeed(this.props.onClick(e));
        }
    };

    Item.prototype.handleMouseEnter = function handleMouseEnter(e) {
        if ('onMouseEnter' in this.props) {
            this.setLoadingIfNeed(this.props.onMouseEnter(e));
        }
    };

    Item.prototype.render = function render() {
        var _cx;

        var _props2 = this.props,
            prefix = _props2.prefix,
            className = _props2.className,
            disabled = _props2.disabled,
            selected = _props2.selected,
            expanded = _props2.expanded,
            canExpand = _props2.canExpand,
            children = _props2.children;
        var loading = this.state.loading;


        var classNames = (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, prefix + 'cascader-menu-item', true), _defineProperty(_cx, 'expanded', expanded), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, className, !!className), _cx));

        return _react2['default'].createElement(
            'li',
            { className: classNames, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter },
            selected ? _react2['default'].createElement(_nextIcon2['default'], { className: prefix + 'cascader-menu-icon-selected', type: 'select' }) : null,
            children,
            canExpand ? loading ? _react2['default'].createElement(_nextIcon2['default'], { className: prefix + 'cascader-menu-icon-loading', type: 'loading' }) : _react2['default'].createElement(_nextIcon2['default'], { className: prefix + 'cascader-menu-icon-expand', type: 'arrow-right' }) : null
        );
    };

    return Item;
}(_react.Component);

Item.displayName = 'Item';

var CheckboxItem = function (_Component3) {
    _inherits(CheckboxItem, _Component3);

    function CheckboxItem() {
        _classCallCheck(this, CheckboxItem);

        return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
    }

    CheckboxItem.prototype.stopPropagation = function stopPropagation(e) {
        e.stopPropagation();
    };

    CheckboxItem.prototype.render = function render() {
        var _props3 = this.props,
            prefix = _props3.prefix,
            disabled = _props3.disabled,
            checkable = _props3.checkable,
            checkboxDisabled = _props3.checkboxDisabled,
            checked = _props3.checked,
            indeterminate = _props3.indeterminate,
            onCheck = _props3.onCheck,
            children = _props3.children,
            others = _objectWithoutProperties(_props3, ['prefix', 'disabled', 'checkable', 'checkboxDisabled', 'checked', 'indeterminate', 'onCheck', 'children']);

        return _react2['default'].createElement(
            Item,
            _extends({ prefix: prefix, disabled: disabled }, others),
            checkable ? _react2['default'].createElement(_nextCheckbox2['default'], { className: prefix + 'cascader-menu-checkbox', disabled: disabled || checkboxDisabled, checked: checked, indeterminate: indeterminate, onChange: onCheck, onClick: this.stopPropagation }) : null,
            children
        );
    };

    return CheckboxItem;
}(_react.Component);

CheckboxItem.displayName = 'CheckboxItem';


Menu.Item = Item;
Menu.CheckboxItem = CheckboxItem;

exports['default'] = Menu;
module.exports = exports['default'];