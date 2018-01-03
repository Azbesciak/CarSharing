export class RouteSearchResult {
  constructor(
    public routeId: number = null,
    public driverName: String = null,
    public cost: number = null,
    public departureDate: Date = null,
    public locations: string[] = [],
    public freeSeats: number = null
  ) {}
}
