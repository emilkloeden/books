import * as React from "react";

interface IProps {
  error: string;
}

const Error: React.SFC<IProps> = ({ error }) => {
  return <div style={{ color: "red" }}>{error}</div>;
};

export default Error;
