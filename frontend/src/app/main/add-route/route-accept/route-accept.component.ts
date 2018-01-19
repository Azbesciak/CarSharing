import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Route} from "../../../functional/route/route";
import {
  InfoDialogComponent, InfoDialogData,
  InfoDialogType
} from "../../../functional/ui/info-dialog/info-dialog.component";
import {RoutingConstants} from "../../../functional/routing/routing.constants";
import {Router} from "@angular/router";
import {DataService} from "../../../functional/data/data.service";
import {BusInjectorService} from "../bus-injector.service";
import {MatDialog} from "@angular/material";
import {RouteCreator} from "../route-creator";
import {ModalService} from "../../../functional/ui/modal/modal.service";

@Component({
  selector: 'app-route-accept',
  templateUrl: './route-accept.component.html',
  styleUrls: ['./route-accept.component.scss']
})
export class RouteAcceptComponent extends RouteCreator implements OnInit {
  protected onChange(route: Route) {
    this.checkValidity()
  }

  constructor(private data: DataService,
              private modal: ModalService,
              private router: Router,
              private changesDet: ChangeDetectorRef,
              busInjector: BusInjectorService) {
    super(busInjector)
  }

  errors: string[];

  ngOnInit() {
    this.checkValidity()
  }

  addRoute() {
    this.data.addRoute(this.route)
      .then(r => this.modal.show(new InfoDialogData(
        InfoDialogType.SUCCESS,
        () => this.onClose(),
        "Success",
        `Route <br>
                  <strong>${this.route.origin.label}</strong> &rarr; <strong>${this.route.destination.label}</strong><br>
                   was successfully added.`))
      );
  }

  checkValidity() {
    this.errors = [];
    if (!this.route) return;
    check(this.route.car, "No car selected", this.errors);
    check(this.route.origin, "Origin not set", this.errors);
    check(this.route.destination, "Destination not set", this.errors);
    if (this.route.routeParts.length >= 1) {
      check(this.route.routeParts.every(p => p.cost >= 0),
        "Cost not set at some part", this.errors);
      check(this.route.routeParts.every(p => !!p.destination.date && !!p.origin.date),
        "Missing origin or departure date", this.errors);
    } else {
      check(false, "Route not specified", this.errors);
    }
  }


  onClose() {
    this.router.navigate([RoutingConstants.HOME_PAGE])
  }

}

function check(truly, message, errors) {
  if (!truly) {
    errors.push(message)
  }
}
