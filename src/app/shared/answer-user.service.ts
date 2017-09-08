import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AnswerUser } from '../domain/answer-user.domain';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AnswerUserService {

  constructor(private http: Http,
              private authService: AuthenticationService) { }

  private answersUrl = environment.apiUrl + '/answer_user/list';
  private answersByEventIdUrl = environment.apiUrl + '/answer_user/listByEvent/';
  private headers = new Headers({'Authorization': 'Bearer ' + this.authService.token});
  private options = new RequestOptions({headers: this.headers});

  getAnswers(): Observable<AnswerUser[]> {
    return this.http
      .get(this.answersUrl, this.options)
      .map((response: Response) => <AnswerUser[]> response.json());
  }

  getAnswersByEventId(id: number): Observable<AnswerUser[]> {
    return this.http
      .get(this.answersByEventIdUrl + id.toString(), this.options)
      .map((response: Response) => <AnswerUser[]> response.json());
  }
}
