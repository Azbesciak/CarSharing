import { TimeDateInput } from "./time-date-input";

export function originDateInput(type: string = 'date'): TimeDateInput {
  return new TimeDateInput(
    (comp) => comp.route = comp.route.withDepartureDate(comp.timeDateInp.date),
    (route, ref) => ref.date = route.departureDate,
    "Date of the departure", type, true)
}

export function destinationDateInput(): TimeDateInput {
  return new TimeDateInput(() => {},
    (route, ref) => {
    const destination = route.routeParts[route.routeParts.length - 1].destination;
    ref.date = destination && destination.date
    }
  ,"Date of the arrival", 'datetime',true, true)
}

export function getModifier(i: number): TimeDateInput[] {
  return [
    getRoutePartModifier(i, 'origin', 'Time of the departure'),
    getRoutePartModifier(i, 'destination', 'Time of the arrival')
  ]
}
function getRoutePartModifier(i: number, field: string, label: string) : TimeDateInput{
  return new TimeDateInput(
    (comp) => {
      const routePart = comp.route.routeParts[i];
      routePart[field].date = comp.timeDateInp.date;
      comp.route = comp.route.withRouteParts(comp.route.routeParts);
    },
    (route, ref) => ref.date = route.routeParts[i]? route.routeParts[i][field].date : null,
    label, 'datetime', true
  )

}

