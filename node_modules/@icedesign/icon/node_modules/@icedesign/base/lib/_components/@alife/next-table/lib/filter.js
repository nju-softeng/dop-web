'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextDropdown = require('../../next-dropdown/lib/index.js');

var _nextDropdown2 = _interopRequireDefault(_nextDropdown);

var _nextMenu = require('../../next-menu/lib/index.js');

var _nextMenu2 = _interopRequireDefault(_nextMenu);

var _nextButton = require('../../next-button/lib/index.js');

var _nextButton2 = _interopRequireDefault(_nextButton);

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// 共享状态的组件需要变成非受控组件
var Filter = (_temp = _class = function (_React$Component) {
    _inherits(Filter, _React$Component);

    function Filter(props) {
        _classCallCheck(this, Filter);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _initialiseProps.call(_this);

        var filterParams = props.filterParams || {};
        var filterConfig = filterParams[props.dataIndex] || {};
        _this.state = {
            visible: filterConfig.visible || false,
            selectedKeys: filterConfig.selectedKeys || []
        };
        _this._selectedKeys = [].concat(_toConsumableArray(_this.state.selectedKeys));
        return _this;
    }

    Filter.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty('filterParams') && typeof nextProps.filterParams !== 'undefined') {
            var dataIndex = nextProps.dataIndex || this.props.dataIndex;
            var filterParams = nextProps.filterParams || {};
            var filterConfig = filterParams[dataIndex] || {};
            var selectedKeys = filterConfig.selectedKeys || [];
            this.setState({
                selectedKeys: selectedKeys
            });
            this._selectedKeys = [].concat(_toConsumableArray(selectedKeys));
        }
    };

    Filter.prototype.render = function render() {
        var _props = this.props,
            filters = _props.filters,
            prefix = _props.prefix,
            locale = _props.locale,
            filterMode = _props.filterMode;
        var _state = this.state,
            visible = _state.visible,
            selectedKeys = _state.selectedKeys;


        var renderMenuItem = function renderMenuItem(item) {
            return _react2['default'].createElement(
                _nextMenu2['default'].Item,
                { key: item.value },
                item.label
            );
        },
            renderMenuContent = function renderMenuContent(list) {
            return list.map(function (item) {
                return renderMenuItem(item);
            });
        },
            content = filters.map(function (filter, index) {
            if (filter.children) {
                return _react2['default'].createElement(
                    _nextMenu2['default'].SubMenu,
                    { label: filter.label, key: 'popup' + index, selectable: false },
                    renderMenuContent(filter.children)
                );
            } else {
                return renderMenuItem(filter);
            }
        }),
            footer = _react2['default'].createElement(
            'div',
            { className: prefix + 'table-filter-footer' },
            _react2['default'].createElement(
                _nextButton2['default'],
                { type: 'primary', onClick: this.onFilterConfirm },
                locale.ok
            ),
            _react2['default'].createElement(
                _nextButton2['default'],
                { onClick: this.onFilterClear },
                locale.reset
            )
        );

        return _react2['default'].createElement(
            _nextDropdown2['default'],
            { trigger: _react2['default'].createElement(
                    'span',
                    { className: prefix + 'table-filter' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'filter', size: 'small' })
                ),
                triggerType: 'click',
                visible: visible,
                onVisibleChange: this.onFilterVisible },
            _react2['default'].createElement(
                _nextMenu2['default'],
                { footer: footer,
                    selectedKeys: selectedKeys,
                    selectMode: filterMode,
                    onSelect: this.onFilterSelect },
                content
            )
        );
    };

    return Filter;
}(_react2['default'].Component), _class.propTypes = {
    dataIndex: _propTypes2['default'].string,
    filters: _propTypes2['default'].array,
    filterMode: _propTypes2['default'].string,
    filterParams: _propTypes2['default'].object,
    locale: _propTypes2['default'].object,
    onFilter: _propTypes2['default'].func,
    prefix: _propTypes2['default'].string
}, _class.defaultProps = {
    onFilter: function onFilter() {}
}, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.onFilterVisible = function (visible, reason) {
        if (!reason) {
            _this2.setState({
                visible: visible
            });

            if (!visible) {
                var selectedKeys = [].concat(_toConsumableArray(_this2._selectedKeys));

                _this2.setState({
                    selectedKeys: selectedKeys
                });
            }
        }
    };

    this.onFilterSelect = function (selectedKeys) {
        _this2.setState({
            visible: true,
            selectedKeys: selectedKeys
        });
    };

    this.onFilterConfirm = function () {
        var selectedKeys = _this2.state.selectedKeys;
        var filterParams = {},
            dataIndex = _this2.props.dataIndex;

        filterParams[dataIndex] = {
            visible: false,
            selectedKeys: selectedKeys
        };
        _this2._selectedKeys = [].concat(_toConsumableArray(selectedKeys));
        _this2.setState({
            visible: false
        });
        // 兼容之前的格式
        _this2.props.onFilter(filterParams);
    };

    this.onFilterClear = function () {
        var filterParams = {},
            dataIndex = _this2.props.dataIndex;

        filterParams[dataIndex] = {
            visible: false,
            selectedKeys: []
        };
        _this2._selectedKeys = [];
        _this2.setState({
            selectedKeys: [],
            visible: false
        });
        // 兼容之前的格式
        _this2.props.onFilter(filterParams);
    };
}, _temp);
Filter.displayName = 'Filter';
exports['default'] = Filter;
module.exports = exports['default'];