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
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
{
	"name": "Missing Description",
	"profileId": "{{add_member_profile_id}}"
}
HTTP 201

# Empty description
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
{
	"name": "Empty Description",
	"description": "",
	"profileId": "{{add_member_profile_id}}"
}
HTTP 201

# Description with emojis
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
{
	"name": "Emoji Description",
	"description": "💩",
	"profileId": "{{add_member_profile_id}}"
}
HTTP 201

# Description with extra spaces
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
{
	"name": "Description with Extra Spaces",
	"description": "      Description      ",
	"profileId": "{{add_member_profile_id}}"
}
HTTP 201
