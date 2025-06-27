# Sign-in CREATEDS
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


# Sign-in already signed in without token BAD REQUEST
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 400


# Sign-out invalid token BAD_REQUEST
GET {{host}}/api/auth/sign-out
Cookie: auth_token=00000000-0000-0000-0000-000000000000

HTTP 404


# Sign-out succesfully logged out NO_CONTENT
POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Sign out missing token BAD_REQUEST
POST {{host}}/api/auth/sign-out

HTTP 401
