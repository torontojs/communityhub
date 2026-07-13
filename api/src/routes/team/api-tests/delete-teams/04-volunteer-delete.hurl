# Volunteers can't delete teams

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{volunteer_email}}",
	"password": "{{volunteer_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Try to delete the team
DELETE {{host}}/api/teams/{{try_delete_team_id}}
Cookie: auth_token={{auth-token}}
HTTP 403

# Verify if the team still exists
GET {{host}}/api/teams/{{try_delete_team_id}}
HTTP 200
