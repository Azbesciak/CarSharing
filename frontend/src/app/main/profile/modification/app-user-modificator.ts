import {AppUser} from "../../authorization/user";
import {Subject} from "rxjs/Subject";

export abstract class AppUserModificator {
  public user: AppUser;
  public sub = new Subject<AppUser>();
  constructor() {}

  complete({value, valid}: {value: any, valid: boolean}, event) {
    console.log(this.user, "user")
    event.preventDefault();
    event.stopPropagation();
    return this.onCompleted({value, valid})
  }
  abstract onCompleted({value, valid}: {value: any, valid: boolean})
}
