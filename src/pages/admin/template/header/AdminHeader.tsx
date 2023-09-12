import "./styles/adminheader.css";
import React from "react";
import { LoginContext } from "../../../../contexts/LoginContext";
import iLoginContext from "../../../../interfaces/iLoginContext";

const AdminHeader = () => {
  const { regUser } = React.useContext(LoginContext) as {
    regUser: iLoginContext;
  };

  function checkLogin() {
    // check if user is logged in
    if (regUser.loggedIn) {
      return "Welcome, " + regUser.userName;
    } else {
      return "";
    }
  }

  return (
    <header id="admin-header">
      <nav id="main-nav">
        <div id="navBar">
          <div className="navItem logout">
            <a href="/">.logout</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
