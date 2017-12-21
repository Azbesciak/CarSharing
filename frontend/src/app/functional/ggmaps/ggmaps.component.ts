import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MapsAPILoader} from '@agm/core';
import {Location} from "./location";

const MAX_ZOOM =  17;
const SINGLE_POINT_ZOOM = 14;

@Component({
  selector: 'app-ggmaps',
  templateUrl: './ggmaps.component.html',
  styleUrls: ['./ggmaps.component.scss']
})
export class GgmapsComponent implements OnInit {

  locations: Location[];
  bounds: google.maps.LatLngBoundsLiteral;
  zoom = MAX_ZOOM;
  locationsControls: FormGroup;

  @ViewChild("srcSearch")
  srcSearch: ElementRef;

  @ViewChild("dstSearch")
  dstSearch: ElementRef;

  constructor(private fb: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.locationsControls = this.fb.group({
      src: ['', Validators.required],
      dst: ['', Validators.required]
    });

    this.locations = [
      new Location(),
      new Location()
    ];
    this.applyForSrcAndDst(this.setCurrentPosition);

    //load Places Autocomplete
    this.mapsAPILoader.load()
      .then(() => this.applyForSrcAndDst((loc, inp) => this.addGoogleListener(loc, inp)))
      .then(() => this.updateCenters())
  }

  private addGoogleListener(location: Location, input: ElementRef) {
    let autocomplete = new google.maps.places.Autocomplete(input.nativeElement, {types: []});
    autocomplete.addListener("place_changed", () =>
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place);
        //verify result
        if (place.geometry) {
          //set latitude, longitude and zoom
          location.latitude = place.geometry.location.lat();
          location.longitude = place.geometry.location.lng();
          this.updateCenters()
        }
      })
    );
  }

  private applyForSrcAndDst(f: Function) {
    f(this.locations[0], this.srcSearch);
    f(this.locations[this.locations.length - 1], this.dstSearch);
  }

  private setCurrentPosition(loc: Location) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        loc.latitude = position.coords.latitude;
        loc.longitude = position.coords.longitude;
      });
    }
  }

  updateCenters() {
    const lat = this.getMinAndMAx('latitude');
    const lng = this.getMinAndMAx('longitude');
    this.bounds = {east: lng.max, west: lng.min, north: lat.max, south: lat.min};
    const allAreSame = lat.max == lat.min && lng.max == lng.min;
    console.log(this.locations);
    this.zoom = allAreSame && SINGLE_POINT_ZOOM;
    setTimeout(() => this.zoom = undefined,300);
    console.log(this.zoom, allAreSame)
  }

  getMinAndMAx(field) {
    let results = this.locations.map(a => a[field]);
    return {min: Math.min(...results), max: Math.max(...results)}
  }
}
