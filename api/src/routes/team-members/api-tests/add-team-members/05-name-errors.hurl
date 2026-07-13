# Check for errors in the "name" field

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Missing name
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{}]
HTTP 422

# Empty name
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"name": "",
	"profileId": "{{add_member_profile_id}}"
}]
HTTP 422

# Name with emojis
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"name": "💩",
	"profileId": "{{add_member_profile_id}}"
}]
HTTP 201

# Name with extra spaces
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"name": "     Role with Extra Spaces     ",
	"profileId": "{{add_member_profile_id}}"
}]
HTTP 201
