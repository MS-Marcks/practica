import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { BookShelfComponent } from './pages/book-shelf/book-shelf.component';
import { BookComponent } from './pages/book/book.component';

import { BookResolver } from './resolvers/book.resolver';
import { PublicLibraryComponent } from './pages/public-library/public-library.component';

const routes: Routes = [
  { path: "", redirectTo: "books/public", pathMatch: "full" },
  {
    path: "books", component: LibraryComponent,
    children: [
      { path: "", component: BookShelfComponent, },
      { path: "register", loadComponent: () => import("./pages/book-register/book-register.component").then(c => c.BookRegisterComponent) },
      { path: "register/:id", resolve: { book: BookResolver }, loadComponent: () => import("./pages/book-register/book-register.component").then(c => c.BookRegisterComponent) },
      {
        path: "view/:id", component: BookComponent, resolve: { book: BookResolver },
      },
      { path: "public", component: PublicLibraryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
