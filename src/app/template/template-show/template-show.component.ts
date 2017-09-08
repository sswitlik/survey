import {OpinionOption} from '../../domain/opinion-option.domain';
import {Component, OnInit} from '@angular/core';
import {Routerable} from '../../shared/base/base.component';
import {Router} from '@angular/router';
import {TemplateServiceService} from '../../shared/template-service.service';
import {Template} from '../../domain/template';


@Component({
  selector: 'app-template-show',
  templateUrl: './template-show.component.html',
  styleUrls: ['./template-show.component.css']
})
export class TemplateShowComponent extends Routerable implements OnInit {

  templates: Template[] = [];

  constructor(protected router: Router,
    private templateService: TemplateServiceService) {
    super(router);
  }

  ngOnInit() {
    this.getTemplates();
  }
  
  isEmotsInTemplate(opinionEmots: OpinionOption[]): boolean {
    for (let i = 0; i < opinionEmots.length; i++) {
      if (opinionEmots[i].type.type === 'Emoticons') {
        return true;
      }
    }
    return false;
  }

  isStarsInTemplate(opinionStars: OpinionOption[]): boolean {

    for (let i = 0; i < opinionStars.length; i++) {
      if (opinionStars[i].type.type === 'Stars') {
        return true;
      }
    }
    return false;
  }
  getTemplates() {
    this.templateService.getTemplates()
      .subscribe(
      templates => this.templates = templates
      );
  }

  goToEdit(template: Template) {
    TemplateServiceService.template = template;
    console.log(TemplateServiceService.template.name);
    this.goToTemplateCreate();
  }
  deleteTemplate(template: Template) {
    this.templateService.deleteTemplate(template)
      .subscribe(error => {
        this.templates = [];
        this.getTemplates();
        console.log('Log', error);
      });
    //    const index = this.templates.indexOf(template);
    //    this.templates = this.templates.filter((val, i) => i !== index);
  }

}
