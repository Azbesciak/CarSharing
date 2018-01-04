import {Component, Input, OnInit} from '@angular/core';
import {RouteSearchResult} from "../../../../functional/route/route-search/route-search-result";
import {Route} from "../../../../functional/route/route";
import {DataService} from "../../../../functional/data/data.service";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  constructor(private data: DataService) { }

  @Input()
  route: Route;


  ngOnInit() {
  }


  onJoinClick() {

  }

  onOpinionsClick() {

  }

  onRouteDetailsClick() {

  }

}
