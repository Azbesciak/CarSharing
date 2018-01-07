import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./authorization/user.service";
import {RoutingConstants} from "../functional/routing/routing.constants";
import {Car} from "../functional/route/car";
import {Injectable} from "@angular/core";

@Injectable()
export class CarsRequiredInterceptor implements CanActivate {

  private cars: Car[];

  constructor(private auth: UserService, private router: Router) {
    auth.subscribeOnUserData(user => this.cars = user ? user.cars : null)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.cars || this.cars.length == 0) {
      this.router.navigate([RoutingConstants.getAddCarsPage()]);
      return false;
    }
    return true;
  }

}
