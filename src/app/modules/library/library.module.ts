import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';

import { BookShelfComponent } from './pages/book-shelf/book-shelf.component';
import { CoversComponent } from './components/covers/covers.component';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { SearchPanelComponent } from '../../shared/component/search-panel/search-panel.component';
import { BookComponent } from './pages/book/book.component';
import { BookRegisterComponent } from './pages/book-register/book-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from '../authentication/authentication-routing.module';

@NgModule({
  declarations: [
    LibraryComponent,
    BookShelfComponent,
    BookComponent,
    BookRegisterComponent
  ],
  imports: [
    CommonModule,
    CoversComponent,
    SearchPanelComponent,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    PichinchaDesignSystemModule,
    PichinchaReactiveControlsModule,
    LibraryRoutingModule
  ],
  bootstrap: [LibraryComponent]
})

export class LibraryModule { }
