import { LocationInput } from "./location-input";

export function originInput(): LocationInput {
  return new LocationInput("Origin",
    (snap, snaps) => {
      snaps[0] = snap
    },
    (route, inp) => {
      inp.value = route.origin && route.origin.location ? route.origin.location.label : undefined
    },
    true,
    (loc, locs) => locs[0] = loc);
}

export function destInput(): LocationInput {
  return new LocationInput("Destination", (snap, snaps) => {
    snaps[snaps.length - 1] = snap
  }, (route, inp) => {
    inp.value = route.destination && route.destination.location ? route.destination.location.label : undefined
  }, true,
    (loc, locs) => locs[locs.length - 1] = loc)
}


export function wayPointInput(): LocationInput {
  return new LocationInput("Way Point", (loc, locs, ref) => {
    ref.value = undefined;
    return locs.splice(locs.length - 1, 0, loc)
  })
}


