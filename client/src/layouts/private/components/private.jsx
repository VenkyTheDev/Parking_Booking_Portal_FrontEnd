import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {privateRoutes} from "../../../navigation/routes";

const Private = () => {
  return (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {/* Default Route (Redirects to first private route if no match) */}
      <Route path="*" element={<Navigate to = "/home"/>} />
    </Routes>
  );
};

export default Private;
