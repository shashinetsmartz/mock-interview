import last from "lodash/last";
import capitalize from "lodash/capitalize";

import system from "settings/system";
import routes from "router/routes";

const { title: systemTitle } = system;

const allRoutes = Object.keys(routes.app);

const PAGE_TITLE = new Map([
  // override any existing route here
  [routes.app.home, "Home"],
  [routes.app.interviewQues, "Interview Questions"],
  // [routes.app.changePwd, "Change Password"],
  ["default", "Error"],
]);

export const getPageTitle = (page) => {
  let title = PAGE_TITLE.get(page);

  if (!title) {
    const url = last(page.split("/"));
    title = allRoutes.includes(url) ? capitalize(url) : PAGE_TITLE.get("default");
  }

  return `${systemTitle} | ${title}`;
};
