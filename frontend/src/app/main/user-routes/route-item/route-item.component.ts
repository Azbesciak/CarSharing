import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {RouteJoinRequestView, RouteView} from "../route-view";
import {DataService} from "../../../functional/data/data.service";

@Component({
  selector: 'app-route-item',
  templateUrl: './route-item.component.html',
  styleUrls: ['./route-item.component.scss']
})
export class RouteItemComponent implements OnInit {
  reqSent = false;
  @Input()
  route: RouteView;

  requests: RouteJoinRequestView[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

  fetchRequests() {
    if (!this.reqSent) {
      this.reqSent = true;
      this.dataService.getRouteRequests(this.route)
        .then(r => this.requests = r)
        .then(() => console.log(this.requests))
    }
  }

  removeRequest(req: RouteJoinRequestView, index: number) {
    this.requests.splice(index, 1)
  }

  addToPassengers(req: RouteJoinRequestView, index: number) {
    console.log(req)
    this.removeRequest(req, index);
  }
}
