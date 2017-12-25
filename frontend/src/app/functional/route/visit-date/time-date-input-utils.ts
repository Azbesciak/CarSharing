import { TimeDateInput } from "./time-date-input";

export function routeDateInput(ref): TimeDateInput {
  return new TimeDateInput(date => {
    console.log(ref);
    ref.date = date
  },"Date of the trip"
    )
}
