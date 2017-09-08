import { EventCreateComponent } from '../../event/event-create/event-create.component';
import { TemplateCreateComponent } from './template-create.component';
import { NgModule } from '@angular/core';
import {
  CheckboxModule,
  ButtonModule,
  GrowlModule,
  Message,
  MultiSelectModule,
  InputTextModule,
  CalendarModule,
  PanelModule,
  DataListModule
} from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateViewComponent } from './template-view/template-view.component';

@NgModule({
    imports: [
      FormsModule,
      CommonModule,
      InputTextModule,
      ButtonModule,
      ReactiveFormsModule,
      CalendarModule,
      PickListModule,
      GrowlModule,
      CheckboxModule,
      PanelModule,
      MultiSelectModule,
      DataListModule
    ],
    providers: [],
    declarations: [TemplateCreateComponent, TemplateViewComponent],
    exports: [TemplateCreateComponent],
})
export class TemplateCreateModule { }

