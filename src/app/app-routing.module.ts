import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  { path: "auth", loadChildren: () => import("./modules/authentication/authentication.module").then(m => m.AuthenticationModule) },
  { path: "admin", loadChildren: () => import("./modules/library/library.module").then(m => m.LibraryModule) },
  { path: "**", redirectTo: "auth", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
