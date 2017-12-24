export class Location {
  constructor(
    public longitude: number = null,
    public latitude: number = null,
    public label: string = null,
    public country: string = null,
    public administrative_area_level_1: string = null,
    public administrative_area_level_2: string = null,
    public locality: string = null,
    public route: string = null
    ) {}
  equals(loc: Location) {
    return this.latitude == loc.latitude && this.longitude == loc.longitude
  }

  static from(place: google.maps.places.PlaceResult, label: string = place.formatted_address): Location {
    if (place.geometry) {
      const loc = new Location();
      this.resetFields(loc);
      loc.latitude = place.geometry.location.lat();
      loc.longitude = place.geometry.location.lng();
      this.fillLocationDetails(place, loc);
      loc.label = label;
      return loc;
    } else {
      return null;
    }
  }

  private static resetFields(loc: Location) {
    Object.keys(loc).forEach(k => loc[k] = null);
  }

  private static fillLocationDetails(place: google.maps.places.PlaceResult, loc: Location) {
    if (place.address_components) {

      Object.keys(loc).forEach(k => {
        if (loc[k]) return;
        let pl = place.address_components.find(s => !!s.types.find(t => t == k));
        loc[k] = pl ? pl.short_name : null;
      })
    }
  }

  static copy(original: Location): Location {
    if (!original) return original;
    const loc = new Location();
    Object.keys(original).forEach(k => loc[k] = original[k]);
    return loc;
  }

  static copyAll(original: Location[]): Location[] {
    return original.slice().map(x => Location.copy(x));
  }
}
