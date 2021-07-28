import React, { useEffect, useState } from "react";
import axios from "axios";

const USERS_API = `${process.env.REACT_APP_API_URL}/api/users`;

const UsersApi = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(USERS_API).then((response) => setUsers(response.data));
  }, []);

  return (
    <div>
      <h3>Users:</h3>
      <ul>
        {users &&
          users.map((user) => {
            return <li key={user.id}>{user.username}</li>;
          })}
      </ul>
    </div>
  );
};

export default UsersApi;
