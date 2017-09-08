import { NgModule } from '@angular/core';
import { ButtonModule,
         InputTextModule,
         MenubarModule,
         CheckboxModule,
         MenuItem } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { MenuPageComponent } from './menu-page.component';
import { AuthenticationService } from '../shared/authentication.service';

@NgModule({
    imports: [
      InputTextModule,
      ButtonModule,
      MenubarModule,
      CheckboxModule,
      FormsModule,
      CommonModule,
    ],
    providers: [AuthenticationService],
    declarations: [MenuPageComponent],
    exports: [MenuPageComponent],
})
export class MenuPageModule { }
