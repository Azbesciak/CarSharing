import {RouteSnapshot} from "./route-snapshot";

export class RoutePart {
  constructor(
    public order: number,
    public distance: number,
    public cost: number,
    public origin: RouteSnapshot,
    public destination: RouteSnapshot
  ) {}

  static copy(r: RoutePart): RoutePart {
    return new RoutePart(
      r.order, r.distance, r.cost,
      RouteSnapshot.copy(r.origin),
      RouteSnapshot.copy(r.destination)
    )
  }

  getDuration() {
    if (this.isDateDefined('origin') && this.isDateDefined('destination')) {
      const dur = this.destination.date.getTime() - this.origin.date.getTime();
      if (dur > 0) {
        return dur;
      }
    }
    return null;
  }

  isDateDefined(field: string): boolean {
    return this[field] && this[field].date
  }

  isValid() {
    return this.isValidLocation('origin') && this.isValidLocation('destination')
  }

  isValidLocation(field:string) {
    return this[field] && this[field].location && this[field].location.label
  }
}
