// tslint:disable no-console
import * as React from "react";
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Row
} from "react-bootstrap";

import FileDisplay from "./FileDisplay";
import IDropZoneFile from "./IDropZoneFile";
import PDFUpload from "./PDFUpload";

interface IState {
  authors: string;
  title: string;
  file: IDropZoneFile | undefined;
}

class UploadBook extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      authors: "",
      file: undefined,
      title: ""
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorsChange = this.handleAuthorsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDropAccepted = this.onDropAccepted.bind(this);
  }
  public handleTitleChange(e: React.FormEvent<FormControl>) {
    const { value } = e.target as HTMLInputElement;
    this.setState({ title: value });
  }

  public handleAuthorsChange(e: React.FormEvent<FormControl>) {
    const { value } = e.target as HTMLInputElement;
    this.setState({ authors: value });
  }

  public onDropAccepted(files: any) {
    const file = files[0];
    console.log(file);
    this.setState({ file });
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    const { authors, file, title } = this.state;
    if (authors && file && title) {
      console.log("Submitted", this.state);
    }
  }

  public render() {
    const { file, title, authors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <Col md={6}>
            {file ? (
              <FileDisplay file={file} />
            ) : (
              <PDFUpload onDropAccepted={this.onDropAccepted} />
            )}
          </Col>
          <Col md={6}>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                name="title"
                type="text"
                value={title}
                onChange={this.handleTitleChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Author(s)</ControlLabel>
              <FormControl
                name="authors"
                type="text"
                value={authors}
                onChange={this.handleAuthorsChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="submit"
              className="pull-right"
              bsStyle="primary"
              bsSize="large"
            >
              Upload Book
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default UploadBook;
