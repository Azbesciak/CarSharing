import {Input} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Route} from "./route";

export abstract class RouteWatcher {
  @Input()
  routeEventBus: BehaviorSubject<RouteEvent>;
  route: Route;

  timeout;
  subscribe() {
    this.routeEventBus.subscribe(e => {
      if (e.source !== this) {
        if (!this.route) {
          this.setNewRoute(e)
        } else {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => this.setNewRoute(e), 10)
        }
      }
    })
  }

  private setNewRoute(e) {
    this.route = e.route;
    this.onChange(e.route);
  }

  protected abstract onChange(route: Route);
  protected push(route: Route = this.route) {
    this.routeEventBus.next(new RouteEvent(route, this))
  }
}

export class RouteEvent {
  constructor(public route: Route, public source: any) {}
}
