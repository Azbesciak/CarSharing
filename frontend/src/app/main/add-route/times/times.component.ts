import { Component, OnInit } from '@angular/core';
import {Route} from "../../../functional/route/route";
import {BusInjectorService} from "../bus-injector.service";
import {RouteCreator} from "../route-creator";
import {TimeDateInput} from "../../../functional/route/visit-date/time-date-input";
import {
  destinationDateInput, getModifier,
  originDateInput
} from "../../../functional/route/visit-date/time-date-input-utils";

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent extends RouteCreator implements OnInit {

  dateInputs: TimeDateInput[];
  partsDateInputs: TimeDateInput[][];
  oldLength = 0;
  protected onChange(route: Route) {
    const partsLength = this.route.routeParts.length;
    if (partsLength != this.oldLength) {
      this.partsDateInputs = Array.from({length: partsLength}, (v, k) => k + 1)
        .map((i:number) => getModifier(i - 1, true));
      this.oldLength = partsLength;
    }
  }

  constructor(busInjector: BusInjectorService) { super(busInjector)}

  ngOnInit() {
    this.dateInputs = [originDateInput(true, 'datetime'), destinationDateInput(true)];
  }

}
