import { Component, Input, OnInit } from "@angular/core";
import { MenuPosition } from "./menu-position";

@Component({
  selector: 'app-menu-position',
  templateUrl: './menu-position.component.html',
  styleUrls: ['./menu-position.component.scss']
})
export class MenuPositionComponent implements OnInit {

  @Input()
  item: MenuPosition;

  constructor() { }

  ngOnInit() {
  }

}
