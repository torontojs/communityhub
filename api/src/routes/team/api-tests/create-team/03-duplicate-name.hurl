# Can't create a team with a name that already exists

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Create the team first
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "Dupe Team Name"
}
HTTP 201

# Try to create the team again
# TODO:
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
[Options]
skip: true
{
	"name": "Dupe Team Name"
}
HTTP 300
