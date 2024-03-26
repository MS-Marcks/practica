import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';

import { BookShelfComponent } from './pages/book-shelf/book-shelf.component';
import { CoversComponent } from './components/covers/covers.component';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { SearchPanelComponent } from '../../shared/component/search-panel/search-panel.component';
import { BookViewDetailComponent } from './pages/book-view-detail/book-view-detail.component';
import { BookRegisterComponent } from './pages/book-register/book-register.component';
import { PublicLibraryComponent } from './pages/public-library/public-library.component';

@NgModule({
  declarations: [
    LibraryComponent,
    BookShelfComponent,
    BookViewDetailComponent,
    PublicLibraryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibraryRoutingModule,
    PichinchaDesignSystemModule,
    PichinchaReactiveControlsModule,
    CoversComponent,
    SearchPanelComponent,
    BookRegisterComponent
  ],
  bootstrap: [LibraryComponent]
})

export class LibraryModule { }
