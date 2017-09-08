import { NgModule } from '@angular/core';
import { TagCreateComponent } from './tag-create.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonModule,
  GrowlModule,
  Message,
  PickListModule,
  InputTextModule,
  CalendarModule, DataTableModule, SharedModule
} from 'primeng/primeng';

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
      DataTableModule,
      SharedModule
    ],
    providers: [],
    declarations: [TagCreateComponent],
    exports: [TagCreateComponent],
})
export class TagCreateModule { }

