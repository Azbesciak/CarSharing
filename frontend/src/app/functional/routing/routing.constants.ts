export class RoutingConstants {

  static HOME_PAGE = "";
  static REGISTER_PAGE = 'register';
  static LOGIN_PAGE = 'login';
  static PROFILE_PATH = "profile";
  static PROFILE_COMPLETION_PAGE = "completion";

  static getProfileCompletionPage() {
    return this.getProfileSubpage(this.PROFILE_COMPLETION_PAGE);
  }

  static getProfileSubpage(subpage: string) {
    return `${this.getProfilePage()}/${subpage}`
  }

  static getProfilePage() {
    return `/${this.PROFILE_PATH}`
  }

}
