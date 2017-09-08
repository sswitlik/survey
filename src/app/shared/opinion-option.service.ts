import { OpinionOption } from '../domain/opinion-option.domain';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import {AuthenticationService} from './authentication.service';



@Injectable()
export class OpinionOptionService {


  constructor (private http: Http, private authService: AuthenticationService) {}
  private opinionsUrl = environment.apiUrl + '/opinion_option/list';
  private createOpinionUrl = environment.apiUrl + '/opinion_option/create';
  private opinionsByTypeUrl = environment.apiUrl + '/opinion_option/list/type/';
  private headers = new Headers({'Authorization': 'Bearer ' + this.authService.token});
  private options = new RequestOptions({headers: this.headers});


  getOpinions(): Observable <OpinionOption[]> {
    return this.http
        .get(this.opinionsUrl, this.options)
        .map((response: Response) => <OpinionOption[]> response.json());
  }

  getOpinionsByType(type: String): Observable <OpinionOption[]> {
    return this.http
      .get(this.opinionsByTypeUrl + type, this.options)
      .map((response: Response) => <OpinionOption[]> response.json());
  }

  saveOpinion(data: any): Observable<any> {
    return this.http.post(
      this.createOpinionUrl,
      data,
      this.options);
  }

}
