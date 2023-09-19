import React, { useEffect } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import iLoginContext from "../../interfaces/iLoginContext";
import "./styles/admin.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminHeader from "./template/header/AdminHeader";
import AdminLeftRail from "./template/leftrail/AdminLeftRail";
import Me from "./pages/Me";

function Admin() {
  const navi = useNavigate();
  const { regUser } = React.useContext(LoginContext) as {
    regUser: iLoginContext;
  };

  // check if user is logged in, if not, redirect to login page
  useEffect(() => {
    if (!regUser.loggedIn) {
      navi("/login");
    }
  }, [regUser.loggedIn]);

  // show nothing if user is not logged in
  if (!regUser.loggedIn) {
    return <></>;
  }

  return (
    <>
      <section id="admin">
        <div id="admin-content">
          <AdminHeader />
          <div id="admin-inner-wrap">
            <div id="admin-details">
              <Routes>
                <Route path="" element={<div>Dashboard</div>} />
                <Route path="me" element={<Me />} />
                <Route path="posts" element={<div>Posts</div>} />
                <Route path="comments" element={<div>Comments</div>} />
                <Route path="categories" element={<div>Categories</div>} />
                <Route path="tags" element={<div>Tags</div>} />
              </Routes>
            </div>
          </div>
        </div>
        <AdminLeftRail />
      </section>
    </>
  );
}

export default Admin;
