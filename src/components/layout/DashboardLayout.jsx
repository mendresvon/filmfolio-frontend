// src/components/layout/DashboardLayout.jsx
import React from "react";
import Header from "./Header/Header";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DashboardLayout;
