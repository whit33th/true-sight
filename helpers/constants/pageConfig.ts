class PageConfig {
  home = "/";
  stats = "/stats";
  signIn = "/sign-in";
  signUp = "/sign-up";
  profile = "/profile";
}

export const pageConfig = new PageConfig();

export const sidebarRoutes = [
  {
    name: "Stats",
    href: pageConfig.stats,
  },
];
