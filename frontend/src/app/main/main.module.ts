import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {AuthorizationModule} from "./authorization/authorization.module";
import {BasicComponent} from "./profile/modification/basic/basic.component";
import {UiModule} from "../functional/ui/ui.module";
import {ProfileComponent} from "./profile/profile.component";
import {RouteModule} from "../functional/route/route.module";
import {RoutesSearchComponent} from "./routes/routes-search.component";
import {AddRouteComponent} from './add-route/add-route.component';
import {CarComponent} from './profile/modification/car/car.component';
import {PhotoComponent} from './profile/modification/photo/photo.component';
import {PartsComponent} from './profile/parts/parts.component';
import {RoutingModule} from "../functional/routing/routing.module";
import { ModificationComponent } from './profile/modification/modification.component';
import { RouteComponent } from './add-route/route/route.component';
import {BusInjectorService} from "./add-route/bus-injector.service";
import { TimesComponent } from './add-route/times/times.component';
import { DetailsComponent } from './add-route/details/details.component';
import { CostsComponent } from './add-route/costs/costs.component';
import { SummaryComponent } from './add-route/summary/summary.component';
import {RouteSearchService} from "./routes/route-search.service";
import {RoutesTableComponent} from "./routes/routes-table/routes-table.component";
import { RouteAcceptComponent } from './add-route/route-accept/route-accept.component';
import { ActionsComponent } from './routes/routes-table/actions/actions.component';
import { RouteDetailsDialogComponent } from './routes/route-details-dialog/route-details-dialog.component';
import {DetailedRoutePartComponent} from "./add-route/summary/detailed-route-part/detailed-route-part.component";
import {RouteJoinRequestService} from "./routes/route-join-request/route-join-request.service";
import {CarsRequiredInterceptor} from "./cars-required.interceptor";
import { UserRoutesComponent } from './user-routes/user-routes.component';
import { RouteItemComponent } from './user-routes/route-item/route-item.component';
import { LocationsComponent } from './routes/routes-table/locations/locations.component';

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
    ProfileComponent, RoutesSearchComponent, AddRouteComponent, RoutesTableComponent, SummaryComponent,
    CarComponent, PhotoComponent, PartsComponent, ModificationComponent, routeCreatorComponents,
    RouteAcceptComponent, ActionsComponent, RouteDetailsDialogComponent, DetailedRoutePartComponent, UserRoutesComponent, RouteItemComponent, LocationsComponent],
  bootstrap: [routeCreatorComponents, RouteDetailsDialogComponent],
  providers: [BusInjectorService, RouteSearchService, RouteJoinRequestService, CarsRequiredInterceptor]
})
export class MainModule {
}
