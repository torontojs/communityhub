# Sign-in wrong password UNAUTHORIZED
  POST {{host}}/api/auth/sign-in

  Content-Type: application/json

  {
    "email": "profile1@example.com",
    "password": "wrongPassword9111!@$"
  }

  HTTP 401


# Sign in intergration test missing password
  POST {{host}}/api/auth/sign-in

  Content-Type: application/json

  {
    "email": "profile1@example.com",
    "password": ""
  }

  HTTP 422


# Sign in intergration test invalid email
  POST {{host}}/api/auth/sign-in

  Content-Type: application/json

  {
    "email": "profile1example.com",
    "password": "EmailEmail9111!@$abcd"
  }

  HTTP 422


# Sign in intergration test missing email
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "",
  "password": "MissingeEmail911!@$"
}

HTTP 422


# Sign-in CREATED
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


# Sign-in already signed in with token BAD REQUEST
POST {{host}}/api/auth/sign-in
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 400

POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204
