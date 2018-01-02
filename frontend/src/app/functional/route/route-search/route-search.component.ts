import { Component, Input, OnInit } from "@angular/core";
import { RouteWatcher } from "../route-watcher";
import { Route } from "../route";
import { LocationInput } from "../location-input/location-input";
import { TimeDateInput } from "../visit-date/time-date-input";
import {RouteSearchParams} from "./route-search-params";

@Component({
  selector: "app-route-search",
  templateUrl: "./route-search.component.html",
  styleUrls: ["./route-search.component.scss"]
})
export class RouteSearchComponent extends RouteWatcher implements OnInit {

  @Input()
  locInputs: LocationInput[] = [];

  @Input()
  dateInputs: TimeDateInput[] = [];

  @Input()
  onSubmit: (route: RouteSearchParams) => void;

  @Input()
  submitLabel: string;

  constructor() {
    super()
  }

  ngOnInit() {
    this.subscribe();
  }

  protected onChange(route: Route) {
  }

  isValid() {
    return [...this.locInputs, ...this.dateInputs].every(inp => inp.isValid());
  }

  submitMade(event) {
    event.stopPropagation();
    event.preventDefault();
    this.onSubmit(RouteSearchParams.fromRoute(this.route))
  }
}
