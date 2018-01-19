import { LocationInput } from "./location-input";

export function originInput(required: boolean = true): LocationInput {
  return new LocationInput("Origin",
    (loc, locs) => {
      locs[0] = loc
    },
    (route, inp) => {
      inp.value = route.origin ? route.origin.label : undefined
    },
    required,
    (loc, locs) => locs[0] = loc);
}

export function destInput(required: boolean = true): LocationInput {
  return new LocationInput("Destination", (loc, locs) => {
    locs[locs.length - 1] = loc
  }, (route, inp) => {
    inp.value = route.destination ? route.destination.label : undefined
  }, required,
    (loc, locs) => locs[locs.length - 1] = loc)
}


export function wayPointInput(): LocationInput {
  return new LocationInput("Way Point", (loc, locs, ref) => {
    ref.value = undefined;
    return locs.splice(locs.length - 1, 0, loc)
  })
}


