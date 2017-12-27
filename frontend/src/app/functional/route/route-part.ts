import {Location} from "./location";

export class RoutePart {
  constructor(
    public order: number,
    public distance: number,
    public distanceText: string,
    public duration: number,
    public durationText: string,
    public origin: Location,
    public destination: Location,
    public departureDateTime: Date,
    public arrivalDateTime: Date,
  ) {}
}
