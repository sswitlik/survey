import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/primeng';

import { EventStatsComponent } from './event-stats.component';

@NgModule({
  imports: [
    CommonModule,
    ChartModule
  ],
  declarations: [EventStatsComponent],
  exports: [EventStatsComponent]
})
export class EventStatsModule { }
