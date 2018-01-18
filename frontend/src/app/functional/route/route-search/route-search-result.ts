import {Car} from "../car";
import {RoutePart} from "../route-part";

export class SimpleRouteSearchResult {
    constructor(public routeId: number = null,
              public driverName: String = null,
              public cost: number = null,
              public departureDate: Date = null,
              public locations: string[] = [],
              public freeSeats: number = null,
              public searchedRouteIds: number[] = [],
              public canJoin: boolean) {
  }
}

export class DetailedRouteSearchResult {
  constructor(public routeId: number = null,
              public driver: UserSimpleData = null,
              public car: Car = null,
              public cost: number = null,
              public departureDate: Date = null,
              public freeSeats: number = null,
              public routeParts: RoutePart[] = [],
              public searchedRouteIds: number[] = [],
              public canJoin: boolean) {
  }
}

export class UserSimpleData {
  constructor(public id: number = null,
              public firstName: string = null,
              public lastName: string = null,
              public phoneNumber: string = null,
              public dateOfBirth: Date = null,
              public lastLoginDate: Date = null) {
  }
}
