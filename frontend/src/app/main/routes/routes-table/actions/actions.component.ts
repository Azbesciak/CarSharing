import {Component, Input, OnInit} from '@angular/core';
import {SimpleRouteSearchResult} from "../../../../functional/route/route-search/route-search-result";
import {DataService} from "../../../../functional/data/data.service";
import {RouteSearchParams} from "../../../../functional/route/route-search/route-search-params";
import {MatDialog} from "@angular/material";
import {
  InfoDialogComponent, InfoDialogData,
  InfoDialogType
} from "../../../../functional/ui/info-dialog/info-dialog.component";
import {
  RouteDetailsDialogComponent,
  RouteDetailsDialogData
} from "../../route-details-dialog/route-details-dialog.component";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input()
  set routeSearchParams(value: RouteSearchParams) {
    const route = RouteSearchParams.toRoute(value);
    this._routeSearchParams = RouteSearchParams.fromRoute(route)
  }

  constructor(private dialog: MatDialog) { }

  @Input()
  routeSearchResult: SimpleRouteSearchResult;

  private _routeSearchParams: RouteSearchParams;

  ngOnInit() {
  }


  onJoinClick() {

  }

  onOpinionsClick() {

  }

  onRouteDetailsClick() {
    this.dialog.open(RouteDetailsDialogComponent, {
      minWidth: '900px',
      maxWidth: '900px',
      height: '600px',
      data: new RouteDetailsDialogData(this._routeSearchParams, this.routeSearchResult.routeId)
    })

  }

}
