import { Component, OnInit, DoCheck, ViewEncapsulation } from '@angular/core';
import { forEachChild } from 'typescript';
import { Routerable } from '../../shared/base/base.component';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import { SchemeService } from '../../shared/scheme.service';
import { Event } from '../../domain/event.domain';
import { Scheme } from '../../domain/scheme.domain';
import { EventServiceService } from '../../shared/event-service.service';
import { EventSchemeContainer } from '../../domain/container/event-scheme-container.domain';

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventShowComponent extends Routerable implements OnInit, DoCheck {

  DAY = 86400000;

  currentDate: Date;
  scheduleFirstDate: Date;
  scheduleLastDate: Date;

  container: EventSchemeContainer = new EventSchemeContainer();
  events: Event[] = [];
  schemes: Scheme[] = [];
  eventsParsed: any[] = [];
  activeEvent: Event = null;
  activeEventId: number;

  option: Object;
  scheduleHeight: number;
  empty: any[] = [];

  timerInterval = 60000;
  showMsgs: Message[] = [];
  displayStopDialog = false;
  displayDeleteDialog = false;

// ------------------------------------------------------------------
  constructor(protected router: Router,
              private eventService: EventServiceService,
              private schemeService: SchemeService) {
    super(router);
  }

  ngOnInit() {
    this.scheduleResize();
    this.option = {
      firstDay: 1,
      timeFormat: 'H:mm',
      header:
        {
          left: 'title ',
          center: '',
          right: 'today prev,next '
        }

    };

    IntervalObservable.create(this.timerInterval)
      .subscribe(() => {
        this.eventsParsed = [];
        this.events = [];
        this.schemes = [];
        this.container = new EventSchemeContainer();
        this.getEvents();
      });
  }

  ngDoCheck() {
    if (this.eventsParsed.length === 0 && !this.isContainerEmpty(this.container)) {
      this.schemes = this.container.schemes;
      this.events = this.container.events;

      this.generateEventsFromSchemes();
      this.parseEvents();
    }
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
        'className': 'event',
        'id': i
      });
    }
  }

  onEventClick(event) {
    this.activeEvent = this.events[event.calEvent.id];
  }

  getEvents() {
    this.eventService.getEventsInPeriod(this.scheduleFirstDate, this.scheduleLastDate)
      .subscribe(
        container => {
          this.container = container;
          this.container.events.forEach((event) => {
            event.from = new Date(event.from);
            event.to = new Date(event.to);
          });
        }
      );
  }

  scheduleRender(schedule) {

   this.cleanBuffer();

    const firstMonthDay: Date = schedule.getDate()._d;
    this.setDates(firstMonthDay);
    this.getEvents();
  }

  setDates(firstMonthDay: Date) {
    this.scheduleFirstDate = new Date(firstMonthDay);
    this.scheduleLastDate = new Date(firstMonthDay);

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

  generateEventsFromSchemes() {
    this.schemes.forEach((scheme) => {
      this.saveSchemeEvents(scheme);
      scheme.from = new Date(scheme.from);
      scheme.to = new Date(scheme.to);
      scheme.firstStop = new Date(scheme.firstStop);
      for (let i = 0; i < scheme.disabledStartDays.length; i++) {
        scheme.disabledStartDays[i] = new Date(scheme.disabledStartDays[i]);
      }

      const currentFrom = new Date(scheme.from);
      if (this.scheduleFirstDate.getTime() > currentFrom.getTime()) {
        currentFrom.setFullYear(this.scheduleFirstDate.getFullYear());
        currentFrom.setMonth(this.scheduleFirstDate.getMonth());
        currentFrom.setDate(this.scheduleFirstDate.getDate());
      }

      const currentTo = new Date(currentFrom.getTime() + (scheme.firstStop.getTime() - scheme.from.getTime()));

      const lastStop = new Date(scheme.to);
      if (this.scheduleLastDate.getTime() < lastStop.getTime()) {
        lastStop.setFullYear(this.scheduleLastDate.getFullYear());
        lastStop.setMonth(this.scheduleLastDate.getMonth());
        lastStop.setDate(this.scheduleLastDate.getDate());
      }

      while (currentFrom.getTime() < lastStop.getTime()) {
        if (this.isDayInScheme(scheme, currentFrom)) {
          this.events.push(this.makeEvent(scheme, new Date(currentFrom), new Date(currentTo)));
        }

        currentFrom.setDate(currentFrom.getDate() + 1);
        currentTo.setDate(currentTo.getDate() + 1);
      }
    });
  }

  scheduleResize() {
    // popsulo sie, dzialalo 2017-09-04 rano
    let schedulePadding = window.getComputedStyle(document.getElementById('scheduleArea')).paddingLeft;
    schedulePadding = schedulePadding.substring(0, schedulePadding.length - 2);
    const schedulePaddingInt = parseInt(schedulePadding, 0);

    this.scheduleHeight = window.innerHeight - document.getElementById('menu').clientHeight - schedulePaddingInt * 2;
  }

  deleteEvent(event: Event) {
    if (event.scheme) {
      event.scheme.disabledStartDays.push(event.from);
      this.schemeService.updateScheme(event.scheme)
        .subscribe(error => {
          console.log('Log', error);
        });
    } else {
      this.eventService.deleteEvent(event)
        .subscribe(error => {
          console.log('Log', error);
        });
    }
    this.showDeleteSucessfully();
    this.events = this.events.filter((event) => !(event.id === this.activeEvent.id 
          && event.from.getTime() === this.activeEvent.from.getTime()));

    this.container.events = this.container.events.filter((event) => !(event.id === this.activeEvent.id 
          && event.from.getTime() === this.activeEvent.from.getTime()));

    this.eventsParsed = [];
    this.parseEvents();
    this.activeEvent = null;
  }

  showEditView(event: Event) {
    let today_date = new Date();
    if (event.from < today_date) {
      this.showEditError();
    } else {
      EventServiceService.event = event;
      super.goToEventEdit();
    }
  }

  showEventStats(event: Event) {
    EventServiceService.event = event;
    super.goToEventStats();
  }

  cleanBuffer() {
    this.eventsParsed = [];
    this.events = [];
    this.schemes = [];
    this.container = new EventSchemeContainer();
  }

  stopEvent(event: Event) {
    let today = new Date();
    event.to.setTime(today.getTime());
    this.eventService.updateEvent(event).subscribe(error => {
          console.log('Log', error);
        });
  }

  stopScheme(scheme: Scheme) {
    let today = new Date();
    scheme.to.setTime(today.getTime());
    this.schemeService.updateScheme(scheme).subscribe(error => {
      console.log('Log', error);
    });
  }

  showStopDialog(event) {
    this.displayStopDialog = true;
  }

  backFromStopDialog() {
    this.displayStopDialog = false;
  }

  confirmStopDialog(deleteInfo: String) {
    if (deleteInfo === 'one') {
      this.stopEvent(this.activeEvent);
    } else  if (deleteInfo === 'all') {
      this.stopScheme(this.activeEvent.scheme);
    }
    this.container = new EventSchemeContainer();
    this.events = [];
    this.eventsParsed = [];
    this.parseEvents();
    this.activeEvent = null;
    this.getEvents();
    
    this.showStopSuccessfully();
    this.backFromStopDialog();
  }

  showDeleteDialog() {
    this.displayDeleteDialog = true;
  }

  backFromDeleteDialog() {
    this.displayDeleteDialog = false;
  }

  confirmDeleteDialog() {
    this.deleteEvent(this.activeEvent);
    this.backFromDeleteDialog();
  }

  isEventCyclic(event: Event) {
    let result;
    if (event && event.scheme) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }

  getEventStatus(event: Event): number {
    return Event.getEventStatus(event);
  }

  isEventActive(event: Event) {
    return this.getEventStatus(this.activeEvent) === 0;
  }

  isSchemeActive(scheme: Scheme) {
    return Scheme.getSchemeStatus(scheme) === 0;
  }

  allowStop(): boolean {
    let result;
    if (this.isEventActive(this.activeEvent)) {
      result = true;
    }
    if (this.activeEvent.scheme && this.isSchemeActive(this.activeEvent.scheme)) {
      result = true;
    }
    return result;
  }

//  eventsEqualByIdAndFrom(event1: Event, event2: Event)
// -----SHOULD BE IN SCHEME CLASS---------------------------
  isDateInInterval(scheme: Scheme, date: Date): boolean {
    const milisecondsFromStart = date.getTime() - scheme.from.getTime() + 3700000;  // +3700000 because of time change
    const daysFromStart = Math.floor(milisecondsFromStart / this.DAY + 1);

    let disabledDaysNumber = Math.floor(daysFromStart / 7) * scheme.disabledWeekDays.length;
    let currentWeekDay = date.getDay();
    for (let i = 0; i < daysFromStart % 7; i++) {
      if (scheme.disabledWeekDays.includes(currentWeekDay)) {
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

  containsEvent(scheme: Scheme, date: Date): boolean {
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

  containsDisabledDay(scheme: Scheme, date: Date): boolean {
    let result = false;
    scheme.disabledStartDays.forEach((disabled: Date) => {
      if (this.dateEqual(disabled, date)) {
        result = true;
        return;
      }
    });
    return result;
  }

  makeEvent(scheme: Scheme, from: Date, to: Date): Event {
    let result = new Event();
    result.from = from;
    result.to = to;
    result.desc = scheme.desc;
    result.eventTemplate = scheme.eventTemplate;
    result.tags = scheme.tags;
    result.title = scheme.title;
    result.answerMask = null;

    result.scheme = scheme;

    return result;
  }

  saveSchemeEvents(scheme: Scheme) {
    scheme.events.forEach((event) => {
      event.scheme = scheme;
      event.from = new Date(event.from);
      event.to = new Date(event.to);
      this.events.push(event);
    });
  }

  dateEqual(date1: Date, date2: Date) {
    if (date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()) {
      return true;
    } else {
      return false;
    }
  }
// ----SHOULD BE IN EventSchemeContainer CLASS--------------

  public isContainerEmpty(container: EventSchemeContainer): boolean {
    return (container.events.length === 0 && container.schemes.length === 0);
  }

// ----VALIDATION----------------------------------------------------

  showStopSuccessfully() {
    this.showMsgs = [];
    this.showMsgs.push({severity: 'sucess', summary: 'Event - Delete', detail: 'Event stopped sucessfully!'});
  }

  showDeleteSucessfully() {
    this.showMsgs = [];
    this.showMsgs.push({severity: 'sucess', summary: 'Event - Delete', detail: 'Event deleted sucessfully!'});
  }

  showEditError() {
    this.showMsgs = [];
    this.showMsgs.push({severity: 'error', summary: 'Event - edit', detail: 'You can\'t edit started event!'});
  }



}
