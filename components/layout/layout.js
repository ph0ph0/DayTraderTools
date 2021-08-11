import React from "react";

import NavBar from "../navbar/navbar.js";
const Layout = ({ children }) => (
  <div>
    <NavBar></NavBar>
    {children}
  </div>
);

Layout.displayName = "Layout";
export default Layout;
