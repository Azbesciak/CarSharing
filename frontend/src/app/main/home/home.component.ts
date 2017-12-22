import {Component, OnInit} from '@angular/core';
import {Route} from "../../functional/route/route";
import {LocationService} from "../../functional/route/location.service";
import {Location} from "../../functional/route/location";
import {RouteEvent, RouteWatcher} from "../../functional/route/route-watcher";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RouteWatcher implements OnInit {

  constructor(private location: LocationService) {super()}
  ngOnInit(): void {
    this.location.getCurrentPosition().subscribe(loc => {
      this.route = new Route([
        new Location(loc.longitude, loc.latitude),
        new Location(loc.longitude, loc.latitude)
      ]);
        this.routeEventBus = new BehaviorSubject(new RouteEvent(this.route, this))
    });
  }
  protected onChange(route: Route) {}

}
