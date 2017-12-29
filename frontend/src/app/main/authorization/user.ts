import {Car} from "../../functional/route/car";

export class User {
  constructor(public login: string = null,
              public password: string = null,
              public email: string = null) {
  }
}


export class AppUser {
  constructor(public user: User = null,
              public lastName: string = null,
              public firstName: String = null,
              public dateOfBirth: Date = null,
              public phoneNumber: string = null,
              public userPhoto: string = null,
              public cars: Car[] = [],
              public photos: any[] = []) {
  }

  static copy(u: AppUser) {
    return u ? new AppUser(
      u.user, u.lastName, u.firstName,
      u.dateOfBirth, u.phoneNumber, u.userPhoto,
      u.cars.slice(), u.photos.slice()) : u
  }
}
