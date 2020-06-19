'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scaleImage = exports.readFileAsDataURL = exports.uid = undefined;

var _jpegHeaders = require('./jpeg-headers.js');

var _jpegHeaders2 = _interopRequireDefault(_jpegHeaders);

var _exifParser = require('./exif-parser.js');

var _exifParser2 = _interopRequireDefault(_exifParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint-disable */
var now = +new Date();

/**
 * 生成唯一的id
 * @return {String} uid
 */
var uid = exports.uid = function uid() {
    return (now++).toString(36);
};

/**
 * Detect subsampling in loaded image.
 * In iOS, larger images than 2M pixels may be subsampled in rendering.
 */
function detectSubsampling(img) {
    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    if (iw * ih > 1024 * 1024) {
        // subsampling may happen over megapixel image
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, -iw + 1, 0);

        // subsampled image becomes half smaller in rendering size.
        // check alpha channel value to confirm image is covering edge pixel or not.
        // if alpha value is 0 image is not covering, hence subsampled.
        return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
    } else {
        return false;
    }
}

/**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 */
function detectVerticalSquash(img, iw, ih) {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }

        py = ey + sy >> 1;
    }

    var ratio = py / ih;
    return ratio === 0 ? 1 : ratio;
}

/**
 * Rendering image element (with resizing) into the canvas element
 */
function renderImageToCanvas(img, canvas, width, height) {
    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.save();

    var subsampled = detectSubsampling(img);
    if (subsampled) {
        iw /= 2;
        ih /= 2;
    }

    var d = 1024; // size of tiling canvas
    var tilingCanvas = document.createElement('canvas');
    tilingCanvas.width = tilingCanvas.height = d;
    var tilingCtx = tilingCanvas.getContext('2d');
    var vertSquashRatio = detectVerticalSquash(img, iw, ih);

    var sy = 0;
    while (sy < ih) {
        var sh = sy + d > ih ? ih - sy : d;
        var sx = 0;
        while (sx < iw) {
            var sw = sx + d > iw ? iw - sx : d;
            tilingCtx.clearRect(0, 0, d, d);
            tilingCtx.drawImage(img, -sx, -sy);
            var dx = sx * width / iw << 0;
            var dw = Math.ceil(sw * width / iw);
            var dy = sy * height / ih / vertSquashRatio << 0;
            var dh = Math.ceil(sh * height / ih / vertSquashRatio);
            ctx.drawImage(tilingCanvas, 0, 0, sw, sh, dx, dy, dw, dh);
            sx += d;
        }

        sy += d;
    }

    ctx.restore();
    tilingCanvas = tilingCtx = null;
}

function dataHandle(data, canvas, resize, mime) {
    data = canvas.toDataURL(mime);

    // Remove data prefix information and grab the base64 encoded data and decode it
    data = data.substring(data.indexOf('base64,') + 7);
    data = atob(data);
    return data;
}

function canvasResize(data, resize, mime, cb) {
    var img = new Image();

    img.onerror = img.onabort = function (err) {
        throw err || new Error('resize failed');
    };
    img.onload = function () {
        var canvas = void 0,
            width = void 0,
            height = void 0,
            scale = void 0,
            jpegHeaders = void 0,
            exifParser = void 0;

        canvas = document.createElement('canvas');
        canvas.style.display = 'none';
        document.body.appendChild(canvas);

        // 图片压缩
        resize.width = resize.width || img.width;
        resize.height = resize.height || img.height;

        scale = Math.min(resize.width / img.width, resize.height / img.height);

        if (scale < 1) {
            width = Math.round(img.width * scale);
            height = Math.round(img.height * scale);
        } else {
            width = img.width;
            height = img.height;
        }

        if (width && height) {
            // Scale image and canvas
            renderImageToCanvas(img, canvas, width, height);

            // Preserve JPEG headers
            if (mime === 'image/jpeg') {
                jpegHeaders = new _jpegHeaders2['default'](atob(data.substring(data.indexOf('base64,') + 7)));
                if (jpegHeaders.headers && jpegHeaders.headers.length) {
                    exifParser = new _exifParser2['default']();

                    if (exifParser.init(jpegHeaders.get('exif')[0])) {
                        // Set new width and height
                        exifParser.setExif('PixelXDimension', width);
                        exifParser.setExif('PixelYDimension', height);

                        // Update EXIF header
                        jpegHeaders.set('exif', exifParser.getBinary());
                    }
                }
            }

            data = dataHandle(data, canvas, resize, mime);

            // Restore JPEG headers if applicable
            if (jpegHeaders && jpegHeaders.headers && jpegHeaders.headers.length) {
                data = jpegHeaders.restore(data);
                jpegHeaders.purge(); // free memory
            }
        } else {
            // Image does not need to be resized
            data = null;
        }

        // Remove canvas and execute callback with decoded image data
        canvas.parentNode.removeChild(canvas);
        data ? cb(data) : function () {
            throw new Error('resize failed');
        }();
    };

    img.src = data;
}

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
var readFileAsDataURL = exports.readFileAsDataURL = function readFileAsDataURL(file, cb) {
    var reader = new FileReader();
    reader.onloadend = function () {
        return cb(reader.result);
    };
    reader.readAsDataURL(file);
};

/**
 * 调整图片尺寸
 * @param  {File} file - 文件对象
 * @param  {[type]} resize [description]
 * @param  {[type]} mime   [description]
 * @return {[type]}        [description]
 */
var scaleImage = exports.scaleImage = function scaleImage(file, resize, mime, cb) {
    return readFileAsDataURL(file, function (data) {
        return canvasResize(data, resize, mime, cb);
    });
};