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

  constructor(private auth: UserService, private data:DataService) {
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
    this.modif.sub.subscribe(user => this.user = user);
    this.modif.user = this.user;
  }

  onComplete() {
    this.data
      .completeUserData(this.user)
      .then(async() => await this.auth.getUserData())
      .then(e => console.log(e));
  }

  isInvalid() {
    return  !(this.user && this.user.cars && this.user.cars.length > 0 &&
            this.user.firstName && this.user.lastName && this.user.phoneNumber)
  }
}
