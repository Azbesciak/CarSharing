import { Route } from "../route";
import { RouteSnapshot } from "../route-snapshot";

export class LocationInput {
  constructor(public name: string,
              public onNew: (snap: RouteSnapshot, snaps: RouteSnapshot[], ref: LocationInput) => void,
              public onChange: (route: Route, inp: LocationInput) => void = () => {},
              public required: boolean = false,
              public onCurLocFound: (loc: RouteSnapshot, locs: RouteSnapshot[]) => void = null,
              public value: string = ""){}

  isValid() {
    return !this.required || (this.value && this.value.trim() != "")
  }
}
