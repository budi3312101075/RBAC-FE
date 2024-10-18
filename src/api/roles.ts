import axios from "axios";
import { IRole } from "../interface/roles";

export const getRoles = async (): Promise<IRole[]> => {
  try {
    const response = await axios.get("/roles");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};
