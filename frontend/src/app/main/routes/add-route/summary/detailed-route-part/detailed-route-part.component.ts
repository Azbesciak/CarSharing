import {Component, Input, OnInit} from '@angular/core';
import {RoutePart} from "../../../../../functional/route/route-part";

@Component({
  selector: 'app-detailed-route-part',
  templateUrl: './detailed-route-part.component.html',
  styleUrls: ['./detailed-route-part.component.scss']
})
export class DetailedRoutePartComponent implements OnInit {

  @Input()
  routePart: RoutePart;

  constructor() { }

  ngOnInit() {
  }
  getRouteDuration(): string {
    const duration = this.getDuration() / (1000 * 60);
    const minutes = `${Math.floor(duration % 60)} min`;
    const hours = Math.floor(duration / 60);

    if (hours > 0) {
      return `${hours} h ${minutes}`
    } else {
      return minutes
    }
  }

  getDuration(): number {
    const part: any = this.routePart;
    if (part instanceof RoutePart) {
      return part.getDuration();
    } else {
      return new Date(part.destination.date).getTime() - new Date(part.origin.date).getTime()
    }
  }

}
