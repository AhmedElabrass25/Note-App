"use client";
const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext(0);
function UserContextProvider({ children }) {
  let [token, setToken] = useState("");
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);
  return (
    <UserContext.Provider value={{ setToken, token }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
