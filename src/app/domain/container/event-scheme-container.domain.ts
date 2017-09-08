import { Scheme } from '../scheme.domain';
import { Event } from '../event.domain';

export class EventSchemeContainer {
  events: Event[];
  schemes: Scheme[];

  constructor() {
    this.events = [];
    this.schemes = [];
  }

  public static OneEventOneSchemeInstance(scheme: Scheme, event: Event) {
    let result = new EventSchemeContainer();
    result.events.push(event);
    result.schemes.push(scheme);
    return result;
  }

  public isEmpty(): boolean {
    return (this.events.length === 0 && this.schemes.length === 0);
  }

  public 
}
