export interface IBook {
  title: string;
  authors: string;
  pageCount?: number;
  slug: string;
  filename: string;
  uploadedBy?: IUser;
}

export interface IUser {
  givenName?: string;
  surname?: string;
  email: string;
}
