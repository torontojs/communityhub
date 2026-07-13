# Updating team members with the wrong id should return an error

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Invalid id
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"id": "00000000-0000-0000-0000-000000000000",
	"name": "Invalid ID"
}]
HTTP 422

# Malformed id
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"id": "malformed-id",
	"name": "Malformed ID"
}]
HTTP 422

# Id with spaces
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"id": "       {{update_member_id}}        ",
	"name": "ID with Spaces"
}]
HTTP 422
