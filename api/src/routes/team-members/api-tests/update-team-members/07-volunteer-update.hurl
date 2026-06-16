# Volunteers can't update members to teams

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
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"id": "{{try_update_member_id}}",
	"name": "Update member - Volunteer"
}]
HTTP 403

# Check the member was not updated
GET {{host}}/api/teams/{{update_member_team_id}}/members
HTTP 200
[Asserts]
jsonpath "$.data[*].name" not contains "Update member - Volunteer"
