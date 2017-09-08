import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../domain/user.domain';
import { environment } from '../../environments/environment';
import { VerificationContainer } from '../domain/container/verification-container.domain';
import {Md5} from 'ts-md5/dist/md5'


@Injectable()
export class AuthenticationService {

  public token: string;
  private userUrl;
  private getVerificationUrl = environment.apiUrl + '/verification/get';
  private setVerificationUrl = environment.apiUrl + '/verification/set';

  public headers;
  public options;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string) {

    password = Md5.hashAsciiStr(password).toString();
    this.userUrl = environment.apiUrl + '/login';
    return this.http.post(this.userUrl, JSON.stringify({username: username, password: password}),
      {headers: this.headers})
      .map((response: Response) => {
        let token = response.headers.get('authorization');

        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
          return true;
        } else {
          return false;
        }
      });

  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getVerification() {
    return this.http.get(this.getVerificationUrl).map((response: Response) => <boolean> response.json());
  }

  setVerification(setter: boolean) {
    this.headers = new Headers({'Authorization': 'Bearer ' + this.token});
    this.options = new RequestOptions({headers: this.headers});
    let container = VerificationContainer.Instance(setter);
    console.log('send', container);
    this.http.post(this.setVerificationUrl, container, this.options).subscribe();
  }

  isLogedin(): boolean {
    return localStorage.getItem('currentUser') != null;
  }
}
