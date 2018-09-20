/**
 * Generic Auth component that will check if a user is logged in,
 * and if so render this.props.children,
 * if not it will redirect to /login
 */
import * as React from "react";
import { Redirect } from "react-router-dom";
import { isLoggedIn } from "../auth";

interface IAuthProps {
  children: React.ReactNode;
}

export default class Auth extends React.Component<IAuthProps, any> {
  public render() {
    return (
      <React.Fragment>
        {isLoggedIn() ? this.props.children : <Redirect to="/login" />}
      </React.Fragment>
    );
  }
}
