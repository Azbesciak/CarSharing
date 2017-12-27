import {RouteSnapshot} from "./route-snapshot";

export class RoutePart {
  constructor(
    public order: number,
    public distance: number,
    public duration: number,
    public origin: RouteSnapshot,
    public destination: RouteSnapshot
  ) {}

  static copy(r: RoutePart): RoutePart {
    return new RoutePart(
      r.order, r.distance, r.duration,
      RouteSnapshot.copy(r.origin),
      RouteSnapshot.copy(r.destination)
    )
  }
}
