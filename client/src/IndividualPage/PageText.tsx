// tslint:disable
import * as React from "react";
import { Button, ButtonToolbar, FormControl, FormGroup } from "react-bootstrap";
export interface IState {
  value: string;
}

interface IProps {
  initialValue: string;
}

export default class PageText extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props);
    this.state = { value: props.initialValue };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  public handleChange(e: React.FormEvent<FormControl>) {
    this.setState({ value: (e.target as HTMLTextAreaElement).value });
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    console.log("handling submit", e);
    //TODO!
  }

  public handleEnterPress(e: any) {
    if (e.target.type !== "textarea" && e.which === 13) {
      e.preventDefault();
    }
  }

  public render() {
    // tslint:disable
    console.log(JSON.stringify(this.state.value));
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formControlsTextarea">
          <FormControl
            componentClass="textarea"
            value={value}
            onChange={this.handleChange}
            style={{ whiteSpace: "pre-line", height: 300 }}
          />
        </FormGroup>
        <ButtonToolbar>
          <Button bsStyle="default" bsSize="large">
            Back
          </Button>
          <Button bsStyle="primary" bsSize="large" onSubmit={this.handleSubmit}>
            Save
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
}
