import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex">

        {/* SIDEBAR */}
        {showSidebar && (
         <Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>
        )}

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col">

          {/* NAVBAR */}
          <Navbar
            showSidebar={showSidebar}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
