import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Tag} from '../domain/tag.domain';
import { environment } from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class TagServiceService {

  constructor(private http: Http,
              private authService: AuthenticationService) {
  }

  private tagsUrl = environment.apiUrl + '/tag/list';
  private deleteTagUrl = environment.apiUrl + '/tag/delete'
  private createTagUrl = environment.apiUrl + '/tag/create';
  private headers = new Headers({'Authorization': 'Bearer ' + this.authService.token});
  private options = new RequestOptions({headers: this.headers});
  
  getTags(): Observable<Tag[]> {
    return this.http
      .get(this.tagsUrl, this.options)
      .map((response: Response) => <Tag[]> response.json());
  }


  saveTag(data: any): Observable<any> {
    return this.http.post(
      this.createTagUrl,
      data,
      this.options);
  }

  deleteTag(data: any): Observable<any> {
    return this.http.post(
      this.deleteTagUrl,
      data,
      this.options);
  }

}
