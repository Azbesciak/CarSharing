import {Component, Input, OnInit} from '@angular/core';
import {RouteSearchResult} from "../../../functional/route/route-search/route-search-result";
import {Route} from "../../../functional/route/route";
import {SessionStorage} from "ngx-webstorage";

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.scss']
})
export class RoutesTableComponent implements OnInit {
  get routes(): RouteSearchResult[] {
    return this._routes;
  }

  @Input()
  set routes(value: RouteSearchResult[]) {
    value.forEach(s => s.departureDate = new Date(s.departureDate));
    const sortOrder = this.getSortOrder();
    value.sort((a, b) => sortOrder(a,b));
    this._routes = value;
  }

  @SessionStorage()
  private _sortBy: SortType;

  set sortBy(value: SortType) {
    this._sortBy = value;
    this.routes = this._routes
  }

  get sortBy(): SortType {
    return this._sortBy;
  }

  sortsTypes = [{icon: "attach_money", type:SortType.COST}, {icon: "date_range", type: SortType.DATE}];

  _routes: RouteSearchResult[];

  @Input()
  route: Route;


  constructor() {
  }

  ngOnInit() {
    if (!this._sortBy) {
      this.sortBy = SortType.DATE
    }
  }


  onJoinClick(route: RouteSearchResult) {

  }

  onOpinionsClick(route: RouteSearchResult) {

  }

  onRouteDetailsClick(route: RouteSearchResult) {

  }

  getSortOrder() {
    switch (this._sortBy) {
      case SortType.DATE: return (a, b) => a.departureDate.getTime() - b.departureDate.getTime();
      case SortType.COST: return (a, b) => a.cost - b.cost
    }
  }
}

enum SortType {
  DATE,
  COST
}
