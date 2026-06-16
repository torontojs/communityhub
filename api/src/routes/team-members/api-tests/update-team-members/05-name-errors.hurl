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
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"id": "{{update_member_id}}"
}]
HTTP 422

# Empty name
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"id": "{{update_member_id}}",
	"name": ""
}]
HTTP 422

# Name with emojis
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"id": "{{update_member_id}}",
	"name": "💩"
}]
HTTP 200

# Name with extra spaces
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"id": "{{update_member_id}}",
	"name": "     Role with Extra Spaces     "
}]
HTTP 200
