import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "../../main/authorization/registration/registration.component";
import {LoginComponent} from "../../main/authorization/login/login.component";
import {HomeComponent} from "../../main/home/home.component";
import {RoutingConstants} from "./routing.constants"
import {CompletionComponent} from "../../main/profile/completion/completion.component";
import {AuthGuardService} from "../../main/authorization/auth-guard.service";
import { RoutesComponent } from "../../main/routes/routes.component";

const appRoutes: Routes = [
  {path: RoutingConstants.HOME_PAGE, component: HomeComponent},
  {path: RoutingConstants.ROUTES_PATH, component: RoutesComponent},
  {path: RoutingConstants.REGISTER_PAGE, component: RegistrationComponent},
  {path: RoutingConstants.LOGIN_PAGE, component: LoginComponent},
  {
    path: RoutingConstants.PROFILE_PATH, canActivate: [AuthGuardService],
    children: [
      {path: RoutingConstants.PROFILE_COMPLETION_PAGE, component: CompletionComponent, canDeactivate: [AuthGuardService]},
    ]
  },

  {path: '**', redirectTo: RoutingConstants.HOME_PAGE, pathMatch: 'full'}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule {
}
