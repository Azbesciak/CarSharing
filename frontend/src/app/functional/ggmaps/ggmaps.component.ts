import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MapsAPILoader} from '@agm/core';
import {Location} from "./location";
import {DirectionsMapDirective} from "./directions-map.directive";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Route} from "./route";

const MAX_ZOOM =  17;
const SINGLE_POINT_ZOOM = 14;

@Component({
  selector: 'app-ggmaps',
  templateUrl: './ggmaps.component.html',
  styleUrls: ['./ggmaps.component.scss']
})
export class GgmapsComponent implements OnInit {

  @Input()
  route: Route;
  bounds: google.maps.LatLngBoundsLiteral;
  zoom = MAX_ZOOM;
  locationsControls: FormGroup;

  @ViewChild("orgSearch")
  orgSearch: ElementRef;

  @ViewChild("dstSearch")
  dstSearch: ElementRef;

  @ViewChild(DirectionsMapDirective)
  directions: DirectionsMapDirective;

  @ViewChild("wayPointSearch")
  wayPointSearch: ElementRef;

  directionsDisplay: any;

  constructor(private fb: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.locationsControls = this.fb.group({
      org: ['', Validators.required],
      dst: ['', Validators.required],
      add: ['']
    });
    if(!this.directionsDisplay) {
      this.mapsAPILoader.load()
        .then(() => this.directionsDisplay = new google.maps.DirectionsRenderer)
    }
    console.log(this.route);
    this.route = this.route ? this.route : new Route();
    this.applyForOrgAndDst(this.setCurrentPosition);

    //load Places Autocomplete
    this.mapsAPILoader.load()
      .then(() => this.applyForOrgAndDst((loc, inp) => this.addGoogleListener(loc, inp)))
      .then(() => this.updateCenters())
      .then(() => this.addWayPointsAdderIfExists())
  }

  private addWayPointsAdderIfExists() {
    if (this.wayPointSearch) {
      console.log("invoke?", this.wayPointSearch);
      let locationObservable = this.addGoogleListener(() => new Location(), this.wayPointSearch);
      locationObservable.subscribe(loc => {
          this.route.update(locations => locations.splice(locations.length - 1, 0, loc));
          console.log(this.route);
        }
      )
    }
  }

  private addGoogleListener(locSource: () => Location, input: ElementRef): Observable<Location> {
    let autocomplete = new google.maps.places.Autocomplete(input.nativeElement, {types: []});
    let sub = new Subject<Location>();
    autocomplete.addListener("place_changed", () =>
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place);
        if (place.geometry) {
          const loc = locSource();
          Location.from(place, loc);
          sub.next(loc);
          this.updateCenters();
          this.directions.updateDirections(this.directionsDisplay);
        }
      })
    );
    return sub;
  }

  private applyForOrgAndDst(f: Function) {
    f(() => this.route.origin, this.orgSearch);
    f(() => this.route.destination, this.dstSearch);
  }

  private setCurrentPosition(locSource: () => Location = () => new Location()) {
    let sub = new Subject<Location>();
    if ("geolocation" in navigator) {
      const loc = locSource();
      navigator.geolocation.getCurrentPosition(position => {
        loc.latitude = position.coords.latitude;
        loc.longitude = position.coords.longitude;
        sub.next(loc);
      });
    }
    return sub;
  }

  updateCenters() {
    const lat = this.getMinAndMAx('latitude');
    const lng = this.getMinAndMAx('longitude');
    this.bounds = {east: lng.max, west: lng.min, north: lat.max, south: lat.min};
    const allAreSame = lat.max == lat.min && lng.max == lng.min;
    this.zoom = allAreSame && SINGLE_POINT_ZOOM;
    setTimeout(() => this.zoom = undefined,300);
  }

  getMinAndMAx(field) {
    let results = this.route.locations.map(a => a[field]);
    return {min: Math.min(...results), max: Math.max(...results)}
  }
}
