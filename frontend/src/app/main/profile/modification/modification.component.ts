import { Component, OnInit } from '@angular/core';
import {AppUserModificator} from "./app-user-modificator";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../authorization/user.service";
import {AppUser} from "../../authorization/user";

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.scss']
})
export class ModificationComponent implements OnInit {
  private user: AppUser;
  private modif: AppUserModificator;

  constructor(private userService: UserService) {
  }


  ngOnInit() {
    this.userService
      .subscribeOnUserData(user => {
        this.user = user;
        if (this.modif) {
          this.modif.user = user;
        }
      })
  }

  onModificatorChange(modif) {
    this.modif = modif;
    this.modif.user = this.user;
  }

}
