import { gql } from "apollo-boost";
import * as React from "react";
import { Query } from "react-apollo";
import { Grid, Row } from "react-bootstrap";
import Image from "./Image";
import PageText from "./PageText";

interface IProps {
  src: string;
}

const GET_PAGE = gql`
  query {
    page(number: 1) {
      image {
        src
      }
      text {
        ocr
      }
    }
  }
`;

const IndividualPage: React.SFC<IProps> = props => {
  return (
    <Query query={GET_PAGE}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error : ( {JSON.stringify(error, null, 2)}</div>;
        }
        if (data) {
          return (
            <Grid>
              <Row>
                <Image src={data.page.image.src} />
              </Row>
              <Row>
                <PageText initialValue={data.page.text.ocr} />
              </Row>
            </Grid>
          );
        }
        return <React.Fragment />;
      }}
    </Query>
  );
};

export default IndividualPage;
