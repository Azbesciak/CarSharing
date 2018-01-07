import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "../../main/authorization/registration/registration.component";
import {LoginComponent} from "../../main/authorization/login/login.component";
import {HomeComponent} from "../../main/home/home.component";
import {RoutingConstants} from "./routing.constants"
import {BasicComponent} from "../../main/profile/modification/basic/basic.component";
import {AuthGuardService} from "../../main/authorization/auth-guard.service";
import { RoutesSearchComponent } from "../../main/routes/routes-search.component";
import { AddRouteComponent } from "../../main/add-route/add-route.component";
import {ProfileComponent} from "../../main/profile/profile.component";
import {CarComponent} from "../../main/profile/modification/car/car.component";
import {PhotoComponent} from "../../main/profile/modification/photo/photo.component";
import {ModificationComponent} from "../../main/profile/modification/modification.component";
import {CarsRequiredInterceptor} from "../../main/cars-required.interceptor";
import {UserRoutesComponent} from "../../main/user-routes/user-routes.component";

const appRoutes: Routes = [
  {path: RoutingConstants.HOME_PAGE, component: HomeComponent},
  {path: RoutingConstants.ROUTES_SEARCH_PATH, component: RoutesSearchComponent},
  {path: RoutingConstants.REGISTER_PAGE, component: RegistrationComponent},
  {path: RoutingConstants.LOGIN_PAGE, component: LoginComponent},
  {path: RoutingConstants.ADD_ROUTE_PATH, canActivate: [AuthGuardService, CarsRequiredInterceptor], component: AddRouteComponent},
  {path: RoutingConstants.ROUTES_PATH, canActivate: [AuthGuardService], component: UserRoutesComponent},
  {
    path: RoutingConstants.PROFILE_PATH, canActivate: [AuthGuardService], component: ProfileComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: RoutingConstants.PROFILE_MODIFICATION_PAGE},
      {path: RoutingConstants.PROFILE_MODIFICATION_PAGE, canDeactivate: [AuthGuardService],
        component: ModificationComponent, children: [
          {path: '', pathMatch: 'full', redirectTo: RoutingConstants.PROFILE_MODIFICATION_BASIC_PAGE},
          {path: RoutingConstants.PROFILE_MODIFICATION_BASIC_PAGE, component: BasicComponent},
          {path: RoutingConstants.PROFILE_MODIFICATION_CARS_PAGE, component: CarComponent},
          {path: RoutingConstants.PROFILE_MODIFICATION_PHOTOS_PAGE, component: PhotoComponent}
        ]},
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
