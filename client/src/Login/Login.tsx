// tslint:disable no-console jsx-no-lambda
import gql from "graphql-tag";

import * as React from "react";
import { Mutation } from "react-apollo";
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Tab,
  Tabs
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

// export interface IProps {}

type LoginErrorMessage =
  | "Credentials not recognised."
  | "An account has been registered to that email address"
  | "";

interface IProps {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export interface IState {
  email: string;
  errorMessage: LoginErrorMessage;
  givenName?: string;
  password: string;
  registerFormType: boolean;
  surname?: string;
}

const LOG_IN = gql`
  mutation logUserIn($input: InputLoginUser!) {
    logUserIn(input: $input)
  }
`;

const CREATE_USER = gql`
  mutation createUser(
    $givenName: String
    $surname: String
    $email: String!
    $password: String!
  ) {
    createUser(
      givenName: $givenName
      surname: $surname
      email: $email
      password: $password
    )
  }
`;

export default class LoginForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      errorMessage: "",
      givenName: "",
      password: "",
      registerFormType: true,
      surname: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFormTypeSelection = this.handleFormTypeSelection.bind(this);
    this.handleGivenNameChange = this.handleGivenNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginError = this.handleLoginError.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.saveToken = this.saveToken.bind(this);
  }

  public handleSubmit(e: any, mutate: any) {
    e.preventDefault();
    const {
      email,
      givenName,
      password,
      registerFormType,
      surname
    } = this.state;
    const input = { email, password };
    registerFormType
      ? mutate({
          variables: {
            email,
            givenName,
            password,
            surname
          }
        })
      : mutate({ variables: { input } });
  }

  public handleEmailChange(e: any) {
    this.setState({ email: e.target.value });
  }

  public handleFormTypeSelection(key: any) {
    const registerFormType = key === "register";
    this.setState({ registerFormType });
  }

  public handleGivenNameChange(e: any) {
    this.setState({ givenName: e.target.value });
  }

  public handleLoginSuccess(data: any, login: () => void) {
    console.log(JSON.stringify(data, null, 2));
    const token = data.logUserIn ? data.logUserIn : data.createUser;
    this.saveToken(token);
    login();
  }

  public handleLoginError(errored: any, loggedIn: boolean, logout: () => void) {
    console.log(JSON.stringify(errored, null, 2));
    const originalErrorMessage = errored.message;
    let errorMessage: LoginErrorMessage = "Credentials not recognised.";
    if (
      originalErrorMessage ===
      "GraphQL error: An account has been registered to that email address"
    ) {
      errorMessage = "An account has been registered to that email address";
    }
    this.setState({ errorMessage });
    if (loggedIn) {
      logout();
    }
  }

  public handlePasswordChange(e: any) {
    this.setState({ password: e.target.value });
  }

  public handleSurnameChange(e: any) {
    this.setState({ surname: e.target.value });
  }

  public render() {
    const {
      email,
      errorMessage,
      givenName,
      password,
      registerFormType,
      surname
    } = this.state;
    const { loggedIn, login, logout } = this.props;
    return (
      <React.Fragment>
        {loggedIn ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Mutation
              mutation={registerFormType ? CREATE_USER : LOG_IN}
              onCompleted={data => this.handleLoginSuccess(data, login)}
              onError={errored =>
                this.handleLoginError(errored, loggedIn, logout)
              }
            >
              {(mutate: any, { loading }: any) => (
                <React.Fragment>
                  {loading && <p>Loading...</p>}
                  <Tabs
                    activeKey={registerFormType ? "register" : "login"}
                    onSelect={this.handleFormTypeSelection}
                    id="form-type-tab"
                  >
                    <Tab eventKey="login" title="Log in">
                      <form
                        id="login-form"
                        name="login-form"
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                          this.handleSubmit(e, mutate)
                        }
                      >
                        <FormGroup controlId="login-form-email">
                          <ControlLabel>Email</ControlLabel>
                          <FormControl
                            type="email"
                            value={email}
                            onChange={this.handleEmailChange}
                            autoComplete="email"
                          />
                        </FormGroup>
                        <FormGroup controlId="login-form-password">
                          <ControlLabel>Password</ControlLabel>
                          <FormControl
                            type="password"
                            value={password}
                            onChange={this.handlePasswordChange}
                            autoComplete="current-password"
                          />
                        </FormGroup>

                        <Button
                          bsStyle="primary"
                          onClick={(e: React.MouseEvent<Button>) =>
                            this.handleSubmit(e, mutate)
                          }
                        >
                          Log in
                        </Button>
                      </form>
                    </Tab>
                    <Tab eventKey="register" title="Sign up">
                      <form
                        id="register-form"
                        name="register-form"
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                          this.handleSubmit(e, mutate)
                        }
                      >
                        <FormGroup controlId="register-form-given-name">
                          <ControlLabel>Given Name(s)</ControlLabel>
                          <FormControl
                            type="text"
                            value={givenName}
                            onChange={this.handleGivenNameChange}
                            autoComplete="given-name"
                          />
                        </FormGroup>
                        <FormGroup controlId="register-form-surname">
                          <ControlLabel>Surname</ControlLabel>
                          <FormControl
                            type="text"
                            value={surname}
                            onChange={this.handleSurnameChange}
                            autoComplete="family-name"
                          />
                        </FormGroup>
                        <FormGroup controlId="register-form-email">
                          <ControlLabel>Email</ControlLabel>
                          <FormControl
                            type="email"
                            value={email}
                            onChange={this.handleEmailChange}
                            autoComplete="email"
                          />
                        </FormGroup>
                        <FormGroup controlId="register-form-password">
                          <ControlLabel>Password</ControlLabel>
                          <FormControl
                            type="password"
                            value={password}
                            onChange={this.handlePasswordChange}
                            autoComplete="current-password"
                          />
                        </FormGroup>

                        <Button
                          bsStyle="primary"
                          onClick={(e: React.MouseEvent<Button>) =>
                            this.handleSubmit(e, mutate)
                          }
                        >
                          Sign up
                        </Button>
                      </form>
                    </Tab>
                  </Tabs>
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
