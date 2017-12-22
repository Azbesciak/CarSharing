import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Location} from "./location";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LocationService {

  constructor() { }

  getCurrentPosition(): Observable<Location> {
    let sub = new Subject<Location>();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const loc = new Location(position.coords.longitude, position.coords.latitude);
        sub.next(loc);
      });
    }
    return sub;
  }


}
