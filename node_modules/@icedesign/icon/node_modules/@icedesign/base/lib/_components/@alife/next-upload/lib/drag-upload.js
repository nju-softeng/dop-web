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

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _fileUpload = require('./file-upload.js');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Upload.DragUpload
 * @order 2
 * @description IE10+ 支持。继承 Upload 的 API，除非特别说明
 */
var DragUpload = (_temp = _class = function (_React$Component) {
    _inherits(DragUpload, _React$Component);

    function DragUpload(props) {
        _classCallCheck(this, DragUpload);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            dragOver: props.dragOver || false,
            listEmpty: true,
            fileLen: 0,
            dataTransfer: null
        };

        /* eslint-disable */
        ['onFileDrop', 'onListChange', 'dropEnd'].map(function (fn) {
            _this[fn] = _this[fn].bind(_this);
        });
        /* eslint-enable */
        return _this;
    }

    DragUpload.prototype.componentDidMount = function componentDidMount() {
        this.onListChange(this.props.defaultFileList || []);
    };

    /**
     * 控制拖拽状态
     */


    DragUpload.prototype.onFileDrop = function onFileDrop(e) {
        var _props = this.props,
            onDragOver = _props.onDragOver,
            onDrop = _props.onDrop;


        if (e.type === 'dragover') {
            this.setState({
                dragOver: true
            });
            onDragOver && onDragOver();
        } else if (e.type === 'drop') {
            var transFiles = void 0;
            if ('limit' in this.props) {
                transFiles = this.props.limit > this.state.fileLen ? e.dataTransfer.files : null;
            } else {
                transFiles = e.dataTransfer.files;
            }
            this.setState({
                dragOver: false,
                dataTransfer: transFiles
            });
            onDrop && onDrop(e.dataTransfer.files);
        } else {
            this.setState({
                dragOver: false
            });
        }

        e.preventDefault();
    };

    /**
     * `drop`类型事件触发后重置拖拽状态及清空传递的数据，防止子组件中`nextProps`继续获取重复数据
     */


    DragUpload.prototype.dropEnd = function dropEnd() {
        this.setState({
            dragOver: false,
            dataTransfer: null
        });
    };

    /**
     * 当上传列表不为空时，不需要展示拖拽提示文案
     */


    DragUpload.prototype.onListChange = function onListChange(fileList) {
        this.setState({
            listEmpty: !fileList.length,
            fileLen: fileList.length
        });
    };

    DragUpload.prototype.render = function render() {
        var _classNames, _classNames2, _classNames3;

        var _props2 = this.props,
            className = _props2.className,
            style = _props2.style,
            locale = _props2.locale,
            others = _objectWithoutProperties(_props2, ['className', 'style', 'locale']);

        var prefix = this.context.prefix || this.props.prefix;
        var prefixCls = prefix + 'upload-drag';

        return _react2['default'].createElement(
            'div',
            {
                className: (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, '' + prefixCls, true), _defineProperty(_classNames, prefixCls + '-over', this.state.dragOver), _defineProperty(_classNames, className, !!className), _classNames)),
                style: style,
                onDrop: this.onFileDrop,
                onDragOver: this.onFileDrop,
                onDragLeave: this.onFileDrop
            },
            _react2['default'].createElement(
                _fileUpload2['default'],
                _extends({}, others, {
                    prefix: prefix,
                    locale: locale,
                    listType: 'picture-card',
                    showUploadList: true,
                    dragable: false,
                    style: { zIndex: 1 },
                    dataTransfer: this.state.dataTransfer,
                    onListChange: this.onListChange,
                    dropEnd: this.dropEnd
                }),
                _react2['default'].createElement(_nextIcon2['default'], { type: 'add', size: 'large' }),
                _react2['default'].createElement(
                    'div',
                    { className: 'next-upload-text' },
                    locale.image.addPhoto
                )
            ),
            _react2['default'].createElement(
                'span',
                { className: (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-tips', true), _defineProperty(_classNames2, prefixCls + '-tips-hide', !this.state.listEmpty || this.state.dragOver), _classNames2)) },
                locale.drag.dragTips
            ),
            _react2['default'].createElement(
                'div',
                { className: (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, prefixCls + '-tips-over', true), _defineProperty(_classNames3, prefixCls + '-tips-hide', !this.state.listEmpty || !this.state.dragOver), _classNames3)) },
                _react2['default'].createElement(
                    'span',
                    null,
                    locale.drag.dropTips
                )
            )
        );
    };

    return DragUpload;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    locale: _propTypes2['default'].object,
    language: _propTypes2['default'].string,
    dragOver: _propTypes2['default'].bool,
    /**
     * 可选参数，拖拽到达拖拽区域回调函数
     */
    onDragOver: _propTypes2['default'].func,
    /**
     * 可选参数，拖拽释放回调函数，参数为拖拽的文件
     */
    onDrop: _propTypes2['default'].func,
    limit: _propTypes2['default'].number,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    defaultFileList: _propTypes2['default'].array
}, _class.defaultProps = {
    prefix: 'next-'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
DragUpload.displayName = 'DragUpload';
exports['default'] = (0, _nextLocaleProvider2['default'])(DragUpload);
module.exports = exports['default'];