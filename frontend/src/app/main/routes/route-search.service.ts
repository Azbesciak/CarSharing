import { Injectable } from '@angular/core';
import {DataService} from "../../functional/data/data.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RouteSearchParams} from "../../functional/route/route-search/route-search-params";
import {RouteSearchResult} from "../../functional/route/route-search/route-search-result";
import {SessionStorage} from "ngx-webstorage";

@Injectable()
export class RouteSearchService {

  constructor(private data: DataService) { }

  @SessionStorage()
  searchParams: RouteSearchParams;

  lastSearchParams = new BehaviorSubject<RouteSearchParams>(this.searchParams);

  updateSearchParams(route: RouteSearchParams) {
    this.lastSearchParams.next(route);
    this.searchParams = route;
  }

  subscribeOnSearchResult(f: (res: RouteSearchResult[]) => void) {
    this.lastSearchParams.subscribe(
      r => r ? this.data.searchRoute(r)
        .then(res => f(res)) : null
    )
  }

  subscribeOnSearchParams(f: (params: RouteSearchParams) => void) {
    this.lastSearchParams.subscribe(r => f(r))
  }
}
