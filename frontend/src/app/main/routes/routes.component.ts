import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouteEvent, RouteWatcher} from "../../functional/route/route-watcher";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Route} from "../../functional/route/route";
import {RouteSearchService} from "./route-search.service";
import {originDateInput} from "../../functional/route/visit-date/time-date-input-utils";
import {destInput, originInput} from "../../functional/route/location-input/location-input-utils";
import {LocationInput} from "../../functional/route/location-input/location-input";
import {TimeDateInput} from "../../functional/route/visit-date/time-date-input";
import {RouteSearchParams} from "../../functional/route/route-search/route-search-params";
import {SimpleRouteSearchResult} from "../../functional/route/route-search/route-search-result";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent extends RouteWatcher implements OnInit {

  locInputs: LocationInput[];
  dateInputs: TimeDateInput[];
  submitFun: (route: RouteSearchParams) => void;

  routes: SimpleRouteSearchResult[];
  wasCalled: boolean;

  recentSearchParam: RouteSearchParams;

  constructor(private searchService: RouteSearchService) {
    super()
  }

  ngOnInit() {
    this.route = new Route();
    this.routeEventBus = new BehaviorSubject(new RouteEvent(this.route, this));
    let timeOut;
    this.searchService.subscribeOnSearchParams(params => {
      clearTimeout(timeOut);
      setTimeout(() => {
        if (params) {
          this.route = RouteSearchParams.toRoute(params)
        } else {
          this.route = new Route()
        }
        this.recentSearchParam = params;
        this.push()
      }, 100)
    });
    this.searchService.subscribeOnSearchResult(res => {
      this.wasCalled = true;
      this.routes = res
    });
    this.locInputs = [originInput(), destInput()];
    this.dateInputs = [originDateInput()];
    this.submitFun = (route: RouteSearchParams) => {
      this.searchService.updateSearchParams(route);
    }
  }

  protected onChange(route: Route) {
  }

}
