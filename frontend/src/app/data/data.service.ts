import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment"

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getRoles() : Promise<any> {
    return this.http.get(`${env.apiRoot}/roles`)
      .toPromise()
  }

  blabla(): Promise<any> {
    return this.http.get("http://localhost:8080/login")
      .toPromise()
  }

}
