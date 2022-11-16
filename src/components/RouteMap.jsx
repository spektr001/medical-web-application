import React from "react";
import { Route, Routes } from "react-router-dom";
import { StartPage } from "./StartPage/StartPage";
import { Dashboard } from "./Dashboard/Dashboard";

const Routemap = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Routemap;
