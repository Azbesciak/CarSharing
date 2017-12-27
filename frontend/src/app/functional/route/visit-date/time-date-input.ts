import {Route} from "../route";
import {VisitDateComponent} from "./visit-date.component";

export class TimeDateInput {
  constructor(public onDateTimeSelect: (comp: VisitDateComponent) => void,
              public onRouteChange: (route: Route, ref: TimeDateInput) => void,
              public label: string,
              public type: string = 'datetime',
              public required: boolean = false,
              public disabled: boolean = false,
              public date: Date = null) {}

  isValid() {
    return !this.required || !!this.date;
  }
}
