import React from "react";
import Sidebar from "./Sidebar";
import { Avatar } from "@mui/material";
import LetteredAvatar from 'react-lettered-avatar';
export default function AllUsers({ users }) {
  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <div className="main">
          <p>
            <h1>All Users</h1>
          </p>
          <div className="main-container">
            <div className="questions-2">
              {users && users.length !== 0 && (
                <>
                  {users.map((user) => (
                    <span key={generateUniqueId()} className="question-tags-3">
                      <LetteredAvatar name={user.displayName[0]} backgroundColor="#f48024"/>
                      <p>{user.displayName}</p>
                      <p>{user.email}</p>
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
