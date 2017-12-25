import { RouteSnapshot } from "./route-snapshot";

export class Route {
  get snapshots(): RouteSnapshot[] {
    return this._snapshots;
  }
  set snapshots(value: RouteSnapshot[]) {
    this.update(value);
  }
  constructor(snapshots: RouteSnapshot[] = [undefined, undefined]) {
    snapshots = RouteSnapshot.copyAll(snapshots);
    this.update(snapshots)
  }

  private _snapshots: RouteSnapshot[];
  origin: RouteSnapshot;
  destination: RouteSnapshot;
  wayPoints: RouteSnapshot[];

  update(loc:((snapshots: RouteSnapshot[]) => void) | RouteSnapshot[]) {
    if(loc instanceof Function) {
      loc(this._snapshots);
    } else {
      this._snapshots = loc
    }
    while (this.snapshots.length < 2) {
      this.snapshots.push(undefined)
    }
    this.wayPoints = this._snapshots.slice(1, this._snapshots.length - 1);
    this.destination = this._snapshots[this._snapshots.length - 1];
    this.origin = this._snapshots[0];
    Object.freeze(this._snapshots);
  }
}
