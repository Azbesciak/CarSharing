import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {RoutingConstants} from "../../functional/routing/routing.constants";
import {BasicComponent} from "../profile/modification/basic/basic.component";

@Injectable()
export class AuthGuardService implements CanActivate, CanDeactivate<BasicComponent> {

  private static profileCompletionPage = RoutingConstants.getBasicModifPage();

  constructor(private auth: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.getAuthorizedUser()) {
      this.router.navigate([RoutingConstants.LOGIN_PAGE]);
      return false;
    } else if (!this.auth.isCompletedUser() && state.url != AuthGuardService.profileCompletionPage) {
      this.router.navigate([AuthGuardService.profileCompletionPage]);
      return false
    }
    return true;
  }

  canDeactivate(): boolean {
    return this.auth.isCompletedUser() || !this.auth.getAuthorizedUser();
  }
}
