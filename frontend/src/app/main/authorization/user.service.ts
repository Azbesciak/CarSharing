import {Injectable} from '@angular/core';
import {DataService} from "../../functional/data/data.service";
import {AuthService} from "./auth.service";
import {AppUser, User} from "./user";
import {SessionStorage} from "ngx-webstorage";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import {RoutingConstants} from "../../functional/routing/routing.constants";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material";
import {LoginDialogComponent, LoginDialogData} from "./login/login-dialog/login-dialog.component";

@Injectable()
export class UserService {

  @SessionStorage()
  private user: AppUser;
  private subject: BehaviorSubject<AppUser>;

  constructor(private data: DataService,
              private auth: AuthService,
              private router: Router,
              private dialog: MatDialog) {
    this.subject = new BehaviorSubject<AppUser>(this.user);
  }

  login(user: User) {
    return this.data.loginUser(user)
      .then(res => this.auth.saveAuthorization(res))
      .then(() => this.getUserData())
      .then(user => {
        if (!this.isCompletedUser(user)) {
          this.router.navigate([RoutingConstants.getProfileModificationPage()])
        }
        return user;
      });
  }

  showLoginModal(data: LoginDialogData = new LoginDialogData()) {
    this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: data,
    });
  }

  goToLoginPage() {
    this.router.navigate([RoutingConstants.LOGIN_PAGE]);
  };

  getUserData() {
    return this.data.getLoggedInUserData()
      .then((appUser: AppUser) => {
        this.user = appUser;
        this.subject.next(this.user);
        return appUser;
      })
  }

  subscribeOnUserData(applyUser: Function = null) {
    this.subject.subscribe(user => applyUser(user))
  }

  getAuthorizedUser() {
    return this.user;
  }

  logout() {
    return this.auth.clearAuthorization()
      .then(() => this.user = null)
      .then(() => this.subject.next(null))
      .then(() => {
        this.router.navigate([RoutingConstants.HOME_PAGE])
      })
  }

  isCompletedUser(user: AppUser = this.user): boolean {
    return !!(user && user.lastName && user.firstName);
  }
}
