# Volunteers can't create teams

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{volunteer_email}}",
	"password": "{{volunteer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Create a new team
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "New team - Volunteer"
}
HTTP 403
