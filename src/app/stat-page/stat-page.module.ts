import {NgModule} from '@angular/core';
import {
  ButtonModule,
  InputTextModule,
  CalendarModule,
  DropdownModule,
  MultiSelectModule,
  CheckboxModule,
  GrowlModule,
  MessagesModule,
  ChartModule
} from 'primeng/primeng';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StatPageComponent} from './stat-page.component';

@NgModule({
  imports: [
    FormsModule,
    DropdownModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    CheckboxModule,
    GrowlModule,
    MessagesModule,
    ChartModule,
  ],
  providers: [],
  declarations: [StatPageComponent],
  exports: [StatPageComponent],
})
export class StatPageModule {}
