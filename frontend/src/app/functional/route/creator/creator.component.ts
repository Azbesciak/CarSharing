import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
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
  }

  protected onChange(route: Route) {}

  private addWayPointsAdderIfExists() {
    if (this.wayPointSearch) {
      this.addGoogleListener((loc, locs) => locs.splice(locs.length - 1, 0, loc), this.wayPointSearch);
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
          const loc = Location.from(place);
          const locs = Location.copyAll(this.route.locations);
          onNew(loc, locs);
          this.route = new Route(locs);
          console.log("emited");
          this.push(this.route)
        }
      })
    );
  }

}
