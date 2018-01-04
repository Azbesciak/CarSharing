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
import { RouteComponent } from './routes/add-route/route/route.component';
import {BusInjectorService} from "./routes/add-route/bus-injector.service";
import { TimesComponent } from './routes/add-route/times/times.component';
import { DetailsComponent } from './routes/add-route/details/details.component';
import { CostsComponent } from './routes/add-route/costs/costs.component';
import { SummaryComponent } from './routes/add-route/summary/summary.component';
import {RouteSearchService} from "./routes/route-search.service";
import {RoutesTableComponent} from "./routes/routes-table/routes-table.component";
import { RouteAcceptComponent } from './routes/add-route/route-accept/route-accept.component';

const routeCreatorComponents = [
  RouteComponent,
  TimesComponent,
  CostsComponent,
  DetailsComponent,
  RouteAcceptComponent];

@NgModule({
  imports: [
    CommonModule,
    AuthorizationModule,
    UiModule,
    RouteModule,
    RoutingModule,
  ],
  exports: [AuthorizationModule],
  declarations: [
    HomeComponent, BasicComponent,
    ProfileComponent, RoutesComponent, AddRouteComponent, RoutesTableComponent, SummaryComponent,
    CarComponent, PhotoComponent, PartsComponent, ModificationComponent, routeCreatorComponents, RouteAcceptComponent],
  bootstrap: [routeCreatorComponents],
  providers: [BusInjectorService, RouteSearchService]
})
export class MainModule {
}
