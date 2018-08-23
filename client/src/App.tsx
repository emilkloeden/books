import * as React from "react";
import { Route } from "react-router-dom";
import "./App.css";

// import { isLoggedIn } from "./auth";
import IndividualPage from "./IndividualPage/IndividualPage";
import LoginForm from "./Login/Login";
import Header from "./Shared/Header";
import BookUpload from "./UploadBook/BookUpload";

// const uploadOrRedirectToLogin = () =>
//   isLoggedIn() ? <UploadBook /> : <Redirect to="/login" />;
const tempRenderIndividualPage = () => <IndividualPage src="" />;

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header />
        <Route path="/books" render={tempRenderIndividualPage} />
        <Route path="/upload" component={BookUpload} />
        <Route path="/login" component={LoginForm} />
      </div>
    );
  }
}

export default App;
