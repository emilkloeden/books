import * as React from "react";

import Auth from "../Shared/Auth";
import BookUploadForm from "./BookUploadForm";

const BookUpload: React.SFC = () => {
  return (
    <Auth>
      <BookUploadForm />
    </Auth>
  );
};

export default BookUpload;
