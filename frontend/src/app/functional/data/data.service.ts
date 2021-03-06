import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment as env} from "../../../environments/environment"
import {AppUser, User} from "../../main/authorization/user";
import { Route } from "../route/route";
import {RouteSearchParams} from "../route/route-search/route-search-params";
import {RouteJoinRequest} from "../../main/routes/route-join-request/route-join-request";
import {RouteJoinRequestView, RouteView} from "../../main/user-routes/route-view";

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

  sendJoinRequest(routeJoinRequest: RouteJoinRequest) {
    return this.http.post(toApi("request/join"), routeJoinRequest).toPromise()
  }

  getUserRoutes(route: RouteSearchParams): Promise<any> {
    const params = createHttpSearchParamsFromRoute(route);
    return this.http.get(toApi("routes/byDriver"), {params: params}).toPromise()
  }

  getRouteRequests(route: RouteView): Promise<any> {
    return this.http.get(toApi(`request/route/${route.routeId}`)).toPromise()
  }

  acceptRouteRequest(req: RouteJoinRequestView) {
    return this.http.post(toApi(`request/accept/${req.requestId}`), {}).toPromise()
  }

  rejectRouteRequest(req: RouteJoinRequestView) {
    return this.http.post(toApi(`request/reject/${req.requestId}`), {}).toPromise()
  }

}
function toApi(url: string): string {
  return `${env.apiRoot}/${url}`
}
function createHttpSearchParamsFromRoute(route: RouteSearchParams) {
  let params = new HttpParams();
  if (route.origin) {
    params = params.append("origin", route.origin.label);
  }
  if (route.destination) {
    params = params.append("destination", route.destination.label);
  }
  if (route.departureDateNum) {
    params = params.append("departureDate", new Date(route.departureDateNum).toISOString());
  }
  return params
}
