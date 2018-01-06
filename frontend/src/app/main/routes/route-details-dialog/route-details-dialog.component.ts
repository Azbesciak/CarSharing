import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DataService} from "../../../functional/data/data.service";
import {RouteSearchParams} from "../../../functional/route/route-search/route-search-params";
import {DetailedRouteSearchResult} from "../../../functional/route/route-search/route-search-result";
import {RoutePart} from "../../../functional/route/route-part";

@Component({
  selector: 'app-route-details-dialog',
  templateUrl: './route-details-dialog.component.html',
  styleUrls: ['./route-details-dialog.component.scss']
})
export class RouteDetailsDialogComponent implements OnInit {

  route: DetailedRouteSearchResult;
  headerView: string;
  driverAge: number;
  firstPart: RoutePart;
  lastPart: RoutePart;

  constructor(public dialogRef: MatDialogRef<RouteDetailsDialogComponent>,
              private dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public data: RouteDetailsDialogData) {
  }
  ngOnInit() {
    this.dataService.getRouteById(this.data.routeId, this.data.searchParams)
      .then(r => {
        const interestedRoute = this.prepareInterestedRoute(r);
        this.setStartAndLastPart(interestedRoute);
        this.prepareHeader(interestedRoute);
        this.prepareDriverAge(r);
        console.log(r);
        this.route = r
      })
  }
  prepareInterestedRoute(route: DetailedRouteSearchResult) {
    return route.routeParts
      .filter((r: any) => route.searchedRouteIds.indexOf(r.id) >= 0);
  }

  setStartAndLastPart(interestedRoute){
    this.firstPart = interestedRoute[0];
    this.lastPart = interestedRoute[interestedRoute.length - 1];
  }

  prepareHeader(interestedRoute) {

    let locationBetween = '→';
    if (interestedRoute.length >= 2) {
      const center = Math.floor(interestedRoute.length / 2);
      const loc = interestedRoute[center].origin.location.locality;
      locationBetween = `${locationBetween} ${loc} ${locationBetween}`
    }
    this.headerView = `
    <strong>${this.firstPart.origin.location.label}</strong>
    ${locationBetween}
    <strong>${this.lastPart.destination.location.label}</strong>`

  }

  closeDialog() {
    this.dialogRef.close();
  }

  private prepareDriverAge(route: DetailedRouteSearchResult) {
    const lifeInMilis = new Date().getTime() - new Date(route.driver.dateOfBirth).getTime()
    this.driverAge = new Date(lifeInMilis).getFullYear() - 1970
  }
}

export class RouteDetailsDialogData {
  constructor(public searchParams: RouteSearchParams,
              public routeId: number) {
  }
}
