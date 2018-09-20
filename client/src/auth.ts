// tslint:disable no-console
import * as jwt from "jsonwebtoken";

const isLoggedIn = () => {
  // I don't like getting the secret from .env
  // as create-react-app recommends committing these
  // and I've been forced to gitignore them.
  const { REACT_APP_JWT_SECRET } = process.env;
  if (REACT_APP_JWT_SECRET == null) {
    console.log(process.env);
    throw Error("Unable to locate JWT secret to decode");
  }
  const token = localStorage.getItem("token");
  if (token == null) {
    return false;
  }
  try {
    const verified: boolean = !!jwt.verify(token, REACT_APP_JWT_SECRET!);
    return verified;
  } catch (e) {
    // An issue occurred during verification - most likely the token has expired
    // Return false because
    // a) it seems like the safe option and
    // b) in the default use case this will be used to redirect the user to /login
    console.log(e);
    return false;
  }
};

export { isLoggedIn };
