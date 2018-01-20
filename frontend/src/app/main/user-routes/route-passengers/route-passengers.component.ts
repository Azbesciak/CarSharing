import {Component, Input, OnInit} from '@angular/core';
import {RouteView} from "../route-view";
import {Observable} from "rxjs/Observable";
import {UserSimpleData} from "../../../functional/route/route-search/route-search-result";

@Component({
  selector: 'app-route-passengers',
  templateUrl: './route-passengers.component.html',
  styleUrls: ['./route-passengers.component.scss']
})
export class RoutePassengersComponent implements OnInit {

  route: RouteView;
  locations: string[];
  passengersOnRoute: Passenger[][];


  @Input()
  routeChangeBus: Observable<RouteView>;

  constructor() { }

  ngOnInit() {
    this.routeChangeBus.subscribe(r => {
      if (r) {
        this.locations = r.locations;
        const passengersColors = this.getPassengersColors(r);
        const maxPassengers = Math.max(...r.routeParts.map(p => p.passengers.length));
        const partsLen = r.routeParts.length;
        this.passengersOnRoute = this.initializeArray(maxPassengers, partsLen);
        for (let i = 0; i < this.passengersOnRoute.length; i++) {
          this.setColumn(this.passengersOnRoute, i, r)
        }
        this.setColors(this.passengersOnRoute, passengersColors);
        this.setPassengersBounds(this.passengersOnRoute);
        console.log(this.passengersOnRoute)
      } else {
        this.locations = [];
        this.passengersOnRoute = this.initializeArray(0,0);
      }

    })
  }

  private getPassengersColors(r) {
    const distinctIds = new Set<number>();
    r.routeParts.forEach(p =>
      p.passengers.map(pas => pas.id)
        .forEach(id => distinctIds.add(id))
    );
    let arr = Array.from(distinctIds.values());
    const map = new Map<number, string>();
    arr.forEach((id, index) => map.set(id, COLORS[index % COLORS.length]));
    return map;
  }

  setColors(passengers: Passenger[][], colors: Map<number, string>) {
    passengers.forEach(part => part
      .filter(p => p)
      .forEach(pas => pas.color = colors.get(pas.user.id)))
  }

  setPassengersBounds(passengers: Passenger[][]) {
    for (let part = 0; part < passengers.length; part++) {
      if (part == 0) {
        passengers[part].filter(p => p).forEach(p => p.isFirst = true)
      } else if (part == passengers.length - 1) {
        passengers[part].filter(p => p).forEach(p => p.isLast = true)
      } else {
        for (let pas = 0; pas < passengers[part].length; pas++) {
          const current = passengers[part][pas];
          if (!current) break;
          const before = passengers[part-1][pas];
          const after = passengers[part+1][pas];
          if (before && before.user.id != current.user.id) {
            before.isLast = true;
            current.isFirst = true;
          } else if (!before) {
            current.isFirst = true;
          }
          if (after && after.user.id != current.user.id) {
            after.isFirst = true;
            current.isLast = true;
          } else if (!after) {
            current.isLast = true;
          }
        }
      }
    }
  }

  initializeArray(maxPassengers, partsLength) {
    return Array.from({length:partsLength}, ()=>Array(maxPassengers).fill(undefined))
  }

  setColumn(passengers: Passenger[][], columnIndex: number, routeView: RouteView) {
    const partPassengers= this.getPartPassengers(routeView, columnIndex);
    if (columnIndex == 0) {
      for (let i = 0; i < partPassengers.length; i++) {
        passengers[0][i] = partPassengers[i];
      }
    } else {
      passengers[columnIndex] = (passengers[columnIndex - 1]).map(user => {
        if (!user) return undefined;
        const pasInd = partPassengers.findIndex(pas => pas.user.id == user.user.id);
        return pasInd >= 0 ? partPassengers.splice(pasInd, 1)[0] : undefined
      });

      for (let i = 0; i < passengers.length; i++) {
        if (partPassengers.length == 0) return;
        if (!passengers[columnIndex][i]) {
          passengers[columnIndex][i] = partPassengers.splice(0, 1)[0]
        }
      }
    }
  }

  private getPartPassengers(routeView: RouteView, columnIndex: number) {
    return routeView.routeParts[columnIndex].passengers.map((user) => new Passenger(user));
  }
}

const COLORS = [
  "#F44336",
  "#9C27B0",
  "#CDDC39",
  "#8BC34A",
  "#795548",
  "#673AB7",
  "#4CAF50",
  "#03A9F4",
  "#2196F3"
];

class Passenger {
  constructor(public user: UserSimpleData, public color: string = null,
              public isFirst: boolean = false,
              public isLast: boolean = false){}
}
