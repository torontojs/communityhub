# Public profiles GET (Testing the first tree basic data points)
GET http://localhost:3000/api/profiles

HTTP 200
[Asserts]
jsonpath "$.data[0].id" == "3227114d-43c4-42ed-8aea-f3860fe42222"
jsonpath "$.data[0].email" == "profile1@example.com"
jsonpath "$.data[0].name" == "John Doe"

jsonpath "$.data[1].id" == "aa7e8915-8034-43d9-b910-a2e3ebdb947f"
jsonpath "$.data[1].email" == "profile2@example.com"
jsonpath "$.data[1].name" == "Jane Smith"

jsonpath "$.data[2].id" == "e1f2a3b4-c5d6-2345-6789-123456789010"
jsonpath "$.data[2].email" == "user41@example.com"
jsonpath "$.data[2].name" == "Emily Davis"

# TODO test pagination when feature is constructed: public profiles GET

# GET self profile
POST http://localhost:3000/api/auth/sign-in

Content-Type: application/json

{
  "email": "profile1@example.com",
  "password": "abcd"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"

GET http://localhost:3000/api/profiles/self
Cookie: auth_auth={{ auth-token-cookie-var }}
HTTP 200

[Asserts]
jsonpath "$.data.id" == "3227114d-43c4-42ed-8aea-f3860fe42222"
jsonpath "$.data.email" == "profile1@example.com"
jsonpath "$.data.name" == "John Doe"
jsonpath "$.data.isBasedOnGTA" == true
jsonpath "$.data.canJoinLocalEvents" == true

# GET profile using id
GET http://localhost:3000/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42222
HTTP 200

[Asserts]
jsonpath "$.data.id" == "3227114d-43c4-42ed-8aea-f3860fe42222"
jsonpath "$.data.email" == "profile1@example.com"
jsonpath "$.data.name" == "John Doe"
jsonpath "$.data.isBasedOnGTA" == true
jsonpath "$.data.canJoinLocalEvents" == true



# GET profile using non existant id
GET http://localhost:3000/api/profiles/3227114d-43c4-42ed-8aea-f3860fe42122
HTTP 404

# TODO: Patch profile by id.

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
