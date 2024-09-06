import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NavLayout from "../components/common/NavLayout";
import ShowToDo from "../pages/ShowToDo";

function AppRoutes() {
  return (
    <Routes>
      {/* Home Section with NavLayout */}
      <Route path="/" element={<NavLayout />}>
        <Route index element={< Home />} />
        <Route path="show-todos" element={< ShowToDo />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
