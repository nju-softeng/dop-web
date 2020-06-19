'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;
// import { log } from '@alife/next-util';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextButton = require('../../next-button/lib/index.js');

var _nextButton2 = _interopRequireDefault(_nextButton);

var _nextDialog = require('../../next-dialog/lib/index.js');

var _nextDialog2 = _interopRequireDefault(_nextDialog);

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _request = require('./runtime/request.js');

var _request2 = _interopRequireDefault(_request);

var _reactCropper = require('./components/react-cropper.js');

var _reactCropper2 = _interopRequireDefault(_reactCropper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};
// const errorMap = {
//     1: 'IO_ERROR_SERVER',
//     2: 'FORMAT_ERROR',
//     3: 'FILE_SIZE_ERROR_SERVER',
//     4: 'FILE_TYPE_ERROR_SERVER'
// };

/**
 * Upload.CropUpload
 * @order 3
 * @description IE10+ 支持
 */
var CropUpload = (_temp = _class = function (_React$Component) {
    _inherits(CropUpload, _React$Component);

    function CropUpload(props) {
        _classCallCheck(this, CropUpload);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            src: '',
            file: null,
            showPopup: false
        };

        ['cropImage', 'onChange', 'onClick', 'onPopupClose'].forEach(function (fn) {
            _this[fn] = _this[fn].bind(_this);
        });
        return _this;
    }

    CropUpload.prototype.onPopupClose = function onPopupClose() {
        this.setState({
            showPopup: false
        });
    };

    CropUpload.prototype.cropImage = function cropImage() {
        if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        var imageType = /\.png$/i.test(this.state.file.name) ? 'image/png' : 'image/jpeg';
        var canvasOrigin = this.refs.cropper.getCroppedCanvas();
        var _props = this.props,
            size = _props.size,
            cropSize = _props.cropSize;

        var dataUrl = void 0;

        // 设置裁剪后图片的尺寸,`cropSize` 代替 `size`，这里为了向上兼容
        var newSize = cropSize;
        if (!newSize && typeof size === 'number') {
            newSize = size;
        }

        if (newSize) {
            var newWidth = 0;
            var newHeight = 0;
            var canvasResize = document.createElement('canvas');
            canvasResize.style.display = 'none';
            document.body.appendChild(canvasResize);

            if (typeof newSize === 'number') {
                newWidth = newSize;
                newHeight = newSize;
            } else if ((typeof newSize === 'undefined' ? 'undefined' : _typeof(newSize)) === 'object') {
                newWidth = newSize.width;
                newHeight = newSize.height;
            }

            canvasResize.width = newWidth;
            canvasResize.height = newHeight;
            var context2d = canvasResize.getContext('2d');

            context2d.drawImage(canvasOrigin, 0, 0, newWidth, newHeight);
            dataUrl = canvasResize.toDataURL(imageType);
        } else {
            dataUrl = canvasOrigin.toDataURL(imageType);
        }

        // 触发裁剪回调函数
        this.props.onCrop(dataUrl);

        // 图片上传
        var decodeData = dataUrl.substring(dataUrl.indexOf('base64,') + 7);
        decodeData = atob(decodeData);
        this.upload(decodeData, dataUrl);
    };

    /**
     * @param  {String} decodeData 解编码后，用于上传服务器的数据
     * @param  {String} dataUrl    base64 用于预览图片的数据
     */


    CropUpload.prototype.upload = function upload(decodeData, dataUrl) {
        var _this2 = this;

        var beforeUpload = this.props.beforeUpload;

        if (!beforeUpload) {
            return this.post(decodeData, dataUrl);
        }

        var before = beforeUpload(this.state.file);
        if (before && before.then) {
            before.then(function (result) {
                if (result !== false) {
                    _this2.post(decodeData, dataUrl);
                }
            })['catch'](function () {});
        } else if (before !== false) {
            this.post(decodeData, dataUrl);
        }
    };

    CropUpload.prototype.post = function post(decodeData, dataUrl) {
        var _this3 = this;

        var _props2 = this.props,
            action = _props2.action,
            name = _props2.name,
            headers = _props2.headers,
            withCredentials = _props2.withCredentials,
            multipart = _props2.multipart,
            formatter = _props2.formatter,
            _onProgress = _props2.onProgress,
            _onSuccess = _props2.onSuccess,
            _onError = _props2.onError;


        var data = this.props.data || multipart;
        if (typeof data === 'function') {
            data = data(this.state.file);
        }

        (0, _request2['default'])({
            action: action,
            filename: name,
            file: this.state.file,
            bin: decodeData,
            data: data,
            headers: headers,
            withCredentials: withCredentials,
            onProgress: function onProgress(e) {
                _onProgress(e, dataUrl);
            },
            onSuccess: function onSuccess(res) {
                if (formatter) {
                    res = formatter(res);
                }

                // 组件没有做 code 值判断，导致请求成功但是其实上传失败的情况也会通过，考虑会产生BR，留待 1.0 BR版本再放开下面的修复
                // try {
                //     if (typeof res === 'string') {
                //         res = JSON.parse(res);
                //     }
                // } catch (e) {
                //     onError(new Error('服务器需要返回标准 JSON 字符串'), res, this.state.file);
                //     return;
                // }
                //
                // /* eslint-disable */
                // if (!res || res.code != '0') {
                //     onError(new Error(errorMap[res && res.code || '1']), res, this.state.file);
                //     return;
                // }
                // /* eslint-disable */

                _onSuccess(res, dataUrl);
                _this3.onPopupClose();
            },
            onError: function onError(err, res) {
                _onError(err, res, dataUrl);
            }
        });
    };
    // TODO: 这里只是选择完文件，并没有真正的上传， 没有对结果产生影响。 1.x 需要考虑是否要等文件上传完成再调用


    CropUpload.prototype.onChange = function onChange(e) {
        var _this4 = this;

        var beforeCrop = this.props.beforeCrop;

        var callback = function callback(file) {
            var reader = new FileReader();
            reader.onload = function () {
                _this4.setState({
                    src: reader.result,
                    file: file,
                    showPopup: true
                });
            };
            reader.readAsDataURL(file);
            _this4.props.onChange(file);
        };

        e.preventDefault();
        var file = void 0;
        if (e.dataTransfer) {
            file = e.dataTransfer.files[0];
        } else if (e.target) {
            file = e.target.files[0];
        }

        if (!beforeCrop) {
            callback(file);
            return;
        }

        var before = beforeCrop(file);
        if (before && before.then) {
            before.then(function (result) {
                if (result !== false) {
                    callback(file);
                }
            })['catch'](function () {
                // do nothing
            });
        } else if (before !== false) {
            callback(file);
        }
    };

    CropUpload.prototype.onClick = function onClick() {
        var el = this.refs.file;
        if (!el) {
            return;
        }
        el.click();
        el.value = '';
    };

    CropUpload.prototype.previewListValid = function previewListValid(list) {
        var defaultList = [80, 60, 40];

        list.forEach(function (item) {
            if (defaultList.indexOf(item) === -1) {
                return false;
            }
        });

        return true;
    };

    CropUpload.prototype.previewArea = function previewArea(prefixCls) {
        var _props3 = this.props,
            preview = _props3.preview,
            previewList = _props3.previewList;

        var previewTpl = [];

        if (!preview || !previewList || !previewList.length || !this.previewListValid(previewList)) {
            return;
        }
        previewList.forEach(function (item, index) {
            /* eslint-disable */
            var styles = {
                width: item + 'px',
                height: item + 'px'
            };
            /* eslint-enable */

            previewTpl.push(_react2['default'].createElement(
                'div',
                { key: index },
                _react2['default'].createElement('div', { className: 'img-preview', style: styles }),
                _react2['default'].createElement(
                    'span',
                    { className: 'img-preview-size' },
                    item,
                    '*',
                    item
                )
            ));
        });

        return _react2['default'].createElement(
            'div',
            { className: prefixCls + '-inner-preview' },
            previewTpl
        );
    };

    CropUpload.prototype.cropperPopup = function cropperPopup(prefixCls) {
        var _props4 = this.props,
            locale = _props4.locale,
            minCropBoxSize = _props4.minCropBoxSize,
            popupClassName = _props4.popupClassName,
            aspectRatio = _props4.aspectRatio,
            _props4$viewMode = _props4.viewMode,
            viewMode = _props4$viewMode === undefined ? 1 : _props4$viewMode,
            _props4$autoCropArea = _props4.autoCropArea,
            autoCropArea = _props4$autoCropArea === undefined ? 0.8 : _props4$autoCropArea,
            _props4$zoomable = _props4.zoomable,
            zoomable = _props4$zoomable === undefined ? true : _props4$zoomable;

        var preview = aspectRatio && aspectRatio !== 1 ? null : this.previewArea(prefixCls);

        // 为了配置平台 start
        /* eslint-disable */
        if (this.props.demoDefault) {
            return _react2['default'].createElement(
                _nextDialog2['default'].Inner,
                { style: { position: 'relative' } },
                _react2['default'].createElement(
                    _nextDialog2['default'].Header,
                    null,
                    locale.crop.title
                ),
                _react2['default'].createElement(
                    _nextDialog2['default'].Body,
                    null,
                    _react2['default'].createElement(
                        'div',
                        { className: (0, _classnames2['default'])(_defineProperty({}, '' + prefixCls, true)) },
                        _react2['default'].createElement(
                            'div',
                            { className: (0, _classnames2['default'])(_defineProperty({}, prefixCls + '-inner', true)) },
                            _react2['default'].createElement(
                                'div',
                                null,
                                _react2['default'].createElement(
                                    'div',
                                    { className: prefixCls + '-inner-cropper' },
                                    _react2['default'].createElement(_reactCropper2['default'], {
                                        style: { height: '100%', width: '100%' },
                                        viewMode: 1,
                                        aspectRatio: 1 / 1,
                                        preview: '.img-preview',
                                        guides: false,
                                        center: false,
                                        background: false,
                                        ref: 'cropper',
                                        src: this.props.defaultAvatar
                                    })
                                ),
                                preview,
                                _react2['default'].createElement('div', { style: { clear: 'both' } })
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: prefixCls + '-inner-reset', onClick: this.onClick },
                                '+ ',
                                locale.crop.reset
                            )
                        )
                    )
                ),
                _react2['default'].createElement(
                    _nextDialog2['default'].Footer,
                    { style: { textAlign: 'left' } },
                    _react2['default'].createElement(
                        _nextButton2['default'],
                        { type: 'primary' },
                        locale.crop.save
                    )
                )
            );
        }
        /* eslint-enable */
        // 为了配置平台 end

        return _react2['default'].createElement(
            _nextDialog2['default'],
            {
                className: popupClassName,
                animation: false,
                visible: this.state.showPopup,
                title: locale.crop.title,
                onClose: this.onPopupClose,
                footer: _react2['default'].createElement(
                    'span',
                    { onClick: this.cropImage },
                    _react2['default'].createElement(
                        _nextButton2['default'],
                        { type: 'primary' },
                        locale.crop.save
                    )
                ),
                footerAlign: 'left'
            },
            _react2['default'].createElement(
                'div',
                { className: (0, _classnames2['default'])(_defineProperty({}, '' + prefixCls, true)) },
                _react2['default'].createElement(
                    'div',
                    { className: (0, _classnames2['default'])(_defineProperty({}, prefixCls + '-inner', true)) },
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'div',
                            { className: prefixCls + '-inner-cropper' },
                            _react2['default'].createElement(_reactCropper2['default'], {
                                style: { height: '100%', width: '100%' },
                                viewMode: viewMode,
                                autoCropArea: autoCropArea,
                                aspectRatio: aspectRatio || 1 / 1,
                                minCropBoxWidth: minCropBoxSize,
                                preview: '.img-preview',
                                guides: false,
                                center: false,
                                background: false,
                                zoomable: zoomable,
                                ref: 'cropper',
                                src: this.state.src
                            })
                        ),
                        preview,
                        _react2['default'].createElement('div', { style: { clear: 'both' } })
                    ),
                    _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-inner-reset', onClick: this.onClick },
                        '+ ',
                        locale.crop.reset
                    )
                )
            )
        );
    };

    CropUpload.prototype.render = function render() {
        var _props5 = this.props,
            className = _props5.className,
            style = _props5.style,
            children = _props5.children,
            id = _props5.id;

        var prefix = this.context.prefix || this.props.prefix;
        var prefixCls = prefix + 'upload-crop';

        // API `size` -> `cropSize` 提醒
        // size && log.deprecated('size', 'cropSize', 'CropUpload');

        var popup = this.cropperPopup(prefixCls);

        return _react2['default'].createElement(
            'div',
            { id: 'upload_' + id, className: className, style: style },
            _react2['default'].createElement(
                'span',
                { role: 'upload', onClick: this.onClick },
                _react2['default'].createElement('input', {
                    id: id,
                    type: 'file',
                    ref: 'file',
                    accept: this.props.accept,
                    multiple: false,
                    style: { display: 'none' },
                    onChange: this.onChange
                }),
                children
            ),
            popup
        );
    };

    return CropUpload;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    id: _propTypes2['default'].string,
    /**
     * 必选参数，上传的地址。使用 fileserver，跨域解决方案参考 [fileserver 接入](#fileserver)，[`非 fileserver` 使用说明](#not-fileserver)
     */
    action: _propTypes2['default'].string,
    /**
     * 可选参数，传递给服务器的文件参数
     */
    name: _propTypes2['default'].string,
    /**
     * 可选参数，设置裁剪图片生成的尺寸，如设置 `100`，会生成 `100*100` 的图片
     */
    cropSize: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].object]),
    size: _propTypes2['default'].any,
    /**
     * 可选参数，设置裁剪框的最小尺寸
     */
    minCropBoxSize: _propTypes2['default'].number,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     * 可选参数，设置上传的请求头部
     */
    headers: _propTypes2['default'].object,
    withCredentials: _propTypes2['default'].bool,
    /**
     * 可选参数，数据格式化函数，配合自定义 `action` 使用，参数为服务器的响应数据，详见 [formatter](#formatter)
     */
    formatter: _propTypes2['default'].func,
    /**
     * 上传额外传参（如果使用 `fileserver` 上传，参数格式为 { scene: '场景名' }）
     */
    data: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
    multipart: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
    language: _propTypes2['default'].string,
    /**
     * 自定义语言包，会与默认提供的语言包做合并操作，请严格按照默认语言包的格式，参考 [demo](http://next.alibaba-inc.com/demo/pc/upload#react-Upload-2)
     */
    locale: _propTypes2['default'].object,
    /**
     * 是否使用预览功能
     */
    preview: _propTypes2['default'].bool,
    /**
     * 预览展示列表，用来配置预览元素。目前仅支持 `80`、`60`、`40` 三种，例如，配置 `[80, 40]`，会展示 `80*80` 以及 `40*40` 两种尺寸
     */
    previewList: _propTypes2['default'].array,
    /**
     * 裁剪弹层自定义类名
     */
    popupClassName: _propTypes2['default'].string,
    /**
     * 裁剪比例，例如 `1 / 2` 表示 `宽 / 高`。**注意：1、设置了裁剪比例，而且值不等于 `1` 时，不能使用预览功能；2、设置成 'auto' 可以支持任意裁剪比例**
     */
    aspectRatio: _propTypes2['default'].number,
    /**
     * 可选参数，[定义裁剪框的模式](https://github.com/fengyuanchen/cropperjs#viewmode)
     */
    viewMode: _propTypes2['default'].number,
    /**
     * 可选参数，[定义自动裁剪区域的尺寸（百分比）](https://github.com/fengyuanchen/cropperjs#autocroparea)，介于 `0` 与 `1` 之间的值
     */
    autoCropArea: _propTypes2['default'].number,
    /**
     * 图片是否可以伸缩
     */
    zoomable: _propTypes2['default'].bool,
    children: _propTypes2['default'].node,
    /**
     * 可选参数，选择文件后、唤起裁剪框前的钩子，参数为上传的文件。若返回 `false`、`Promise.reject()` 或者 `Promise.resolve(false)` 都会阻断后续流程，不会唤起裁剪框及后续动作
     */
    beforeCrop: _propTypes2['default'].func,
    /**
     * 完成裁剪并上传的回调函数，参数为裁剪后的文件的base64字符串数据
     */
    onCrop: _propTypes2['default'].func,
    /**
     * 可选参数，裁剪文件改变时触发
     */
    onChange: _propTypes2['default'].func,
    /**
     * 可选参数，点击裁剪之后、上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传
     */
    beforeUpload: _propTypes2['default'].func,
    onProgress: _propTypes2['default'].func,
    /**
     * 上传成功回调函数，`res` 为后台响应，`dataUrl` 为裁剪后的文件的base64字符串数据(注意与 `Upload` 的参数区别)
     */
    onSuccess: _propTypes2['default'].func,
    /**
     * 可选参数，上传失败回调函数，参数为上传失败的文件信息
     */
    onError: _propTypes2['default'].func,
    /**
     * 图片类型
     */
    accept: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    action: '//kfupload.alibaba.com/mupload',
    withCredentials: false,
    name: 'avatar',
    onCrop: noop,
    beforeUpload: noop,
    onChange: noop,
    onProgress: noop,
    onSuccess: noop,
    onError: noop,
    accept: 'image/png,image/jpg,image/jpeg,image/bmp,image/gif'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
CropUpload.displayName = 'CropUpload';
exports['default'] = (0, _nextLocaleProvider2['default'])(CropUpload);
module.exports = exports['default'];