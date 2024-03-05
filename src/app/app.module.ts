import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PichinchaDesignSystemModule } from '@pichincha/ds-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputValueAcessorDirective } from "./directives/input-value-accessor.directive";

@NgModule({
  declarations: [
    AppComponent,
    InputValueAcessorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PichinchaDesignSystemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
