import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getHeroes() : Promise<any> {
    return this.http.get("http://localhost:8090/api/heroes")
      .toPromise()
  }

}
