import * as React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";

interface IProps {
  loggedIn: boolean;
  logout: () => void;
}

const Header: React.SFC<IProps> = ({ loggedIn, logout }) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand
          style={{
            color: "black",
            fontFamily: "Roboto Condensed, sans-serif",
            fontSize: "34px",
            fontWeight: 700
          }}
        >
          Proof
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      {loggedIn ? (
        <Navbar.Collapse>
          <Nav pullRight={true}>
            <NavItem eventKey={1} href="/books">
              Books
            </NavItem>
            <NavItem eventKey={2} href="/profile">
              Profile
            </NavItem>
            <NavItem eventKey={3} onClick={logout}>
              Log out
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      ) : (
        <Nav pullRight={true}>
          <NavItem eventKey={4} href="/login">
            Log in or Register
          </NavItem>
        </Nav>
      )}
    </Navbar>
  );
};

export default Header;
