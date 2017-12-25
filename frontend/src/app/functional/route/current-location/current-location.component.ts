import { Component, Input, OnInit } from "@angular/core";
import { LocationService } from "../location.service";
import { RouteWatcher } from "../route-watcher";
import { Route } from "../route";
import { Location } from "../location";

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.scss']
})
export class CurrentLocationComponent extends RouteWatcher implements OnInit {

  @Input()
  onCurLocationFound: (loc: Location, locs: Location[]) => void;

  @Input()
  diameter: number;

  isLoading = false;
  protected onChange(route: Route) {}

  constructor(private location: LocationService) {super()}

  ngOnInit() {
    this.subscribe();
  }

  localize() {
    this.isLoading = true;
    this.location.getCurrentPosition().subscribe(loc => {
      const locs = Location.copyAll(this.route.locations);
      this.onCurLocationFound(loc, locs);
      this.push(new Route(locs));
      this.isLoading = false;
      console.log(this.isLoading)
    }, () => this.isLoading = false)
  }

}
