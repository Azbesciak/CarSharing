import { Component, OnInit } from '@angular/core';
import {Route} from "../../../../functional/route/route";
import {BusInjectorService} from "../bus-injector.service";
import {RouteCreator} from "../route-creator";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends RouteCreator implements OnInit {

  protected onChange(route: Route) {
  }

  constructor(busInjector: BusInjectorService) { super(busInjector)}

  ngOnInit() {
  }

}
