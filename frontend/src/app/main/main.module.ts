import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {AuthorizationModule} from "./authorization/authorization.module";
import { CompletionComponent } from './profile/completion/completion.component';
import {UiModule} from "../functional/ui/ui.module";
import { ProfileComponent } from './profile/profile.component';
import {RouteModule} from "../functional/route/route.module";

@NgModule({
  imports: [
    CommonModule,
    AuthorizationModule,
    UiModule,
    RouteModule
  ],
  exports: [AuthorizationModule],
  declarations: [HomeComponent, CompletionComponent, ProfileComponent]
})
export class MainModule { }
