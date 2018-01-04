import {Component, Input, OnInit} from '@angular/core';
import {RouteSearchResult} from "../../../functional/route/route-search/route-search-result";
import {Route} from "../../../functional/route/route";
import {SessionStorage} from "ngx-webstorage";
import {DataService} from "../../../functional/data/data.service";

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.scss']
})
export class RoutesTableComponent implements OnInit {
  @Input()
  set routes(value: RouteSearchResult[]) {
    value.forEach(s => s.departureDate = new Date(s.departureDate));
    const sortOrder = this.getSortOrder();
    value.sort((a, b) => sortOrder(a, b));
    this._routes = value;
  }

  get routes(): RouteSearchResult[] {
    return this._routes;
  }

  _routes: RouteSearchResult[];

  @Input()
  route: Route;

  set sortBy(value: SortType) {
    this._sortBy = value;
    this.routes = this._routes
  }

  get sortBy(): SortType {
    return this._sortBy;
  }

  @SessionStorage()
  private _sortBy: SortType;
  sortsTypes = [{icon: "attach_money", type: SortType.COST}, {icon: "date_range", type: SortType.DATE}];

  constructor(private data: DataService) {
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
