GET http://localhost:3000/api/profiles

HTTP 200


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


GET http://localhost:3000/api/profiles
HTTP 200
[Asserts]
status == 200

# TODO: Tests resulting profiles

# TODO: get self profile

# TODO: get profile using id

# TODO: Patch profile by id. Need Access and only allowed to change self.

# TODO: Delete profile by id with admin access.
