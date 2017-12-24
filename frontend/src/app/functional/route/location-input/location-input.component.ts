import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from "@angular/core";
import { LocationInput } from "./location-input";
import { RouteWatcher } from "../route-watcher";
import { Route } from "../route";
import { Location } from "../location";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent extends RouteWatcher implements OnInit {
  protected onChange(route: Route) {
    this.locInp.onChange(route, this.locInp)
  }

  @ViewChild("inp")
  inp: ElementRef;

  @Input()
  locInp: LocationInput;

  ngOnInit() {
    this.mapsAPILoader.load()
      .then(() => this.addGoogleListener());
    this.subscribe();
  }

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone){super()}

  private addGoogleListener() {
    let autocomplete = new google.maps.places.Autocomplete(this.inp.nativeElement, {types: []});
    autocomplete.addListener("place_changed", () =>
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place);
        if (place.geometry) {
          const label = this.inp.nativeElement.value;
          this.onPlaceFound(place, label);
        }
      })
    );
  }

  private onPlaceFound(place: google.maps.places.PlaceResult,
                       label) {
    this.modifyRoute({loc: place, label: label});
    this.onChange(this.route);
  }

  private modifyRoute(data: {loc: any, label?: string}) {
    const loc = Location.from(data.loc, data.label);
    const locs = Location.copyAll(this.route.locations);
    this.locInp.onNew(loc, locs, this.locInp);
    this.route = new Route(locs);
    this.push(this.route);
  }

}
