import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {LoginDialogComponent} from "../../../main/authorization/login/login-dialog/login-dialog.component";
import {RoutingConstants} from "../../routing/routing.constants";
import {UserService} from "../../../main/authorization/user.service";
import {AppUser} from "../../../main/authorization/user";
import {Location} from "@angular/common";
import { MenuPosition } from "../menu-position/menu-position";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private loginServ: UserService) {}

  user: AppUser;
  menuItems: MenuPosition[];

  ngOnInit() {
    this.loginServ.subscribeOnUserData(user => this.user = user);
    this.menuItems = [
      new MenuPosition("Car Sharing", () => this.router.navigate([RoutingConstants.HOME_PAGE]), "directions_car"),
      new MenuPosition("Search", () => this.router.navigate([RoutingConstants.ROUTES_SEARCH_PATH])),
      new MenuPosition("Add Route", () => this.router.navigate([RoutingConstants.ADD_ROUTE_PATH])),
      new MenuPosition("Your Routes", () => this.router.navigate([RoutingConstants.ROUTES_PATH])),
    ]
  }

  openLoginDialog(): void {
    this.loginServ.showLoginModal()
  }

  register() {
    this.router.navigate([RoutingConstants.REGISTER_PAGE]);
  }

  logout() {
    this.loginServ.logout()
  }

  showProfile() {
    this.router.navigate([RoutingConstants.getProfilePage()])
  }

}
