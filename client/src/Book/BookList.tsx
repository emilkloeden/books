// tslint:disable no-console
import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Auth from "../Shared/Auth";
import { IBook } from "./types";

export interface IBookListState {
  books: IBook[];
}

const GET_BOOKS = gql`
  query {
    books {
      title
      authors
      pageCount
      slug
    }
  }
`;

const BasicBookList: React.SFC<RouteComponentProps<{}>> = ({ match }) => {
  return (
    <Query query={GET_BOOKS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error : ( {JSON.stringify(error, null, 2)}</div>;
        }
        if (data) {
          const { books } = data;
          console.log(data);
          return (
            <React.Fragment>
              <ul>
                {books.map((book: IBook) => (
                  <li key={book.slug}>
                    <div>
                      <Link to={`${match.path}/${book.slug}`}>
                        {book.title}
                      </Link>
                    </div>
                    <div>{book.authors}</div>
                    <div>{book.pageCount}</div>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          );
        }
        return <React.Fragment />;
      }}
    </Query>
  );
};

const Routed = withRouter(BasicBookList);

const BookList = () => (
  <Auth>
    <Routed />
  </Auth>
);
export default BookList;
