import React, { useState, createContext } from "react";



export const Login = createContext();

const isLogin = localStorage.getItem("isLogin");

export const LoginProvider = (props) => {
  const [login, setLogin] = useState(isLogin);

  return (
    <Login.Provider value={{ login, setLogin }}>
      {props.children}
    </Login.Provider>
  );
};
