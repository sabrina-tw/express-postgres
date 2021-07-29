import { useState, useEffect } from "react";

const tempUser = { username: "sabrina" };

export const useCurrentUserHook = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // TODO: axios call here to get currently logged in user
    setCurrentUser(tempUser);
  }, []);

  return {
    currentUser,
    setCurrentUser,
  };
};
