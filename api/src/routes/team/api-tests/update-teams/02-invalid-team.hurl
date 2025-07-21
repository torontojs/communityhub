# Updating the wrong team should return an error

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Invalid team id
PATCH {{host}}/api/teams/00000000-0000-0000-0000-000000000000
Cookie: auth_token={{auth-token}}
{
	"name": "Invalid ID"
}
HTTP 404

# Malformed UUID
PATCH {{host}}/api/teams/malformed-id
Cookie: auth_token={{auth-token}}
{
	"name": "Malformed ID"
}
HTTP 422
