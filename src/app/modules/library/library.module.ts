import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PichinchaDesignSystemModule } from '@pichincha/ds-angular';

import { BookShelfComponent } from './pages/book-shelf/book-shelf.component';
import { CoversComponent } from './components/covers/covers.component';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { SearchPanelComponent } from '../../shared/component/search-panel/search-panel.component';
import { BookComponent } from './pages/book/book.component';

@NgModule({
  declarations: [
    LibraryComponent,
    BookShelfComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    CoversComponent,
    SearchPanelComponent,
    PichinchaDesignSystemModule,
    LibraryRoutingModule
  ],
  bootstrap: [LibraryComponent]
})

export class LibraryModule { }
