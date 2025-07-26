# Volunteers can't add members to teams

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{volunteer_email}}",
	"password": "{{volunteer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Try to add team member
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"name": "New member - Volunteer",
	"profileId": "{{try_add_member_profile_id}}"
}]
HTTP 403

# Check the profile was not added
GET {{host}}/api/teams/{{add_member_team_id}}/members
HTTP 200
[Asserts]
jsonpath "$.data[*].id" not contains "{{try_add_member_profile_id}}"
