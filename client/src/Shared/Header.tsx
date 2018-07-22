import * as React from "react";
import { Navbar } from "react-bootstrap";

const Header: React.SFC<{}> = () => {
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
      </Navbar.Header>
    </Navbar>
  );
};

export default Header;
