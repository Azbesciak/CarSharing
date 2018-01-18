import { TimeDateInput } from "./time-date-input";

export function originDateInput(future: boolean = false, type: string = 'datetime'): TimeDateInput {
  return new TimeDateInput(
    (comp) => comp.route = comp.route.withDepartureDate(comp.timeDateInp.date),
    (route, ref) => ref.date = route.departureDate,
    "Departure after", type, false, false, getMinDate(future))
}

export function destinationDateInput(future: boolean = false): TimeDateInput {
  return new TimeDateInput(() => {},
    (route, ref) => {
    const destination = route.routeParts[route.routeParts.length - 1].destination;
    ref.date = destination && destination.date
    }
  ,"Date of the arrival", 'datetime',true, true, getMinDate(future))
}

export function getModifier(i: number, future: boolean = false): TimeDateInput[] {
  return [
    getRoutePartModifier(i, 'origin', 'Time of the departure', future),
    getRoutePartModifier(i, 'destination', 'Time of the arrival', future)
  ]
}
function getRoutePartModifier(i: number, field: string, label: string, future: boolean) : TimeDateInput{
  return new TimeDateInput(
    (comp) => {
      const routePart = comp.route.routeParts[i];
      routePart[field].date = comp.timeDateInp.date;
      comp.route = comp.route.withRouteParts(comp.route.routeParts);
    },
    (route, ref) => ref.date = route.routeParts[i]? route.routeParts[i][field].date : null,
    label, 'datetime', true, false, getMinDate(future)
  )
}

function getMinDate(future: boolean) {
  return future ? new Date() : null
}
