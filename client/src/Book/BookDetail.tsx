import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Auth from "../Shared/Auth";
import Error from "../Shared/Error";
import Loading from "../Shared/Loading";

interface IProps {
  id: number;
}

const GET_BOOK = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      title
      authors
      pageCount
      activeProof {
        nextPage
      }
    }
  }
`;

const BasicBookDetail: React.SFC<IProps> = ({ id }) => {
  return (
    <Query query={GET_BOOK} variables={{ id }}>
      {({ data: { book }, loading, error }) => (
        <React.Fragment>
          {loading && <Loading />}
          {error && <Error error={JSON.stringify(error, null, 2)} />}
          {book && (
            <React.Fragment>
              <h1>{book.title}</h1>
              <h4>{book.authors}</h4>
              <div>
                TODO: Implement Links to proofing, user-proofing details and
                eventually download links
              </div>
              <Link to={`./${book.proofs.nextPage}`} />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </Query>
  );
};

const BookDetail: React.SFC<IProps> = ({ id }) => (
  <Auth>
    <BasicBookDetail id={id} />
  </Auth>
);

export default BookDetail;
