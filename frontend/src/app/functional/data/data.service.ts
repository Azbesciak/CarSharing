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
    this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'application/json' });
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

  // searchRoute(route: RouteSearchParams): Promise<RouteSearchResult[]> {
  //   return this.getWithBody("routes", route)
  // }

  getAllCarTypes() {
    return this.http.get(toApi('cars/types')).toPromise();
  }

  searchRoute(route: RouteSearchParams): Promise<any> {
    let params = new HttpParams()
      .append("origin", route.origin.label)
      .append("destination", route.destination.label)
      .append("departureDate", new Date(route.departureDateNum).toISOString());
    return this.http.get(toApi("routes/direct"), {params: params}).toPromise()
  }

  // getWithBody(path, param): Promise<any> {
  //   const params = this.findParam(param, new HttpParams(), "param") || new HttpParams();
  //   // console.log(params)
  //   return this.http.get(toApi(path), {params: {param: JSON.stringify(param)}}).toPromise()
  // }

  findParam(obj, params: HttpParams, path = null) {
    if (obj instanceof Object) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const objPath = path ?`${path}.${key}` : key;
          const parentRes = this.findParam(obj[key], params, objPath);
          if (!parentRes){
            const val = obj[key];
            params = params.append(objPath, val);
          } else {
            params = parentRes
          }
        }
      }
      return params;
    }
    return false;
  }
}

function toApi(url: string): string {
  return `${env.apiRoot}/${url}`
}
