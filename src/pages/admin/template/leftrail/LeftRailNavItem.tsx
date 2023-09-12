import React from "react";

const LeftRailNavItem = ({ icon, text, onClick }: any) => {
  return (
    <div className="admin-left-rail-nav-item" onClick={onClick}>
      <div className="admin-left-rail-nav-item-icon">{icon}</div>
      <span className="admin-left-rail-nav-item-text">{text}</span>
    </div>
  );
};

export default LeftRailNavItem;
