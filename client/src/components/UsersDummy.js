import React from "react";

const users = [
  { id: 1, username: "Tom" },
  { id: 2, username: "Jane" },
];

const UsersDummy = () => {
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

export default UsersDummy;
