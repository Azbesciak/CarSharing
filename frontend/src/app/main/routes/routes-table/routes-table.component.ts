import {Component, Input, OnInit} from '@angular/core';
import {SimpleRouteSearchResult} from "../../../functional/route/route-search/route-search-result";
import {SessionStorage} from "ngx-webstorage";
import {RouteSearchParams} from "../../../functional/route/route-search/route-search-params";

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.scss']
})
export class RoutesTableComponent implements OnInit {
  @Input()
  set routes(value: SimpleRouteSearchResult[]) {
    value.forEach(s => s.departureDate = new Date(s.departureDate));
    const sortOrder = this.getSortOrder();
    value.sort((a, b) => sortOrder(a, b));
    this._routes = value;
  }

  get routes(): SimpleRouteSearchResult[] {
    return this._routes;
  }

  _routes: SimpleRouteSearchResult[];

  @Input()
  routeSearchParams: RouteSearchParams;

  set sortBy(value: SortType) {
    this._sortBy = value;
    this.routes = this._routes
  }

  get sortBy(): SortType {
    return this._sortBy;
  }

  @SessionStorage()
  private _sortBy: SortType;
  sortsTypes = [
    {icon: "attach_money", type: SortType.COST, tooltip: 'Cost'},
    {icon: "date_range", type: SortType.DATE, tooltip: 'Departure date'}
  ];

  constructor() {
  }

  ngOnInit() {
    if (!this._sortBy) {
      this.sortBy = SortType.DATE
    }
  }

  getSortOrder() {
    switch (this._sortBy) {
      case SortType.DATE:
        return (a, b) => a.departureDate.getTime() - b.departureDate.getTime();
      case SortType.COST:
        return (a, b) => a.cost - b.cost
    }
  }
}

enum SortType {
  DATE,
  COST
}