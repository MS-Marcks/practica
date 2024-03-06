import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { BookshelfComponent } from './pages/bookshelf/bookshelf.component';

const routes: Routes = [
  {
    path: "", component: LibraryComponent,
    children: [
      { path: "books", component: BookshelfComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
