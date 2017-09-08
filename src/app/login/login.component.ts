import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentication.service';
import {Message} from 'primeng/primeng';
import {User} from '../domain/user.domain';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  model: any = {};

  userFromForm: User = new User();
  loading = false;
  msgsValLogin: Message[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    if (this.isLoginValid() === false) {
      this.emptyLoginInputsError();
    } else {
        this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
          result => {
            if (result === true) {
              this.router.navigate(['/home']);
            } else {
              this.loginFailError();
            }
          }
        );
    }
  }

  loginFailError() {
    this.msgsValLogin = [];
    this.msgsValLogin.push({severity: 'error', summary: 'Error - Log in', detail: 'Username or password is incorrect'});
  }
  emptyLoginInputsError() {
    this.msgsValLogin = [];
    if (!this.model.username) {
      this.msgsValLogin.push({severity: 'error', summary: 'Error - Login', detail: 'Username is required'});
    }
    if (!this.model.password) {
      this.msgsValLogin.push({severity: 'error', summary: 'Error - Password', detail: 'Password is required'});
    }
  }
  isLoginValid() {
    var result = true;
    if (!this.model.username) {
      result = false;
    }
    if (!this.model.password) {
      result = false;
    }
    return result;
  }
}
