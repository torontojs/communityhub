# FIX ME: Sign in intergration test wrong password UNAUTHORIZED
# https://github.com/torontojs/communityhub/issues/96
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


# FIX ME: Sign in intergration test invalid email
# https://github.com/torontojs/communityhub/issues/96
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


# TODO: Heartbeat session expired(needs seed data)
# TODO: Heartbeat session not found


# FIX ME: Sign in intergration test CREATED
# https://github.com/torontojs/communityhub/issues/96

POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "profile1@example.com",
  "password": "abcd"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


# FIX ME: Sign in intergration test already signed in BAD REQUEST
# https://github.com/torontojs/communityhub/issues/96
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "profile1@example.com",
  "password": "abcd"
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


# TODO: Heartbeat accessing page requiring organizer or admin access FORBIDDEN
