import {Router} from '@angular/router';
import {Configuration} from '../configuration.standalone';

export class Routerable {

  constructor(protected router: Router) {
  }
  /* WZOR:
    protected goToUserCreatePage() {
      this.goTo(Configuration.userCreateUrl);
    }
  */
  protected goToEventEdit() {
    this.goTo(Configuration.eventEditUrl);
  }
  protected goToMenuPage() {
    this.goTo(Configuration.menuPageUrl);
  }

  protected goToEventCreate() {
    this.goTo(Configuration.eventCreateUrl);
  }

  protected goToEventShow() {
    this.goTo(Configuration.eventShowUrl);
  }

  protected goToEventStats() {
    this.goTo(Configuration.eventStats);
  }

  protected goToTemplateCreate() {
    this.goTo(Configuration.templateCreateUrl);
  }

  protected goToTemplateShow() {
    this.goTo(Configuration.templateShowUrl);
  }

  protected goToCategoryCreate() {
    this.goTo(Configuration.categoryCreateUrl);
  }

  protected goToShowStats() {
    this.goTo(Configuration.showStatsUrl);
  }

  protected goToHomePage(){
    this.goTo(Configuration.homeUrl);
  }

  protected goToLoginPage(){
    this.goTo(Configuration.loginUrl);

  }

  protected goTo(url: string) {
    this.router.navigate([url]);
  }

}
