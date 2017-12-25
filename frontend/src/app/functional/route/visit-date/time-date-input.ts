import { RouteSnapshot } from "../route-snapshot";

export class TimeDateInput {
  constructor(public onDateTimeSelect: (date: Date, snaps: RouteSnapshot[]) => void,
              public label: string,
              public required: boolean = false,
              public date: Date = null) {}

  isValid() {
    return !this.required || !!this.date;
  }
}
