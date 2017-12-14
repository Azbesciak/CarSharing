import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginComponent} from "../../../main/authorization/login/login.component";
import {MatDialog} from "@angular/material";
import {LoginFormComponent} from "../../../main/authorization/login/login-form/login-form.component";
import {LoginDialogComponent} from "../../../main/authorization/login/login-dialog/login-dialog.component";
import {RoutingConstants} from "../../routing/routing.constants";
import {LoginService} from "../../../main/authorization/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private loginServ: LoginService) {}

  ngOnInit() {
  }

  goToLogin() {

  }

  openLoginDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }

  register() {
    this.router.navigate([RoutingConstants.REGISTER_PAGE]);
  }

  logout() {
    this.loginServ.logout();
  }

}
