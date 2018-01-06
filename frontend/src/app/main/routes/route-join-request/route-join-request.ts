export class RouteJoinRequest {
  constructor(public joinRequestId: number = null,
              public applicantId: number = null,
              public routeId: number = null,
              public requestedRoute: number[] = [],
              public status: string = null){}
}
