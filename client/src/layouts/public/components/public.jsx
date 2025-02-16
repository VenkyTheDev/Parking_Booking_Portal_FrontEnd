import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {publicRoutes} from "../../../navigation/routes";

const Public = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }, index) => (
        <Route key={index} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to = "/auth"/>} />
    </Routes>
  );
};

export default Public;
