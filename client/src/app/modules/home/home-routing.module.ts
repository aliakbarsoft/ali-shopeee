import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NotFoundComponent } from "../../profile/miscellaneous/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "products",
        loadChildren: () =>
          import("../products/products.module").then((m) => m.ProductsModule),
      },

      {
        path: "",
        redirectTo: "products",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
