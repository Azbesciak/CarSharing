import {Component, Input, OnInit} from '@angular/core';
import {SimpleRouteSearchResult} from "../../../../functional/route/route-search/route-search-result";
import {RouteSearchParams} from "../../../../functional/route/route-search/route-search-params";
import {MatDialog} from "@angular/material";
import {
  RouteDetailsDialogComponent,
  RouteDetailsDialogData
} from "../../route-details-dialog/route-details-dialog.component";
import {RouteJoinRequestService} from "../../route-join-request/route-join-request.service";
import {Md2Toast} from "md2";
import {UserService} from "../../../authorization/user.service";
import {AppUser} from "../../../authorization/user";
import {LoginDialogData} from "../../../authorization/login/login-dialog/login-dialog.component";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  private user: AppUser;
  private canJoin: boolean;
  @Input()
  set routeSearchParams(value: RouteSearchParams) {
    const route = RouteSearchParams.toRoute(value);
    this._routeSearchParams = RouteSearchParams.fromRoute(route)
  }

  constructor(
    private dialog: MatDialog,
    private routeJoinService: RouteJoinRequestService,
    private userServ: UserService,
    private toast: Md2Toast) {
    userServ.subscribeOnUserData(user => {
      this.user = user;
      this.canJoin = this.canJoin && this.routeSearchResult.canJoin;
    })
  }

  @Input()
  routeSearchResult: SimpleRouteSearchResult;

  private _routeSearchParams: RouteSearchParams;

  ngOnInit() {
    this.canJoin = !this.user || this.routeSearchResult.canJoin;
  }

  onJoinClick() {
    if (!this.canJoin) {
      this.toast.show("You cannot join this route", 5000);
    } else if (this.user) {
      this.routeJoinService
        .sendJoinRequest(this.routeSearchResult)
        .then(res => {
          if (res) {
            this.disableJoinPossibility();
            this.toast.show("Request successfully sent", 5000);
          }
        }).catch(e => this.disableJoinPossibility())
    } else {
      this.userServ.showLoginModal(new LoginDialogData(
        "To make a route request, you need to log in first",
        {'font-size': '14px', 'line-height': '15px', 'transform': 'translateY(-5px)'}, (user) => {
          if (user) {
            this.onJoinClick()
          }
        }))
    }
  }

  private disableJoinPossibility() {
    this.canJoin = this.routeSearchResult.canJoin = false;
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
