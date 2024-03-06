import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookshelfComponent } from './pages/bookshelf/bookshelf.component';
import { CoversComponent } from 'src/app/shared/component/covers/covers.component';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  declarations: [
    LibraryComponent,
    BookshelfComponent
  ],
  imports: [
    CommonModule,
    CoversComponent,
    LibraryRoutingModule
  ],
  bootstrap:[LibraryComponent]
})

export class LibraryModule { }
