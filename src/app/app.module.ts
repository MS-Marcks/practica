import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PichinchaDesignSystemModule } from '@pichincha/ds-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PrincipalInterceptorService } from './core/interceptors/principal.interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PichinchaDesignSystemModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: PrincipalInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
