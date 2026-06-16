# Volunteers can't delete members to teams

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{volunteer_email}}",
	"password": "{{volunteer_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Try to update team member
DELETE {{host}}/api/teams/{{delete_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[
	"{{try_delete_member_id}}"
]
HTTP 403

# Check the team was not updated
GET {{host}}/api/teams/{{delete_member_team_id}}/members
HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "{{try_delete_member_id}}"
