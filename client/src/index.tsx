import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const link = createUploadLink({ uri: "http://localhost:4000/graphql" });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
