
# Sign in intergration test wrong password UNAUTHORIZED
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


# Heartbeat check when not signed-in UNAUTHORIZED
GET {{host}}/api/auth/heartbeat

HTTP 401


# Heartbeat invalid token.
GET {{host}}/api/auth/heartbeat

Cookie: auth_token=00000000-0000-0000-0000-000000000000

HTTP 401


# Sign in intergration test CREATED
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


# Sign in intergration test already signed in with token BAD REQUEST
POST {{host}}/api/auth/sign-in
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 400


# Sign in intergration test already signed in without token BAD REQUEST
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 400


# Heartbeat check after successful sign-in OKAY
GET {{host}}/api/auth/heartbeat
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 200


# Sign-out succesfully logged out NO_CONTENT
POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Sign-out invalid token BAD_REQUEST
GET {{host}}/api/auth/sign-out
Cookie: auth_token=00000000-0000-0000-0000-000000000000

HTTP 404


# Sign out missing token BAD_REQUEST
POST {{host}}/api/auth/sign-out

HTTP 401


# Heartbeat admin/root
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "root@torontojs.com",
  "password": "correct horse battery staple"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


GET {{host}}/api/auth/heartbeat
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 200


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Heartbeat organizer
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email":"king.arthur@camelot.uk",
  "password": "H0lyGr@il42!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


GET {{host}}/api/auth/heartbeat
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 200


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204
