import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class BusInjectorService {

  constructor() { }
  busProvider = new BehaviorSubject(null);
  addNew(val) {
    this.busProvider.next(val);
  }

  subscribe(f: (val) => void) {
    this.busProvider.subscribe(v => f(v))
  }
}
