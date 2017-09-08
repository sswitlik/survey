import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Routerable } from '../shared/base/base.component';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { MenuPageModule } from './menu-page.module';
import { isBoolean } from 'util';
import { AuthenticationService } from '../shared/authentication.service'

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuPageComponent extends Routerable implements OnInit{

  isVerification: boolean;
  isLoginPageActive: boolean;

  items: MenuItem[] = [
    {icon: 'fa-home', command: (event) => super.goToHomePage()},
    {
      label: 'Event',
      items: [
        {label: 'Create', icon: 'fa-plus', command: (event) => super.goToEventCreate()},
        {label: 'Show', icon: 'fa-calendar', command: (event) => super.goToEventShow()}],
    },
    {
      label: 'Template',
      items: [
        {label: 'Create', icon: 'fa-plus', command: (event) => super.goToTemplateCreate()}]
    },
    {
      label: 'Tag',
      items: [
        {label: 'Create/Delete/Show', icon: 'fa-book' , command: (event) => super.goToCategoryCreate()}]
    },
    { 
      label: 'Statistics',
      items: [
        {label: 'Show', icon: 'fa-bar-chart', command: (event) => super.goToShowStats()}]
    }
  ];

// ----------------------------------------------------------------------------

  ngOnInit() {
    this.authenticationService.getVerification()
                          .subscribe((isVerification) => {
                            this.isVerification = isVerification;
                          });
  }

  constructor(protected router: Router, private authenticationService: AuthenticationService) {
    super(router);
  }

  setVerification() {
    this.authenticationService.setVerification(this.isVerification);
  }

  isLogin() {
    let routerUrl = this.router.url;
    let loginUrl = '/login';    //Configuration.loginUrl;
    this.isLoginPageActive = routerUrl === loginUrl;
    return this.isLoginPageActive;
  }

  logout() {
    this.authenticationService.logout();
    this.goToLoginPage();
  }
}

