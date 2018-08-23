// tslint:disable no-console

import * as jwt from "jsonwebtoken";

const isLoggedIn = () => {
  //   const JWT_SECRET = "thisisalsoreallylonganditisusedfor1020393aJWTsecret";
  const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
  if (JWT_SECRET == null) {
    console.log(process.env);
    throw Error("Unable to locate JWT secret to decode");
  }
  const token = localStorage.getItem("token");
  if (token == null) {
    return false;
  }
  try {
    const verified: string | object = jwt.verify(token, JWT_SECRET!);
    console.log(verified);
    return verified;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export { isLoggedIn };
