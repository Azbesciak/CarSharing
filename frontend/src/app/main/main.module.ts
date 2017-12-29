import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {AuthorizationModule} from "./authorization/authorization.module";
import {BasicComponent} from "./profile/modification/basic/basic.component";
import {UiModule} from "../functional/ui/ui.module";
import {ProfileComponent} from "./profile/profile.component";
import {RouteModule} from "../functional/route/route.module";
import {RoutesComponent} from "./routes/routes.component";
import {AddRouteComponent} from './routes/add-route/add-route.component';
import {CarComponent} from './profile/modification/car/car.component';
import {PhotoComponent} from './profile/modification/photo/photo.component';
import {PartsComponent} from './profile/parts/parts.component';
import {RoutingModule} from "../functional/routing/routing.module";
import { ModificationComponent } from './profile/modification/modification.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationModule,
    UiModule,
    RouteModule,
    RoutingModule
  ],
  exports: [AuthorizationModule],
  declarations: [
    HomeComponent, BasicComponent,
    ProfileComponent, RoutesComponent, AddRouteComponent,
    CarComponent, PhotoComponent, PartsComponent, ModificationComponent]
})
export class MainModule {
}
