import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {RoutingConstants} from "../../functional/routing/routing.constants";
import {CompletionComponent} from "../profile/completion/completion.component";

@Injectable()
export class AuthGuardService implements CanActivate, CanDeactivate<CompletionComponent> {

  private static profileCompletionPage = RoutingConstants.getProfileCompletionPage();

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
