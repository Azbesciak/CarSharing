import { Directive, Input, OnInit } from "@angular/core";
import { GoogleMapsAPIWrapper } from "@agm/core";
import {} from "googlemaps";
import { Route } from "../route";
import { RouteWatcher } from "../route-watcher";

@Directive({
  selector: "agm-directions",

})
export class DirectionsMapDirective extends RouteWatcher implements OnInit {

  @Input()
  directionsDisplay;

  private lastTimeout;
  private directionsService;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {
    super()
  }

  ngOnInit() {
    this.subscribe();
    this.registerListener();
    this.directionsService = new google.maps.DirectionsService;
  }

  onChange(route: Route) {
    this.updateDirections()
  }

  // updateDirections has 2 optional parameters. gets called in map.component
  updateDirections(o?, d?) {
    clearTimeout(this.lastTimeout);
    this.lastTimeout = setTimeout(() => {
      this.gmapsApi.getNativeMap().then(map => {

        //if origin / destination are undefined use value from optional parameters.
        this.directionsDisplay.setMap(map);
        if (!this.route.destination && d) {
          this.route.destination = d;
        }
        if (!this.route.origin && o) {
          this.route.origin = o;
        }

        // give the route the data, travel mode is driving bc users should plan a camping/ roadtrip.
        const wayPoints = this.route.wayPoints ? this.route.wayPoints.map(point => {
          return {location: {lat: point.latitude, lng: point.longitude}, stopover: true}
        }) : [];
        this.directionsService.route({
          origin: {lat: this.route.origin.latitude, lng: this.route.origin.longitude},
          destination: {lat: this.route.destination.latitude, lng: this.route.destination.longitude},
          waypoints: wayPoints,
          optimizeWaypoints: false,
          travelMode: google.maps.TravelMode.DRIVING
        }, (response, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        });
      });
    }, 200)
  }

  registerListener() {
    this.directionsDisplay.addListener("directions_changed", () => {
      this.computeTotalDistance(this.directionsDisplay.getDirections());

      if (this.directionsDisplay && this.directionsDisplay.dragResult) {
        let requestOrigin = this.directionsDisplay.dragResult.request.origin;
        let requestDestination = this.directionsDisplay.dragResult.request.destination;
        if (this.route.origin &&
          (requestOrigin.lat.toString() == this.route.origin.latitude &&
            requestOrigin.lng.toString() == this.route.origin.longitude)) {
          let temp_lat = requestDestination.lat.toString();
          let temp_lng = requestDestination.lng.toString();
          this.route.origin.latitude = temp_lat;
          this.route.origin.longitude = temp_lng;
          this.updateDirections(this.directionsDisplay);
        }
      }
    });
  }

  computeTotalDistance(result) {
    const directionsLegs = result.routes[0].legs;
    this.route = this.route
      .withDistances(directionsLegs.map(r => r.distance.value / 1000))
      .withDurations(directionsLegs.map(r => r.duration.value * 1000));
    this.push(this.route);
  }
}
