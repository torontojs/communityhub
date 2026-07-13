# Updating team members for the wrong team should return an error

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Invalid team id
DELETE {{host}}/api/teams/00000000-0000-0000-0000-000000000000/members
Cookie: auth_token={{auth-token}}
[
	"{{delete_member_id}}"
]
HTTP 404

# Malformed UUID
DELETE {{host}}/api/teams/malformed-id/members
Cookie: auth_token={{auth-token}}
[
	"{{delete_member_id}}"
]
HTTP 422
