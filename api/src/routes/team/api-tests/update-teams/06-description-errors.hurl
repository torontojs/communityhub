# Check for errors in the "description" field

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Missing description
PATCH {{host}}/api/teams/{{update_team_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Missing Description - Update"
}
HTTP 200

# Empty description
PATCH {{host}}/api/teams/{{update_team_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Empty Description - Update",
	"description": ""
}
HTTP 200

# Description with emojis
PATCH {{host}}/api/teams/{{update_team_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Emoji Description - Update",
	"description": "💩"
}
HTTP 200

# Description with extra spaces
PATCH {{host}}/api/teams/{{update_team_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Description with Extra Spaces - Update",
	"description": "      Description      "
}
HTTP 200
