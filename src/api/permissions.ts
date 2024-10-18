import axios from "axios";

// Fungsi untuk mengambil permissions dari API
export const getPermissions = async (roleId: string) => {
  try {
    const response = await axios.get(`/permissions/${roleId}`);
    return response.data.data;
  } catch (err) {
    console.error("Error fetching permissions:", err);
    throw err;
  }
};

export const updatePermissions = async (roleId: string, permissions: any[]) => {
  try {
    const payload = {
      listModules: permissions.flatMap((category) =>
        category.listModules.map((module: any) => ({
          id: module.id,
          canRead: module.canRead,
          canCreate: module.canCreate,
          canUpdate: module.canUpdate,
          canDelete: module.canDelete,
        }))
      ),
    };

    const response = await axios.patch(`/permissions/${roleId}`, payload);
    return response.data;
  } catch (err) {
    console.error("Error updating permissions:", err);
    throw err;
  }
};
