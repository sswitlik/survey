// import { EventCreateComponent } from '../../event/event-create/event-create.component';
import { TemplateShowComponent } from './template-show.component';
import { NgModule } from '@angular/core';
import { GrowlModule, Message } from 'primeng/primeng';
import { ButtonModule,
         InputTextModule,
         CalendarModule,
         DataListModule } from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      FormsModule,
      DataListModule,
      CommonModule,
      InputTextModule,
      ButtonModule,
      ReactiveFormsModule,
      CalendarModule,
      PickListModule,
      GrowlModule
    ],
    providers: [],
    declarations: [TemplateShowComponent],
    exports: [TemplateShowComponent],
})
export class TemplateShowModule { }

