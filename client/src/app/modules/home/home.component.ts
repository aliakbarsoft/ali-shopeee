import { Component } from "@angular/core";
import { PROFILE_MENU_ITEMS } from "../../pages/pages-menu";

@Component({
  selector: "ali-home",
  styleUrls: ["./home.component.scss"],
  template: ` <ngx-one-column-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>`,
})
export class HomeComponent {
  menu = PROFILE_MENU_ITEMS;

  constructor() {}
}
