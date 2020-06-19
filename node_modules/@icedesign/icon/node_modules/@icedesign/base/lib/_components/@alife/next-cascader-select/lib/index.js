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

var _nextSelect = require('../../next-select/lib/index.js');

var _nextSelect2 = _interopRequireDefault(_nextSelect);

var _nextCascader = require('../../next-cascader/lib/index.js');

var _nextCascader2 = _interopRequireDefault(_nextCascader);

var _nextUtil = require('../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * CascaderSelect
 */
var CascaderSelect = (_temp = _class = function (_Component) {
    _inherits(CascaderSelect, _Component);

    function CascaderSelect(props, context) {
        _classCallCheck(this, CascaderSelect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            value: 'value' in props ? props.value : props.defaultValue,
            visible: props.defaultVisible
        };
        ['handleVisibleChange', 'handleChange', 'handleRemove'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        return _this;
    }

    CascaderSelect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    };

    CascaderSelect.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    CascaderSelect.prototype.normalizeValue = function normalizeValue(value) {
        if (value) {
            if (Array.isArray(value)) {
                return value;
            }

            return [value];
        }

        return [];
    };

    CascaderSelect.prototype.updateCache = function updateCache(dataSource) {
        var _this2 = this;

        this._v2n = {};
        this._p2n = {};
        var loop = function loop(data) {
            var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
            return data.forEach(function (item, index) {
                var value = item.value,
                    children = item.children;

                var pos = prefix + '-' + index;
                _this2._v2n[value] = _this2._p2n[pos] = _extends({}, item, { pos: pos });

                if (children && children.length) {
                    loop(children, pos);
                }
            });
        };

        loop(dataSource);
    };

    CascaderSelect.prototype.flatValue = function flatValue(value) {
        var _this3 = this;

        var getDepth = function getDepth(v) {
            return _this3.getPos(v).split('-').length;
        };
        var newValue = value.slice(0).sort(function (prev, next) {
            return getDepth(prev) - getDepth(next);
        });

        for (var i = 0; i < newValue.length; i++) {
            for (var j = 0; j < newValue.length; j++) {
                if (i !== j && this.isDescendantOrSelf(this.getPos(newValue[i]), this.getPos(newValue[j]))) {
                    newValue.splice(j, 1);
                    j--;
                }
            }
        }

        return newValue;
    };

    CascaderSelect.prototype.isDescendantOrSelf = function isDescendantOrSelf(currentPos, targetPos) {
        if (!currentPos || !targetPos) {
            return false;
        }

        var currentNums = currentPos.split('-');
        var targetNums = targetPos.split('-');

        return currentNums.length <= targetNums.length && currentNums.every(function (num, index) {
            return num === targetNums[index];
        });
    };

    CascaderSelect.prototype.getValue = function getValue(pos) {
        return this._p2n[pos] ? this._p2n[pos].value : null;
    };

    CascaderSelect.prototype.getPos = function getPos(value) {
        return this._v2n[value] ? this._v2n[value].pos : null;
    };

    CascaderSelect.prototype.getData = function getData(value) {
        var _this4 = this;

        return value.map(function (v) {
            return _this4._v2n[v];
        });
    };

    CascaderSelect.prototype.getSignleData = function getSignleData(value) {
        var _this5 = this;

        if (!value.length) {
            return null;
        }

        var data = this._v2n[value];
        if (!data) {
            return null;
        }

        var nums = data.pos.split('-');
        var label = nums.slice(1).reduce(function (ret, num, index) {
            var p = nums.slice(0, index + 2).join('-');
            ret.push(_this5._p2n[p].label);
            return ret;
        }, []);

        return _extends({}, data, {
            label: this.props.displayRender(label, data)
        });
    };

    CascaderSelect.prototype.getMultipleData = function getMultipleData(value) {
        var _this6 = this;

        var _props = this.props,
            checkStrictly = _props.checkStrictly,
            canOnlyCheckLeaf = _props.canOnlyCheckLeaf,
            dataSource = _props.dataSource;

        var newValue = void 0;
        if (checkStrictly || canOnlyCheckLeaf) {
            newValue = value;
        } else {
            var filterValue = value.filter(function (v) {
                return typeof _this6._v2n[v] !== 'undefined';
            });
            newValue = this.flatValue(filterValue);

            var childChecked = function childChecked(child) {
                return newValue.indexOf(child.value) > -1;
            };
            var removeValue = function removeValue(child) {
                return newValue.splice(newValue.indexOf(child.value), 1);
            };
            var addParentValue = function addParentValue(i, parent) {
                return newValue.splice(i, 0, parent.value);
            };
            for (var i = 0; i < newValue.length; i++) {
                var pos = this.getPos(newValue[i]);
                var nums = pos.split('-');
                if (nums.length === 2) {
                    break;
                }
                for (var j = nums.length - 2; j > 0; j--) {
                    var parent = nums.slice(1, j + 1).reduce(function (ret, num) {
                        return ret.children[num];
                    }, { children: dataSource });
                    var parentChecked = parent.children.every(childChecked);
                    if (parentChecked) {
                        parent.children.forEach(removeValue);
                        addParentValue(i, parent);
                    } else {
                        break;
                    }
                }
            }
        }

        return this.getData(newValue);
    };

    CascaderSelect.prototype.getIndeterminate = function getIndeterminate(value) {
        var _this7 = this;

        var indeterminate = [];

        var positions = value.map(this.getPos.bind(this));
        positions.forEach(function (pos) {
            var nums = pos.split('-');
            for (var i = nums.length; i > 2; i--) {
                var parentPos = nums.slice(0, i - 1).join('-');
                var parentValue = _this7.getValue(parentPos);
                if (indeterminate.indexOf(parentValue) === -1) {
                    indeterminate.push(parentValue);
                }
            }
        });

        return indeterminate;
    };

    CascaderSelect.prototype.completeValue = function completeValue(value) {
        var newValue = [];

        var flatValue = this.flatValue(value).reverse();
        if (flatValue.length) {
            var ps = Object.keys(this._p2n);
            for (var i = 0; i < ps.length; i++) {
                for (var j = 0; j < flatValue.length; j++) {
                    var v = flatValue[j];
                    if (this.isDescendantOrSelf(this.getPos(v), ps[i])) {
                        newValue.push(this.getValue(ps[i]));
                        ps.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }

        return newValue;
    };

    CascaderSelect.prototype.isLeaf = function isLeaf(data) {
        return !(data.children && data.children.length || !!this.props.loadData && !data.isLeaf);
    };

    CascaderSelect.prototype.handleVisibleChange = function handleVisibleChange(visible) {
        this.setState({
            visible: visible
        });
    };

    CascaderSelect.prototype.handleChange = function handleChange(value, data, extra) {
        var _props2 = this.props,
            multiple = _props2.multiple,
            changeOnSelect = _props2.changeOnSelect,
            onChange = _props2.onChange;


        var st = {};
        if (!multiple && (!changeOnSelect || this.isLeaf(data))) {
            st.visible = !this.state.visible;
        }
        if (!('value' in this.props)) {
            st.value = value;
        }
        if (Object.keys(st).length) {
            this.setState(st);
        }

        if (onChange) {
            onChange(value, data, extra);
        }
    };

    CascaderSelect.prototype.handleRemove = function handleRemove(value) {
        value = this.normalizeValue(value);

        if ('onChange' in this.props) {
            var _props3 = this.props,
                multiple = _props3.multiple,
                checkStrictly = _props3.checkStrictly,
                onChange = _props3.onChange;

            if (multiple) {
                var currentValue = void 0;
                for (var i = 0; i < this.state.value.length; i++) {
                    if (value.indexOf(this.state.value[i]) === -1) {
                        currentValue = this.state.value[i];
                        break;
                    }
                }
                var currentData = this._v2n[currentValue];
                var data = this.getData(value);
                var checked = false;

                if (checkStrictly) {
                    this.props.onChange(value, data, {
                        checked: checked,
                        currentData: currentData,
                        checkedData: data
                    });
                } else {
                    var checkedValue = this.completeValue(value);
                    var checkedData = this.getData(checkedValue);
                    var indeterminateValue = this.getIndeterminate(value);
                    var indeterminateData = this.getData(indeterminateValue);
                    this.props.onChange(value, data, {
                        checked: checked,
                        currentData: currentData,
                        checkedData: checkedData,
                        indeterminateData: indeterminateData
                    });
                }
            } else {
                onChange(null, null);
            }
        }

        if (!('value' in this.props)) {
            this.setState({
                value: value
            });
        }
    };

    CascaderSelect.prototype.renderOverlay = function renderOverlay() {
        var prefix = this.getPrefix();
        var cascaderSelectPrefix = prefix + 'cascader-select-';
        var _props4 = this.props,
            dataSource = _props4.dataSource,
            multiple = _props4.multiple,
            defaultExpandedValue = _props4.defaultExpandedValue,
            expandTrigger = _props4.expandTrigger,
            checkStrictly = _props4.checkStrictly,
            labelWidth = _props4.labelWidth,
            showItemCount = _props4.showItemCount,
            changeOnSelect = _props4.changeOnSelect,
            canOnlyCheckLeaf = _props4.canOnlyCheckLeaf,
            loadData = _props4.loadData;
        var value = this.state.value;


        return _react2['default'].createElement(
            'div',
            { className: cascaderSelectPrefix + 'dropdown' },
            _react2['default'].createElement(_nextCascader2['default'], { value: value,
                dataSource: dataSource,
                onChange: this.handleChange,
                multiple: multiple,
                canOnlySelectLeaf: !changeOnSelect,
                canOnlyCheckLeaf: canOnlyCheckLeaf,
                defaultExpandedValue: defaultExpandedValue,
                expandTrigger: expandTrigger,
                checkStrictly: checkStrictly,
                labelWidth: labelWidth,
                showItemCount: showItemCount,
                loadData: loadData,
                setCascaderInnerWidth: false })
        );
    };

    CascaderSelect.prototype.render = function render() {
        var prefix = this.getPrefix();
        var _props5 = this.props,
            size = _props5.size,
            shape = _props5.shape,
            placeholder = _props5.placeholder,
            dataSource = _props5.dataSource,
            disabled = _props5.disabled,
            hasArrow = _props5.hasArrow,
            hasClear = _props5.hasClear,
            popupClassName = _props5.popupClassName,
            multiple = _props5.multiple,
            className = _props5.className,
            style = _props5.style,
            container = _props5.container;
        var _state = this.state,
            value = _state.value,
            visible = _state.visible;

        var others = (0, _nextUtil.pickOthers)(CascaderSelect, this.props);
        var overlay = this.renderOverlay();

        this.updateCache(dataSource);
        var normalizedValue = this.normalizeValue(value);

        return _react2['default'].createElement(_nextSelect2['default'], _extends({ prefix: prefix,
            className: className,
            style: style,
            size: size,
            shape: shape,
            placeholder: placeholder,
            disabled: disabled,
            hasArrow: hasArrow,
            hasClear: hasClear,
            popupClassName: popupClassName,
            multiple: multiple,
            value: multiple ? this.getMultipleData(normalizedValue) : this.getSignleData(normalizedValue),
            onChange: this.handleRemove,
            visible: visible,
            onVisibleChange: this.handleVisibleChange,
            overlay: overlay,
            container: container
        }, others));
    };

    return CascaderSelect;
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
     * 选择框大小
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 选择框形状
     */
    shape: _propTypes2['default'].oneOf(['normal', 'arrow-only']),
    /**
     * 选择框占位符
     */
    placeholder: _propTypes2['default'].string,
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否显示右侧的箭头
     */
    hasArrow: _propTypes2['default'].bool,
    /**
     * 是否显示清空按钮，该按钮可以清空当前选中的值，该属性仅在单选模式下有效
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 数据源，结构可参考下方说明
     */
    dataSource: _propTypes2['default'].arrayOf(_propTypes2['default'].object),
    /**
     * （非受控）默认值
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * （受控）当前值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * 选中值改变时触发的回调函数
     * @param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组
     * @param {Object|Array} data 选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点
     * @param {Object} extra 额外参数
     * @param {Array} extra.selectedPath 单选时选中的数据的路径
     * @param {Boolean} extra.checked 多选时当前的操作是选中还是取消选中
     * @param {Object} extra.currentData 多选时当前操作的数据
     * @param {Array} extra.checkedData 多选时所有被选中的数据
     * @param {Array} extra.indeterminateData 多选时半选的数据
     */
    onChange: _propTypes2['default'].func,
    /**
     * 初始下拉框是否显示
     */
    defaultVisible: _propTypes2['default'].bool,
    /**
     * 默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置
     */
    defaultExpandedValue: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * 展开触发的方式
     */
    expandTrigger: _propTypes2['default'].oneOf(['click', 'hover']),
    /**
     * 是否多选
     */
    multiple: _propTypes2['default'].bool,
    /**
     * 是否选中即发生改变, 该属性仅在单选模式下有效
     */
    changeOnSelect: _propTypes2['default'].bool,
    /**
     * 是否只能勾选叶子项的checkbox，该属性仅在多选模式下有效
     */
    canOnlyCheckLeaf: _propTypes2['default'].bool,
    /**
     * 父子节点是否选中不关联
     */
    checkStrictly: _propTypes2['default'].bool,
    /**
     * 文字区域宽度，当文字超过宽度时，结尾会以省略号显示，默认值为文字实际宽度
     */
    labelWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 每一列展示的个数
     */
    showItemCount: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 选择框单选时展示结果的函数
     * @param {Array} label 选中路径的文本数组
     * @return {ReactNode} 渲染在选择框中的内容
     */
    displayRender: _propTypes2['default'].func,
    /**
     * 下拉框样式自定义类名
     */
    popupClassName: _propTypes2['default'].string,
    /**
     * 下拉框挂载的容器节点
     */
    container: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
    /**
     * 异步加载数据函数
     * @param {Object} data 当前点击异步加载的数据
     */
    loadData: _propTypes2['default'].func
}, _class.defaultProps = {
    prefix: 'next-',
    size: 'medium',
    shape: 'normal',
    disabled: false,
    hasArrow: true,
    hasClear: false,
    dataSource: [],
    defaultValue: null,
    defaultVisible: false,
    expandTrigger: 'click',
    multiple: false,
    changeOnSelect: false,
    canOnlyCheckLeaf: false,
    checkStrictly: false,
    showItemCount: 6,
    displayRender: function displayRender(label) {
        return label.join(' / ');
    }
}, _temp);
CascaderSelect.displayName = 'CascaderSelect';
exports['default'] = CascaderSelect;
module.exports = exports['default'];