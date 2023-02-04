import React from "react";
import { Link } from "react-router-dom";
import { Public } from "@mui/icons-material";
import "./css/Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <p style={{ cursor: "pointer" }}>Home</p>
          </div>
          <div className="sidebar-option">
            <p style={{ cursor: "pointer" }}>PUBLIC</p>
            <div className="link">
              <div className="link-tag">
                <Public />
                <Link to="/">
                  <p style={{ cursor: "pointer" }}>Question</p>
                </Link>
              </div>
              <div className="tags">
                <Link to="/tags">
                  <p style={{ cursor: "pointer" }}>Tags</p>
                </Link>
                <Link to="/users">
                  <p style={{ cursor: "pointer" }}>Users</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
