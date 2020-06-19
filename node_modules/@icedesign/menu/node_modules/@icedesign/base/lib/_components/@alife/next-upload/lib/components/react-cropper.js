'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _cropperjs = require('cropperjs');

var _cropperjs2 = _interopRequireDefault(_cropperjs);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _nextUtil = require('../../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint-disable */
/**
 * Fork from https://github.com/roadmanfong/react-cropper
 */


var optionProps = ['dragMode', 'aspectRatio', 'data', 'minCropBoxWidth', 'minCropBoxHeight',
// unchangeable props start from here
'viewMode', 'preview', 'responsive', 'restore', 'checkCrossOrigin', 'checkOrientation', 'modal', 'guides', 'center', 'highlight', 'background', 'autoCrop', 'autoCropArea', 'movable', 'rotatable', 'scalable', 'zoomable', 'zoomOnTouch', 'zoomOnWheel', 'wheelZoomRation', 'cropBoxMovable', 'cropBoxResizable', 'toggleDragModeOnDblclick', 'minContainerWidth', 'minContainerHeight', 'minCanvasWidth', 'minCanvasHeight', 'build', 'built', 'cropstart', 'cropmove', 'cropend', 'crop', 'zoom'];

var unchangeableProps = optionProps.slice(3);

var ReactCropper = function (_Component) {
    _inherits(ReactCropper, _Component);

    function ReactCropper() {
        _classCallCheck(this, ReactCropper);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ReactCropper.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        var options = Object.keys(this.props).filter(function (propKey) {
            return optionProps.indexOf(propKey) !== -1;
        }).reduce(function (prevOptions, propKey) {
            return (0, _objectAssign2['default'])({}, prevOptions, _defineProperty({}, propKey, _this2.props[propKey]));
        }, {});

        this.img = _reactDom2['default'].findDOMNode(this.refs.img);
        this.cropper = new _cropperjs2['default'](this.img, options);
    };

    ReactCropper.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.cropper.reset().clear().replace(nextProps.src);
        }
        if (nextProps.aspectRatio !== this.props.aspectRatio) {
            this.setAspectRatio(nextProps.aspectRatio);
        }
        if (nextProps.data !== this.props.data) {
            this.setData(nextProps.data);
        }
        if (nextProps.dragMode !== this.props.dragMode) {
            this.setDragMode(nextProps.dragMode);
        }
        if (nextProps.cropBoxData !== this.props.cropBoxData) {
            this.setCropBoxData(nextProps.cropBoxData);
        }
        if (nextProps.canvasData !== this.props.canvasData) {
            this.setCanvasData(nextProps.canvasData);
        }
        if (nextProps.moveTo !== this.props.moveTo) {
            if (nextProps.moveTo.length > 1) {
                this.moveTo(nextProps.moveTo[0], nextProps.moveTo[1]);
            } else {
                this.moveTo(nextProps.moveTo[0]);
            }
        }
        if (nextProps.zoomTo !== this.props.zoomTo) {
            this.zoomTo(nextProps.zoomTo);
        }
        if (nextProps.rotateTo !== this.props.rotateTo) {
            this.rotateTo(nextProps.rotateTo);
        }
        if (nextProps.scaleX !== this.props.scaleX) {
            this.scaleX(nextProps.scaleX);
        }
        if (nextProps.scaleY !== this.props.scaleY) {
            this.scaleY(nextProps.scaleY);
        }
        if (nextProps.enable !== this.props.enable) {
            if (nextProps.enable) {
                this.enable();
            } else {
                this.disable();
            }
        }

        for (var propKey in nextProps) {
            if (nextProps[propKey] !== this.props[propKey] && unchangeableProps.indexOf(propKey) !== -1) {
                throw new Error('prop: ' + propKey + ' can\'t be change after componentDidMount');
            }
        }
    };

    ReactCropper.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.img) {
            // Destroy the cropper, this makes sure events such as resize are cleaned up and do not leak
            this.cropper.destroy();
            delete this.img;
            delete this.cropper;
        }
    };

    ReactCropper.prototype.setDragMode = function setDragMode(mode) {
        return this.cropper.setDragMode(mode);
    };

    ReactCropper.prototype.setAspectRatio = function setAspectRatio(aspectRatio) {
        return this.cropper.setAspectRatio(aspectRatio);
    };

    ReactCropper.prototype.getCroppedCanvas = function getCroppedCanvas(options) {
        return this.cropper.getCroppedCanvas(options);
    };

    ReactCropper.prototype.setCropBoxData = function setCropBoxData(data) {
        return this.cropper.setCropBoxData(data);
    };

    ReactCropper.prototype.getCropBoxData = function getCropBoxData() {
        return this.cropper.getCropBoxData();
    };

    ReactCropper.prototype.setCanvasData = function setCanvasData(data) {
        return this.cropper.setCanvasData(data);
    };

    ReactCropper.prototype.getCanvasData = function getCanvasData() {
        return this.cropper.getCanvasData();
    };

    ReactCropper.prototype.getImageData = function getImageData() {
        return this.cropper.getImageData();
    };

    ReactCropper.prototype.getContainerData = function getContainerData() {
        return this.cropper.getContainerData();
    };

    ReactCropper.prototype.setData = function setData(data) {
        return this.cropper.setData(data);
    };

    ReactCropper.prototype.getData = function getData(rounded) {
        return this.cropper.getData(rounded);
    };

    ReactCropper.prototype.crop = function crop() {
        return this.cropper.crop();
    };

    ReactCropper.prototype.move = function move(offsetX, offsetY) {
        return this.cropper.move(offsetX, offsetY);
    };

    ReactCropper.prototype.moveTo = function moveTo(x, y) {
        return this.cropper.moveTo(x, y);
    };

    ReactCropper.prototype.zoom = function zoom(ratio) {
        return this.cropper.zoom(ratio);
    };

    ReactCropper.prototype.zoomTo = function zoomTo(ratio) {
        return this.cropper.zoomTo(ratio);
    };

    ReactCropper.prototype.rotate = function rotate(degree) {
        return this.cropper.rotate(degree);
    };

    ReactCropper.prototype.rotateTo = function rotateTo(degree) {
        return this.cropper.rotateTo(degree);
    };

    ReactCropper.prototype.enable = function enable() {
        return this.cropper.enable();
    };

    ReactCropper.prototype.disable = function disable() {
        return this.cropper.disable();
    };

    ReactCropper.prototype.reset = function reset() {
        return this.cropper.reset();
    };

    ReactCropper.prototype.clear = function clear() {
        return this.cropper.clear();
    };

    ReactCropper.prototype.replace = function replace(url, onlyColorChanged) {
        return this.cropper.replace(url, onlyColorChanged);
    };

    ReactCropper.prototype.scale = function scale(scaleX, scaleY) {
        return this.cropper.scale(scaleX, scaleY);
    };

    ReactCropper.prototype.scaleX = function scaleX(_scaleX) {
        return this.cropper.scaleX(_scaleX);
    };

    ReactCropper.prototype.scaleY = function scaleY(_scaleY) {
        return this.cropper.scaleY(_scaleY);
    };

    ReactCropper.prototype.render = function render() {
        var _props = this.props,
            src = _props.src,
            alt = _props.alt,
            crossOrigin = _props.crossOrigin;

        var cleanProps = (0, _nextUtil.pickAttrs)(this.props);

        return _react2['default'].createElement(
            'div',
            _extends({}, cleanProps, {
                src: null,
                crossOrigin: null,
                alt: null
            }),
            _react2['default'].createElement('img', {
                crossOrigin: crossOrigin,
                ref: 'img',
                src: src,
                alt: alt === undefined ? 'picture' : alt,
                style: { opacity: 0 }
            })
        );
    };

    return ReactCropper;
}(_react.Component);

ReactCropper.displayName = 'ReactCropper';


ReactCropper.propTypes = {
    // react cropper options
    crossOrigin: _propTypes2['default'].string,
    src: _propTypes2['default'].string,
    alt: _propTypes2['default'].string,

    // props of option can be changed after componentDidmount
    aspectRatio: _propTypes2['default'].number,
    dragMode: _propTypes2['default'].oneOf(['crop', 'move', 'none']),
    data: _propTypes2['default'].shape({
        x: _propTypes2['default'].number,
        y: _propTypes2['default'].number,
        width: _propTypes2['default'].number,
        height: _propTypes2['default'].number,
        rotate: _propTypes2['default'].number,
        scaleX: _propTypes2['default'].number,
        scaleY: _propTypes2['default'].number
    }),
    scaleX: _propTypes2['default'].number,
    scaleY: _propTypes2['default'].number,
    enable: _propTypes2['default'].bool,
    cropBoxData: _propTypes2['default'].shape({
        left: _propTypes2['default'].number,
        top: _propTypes2['default'].number,
        width: _propTypes2['default'].number,
        hegiht: _propTypes2['default'].number
    }),
    canvasData: _propTypes2['default'].shape({
        left: _propTypes2['default'].number,
        top: _propTypes2['default'].number,
        width: _propTypes2['default'].number,
        hegiht: _propTypes2['default'].number
    }),
    zoomTo: _propTypes2['default'].number,
    moveTo: _propTypes2['default'].arrayOf(_propTypes2['default'].number),
    rotateTo: _propTypes2['default'].number,

    // cropperjs options
    // https://github.com/fengyuanchen/cropperjs#options
    // aspectRatio, dragMode, data
    viewMode: _propTypes2['default'].oneOf([0, 1, 2, 3]),
    preview: _propTypes2['default'].string,
    responsive: _propTypes2['default'].bool,
    restore: _propTypes2['default'].bool,
    checkCrossOrigin: _propTypes2['default'].bool,
    checkOrientation: _propTypes2['default'].bool,
    modal: _propTypes2['default'].bool,
    guides: _propTypes2['default'].bool,
    center: _propTypes2['default'].bool,
    highlight: _propTypes2['default'].bool,
    background: _propTypes2['default'].bool,
    autoCrop: _propTypes2['default'].bool,
    autoCropArea: _propTypes2['default'].number,
    movable: _propTypes2['default'].bool,
    rotatable: _propTypes2['default'].bool,
    scalable: _propTypes2['default'].bool,
    zoomable: _propTypes2['default'].bool,
    zoomOnTouch: _propTypes2['default'].bool,
    zoomOnWheel: _propTypes2['default'].bool,
    wheelZoomRation: _propTypes2['default'].number,
    cropBoxMovable: _propTypes2['default'].bool,
    cropBoxResizable: _propTypes2['default'].bool,
    toggleDragModeOnDblclick: _propTypes2['default'].bool,
    minContainerWidth: _propTypes2['default'].number,
    minContainerHeight: _propTypes2['default'].number,
    minCanvasWidth: _propTypes2['default'].number,
    minCanvasHeight: _propTypes2['default'].number,
    minCropBoxWidth: _propTypes2['default'].number,
    minCropBoxHeight: _propTypes2['default'].number,
    build: _propTypes2['default'].func,
    built: _propTypes2['default'].func,
    cropstart: _propTypes2['default'].func,
    cropmove: _propTypes2['default'].func,
    cropend: _propTypes2['default'].func,
    crop: _propTypes2['default'].func,
    zoom: _propTypes2['default'].func
};

ReactCropper.defaultProps = {
    src: null,
    dragMode: 'crop',
    data: null,
    scaleX: 1,
    scaleY: 1,
    enable: true,
    zoomTo: 1,
    rotateTo: 0
};

exports['default'] = ReactCropper;
module.exports = exports['default'];