import { Component, OnInit } from '@angular/core';
import {Route} from "../../../../functional/route/route";
import {BusInjectorService} from "../bus-injector.service";
import {RouteCreator} from "../route-creator";
import {RoutePart} from "../../../../functional/route/route-part";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends RouteCreator implements OnInit {

  protected onChange(route: Route) {
  }

  constructor(busInjector: BusInjectorService) { super(busInjector)}

  ngOnInit() {
  }

  addRoute() {
    console.log(this.route)
  }
  isValid() {
    return true;
  }

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