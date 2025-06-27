# Heartbeat invalid token.
GET {{host}}/api/auth/heartbeat

Cookie: auth_token=00000000-0000-0000-0000-000000000000

HTTP 401


# Heartbeat check with no token UNAUTHORIZED
GET {{host}}/api/auth/heartbeat

HTTP 401


POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


# Heartbeat check after successful sign-in OKAY
GET {{host}}/api/auth/heartbeat
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 200


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


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
