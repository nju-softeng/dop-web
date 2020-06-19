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

var _nextButton = require('../../../next-button/lib/index.js');

var _nextButton2 = _interopRequireDefault(_nextButton);

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextLocaleProvider = require('../../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _nextUtil = require('../../../next-util/lib/index.js');

var _transferPanel = require('./transfer-panel.js');

var _transferPanel2 = _interopRequireDefault(_transferPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Transfer
 */
var Transfer = (_temp = _class = function (_Component) {
    _inherits(Transfer, _Component);

    function Transfer(props, context) {
        _classCallCheck(this, Transfer);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var value = props.value,
            defaultValue = props.defaultValue,
            defaultLeftChecked = props.defaultLeftChecked,
            defaultRightChecked = props.defaultRightChecked,
            dataSource = props.dataSource;

        var _this$filterCheckedVa = _this.filterCheckedValue(_this.normalizeValue(defaultLeftChecked), _this.normalizeValue(defaultRightChecked), dataSource),
            left = _this$filterCheckedVa.left,
            right = _this$filterCheckedVa.right;

        _this.state = {
            value: _this.normalizeValue('value' in props ? value : defaultValue),
            leftCheckedValue: left,
            rightCheckedValue: right
        };

        _this.leftValue = _this.getLeftValue(dataSource, _this.state.value);
        return _this;
    }

    Transfer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var st = {};

        if ('value' in nextProps) {
            var value = this.normalizeValue(nextProps.value);
            st.value = value;

            this.leftValue = this.getLeftValue(nextProps.dataSource, value);
        } else {
            this.leftValue = this.getLeftValue(nextProps.dataSource, this.state.value);
        }

        var _filterCheckedValue = this.filterCheckedValue(this.state.leftCheckedValue, this.state.rightCheckedValue, nextProps.dataSource),
            left = _filterCheckedValue.left,
            right = _filterCheckedValue.right;

        st.leftCheckedValue = left;
        st.rightCheckedValue = right;

        this.setState(st);
    };

    Transfer.prototype.normalizeValue = function normalizeValue(value) {
        if (value) {
            if (Array.isArray(value)) {
                return value;
            }

            return [value];
        }

        return [];
    };

    Transfer.prototype.filterCheckedValue = function filterCheckedValue(left, right, dataSource) {
        var result = {
            left: [],
            right: []
        };

        if (left.length || right.length) {
            var value = dataSource.map(function (item) {
                return item.value;
            });
            value.forEach(function (itemValue) {
                if (left.indexOf(itemValue) > -1) {
                    result.left.push(itemValue);
                } else if (right.indexOf(itemValue) > -1) {
                    result.right.push(itemValue);
                }
            });
        }

        return result;
    };

    Transfer.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    Transfer.prototype.getLeftValue = function getLeftValue(dataSource, value) {
        return dataSource.map(function (item) {
            return item.value;
        }).filter(function (itemValue) {
            return value.indexOf(itemValue) === -1;
        });
    };

    Transfer.prototype.groupDatasource = function groupDatasource(value, itemValues, dataSource) {
        return value.reduce(function (ret, itemValue) {
            var index = itemValues.indexOf(itemValue);
            if (index > -1) {
                ret.push(dataSource[index]);
            }
            return ret;
        }, []);
    };

    Transfer.prototype.handlePanelChange = function handlePanelChange(position, value) {
        var valuePropName = position === 'left' ? 'leftCheckedValue' : 'rightCheckedValue';
        this.setState(_defineProperty({}, valuePropName, value));
    };

    Transfer.prototype.handleMoveItem = function handleMoveItem(direction) {
        var _this2 = this;

        var rightValue = void 0;
        var leftValue = void 0;
        var movedValue = void 0;
        var valuePropName = void 0;

        var dataSource = this.props.dataSource;
        var _state = this.state,
            value = _state.value,
            leftCheckedValue = _state.leftCheckedValue,
            rightCheckedValue = _state.rightCheckedValue;


        if (direction === 'right') {
            rightValue = leftCheckedValue.concat(value);
            leftValue = this.leftValue.filter(function (itemValue) {
                return leftCheckedValue.indexOf(itemValue) === -1;
            });
            movedValue = leftCheckedValue;
            valuePropName = 'leftCheckedValue';
        } else {
            rightValue = value.filter(function (itemValue) {
                return rightCheckedValue.indexOf(itemValue) === -1;
            });
            leftValue = rightCheckedValue.concat(this.leftValue);
            movedValue = rightCheckedValue;
            valuePropName = 'rightCheckedValue';
        }

        var st = _defineProperty({}, valuePropName, []);
        if (!('value' in this.props)) {
            st.value = rightValue;
        }
        this.setState(st, function () {
            if ('onChange' in _this2.props) {
                var itemValues = dataSource.map(function (item) {
                    return item.value;
                });
                var rightData = _this2.groupDatasource(rightValue, itemValues, dataSource);
                var leftData = _this2.groupDatasource(_this2.leftValue, itemValues, dataSource);
                var movedData = _this2.groupDatasource(movedValue, itemValues, dataSource);

                _this2.props.onChange(rightValue, rightData, {
                    leftValue: leftValue,
                    leftData: leftData,
                    movedValue: movedValue,
                    movedData: movedData,
                    direction: direction
                });
            }
        });
        this.leftValue = leftValue;
    };

    Transfer.prototype.render = function render() {
        var prefix = this.getPrefix();
        var _props = this.props,
            className = _props.className,
            dataSource = _props.dataSource,
            locale = _props.locale,
            showSearch = _props.showSearch,
            searchPlaceholder = _props.searchPlaceholder,
            titles = _props.titles,
            operations = _props.operations,
            listStyle = _props.listStyle;
        var _state2 = this.state,
            value = _state2.value,
            leftCheckedValue = _state2.leftCheckedValue,
            rightCheckedValue = _state2.rightCheckedValue;

        var itemValues = dataSource.map(function (item) {
            return item.value;
        });
        var leftDatasource = this.groupDatasource(this.leftValue, itemValues, dataSource);
        var rightDatasource = this.groupDatasource(value, itemValues, dataSource);
        var panelProps = {
            prefix: prefix,
            locale: locale,
            showSearch: showSearch,
            searchPlaceholder: searchPlaceholder,
            listStyle: listStyle
        };
        var others = (0, _nextUtil.pickOthers)(Transfer, this.props);

        return _react2['default'].createElement(
            'div',
            _extends({ className: (0, _classnames2['default'])(prefix + 'transfer', className) }, others),
            _react2['default'].createElement(_transferPanel2['default'], _extends({}, panelProps, { dataSource: leftDatasource, value: leftCheckedValue, title: titles[0], onChange: this.handlePanelChange.bind(this, 'left') })),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'transfer-operations' },
                _react2['default'].createElement(
                    _nextButton2['default'],
                    { className: prefix + 'transfer-operation', type: leftCheckedValue.length ? 'primary' : 'normal', disabled: !leftCheckedValue.length, onClick: this.handleMoveItem.bind(this, 'right') },
                    operations[0]
                ),
                _react2['default'].createElement(
                    _nextButton2['default'],
                    { className: prefix + 'transfer-operation', type: rightCheckedValue.length ? 'primary' : 'normal', disabled: !rightCheckedValue.length, onClick: this.handleMoveItem.bind(this, 'left') },
                    operations[1]
                )
            ),
            _react2['default'].createElement(_transferPanel2['default'], _extends({}, panelProps, { dataSource: rightDatasource, value: rightCheckedValue, title: titles[1], onChange: this.handlePanelChange.bind(this, 'right') }))
        );
    };

    return Transfer;
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
     * 数据源
     */
    dataSource: _propTypes2['default'].arrayOf(_propTypes2['default'].object),
    /**
     * （用于受控）当前值
     */
    value: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * （用于非受控）初始值
     */
    defaultValue: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * 值发生改变的时候触发的回调函数
     * @param {Array} value 右面板值
     * @param {Array} data 右面板数据
     * @param {Object} extra 额外参数
     * @param {Array} extra.leftValue 左面板值
     * @param {Array} extra.leftData 左面板数据
     * @param {Array} extra.movedValue 发生移动的值
     * @param {Object} extra.movedData 发生移动的数据
     * @param {String} extra.direction 移动的方向，值为'left'或'right'
     */
    onChange: _propTypes2['default'].func,
    /**
     * 是否显示搜索框
     */
    showSearch: _propTypes2['default'].bool,
    /**
     * 搜索框占位符
     */
    searchPlaceholder: _propTypes2['default'].string,
    /**
     * 左右面板标题
     */
    titles: _propTypes2['default'].arrayOf(_propTypes2['default'].node),
    /**
     * 向右向左移动按钮显示内容
     */
    operations: _propTypes2['default'].arrayOf(_propTypes2['default'].node),
    /**
     * 左面板默认选中值
     */
    defaultLeftChecked: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * 右面板默认选中值
     */
    defaultRightChecked: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * 左右面板列表自定义样式
     */
    listStyle: _propTypes2['default'].object,
    /**
     * 自定义国际化文案对象
     */
    locale: _propTypes2['default'].object,
    /**
     * 自定义国际化语言
     */
    language: _propTypes2['default'].oneOf(['zh-cn', 'en-us', 'zh-tw'])
}, _class.defaultProps = {
    prefix: 'next-',
    dataSource: [],
    defaultValue: [],
    showSearch: false,
    searchPlaceholder: 'Search',
    titles: [],
    // eslint-disable-next-line
    operations: [_react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-right' }), _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-left' })],
    defaultLeftChecked: [],
    defaultRightChecked: []
}, _temp);
Transfer.displayName = 'Transfer';
exports['default'] = (0, _nextLocaleProvider2['default'])(Transfer);
module.exports = exports['default'];