import * as React from "react";
import IDropZoneFile from "./IDropZoneFile";

interface IProps {
  file: IDropZoneFile;
}

const FileDisplay: React.SFC<IProps> = props => {
  const { file } = props;
  return (
    <div>
      <p>Upload:</p>
      <h3>{file.name}</h3>
    </div>
  );
};
export default FileDisplay;
