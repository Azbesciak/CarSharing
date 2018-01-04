import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DataService} from "../../../functional/data/data.service";
import {RouteSearchParams} from "../../../functional/route/route-search/route-search-params";
import {DetailedRouteSearchResult} from "../../../functional/route/route-search/route-search-result";

@Component({
  selector: 'app-route-details-dialog',
  templateUrl: './route-details-dialog.component.html',
  styleUrls: ['./route-details-dialog.component.scss']
})
export class RouteDetailsDialogComponent implements OnInit {

  route: DetailedRouteSearchResult;

  constructor(public dialogRef: MatDialogRef<RouteDetailsDialogComponent>,
              private dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public data: RouteDetailsDialogData) {
  }


  ngOnInit() {
    this.dataService.getRouteById(this.data.routeId, this.data.searchParams)
      .then(r => {
        console.log(r)
        this.route = r
      })
  }
}

export class RouteDetailsDialogData {
  constructor(public searchParams: RouteSearchParams,
              public routeId: number) {
  }
}
