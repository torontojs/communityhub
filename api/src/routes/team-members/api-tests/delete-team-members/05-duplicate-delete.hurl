# Deleting a member from a team a second time should be an error

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Delete a team member
DELETE {{host}}/api/teams/{{delete_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[
	"{{dupe_delete_member_id}}"
]
HTTP 201

# Delete the team emmber a second time
DELETE {{host}}/api/teams/{{delete_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[
	"{{dupe_delete_member_id}}"
]
HTTP 201
