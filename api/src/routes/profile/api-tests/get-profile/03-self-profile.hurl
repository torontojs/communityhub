# Checks for getting the "self" special profile route

# Gets the self profile for an invalid user
GET {{host}}/api/profiles/self
Cookie: auth_auth=00000000-0000-0000-0000-000000000000
HTTP 401

# Gets the self profile for an unauthorized user
GET {{host}}/api/profiles/self
HTTP 401

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Gets the self profile for that user
GET {{host}}/api/profiles/self
Cookie: auth_auth={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.data.id" == "{{organizer_id}}"
