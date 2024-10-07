import { RouteType } from "../interface/auth";
import Dashboard from "../pages/dashboard";
import Permissions from "../pages/permissions";
import Team from "../pages/team";
import Roles from "../pages/roles";
import Users from "../pages/users";

export const route: RouteType[] = [
  {
    id: "allow",
    name: "Dashboard",
    path: "/dashboard",
    element: <Dashboard />,
  },
  // module acces routes
  {
    id: "06995435-b0c0-42d1-9a76-730a0d9575ce",
    name: "Permissions",
    path: "/permissions",
    element: <Permissions />,
  },
  {
    id: "06995435-b0c0-42d1-9a76-euri37e6531",
    name: "Team",
    path: "/team",
    element: <Team />,
  },
  {
    id: "06995435-b0c0-42d1-9a76-hgjdue738409",
    name: "Roles",
    path: "/roles",
    element: <Roles />,
  },
  {
    id: "06995435-b0c0-42d1-9a76-ksjdilawdi3",
    name: "Users",
    path: "/users",
    element: <Users />,
  },
];
