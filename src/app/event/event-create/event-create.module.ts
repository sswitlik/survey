import { NgModule } from '@angular/core';

import {
  ButtonModule,
  InputTextModule,
  CalendarModule,
  DropdownModule,
  MultiSelectModule,
  DataTableModule,
  SharedModule,
  CheckboxModule,
  GrowlModule,
  MessagesModule} from 'primeng/primeng';

import { EventCreateComponent } from './event-create.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemeViewModule } from './scheme-view/scheme-view.module';

@NgModule({
    imports: [
      FormsModule,
      DropdownModule,
      CommonModule,
      InputTextModule,
      DataTableModule,
      SharedModule,
      ButtonModule,
      ReactiveFormsModule,
      SchemeViewModule,
      CalendarModule,
      MultiSelectModule,
      CheckboxModule,
      GrowlModule,
      MessagesModule
    ],
    providers: [],
    declarations: [EventCreateComponent],
    exports: [EventCreateComponent],
})
export class EventCreateModule { }
