import { Component, OnInit } from '@angular/core';
import {MenuPosition} from "../../../functional/ui/menu-position/menu-position";
import {Router} from "@angular/router";
import {RoutingConstants} from "../../../functional/routing/routing.constants";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  items: MenuPosition[];
  constructor(private router: Router) { }

  static BASIC: string = "Basic information";
  static CARS: string = "Your Cars";
  static PHOTOS: string = "Photos";

  ngOnInit() {
    this.items = [
      new MenuPosition(PartsComponent.BASIC,
        () => this.router.navigate([RoutingConstants.getBasicModifPage()]), "account_box"),
      new MenuPosition(PartsComponent.CARS,
        () => this.router.navigate([RoutingConstants.getAddCarsPage()]), "directions_car"),
      new MenuPosition(PartsComponent.PHOTOS,
        () => this.router.navigate([RoutingConstants.getAddPhotoPage()]),"add_a_photo")
    ]
  }



}
