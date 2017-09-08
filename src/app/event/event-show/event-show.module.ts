import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventShowComponent } from './event-show.component';


import { ButtonModule,
         GrowlModule,
         Message,
         PickListModule,
         InputTextModule,
         CalendarModule,
         ScheduleModule,
         DataListModule,
         PanelModule,
         DialogModule,
         ChartModule,
         DataTableModule } from 'primeng/primeng';
import { EventShowStatsComponent } from './event-show-stats/event-show-stats.component';

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
      DialogModule,
      PanelModule,
      ChartModule,
      DataTableModule
    ],
    providers: [],
    declarations: [
      EventShowComponent,
      EventShowStatsComponent
    ],
    exports: [EventShowComponent],
})
export class EventShowModule { }

