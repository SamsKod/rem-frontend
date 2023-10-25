import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {

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