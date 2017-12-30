import {RouteWatcher} from "../../../../functional/route/route-watcher";
import {BusInjectorService} from "../bus-injector.service";

export abstract class RouteCreator extends RouteWatcher {
  constructor(busInjector: BusInjectorService) {
    busInjector.subscribe(bus => this.routeEventBus = bus);
    super();
  }
}
