import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PichinchaDesignSystemModule } from '@pichincha/ds-angular';

import { BookshelfComponent } from './pages/bookshelf/bookshelf.component';
import { CoversComponent } from 'src/app/shared/component/covers/covers.component';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { SearchInputComponent } from '../../shared/component/search-input/search-input.component';

@NgModule({
  declarations: [
    LibraryComponent,
    BookshelfComponent
  ],
  imports: [
    CommonModule,
    CoversComponent,
    SearchInputComponent,
    PichinchaDesignSystemModule,
    LibraryRoutingModule
  ],
  bootstrap: [LibraryComponent]
})

export class LibraryModule { }
