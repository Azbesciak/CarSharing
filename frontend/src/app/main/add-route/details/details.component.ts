import {Component, OnInit} from '@angular/core';
import {RouteCreator} from "../route-creator";
import {Route} from "../../../functional/route/route";
import {BusInjectorService} from "../bus-injector.service";
import {Car} from "../../../functional/route/car";
import {UserService} from "../../authorization/user.service";
import {AppUser} from "../../authorization/user";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends RouteCreator implements OnInit {

  description;
  car: Car;
  private user: AppUser;

  protected onChange(route: Route) {
  }

  constructor(private userService: UserService,
              busInjector: BusInjectorService) {
    super(busInjector)
  }

  ngOnInit() {
    this.userService.subscribeOnUserData(user => this.user = user)
  }

  updateRoute(carEv: { car: Car, i: number } = null) {
    this.route.description = this.description;
    if (carEv) {
      this.car = carEv.car;
      this.route.car = this.car;
    }
    this.push()
  }

}
