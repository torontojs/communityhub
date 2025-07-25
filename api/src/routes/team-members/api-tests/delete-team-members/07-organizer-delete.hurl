# Organizers can delete teams members

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
DELETE {{host}}/api/teams/{{delete_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[
	"{{organizer_delete_member_id}}"
]
HTTP 200

# Check the team was updated
# TODO: https://github.com/torontojs/communityhub/issues/200
GET {{host}}/api/teams/{{delete_member_team_id}}/members
[Options]
skip: true
HTTP 200
[Asserts]
jsonpath "$.data[*].id" not contains "{{organizer_delete_member_id}}"
