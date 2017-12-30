import {Component, Input, OnInit} from '@angular/core';
import {RoutePart} from "../route-part";

@Component({
  selector: 'app-route-part',
  templateUrl: './route-part.component.html',
  styleUrls: ['./route-part.component.scss']
})
export class RoutePartComponent implements OnInit {

  @Input()
  routePart: RoutePart;

  constructor() { }

  ngOnInit() {
  }

}
