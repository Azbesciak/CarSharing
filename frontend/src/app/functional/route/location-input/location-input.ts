import { Route } from "../route";
import {Location} from "../location";

export class LocationInput {
  constructor(public name: string,
              public onNew: (snap: Location, snaps: Location[], ref: LocationInput) => void,
              public onChange: (route: Route, inp: LocationInput) => void = () => {},
              public required: boolean = false,
              public onCurLocFound: (loc: Location, locs: Location[]) => void = null,
              public value: string = ""){}

  isValid() {
    return !this.required || (this.value && this.value.trim() != "")
  }
}
