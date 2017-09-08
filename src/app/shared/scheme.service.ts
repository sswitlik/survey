import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Scheme} from '../domain/scheme.domain';
import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class SchemeService {

  private schemeListUrl = environment.apiUrl + '/scheme/list';
  private createScheme = environment.apiUrl + '/scheme/create';
  private updateEventUrl = environment.apiUrl + '/scheme/event/update';
  private updateSchemeUrl = environment.apiUrl + '/scheme/update';
  private headers = new Headers({'Authorization': 'Bearer ' + this.authService.token});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http,
              private authService: AuthenticationService) {
  }

  updateScheme(scheme): Observable<any> {
    scheme.events.forEach((event) => {
      event.scheme = null;
    });
    return this.http.post(this.updateSchemeUrl, scheme);
  }

  updateEvent(container): Observable<any> {
    container.schemes[0].events.forEach((event) => {
      event.scheme = null;
    });
    console.log('sended: ', container);
    return this.http.post(this.updateEventUrl, container);
  }

  addSchemes(data: any): Observable<any> {
    return this.http.post(
      this.createScheme,
      data,
      this.options);
  }

  getSchemes(): Observable<Scheme[]> {

    return this.http.get(this.schemeListUrl, this.options)
      .map((response: Response) => <Scheme[]> response.json());
  }


}
