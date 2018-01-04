import {Component, DoCheck, OnInit} from '@angular/core';
import {RouteWatcher} from "../route-watcher";
import {Route} from "../route";
import {Location} from "../location";

@Component({
  selector: 'app-drag-list',
  templateUrl: './way-points.component.html',
  styleUrls: ['./way-points.component.scss']
})
export class WayPointsComponent extends RouteWatcher implements OnInit, DoCheck {

  ngDoCheck(): void {
    if (this.locations && this.route.wereLocationsChanged(this.locations)) {
      this.update();
    }
  }

  private update() {
    this.route = this.route.withLocations(this.locations);
    this.push(this.route)
  }

  constructor() {
    super()
  }

  protected locations: Location[];

  remove(i) {
    if (i == 0 || i == this.locations.length - 1) {
      this.locations[i] = undefined;
    } else {
      this.locations.splice(i, 1);
    }
    this.update()
  }

  ngOnInit() {
    this.subscribe();
  }

  protected onChange(route: Route) {
    this.locations = Location.copyAll(route.locations);
  }
}
