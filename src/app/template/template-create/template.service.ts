import { Template } from '../../domain/template';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import {AuthenticationService} from '../../shared/authentication.service';

@Injectable()
export class TemplateService {


  constructor (private http: Http,
               private authService: AuthenticationService) {}

  private templatesUrl = environment.apiUrl +  '/template/list';
  private createTemplateUrl = environment.apiUrl + '/template/create';
  private headers = new Headers({'Authorization': 'Bearer ' + this.authService.token});
  private options = new RequestOptions({headers: this.headers});

  getTemplates(): Observable <Template[]> {
    return this.http
        .get(this.templatesUrl, this.options)
        .map((response: Response) => <Template[]> response.json());
  }

  saveTemplate(data: Template): Observable<any> {
    return this.http.post(
      this.createTemplateUrl,
      data,
      this.options);
  }

}
