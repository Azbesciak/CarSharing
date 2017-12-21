import {Directive, Input, OnChanges, OnInit} from '@angular/core';
import {GoogleMapsAPIWrapper} from "@agm/core";
import { } from 'googlemaps';
import {Location} from "./location";

@Directive({
  selector: 'agm-directions',

})
export class DirectionsMapDirective  implements OnChanges, OnInit{
  // get variables from map.component
  @Input() origin: Location;
  @Input() destination: Location;
  @Input() waypoints;
  @Input() waypointCnt;
  @Input() directionsDisplay;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}


  ngOnInit() {
    this.updateDirections(this.directionsDisplay);
  }

  ngOnChanges() {
    this.updateDirections(this.directionsDisplay);
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
          if(this.origin &&
            ( requestOrigin.lat.toString() == this.origin.latitude &&
              requestOrigin.lng.toString() == this.origin.longitude)){
            console.log('if?');
            let temp_lat = requestDestination.lat.toString();
            let temp_lng = requestDestination.lng.toString();
            this.origin.latitude = temp_lat;
            this.origin.longitude = temp_lng;
            this.updateDirections(directionsDisplay);
          }
        }
        console.log(directionsDisplay);
      });


      //if origin / destination are undefined use value from optional parameters.
      directionsDisplay.setMap(map);
      if(!this.destination && d) {
        this.destination = d;
      }
      if(!this.origin && o) {
        this.origin = o;
      }

      // give the route the data, travel mode is driving bc users should plan a camping/ roadtrip.
      console.log(this.waypoints);
      const wayPoints = this.waypoints ? this.waypoints.map(point => {
        return {location: {lat: point.latitude, lng: point.longitude}}
        }) : [];
      directionsService.route({
        origin: {lat: this.origin.latitude, lng: this.origin.longitude},
        destination: {lat: this.destination.latitude, lng: this.destination.longitude},
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
