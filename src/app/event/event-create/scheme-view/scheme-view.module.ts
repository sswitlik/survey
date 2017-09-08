import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemeViewComponent } from './scheme-view.component';


import { ButtonModule,
         GrowlModule,
         Message,
         PickListModule,
         InputTextModule,
         CalendarModule,
         ScheduleModule,
         DataListModule,
         PanelModule,
         ChartModule,
         DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [
      ScheduleModule,
      FormsModule,
      CommonModule,
      DataListModule,
      InputTextModule,
      ButtonModule,
      ReactiveFormsModule,
      CalendarModule,
      PickListModule,
      GrowlModule,
      PanelModule,
      ChartModule,
      DataTableModule
    ],
    providers: [],
    declarations: [
      SchemeViewComponent,
    ],
    exports: [SchemeViewComponent],
})
export class SchemeViewModule { }

