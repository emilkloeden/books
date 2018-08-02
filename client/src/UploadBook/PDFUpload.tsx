import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
import Dropzone from "react-dropzone";

interface IProps {
  onDropAccepted: any;
}

const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

const PDFUpload: React.SFC<IProps> = ({ onDropAccepted }) => {
  return (
    <Mutation mutation={uploadFileMutation}>
      {(mutate: any) => (
        <Dropzone
          accept="application/pdf"
          disableClick={true}
          multiple={false}
          // tslint:disable-next-line jsx-no-lambda
          onDropAccepted={files => onDropAccepted(files, mutate)}
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
      )}
    </Mutation>
  );
};

export default PDFUpload;
