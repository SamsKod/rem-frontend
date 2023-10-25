import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import Avatar from "./Avatar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";



const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addNotesIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/notes/create"
    >
      <i className="fa-regular fa-note-sticky"></i>Add notes
    </NavLink>
  );
  const loggedInIcons = (
    <>
      {/*<NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/pins"
      >
        <i className="fa-solid fa-thumbtack"></i>Pins
      </NavLink>*/}
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Logout
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} />
      </NavLink>
    </>
  );
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
      expanded={expanded}
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
        {currentUser && addNotesIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-solid fa-hashtag"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;