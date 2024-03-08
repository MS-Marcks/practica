import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { BookShelfComponent } from './pages/book-shelf/book-shelf.component';
import { BookComponent } from './pages/book/book.component';

import { BookResolver } from './resolvers/book.resolver';

const routes: Routes = [
  { path: "", redirectTo: "books", pathMatch: "full" },
  {
    path: "books", component: LibraryComponent,
    children: [
      { path: "", component: BookShelfComponent, },
      {
        path: "view/:id", component: BookComponent, resolve: { book: BookResolver },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
