# Public profiles GET (Testing the first tree basic data points) OKAY
GET {{host}}/api/profiles

HTTP 200
[Asserts]
jsonpath "$.data[0].id" == "3227114d-43c4-42ed-8aea-f3860fe42222"
jsonpath "$.data[0].schemaVersion" == 1
jsonpath "$.data[0].email" == "profile1@example.com"
jsonpath "$.data[0].name" == "John Doe"
jsonpath "$.data[0].description" == "A sample profile description"
jsonpath "$.data[0].isBasedOnGTA" == true
jsonpath "$.data[0].canJoinLocalEvents" == true
jsonpath "$.data[0].happenedAt" == "2025-01-20T10:00:00Z"
jsonpath "$.data[0].insertedAt" == "2025-01-20T10:00:00Z"
jsonpath "$.data[0].activatedAt" == "2025-01-20T10:05:00Z"
jsonpath "$.data[0].links" count == 0
jsonpath "$.data[0].skills" count == 0

jsonpath "$.data[1].id" == "aa7e8915-8034-43d9-b910-a2e3ebdb947f"
jsonpath "$.data[1].schemaVersion" == 1
jsonpath "$.data[1].email" == "profile2@example.com"
jsonpath "$.data[1].name" == "Jane Smith"
jsonpath "$.data[1].description" == "Another sample profile description"
jsonpath "$.data[1].isBasedOnGTA" == true
jsonpath "$.data[1].canJoinLocalEvents" == true
jsonpath "$.data[1].happenedAt" == "2025-01-20T11:00:00Z"
jsonpath "$.data[1].insertedAt" == "2025-01-20T11:00:00Z"
jsonpath "$.data[1].activatedAt" == "2025-01-20T11:10:00Z"
jsonpath "$.data[1].links" count == 0
jsonpath "$.data[1].skills" count == 0

# TODO test pagination when feature is constructed: public profiles GET

# Fix me(should be 401) Get self profile UNAUTHORIZED
GET {{host}}/api/auth/profiles/self

HTTP 404

# FIX ME: GET self profile OKAY
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

GET {{host}}/api/profiles/self
Cookie: auth_auth={{ auth-token-cookie-var }}
HTTP 200
[Asserts]
jsonpath "$.data.id" == "3227114d-43c4-42ed-8aea-f3860fe42222"
jsonpath "$.data.schemaVersion" == 1
jsonpath "$.data.email" == "profile1@example.com"
jsonpath "$.data.name" == "John Doe"
jsonpath "$.data.description" == "A sample profile description"
jsonpath "$.data.isBasedOnGTA" == true
jsonpath "$.data.canJoinLocalEvents" == true
jsonpath "$.data.happenedAt" == "2025-01-20T10:00:00Z"
jsonpath "$.data.insertedAt" == "2025-01-20T10:00:00Z"
jsonpath "$.data.activatedAt" == "2025-01-20T10:05:00Z"
jsonpath "$.data.links" count == 0
jsonpath "$.data.skills" count == 0


# GET profile using id OKEY
GET {{host}}/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42222
HTTP 200

[Asserts]
jsonpath "$.data.id" == "3227114d-43c4-42ed-8aea-f3860fe42222"
jsonpath "$.data.schemaVersion" == 1
jsonpath "$.data.email" == "profile1@example.com"
jsonpath "$.data.name" == "John Doe"
jsonpath "$.data.description" == "A sample profile description"
jsonpath "$.data.isBasedOnGTA" == true
jsonpath "$.data.canJoinLocalEvents" == true
jsonpath "$.data.happenedAt" == "2025-01-20T10:00:00Z"
jsonpath "$.data.insertedAt" == "2025-01-20T10:00:00Z"
jsonpath "$.data.activatedAt" == "2025-01-20T10:05:00Z"
jsonpath "$.data.links" count == 0
jsonpath "$.data.skills" count == 0



# GET profile using non existant id NOT_FOUND
GET {{host}}/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42122
HTTP 404


# Fix me(Should be 404): Patch profile by id not authorized UNAUTHORIZED
PATCH {{host}}/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42222

HTTP 422


# Patch profile by id (volunteer patch self) OKEY
PATCH {{host}}/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42222
Cookie: auth_auth={{ auth-token-cookie-var }}

Content-Type: application/json

{
  "name":"new name"
}

HTTP 200


GET {{host}}/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42222

HTTP 200

[Asserts]
jsonpath "$.data.name" == "new name"
jsonpath "$.data.email" == "profile1@example.com"


PATCH {{host}}/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42222
Cookie: auth_auth={{ auth-token-cookie-var }}

Content-Type: application/json

{
  "name":"John Doe"
}

HTTP 200

#TODO Patch profile by id using admin token

# TODO: Delete profile by id.

# FIX ME: Admin deletes user by id. Requires admin account in seed data.
# http://github.com/toronotjs/communityhub/issue/96
# POST http://localhost:3000/api/auth/sign-in

# Content-Type: application/json

#{
#  "email":"profile1@example.com",
#  "password":"abcd"
#}

#HTTP 201
#[Captures]
#auth-token-cookie-var: cookie "auth_token"

#DELETE http://localhost:3000/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42222
#HTTP 200
