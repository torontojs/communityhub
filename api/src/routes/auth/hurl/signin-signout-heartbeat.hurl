  # Sign in intergration test wrong password UNAUTHORIZED

  POST http://localhost:3000/api/auth/sign-in

  Content-Type: application/json

  {
    "email": "profile1@example.com",
    "password": "abc"
  }

  HTTP 401


# Sign in intergration test missing password

  POST http://localhost:3000/api/auth/sign-in

  Content-Type: application/json

  {
    "email": "profile1@example.com",
    "password": ""
  }

  HTTP 422


# Sign in intergration test invalid email

  POST http://localhost:3000/api/auth/sign-in

  Content-Type: application/json

  {
    "email": "profile1example.com",
    "password": "abcd"
  }

  HTTP 422



# FIX ME: Sign in intergration test missing email

POST http://localhost:3000/api/auth/sign-in

Content-Type: application/json

{
  "email": "",
  "password": "abcd"
}

HTTP 422


# Heartbeat check when not signed-in UNAUTHORIZED

GET http://localhost:3000/api/auth/heartbeat

HTTP 401


# TODO: Heartbeat invalid token(needs seed data)
# TODO: Heartbeat session expired(needs seed data)
# TODO: Heartbeat session not found


# TODO: Sign in intergration test(Fix me) CREATED

POST http://localhost:3000/api/auth/sign-in

Content-Type: application/json

{
  "email": "profile1@example.com",
  "password": "abcd"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"
[Asserts]
status == 201


# TODO: Sign in intergration test already signed in BAD REQUEST (Fix me)

POST http://localhost:3000/api/auth/sign-in

Content-Type: application/json

{
  "email": "profile1@example.com",
  "password": "abcd"
}

HTTP 400


# Heartbeat check after successful sign-in OKAY

GET http://localhost:3000/api/auth/heartbeat
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 200
[Asserts]
status == 200

# TODO: Heartbeat accessing page requiring organizer or admini access FORBIDDEN

# TODO: Sign-out succesfully logged out NO_CONTENT(Returns 200 but it should be 204)

POST http://localhost:3000/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 200
[Asserts]
status == 200


# # Sign-out invalid token BAD_REQUEST

# GET http://localhost:4242/auth/sign-out
# Cookie: auth_token={{ auth-token-cookie-var }}

# HTTP 400
# [Asserts]
# status == 400


# # TODO: Need seed data. Activate invalid token BAD_REQUESTS
# # TODO: Need seed data. Activate expired token UNAUTHORIZED
# # TODO: Need seed data. Activate failed to activate account INTERNAL_SERVER_ERROR
# # TODO: Need seed data. Activate account succesfully OKAY
