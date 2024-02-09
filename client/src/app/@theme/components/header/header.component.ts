import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from "@nebular/theme";

import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { StorageService } from "../../../shared/clinet-service/storage.service";
import { AccountService } from "../../../shared/services/account.service";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  getUser: string;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";

  userMenu = [{ title: "Profile" }, { title: "Log out" }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    const firstName = this.storageService.getUserfirstName();
    const lastName = this.storageService.getUserLastName();

    if (firstName && lastName) {
      this.getUser = `${firstName + " " + lastName} خوش آمدید `;
    }

    this.userService.getUsers().pipe(takeUntil(this.destroy$));
    // .subscribe((users: any) => (this.user = users.nick));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  visitProfile(event) {
    if (this.userMenu.find((user) => user.title === "Profile")) {
      this.router.navigate(["auth/login"]);
    }
  }

  showProfile(){
    this.router.navigate(['/profile'])
  }

  showDashboard(){
    this.router.navigate(['auth/login'])
  }

  logoutUser() {
    this.router.navigate(["auth/login"]);
  }
}
