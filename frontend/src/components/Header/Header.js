import React from "react";
import "./css/Header.css";
import { Link, useHistory } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";
import { auth } from "../../firebase";
import Search from "../Search/Search";
const Header = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  return (
    <div>
      <header>
        <div className="header-container">
          <div className="header-left">
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png"
                alt="logo"
                className="so-logo"
              />
            </Link>
          </div>
          {/* <div className="header-middle">
            <span className="avatar-img">
              <Avatar src={user?.photo} sx={{ width: 45, height: 45 }} />
            </span>
          </div> */}
          <div className="header-right">
            <div className="header-right-container">
              <span
                onClick={() => {
                  auth.signOut();
                  localStorage.clear();
                  history.push("/auth");
                }}
              >
                <button>Log Out</button>
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
