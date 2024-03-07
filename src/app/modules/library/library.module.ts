import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PichinchaDesignSystemModule } from '@pichincha/ds-angular';

import { BookShelfComponent } from './pages/book-shelf/book-shelf.component';
import { CoversComponent } from 'src/app/shared/component/covers/covers.component';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { SearchPanelComponent } from '../../shared/component/search-panel/search-panel.component';

@NgModule({
  declarations: [
    LibraryComponent,
    BookShelfComponent
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
