import { EventSchemeContainer } from '../../domain/container/event-scheme-container.domain';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Routerable } from '../../shared/base/base.component';
import { Router } from '@angular/router';

import { DropdownModule,
         SelectItem,
         Message } from 'primeng/primeng';

import { EventServiceService } from '../../shared/event-service.service';
import { Event } from '../../domain/event.domain';
import { Tag } from '../../domain/tag.domain';
import { Template } from '../../domain/template';
import { SchemeService } from '../../shared/scheme.service';
import { TagServiceService } from '../../shared/tag-service.service';
import { TemplateServiceService } from '../../shared/template-service.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventEditComponent extends Routerable implements OnInit {
  title = 'event-edit';
  event: Event;
  templates: Template[] = [];
  selectedTemplate: number;
  templatesName: SelectItem[] = [];
  dateFrom: Date;
  dateTo: Date;

  tags: Tag[] = [];
  selectedTag: number[] = [];
  tagArray: Tag[] = [];
  tagsName: SelectItem[] = [];

  editMsgs: Message[] = [];
  current_date = new Date();

  startDateFrom: Date;
  startDateTo: Date;

  constructor(protected router: Router,
              private eventService: EventServiceService,
              private templateService: TemplateServiceService,
              private tagService: TagServiceService,
              private schemeService: SchemeService) {
    super(router);
    this.templatesName.push({label: 'Select template', value: null});
  }

  ngOnInit() {
    this.event = EventServiceService.event;
    if (this.event == null) {
      this.goToEventShow();
    }
    this.getAllTemplates();
    this.getAllTags();
    this.dateFrom = new Date(this.event.from);
    this.dateTo = new Date(this.event.to);
    this.startDateFrom = new Date(this.event.from);
    this.startDateTo = new Date(this.event.to);
  }

  getAllTemplates() {
    this.templateService.getTemplates()
      .subscribe(data => {
          this.templates = data;
          this.getNames(data, this.templatesName);
        },
        error => {
          console.log('Err', error);
        });
  }

  getAllTags() {
    this.tagService.getTags()
      .subscribe(data => {
          this.tags = data;
          this.getNames(data, this.tagsName);
        },
        error => {
          console.log('Err', error);
        });
  }

  getNames(optionsArray, names) {
    for (let i = 0; i < optionsArray.length; i++) {
      names.push(
        {
          label: optionsArray[i].name,
          value: optionsArray[i].id
        });
    }
  }

  saveEditedEvent(form) {
    form.value.eventTemplate = this.getSelectedTemplate();
    this.getTags();
    form.value.tags = this.tagArray;
    form.value.id = this.event.id;
    console.log('form', form.value);
    console.log('event', this.event);
    if (this.isEditValid() === false) {
      this.editError();
    } else {
      this.sendEvent(form.value);
      this.editSucess();
    }
  }

  sendEvent(value) {
    if (this.event.scheme) {
      this.setEventValue(value);
      let container: EventSchemeContainer = EventSchemeContainer.OneEventOneSchemeInstance(this.event.scheme, this.event);
      console.log('container', container);
      this.schemeService.updateEvent(container)
        .subscribe(error => {
          console.log('Log', error);
        });
    } else {
      this.eventService.updateEvent(value)
        .subscribe(error => {
          console.log('Log', error);
        });
    }
  }

  setEventValue(value) {
    this.event.desc = value.desc;
    this.event.eventTemplate = value.eventTemplate;
    this.event.from = value.from;
    this.event.id = value.id;
    this.event.tags = value.tags;
    this.event.title = value.title;
    this.event.to = value.to;
  }

  getSelectedTemplate(): any {
    for (let i = 0; i < this.templates.length; i++) {
      if (this.templates[i].id === this.selectedTemplate) {
        return this.templates[i];
      }
    }
  }

  getTags() {
    for (let i = 0; i < this.selectedTag.length; i++) {
      this.tagArray.push({id: this.selectedTag[i], name: this.tags[i].name});
    }
  }

  isDateChanged() {
    return (this.startDateFrom.getFullYear() !== this.dateFrom.getFullYear() ||
            this.startDateFrom.getMonth() !== this.dateFrom.getMonth() ||
            this.startDateFrom.getDate() !== this.dateFrom.getDate());
  }

  isEditValid() {
    var result = true;

    if (this.event.scheme) {
      if (this.isDateChanged()) {
        result = false;
      }
    }

    if (!this.event.title) {
      result = false;
    }
    if (!this.event.desc) {
      result = false;
    }
    if (!this.dateFrom) {
      result = false;
    }
    if (!this.dateTo) {
      result = false;
    }
    if (this.dateTo < this.dateFrom) {
      result = false;
    }
    if (this.dateTo < this.current_date) {
      result = false;
    }
    if (!this.selectedTemplate) {
      result = false;
    }
    return result;
  }

  editSucess() {
    this.editMsgs = [];
    this.editMsgs.push({severity: 'success', summary: 'Event edit', detail: 'Event edit sucessfully.'});
  }

  editError() {
    this.editMsgs = [];
    //this.msgs.push({severity: 'error', summary: 'Event Create - Validation Error', detail: 'Check input fields!'});
    if (this.event.scheme && this.isDateChanged()) {
      this.editMsgs.push({severity: 'error', summary: 'Error - Tittle', detail: 'You cannot change cyclic event date!'});      
    }
    if (!this.event.title) {
      this.editMsgs.push({severity: 'error', summary: 'Error - Tittle', detail: 'Event must have a title!'});
    }
    if (!this.event.desc) {
      this.editMsgs.push({severity: 'error', summary: 'Error - Description', detail: 'Event must have a description!'});
    }
    if (!this.dateFrom || !this.dateTo) {
      this.editMsgs.push({severity: 'error', summary: 'Error - Date', detail: 'Checkout dates!'});
    }
    if (this.dateTo < this.dateFrom) {
      this.editMsgs.push({
        severity: 'error',
        summary: 'Error - Date',
        detail: 'You can\'t set up Date To before Date From!  '
      });
    }
    else if (this.dateTo < this.current_date) {
      this.editMsgs.push({severity: 'error', summary: 'Error - Date', detail: 'You can\'t create historical event!  '});
    }
    if (!this.selectedTemplate) {
      this.editMsgs.push({severity: 'error', summary: 'Error - Template', detail: 'Event must have a template!'});
    }
  }

}


