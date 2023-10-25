import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();


      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/notes/create"
      >
        <i className="fa-regular fa-note-sticky"></i>Add notes
      </NavLink>

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/login"
      >
        <i className="fa-solid fa-right-to-bracket"></i>Login
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );
  

  return (
    <Navbar
      className={`${styles.NavBar} navbar-dark`}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img className={styles.Logo} src={logo} alt="logo"/>
            REM
          </Navbar.Brand>
        </NavLink>
      </Container>
    </Navbar> 
  );
};

export default NavBar;