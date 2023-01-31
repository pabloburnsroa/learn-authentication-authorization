# learn-authentication-authorization

## Authentication

Process of verifying who a particular user is.
How do we go about doing this?

- Email/password
- Facial recognition
- Security questions...

## Authorization

Verifying what a user has access to/ what they can do...
Usually happens after the user has been authenticated.

- Check if admin/user
- Can they delete a comment etc...

## How to (not) store passwords?

- We need to store users/passwords
- Neve store passwords as is in your database

We should run the password through a hashing function
Take the result of function and store that in the database.

## Hashing functions

1. One way function which is infeasible to invert
2. Small change input yields large change in the output
3. Deterministic - same input yields same output
4. Unlikely to find 2 outputs with same value
5. Password Hash functions are slow

## Salts

- An extra safeguard when hashing

## bcrypt

`npm i bcrypt`


