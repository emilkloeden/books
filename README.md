# Books

Description to come...

# TODO

## Auth

1.  Register (email, password) => new User(email, password, activated: false), activation email
2.  Activation email => set User(activated: true)
3.  Resend-activation email
4.  Automatic deletion of user if not activated
5.  Reset password (email) => password reset email
6.  Password reset email =>
7.  Password reset view
8.  Sign in => JWT
9.  Users have roles: normal, editor (increased business logic functionality), admin (increased site functionality, including conversion of normal users to editors or admins)
10. Protected routes (frontend)
11. Protected GraphQL endpoints (all mutations, certain queries)

## GraphQL

### types

User
Book

### Queries

me: (logged in User)

### Mutations

register
activate
signIn

uploadBook
editBook
proofPage
changeUserRole

## Other

Book processing - how to get from one PDF to one PNG per page
