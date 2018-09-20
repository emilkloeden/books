import * as React from "react";
import { Link } from "react-router-dom";
import BookList from "./BookList";

interface IBookPageProps {
  loggedIn: boolean;
}

const BookPage: React.SFC<IBookPageProps> = ({ loggedIn }) => {
  return (
    <div>
      {loggedIn && <Link to="/upload">Upload New Book</Link>}
      <BookList />
    </div>
  );
};

export default BookPage;
