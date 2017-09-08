import { Template } from './template';
import { Event } from './event.domain';
import { Tag } from './tag.domain';

export class Scheme {
  title: string;
  desc: string;
  from: Date;
  to: Date;
  firstStop: Date;
  dayForEvent: number;
  interval: number;
  disabledWeekDays: number[];
  disabledStartDays: Date[];
  eventTemplate: Template;
  events: Event[];
  tags: Tag[];

  public static getSchemeStatus(scheme: Scheme): number {
    let result;
    let today = new Date();
    scheme.to = new Date(scheme.to);
    scheme.from = new Date(scheme.from);
    if (scheme.to.getTime() < today.getTime()) {
      result = -1;
    } else if (scheme.from.getTime() < today.getTime() && scheme.to.getTime() > today.getTime()) {
      result = 0;
    } else if (scheme.from.getTime() > today.getTime()) {
      result = 1;
    }
    return result;
  }

  public static instance(): Scheme {
    let result: Scheme = new Scheme();
    result.title = '';
    result.desc = '';
    result.from = null;
    result.to = null;
    result.firstStop = null;
    result.dayForEvent = 0;
    result.interval = null;
    result.disabledWeekDays = [];
    result.disabledStartDays = [];
    result.eventTemplate = null;
    result.events = [];
    result.tags = [];

    return result;
  }

  public containsEvent (date: Date): boolean {
    let result = false;
    this.events.forEach((event: Event) => {
      if (this.dateEqual(event.from, date)) {
        result = true;
        return;
      }
    });
    return result;
  }

  public containsDisabledDay (date: Date): boolean {
    let result = false;
    this.disabledStartDays.forEach((disabled: Date) => {
      if (this.dateEqual(disabled, date)) {
        result = true;
        return;
      }
    });
    return result;
  }

  containsDisabledWeekDay(date: Date): boolean {
    return this.disabledWeekDays.includes(date.getDay());
  }

  public isDayInScheme(date: Date): boolean {
    let result = true;
    if (this.containsEvent(date)) {
      result = false;
    }

    if (this.containsDisabledDay(date)) {
      result = false;
    }

    if (this.containsDisabledWeekDay(date)) {
      result = false;
    }

    return result;
  }

  public makeEvent (from: Date, to: Date): Event {
    let result = new Event();
    result.from = from;
    result.to = to;
    result.desc = this.desc;
    result.eventTemplate = this.eventTemplate;
    result.tags = this.tags;
    result.title = this.title;
    result.scheme = this;

    return result;
  }

  private dateEqual (date1: Date, date2: Date) {
    if (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()) {
      return true;
    } else {
      return false;
    }
  }

}

