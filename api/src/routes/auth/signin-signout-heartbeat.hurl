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



# Sign in intergration test missing email

POST http://localhost:3000/api/auth/sign-in

Content-Type: application/json

{
  "email": "",
  "password": "MissingeEmail911!@$"
}

HTTP 422


# Heartbeat check when not signed-in UNAUTHORIZED

GET http://localhost:3000/api/auth/heartbeat

HTTP 401


# TODO: Heartbeat invalid token(needs seed data)(Send uuid made up of 0's)
# TODO: Heartbeat session expired(needs seed data)
# TODO: Heartbeat session not found


# Sign in intergration test CREATED

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


# Sign in intergration test already signed in BAD REQUEST

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

# TODO: Heartbeat accessing page requiring organizer or admin access FORBIDDEN

# TODO: Sign-out succesfully logged out NO_CONTENT(Returns 200 but it should be 204)

POST http://localhost:3000/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# TODO: Sign-out invalid token BAD_REQUEST(needs seed data)

# GET http://localhost:4242/auth/sign-out
# Cookie: auth_token={{ auth-token-cookie-var }}

# HTTP 400
# [Asserts]
# status == 400


# TODO: Missing token returns 400 BAD_REQUEST(Fix me should be 400)

POST http://localhost:3000/api/auth/sign-out

HTTP 401
[Asserts]
status == 401
