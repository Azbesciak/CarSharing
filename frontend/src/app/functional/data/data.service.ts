import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment as env} from "../../../environments/environment"
import {AppUser, User} from "../../main/authorization/user";
import { Route } from "../route/route";
import {RequestOptions} from "@angular/http";
import {RouteSearchParams} from "../route/route-search/route-search-params";
import {RouteSearchResult} from "../route/route-search/route-search-result";

@Injectable()
export class DataService {

  headers: Headers;

  constructor(private http: HttpClient) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

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

  getAllCarTypes() {
    return this.http.get(toApi('cars/types')).toPromise();
  }

  searchRoute(route: RouteSearchParams): Promise<any> {
    const params = createHttpSearchParamsFromRoute(route);
    return this.http.get(toApi("routes/direct"), {params: params}).toPromise()
  }

  getRouteById(routeId: number, route: RouteSearchParams): Promise<any> {
    const params = createHttpSearchParamsFromRoute(route);
    return this.http.get(toApi(`routes/${routeId}`), {params: params}).toPromise()
  }

}
function toApi(url: string): string {
  return `${env.apiRoot}/${url}`
}
function createHttpSearchParamsFromRoute(route: RouteSearchParams) {
  return new HttpParams()
    .append("origin", route.origin.label)
    .append("destination", route.destination.label)
    .append("departureDate", new Date(route.departureDateNum).toISOString());
}
