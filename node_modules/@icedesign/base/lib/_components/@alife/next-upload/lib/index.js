'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fileUpload = require('./file-upload.js');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _uploadList = require('./upload-list.js');

var _uploadList2 = _interopRequireDefault(_uploadList);

var _imageUpload = require('./image-upload.js');

var _imageUpload2 = _interopRequireDefault(_imageUpload);

var _dragUpload = require('./drag-upload.js');

var _dragUpload2 = _interopRequireDefault(_dragUpload);

var _cropUpload = require('./crop-upload.js');

var _cropUpload2 = _interopRequireDefault(_cropUpload);

var _upload = require('./upload.js');

var _upload2 = _interopRequireDefault(_upload);

var _locale = require('./locale/index.js');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_fileUpload2['default'].List = _uploadList2['default'];
_fileUpload2['default'].ImageUpload = _imageUpload2['default'];
_fileUpload2['default'].DragUpload = _dragUpload2['default'];
_fileUpload2['default'].CropUpload = _cropUpload2['default'];
_fileUpload2['default'].Core = _upload2['default'];

// 多语言设置
_fileUpload2['default'].LOCALE = _locale2['default'];
_fileUpload2['default'].ImageUpload.LOCALE = _locale2['default'];
_fileUpload2['default'].DragUpload.LOCALE = _locale2['default'];
_fileUpload2['default'].CropUpload.LOCALE = _locale2['default'];

exports['default'] = _fileUpload2['default'];
module.exports = exports['default'];