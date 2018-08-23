// tslint:disable no-console jsx-no-lambda
import gql from "graphql-tag";

import * as React from "react";
import { Mutation } from "react-apollo";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

// export interface IProps {}

type LoginErrorMessage = "Credentials not recognised." | "";

export interface IState {
  email: string;
  errorMessage: LoginErrorMessage;
  loggedIn: boolean;
  password: string;
}

const logUserInMutation = gql`
  mutation logUserIn($input: InputLoginUser!) {
    logUserIn(input: $input)
  }
`;

export default class LoginForm extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: "",
      errorMessage: "",
      loggedIn: false,
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginError = this.handleLoginError.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.saveToken = this.saveToken.bind(this);
  }

  public handleSubmit(e: any, mutate: any) {
    e.preventDefault();
    const { email, password } = this.state;
    const input = { email, password };
    mutate({ variables: { input } });
  }

  public handleEmailChange(e: any) {
    this.setState({ email: e.target.value });
  }

  public handlePasswordChange(e: any) {
    this.setState({ password: e.target.value });
  }

  public handleLoginSuccess(data: any) {
    console.log(JSON.stringify(data, null, 2));
    const token = data.logUserIn;
    this.saveToken(token);
    this.setState({ loggedIn: true });
  }

  public handleLoginError(errored: any) {
    console.log(JSON.stringify(errored, null, 2));
    this.setState({ errorMessage: "Credentials not recognised." });
  }

  public render() {
    const { email, errorMessage, loggedIn, password } = this.state;
    return (
      <React.Fragment>
        {loggedIn ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Mutation
              mutation={logUserInMutation}
              onCompleted={this.handleLoginSuccess}
              onError={this.handleLoginError}
            >
              {(mutate: any, { data, error, loading }: any) => (
                <React.Fragment>
                  {loading && <p>Loading...</p>}
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      this.handleSubmit(e, mutate)
                    }
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={this.handleEmailChange}
                      value={email}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                      type="text"
                      name="password"
                      id="password"
                      onChange={this.handlePasswordChange}
                      value={password}
                    />
                    <Button
                      onClick={(e: React.MouseEvent<Button>) =>
                        this.handleSubmit(e, mutate)
                      }
                    >
                      Log in
                    </Button>
                  </form>
                </React.Fragment>
              )}
            </Mutation>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem("token", token);
  }
}
