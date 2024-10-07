import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { TbBrandReact } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { handleLogoutSubmit } from "../api/auth/auth";
import { useAuth } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import { route } from "../routes/listRoutes";
import { AllowedMenuItems, DecodedToken } from "../interface/auth";

const Sidebar = () => {
  const { setLogOut, loginResponse } = useAuth();
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false); // For Management Programs
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false); // For User Management

  const toggleDropdown1 = () => setIsDropdownOpen1(!isDropdownOpen1);
  const toggleDropdown2 = () => setIsDropdownOpen2(!isDropdownOpen2);

  const toggleNav = () => setNav(!nav);

  const logout = () => handleLogoutSubmit(setLogOut, navigate);

  let allowedMenuItems: AllowedMenuItems = {
    managementPrograms: [],
    userManagement: [],
  }; // Initial empty state

  if (loginResponse) {
    const decodedToken: DecodedToken = jwtDecode(loginResponse);

    // Management Programs (Permissions, Roles, Team)
    allowedMenuItems.managementPrograms = route.filter((r) =>
      decodedToken?.listModuleAccess?.some(
        (module) =>
          module.moduleId === r.id &&
          module.canRead === 1 &&
          (r.name === "Permissions" || r.name === "Roles")
      )
    );

    //  User Management (Users)
    allowedMenuItems.userManagement = route.filter((r) =>
      decodedToken?.listModuleAccess?.some(
        (module) =>
          module.moduleId === r.id &&
          module.canRead === 1 &&
          (r.name === "Team" || r.name === "Users")
      )
    );
  }

  return (
    <>
      <div className="bg-gray-900 h-14 w-full absolute pl-[calc(100%-80rem)]">
        <div className="flex justify-between px-5 items-center text-white mt-4">
          <div className="flex items-center lg:hidden ">
            <TbBrandReact size={20} />
            <span className="text-lg font-semibold">Sidebar RBAC</span>
          </div>
          {nav ? (
            <IoMdClose size={20} onClick={toggleNav} className="lg:hidden" />
          ) : (
            <RxHamburgerMenu
              size={20}
              onClick={toggleNav}
              className="lg:hidden"
            />
          )}
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-60 min-h-screen bg-gray-900 text-white p-4 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${nav ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex gap-2 items-center">
          <TbBrandReact size={40} />
          <span className="text-xl font-semibold">Sidebar RBAC</span>
        </div>
        <div className="flex flex-col gap-2 mb-4 mt-9">
          <p className="text-xs">Main Page</p>
          <span className="flex items-center gap-2">
            <RxDashboard size={20} />
            <Link to="/">Dashboard</Link>
          </span>
        </div>

        <span className="h-[1px] w-full flex rounded-full bg-slate-600" />

        {/* Management Programs Section */}
        <div className="flex flex-col gap-2 my-4">
          <div
            onClick={toggleDropdown1}
            className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 rounded px-2"
          >
            <h1 className="text-sm">Management Programs</h1>
            {isDropdownOpen1 ? (
              <MdExpandLess size={20} />
            ) : (
              <MdExpandMore size={20} />
            )}
          </div>

          {isDropdownOpen1 && (
            <div className="pl-4 flex flex-col gap-2 transition-all duration-300 ease-in-out">
              {allowedMenuItems.managementPrograms?.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="hover:bg-gray-700 rounded py-2 px-2 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* User Management Section */}
        <div className="flex flex-col gap-2 my-4">
          <div
            onClick={toggleDropdown2}
            className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 rounded px-2"
          >
            <h1 className="text-sm">User Management</h1>
            {isDropdownOpen2 ? (
              <MdExpandLess size={20} />
            ) : (
              <MdExpandMore size={20} />
            )}
          </div>

          {isDropdownOpen2 && (
            <div className="pl-4 flex flex-col gap-2 transition-all duration-300 ease-in-out">
              {allowedMenuItems.userManagement?.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="hover:bg-gray-700 rounded py-2 px-2 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-5">
          <button
            className="bg-red-500 text-white px-5 py-1 rounded-lg"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="fixed lg:left-60 top-14 min-h-screen w-full p-4 bg-[#fafafc]">
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
