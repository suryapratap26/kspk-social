import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
const Sidebar = ({ isOpen, onClose }) =>  {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside
      className={`
        fixed lg:sticky top-0 left-0 z-40
        w-64 h-screen
        bg-base-200 border-r border-base-300
        flex flex-col
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
        
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider" >
            KSPK Social
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          onClick={onClose}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 opacity-70" />
          Home
        </Link>

        <Link
          to="/friends"
          onClick={onClose}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 opacity-70" />
          Friends
        </Link>

        <Link
          to="/notifications"
          onClick={onClose}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 opacity-70" />
          Notifications
        </Link>
      </nav>

      {/* USER PROFILE */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic || "/avatar.png"} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
