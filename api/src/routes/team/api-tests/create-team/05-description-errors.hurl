# Check for errors in the "description" field

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Missing description
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "Missing Description - Create"
}
HTTP 201

# Empty description
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "Empty Description - Create",
	"description": ""
}
HTTP 422

# Description with emojis
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "Emoji Description - Create",
	"description": "💩"
}
HTTP 201

# Description with extra spaces
POST {{host}}/api/teams
Cookie: auth_token={{auth-token}}
{
	"name": "Description with Extra Spaces - Create",
	"description": "      Description      "
}
HTTP 201
