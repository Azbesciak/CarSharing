import {Component, Input, OnInit} from '@angular/core';
import {Route} from "../../../functional/route/route";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.scss']
})
export class RoutesTableComponent implements OnInit {

  @Input()
  routes: Route[];

  displayedColumns = ['origin', 'destination', 'car'];
  dataSource;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Route>(this.routes);
  }


}
