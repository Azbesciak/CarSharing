import { Injectable } from '@angular/core';
import {DataService} from "../../../functional/data/data.service";
import {
  DetailedRouteSearchResult,
  SimpleRouteSearchResult
} from "../../../functional/route/route-search/route-search-result";
import {RouteJoinRequest} from "./route-join-request";
import {UserService} from "../../authorization/user.service";
import {AppUser} from "../../authorization/user";

@Injectable()
export class RouteJoinRequestService {
  private user: AppUser;

  constructor(private dataService: DataService,
              private userService: UserService) {
    userService.subscribeOnUserData(user => this.user = user)
  }

  sendJoinRequest(route: DetailedRouteSearchResult | SimpleRouteSearchResult) {
    if (!this.user) {
      this.userService.goToLoginPage();
      return Promise.resolve(false)
    }
    const routeJoinRequest = new RouteJoinRequest(null, null, route.routeId, route.searchedRouteIds);
    return this.dataService.sendJoinRequest(routeJoinRequest)
  }

}
