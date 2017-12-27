import {Location} from "./location";

export class Route {
  get locations(): Location[] {
    return this._locations;
  }
  set locations(value: Location[]) {
    this.update(value);
  }
  constructor(locations: Location[] = [undefined, undefined],
              public distances: number[] = [],
              public departureDate: Date = undefined,
              public durations: number[] = []) {
    locations = Location.copyAll(locations);
    this.update(locations)
  }

  private _locations: Location[];
  origin: Location;
  destination: Location;
  wayPoints: Location[];

  update(loc:((locations: Location[]) => void) | Location[]) {
    if(loc instanceof Function) {
      loc(this._locations);
    } else {
      this._locations = loc
    }
    while (this.locations.length < 2) {
      this.locations.push(undefined)
    }
    this.wayPoints = this._locations.slice(1, this._locations.length - 1);
    this.destination = this._locations[this._locations.length - 1];
    this.origin = this._locations[0];
    Object.freeze(this._locations);
  }

  withLocations(locations: Location[]): Route {
    return new Route(locations, this.distances.slice(), this.departureDate, this.durations.slice())
  }

  withDistances(distances: number[]): Route {
    return new Route(this.locations, distances.slice(), this.departureDate, this.durations.slice())
  }

  withDepartureDate(date: Date): Route {
    return new Route(this.locations, this.distances.slice(), new Date(date.getTime()), this.durations.slice())
  }

  withDurations(durations: number[]): Route {
    return new Route(this.locations, this.distances.slice(), this.departureDate, durations.slice())
  }
}
