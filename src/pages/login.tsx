import { useForm } from "react-hook-form";
import { IFormInputLogin } from "../interface/auth";
import { FaUser } from "react-icons/fa";
import { TbPassword } from "react-icons/tb";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { handleLoginSubmit } from "../api/auth/auth";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm<IFormInputLogin>();
  const [showPassword, setShowPassword] = useState(false);
  const { setLoginResponse } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: IFormInputLogin) => {
    handleLoginSubmit(data, setLoginResponse, navigate);
  };

  return (
    <>
      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-900">
        <div className="flex">
          <div className="w-full max-w-md bg-gray-800 shadow-xl flex flex-col items-center mx-auto py-12 px-10 my-auto rounded-2xl">
            <h2 className="text-3xl font-bold tracking-wide text-white mb-8">
              Welcome Back
            </h2>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 w-full"
            >
              <div className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <FaUser size={20} />
                <input
                  type="text"
                  className="w-full bg-transparent border-none placeholder-gray-400 focus:outline-none px-2"
                  {...register("username", {
                    required: true,
                    maxLength: 75,
                    pattern: /^[A-Za-z0-9]+$/i,
                  })}
                  placeholder="Enter your username"
                />
              </div>

              <div className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <TbPassword size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="w-full bg-transparent border-none placeholder-gray-400 focus:outline-none px-2"
                />
                {showPassword ? (
                  <AiFillEyeInvisible
                    size={20}
                    className="cursor-pointer text-gray-400"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <IoEyeSharp
                    size={20}
                    className="cursor-pointer text-gray-400"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300">
                Login
              </button>
            </form>
          </div>
        </div>

        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover hidden md:block"
        >
          <source src="./hero.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default Login;
