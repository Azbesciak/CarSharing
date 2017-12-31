import { Component, OnInit } from '@angular/core';
import {Route} from "../../../../functional/route/route";
import {BusInjectorService} from "../bus-injector.service";
import {RouteCreator} from "../route-creator";
import {UserService} from "../../../authorization/user.service";
import {Location} from "../../../../functional/route/location";
import {Car} from "../../../../functional/route/car";

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss']
})
export class CostsComponent extends RouteCreator implements OnInit {
  costs: number[] = [];
  private car: Car;
  private locations: Location[] = [];

  protected onChange(route: Route) {
    const car = this.route.car;
    if (car && (Car.areDifferent(car, this.car) || route.wereLocationsChanged(this.locations))) {
      this.costs = this.route.distances
        .map(dist => Math.round(dist * car.fuelUsage / 100 / car.seatCount));
      this.locations = Location.copyAll(this.route.locations);
      this.car = car;
      this.onCostChange();
    }
  }

  constructor(
    private userService:UserService,
    busInjector: BusInjectorService
  ) {super(busInjector)}

  ngOnInit() {
  }

  onCostChange() {
    this.route = this.route.withCosts(this.costs);
    this.push()
  }

}
