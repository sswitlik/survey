import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Routerable} from '../../shared/base/base.component';
import {Router} from '@angular/router';
import {EventServiceService} from '../../shared/event-service.service';
import {Event} from '../../domain/event.domain';
import {Template} from '../../domain/template';
import {TemplateServiceService} from '../../shared/template-service.service';
import {DropdownModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import {TagServiceService} from '../../shared/tag-service.service';
import {Tag} from '../../domain/tag.domain';
import {SchemeService} from '../../shared/scheme.service';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventCreateComponent extends Routerable implements OnInit {


  msgs: Message[] = [];

  valTitle: String;
  valDesc: String;
  valDateFrom: Date;
  valDateTo: Date;
  valDateFirstStop: Date;
  valInterval: number;
  current_date = new Date();

  title = 'event-create';
  events: Event[] = [];
  event: Event;
  templates: Template[] = [];
  selectedTemplate: number;
  templatesName: SelectItem[] = [];

  calendarOption: Object;

  tags: Tag[] = [];
  selectedTag: number[] = [];
  tagArray: any[] = [];
  tagsName: SelectItem[] = [];

  weekDays: SelectItem[];
  disabledWeekDays: number[];
  disabledStartDays: Date[] = [];
  disabledStartDaysTemplate: SelectItem[] = [];
  checked = false;

// ----------------------------------------------------------------------

  constructor(protected router: Router,
              private eventService: EventServiceService,
              private templateService: TemplateServiceService,
              private tagService: TagServiceService,
              private schemeService: SchemeService) {
    super(router);
  }


  ngOnInit() {
    this.getAllTemplates();
    this.getAllTags();
    this.templatesName.push({label: 'Select template', value: null});
    this.weekDays = [];
    this.weekDays.push(
      {label: 'Monday', value: 1},
      {label: 'Tuesday', value: 2},
      {label: 'Wednesday', value: 3},
      {label: 'Thursday', value: 4},
      {label: 'Friday', value: 5},
      {label: 'Saturday', value: 6},
      {label: 'Sunday', value: 0});

    this.calendarOption = {
      firstDayOfWeek: 1,
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: [ 'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December' ],
      monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
      today: 'Today',
      clear: 'Clear'
    };
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

  addEvent(form) {
    form.value.eventTemplate = this.getSelectedTemplate();
    this.getTags();
    form.value.tags = this.tagArray;

    if (this.checked === true) {
      form.value.disabledWeekDays = this.disabledWeekDays;
      form.value.disabledStartDays = this.disabledStartDays;
      console.log('form', form.value);
      if (this.isEventValid() === false) {
        this.eventError();
      } else {
        this.schemeService.addSchemes(form.value)
          .subscribe(error => {
            console.log('Log', error);
          });
        this.eventSucess();
      }
    } else {
      if (this.isEventValid() === false) {
        this.eventError();
      } else {
        this.eventService.saveEvent(form.value)
          .subscribe(error => {
            console.log('Log', error);
          });
        this.eventSucess();
      }
    }

    this.tagArray = [];
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
      this.tagArray.push({id: this.selectedTag[i]});
    }
  }

  selectDisabledDate(calendarInput: Date) {
    const objectTemplate = {
      label: calendarInput.toLocaleDateString(),
      value: 1
    };

    if (!this.disabledStartDaysContains(calendarInput)) {
      const disabledStartDaysTemplate = [...this.disabledStartDaysTemplate];
      const disabledStartDays = [...this.disabledStartDays];
      
      disabledStartDays.push(calendarInput);
      disabledStartDaysTemplate.push(objectTemplate);

      this.disabledStartDays = disabledStartDays;
      this.disabledStartDaysTemplate = disabledStartDaysTemplate;
    } else {
      this.disabledDateError();
    }
  }

  deleteDisabledDate(date) {
    const index = this.disabledStartDaysTemplate.indexOf(date);
    this.disabledStartDays = this.disabledStartDays.filter((val, i) => i !== index);
    this.disabledStartDaysTemplate = this.disabledStartDaysTemplate.filter((val, i) => i !== index);
  }

  disabledStartDaysContains(date: Date) {
    const filtered = this.disabledStartDaysTemplate.filter((val, i) => val.label === date.toLocaleDateString());
    return filtered.length > 0;
  }

// ----VALIDATION------------------------------------------------
  isEventValid() {
    let result = true;
    if (!this.valTitle) {
      result = false;
    }
    if (!this.valDesc) {
      result = false;
    }
    if (!this.valDateFrom) {
      result = false;
    }
    if (!this.valDateTo) {
      result = false;
    }
    if (this.valDateTo < this.valDateFrom) {
      result = false;
    }
    if (this.valDateTo < this.current_date) {
      result = false;
    }
    if (!this.selectedTemplate) {
      result = false;
    }
    if (this.checked === true) {

      if (!this.valInterval) {
        result = false;
      }
      if (this.valInterval < 1) {
        result = false;
      }
      if (!this.valDateFirstStop) {
        result = false;
      }
      if (this.valDateFirstStop < this.valDateFrom || this.valDateFirstStop > this.valDateTo) {
        result = false;
      }
    }
    return result;
  }

  eventInfo() {
    this.msgs = [];
    this.msgs.push({
      severity: 'info', summary: 'Welcome to Event Create \n',
      detail: 'Fill all fields to create event. If you haven\'t ' +
      'create any templates, go to Template card. You can also create some tags to help find your events and stats.' +
      ' Remember, to create event you have to set up: Tittle, Description, Start Date, End Date, Template.' +
      ' You can\'t make historical Event!'
    });
  }

  cyclicEventInfo() {
    this.msgs = [];
    this.msgs.push({
      severity: 'info', summary: 'Welcome to Cyclic Event Create',
      detail: 'Fill all fields to create event. If you haven\'t create templates, ' +
      'go to Template card. You can also create some tags to help find your events and stats. ' +
      'To create cyclic event you set first stop date & interval time.' +
      ' You allowed to disable weekdays which you don\'t want to have in your cyclic event.'
    });
  }

  eventError() {
    this.msgs = [];
    // this.msgs.push({severity: 'error', summary: 'Event Create - Validation Error', detail: 'Check input fields!'});
    if (!this.valTitle) {
      this.msgs.push({severity: 'error', summary: 'Error - Tittle', detail: 'Event must have a title!'});
    }
    if (!this.valDesc) {
      this.msgs.push({severity: 'error', summary: 'Error - Description', detail: 'Event must have a description!'});
    }
    if (!this.valDateFrom || !this.valDateTo) {
      this.msgs.push({severity: 'error', summary: 'Error - Date', detail: 'Checkout dates!'});
    }
    if (this.valDateTo < this.valDateFrom) {
      this.msgs.push({
        severity: 'error',
        summary: 'Error - Date',
        detail: 'You can\'t set up Date To before Date From!  '
      });
    } else if (this.valDateTo < this.current_date) {
      this.msgs.push({severity: 'error', summary: 'Error - Date', detail: 'You can\'t create historical event!  '});
    }

    if (this.checked === true) {
      if (!this.valDateFirstStop) {
        this.msgs.push({
          severity: 'error',
          summary: 'Error - Date',
          detail: 'Cyclic Event must have a date first stop!'
        });
      }
      if (this.valDateFirstStop < this.valDateFrom || this.valDateFirstStop >  this.valDateTo) {
        this.msgs.push({severity: 'error',
                        summary: 'Error - Date first stop',
                        detail: 'Date first stop must be set up between Date to & Date from'});
      }
    }
    if (!this.selectedTemplate) {
      this.msgs.push({severity: 'error', summary: 'Error - Template', detail: 'Event must have a template!'});
    }
    if (this.checked === true) {
      if (!this.valInterval) {
        this.msgs.push({severity: 'error', summary: 'Error - Interval', detail: 'Cyclic Event must have a interval!'});
      } else if (this.valInterval < 1) {
        this.msgs.push({severity: 'error', summary: 'Error - Interval', detail: 'Vaule of interval must be at least: 1 '});
      }
    }
  }

  eventSucess() {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Event create', detail: 'Event create sucessfully.'});
  }

  disabledDateError() {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Date error', detail: 'This date is already selected.'});
  }
}
