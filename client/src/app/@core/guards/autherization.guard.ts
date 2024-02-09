import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "../../shared/services/account.service";

@Injectable({
  providedIn: "root",
})
export class AutherizationGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.accountService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["auth/login"]);
      return false;
    }
  }
}
