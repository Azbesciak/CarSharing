import {Car} from "../../functional/route/car";
import {RouteSnapshot} from "../../functional/route/route-snapshot";
import {UserSimpleData} from "../../functional/route/route-search/route-search-result";
import {Location} from "../../functional/route/location";

export class RouteView {
  constructor(public routeId: number = null,
              public car: Car = null,
              public routeParts: RoutePartView[] = [],
              public description: string = null,
              public locations: string[]) {
  }
}

export class RoutePartView {
  constructor(public routePartId: number = null,
              public origin: RouteSnapshot = null,
              public destination: RouteSnapshot = null,
              public cost: number = null,
              public passengers: Iterable<UserSimpleData>) {
  }
}

export class RouteJoinRequestView {
  constructor(public requestId: number = null,
              public user: UserSimpleData = null,
              public locations: Location[] = [],
              public cost: number = null) {
  }
}
