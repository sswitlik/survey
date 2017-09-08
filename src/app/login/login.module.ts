import { NgModule } from '@angular/core';
import {ButtonModule, InputTextModule, GrowlModule, MessagesModule} from 'primeng/primeng';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    GrowlModule,
    MessagesModule
  ],
  providers: [],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule { }
