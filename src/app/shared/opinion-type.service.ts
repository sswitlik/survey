import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {OpinionType} from '../domain/opinion-type.domain';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class OpinionTypeService {

  constructor(private http: Http,
              private authService: AuthenticationService) {
  }

  private opinionTypesUrl = environment.apiUrl +  '/opinion_type/list';
  private headers = new Headers({'Authorization': 'Bearer ' + this.authService.token});
  private options = new RequestOptions({headers: this.headers});

  getOpinionTypes(): Observable<OpinionType[]> {
      return this.http.get(this.opinionTypesUrl, this.options)
        .map((response: Response) => <OpinionType[]> response.json());
  }

}
