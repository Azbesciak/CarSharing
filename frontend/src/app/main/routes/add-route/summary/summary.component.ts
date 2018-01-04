import {Component, OnInit} from '@angular/core';
import {Route} from "../../../../functional/route/route";
import {BusInjectorService} from "../bus-injector.service";
import {RouteCreator} from "../route-creator";
import {RoutePart} from "../../../../functional/route/route-part";
import {DataService} from "../../../../functional/data/data.service";
import {LoginDialogComponent} from "../../../authorization/login/login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material";
import {
  InfoDialogComponent, InfoDialogData,
  InfoDialogType
} from "../../../../functional/ui/info-dialog/info-dialog.component";
import {Router} from "@angular/router";
import {RoutingConstants} from "../../../../functional/routing/routing.constants";
import {RouteWatcher} from "../../../../functional/route/route-watcher";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends RouteWatcher implements OnInit {
  protected onChange(route: Route) {
  }

  ngOnInit(): void {
    this.subscribe()
  }
  constructor(){super()}

  getDuration(part: RoutePart): string {
    const duration = part.getDuration() / (1000 * 60);
    const minutes = `${Math.floor(duration % 60)} min`;
    const hours = Math.floor(duration / 60);

    if (hours > 0) {
      return `${hours} h ${minutes}`
    } else {
      return minutes
    }
  }
}
