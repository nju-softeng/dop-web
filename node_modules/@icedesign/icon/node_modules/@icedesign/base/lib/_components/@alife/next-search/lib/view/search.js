'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextSelect = require('../../../next-select/lib/index.js');

var _nextSelect2 = _interopRequireDefault(_nextSelect);

var _nextButton = require('../../../next-button/lib/index.js');

var _nextButton2 = _interopRequireDefault(_nextButton);

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = require('../../../next-util/lib/index.js');

var _combox = require('./combox.js');

var _combox2 = _interopRequireDefault(_combox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Search */
var Search = (_temp = _class = function (_React$Component) {
    _inherits(Search, _React$Component);

    function Search(props, context) {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        var filterValue = null;

        if (props.filter && props.filter.length) {
            props.filter.forEach(function (item) {
                if (item['default']) {
                    filterValue = item.value;
                }
            });

            //如果没有指定filter默认选中项,则默认取第一个值
            if (filterValue === null) {
                filterValue = props.filter[0].value;
            }
        }

        _this.state = {
            filterValue: filterValue,
            key: _this.props.value || props.defaultValue || ''
        };
        return _this;
    }

    Search.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var filterValue = null;

        //如果filter没改变则不做改变
        if (nextProps.filter && nextProps.filter.length && this.props.filter !== nextProps.filter) {

            nextProps.filter.forEach(function (item) {
                if (item['default']) {
                    filterValue = item.value;
                }
            });

            //如果没有指定filter默认选中项,则默认取第一个值
            if (filterValue === null) {
                filterValue = nextProps.filter[0].value;
            }

            this.setState({
                filterValue: filterValue
            });
        }

        if (nextProps.hasOwnProperty('value')) {
            this.setState({
                key: nextProps.value
            });
        }
    };

    Search.prototype.onChange = function onChange(value) {
        // Not Controled
        if (!(value in this.props)) {
            this.setState({
                key: value
            });
        }
        //默认触发搜索
        //this.onSearch();

        var obj = {
            key: value,
            filter: this.state.filterValue,
            filterValue: this.state.filterValue
        };

        this.props.onSearch(obj);
    };

    Search.prototype.onInputUpdate = function onInputUpdate(value) {

        this.setState({
            key: value
        });

        this.props.onChange(value);
    };

    Search.prototype.onInputEnter = function onInputEnter() {

        //默认触发搜索
        this.onSearch();
    };

    Search.prototype.onFilter = function onFilter(value) {
        this.setState({
            filterValue: value
        });

        var obj = {
            key: this.state.key,
            filterValue: value
        };
        this.props.onFilterChange(value, obj);
    };

    Search.prototype.onSearch = function onSearch() {
        this.props.onSearch({
            filter: this.state.filterValue,
            filterValue: this.state.filterValue,
            key: this.state.key
        });
    };

    Search.prototype.onInputBlur = function onInputBlur(e) {

        var obj = {
            key: this.state.key,
            filter: this.state.filterValue,
            filterValue: this.state.filterValue
        };
        this.props.onInputBlur(e, obj);
    };

    Search.prototype.onInputFocus = function onInputFocus(e, clickByUser) {

        var obj = {
            key: this.state.key,
            filter: this.state.filterValue,
            filterValue: this.state.filterValue
        };
        this.props.onInputFocus(e, clickByUser, obj);
    };

    Search.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            filter = _props.filter,
            type = _props.type,
            searchIcon = _props.searchIcon,
            hasIcon = _props.hasIcon,
            autoWidth = _props.autoWidth,
            className = _props.className,
            style = _props.style,
            filterAutoWidth = _props.filterAutoWidth,
            others = _objectWithoutProperties(_props, ['filter', 'type', 'searchIcon', 'hasIcon', 'autoWidth', 'className', 'style', 'filterAutoWidth']);

        var size = this.props.size;
        var dataSource = this.props.dataSource;
        var searchText = this.props.searchText;
        var combox = this.props.combox;
        var overlayVisible = this.props.overlayVisible;
        var inputWidth = this.props.inputWidth;

        if (typeof searchIcon !== 'undefined') {
            hasIcon = searchIcon;
            _nextUtil.log.deprecated('searchIcon', 'hasIcon', 'Search');
        }

        // 支持从context上获取prefix
        var prefix = this.context.prefix || this.props.prefix;

        var searchCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'search', true), _defineProperty(_classNames, prefix + 'search-' + type, type), _defineProperty(_classNames, size, true), _defineProperty(_classNames, 'auto-width', autoWidth), _defineProperty(_classNames, className, className), _classNames));
        var iconCls = (0, _classnames2['default'])(_defineProperty({}, prefix + 'icon-alone', !searchText));

        var props = _extends({}, others);

        return _react2['default'].createElement(
            'div',
            { className: searchCls, style: style },
            _react2['default'].createElement(
                'div',
                { className: prefix + 'search-lt' },
                filter.length > 0 ? _react2['default'].createElement(
                    _nextSelect2['default'],
                    { shape: 'arrow-only',
                        className: 'filter',
                        autoWidth: filterAutoWidth,
                        value: this.state.filterValue,
                        onChange: this.onFilter.bind(this) },
                    filter.map(function (item, index) {
                        return _react2['default'].createElement(
                            'div',
                            { value: item.value, key: index },
                            item.text
                        );
                    })
                ) : null,
                !combox ? _react2['default'].createElement(
                    'div',
                    { className: prefix + 'search-lt-input', style: { width: inputWidth, float: 'left' } },
                    _react2['default'].createElement(_nextSelect.Combobox, _extends({}, props, {
                        shape: 'arrow-only',
                        hasArrow: false,
                        placeholder: this.props.placeholder,
                        value: this.state.key,
                        dataSource: dataSource,
                        onChange: this.onChange.bind(this),
                        onInputEnter: this.onInputEnter.bind(this),
                        onInputUpdate: this.onInputUpdate.bind(this),
                        onInputFocus: this.onInputFocus.bind(this),
                        onInputBlur: this.onInputBlur.bind(this)
                    }))
                ) : _react2['default'].createElement(_combox2['default'], _extends({}, props, {
                    overlay: combox,
                    width: inputWidth,
                    placeholder: this.props.placeholder,
                    value: this.state.key,
                    overlayVisible: overlayVisible,
                    onChange: this.onChange.bind(this),
                    onInputEnter: this.onSearch.bind(this),
                    onInputUpdate: this.onInputUpdate.bind(this),
                    onInputFocus: this.onInputFocus.bind(this),
                    onInputBlur: this.onInputBlur.bind(this)
                }))
            ),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'search-rt' },
                _react2['default'].createElement(
                    _nextButton2['default'],
                    { type: this.props.type === 'normal' ? 'normal' : 'primary', size: size,
                        onClick: this.onSearch.bind(this) },
                    hasIcon ? _react2['default'].createElement(_nextIcon2['default'], { type: 'search', className: iconCls }) : '',
                    ' ',
                    searchText
                )
            )
        );
    };

    return Search;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 大小，可选 `primary/secondary` 可选择 `medium/large`; `normal` 可选择 `small/medium`
     */
    size: _propTypes2['default'].string,
    /**
     * 前置下拉框,default为默认选中项 `[{text:'Products', value:'Products',default: true},{text:'Suppliers',valuse:'Suppliers'}]`
     */
    filter: _propTypes2['default'].array,
    searchIcon: _propTypes2['default'].bool,
    /**
     * 搜索按钮图标
     */
    hasIcon: _propTypes2['default'].bool,
    /**
     * 搜索按钮文案
     */
    searchText: _propTypes2['default'].string,
    /**
     * 定制下拉框,适合业务特殊定制
     */
    combox: _propTypes2['default'].node,
    /**
     * 搜索框宽度
     */
    inputWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 与combox配合使用,控制定制下拉框的展现
     */
    overlayVisible: _propTypes2['default'].bool,
    /**
     * 下拉提示框:历史搜索/搜索建议 `[{label:'',value:'',disabled:true}]`
     */
    dataSource: _propTypes2['default'].array,
    /**
     * 类型
     */
    type: _propTypes2['default'].oneOf(['primary', 'secondary', 'normal']),
    /**
     * 数值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 搜索框默认值 (不适用于Combox)
     */
    defaultValue: _propTypes2['default'].string,
    /**
     * 样式名称
     */
    className: _propTypes2['default'].string,
    /**
     * 默认提示
     */
    placeholder: _propTypes2['default'].string,
    /**
     * input获取焦点的时候触发的回调
     */
    onInputFocus: _propTypes2['default'].func,
    /**
     * input失去焦点的时候触发的回调
     */
    onInputBlur: _propTypes2['default'].func,
    /**
     * 点击搜索按钮触发的回调
     * @param {Object} object {filter:'',key:''}
     */
    onSearch: _propTypes2['default'].func,
    /**
     * 输入关键字时的回掉
     */
    onChange: _propTypes2['default'].func,
    /**
     * Filter改变时的回掉（filterValue）
     */
    onFilterChange: _propTypes2['default'].func,
    /**
     * 搜索框100%自适应父容器
     */
    autoWidth: _propTypes2['default'].bool,
    /**
     * filter的下拉菜单是否与选择器对齐
     */
    filterAutoWidth: _propTypes2['default'].bool,
    /**
     * 自定义样式
     */
    style: _propTypes2['default'].object,
    /**
     * 指定渲染combox的容器
     */
    container: _propTypes2['default'].node
}, _class.defaultProps = {
    prefix: 'next-',
    type: 'primary',
    size: 'medium',
    filter: [],
    dataSource: [],
    inputWidth: 'auto',
    hasIcon: true,
    combox: false,
    searchText: 'Search',
    autoWidth: false,
    filterAutoWidth: true,
    onChange: function onChange() {},
    onSearch: function onSearch() {},
    onInputFocus: function onInputFocus() {},
    onInputBlur: function onInputBlur() {},
    onFilterChange: function onFilterChange() {}
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Search.displayName = 'Search';
exports['default'] = Search;
module.exports = exports['default'];