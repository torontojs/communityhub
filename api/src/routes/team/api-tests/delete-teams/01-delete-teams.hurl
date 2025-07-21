# Check for basic team delete operations

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Delete an existing team
DELETE {{host}}/api/teams/{{delete_team_id}}
Cookie: auth_token={{auth-token}}
HTTP 201

# Verify if the team was deleted
GET {{host}}/api/teams/{{delete_team_id}}
HTTP 404
