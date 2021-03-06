export class RoutingConstants {

  static HOME_PAGE = "";
  static REGISTER_PAGE = 'register';
  static LOGIN_PAGE = 'login';
  static PROFILE_PATH = "profile";
  static PROFILE_MODIFICATION_PAGE = "modification";
  static PROFILE_MODIFICATION_BASIC_PAGE = "basic";
  static PROFILE_MODIFICATION_CARS_PAGE = "cars";
  static PROFILE_MODIFICATION_PHOTOS_PAGE = "photos";
  static ROUTES_SEARCH_PATH = 'search';
  static ADD_ROUTE_PATH = "addRoute";
  static ROUTES_PATH = "routes";

  static getProfileModificationPage() {
    return this.getProfileSubPage(this.PROFILE_MODIFICATION_PAGE);
  }

  static getBasicModifPage(): string {
    return this.getProfileModifSubPage(this.PROFILE_MODIFICATION_BASIC_PAGE)
  }

  static getAddCarsPage(): string {
    return this.getProfileModifSubPage(this.PROFILE_MODIFICATION_CARS_PAGE)
  }

  static getAddPhotoPage(): string {
    return this.getProfileModifSubPage(this.PROFILE_MODIFICATION_PHOTOS_PAGE)
  }

  static getProfileModifSubPage(sub: string): string {
    return `${this.getProfileModificationPage()}/${sub}`
  }

  static getProfileSubPage(sub: string) {
    return `${this.getProfilePage()}/${sub}`
  }

  static getProfilePage() {
    return `/${this.PROFILE_PATH}`
  }

}
