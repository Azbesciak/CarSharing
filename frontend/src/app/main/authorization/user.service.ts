import {Injectable} from '@angular/core';
import {DataService} from "../../functional/data/data.service";
import {AuthService} from "./auth.service";
import {AppUser, User} from "./user";
import {SessionStorage} from "ngx-webstorage";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {

  @SessionStorage()
  user: AppUser;

  subject: BehaviorSubject<AppUser>;
  constructor(private data: DataService, private auth: AuthService) {
    this.subject = new BehaviorSubject<AppUser>(this.user);
  }

  login(user: User) {
    return this.data.loginUser(user)
      .then(res => this.auth.saveAuthorization(res))
      .then(() => this.getUserData());
  }

  private getUserData() {
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

  logout() {
    return this.auth.clearAuthorization()
      .then(() => this.user = null)
      .then(() => this.subject.next(null));
  }
}
