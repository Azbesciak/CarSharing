export class User {
  constructor(public login: string = null,
              public password: string = null,
              public email: string = null) {
  }
}


export class AppUser{
  constructor(public user: User = null,
              public lastName: string = null,
              public firstName: String = null,
              public dateOfBirth: Date = null,
              public phoneNumber: string = null,
              public userPhoto: string = null
              ){}
}
