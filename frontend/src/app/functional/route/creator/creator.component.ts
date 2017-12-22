import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "../location";
import {MapsAPILoader} from "@agm/core";
import {RouteWatcher} from "../route-watcher";
import {Route} from "../route";

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent extends RouteWatcher implements OnInit {

  @ViewChild("orgSearch")
  orgSearch: ElementRef;

  @ViewChild("dstSearch")
  dstSearch: ElementRef;

  @ViewChild("wayPointSearch")
  wayPointSearch: ElementRef;

  locationsControls: FormGroup;
  form: {dst?: string, org?: string, add?: string} = {};

  constructor(private fb: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {super()}

  ngOnInit() {
    this.locationsControls = this.fb.group({
      org: ['', Validators.required],
      dst: ['', Validators.required],
      add: ['']
    });
    this.subscribe();
    this.mapsAPILoader.load()
      .then(() => this.applyForOrgAndDst((loc, inp) => this.addGoogleListener(loc, inp)))
      .then(() => this.addWayPointsAdderIfExists())
      .then(() => this.getCurrentLocation())
  }

  protected onChange(route: Route) {
    this.form.org = route.origin.label;
    this.form.dst = route.destination.label;
  }

  private addWayPointsAdderIfExists() {
    if (this.wayPointSearch) {
      this.addGoogleListener((loc, locs) => {
          this.form.add = undefined;
          return locs.splice(locs.length - 1, 0, loc)
        }, this.wayPointSearch
      );
    }
  }

  private applyForOrgAndDst(f: Function) {
    f((loc, locs) => locs[0] = loc, this.orgSearch);
    f((loc, locs) => locs[locs.length - 1] = loc, this.dstSearch);
  }

  private addGoogleListener(onNew: (loc: Location, locs: Location[]) => void, input: ElementRef) {
    let autocomplete = new google.maps.places.Autocomplete(input.nativeElement, {types: []});
    autocomplete.addListener("place_changed", () =>
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place);
        if (place.geometry) {
          const label = input.nativeElement.value;
          this.onPlaceFound(place, onNew, label);
        }
      })
    );
  }

  private onPlaceFound(place: google.maps.places.PlaceResult,
                       onNew: (loc: Location, locs: Location[]) => void,
                       label) {
    this.modifyRoute(onNew, {loc: place, label: label});
    this.onChange(this.route);
  }

  private getCurrentLocation() {
    new google.maps.Geocoder().geocode({
      location: new google.maps.LatLng(this.route.destination.latitude, this.route.destination.longitude)
    }, (res: any) =>
      this.modifyRoute((loc, locs) => {
        locs[0] = Location.copy(loc);
        locs[locs.length - 1] = Location.copy(loc);
      }, {loc: res[0]})
    );
  }

  private modifyRoute(f: (loc, locs) => void, data: {loc: any, label?: string}) {
    const loc = Location.from(data.loc, data.label);
    const locs = Location.copyAll(this.route.locations);
    f(loc, locs);
    this.route = new Route(locs);
    this.push(this.route);
  }
}
