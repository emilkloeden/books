// tslint:disable no-console jsx-no-lambda
import gql from "graphql-tag";

import * as React from "react";
import { Mutation } from "react-apollo";
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Row
} from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

import FileDisplay from "./FileDisplay";
import IDropZoneFile from "./IDropZoneFile";
import PDFUpload from "./PDFUpload";

interface IState {
  authors: string;
  title: string;
  file: IDropZoneFile | undefined;
}

const addBookMutation = gql`
  mutation($filename: String, $title: String!, $authors: String!) {
    addBook(filename: $filename, title: $title, authors: $authors)
  }
`;

class BasicBookUploadForm extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  constructor(props: RouteComponentProps<any>) {
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

  public onDropAccepted(files: any, mutate: any) {
    const file = files[0];
    console.log(file);
    mutate({ variables: { file } });
    this.setState({ file });
  }

  public handleSubmit(e: any, mutate: any) {
    e.preventDefault();
    const { authors, file, title } = this.state;
    if (authors && file && title) {
      console.log("Submitted", this.state);
      mutate({ variables: { authors, filename: file.name, title } });
    }
  }

  public render() {
    const { file, title, authors } = this.state;
    return (
      <Mutation
        mutation={addBookMutation}
        onCompleted={() => this.props.history.push("/books")}
      >
        {(mutate: any) => (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              this.handleSubmit(e, mutate)
            }
          >
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
                  disabled={
                    !this.state.file || !this.state.authors || !this.state.title
                  }
                >
                  Add Book
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Mutation>
    );
  }
}

const BookUploadForm = withRouter(BasicBookUploadForm);

export default BookUploadForm;
