# Organizers should be able to update teams

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Update a team
PATCH {{host}}/api/teams/{{update_team_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Updated Team - Organizer"
}
HTTP 200

# Verify if the team was updated
GET {{host}}/api/teams/{{update_team_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" == "Updated Team - Organizer"
