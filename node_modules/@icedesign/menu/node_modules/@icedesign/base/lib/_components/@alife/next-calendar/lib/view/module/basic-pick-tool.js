'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextRadio = require('../../../../next-radio/lib/index.js');

var _nextRadio2 = _interopRequireDefault(_nextRadio);

var _nextSelect = require('../../../../next-select/lib/index.js');

var _nextSelect2 = _interopRequireDefault(_nextSelect);

var _nextMoment = require('../../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _calendarMixin = require('../calendar-mixin.js');

var _calendarMixin2 = _interopRequireDefault(_calendarMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var BasicSelectTool = (_temp = _class = function (_Component) {
    _inherits(BasicSelectTool, _Component);

    function BasicSelectTool(props) {
        _classCallCheck(this, BasicSelectTool);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            base: props.base,
            mode: props.mode
        };
        return _this;
    }

    BasicSelectTool.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if ('base' in newProps) {
            this.setState({
                base: newProps.base
            });
        }

        if ('mode' in newProps) {
            this.setState({
                mode: newProps.mode
            });
        }
    };

    BasicSelectTool.prototype.onChange = function onChange(key, nextBase) {
        var _state = this.state,
            base = _state.base,
            mode = _state.mode;


        switch (key) {
            case 'year':
                {
                    base = (0, _nextMoment2['default'])(base).year(nextBase);
                    break;
                }
            case 'month':
                {
                    base = (0, _nextMoment2['default'])(base).month(nextBase);
                    break;
                }
            case 'mode':
                {
                    mode = nextBase;
                    break;
                }
        }

        this.props.onChange({
            base: base,
            mode: mode
        });
    };

    BasicSelectTool.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            prefix = _props.prefix,
            type = _props.type,
            locale = _props.locale,
            language = _props.language,
            others = _objectWithoutProperties(_props, ['prefix', 'type', 'locale', 'language']);

        var _state2 = this.state,
            base = _state2.base,
            mode = _state2.mode;


        var size = type === 'fullscreen' ? 'medium' : 'small';

        // get year
        var yearOptions = this.getLateastYears(base.year()).map(function (year, index) {
            return _react2['default'].createElement(
                'option',
                { key: index, value: year },
                year
            );
        });

        // get month
        var monthsLocale = locale.format ? locale.format.shortMonths : this.getMonthsLocale(language);
        var monthOptions = monthsLocale.map(function (month, index) {
            return _react2['default'].createElement(
                'option',
                { key: index, value: index },
                month
            );
        });

        // get class
        var basicCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'calendar-pick-tool', true), _defineProperty(_classNames, prefix + 'calendar-basic-pick-tool', true), _classNames));

        return _react2['default'].createElement(
            'div',
            { className: basicCls },
            _react2['default'].createElement(
                _nextSelect2['default'],
                { prefix: prefix,
                    value: base.year(),
                    size: size,
                    onChange: this.onChange.bind(this, 'year'),
                    container: function container(target) {
                        return target.parentNode;
                    },
                    autoWidth: false },
                yearOptions
            ),
            _react2['default'].createElement(
                _nextSelect2['default'],
                { prefix: prefix,
                    value: base.month(),
                    size: size,
                    onChange: this.onChange.bind(this, 'month'),
                    container: function container(target) {
                        return target.parentNode;
                    },
                    autoWidth: false },
                monthOptions
            ),
            _react2['default'].createElement(
                _nextRadio.Group,
                { shape: 'button', size: size, value: mode, onChange: this.onChange.bind(this, 'mode') },
                _react2['default'].createElement(
                    _nextRadio2['default'],
                    { value: 'month' },
                    locale.month
                ),
                _react2['default'].createElement(
                    _nextRadio2['default'],
                    { value: 'year' },
                    locale.year
                )
            )
        );
    };

    return BasicSelectTool;
}(_react.Component), _class.propTypes = {
    onChange: _propTypes2['default'].func
}, _temp);
BasicSelectTool.displayName = 'BasicSelectTool';


(0, _calendarMixin2['default'])(BasicSelectTool);

exports['default'] = BasicSelectTool;
module.exports = exports['default'];