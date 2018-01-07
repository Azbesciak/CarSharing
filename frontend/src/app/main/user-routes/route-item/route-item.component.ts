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

  constructor(
    private dataService: DataService,
    private changeDetec: ChangeDetectorRef
  ) { }

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

  accept(req: RouteJoinRequestView) {
    this.dataService.acceptRouteRequest(req)
  }

  reject(req: RouteJoinRequestView) {
    this.dataService.rejectRouteRequest(req)
  }
}
