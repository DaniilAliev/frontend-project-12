import React from "react";
import { useAuth } from "../context";

const NavBar = () => {
  const { user, logOut } = useAuth();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {user && <button onClick={logOut} type="button" className="btn btn-primary">Выйти</button>}
      </div>
    </nav>
  )
}

export default NavBar;