'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _nextUtil = require('../../next-util/lib/index.js');

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function noop() {}

var initMeta = {
    state: '',
    valueName: 'value',
    trigger: 'onChange'
};

var Field = function () {
    function Field(com, options) {
        var _this = this;

        _classCallCheck(this, Field);

        this.com = com;
        this.fieldsMeta = {};
        this.cachedBind = {}; //解决每次函数新增的问题
        this.onChange = noop;
        this.parseName = false;
        this.forceUpdate = false;
        this.scrollToFirstError = false; //TODO: set true in 1.0 version
        this.autoUnmount = false; //TODO: set true in 1.0 version
        this.deepReset = false; //TODO: set true in 1.0 version

        if (!this.com) {
            _nextUtil.log.warning('`this` is missing in `Field`, you should use like `new Field(this)`');
        }

        if (options) {
            if (options.onChange) {
                this.onChange = options.onChange;
            }

            ['parseName', 'forceUpdate', 'scrollToFirstError', 'autoUnmount', 'deepReset'].forEach(function (m) {
                if (m in options && options[m]) {
                    _this[m] = true;
                }
            });
        }

        ['init', 'getValue', 'getValues', 'setValue', 'setValues', 'getError', 'setError', 'setErrors', 'validate', 'getState', 'isValidating', 'reset', 'remove'].forEach(function (m) {
            _this[m] = _this[m].bind(_this);
        });
    }

    Field.prototype.init = function init(name) {
        var _this2 = this;

        var fieldOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _fieldOption$valueNam = fieldOption.valueName,
            valueName = _fieldOption$valueNam === undefined ? 'value' : _fieldOption$valueNam,
            _fieldOption$trigger = fieldOption.trigger,
            trigger = _fieldOption$trigger === undefined ? 'onChange' : _fieldOption$trigger,
            _fieldOption$rules = fieldOption.rules,
            rules = _fieldOption$rules === undefined ? null : _fieldOption$rules,
            initValue = fieldOption.initValue,
            _fieldOption$normaliz = fieldOption.normalize,
            normalize = _fieldOption$normaliz === undefined ? null : _fieldOption$normaliz,
            _fieldOption$getValue = fieldOption.getValueFromEvent,
            getValueFromEvent = _fieldOption$getValue === undefined ? normalize : _fieldOption$getValue,
            _fieldOption$props = fieldOption.props,
            props = _fieldOption$props === undefined ? {} : _fieldOption$props;

        var originalProps = (0, _objectAssign2['default'])({}, props);

        if (!(name in this.fieldsMeta)) {
            this.fieldsMeta[name] = _extends({}, initMeta, { initValue: initValue });
        }
        var fieldMeta = this.fieldsMeta[name];

        normalize && _nextUtil.log.deprecated('normalize', 'getValueFromEvent', 'Field');

        valueName in props && _nextUtil.log.warning('`init` will override `props.' + valueName + '`, don\'t set it directly, and you can use `setValue` to change it');
        var defaultValueName = 'default' + valueName[0].toUpperCase() + valueName.slice(1);

        typeof initValue !== 'undefined' && defaultValueName in props && _nextUtil.log.warning('`option.initValue` will take place of `' + defaultValueName + ', they can\'t be used toghter');

        (0, _objectAssign2['default'])(fieldMeta, {
            valueName: valueName,
            getValueFromEvent: getValueFromEvent,
            rules: rules,
            rulesMap: rules ? this._getRulesMap(name, rules, trigger) : null //map the rules by the key of trigger
        });

        // 兼容defaultValue逻辑：存在defaultValue的时候，value不能赋值，否则defaultValue不生效
        if (!('value' in fieldMeta)) {
            if (typeof initValue !== 'undefined') {
                fieldMeta.value = initValue;
            } else if (defaultValueName in props) {
                fieldMeta.value = props[defaultValueName];
            }
        }

        var inputProps = {
            'data-meta': 'Field',
            id: name, //TODO: will be remove at 1.0 version
            ref: this.autoUnmount ? this._getCacheBind(name, name + '__ref', this._saveRef) : name //TODO: will be remove at 1.0 version
        };

        if ('value' in fieldMeta) {
            inputProps[valueName] = fieldMeta.value;
        }

        if (rules) {
            var _loop = function _loop(action) {
                inputProps[action] = function () {
                    _this2._onChangeValidate(name, action);
                    action in props && typeof props[action] === 'function' && props[action].apply(props, arguments);
                    _this2._reRender();
                };
            };

            for (var action in fieldMeta.rulesMap) {
                _loop(action);
            }
        }

        // trigger here maybe replace action, but validator won't be lost, it will still be checked in _onChange
        inputProps[trigger] = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _this2._onChange.apply(_this2, [name, trigger].concat(args));
            trigger in props && typeof props[trigger] === 'function' && props[trigger].apply(props, args);
            _this2.onChange(name, fieldMeta.value);
            _this2._reRender();
        };

        delete originalProps[defaultValueName];
        delete originalProps[valueName];

        return (0, _objectAssign2['default'])(originalProps, inputProps);
    };

    // 提取rule里面的trigger并且做映射


    Field.prototype._getRulesMap = function _getRulesMap(name, rules, trigger) {
        var rulesMap = {};

        // 根据trigger做校验分组
        if (rules.length) {
            for (var i = 0; i < rules.length; i++) {
                this._validateMap(rulesMap, rules[i], trigger);
            }
        } else if (!Array.isArray(rules)) {
            this._validateMap(rulesMap, rules, trigger);
        }

        return rulesMap;
    };

    // 根据trigger做校验分组


    Field.prototype._validateMap = function _validateMap(rulesMap, rule, defaultTrigger) {

        if (!('trigger' in rule)) {
            rule.trigger = [defaultTrigger];
        }

        if (typeof rule.trigger === 'string') {
            rule.trigger = [rule.trigger];
        }

        for (var i = 0; i < rule.trigger.length; i++) {
            var trigger = rule.trigger[i];

            if (trigger in rulesMap) {
                rulesMap[trigger].push(rule);
            } else {
                rulesMap[trigger] = [rule];
            }
        }
        delete rule.trigger;
    };

    //手动修改触发


    Field.prototype._onChange = function _onChange(name, action) {
        for (var _len2 = arguments.length, others = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            others[_key2 - 2] = arguments[_key2];
        }

        var e = others[0];
        var fieldMeta = this._get(name);

        if (!fieldMeta) {
            return;
        }

        fieldMeta.value = fieldMeta.getValueFromEvent ? fieldMeta.getValueFromEvent.apply(this, others) : (0, _utils.getValueFromEvent)(e);

        this._resetError(name);
        var rulesMap = fieldMeta.rulesMap;

        if (rulesMap && action in rulesMap) {
            this._validate(rulesMap[action], name, fieldMeta.value);
        }
    };

    //校验事件触发


    Field.prototype._onChangeValidate = function _onChangeValidate(name, action) {
        var fieldMeta = this._get(name);

        var rulesMap = fieldMeta.rulesMap;

        if (action in rulesMap) {
            this._validate(rulesMap[action], name, this.getValue(name));
        }
    };

    Field.prototype._getCacheBind = function _getCacheBind(name, action, fn) {
        var cache = this.cachedBind[name] = this.cachedBind[name] || {};
        if (!cache[action]) {
            cache[action] = fn.bind(this, name);
        }
        return cache[action];
    };

    Field.prototype._saveRef = function _saveRef(name, component) {
        if (!component) {
            // after destroy, delete data
            delete this.fieldsMeta[name];
            return;
        }
        var fieldMeta = this._get(name);
        if (fieldMeta) {
            fieldMeta.ref = component;
        }
    };

    // 会做初始化value兼容检测


    Field.prototype.getValue = function getValue(name) {
        var field = this._get(name);

        if (field) {
            if ('value' in field) {
                return field.value;
            } else if (this.com && this.com.refs) {
                //TODO: remove get defaultValue by ref in 1.0BR

                var ref = this.com.refs[name] || field.ref; // 第一次ref很可能取不到
                if (ref) {

                    var value = (0, _utils.getDefaultValue)(ref, field.valueName);
                    field.value = value;
                    if (typeof value !== 'undefined') {
                        field.initValue = value;
                    }

                    return field.value;
                }
            }
        }

        return undefined;
    };

    Field.prototype.getValues = function getValues(names) {
        var _this3 = this;

        var fields = names || this.getNames();
        var allValues = {};

        fields.forEach(function (f) {
            if (!_this3.parseName) {
                allValues[f] = _this3.getValue(f);
            } else {
                allValues = (0, _utils.setIn)(allValues, f, _this3.getValue(f));
            }
        });
        return allValues;
    };

    Field.prototype.setValue = function setValue(name, value) {
        var reRender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (name in this.fieldsMeta) {
            this.fieldsMeta[name].value = value;
            // this.onChange({[name]:value});     //人为set不应该属于onChange事件
            reRender && this._reRender();
        } else {
            this.fieldsMeta[name] = {
                value: value
            };
        }
    };

    Field.prototype.setValues = function setValues() {
        var _this4 = this;

        var fieldsValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!this.parseName) {
            for (var name in fieldsValue) {
                this.setValue(name, fieldsValue[name], false);
            }
        } else {
            var fields = this.getNames();
            fields.forEach(function (name) {
                var value = (0, _utils.getIn)(fieldsValue, name);
                if (value !== undefined) {
                    _this4.setValue(name, value, false);
                }
            });
        }
        this._reRender();
    };

    Field.prototype.setError = function setError(name, errors) {
        var err = Array.isArray(errors) ? errors : errors ? [errors] : [];
        if (name in this.fieldsMeta) {
            this.fieldsMeta[name].errors = err;
        } else {
            this.fieldsMeta[name] = {
                errors: err
            };
        }

        if (this.fieldsMeta[name].errors && this.fieldsMeta[name].errors.length > 0) {
            this.fieldsMeta[name].state = 'error';
        } else {
            this.fieldsMeta[name].state = '';
        }

        this._reRender();
    };

    Field.prototype.setErrors = function setErrors() {
        var fieldsErrors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        for (var name in fieldsErrors) {
            this.setError(name, fieldsErrors[name]);
        }
    };

    Field.prototype.getError = function getError(name) {
        var field = this._get(name);
        if (field && field.errors && field.errors.length) {
            return field.errors;
        }

        return null;
    };

    Field.prototype.getErrors = function getErrors(names) {
        var _this5 = this;

        var fields = names || this.getNames();
        var allErrors = {};
        fields.forEach(function (f) {
            allErrors[f] = _this5.getError(f);
        });
        return allErrors;
    };

    Field.prototype.getState = function getState(name) {
        var field = this._get(name);

        if (field && field.state) {
            return field.state;
        }

        return '';
    };

    //TODO: isValidating can be replace by getState, and will be removed at 1.0 version


    Field.prototype.isValidating = function isValidating(name) {
        var field = this._get(name);

        return !!field && !!field.state === 'validating';
    };

    //手动触发校验


    Field.prototype.validate = function validate(ns, opt, cb) {
        var _this6 = this;

        var _getParams = (0, _utils.getParams)(ns, opt, cb),
            names = _getParams.names,
            options = _getParams.options,
            callback = _getParams.callback;

        var fieldNames = names || this.getNames();

        var descriptor = {};
        var values = {};

        var hasRule = false;
        for (var i = 0; i < fieldNames.length; i++) {
            var name = fieldNames[i];
            var fieldMeta = this._get(name);

            if (!fieldMeta) continue;

            if (fieldMeta.rules && (Array.isArray(fieldMeta.rules) && fieldMeta.rules.length || Object.prototype.toString.call(fieldMeta.rules) === '[object Object]')) {
                descriptor[name] = fieldMeta.rules;
                values[name] = this.getValue(name);
                hasRule = true;

                // 清空错误
                fieldMeta.errors = [];
                fieldMeta.state = '';
            }
        }

        if (!hasRule) {
            callback && callback(null, this.getValues(fieldNames));
            return;
        }

        var validate = new _asyncValidator2['default'](descriptor);

        validate.validate(values, options, function (errors) {
            var errorsGroup = null;
            if (errors && errors.length) {
                errorsGroup = {};
                errors.forEach(function (e) {
                    var fieldName = e.field;
                    if (!errorsGroup[fieldName]) {
                        errorsGroup[fieldName] = {
                            errors: []
                        };
                    }
                    var fieldErrors = errorsGroup[fieldName].errors;
                    fieldErrors.push(e.message);
                });
            }
            if (errorsGroup) {
                // 更新每个field里面error信息
                for (var _i in errorsGroup) {
                    var field = _this6._get(_i);
                    field.errors = errorsGroup[_i].errors;
                    field.state = 'error';
                }
            }

            //没有错误的修改状态为成功
            for (var _i2 = 0; _i2 < fieldNames.length; _i2++) {
                var _name = fieldNames[_i2];
                var _fieldMeta = _this6._get(_name);
                if (_fieldMeta.rules && !(errorsGroup && _name in errorsGroup)) {
                    _fieldMeta.state = 'success';
                }
            }

            callback && callback(errorsGroup, _this6.getValues(fieldNames));
            _this6._reRender();

            if (errorsGroup && _this6.scrollToFirstError) {
                var firstNode = void 0;
                var firstTop = void 0;
                for (var _i3 in errorsGroup) {
                    var instance = _this6.com.refs[_i3] || _this6._get(_i3).ref;
                    var node = _reactDom2['default'].findDOMNode(instance);
                    if (!node) {
                        return;
                    }
                    var top = node.getBoundingClientRect().top;
                    if (firstTop === undefined || firstTop > top) {
                        firstTop = top;
                        firstNode = node;
                    }
                }
                if (firstNode && firstNode.scrollIntoView) {
                    firstNode.scrollIntoView();
                }
            }
        });
    };

    /**
     * clear form OR reset to default
     * @param ns
     * @param backToDefault
     */


    Field.prototype.reset = function reset(ns) {
        var _this7 = this;

        var backToDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var changed = false;
        if (typeof ns === 'string') {
            ns = [ns];
        } else if (typeof ns === 'boolean') {
            backToDefault = ns;
            ns = null;
        }

        var names = ns || Object.keys(this.fieldsMeta);
        names.forEach(function (name) {
            var field = _this7._get(name);
            _this7.getValue(name);
            if (field) {
                changed = true;

                if (_this7.deepReset) {
                    //有默认值的情况
                    if (backToDefault && 'initValue' in field) {
                        field.value = field.initValue;
                    } else {
                        field.value = undefined;
                    }
                } else {
                    /* eslint-disable no-lonely-if */
                    if ('initValue' in field) {
                        if (backToDefault === false) {
                            if (typeof field.value === 'string') {
                                field.value = '';
                            } else {
                                field.value = field.initValue;
                            }
                        } else {
                            field.value = field.initValue;
                        }
                    } else {
                        // 没有设置默认值的情况
                        /* eslint-disable no-lonely-if */
                        if (typeof field.value === 'boolean') {
                            field.value = false;
                        } else if (typeof field.value === 'string') {
                            field.value = '';
                        } else {
                            field.value = undefined;
                        }
                    }
                }

                field.state = '';

                // delete field.value;
                delete field.errors;
                delete field.rules;
                delete field.rulesMap;
            }
        });
        if (changed) {
            this._reRender();
        }
    };

    //单个校验


    Field.prototype._validate = function _validate(rule, name, value) {
        var _this8 = this;

        var field = this._get(name);
        field.state = 'validating';

        var validate = new _asyncValidator2['default'](_defineProperty({}, name, rule));

        validate.validate(_defineProperty({}, name, value), function (errors) {

            if (errors && errors.length) {
                field.errors = (0, _utils.getErrorStrs)(errors);
                field.state = 'error';
            } else {
                field.errors = []; //清空错误
                field.state = 'success';
            }

            _this8._reRender();
        });
    };

    Field.prototype._resetError = function _resetError(name) {
        var field = this._get(name);
        delete field.errors; //清空错误
        field.state = '';
    };

    Field.prototype.getNames = function getNames() {
        var fieldsMeta = this.fieldsMeta;
        return fieldsMeta ? Object.keys(fieldsMeta).filter(function () {
            return true;
        }) : [];
    };

    //触发render重绘组件


    Field.prototype._reRender = function _reRender() {
        if (this.com) {
            if (!this.forceUpdate && this.com.setState) {
                this.com.setState({});
            } else if (this.com.forceUpdate) {
                this.com.forceUpdate(); //forceUpdate 对性能有较大的影响，成指数上升
            }
        }
    };

    Field.prototype._get = function _get(name) {
        return name in this.fieldsMeta ? this.fieldsMeta[name] : null;
    };

    Field.prototype._getAll = function _getAll() {
        return this.fieldsMeta;
    };

    Field.prototype.remove = function remove(ns) {
        var _this9 = this;

        if (typeof ns === 'string') {
            ns = [ns];
        }
        var names = ns || Object.keys(this.fieldsMeta);
        names.forEach(function (name) {
            if (name in _this9.fieldsMeta) {
                delete _this9.fieldsMeta[name];
            }
        });
    };

    return Field;
}();

exports['default'] = Field;
module.exports = exports['default'];