import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {Route} from "../route";
import {RouteWatcher} from "../route-watcher";
import { Location } from "../location";

const MAX_ZOOM = 17;
const SINGLE_POINT_ZOOM = 14;

@Component({
  selector: 'app-ggmaps',
  templateUrl: './ggmaps.component.html',
  styleUrls: ['./ggmaps.component.scss']
})
export class GgmapsComponent extends RouteWatcher implements OnInit {

  bounds: google.maps.LatLngBoundsLiteral;
  zoom = MAX_ZOOM;

  directionsDisplay: any;

  singleLocRepr: Location;

  @Output()
  onDistanceChange = new EventEmitter<number>();

  constructor(private mapsAPILoader: MapsAPILoader) {super()}

  ngOnInit() {
    if (!this.directionsDisplay) {
      this.mapsAPILoader.load()
        .then(() => this.directionsDisplay = new google.maps.DirectionsRenderer)
        .then(() => this.subscribe())
    }
  }

  protected onChange(route: Route) {
    const lat = this.getMinAndMAx('latitude');
    const lng = this.getMinAndMAx('longitude');
    this.bounds = {east: lng.max, west: lng.min, north: lat.max, south: lat.min};
    const allAreSame = lat.max == lat.min && lng.max == lng.min;
    this.zoom = allAreSame && SINGLE_POINT_ZOOM;
    this.checkIfSingleLoc();
    console.log("invoked ")
    setTimeout(() => this.zoom = undefined, 1000);
  }

  getMinAndMAx(field) {
    let results = this.route.locations.filter(a => a).map(a => a[field]);
    return {min: Math.min(...results), max: Math.max(...results)}
  }

  checkIfSingleLoc() {
      const notEmpty = this.route.locations.filter(a => a);
      const areEqual = notEmpty.length > 0 && notEmpty.every(r => r.equals(notEmpty[0]));
      this.singleLocRepr = areEqual && notEmpty[0];
  }
}
