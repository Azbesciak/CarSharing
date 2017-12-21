import {Directive, Input} from '@angular/core';
import {GoogleMapsAPIWrapper, LatLng} from "@agm/core";
import { } from 'googlemaps';

@Directive({
  selector: '[agmDirections]',

})
export class DirectionsMapDirective {
  // get variables from map.component
  @Input() origin: LatLng;
  @Input() destination: LatLng;
  @Input() waypoints;
  @Input() waypointCnt;
  @Input() directionsDisplay;

  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

  // updateDirections has 2 optional parameters. gets called in map.component
  updateDirections(directionsDisplay, o?, d?){
    debugger;
    this.gmapsApi.getNativeMap().then(map => {
      const directionsService = new google.maps.DirectionsService;
      directionsDisplay.addListener('directions_changed', function() {
        //this.vc.computeTotalDistance(this.directionsDisplay.getDirections());

        if(directionsDisplay && directionsDisplay.dragResult){
          let requestOrigin = directionsDisplay.dragResult.request.origin;
          let requestDestination = directionsDisplay.dragResult.request.destination;
          if(this.origin && (requestOrigin.lat.toString() == this.origin.latitude && requestOrigin.lng.toString() == this.origin.longitude)){
            console.log('if?');
            let temp_lat = requestDestination.lat.toString();
            let temp_lng = requestDestination.lng.toString();
            this.origin.latitude = temp_lat;
            this.origin.longitude = temp_lng;
            this.vc.updateDirections(directionsDisplay);
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
      directionsService.route({
        origin: {lat: this.origin.lat(), lng: this.origin.lng()},
        destination: {lat: this.destination.lat(), lng: this.destination.lng()},
        waypoints: this.waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if(status == google.maps.DirectionsStatus.OK){
          console.log('new route created')
          let legs = response.routes[0].legs;
          for (let i = 0; i < legs.length; i++) {
            let inputFieldStart = document.getElementById('start') as HTMLInputElement;
            let inputFieldDestination = document.getElementById('destination') as HTMLInputElement;
            if(inputFieldStart.value == ''){
              inputFieldStart.value = legs[i].start_address;
            }
            if(inputFieldDestination.value == ''){
              inputFieldDestination.value = legs[i].end_address;
            }
          }
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        }else{
          console.log('keine Route möglich!')
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
