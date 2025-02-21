export class StorageConstants {
  static readonly isIntroPageVisited = "is-intro-page-visited";
  static readonly token = "token";
}

export class RouteConstants {
  static readonly home = "home";
  static readonly homeRelative = `/${RouteConstants.home}`;

  static readonly payments = "payments";
  static readonly paymentsRelative = `/${RouteConstants.payments}`;

  static readonly profile = "profile";
  static readonly profileRelative = `/${RouteConstants.profile}`;

  static readonly login = "login";
  static readonly loginRelative = `/${RouteConstants.login}`;

  static readonly register = "register";
  static readonly registerRelative = `/${RouteConstants.register}`;

  static readonly welcome = "welcome";
  static readonly welcomeRelative = `/${RouteConstants.welcome}`;

  static readonly intro = "intro";
  static readonly introRelative = `/${RouteConstants.intro}`;

  static readonly circle = "circle";
  static readonly circleRelative = `/${RouteConstants.circle}`;
  static readonly circleCreateRelative = `/${RouteConstants.circle}/create`;
  static readonly circleEditRelative = `/${RouteConstants.circle}/edit`;
  static readonly circleCongratulationsRelative = `/${RouteConstants.circle}/congratulations`;
  static readonly circleDetailsRelative = `/${RouteConstants.circle}/details`;

  static readonly wildcard = `**`;
}
