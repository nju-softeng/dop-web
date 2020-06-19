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

var _nextProgress = require('../../next-progress/lib/index.js');

var _nextProgress2 = _interopRequireDefault(_nextProgress);

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _index = require('./util/index.js');

var util = _interopRequireWildcard(_index);

var _util = require('./util/index.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/** Upload.List */
var UploadList = (_temp = _class = function (_Component) {
    _inherits(UploadList, _Component);

    function UploadList() {
        _classCallCheck(this, UploadList);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    UploadList.prototype.componentDidUpdate = function componentDidUpdate() {
        var _this2 = this;

        if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
            return;
        }
        this.props.fileList.forEach(function (file) {
            if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File) || file.thumbUrl !== undefined) {
                return;
            }
            file.thumbUrl = '';
            util.readFileAsDataURL(file.originFileObj, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
                _this2.forceUpdate();
            });
        });
    };

    UploadList.prototype.handleClose = function handleClose(file) {
        this.props.onRemove(file);
    };

    UploadList.prototype.handleCancel = function handleCancel(file) {
        this.props.onCancel(file);
    };

    UploadList.prototype.render = function render() {
        var _this3 = this,
            _classNames2;

        var _props = this.props,
            listType = _props.listType,
            locale = _props.locale,
            children = _props.children;

        var prefix = this.context.prefix || this.props.prefix;
        var prefixCls = prefix + 'upload';
        var list = this.props.fileList.map(function (file, idx) {
            var _classNames;

            var size = file.size ? parseFloat(file.size / 1024, 10).toFixed(2) : 0;
            var progress = void 0;
            var img = '';
            file.uid = file.uid || (0, _util.uid)();
            var status = file.status;

            if (listType === 'picture-card') {
                if (status === 'uploading') {
                    img = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-list-item-thumbnail' },
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(_nextIcon2['default'], { type: 'picture' }),
                            _react2['default'].createElement(
                                'a',
                                { href: 'javascript:;', onClick: function onClick() {
                                        return _this3.handleCancel(file);
                                    } },
                                locale.image.cancel
                            )
                        )
                    );
                } else if (status === 'error') {
                    img = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-list-item-thumbnail' },
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(_nextIcon2['default'], { type: 'cry' })
                        )
                    );
                } else {
                    var backgroundSize = file.response && file.response.height > file.response.width ? 'auto 100%' : '100% auto';
                    img = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-list-item-thumbnail' },
                        _react2['default'].createElement('div', { style: {
                                backgroundImage: 'url("' + file.imgURL + '")',
                                backgroundSize: backgroundSize
                            } })
                    );
                }
            } else if (listType === 'text-image') {
                if (status === 'uploading') {
                    img = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-list-item-thumbnail' },
                        _react2['default'].createElement(_nextIcon2['default'], { type: 'picture' })
                    );
                } else if (status === 'error') {
                    img = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-list-item-thumbnail' },
                        _react2['default'].createElement(_nextIcon2['default'], { type: 'cry' })
                    );
                } else {
                    var _backgroundSize = file.response && file.response.height > file.response.width ? 'auto 100%' : '100% auto';
                    img = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-list-item-thumbnail' },
                        _react2['default'].createElement('div', { style: {
                                backgroundImage: 'url(' + file.imgURL + ')',
                                backgroundSize: _backgroundSize
                            } })
                    );
                }
            }

            if (file.status === 'uploading') {
                progress = _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-list-item-progress' },
                    _react2['default'].createElement(_nextProgress2['default'], { size: listType === 'picture-card' ? 'small' : 'medium', percent: file.percent,
                        showInfo: false })
                );
            }
            var infoUploadingClass = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefixCls + '-list-item', true), _defineProperty(_classNames, prefixCls + '-list-item-' + file.status, true), _defineProperty(_classNames, prefixCls + '-list-item-hovered', !!file.hovered), _classNames));

            return _react2['default'].createElement(
                'div',
                { className: infoUploadingClass, key: file.uid },
                _this3.props.cell ? _this3.props.cell(file, idx) : _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-list-item-info' },
                    img,
                    listType === 'picture-card' ? _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-list-item-name' },
                        file.fileName
                    ) : listType === 'text-image' && file.status === 'uploading' ? '' : _react2['default'].createElement(
                        'a',
                        { href: file.downloadURL, target: '_blank', style: {
                                pointerEvents: file.downloadURL ? '' : 'none'
                            }, className: prefixCls + '-list-item-name' },
                        _react2['default'].createElement(
                            'span',
                            null,
                            file.fileName
                        ),
                        !!size && _react2['default'].createElement(
                            'span',
                            { className: prefixCls + '-list-item-extra' },
                            '(',
                            size,
                            'K)'
                        )
                    ),
                    progress,
                    listType === 'picture-card' ? file.status !== 'uploading' ? _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-tool ' + (!_this3.props.closable ? 'noclose' : '') },
                        _react2['default'].createElement(
                            'a',
                            { href: file.downloadURL, target: '_blank', style: {
                                    pointerEvents: file.downloadURL ? '' : 'none'
                                } },
                            _react2['default'].createElement(_nextIcon2['default'], { type: file.downloadURL ? 'download' : '', className: prefixCls + '-tool-download-icon' })
                        ),
                        _this3.props.closable ? _react2['default'].createElement(
                            'span',
                            { className: prefixCls + '-tool-close' },
                            _react2['default'].createElement(_nextIcon2['default'], { type: 'ashbin', onClick: function onClick() {
                                    return _this3.handleClose(file);
                                } })
                        ) : null
                    ) : '' : _this3.props.closable ? _react2['default'].createElement(_nextIcon2['default'], { type: 'close', size: 'large', onClick: function onClick() {
                            return _this3.handleClose(file);
                        } }) : null
                )
            );
        });
        var listClassNames = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-list', true), _defineProperty(_classNames2, prefixCls + '-list-' + this.props.listType, true), _classNames2));
        return _react2['default'].createElement(
            'div',
            { className: listClassNames },
            list,
            children
        );
    };

    return UploadList;
}(_react.Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    locale: _propTypes2['default'].object,
    /**
     * 文件列表，数据格式请参考 文件对象
     */
    listType: _propTypes2['default'].oneOf(['text', 'text-image', 'picture-card']),
    /**
     * 文件列表
     */
    fileList: _propTypes2['default'].array,
    closable: _propTypes2['default'].bool,
    language: _propTypes2['default'].string,
    /**
     * 渲染
     * @param {Object} value 该行数据
     * @param {Number} idx   序列
     * @return {Element} 自定义内容
     */
    cell: _propTypes2['default'].func,
    onRemove: _propTypes2['default'].func,
    onCancel: _propTypes2['default'].func,
    children: _propTypes2['default'].node
}, _class.defaultProps = {
    prefix: 'next-',
    listType: 'text',
    fileList: [],
    closable: false,
    onRemove: noop,
    onCancel: noop
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
UploadList.displayName = 'UploadList';
exports['default'] = (0, _nextLocaleProvider2['default'])(UploadList);
module.exports = exports['default'];