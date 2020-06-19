'use strict';

var React = require('react');
var classNames = require('classnames');
var ClassNameMixin = require('../mixins/ClassNameMixin');

var TimePicker = React.createClass({
  displayName: 'TimePicker',

  mixins: [ClassNameMixin],

  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    date: React.PropTypes.object,
    format: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'datepicker',
      format: 'HH:mm'
    };
  },

  getInitialState: function getInitialState() {
    return {
      viewDate: this.props.date,
      selectedDate: this.props.date,
      displayed: {
        times: { display: 'block' },
        minutes: { display: 'none' },
        hours: { display: 'none' }
      }
    };
  },

  // Minutes
  addMinute: function addMinute() {
    var viewDate = this.state.viewDate;

    viewDate.setMinutes(viewDate.getMinutes() + 1);

    this.setTime(viewDate);
  },

  subtractMinute: function subtractMinute() {
    var viewDate = this.state.viewDate;

    viewDate.setMinutes(viewDate.getMinutes() - 1);

    this.setTime(viewDate);
  },

  setTime: function setTime(viewDate) {
    this.setState({
      viewDate: viewDate,
      selectedDate: new Date(viewDate.valueOf())
    }, function () {
      this.props.onSelect(this.state.selectedDate);
    });
  },

  // set Minutes
  setSelectedMinute: function setSelectedMinute(event) {
    var viewDate = this.state.viewDate;
    var minute = parseInt(event.target.innerHTML.split(':')[1]);

    viewDate.setMinutes(minute);
    this.setTime(viewDate);

    this.setState({
      displayed: {
        times: { display: 'block' },
        minutes: { display: 'none' },
        hours: { display: 'none' }
      }
    });
  },

  showMinutes: function showMinutes() {
    this.setState({
      displayed: {
        times: { display: 'none' },
        minutes: { display: 'block' },
        hours: { display: 'none' }
      }
    });
  },

  // Hours
  showHours: function showHours() {
    this.setState({
      displayed: {
        times: { display: 'none' },
        minutes: { display: 'none' },
        hours: { display: 'block' }
      }
    });
  },

  setSelectedHour: function setSelectedHour(event) {
    var viewDate = this.state.viewDate;
    var hour = parseInt(event.target.innerHTML);

    viewDate.setHours(hour);
    this.setTime(viewDate);

    this.setState({
      displayed: {
        times: { display: 'block' },
        minutes: { display: 'none' },
        hours: { display: 'none' }
      }
    });
  },

  addHour: function addHour() {
    var viewDate = this.state.viewDate;

    viewDate.setHours(viewDate.getHours() + 1);

    this.setTime(viewDate);
  },

  subtractHour: function subtractHour() {
    var viewDate = this.state.viewDate;

    viewDate.setHours(viewDate.getHours() - 1);

    this.setTime(viewDate);
  },

  showTimeText: function showTimeText() {
    var hour = this.state.viewDate.getHours();
    var minute = this.state.viewDate.getMinutes();

    if (minute < 10) {
      minute = '0' + minute;
    }

    if (hour < 10) {
      hour = '0' + hour;
    }

    return {
      hour: hour,
      minute: minute
    };
  },

  renderHours: function renderHours() {
    var time = this.showTimeText().hour + ':' + this.showTimeText().minute;

    return React.createElement(HoursPicker, {
      style: this.state.displayed.hours,
      setSelectedHour: this.setSelectedHour,
      selectedDate: this.state.selectedDate,
      addHour: this.addHour,
      subtractHour: this.subtractHour,
      showTime: time
    });
  },

  renderMinutes: function renderMinutes() {
    var time = this.showTimeText().hour + ':' + this.showTimeText().minute;

    return React.createElement(MinutesPicker, {
      style: this.state.displayed.minutes,
      setSelectedMinute: this.setSelectedMinute,
      selectedDate: this.state.selectedDate,
      addMinute: this.addMinute,
      subtractMinute: this.subtractMinute,
      showTime: time
    });
  },

  render: function render() {
    var time = this.showTimeText();

    var content = React.createElement(
      'div',
      { className: this.prefixClass('time-box') },
      React.createElement(
        'strong',
        { onClick: this.showHours },
        time.hour
      ),
      React.createElement(
        'em',
        null,
        ':'
      ),
      React.createElement(
        'strong',
        { onClick: this.showMinutes },
        time.minute
      )
    );

    return React.createElement(
      'div',
      { className: this.prefixClass('body') },
      React.createElement(SubPicker, {
        style: this.state.displayed.times,
        displayName: 'time-wrapper',
        body: content,
        add: this.addMinute,
        subtract: this.subtractMinute,
        showFunc: this.props.showDate,
        showText: 'today'
      }),
      this.renderHours(),
      this.renderMinutes()
    );
  }
});

var HoursPicker = React.createClass({
  displayName: 'HoursPicker',

  mixins: [ClassNameMixin],

  propTypes: {
    setSelectedHour: React.PropTypes.func.isRequired,
    selectedDate: React.PropTypes.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'datepicker'
    };
  },

  renderHour: function renderHour() {
    var classes;
    var hour = this.props.selectedDate.getHours();
    var i = 0;
    var hours = [];

    while (i < 24) {
      classes = {};
      classes[this.prefixClass('hour')] = true;

      if (i === hour) {
        classes[this.setClassNamespace('active')] = true;
      }

      hours.push(React.createElement(
        'span',
        {
          className: classNames(classes),
          onClick: this.props.setSelectedHour,
          key: i
        },
        i < 10 ? '0' + i + ':00' : i + ':00'
      ));

      i++;
    }

    return hours;
  },

  render: function render() {
    return React.createElement(SubPicker, {
      displayName: 'hours',
      style: this.props.style,
      subtract: this.props.subtractHour,
      add: this.props.addHour,
      showText: this.props.showTime,
      body: this.renderHour()
    });
  }
});

var MinutesPicker = React.createClass({
  displayName: 'MinutesPicker',

  mixins: [ClassNameMixin],

  propTypes: {
    setSelectedMinute: React.PropTypes.func.isRequired,
    selectedDate: React.PropTypes.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'datepicker'
    };
  },

  renderMinute: function renderMinute() {
    var classes;
    var minute = this.props.selectedDate.getMinutes();
    var hour = this.props.selectedDate.getHours();
    var i = 0;
    var minutes = [];

    while (i < 60) {
      classes = {};
      classes[this.prefixClass('minute')] = true;

      if (i === minute) {
        classes[this.setClassNamespace('active')] = true;
      }

      if (i % 5 === 0) {
        minutes.push(React.createElement(
          'span',
          {
            className: classNames(classes),
            onClick: this.props.setSelectedMinute,
            key: i
          },
          i < 10 ? hour + ':0' + i : hour + ':' + i
        ));
      }

      i++;
    }

    return minutes;
  },

  render: function render() {
    return React.createElement(SubPicker, {
      displayName: 'minutes',
      style: this.props.style,
      subtract: this.props.subtractMinute,
      add: this.props.addMinute,
      showText: this.props.showTime,
      body: this.renderMinute()
    });
  }
});

var SubPicker = React.createClass({
  displayName: 'SubPicker',

  mixins: [ClassNameMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'datepicker'
    };
  },

  render: function render() {
    var prefixClass = this.prefixClass;

    return React.createElement(
      'div',
      {
        className: prefixClass(this.props.displayName),
        style: this.props.style },
      React.createElement(
        'table',
        { className: prefixClass('table') },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            { className: prefixClass('header') },
            React.createElement(
              'th',
              { className: prefixClass('prev'), onClick: this.props.subtract },
              React.createElement('i', { className: prefixClass('prev-icon') })
            ),
            React.createElement(
              'th',
              {
                className: prefixClass('switch'),
                colSpan: '5',
                onClick: this.props.showFunc
              },
              React.createElement(
                'div',
                { className: this.prefixClass('select') },
                this.props.showText
              )
            ),
            React.createElement(
              'th',
              { className: prefixClass('next'), onClick: this.props.add },
              React.createElement('i', { className: prefixClass('next-icon') })
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { colSpan: '7' },
              this.props.body
            )
          )
        )
      )
    );
  }
});

module.exports = TimePicker;