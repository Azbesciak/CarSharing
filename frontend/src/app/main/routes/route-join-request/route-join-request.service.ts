import { Injectable } from '@angular/core';
import {DataService} from "../../../functional/data/data.service";
import {
  DetailedRouteSearchResult,
  SimpleRouteSearchResult
} from "../../../functional/route/route-search/route-search-result";
import {RouteJoinRequest} from "./route-join-request";

@Injectable()
export class RouteJoinRequestService {

  constructor(private dataService: DataService) { }

  sendJoinRequest(route: DetailedRouteSearchResult | SimpleRouteSearchResult) {
    const routeJoinRequest = new RouteJoinRequest(null, null, route.routeId, route.searchedRouteIds);
    return this.dataService.sendJoinRequest(routeJoinRequest)
  }

}
