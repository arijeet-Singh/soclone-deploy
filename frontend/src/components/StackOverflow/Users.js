import React, { useEffect } from "react";
import useHttp from "./use-http";
import { getAllUsers } from "./api";
import AllUsers from "./AllUsers";
export default function Users() {
  const { sendRequest, data: loadedUsers } = useHttp(getAllUsers, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  return (
    <div>
      <AllUsers users={loadedUsers} />
    </div>
  );
}
