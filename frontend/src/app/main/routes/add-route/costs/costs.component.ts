import { Component, OnInit } from '@angular/core';
import {Route} from "../../../../functional/route/route";
import {BusInjectorService} from "../bus-injector.service";
import {RouteCreator} from "../route-creator";
import {UserService} from "../../../authorization/user.service";

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss']
})
export class CostsComponent extends RouteCreator implements OnInit {
  protected onChange(route: Route) {
    const car = this.route.car;
    if (car) {
      this.route = this.route.withPrices(this.route.distances
        .map(dist => Math.round(dist * car.fuelUsage / 100 / car.seatCount))
      );
      this.push();
    }
  }

  constructor(
    private userService:UserService,
    busInjector: BusInjectorService
  ) {super(busInjector)}

  ngOnInit() {
  }

}
