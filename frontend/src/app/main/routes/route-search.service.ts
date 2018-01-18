import { Injectable } from '@angular/core';
import {DataService} from "../../functional/data/data.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RouteSearchParams} from "../../functional/route/route-search/route-search-params";
import {SimpleRouteSearchResult} from "../../functional/route/route-search/route-search-result";
import {SessionStorage} from "ngx-webstorage";

@Injectable()
export class RouteSearchService {
  private tiemout: any;

  constructor(private data: DataService) { }

  @SessionStorage()
  searchParams: RouteSearchParams;

  lastSearchParams = new BehaviorSubject<RouteSearchParams>(this.searchParams);

  updateSearchParams(route: RouteSearchParams) {
    clearTimeout(this.tiemout);
    this.tiemout = setTimeout(() => {
      this.lastSearchParams.next(route);
      this.searchParams = route;
    }, 100);
  }

  subscribeOnSearchResult(f: (res: SimpleRouteSearchResult[]) => void) {
    this.lastSearchParams.subscribe(
      r => r ? this.data.searchRoute(r)
        .then(res => f(res)) : null
    )
  }

  subscribeOnSearchParams(f: (params: RouteSearchParams) => void) {
    this.lastSearchParams.subscribe(r => f(r))
  }
}
