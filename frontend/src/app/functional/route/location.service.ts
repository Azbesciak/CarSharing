import { Injectable } from "@angular/core";
import {Subject} from "rxjs/Subject";
import { Location} from "./location";
import {Observable} from "rxjs/Observable";
import {MapsAPILoader} from "@agm/core";

@Injectable()
export class LocationService{

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load()
  }

  getCurrentPosition(): Observable<Location> {
    let sub = new Subject<Location>();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position =>
        this.getCurrentLocation(position.coords)
          .subscribe(loc => sub.next(loc))
      );
    }
    return sub;
  }

  private getCurrentLocation(cords) {
    const result = new Subject<Location>();
    new google.maps.Geocoder().geocode({
        location: new google.maps.LatLng(cords.latitude, cords.longitude)
      }, (res: any) => result.next(Location.from(res[0]))
    );
    return result;
  }
}
