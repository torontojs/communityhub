# Updating team members for the wrong team should return an error

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
PATCH {{host}}/api/teams/00000000-0000-0000-0000-000000000000/members
Cookie: auth_token={{auth-token}}
[{
	"id": "{{update_member_id}}",
	"name": "Invalid Team ID"
}]
HTTP 201

# Malformed UUID
PATCH {{host}}/api/teams/malformed-id/members
Cookie: auth_token={{auth-token}}
[{
	"id": "{{update_member_id}}",
	"name": "Malformed Team ID"
}]
HTTP 201
