import {Injectable} from '@angular/core';
import {Template} from '../domain/template';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class TemplateServiceService {

static template: Template = new Template();
  
  constructor(private http: Http,
    private authService: AuthenticationService) {}
  private templatesUrl = environment.apiUrl + '/template/list';
  private createTemplateUrl = 'http://localhost:8080/template/create';
  private deleteTemplateUrl = environment.apiUrl + '/template/delete';
  private headers = new Headers({'Authorization': 'Bearer ' + this.authService.token});
  private options = new RequestOptions({headers: this.headers});

  getTemplates(): Observable<Template[]> {
    return this.http
      .get(this.templatesUrl, this.options)
      .map((response: Response) => <Template[]>response.json());
  }

  saveTemplate(data: any): Observable<any> {
    return this.http.post(
      this.createTemplateUrl,
      data,
      this.options);
  }

  deleteTemplate(data: any): Observable<any> {
    return this.http.post(
      this.deleteTemplateUrl,
      data,
      this.options);
  }

}
