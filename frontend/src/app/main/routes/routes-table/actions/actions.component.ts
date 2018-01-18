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
import {RouteJoinRequestService} from "../../route-join-request/route-join-request.service";
import {Md2Toast} from "md2";

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

  constructor(
    private dialog: MatDialog,
    private routeJoinService: RouteJoinRequestService,
    private toast: Md2Toast) { }

  @Input()
  routeSearchResult: SimpleRouteSearchResult;

  private _routeSearchParams: RouteSearchParams;

  ngOnInit() {
  }

  onJoinClick() {
    this.routeJoinService
      .sendJoinRequest(this.routeSearchResult)
      .then(res => {
        if (res) {
          this.routeSearchResult.canJoin = false;
          this.toast.show("Request successfully sent", 5000);
        }
      })
  }

  onOpinionsClick() {

  }

  onRouteDetailsClick() {
    this.dialog.open(RouteDetailsDialogComponent, {
      minWidth: '750px',
      maxWidth: '750px',
      height: '500px',
      data: new RouteDetailsDialogData(this._routeSearchParams, this.routeSearchResult.routeId)
    })

  }

}
