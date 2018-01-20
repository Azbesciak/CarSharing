import {Component, Input, OnInit} from '@angular/core';
import {RouteJoinRequestView, RouteView} from "../route-view";
import {DataService} from "../../../functional/data/data.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

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
  routeChangeBus: BehaviorSubject<RouteView>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.routeChangeBus = new BehaviorSubject<RouteView>(null);
  }

  fetchRequests() {
    if (!this.reqSent) {
      this.reqSent = true;
      this.routeChangeBus.next(this.route);
      this.dataService.getRouteRequests(this.route)
        .then(r => this.requests = r)
        .then(() => console.log(this.requests))
    }
  }

  removeRequest(req: RouteJoinRequestView, index: number) {
    this.requests.splice(index, 1)
  }

  addToPassengers(req: RouteJoinRequestView, index: number) {
    req.partsIds
      .map(partId => this.route.routeParts.find(part => part.routePartId == partId))
      .forEach(part => part.passengers.push(req.user));
    this.routeChangeBus.next(this.route);
    this.removeRequest(req, index);
  }
}
