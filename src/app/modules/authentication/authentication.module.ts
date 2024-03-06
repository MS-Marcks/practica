import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PichinchaDesignSystemModule } from '@pichincha/ds-angular';

import { PichinchaReactiveControlsModule } from '@pichincha/ds-angular'
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    PichinchaDesignSystemModule,
    PichinchaReactiveControlsModule
  ]
})
export class AuthenticationModule { }
