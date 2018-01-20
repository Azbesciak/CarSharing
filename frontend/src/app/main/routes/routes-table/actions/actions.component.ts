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
import {ToastService} from "../../../../functional/ui/toast/toast.service";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  private user: AppUser;
  canJoin: boolean;
  vetoMessage?: string;
  @Input()
  set routeSearchParams(value: RouteSearchParams) {
    const route = RouteSearchParams.toRoute(value);
    this._routeSearchParams = RouteSearchParams.fromRoute(route)
  }

  constructor(
    private dialog: MatDialog,
    private routeJoinService: RouteJoinRequestService,
    private userServ: UserService,
    private toast: ToastService) {
    userServ.subscribeOnUserData(user => {
      this.user = user;
      this.canJoin = this.canJoin && this.canJoinToRoute();
      this.setVetoMessage();
    })
  }

  private setVetoMessage() {
    if (this.routeSearchResult)
      this.vetoMessage = this.getVetoMessage(this.routeSearchResult.joinVeto)
  }

  private canJoinToRoute(): boolean {
    this.setVetoMessage();
    return this.routeSearchResult.joinVeto == null || this.routeSearchResult.joinVeto == "ANONYMOUS"
  }

  @Input()
  routeSearchResult: SimpleRouteSearchResult;

  private _routeSearchParams: RouteSearchParams;

  ngOnInit() {
    console.log(this.routeSearchResult);
    this.canJoin = !this.user || this.canJoinToRoute();
    console.log("CAN JOIN init?", this.canJoin);
    this.setVetoMessage()
  }

  onJoinClick() {
    if (!this.canJoin) {
      this.toast.show("You cannot join this route");
    } else if (this.user) {
      this.routeJoinService
        .sendJoinRequest(this.routeSearchResult)
        .then(res => {
          if (res) {
            this.disableJoinPossibility();
            this.toast.show("Request successfully sent", 5000);
          }
        }).catch(e => {
          console.log(e);
          this.disableJoinPossibility()
      })
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

  private getVetoMessage(veto: string) {
    if (veto) {
      switch(veto) {
        case "ALREADY_PASSENGER": return "You have already joined this route";
        case "ALREADY_REQUESTED": return "Request was already sent";
        case "DRIVER": return "You cannot join your route";
        case "OUTDATED": return "Route is out of the time";
        // case "ANONYMOUS": return "To You need to be logged in first"
      }
    }
    return null;
  }

  private disableJoinPossibility() {
    this.canJoin = false;
    this.routeSearchResult.joinVeto = "DENIED";
  }

  onOpinionsClick() {
    this.toast.show("Opinions are not supported yet")
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
