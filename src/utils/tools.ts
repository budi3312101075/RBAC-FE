import { jwtDecode } from "jwt-decode";

export const filterAccess = (children: any[]): any[] => {
  let newArray = [];
  const getToken = localStorage.getItem("user"); // Match the key used in zustand
  if (getToken === null) return [];

  const parsedToken = JSON.parse(getToken);
  const token = parsedToken?.state?.loginResponse;

  if (!token) return [];

  const { listModuleAccess }: any = jwtDecode(token);

  // Filter routes based on access
  for (let i = 0; i < listModuleAccess.length; i++) {
    const access = listModuleAccess[i];
    for (let j = 0; j < children.length; j++) {
      const child = children[j];

      if (access.moduleId === child.id && access.canRead === 1) {
        newArray.push(child);
      }

      if (child.id === "allow" && child.path !== undefined) {
        newArray.push(child);
      }
    }
  }

  return newArray;
};
