import {Location} from "../location";
import {Route} from "../route";

export class RouteSearchParams {
  constructor(public origin: Location = null,
              public destination: Location = null,
              public departureDate: Date = null,
              public departureDateNum: number = null,
              public wayPoints: Location[] = []) {
  }

  static fromRoute(route: Route): RouteSearchParams {
    return new RouteSearchParams(route.origin, route.destination,
      route.departureDate,
      route.departureDate ? route.departureDate.getTime() : null,
      route.wayPoints)
  }

  static toRoute(params: RouteSearchParams): Route {
    return new Route([params.origin, ...params.wayPoints, params.destination], [],
      params.departureDateNum ? new Date(params.departureDateNum) : null)
  }
}
