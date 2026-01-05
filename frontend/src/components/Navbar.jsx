import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  LogOutIcon,
  ShipWheelIcon,
  MenuIcon,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = ({ showSidebar, onMenuClick }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center w-full gap-3">

          {/* HAMBURGER — MOBILE ONLY */}
          {showSidebar && (
            <button
              onClick={onMenuClick}
              className="lg:hidden btn btn-ghost btn-circle"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          )}

          {/* LOGO — ONLY IN CHAT PAGE */}
          {isChatPage && (
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-8 text-primary" />
              <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                KSPK Social
              </span>
            </Link>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 opacity-70" />
              </button>
            </Link>

            <ThemeSelector />

            <div className="avatar">
              <div className="w-9 rounded-full">
                <img
                  src={authUser?.profilePic || "/avatar.png"}
                  alt="User Avatar"
                />
              </div>
            </div>

            <button
              className="btn btn-ghost btn-circle"
              onClick={logoutMutation}
            >
              <LogOutIcon className="h-6 w-6 opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
