// tslint:disable jsx-no-lambda
import * as React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import { isLoggedIn } from "./auth";
import BookDetail from "./Book/BookDetail";
import BookPage from "./Book/BookPage";
import BookUpload from "./Book/BookUpload";
// import IndividualPage from "./IndividualPage/IndividualPage";
import LoginForm from "./Login/Login";
import Header from "./Shared/Header";

// const uploadOrRedirectToLogin = () =>
//   isLoggedIn() ? <UploadBook /> : <Redirect to="/login" />;
// const tempRenderIndividualPage = () => <IndividualPage src="" />;

interface IState {
  loggedIn: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props: React.Props<{}>) {
    super(props);
    this.state = {
      loggedIn: isLoggedIn()
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  public login(): void {
    this.setState({ loggedIn: true });
  }

  public logout(): void {
    this.setState({ loggedIn: false });
  }

  public render() {
    const { login, logout } = this;
    const { loggedIn } = this.state;

    return (
      <div className="App">
        <Header loggedIn={this.state.loggedIn} logout={this.logout} />
        <Route path="/upload" component={BookUpload} />
        <Route
          path="/login"
          render={() => (
            <LoginForm loggedIn={loggedIn} login={login} logout={logout} />
          )}
        />
        <Route
          path="/books"
          exact={true}
          render={() => <BookPage loggedIn={loggedIn} />}
        />
        {/* TODO: <Route path="/books/:bookSlug/:pageNumber" render={() => {}} /> */}
        <Route
          path="/books/:bookSlug"
          exact={true}
          render={() => <BookDetail id={1} />}
        />
      </div>
    );
  }
}

export default App;
