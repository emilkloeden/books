import * as React from "react";
import IDropZoneFile from "./IDropZoneFile";

interface IProps {
  file: IDropZoneFile;
}

const FileDisplay: React.SFC<IProps> = props => {
  const { file } = props;
  return (
    <React.Fragment>
      <h3>{file.name}</h3>
      <span>{file.preview}</span>
      <img src={file.preview} />
    </React.Fragment>
  );
};
export default FileDisplay;
