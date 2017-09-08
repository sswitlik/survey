import { Component,
         OnInit,
         OnChanges,
         ViewEncapsulation,
         Input,
         SimpleChanges } from '@angular/core';

import { Scheme } from '../../../domain/scheme.domain';
import { Event } from '../../../domain/event.domain';

@Component({
  selector: 'app-scheme-view',
  templateUrl: './scheme-view.component.html',
  styleUrls: ['./scheme-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SchemeViewComponent implements OnInit, OnChanges {

  DAY = 86400000;

  currentDate: Date;
  scheduleFirstDate: Date;
  scheduleLastDate: Date;
  eventsParsed: any[] = [];

  scheduleOption: Object;
  scheme: Scheme = Scheme.instance();
  events: Event[] = [];

  @Input() from: Date;
  @Input() to: Date;
  @Input() firstStop: Date;
  @Input() interval: number;
  @Input() disabledWeekDays: number[] = [];
  @Input() disabledStartDays: Date[] = [];

// ------------------------------------------------------------------------------------------
  constructor() {
  }

  ngOnInit() {
    this.scheme = Scheme.instance();
    this.scheduleOption = {
      firstDay: 1,
      timeFormat: 'H:mm',
      header:
        {
          left: 'title ',
          center: '',
          right: 'today prev,next '
        }

    };
  }

  ngOnChanges(changes: SimpleChanges) {
    this.eventsParsed = [];
    this.events = [];
    for (let propName in changes) {
      this.scheme[propName] = this[propName];
    }
    this.displayEvents();
  }

  parseEvents() {
    for (let i = 0; i < this.events.length; i++) {
        let startDate = new Date(this.events[i].from);
        let stopDate = new Date(this.events[i].to);
          this.eventsParsed.push({
            'title': this.events[i].title,
            'start': startDate,
            'end': stopDate,
            'color': 'rgba(69,158,0,0.8)',
            'borderColor': '#327e04',
            'id': i
          });
      }
  }

  displayEvents() {
    if (this.isCompletelyDefined(this.scheme)) {
      if (this.eventsParsed.length === 0) {
        this.generateEventsFromScheme();
        this.parseEvents();
      }
    }
  }

  scheduleRender(schedule) {

    this.eventsParsed = [];
    this.events = [];

    const firstMonthDay: Date = schedule.getDate()._d;
    this.setDates(firstMonthDay);
    this.displayEvents();
  }

  setDates(firstMonthDay: Date) {
    this.scheduleFirstDate = new Date(firstMonthDay);
    this.scheduleLastDate = new Date(firstMonthDay);

    this.scheduleFirstDate.setDate(1);
    this.scheduleFirstDate.setDate(-6);
    this.scheduleLastDate.setDate(38);

    this.scheduleFirstDate.setHours(0);
    this.scheduleFirstDate.setMinutes(0);
    this.scheduleFirstDate.setSeconds(0);
    this.scheduleFirstDate.setMilliseconds(0);

    this.scheduleLastDate.setHours(23);
    this.scheduleLastDate.setMinutes(59);
    this.scheduleLastDate.setSeconds(59);
    this.scheduleLastDate.setMilliseconds(999);
  }

  generateEventsFromScheme() {
    this.scheme.from = new Date(this.scheme.from);
    this.scheme.to = new Date(this.scheme.to);
    this.scheme.firstStop = new Date(this.scheme.firstStop);

    const currentFrom = new Date(this.scheme.from);
    if (this.scheduleFirstDate.getTime() > currentFrom.getTime() ) {
      currentFrom.setFullYear(this.scheduleFirstDate.getFullYear());
      currentFrom.setMonth(this.scheduleFirstDate.getMonth());
      currentFrom.setDate(this.scheduleFirstDate.getDate());
    }

    const currentTo = new Date(currentFrom.getTime() + (this.scheme.firstStop.getTime() - this.scheme.from.getTime()));

    const lastStop = new Date(this.scheme.to);
    if (this.scheduleLastDate.getTime() < lastStop.getTime() ) {
      lastStop.setFullYear(this.scheduleLastDate.getFullYear());
      lastStop.setMonth(this.scheduleLastDate.getMonth());
      lastStop.setDate(this.scheduleLastDate.getDate());
    }

    while (currentFrom.getTime() < lastStop.getTime()) {
      if (this.isDayInScheme(this.scheme, currentFrom)) {
        this.events.push(this.makeEvent(this.scheme, new Date(currentFrom), new Date(currentTo)));
      }

      currentFrom.setDate(currentFrom.getDate() + 1);
      currentTo.setDate(currentTo.getDate() + 1);
    }
  }

// -----SHOULD BE IN SCHEME CLASS---------------------------
  isDateInInterval(scheme: Scheme, date: Date): boolean {
    const milisecondsFromStart = date.getTime() - scheme.from.getTime() + 3700000;
    const daysFromStart = Math.floor(milisecondsFromStart / this.DAY + 1);

    let disabledDaysNumber = Math.floor(daysFromStart / 7) * scheme.disabledWeekDays.length;
    let currentWeekDay = date.getDay();
    for (let i = 0; i < daysFromStart % 7; i++) {
      if (scheme.disabledWeekDays.includes(currentWeekDay)){
        disabledDaysNumber++;
      }

      currentWeekDay--;
      if (currentWeekDay < 0) {
        currentWeekDay = 6;
      }
    }

    let daysFromStartWithoutDisabled = daysFromStart - disabledDaysNumber;

    return (daysFromStartWithoutDisabled - 1) % scheme.interval === 0;
  }

  isDayInScheme(scheme: Scheme, date: Date): boolean {
    let result = true;

    if (this.containsEvent(scheme, date)) {
      result = false;
    }

    if (this.containsDisabledDay(scheme, date)) {
      result = false;
    }

    if (this.containsDisabledWeekDay(scheme, date)) {
      result = false;
    }

    if (!this.isDateInInterval(scheme, date)) {
      result = false;
    }

    return result;
  }

  containsDisabledWeekDay(scheme: Scheme, date: Date): boolean {
    return scheme.disabledWeekDays.includes(date.getDay());
  }

  containsEvent (scheme: Scheme, date: Date): boolean {
    let result = false;
    scheme.events.forEach((event) => {
      event.from = new Date(event.from);
      if (this.dateEqual(event.from, date)) {
        result = true;
        return;
      }
    });
    return result;
  }

  containsDisabledDay (scheme: Scheme, date: Date): boolean {
    let result = false;
    scheme.disabledStartDays.forEach((disabled: Date) => {
      if (this.dateEqual(disabled, date)) {
        result = true;
        return;
      }
    });
    return result;
  }

  makeEvent (scheme: Scheme, from: Date, to: Date): Event {
    let result = new Event();
    result.from = from;
    result.to = to;
    result.desc = scheme.desc;
    result.eventTemplate = scheme.eventTemplate;
    result.tags = scheme.tags;
    result.title = scheme.title;
    result.answerMask = null;

    return result;
  }

  isCompletelyDefined(scheme: Scheme) {
    let result = true;

    if (!scheme.from) {
      result = false;
    }

    if (!scheme.to) {
      result = false;
    }

    if (!scheme.firstStop) {
      result = false;
    }

    if (!scheme.interval) {
      result = false;
    }

    return result;
  }
// -----------------------------------------------------------------
  dateEqual (date1: Date, date2: Date) {
  if (date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()) {
    return true;
  } else {
    return false;
  }
}
}
