import {Component, Input, OnInit} from '@angular/core';
import {RouteSearchResult} from "../../../functional/route/route-search/route-search-result";

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.scss']
})
export class RoutesTableComponent implements OnInit {

  @Input()
  routes: RouteSearchResult[];


  constructor() {
  }

  ngOnInit() {
  }


  onJoinClick(route: RouteSearchResult) {

  }

  onOpinionsClick(route: RouteSearchResult) {

  }

  onRouteDetailsClick(route: RouteSearchResult) {

  }
}
