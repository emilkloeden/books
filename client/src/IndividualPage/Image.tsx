import * as React from "react";

interface IProps {
  src: string;
}

const Image: React.SFC<IProps> = props => {
  return <img src={props.src} />;
};

export default Image;
