import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TbBrandReact } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const submenuItems = [
  { name: "Submenu 1", path: "/page1" },
  { name: "Submenu 2", path: "/page2" },
  { name: "Submenu 2", path: "/page2" },
  { name: "Submenu 2", path: "/page2" },
  { name: "Submenu 3", path: "/page3" },
];

const Sidebar = () => {
  const [nav, setNav] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <div className="bg-[#161618] h-14 w-full absolute pl-[calc(100%-80rem)] ">
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
        className={`fixed top-0 left-0 w-60 min-h-screen bg-[#161618] text-white p-4 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0
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
        <div className="flex flex-col gap-2 my-4">
          <div
            onClick={toggleDropdown}
            className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 rounded px-2"
          >
            <h1 className="text-sm">Management Programs</h1>
            {isDropdownOpen ? (
              <MdExpandLess size={20} />
            ) : (
              <MdExpandMore size={20} />
            )}
          </div>

          {isDropdownOpen && (
            <div className="pl-4 flex flex-col gap-2 transition-all duration-300 ease-in-out">
              {submenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="hover:bg-gray-700 rounded py-2 px-2 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fixed lg:left-60 top-14 min-h-screen w-full p-4 bg-[#fafafc]">
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
