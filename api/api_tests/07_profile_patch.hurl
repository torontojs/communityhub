# Patch profile by id UNAUTHORIZED
PATCH {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8

Content-Type: application/json

{
  "name":"new name"
}

HTTP 401


# patch porfile by id without body
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


PATCH {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8
Cookie: auth_auth={{ auth-token-cookie-var }}

Content-Type: application/json

HTTP 500


PATCH {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8
Cookie: auth_auth={{ auth-token-cookie-var }}

Content-Type: application/json

{}

HTTP 422


POST {{host}}/api/auth/sign-out
Cookie: auth_auth={{ auth-token-cookie-var }}

HTTP 204


# Patch profile by id (volunteer patch self) OKEY
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


PATCH {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8
Cookie: auth_auth={{ auth-token-cookie-var }}

Content-Type: application/json

{
  "name":"new name"
}

HTTP 200


GET {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8

HTTP 200

[Asserts]
jsonpath "$.data.name" == "new name"
jsonpath "$.data.email" == "sir.robin@cowardly.co"


PATCH {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8
Cookie: auth_auth={{ auth-token-cookie-var }}

Content-Type: application/json

{
  "name":"Sir Robin"
}

HTTP 200


GET {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8

HTTP 200

[Asserts]
jsonpath "$.data.name" == "Sir Robin"
jsonpath "$.data.email" == "sir.robin@cowardly.co"


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Patch user using root account
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "root@torontojs.com",
  "password": "correct horse battery staple"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


PATCH {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8
Cookie: auth_auth={{ auth-token-cookie-var }}

Content-Type: application/json

{
  "name":"Je veux un Quoison"
}

HTTP 200


GET {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8

HTTP 200
[Asserts]
jsonpath "$.data.id" == "37a4882c-3b7d-46c0-b019-c37e2445dae8"
jsonpath "$.data.name" == "Je veux un Quoison"


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Patch with organizer account
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "king.arthur@camelot.uk",
  "password": "H0lyGr@il42!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


PATCH {{host}}/api/profiles/890cae10-7bbd-4f0c-961a-df495ec7527b
Cookie: auth_token={{ auth-token-cookie-var }}

Content-Type: application/json

{
  "name":"Quoison The Tird"
}

HTTP 422


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204
