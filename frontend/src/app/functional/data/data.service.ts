import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment"
import {AppUser, User} from "../../main/authorization/user";
import { Route } from "../route/route";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {}

  loginUser(user: User) {
    return this.http.post(
        toApi("login"),
        user, {responseType: 'text', observe: 'response'})
      .toPromise()
  }

  registerUser(user: User) {
    return this.http.post(toApi("register"), user).toPromise()
      .catch(e => console.log(e))
  }

  getLoggedInUserData() {
    return this.http.get(toApi("user/data")).toPromise()
  }

  completeUserData(user: AppUser) {
    return this.http.post(toApi("user/update"), user).toPromise()
  }

  addRoute(route: Route) {
    return this.http.post(toApi('routes/add'), route).toPromise()
  }

  searchRoute(route: Route) {
    return this.http.get(toApi(
      `routes/${route.origin.label}/${route.destination.label}/${route.departureDate.getTime()}`
    )).toPromise();
  }

  getAllCarTypes() {
    return this.http.get(toApi('cars/types')).toPromise();
  }
}

function toApi(url: string): string {
  return `${env.apiRoot}/${url}`
}
