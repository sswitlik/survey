import { NgModule } from '@angular/core';
import { EventEditComponent } from './event-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule,
         GrowlModule,
         Message,
         PickListModule,
         InputTextModule,
         DropdownModule,
         CalendarModule,
         MultiSelectModule} from 'primeng/primeng';

@NgModule({
    imports: [
      FormsModule,
      DropdownModule,
      CommonModule,
      InputTextModule,
      ButtonModule,
      ReactiveFormsModule,
      CalendarModule,
      PickListModule,
      GrowlModule,
      MultiSelectModule
    ],
    providers: [],
    declarations: [EventEditComponent],
    exports: [EventEditComponent],
})
export class EventEditModule { }

