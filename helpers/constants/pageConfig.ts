class PageConfig {
  home = "/";
  stats = "/stats";
  signInPage = "/sign-in";
  signUpPage = "/sign-up";
}

export const pageConfig = new PageConfig();

export const sidebarRoutes = [
  {
    name: "Stats",
    href: pageConfig.stats,
  },
];
