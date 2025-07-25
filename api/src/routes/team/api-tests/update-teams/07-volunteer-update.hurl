# Volunteers can't delete teams

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{volunteer_email}}",
	"password": "{{volunteer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Update a team
PATCH {{host}}/api/teams/{{try_update_team_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Updated team - Volunteer"
}
HTTP 403

# Verify if the team was not updated
GET {{host}}/api/teams/{{try_update_team_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" != "Updated Team - Volunteer"
