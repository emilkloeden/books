import * as React from "react";
import Dropzone from "react-dropzone";

interface IProps {
  onDropAccepted: any;
}

const PDFUpload: React.SFC<IProps> = props => {
  return (
    <Dropzone
      accept="application/pdf"
      disableClick={true}
      multiple={false}
      onDropAccepted={props.onDropAccepted}
      style={{
        borderColor: "rgb(102, 102, 102)",
        borderRadius: "5px",
        borderStyle: "dashed",
        borderWidth: "2px",
        height: "200px",
        lineHeight: "200px",
        margin: "20px",
        position: "relative",
        width: "100%"
      }}
    >
      Drop a PDF file here to begin
    </Dropzone>
  );
};

export default PDFUpload;
