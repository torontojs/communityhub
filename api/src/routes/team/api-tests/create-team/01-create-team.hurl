# Check for basic team creation operations

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Create a new team
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "New team"
}
HTTP 201
