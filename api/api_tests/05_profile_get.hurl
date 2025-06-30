# Public profiles GET (Testing the first tree basic data points) OKAY
GET {{host}}/api/profiles

HTTP 200
[Asserts]
jsonpath "$.data[1].id" == "3c5123c0-8548-4a02-a83c-32e9ce67eae8"
jsonpath "$.data[2].id" == "bf950534-e8f9-4f5a-a246-610aa63faf21"
jsonpath "$.data[3].id" == "37a4882c-3b7d-46c0-b019-c37e2445dae8"
jsonpath "$.data[4].id" == "890cae10-7bbd-4f0c-961a-df495ec7527b"


# Fix me: (should be 401) Get self profile UNAUTHORIZED
GET {{host}}/api/auth/profiles/self

HTTP 404


# GET self profile OKAY
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "sir.robin@cowardly.co",
  "password": "RunAway!1234"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


GET {{host}}/api/profiles/self
Cookie: auth_auth={{ auth-token-cookie-var }}

HTTP 200
[Asserts]
jsonpath "$.data.id" == "37a4882c-3b7d-46c0-b019-c37e2445dae8"


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# GET profile using id OKEY
GET {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8
HTTP 200

[Asserts]
jsonpath "$.data.id" == "37a4882c-3b7d-46c0-b019-c37e2445dae8"


# GET profile using non existant id NOT_FOUND
GET {{host}}/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42122

HTTP 404


# Get profile using malformed uuid
GET {{host}}/api/profiles/00000000-0000-0000-0000-000000000000


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 401
