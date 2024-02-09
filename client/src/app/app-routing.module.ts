import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";


export const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./modules/home/home.module").then((m) => m.HomeModule),
  },

  {
    path: "pages",
    loadChildren: () =>
      import("./profile/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/authentication/authentication.module").then((m) => m.AuthenticationModule),
  },
  // {
  //   path: "auth",
  //   loadChildren: () =>
  //     import("../app/modules/authentication/auth.module").then(
  //       (m) => m.AuthModule
  //     ),
  // },

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
