# Organizers can create teams

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Create a new team
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "New team - Organizer"
}
HTTP 201
