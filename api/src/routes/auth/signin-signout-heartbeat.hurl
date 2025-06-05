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

GET http://localhost:3000/api/auth/heartbeat

Cookie: auth_token=00000000-0000-0000-0000-000000000000

HTTP 401


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

# TODO: Heartbeat accessing page requiring organizer or admin access FORBIDDEN

# Sign-out succesfully logged out NO_CONTENT

POST http://localhost:3000/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# TODO: Sign-out invalid token BAD_REQUEST(needs seed data)

GET http://localhost:3000/api/auth/sign-out
Cookie: auth_token=00000000-0000-0000-0000-000000000000

HTTP 404


# Sign out missing token BAD_REQUEST

POST http://localhost:3000/api/auth/sign-out

HTTP 401
