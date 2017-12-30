export class Car {
  constructor(
  public id: number = null,
  public manufacturer: string = null,
  public model: string = null,
  public type: string = null,
  public seatCount: number = null,
  public yearOfProduction: Date = null,
  public description: string = null,
  public fuelUsage: number = null){}

  static copy(c: Car) {
    return c ? new Car(
      c.id, c.manufacturer,
      c.model, c.type,
      c.seatCount, c.yearOfProduction,
      c.description, c.fuelUsage) : c
  }
}
