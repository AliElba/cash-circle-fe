export class StorageConstants {
  static readonly isIntroPageVisited = "is-intro-page-visited";
  static readonly token = "token";
}

export class RouteConstants {
  static readonly home = "home";
  static readonly homeRelative = `/${RouteConstants.home}`;

  static readonly myCircles = "myCircles";
  static readonly myCirclesRelative = `/${RouteConstants.myCircles}`;

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

  static readonly wildcard = `**`;
}
