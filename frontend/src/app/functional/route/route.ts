import {Location} from "./location";
import {Car} from "./car";
import {RoutePart} from "./route-part";
import {RouteSnapshot} from "./route-snapshot";

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
              public durations: number[] = [],
              public costs: number[] = [],
              public car: Car = null,
              public breaks: number[] = [],
              public routeParts: RoutePart[] = [],
              public description: string = null) {
    locations = Location.copyAll(locations);
    this.update(locations);
    this.createRouteParts();
    console.log(this.routeParts)
  }

  private _locations: Location[];
  origin: Location;
  destination: Location;
  wayPoints: Location[];

  update(loc: ((locations: Location[]) => void) | Location[]) {
    if (loc instanceof Function) {
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
    return new Route(locations, this.distances.slice(), this.departureDate,
      this.durations.slice(), this.costs.slice(), this.car, this.breaks, this.routeParts, this.description)
  }

  withDistances(distances: number[]): Route {
    return new Route(this.locations, distances.slice(), this.departureDate,
      this.durations.slice(), this.costs.slice(), this.car, this.breaks, this.routeParts, this.description)
  }

  withDepartureDate(date: Date): Route {
    return new Route(this.locations, this.distances.slice(), new Date(date.getTime()),
      this.durations.slice(), this.costs.slice(), this.car, this.breaks, this.routeParts, this.description)
  }

  withDurations(durations: number[]): Route {
    return new Route(this.locations, this.distances.slice(), this.departureDate,
      durations.slice(), this.costs.slice(), this.car, this.breaks, this.routeParts, this.description)
  }

  withCar(car: Car): Route {
    return new Route(this.locations, this.distances.slice(), this.departureDate,
      this.durations.slice(), this.costs.slice(), car, this.breaks, this.routeParts, this.description)
  }

  withCosts(costs: number[]) {
    return new Route(this.locations, this.distances.slice(), this.departureDate,
      this.durations.slice(), costs.slice(), Car.copy(this.car), this.breaks, this.routeParts, this.description)
  }

  withRouteParts(parts: RoutePart[]) {
    if (parts[0].isDateDefined('origin')) {
      this.departureDate = parts[0].origin.date
    }
    const breaksNumber = parts.length - 1;
    if (this.breaks.length != breaksNumber) {
      this.breaks = Array.from({length: breaksNumber}, () => 0)
    }
    for (let i = 0; i < parts.length; i++) {
      this.setTimes(i, parts);
      this.costs[i] = parts[i].cost
    }
    this.setBreaks(parts);
    return new Route(this.locations, this.distances.slice(), this.departureDate,
      this.durations.slice(), this.costs.slice(), Car.copy(this.car), this.breaks.slice())
  }

  private setTimes(i: number, parts: RoutePart[]) {
    const duration = parts[i].getDuration();
    if (duration) {
      this.durations[i] = duration;
    } else if (parts[i].isDateDefined('origin')) {
      parts[i].destination.date = new Date(parts[i].origin.date.getTime() + this.durations[i])
    } else if (parts[i].isDateDefined('destination')) {
      parts[i].origin.date = new Date(parts[i].destination.date.getTime() - this.durations[i])
    }
  }

  private setBreaks(parts: RoutePart[]) {
    for (let i = 0; i < parts.length - 1; i++) {
      const arrival = parts[i].destination && parts[i].destination.date && parts[i].destination.date.getTime();
      const departure = parts[i + 1].origin && parts[i + 1].origin.date && parts[i + 1].origin.date.getTime();
      if (arrival && departure && departure - arrival > 0) {
        this.breaks[i] = departure - arrival
      }
    }
  }

  createRouteParts() {
    const partsLen = this.locations.length - 1;
    const parts: RoutePart[] = Array.from({length: partsLen});
    for (let i = 0; i < partsLen; i++) {
      let org = this.locations[i];
      let dest = this.locations[i + 1];
      let distance = this.distances[i];
      let duration = this.durations[i];
      let cost = this.costs[i];

      let start = this.getDepartureDate(i, parts[i - 1]);
      let arrival = start ? new Date(start.getTime() + duration) : start;
      const startSnap = new RouteSnapshot(org, start);
      const endSnap = new RouteSnapshot(dest, arrival);
      parts[i] = new RoutePart(i, distance, cost, startSnap, endSnap);
    }
    this.routeParts = parts;
  }

  private getDepartureDate(i: number, routePart: RoutePart) {
    if (i > 0 && routePart) {
      if (routePart.destination.date) {
        return new Date(routePart.destination.date.getTime() + (this.breaks[i-1] || 0))
      } else {
        return null
      }
    } else {
      return this.departureDate
    }
  }


  wereLocationsChanged(locations: Location[]) {
    if (locations.length != this.locations.length) {
      return true
    } else {
      for (let i = 0; i < this.locations.length; i++) {
        const original = this.locations[i];
        const copy = locations[i];
        if ((copy && original && copy.equals(original)) || (!original && !copy)) {
          continue;
        }
        return true
      }
    }
    return false;
  }
}
