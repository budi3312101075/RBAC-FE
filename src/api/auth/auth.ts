import { IFormInputLogin } from "../../interface/auth";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

// Terima setLoginResponse dan navigate sebagai argumen
export const handleLoginSubmit = async (
  data: IFormInputLogin,
  setLoginResponse: (token: string) => void,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.post("/login", data);
    if (response.status === 200) {
      setLoginResponse(response.data.token);
      navigate("/dashboard");
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
