import { Component, OnInit } from '@angular/core';
import {AppUserModificator} from "./app-user-modificator";
import {UserService} from "../../authorization/user.service";
import {AppUser} from "../../authorization/user";
import {DataService} from "../../../functional/data/data.service";

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.scss']
})
export class ModificationComponent implements OnInit {
  private user: AppUser;
  private modif: AppUserModificator;
  private changed = false;
  constructor(private auth: UserService, private data: DataService) {
  }

  ngOnInit() {
    this.auth
      .subscribeOnUserData(user => {
        this.user = user;
        if (this.modif) {
          this.modif.user = user;
        }
      })
  }

  onModificatorChange(modif: AppUserModificator) {
    this.modif = modif;
    this.modif.sub.subscribe(user => {
      this.changed = true;
      this.user = user
    });
    this.modif.user = this.user;
  }

  onComplete() {
    this.data
      .completeUserData(this.user)
      .then(async() => await this.auth.getUserData())
      .then(e => this.changed = false);
  }

  isInvalid() {
    return !(this.user && this.user.firstName && this.user.lastName && this.user.phoneNumber && this.user.dateOfBirth)
      || !this.changed
  }
}
