import { TimeDateInput } from "./time-date-input";

export function routeDateInput(ref): TimeDateInput {
  return new TimeDateInput(date => {
    ref.date = date
  },"Date of the trip", true)
}
export function originDateInput(): TimeDateInput {
  return new TimeDateInput((date, snaps) => {
    snaps[0].date = date
  },"Date of the departure", true, 'datetime')
}

export function destinationDateInput(): TimeDateInput {
  return new TimeDateInput((date, snaps) => {
    snaps[snaps.length - 1].date = date
  },"Date of the arrival", true, 'datetime')
}

