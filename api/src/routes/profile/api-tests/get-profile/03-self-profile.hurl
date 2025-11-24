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
jsonpath "$.data.teams" exists
jsonpath "$.data.teams[0].name" == "TorontoJS"
jsonpath "$.data.teams[0].description" == "This is Toronto JS main team, it represents the organization itself."
jsonpath "$.data.teams[0].role" == "volunteer"
jsonpath "$.data.teams[0].memberCount" is integer

