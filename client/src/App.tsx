import * as React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import IndividualPage from "./IndividualPage/IndividualPage";
import Header from "./Shared/Header";
import UploadBook from "./UploadBook/UploadBook";

const tempRenderIndividualPage = () => <IndividualPage src="" />;

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header />
        <Route path="/books" render={tempRenderIndividualPage} />
        <Route path="/upload" component={UploadBook} />
      </div>
    );
  }
}

export default App;
