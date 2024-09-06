import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const NavLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-400">
        <NavBar />
        <div className="flex-grow overflow-y-auto">
          <Outlet />
        </div>
        {/* Footer */}
        <footer className="m-5 text-center text-sm  text-black/60">
          © 2024 Nested To-Do List. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default NavLayout;
