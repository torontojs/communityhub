# Organizers can update teams members

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Try to update team member
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"id": "{{update_member_id}}",
	"name": "Update member - Organizer"
}]
HTTP 200

# Check the member was updated
GET {{host}}/api/teams/{{update_member_team_id}}/members
HTTP 200
[Asserts]
jsonpath "$.data[*].name" contains "Update member - Organizer"
