import {Component, Injectable, Injector, OnInit, ReflectiveInjector} from '@angular/core';
import {RouteEvent, RouteWatcher} from "../../../functional/route/route-watcher";
import {Route} from "../../../functional/route/route";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppUser} from "../../authorization/user";
import {RouteComponent} from "./route/route.component";
import {BusInjectorService} from "./bus-injector.service";
import {TimesComponent} from "./times/times.component";
import {CostsComponent} from "./costs/costs.component";
import {SummaryComponent} from "./summary/summary.component";
import {DetailsComponent} from "./details/details.component";
import {RouteAcceptComponent} from "./route-accept/route-accept.component";


@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent extends RouteWatcher implements OnInit {

  user: AppUser;
  routeComponents: RouteCreator[];

  constructor(private busInjector: BusInjectorService) {
    super()
  }

  ngOnInit(): void {
    this.route = new Route();
    this.routeComponents = [
      new RouteCreator("Add your route", RouteComponent),
      new RouteCreator("Specify route times", TimesComponent),
      new RouteCreator("Description and car", DetailsComponent),
      new RouteCreator("Set costs", CostsComponent),
      new RouteCreator("Summary", RouteAcceptComponent),
    ];
    this.routeEventBus = new BehaviorSubject(new RouteEvent(this.route, this));
    this.busInjector.addNew(this.routeEventBus);
  }

  protected onChange(route: Route) {}
}
class RouteCreator{
  constructor(
    public label:string = null,
    public comp: any = null,
  ){}
}
