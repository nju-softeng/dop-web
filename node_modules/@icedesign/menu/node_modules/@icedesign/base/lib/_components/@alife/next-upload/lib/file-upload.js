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

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _nextButton = require('../../next-button/lib/index.js');

var _nextButton2 = _interopRequireDefault(_nextButton);

var _nextUtil = require('../../next-util/lib/index.js');

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _upload = require('./upload.js');

var _upload2 = _interopRequireDefault(_upload);

var _uploadList = require('./upload-list.js');

var _uploadList2 = _interopRequireDefault(_uploadList);

var _getFileItem = require('./get-file-item.js');

var _getFileItem2 = _interopRequireDefault(_getFileItem);

var _normalizeFileItem = require('./normalize-file-item.js');

var _normalizeFileItem2 = _interopRequireDefault(_normalizeFileItem);

var _fileserverUrl = require('./util/fileserver-url.js');

var Fileserver = _interopRequireWildcard(_fileserverUrl);

var _fileFilter = require('./file-filter.js');

var _fileFilter2 = _interopRequireDefault(_fileFilter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var empty = function empty() {};
var errorMap = {
    1: 'IO_ERROR_SERVER',
    2: 'FORMAT_ERROR',
    3: 'FILE_SIZE_ERROR_SERVER',
    4: 'FILE_TYPE_ERROR_SERVER'
};

/**
 * Upload
 */
var FileUpload = (_temp = _class = function (_Component) {
    _inherits(FileUpload, _Component);

    function FileUpload(props, context) {
        _classCallCheck(this, FileUpload);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var fileList = props.fileList || props.defaultFileList || [];

        _this.state = {
            fileList: fileList.map(function (f) {
                return (0, _normalizeFileItem2['default'])(f);
            }),
            dragState: 'drop'
        };

        /* eslint-disable */
        ['onFileDrop', 'onStart', 'onSuccess', 'onProgress', 'onError', 'removeFile', 'cancelFile'].map(function (fn) {
            _this[fn] = _this[fn].bind(_this);
        });
        /* eslint-enable */
        return _this;
    }

    FileUpload.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('fileList' in nextProps) {
            var fileList = nextProps.fileList;
            if (fileList === undefined) {
                fileList = [];
            }
            this.setState({
                fileList: fileList.map(function (f) {
                    return (0, _normalizeFileItem2['default'])(f);
                })
            });
        }
    };

    /**
      * 文件拖拽处理函数
      * @param  {Event} e - 拖拽事件
      * @return {void}
    */


    FileUpload.prototype.onFileDrop = function onFileDrop(e) {
        if (!this.props.dragable) {
            return false;
        }
        this.setState({
            dragState: e.type
        });
    };

    /**
      * 上传开始
      * @param {FileList} files - 文件列表
      * @return {void}
    */


    FileUpload.prototype.onStart = function onStart(files) {

        var fileObject = (0, _normalizeFileItem2['default'])(files[0]);
        fileObject.status = 'uploading';

        var newFileList = this.state.fileList;
        newFileList.push(fileObject);

        this.onChange({
            file: fileObject,
            fileList: newFileList
        });
    };

    /**
     * 上传成功回调
     * @param  {Object} response - 服务器响应
     * @param  {File} file - 文件对象
     * @return {void}
     */


    FileUpload.prototype.onSuccess = function onSuccess(response, file) {
        var locale = this.props.locale;

        var fileList = this.state.fileList;
        /* eslint-disable */
        var targetItem = (0, _getFileItem2['default'])(file, fileList);
        /* eslint-disable */
        var _props = this.props,
            fileSite = _props.fileSite,
            previewImgSize = _props.previewImgSize,
            formatter = _props.formatter,
            maxSize = _props.maxSize,
            multipart = _props.multipart;

        var data = this.props.data || multipart;

        // 为了兼容自定义服务器返回的数据格式
        // 向外提供一个自定义格式化数据的 API
        if (formatter) {
            response = formatter(response);
        }

        if (typeof data === 'function') {
            data = data(file);
        }

        try {
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
        } catch (e) {
            this.onError(new Error(locale.error.parseJson), response, file);
            return;
        }

        if (!response || response.code != '0') {
            this.onError(new Error(errorMap[response && response.code || '1']), response, file);
            return;
        }

        // 超过最大尺寸限制
        if (file.size > maxSize) {
            this.onError(new Error(locale.error.maxSize), response, file);
            return;
        }

        var imgURL = response.imgUrl || response.imgURL;
        var downloadURL = response.downloadUrl || response.downloadURL;

        // 如果是走默认的 fileserver 上传
        if (data && data.scene) {

            imgURL = imgURL || Fileserver.buildUrl({
                site: fileSite,
                fileName: response.fs_url,
                resize: previewImgSize, // 预览图片大小设置为200x200
                fileProtocol: 'empty',
                asAttachment: null
            });
            // 下载图片地址
            downloadURL = downloadURL || Fileserver.buildUrl({
                site: fileSite,
                fileName: response.fs_url,
                asAttachment: file.name,
                fileProtocol: 'empty',
                resize: null
            });

            // 图片在 `onStart` 已经加入到 `fileList` 中，
            // 这里需要在成功后用服务器返回的数据改变图片的信息，
            // 所以需要判断是否已经存在图片元素
            if (targetItem) {
                (0, _objectAssign2['default'])(targetItem, {
                    fileSavePath: response.fs_url,
                    fileURL: response.url,
                    downloadURL: downloadURL, // 下载地址
                    imgURL: imgURL, // 缩略图地址
                    size: response.size,
                    fileHeight: response.height,
                    fileWidth: response.width,
                    fileMd5: response.hash,
                    status: 'done',
                    response: response
                });
                this.onChange({
                    file: targetItem,
                    fileList: fileList
                });
            }
        } else if (targetItem) {
            // 走自定义服务器上传
            (0, _objectAssign2['default'])(targetItem, {
                imgURL: imgURL, // 缩略图地址
                downloadURL: downloadURL, // 下载地址(可选)
                size: response.size, // (可选)
                fileHeight: response.height, // (可选)
                fileWidth: response.width, // (可选)
                fileMd5: response.hash, // (可选)
                status: 'done',
                response: response
            });
            this.onChange({
                file: targetItem,
                fileList: fileList
            });
        }

        // 向外暴露的成功回调函数
        this.props.onSuccess(response, targetItem);
    };

    FileUpload.prototype.onProgress = function onProgress(e, file) {
        var fileList = this.state.fileList;
        var targetItem = (0, _getFileItem2['default'])(file, fileList);

        if (!targetItem) {
            return;
        }

        targetItem.percent = e.percent;
        this.onChange({
            event: e,
            file: targetItem,
            fileList: fileList
        });
    };

    FileUpload.prototype.onError = function onError(error, response, file) {
        if (!file) {
            return;
        }
        var fileList = this.state.fileList;
        var targetItem = (0, _getFileItem2['default'])(file, fileList);

        if (!targetItem) {
            return;
        }

        (0, _objectAssign2['default'])(targetItem, {
            error: error,
            status: 'error',
            response: response
        });
        this.props.onError(targetItem);
        this.onChange({
            file: targetItem,
            fileList: fileList
        });
    };

    FileUpload.prototype.onChange = function onChange(info) {
        this.setState({
            fileList: info.fileList
        });

        // 在执行回调时不把 `status = error` 的文件输出
        var infoTemp = (0, _objectAssign2['default'])({}, _extends({}, info, {
            fileList: (0, _fileFilter2['default'])(info.fileList)
        }));
        this.props.onChange(infoTemp);

        // 通知拖拽组件把dataTransfer清理掉
        this.props.dropEnd();
        // 通知拖拽组件最新的图片列表
        this.props.onListChange(info.fileList);
    };

    /**
     * 删除文件
     * @param {File} file
     * @return {void}
     */


    FileUpload.prototype.removeFile = function removeFile(file) {
        file.status = 'removed';
        this.refs.inner.abort(file); // 删除组件时调用组件的 `abort` 方法中断上传

        var fileList = this.state.fileList;
        var targetItem = (0, _getFileItem2['default'])(file, fileList);
        var index = fileList.indexOf(targetItem);
        if (index !== -1) {
            fileList.splice(index, 1);
            this.onChange({
                file: targetItem,
                fileList: fileList
            });
            this.props.onRemove(file, fileList);
        }
    };

    /**
     * 取消上传
     * @param {File} file
     * @return {void}
     */


    FileUpload.prototype.cancelFile = function cancelFile(file) {
        this.refs.inner.abort(file); // 取消上传时调用组件的 `abort` 方法中断上传

        var fileList = this.state.fileList;
        var targetItem = (0, _getFileItem2['default'])(file, fileList);
        var index = fileList.indexOf(targetItem);
        if (index !== -1) {
            fileList.splice(index, 1);
            this.onChange({
                file: targetItem,
                fileList: fileList
            });
        }
    };

    FileUpload.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props2 = this.props,
            listType = _props2.listType,
            className = _props2.className,
            locale = _props2.locale,
            children = _props2.children,
            style = _props2.style,
            onChange = _props2.onChange,
            showUploadList = _props2.showUploadList,
            others = _objectWithoutProperties(_props2, ['listType', 'className', 'locale', 'children', 'style', 'onChange', 'showUploadList']);

        var cleanOthers = (0, _nextUtil.pickAttrs)(others);
        var prefix = this.context.prefix || this.props.prefix;
        var prefixCls = prefix + 'upload';
        var classnames = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, !!className), _classNames));
        var uploadButtonCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-select', true), _defineProperty(_classNames2, prefixCls + '-drop', true), _defineProperty(_classNames2, prefixCls + '-drop-hover', this.state.dragState === 'dragover'), _defineProperty(_classNames2, prefixCls + '-select-' + listType, true), _defineProperty(_classNames2, prefixCls + '-select-' + listType + '-hovered', !!this.props.triggerHovered), _defineProperty(_classNames2, prefixCls + '-select-' + listType + '-disable', !!this.props.disabled), _defineProperty(_classNames2, prefixCls + '-select-hide', this.state.fileList.length >= this.props.limit), _classNames2));

        // API `resize` 废弃提醒
        this.props.resize && _nextUtil.log.warning('`resize` is deprecated, don\'t use it anymore.');
        this.props.multipart && _nextUtil.log.deprecated('multipart', 'data', 'Upload');

        if (this.props.id) {
            cleanOthers.id = 'upload_' + this.props.id;
        }

        var trigger = _react2['default'].createElement(
            'div',
            {
                onDrop: this.onFileDrop,
                onDragOver: this.onFileDrop,
                onDragLeave: this.onFileDrop,
                className: uploadButtonCls
            },
            _react2['default'].createElement(
                _upload2['default'],
                _extends({}, others, {
                    className: prefixCls + '-select-inner',
                    fileList: this.state.fileList,
                    onStart: this.onStart,
                    onSuccess: this.onSuccess,
                    onProgress: this.onProgress,
                    onError: this.onError,
                    ref: 'inner'
                }),
                children ? children : _react2['default'].createElement(
                    _nextButton2['default'],
                    { type: 'normal' },
                    locale.file.addPhoto
                )
            )
        );

        if (listType === 'picture-card') {
            return _react2['default'].createElement(
                'div',
                _extends({}, cleanOthers, { className: classnames, style: style }),
                showUploadList ? _react2['default'].createElement(
                    _uploadList2['default'],
                    {
                        prefix: prefix,
                        locale: locale,
                        listType: listType,
                        fileList: this.state.fileList,
                        onRemove: this.removeFile,
                        onCancel: this.cancelFile,
                        closable: !this.props.disabled
                    },
                    trigger
                ) : trigger
            );
        }

        return _react2['default'].createElement(
            'div',
            _extends({}, cleanOthers, { className: classnames, style: style }),
            trigger,
            showUploadList ? _react2['default'].createElement(_uploadList2['default'], {
                prefix: prefix,
                locale: locale,
                listType: listType,
                fileList: this.state.fileList,
                closable: !this.props.disabled,
                onRemove: this.removeFile,
                onCancel: this.cancelFile
            }) : null
        );
    };

    return FileUpload;
}(_react.Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string.isRequired,
    /**
     * 必选参数，上传的地址
     */
    action: _propTypes2['default'].string,
    /**
     * 上传文件列表，数据格式请参考
     */
    fileList: _propTypes2['default'].array,
    /**
     * 默认上传文件列表，数据格式请参考
     */
    defaultFileList: _propTypes2['default'].array,
    /**
     * 上传列表的样式
     * @enumdesc 文字, 图文, 卡片
     */
    listType: _propTypes2['default'].oneOf(['text', 'text-image', 'picture-card']),
    /**
     * 上传额外传参（如果使用 `fileserver` 上传，参数格式为 { scene: '场景名' }）
     */
    data: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
    multipart: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
    /**
     * 数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)
     */
    formatter: _propTypes2['default'].func,
    /**
     * 选择上传的文件的最大尺寸（单位：Byte）
     */
    maxSize: _propTypes2['default'].number,
    /**
     * 语言种类，支持 `en-us`、`zh-cn`、`zh-tw`
     */
    language: _propTypes2['default'].string,
    /**
     * 自定义语言包，会与默认提供的语言包做合并操作，[详细参考](http://gitlab.alibaba-inc.com/next/upload/blob/master/src/locale/index.js)
     */
    locale: _propTypes2['default'].object,
    /**
     * 最大文件上传个数
     */
    limit: _propTypes2['default'].number,
    /**
     * 可选参数，是否支持拖拽上传，`ie10+` 支持。
     */
    dragable: _propTypes2['default'].bool,
    /**
     * 可选参数，是否禁用上传功能
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否显示上传列表
     */
    showUploadList: _propTypes2['default'].bool,
    /**
     * 上传文件改变时的状态
     * @param {Object} info 文件事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 可选参数，上传成功回调函数，参数为请求下响应信息以及文件
     */
    onSuccess: _propTypes2['default'].func,
    /**
     * 移除文件回调函数，详见 [onRemove](#onRemove)
     */
    onRemove: _propTypes2['default'].func,
    /**
     * 可选参数，上传失败回调函数，参数为上传失败的信息、响应信息以及文件
     */
    onError: _propTypes2['default'].func,
    dropEnd: _propTypes2['default'].func,
    onListChange: _propTypes2['default'].func,
    triggerHovered: _propTypes2['default'].bool,
    fileSite: _propTypes2['default'].oneOf(['alibaba', 'alibaba_v2', 'aliexpress', 'itao', 'taobao']),
    previewImgSize: _propTypes2['default'].string,
    /**
     * 自定义class
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     * 子元素
     */
    children: _propTypes2['default'].node,

    //======= 以下props完全透传 =====//

    /**
     * 可选参数，接受上传的文件类型，详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)， [兼容性见](http://caniuse.com/#feat=input-file-accept)
     */
    accept: _propTypes2['default'].string,
    /**
     * 可选参数，设置上传的请求头部
     */
    headers: _propTypes2['default'].object,
    /**
     * 传递给服务器的文件参数
     */
    name: _propTypes2['default'].string,
    /**
     * 可选参数，是否允许请求携带 cookie
     */
    withCredentials: _propTypes2['default'].bool,
    /**
     * 可选参数，上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传
     */
    beforeUpload: _propTypes2['default'].func
}, _class.defaultProps = {
    prefix: 'next-',
    action: '//kfupload.alibaba.com/mupload',
    listType: 'text',
    fileSite: 'alibaba_v2',
    previewImgSize: '_200x200',
    dragable: true,
    maxSize: Infinity,
    showUploadList: true,
    defaultFileList: [],
    onChange: empty,
    onSuccess: empty,
    onRemove: empty,
    onError: empty,
    dropEnd: empty,
    onListChange: empty
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
FileUpload.displayName = 'FileUpload';
exports['default'] = (0, _nextLocaleProvider2['default'])(FileUpload);
module.exports = exports['default'];