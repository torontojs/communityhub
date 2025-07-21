# Check for errors in the "name" field

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Missing name
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{}
HTTP 422

# Empty name
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": ""
}
HTTP 422

# Name with emojis
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "💩"
}
HTTP 201

# Name with extra spaces
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "     Name with Extra Spaces     "
}
HTTP 201
