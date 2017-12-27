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
    const totalTime = route.durations.reduce((a, b) => a + b, 0);
    ref.date = route.departureDate ? new Date(route.departureDate.getTime() + totalTime) : undefined;
    }
    // snaps[snaps.length - 1].date = date
  ,"Date of the arrival", 'datetime',true, true)
}

