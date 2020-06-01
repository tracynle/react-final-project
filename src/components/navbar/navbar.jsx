/* eslint-disable */
import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import {
  Container,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink
} from "reactstrap";

const NavBar = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  /*--------------------------------------------------------------------------------*/
  /*To open NAVBAR in MOBILE VIEW                                                   */
  /*--------------------------------------------------------------------------------*/

  return (
    <div className="header1 po-relative bg-light">
      <Container>
        <Navbar className="navbar-expand-lg h1-nav">
          <NavbarToggler onClick={toggle}>
            <span className="ti-menu"></span>
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar id="header1">
            <Nav navbar className="ml-auto mt-2 mt-lg-0">
              <NavItem className="active">
                <Link className="nav-link" href="/" to={"/"}>
                  Home
                </Link>
              </NavItem>
              {isAuthenticated ? (
                <>
                  <NavItem>
                    <Link href="/new" to={"/new"} className="nav-link">
                      New Post
                    </Link>
                  </NavItem>

                  <NavItem>
                    <Link
                      onClick={e => {
                        e.preventDefault();
                        onLogout();
                      }}
                      className="nav-link"
                      href="/logout"
                      to={"/logout"}
                    >
                      Logout
                    </Link>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <Link className="nav-link" href="/login" to={"/login"}>
                    Login
                  </Link>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
};
export default NavBar;
