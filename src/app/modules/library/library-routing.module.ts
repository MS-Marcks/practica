import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { BookShelfComponent } from './pages/book-shelf/book-shelf.component';

const routes: Routes = [
  { path: "", redirectTo: "books", pathMatch: "full" },
  {
    path: "", component: LibraryComponent,
    children: [
      { path: "books", component: BookShelfComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
