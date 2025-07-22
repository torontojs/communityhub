# Organizers can add team members

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Try to add team member
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"name": "New member - Organizer",
	"profileId": "{{add_member_profile_id}}"
}]
HTTP 201

# Check the profile was not added
GET {{host}}/api/teams/{{add_member_team_id}}/members
HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "{{add_member_profile_id}}"
