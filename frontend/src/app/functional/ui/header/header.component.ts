import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {LoginDialogComponent} from "../../../main/authorization/login/login-dialog/login-dialog.component";
import {RoutingConstants} from "../../routing/routing.constants";
import {UserService} from "../../../main/authorization/user.service";
import {AppUser} from "../../../main/authorization/user";
import {Location} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private location: Location,
    private loginServ: UserService) {}

  user: AppUser;

  ngOnInit() {
    this.loginServ.subscribeOnUserData(user => this.user = user);
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: {},
    });
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
