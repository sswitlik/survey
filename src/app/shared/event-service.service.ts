import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Event} from '../domain/event.domain';
import {EventSchemeContainer} from '../domain/container/event-scheme-container.domain';
import {AuthenticationService} from './authentication.service';


@Injectable()
export class EventServiceService {

  constructor(private http: Http,
              private authService: AuthenticationService) {
  }

  static event: Event;

  private eventsUrl = environment.apiUrl + '/event/list';
  private createEventUrl = environment.apiUrl + '/event/create';
  private updateEventUrl = environment.apiUrl + '/event/update';
  private deleteEventUrl = environment.apiUrl + '/event/delete';
  private eventSchemeListsUrl = environment.apiUrl + '/event/scheme/list/active';
  private eventByTagUrl = environment.apiUrl + '/event/list/tags';
  private headers = new Headers({'Authorization': 'Bearer ' + this.authService.token});
  private options = new RequestOptions({headers: this.headers});

  getEventsByTags(tags: String[]): Observable<Event[]> {
    return this.http
      .post(this.eventByTagUrl, tags, this.options)
      .map((response: Response) => <Event[]>response.json());
  }

  getEvents(): Observable<Event[]> {
    return this.http
      .get(this.eventsUrl, this.options)
      .map((response: Response) => <Event[]>response.json());
  }

  getEvent(id: number): Observable<Event> {
    return this.http
      .get(this.eventsUrl + '/' + id.toString(), this.options)
      .map((response: Response) => <Event>response.json());
  }

  getEventsInPeriod(start: Date, end: Date): Observable<EventSchemeContainer> {
    const startTime = start.getTime().toString();
    const endTime = end.getTime().toString();

    return this.http
      .get(this.eventSchemeListsUrl + '/' + startTime + '/' + endTime, this.options)
      .map((response: Response) => <EventSchemeContainer>response.json());
  }

  saveEvent(data: any): Observable<any> {
    return this.http.post(
      this.createEventUrl,
      data,
      this.options);
  }

  updateEvent(data: any): Observable<any> {
    return this.http.post(
      this.updateEventUrl,
      data,
      this.options);
  }

  deleteEvent(data: any): Observable<any> {
    return this.http.post(
      this.deleteEventUrl,
      data,
      this.options);
  }

}
