import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  { path: "auth", loadChildren: () => import("./modules/authentication/authentication.module").then(m => m.AuthenticationModule) },
  { path: "library", loadChildren: () => import("./modules/library/library.module").then(m => m.LibraryModule) },
  { path: "**", redirectTo: "auth", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
