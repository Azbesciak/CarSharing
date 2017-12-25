import { Location } from "./location";

export class RouteSnapshot {
  constructor(public location: Location = null, public date: Date = null) {}

  equals(other: RouteSnapshot): boolean {
    return other &&
      Location.equals(this.location, other.location) &&
      RouteSnapshot.sameDate(this.date, other.date)
  }

  static copy(rs: RouteSnapshot): RouteSnapshot {
    if (!rs) return rs;

    const date = rs.date ? new Date(rs.date.getTime()) : rs.date;
    const loc = Location.copy(rs.location);
    return new RouteSnapshot(loc, date);
  }

  static copyAll(rs: RouteSnapshot[]): RouteSnapshot[] {
    return rs.map(r => RouteSnapshot.copy(r))
  }

  static sameDate(date1: Date, date2: Date) {
    return (date1 && date2 && date1.getTime() == date2.getTime()) || (!date1 && !date2)
  }
}
