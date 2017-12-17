import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {Location} from "./location";
@Component({
  selector: 'app-ggmaps',
  templateUrl: './ggmaps.component.html',
  styleUrls: ['./ggmaps.component.scss']
})
export class GgmapsComponent implements OnInit {

  locations: Location[];
  zoom: number;

  locationsControls: FormGroup;

  @ViewChild("srcSearch")
  srcSearch: ElementRef;

  @ViewChild("dstSearch")
  dstSearch: ElementRef;

  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {}

  ngOnInit() {
    this.locationsControls = this.fb.group({
      src: ['', Validators.required],
      dst: ['', Validators.required]
    });

    this.locations = [
      new Location(51.678418, 7.809007),
      new Location(51.678418, 7.809007),
    ];
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.addGoogleListener(this.srcSearch, this.locations[0]);
      this.addGoogleListener(this.dstSearch, this.locations[1]);
    });
  }

  private addGoogleListener(input: ElementRef, location: Location) {
    let autocomplete = new google.maps.places.Autocomplete(input.nativeElement, {
      types: []
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place);
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        location.latitude = place.geometry.location.lat();
        location.longitude = place.geometry.location.lng();
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.locations[0].latitude = position.coords.latitude;
        this.locations[0].longitude = position.coords.longitude;
        this.locations[1].latitude = position.coords.latitude;
        this.locations[1].longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }



}
