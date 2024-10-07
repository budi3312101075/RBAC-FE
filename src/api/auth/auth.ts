import axios from "axios";
import { IFormInputLogin } from "../../interface/auth";
import { NavigateFunction } from "react-router-dom";

export const handleLoginSubmit = async (
  data: IFormInputLogin,
  setLoginResponse: (token: string) => void,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.post("/login", data);
    if (response.status === 200) {
      setLoginResponse(response.data.token);
      navigate("/");
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const handleLogoutSubmit = async (
  setLogOut: () => void,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.get("/logout");
    if (response.status === 200) {
      setLogOut();
      navigate("/");
      console.log("Logout success");
    } else {
      console.log("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};
