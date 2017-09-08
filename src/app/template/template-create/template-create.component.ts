import {Routerable} from '../../shared/base/base.component';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Message, SelectItem} from 'primeng/primeng';
import {Router} from '@angular/router';

import {Template} from '../../domain/template';
import {OpinionTypeService} from '../../shared/opinion-type.service';
import {OpinionType} from '../../domain/opinion-type.domain';
import {OpinionOption} from '../../domain/opinion-option.domain';
import {TemplateService} from './template.service';
import {OpinionOptionService} from '../../shared/opinion-option.service';


@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateCreateComponent extends Routerable implements OnInit {
  templates: Template[] = [];

  editedTemplate: Template;
  chosenOpinions: OpinionOption[];
  templateOpt: Template;
  commentCheck = false;
  starsCheck = false;
  emoticonsCheck = false;
  questionnaireCheck = false;
  questionnaires: SelectItem[] = [];

  editedTemplateQuests: OpinionOption[];
  starsArray: OpinionOption[];
  emoticonsArray: OpinionOption[];
  questionnairesArray: OpinionOption[];
  comment: OpinionOption[];

  selectedQuestionnaires: number[] = [];
  singleQuest: OpinionOption;

  templateQuests: OpinionOption[] = [];

  opinionTypes: OpinionType[] = [];

  questsArray: any[] = [];

  msgsTemp: Message[] = [];
  valTemp: String;
  // ----------------------------------------------------------------------

  constructor(private opinionService: OpinionOptionService,
    protected router: Router, private templateService: TemplateService,
    private opinionTypeService: OpinionTypeService) {
    super(router);

    this.getAllOpinions();

  }

  ngOnInit() {
    this.getTemplates();
    this.getAllOpinionTypes();

    this.chosenOpinions = [];
    this.starsArray = [];
    this.emoticonsArray = [];
    this.questionnairesArray = [];

  }

  clearTemplate() {
    this.editedTemplate = null;
    this.valTemp = '';
    this.starsCheck = false;
    this.emoticonsCheck = false;
    this.commentCheck = false;
    this.questionnaireCheck = false;
    this.selectedQuestionnaires = [];
    this.templateQuests = [];
  }
  editTemplate(template: Template) {
    this.valTemp = template.name;
    this.editedTemplate = template;
    this.starsCheck = this.isStarsInTemplate(template.opinions);
    this.emoticonsCheck = this.isEmotsInTemplate(template.opinions);
    this.commentCheck = this.isCommentInTemplate(template.opinions);
    this.questsArray = [];
    this.selectedQuestionnaires = [];
    this.templateQuests = [];
    template.opinions.forEach(opinion => {
      if (opinion.type.type === 'Questionnaire') {
        this.templateQuests.push(opinion);
      }
    });

    if (this.templateQuests.length > 0) {

      this.questionnaireCheck = true;
    }
    this.templateQuests.forEach(quest => {
      this.selectedQuestionnaires.push(quest.id);
    });

  }
  isEmotsInTemplate(opinionEmots: OpinionOption[]): boolean {
    for (let i = 0; i < opinionEmots.length; i++) {
      if (opinionEmots[i].type.type === 'Emoticons') {
        return true;
      }
    }
    return false;
  }
  isCommentInTemplate(opinionComment: OpinionOption[]): boolean {
    for (let i = 0; i < opinionComment.length; i++) {
      if (opinionComment[i].type.type === 'Comment') {
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
  addQuestionnaire(valueEnter: string) {
    this.singleQuest = new OpinionOption();
    this.singleQuest.type = this.opinionTypes[2];
    this.singleQuest.description = valueEnter;
    this.opinionService.saveOpinion(this.singleQuest)
      .subscribe(data => {
        this.questionnaires = [];
        this.getAllOpinions();
      }, error => {
        console.log('Err', error);
      });
  }

  onEnter(inp) {
    this.addQuestionnaire(inp.value);
    inp.value = '';
    this.questionnaireSucces();
  }

  addTemplate(name: string) {
    this.chosenOpinions = [];
    if (this.questionnaireCheck === true) {
      this.getSelectedQuests();
      this.chosenOpinions = this.questsArray;
    }
    if (this.starsCheck === true) {
      for (let i = 0; i < this.starsArray.length; i++) {
        this.chosenOpinions.push(this.starsArray[i]);
      }
    }
    if (this.emoticonsCheck === true) {
      for (let i = 0; i < this.emoticonsArray.length; i++) {
        this.chosenOpinions.push(this.emoticonsArray[i]);
      }
    }
    if (this.commentCheck === true) {
      this.chosenOpinions.push(this.comment[0]);
    }

    if (this.editedTemplate) {
      this.templateOpt = this.editedTemplate;
      this.templateOpt.opinions = [];
    } else {
      this.templateOpt = new Template();
    }

    this.templateOpt.opinions = this.chosenOpinions;
    this.templateOpt.name = name;
    console.log('Selected quests --->   ' + this.selectedQuestionnaires.length);
    if (this.isTempValid() === false) {
      this.tempError();
    } else {
      this.templateService.saveTemplate(this.templateOpt)
        .subscribe(error => {
          this.selectedQuestionnaires = [];
          this.getTemplates();

        });
      this.tempSucces();
    }
    this.clearTemplate();
    this.templates = [];
    this.getTemplates();
  }

  getSelectedQuests() {
    for (let i = 0; i < this.selectedQuestionnaires.length; i++) {
      this.questsArray.push({id: this.selectedQuestionnaires[i]});
    }

  }

  getAllOpinionTypes() {
    this.opinionTypeService.getOpinionTypes()
      .subscribe(data => {
        this.opinionTypes = data;
      },
      error => {
        console.log('Err', error);
      });
  }

  getAllOpinions() {

    this.opinionService.getOpinionsByType('Stars')
      .subscribe(opinions => {
        this.starsArray = opinions;
      });

    this.opinionService.getOpinionsByType('Comment')
      .subscribe(opinions => {
        this.comment = opinions;
      });

    this.opinionService.getOpinionsByType('Emoticons')
      .subscribe(opinions => {
        this.emoticonsArray = opinions;
      });

    this.opinionService.getOpinionsByType('Questionnaire')
      .subscribe(opinions => {
        this.questionnairesArray = opinions;
        for (let i = 0; i < this.questionnairesArray.length; i++) {
          this.questionnaires.push({
            label: this.questionnairesArray[i].description,
            value: this.questionnairesArray[i].id
          });
        }
      });

  }

  questionnaireSucces() {
    this.msgsTemp = [];
    this.msgsTemp.push({
      severity: 'success', summary: 'Questionnaire - Create',
      detail: 'Questionnaire create sucessfully!'
    });
  }

  tempInfo() {
    this.msgsTemp = [];
    this.msgsTemp.push({
      severity: 'info', summary: 'Welcome to Template Create',
      detail: 'Template is a necessary part of event. While creating template you can chose how people will vote. ' +
      'You can set one of prepared options like: Stars, Emoticons, Comment or set your own questionary type.'
    });
  }

  tempError() {
    this.msgsTemp = [];
    if (!this.valTemp) {
      this.msgsTemp.push({
        severity: 'error', summary: 'Error - Template Name',
        detail: 'You have to input template name if you want to create it!'
      });
    }
    if (!this.starsCheck && !this.emoticonsCheck && !this.commentCheck && !this.questionnaireCheck) {
      this.msgsTemp.push({
        severity: 'error', summary: 'Error - Template Answer Option',
        detail: 'You have to set one of opinion option to create template!'
      });
    }
    if (this.questionnaireCheck && this.selectedQuestionnaires.length === 0) {
      this.msgsTemp.push({
        severity: 'error', summary: 'Error - Template Answer Option',
        detail: 'You have to choose at least one questionnaire from the list!'
      });
    }

  }

  tempSucces() {
    this.msgsTemp = [];
    this.msgsTemp.push({
      severity: 'success', summary: 'Template - Create',
      detail: 'Template create sucessfully!'
    });
  }

  isTempValid() {
    let result = true;
    if (!this.starsCheck && !this.emoticonsCheck && !this.commentCheck && !this.questionnaireCheck) {
      result = false;
    }

    if (this.questionnaireCheck && this.selectedQuestionnaires.length === 0) {
      result = false;
    }

    if (!this.valTemp) {
      result = false;
    }
    return result;
  }
}

