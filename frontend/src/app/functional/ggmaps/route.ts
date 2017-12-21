import {Location} from "./location";

export class Route {
  get locations(): Location[] {
    return this._locations;
  }
  set locations(value: Location[]) {
    this.update(value);
  }
  constructor(locations: Location[] = [new Location(), new Location()]) {
    this.update(locations)
  }

  private _locations: Location[];
  origin: Location;
  destination: Location;
  wayPoints: Location[];

  update(loc:((locations) => void) | Location[]) {
    if(loc instanceof Function) {
      loc(this._locations);
    } else {
      this._locations = loc
    }
    this.wayPoints = this._locations.slice(1, this._locations.length - 1);
    this.destination = this._locations[this._locations.length - 1];
    this.origin = this._locations[0]
  }
}
