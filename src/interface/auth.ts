import { ReactNode } from "react";

export interface IFormInputLogin {
  data: any;
  username: string;
  password: string;
}

export interface ModuleAccess {
  moduleId: string;
  canRead: number;
  canCreate: number;
  canUpdate: number;
  canDelete: number;
}

export interface DecodedToken {
  id: string;
  username: string;
  name: string;
  listModuleAccess: ModuleAccess[];
  iat: number;
  exp: number;
}

export interface AllowedMenuItems {
  managementPrograms: RouteType[];
  userManagement: RouteType[];
}

export interface RouteType {
  id: string;
  name: string;
  path: string;
  element: ReactNode;
}
