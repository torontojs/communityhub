# Organizers can create teams

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Create a new team
# TODO: https://github.com/torontojs/communityhub/issues/206
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
[Options]
skip: true
{
	"name": "New team - Organizer"
}
HTTP 201
