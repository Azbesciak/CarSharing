import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {RouteJoinRequestView} from "../route-view";
import {DataService} from "../../../functional/data/data.service";
import {getAge} from "../../../functional/form-utils/utils";

@Component({
  selector: 'app-route-request',
  templateUrl: './route-request.component.html',
  styleUrls: ['./route-request.component.scss'],
})
export class RouteRequestComponent implements OnInit {

  @Input()
  request: RouteJoinRequestView;

  @Output()
  onRejected = new EventEmitter<RouteJoinRequestView>();

  passengerAge: number;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.passengerAge = getAge(this.request.user.dateOfBirth)
  }


  accept() {
    this.dataService.acceptRouteRequest(this.request)
  }

  reject() {
    this.dataService.rejectRouteRequest(this.request)
      .then(() => this.onRejected.next(this.request))
  }

}
