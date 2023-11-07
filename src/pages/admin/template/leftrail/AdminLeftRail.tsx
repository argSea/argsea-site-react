import "./styles/adminleftrail.css";
import { UserContext } from "../../../../contexts/UserContext";
import { LoginContext } from "../../../../contexts/LoginContext";
import iLoginContext from "../../../../interfaces/iLoginContext";
import React from "react";
import { FaCat, FaDog, FaHorse } from "react-icons/fa";
import LeftRailNavItem from "./LeftRailNavItem";
import { useNavigate } from "react-router-dom";

const AdminLeftRail = () => {
  const navi = useNavigate();
  const { user } = React.useContext(UserContext) as { user: any };
  const { regUser } = React.useContext(LoginContext) as {
    regUser: iLoginContext;
  };

  return (
    <div id="admin-left-rail">
      <div id="admin-left-rail-header">
        <div id="admin-left-rail-header-title">.admin</div>
        <div id="admin-left-rail-header-user">
          <div id="admin-left-rail-header-user-icon">
            <img src="/avatar.jpg" alt="avatar" />
          </div>
          <div id="admin-left-rail-header-user-name">Welcome, {regUser.userName}</div>
        </div>
      </div>
      <div id="admin-left-rail-content">
        <nav id="admin-left-rail-nav">
          <LeftRailNavItem
            icon={<FaCat size={50} />}
            text=".dashboard"
            onClick={() => {
              navi("/admin");
            }}
          />
          <LeftRailNavItem
            icon={<FaHorse size={50} />}
            text=".me"
            onClick={() => {
              navi("/admin/me");
            }}
          />
          <LeftRailNavItem
            icon={<FaDog size={50} />}
            text=".projects"
            onClick={() => {
              navi("/admin/projects");
            }}
          />
        </nav>
      </div>
    </div>
  );
};

export default AdminLeftRail;
