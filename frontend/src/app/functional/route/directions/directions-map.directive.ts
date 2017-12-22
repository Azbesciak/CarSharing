import {Directive, Input, OnChanges, OnInit} from '@angular/core';
import {GoogleMapsAPIWrapper} from "@agm/core";
import { } from 'googlemaps';
import {Route} from "../route";
import {RouteWatcher} from "../route-watcher";

@Directive({
  selector: 'agm-directions',

})
export class DirectionsMapDirective extends RouteWatcher implements OnChanges, OnInit{

  @Input()
  directionsDisplay;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {super()}

  ngOnInit() {
    this.subscribe()
    // this.updateDirections(this.directionsDisplay);
  }

  onChange(route: Route) {
    this.updateDirections(this.directionsDisplay)
  }

  ngOnChanges() {
    // console.log("change in dir");
    // this.updateDirections(this.directionsDisplay);
  }
  // updateDirections has 2 optional parameters. gets called in map.component
  updateDirections(directionsDisplay, o?, d?) {
    this.gmapsApi.getNativeMap().then(map => {
      const directionsService = new google.maps.DirectionsService;
      directionsDisplay.addListener('directions_changed', () => {
        //this.vc.computeTotalDistance(this.directionsDisplay.getDirections());

        if(directionsDisplay && directionsDisplay.dragResult){
          let requestOrigin = directionsDisplay.dragResult.request.origin;
          let requestDestination = directionsDisplay.dragResult.request.destination;
          if(this.route.origin &&
            ( requestOrigin.lat.toString() == this.route.origin.latitude &&
              requestOrigin.lng.toString() == this.route.origin.longitude)){
            let temp_lat = requestDestination.lat.toString();
            let temp_lng = requestDestination.lng.toString();
            this.route.origin.latitude = temp_lat;
            this.route.origin.longitude = temp_lng;
            this.updateDirections(directionsDisplay);
          }
        }
      });


      //if origin / destination are undefined use value from optional parameters.
      directionsDisplay.setMap(map);
      if(!this.route.destination && d) {
        this.route.destination = d;
      }
      if(!this.route.origin && o) {
        this.route.origin  = o;
      }

      // give the route the data, travel mode is driving bc users should plan a camping/ roadtrip.
      const wayPoints = this.route.wayPoints ? this.route.wayPoints.map(point => {
        return {location: {lat: point.latitude, lng: point.longitude}, stopover: true}
        }) : [];
      directionsService.route({
        origin: {lat: this.route.origin.latitude, lng: this.route.origin.longitude},
        destination: {lat: this.route.destination.latitude, lng: this.route.destination.longitude},
        waypoints: wayPoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if(status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
      });

      //function for displaying the travel distance
      function computeTotalDistance(result) {
        let total = 0;
        let myroute = result.routes[0];
        for (let i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById('trip_length').innerHTML = 'The trip is <span id="trip_length_nr">' +total + '</span>km long.';
      }
    });
  }
}
