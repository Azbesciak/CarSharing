import { Component, Input, OnInit } from "@angular/core";
import { LocationService } from "../location.service";
import { RouteWatcher } from "../route-watcher";
import { Route } from "../route";
import { Location } from "../location";
import { RouteSnapshot } from "../route-snapshot";

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.scss']
})
export class CurrentLocationComponent extends RouteWatcher implements OnInit {

  @Input()
  onCurLocationFound: (loc: RouteSnapshot, locs: RouteSnapshot[]) => void;

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
      const snaps = RouteSnapshot.copyAll(this.route.snapshots);
      this.onCurLocationFound(new RouteSnapshot(loc), snaps);
      this.push(new Route(snaps));
      this.isLoading = false;
    }, () => this.isLoading = false)
  }

}
