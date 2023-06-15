// CustomRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import Success from "./Success";

const CustomRoutes = () => {
  return <Route path="/success" element={<Success />} />;
};

export default CustomRoutes;
