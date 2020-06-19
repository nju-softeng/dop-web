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

var _nextInput = require('../../../next-input/lib/index.js');

var _nextInput2 = _interopRequireDefault(_nextInput);

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _transferItem = require('./transfer-item.js');

var _transferItem2 = _interopRequireDefault(_transferItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TransferPanel = (_temp = _class = function (_Component) {
    _inherits(TransferPanel, _Component);

    function TransferPanel(props, context) {
        _classCallCheck(this, TransferPanel);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            searchedValue: ''
        };

        _this.handleAllCheck = _this.handleAllCheck.bind(_this);
        _this.getListContainerDOM = _this.getListContainerDOM.bind(_this);
        _this.handleSearch = _this.handleSearch.bind(_this);
        _this.firstRender = true;
        return _this;
    }

    TransferPanel.prototype.componentDidMount = function componentDidMount() {
        this.firstRender = false;
    };

    TransferPanel.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (prevProps.dataSource.length !== this.props.dataSource.length) {
            if (this.listContainer.scrollTop > 0) {
                this.listContainer.scrollTop = 0;
            }
        }
    };

    TransferPanel.prototype.getListContainerDOM = function getListContainerDOM(ref) {
        this.listContainer = ref;
    };

    TransferPanel.prototype.isSearched = function isSearched(label, searchedValue) {
        var labelString = '';
        var loop = function loop(arg) {
            if (_react2['default'].isValidElement(arg) && arg.props.children) {
                _react2['default'].Children.forEach(arg.props.children, loop);
            } else if (typeof arg === 'string') {
                labelString += arg;
            }
        };
        loop(label);

        if (labelString.length >= searchedValue.length && labelString.indexOf(searchedValue) > -1) {
            return true;
        }

        return false;
    };

    TransferPanel.prototype.handleAllCheck = function handleAllCheck(allChecked) {
        var onChange = this.props.onChange;


        var newValue = void 0;
        if (allChecked) {
            newValue = this.enabledDatasource.map(function (item) {
                return item.value;
            });
        } else {
            newValue = [];
        }

        onChange && onChange(newValue);
    };

    TransferPanel.prototype.handleCheck = function handleCheck(itemValue, checked) {
        var _props = this.props,
            value = _props.value,
            onChange = _props.onChange;


        var newValue = [].concat(_toConsumableArray(value));
        var index = value.indexOf(itemValue);
        if (checked && index === -1) {
            newValue.push(itemValue);
        } else if (!checked && index > -1) {
            newValue.splice(index, 1);
        }

        onChange && onChange(newValue);
    };

    TransferPanel.prototype.handleSearch = function handleSearch(searchedValue) {
        this.setState({
            searchedValue: searchedValue
        });
    };

    TransferPanel.prototype.renderHeader = function renderHeader() {
        var _props2 = this.props,
            prefix = _props2.prefix,
            locale = _props2.locale,
            title = _props2.title,
            value = _props2.value,
            dataSource = _props2.dataSource;

        var checkedCount = value.length;
        var totalCount = dataSource.length;
        var totalEnabledCount = this.enabledDatasource.length;
        var checked = checkedCount > 0 && checkedCount >= totalEnabledCount;
        var indeterminate = checkedCount > 0 && checkedCount < totalEnabledCount;
        var items = totalCount > 1 ? locale.items : locale.item;
        var countLabel = checkedCount === 0 ? totalCount + ' ' + items : checkedCount + '/' + totalCount + ' ' + items;

        return _react2['default'].createElement(
            'div',
            { className: prefix + 'transfer-panel-header' },
            _react2['default'].createElement(_nextCheckbox2['default'], { checked: checked, indeterminate: indeterminate, onChange: this.handleAllCheck }),
            _react2['default'].createElement(
                'span',
                { className: prefix + 'transfer-panel-count' },
                countLabel
            ),
            title ? _react2['default'].createElement(
                'span',
                { className: prefix + 'transfer-panel-title' },
                title
            ) : null
        );
    };

    TransferPanel.prototype.renderSearch = function renderSearch() {
        var _props3 = this.props,
            prefix = _props3.prefix,
            searchPlaceholder = _props3.searchPlaceholder;

        return _react2['default'].createElement(
            'div',
            { className: prefix + 'transfer-panel-search' },
            _react2['default'].createElement(_nextIcon2['default'], { type: 'search', size: 'xs' }),
            _react2['default'].createElement(_nextInput2['default'], { placeholder: searchPlaceholder, onChange: this.handleSearch })
        );
    };

    TransferPanel.prototype.renderList = function renderList(dataSource) {
        var _this2 = this;

        var _props4 = this.props,
            prefix = _props4.prefix,
            value = _props4.value,
            listStyle = _props4.listStyle;

        return _react2['default'].createElement(
            'div',
            { className: prefix + 'transfer-panel-list', style: listStyle, ref: this.getListContainerDOM },
            _react2['default'].createElement(
                'ul',
                { className: prefix + 'transfer-panel-list-content' },
                dataSource.map(function (item) {
                    return _react2['default'].createElement(_transferItem2['default'], { key: item.value, prefix: prefix, value: value, item: item, onCheck: _this2.handleCheck.bind(_this2), playTransition: !_this2.firstRender });
                })
            )
        );
    };

    TransferPanel.prototype.render = function render() {
        var _this3 = this;

        var _props5 = this.props,
            prefix = _props5.prefix,
            showSearch = _props5.showSearch;
        var searchedValue = this.state.searchedValue;

        var dataSource = this.props.dataSource;
        this.enabledDatasource = dataSource.filter(function (item) {
            return !item.disabled;
        });
        if (showSearch && searchedValue) {
            dataSource = dataSource.filter(function (item) {
                return _this3.isSearched(item.label, searchedValue);
            });
        }

        return _react2['default'].createElement(
            'div',
            { className: prefix + 'transfer-panel' },
            this.renderHeader(),
            showSearch ? this.renderSearch() : null,
            this.renderList(dataSource)
        );
    };

    return TransferPanel;
}(_react.Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    dataSource: _propTypes2['default'].array,
    value: _propTypes2['default'].array,
    onChange: _propTypes2['default'].func,
    locale: _propTypes2['default'].object,
    title: _propTypes2['default'].string,
    showSearch: _propTypes2['default'].bool,
    searchPlaceholder: _propTypes2['default'].string,
    listStyle: _propTypes2['default'].object
}, _temp);
TransferPanel.displayName = 'TransferPanel';
exports['default'] = TransferPanel;
module.exports = exports['default'];