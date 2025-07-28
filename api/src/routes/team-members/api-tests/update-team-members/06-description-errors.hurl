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
# TODO: https://github.com/torontojs/communityhub/issues/203
POST {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[Options]
skip: true
[{
	"id": "{{update_member_id}}",
	"name": "Missing Description"
}]
HTTP 201

# Empty description
# TODO: https://github.com/torontojs/communityhub/issues/203
POST {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[Options]
skip: true
[{
	"id": "{{update_member_id}}",
	"name": "Empty Description",
	"description": ""
}]
HTTP 201

# Description with emojis
# TODO: https://github.com/torontojs/communityhub/issues/203
POST {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[Options]
skip: true
[{
	"id": "{{update_member_id}}",
	"name": "Emoji Description",
	"description": "💩"
}]
HTTP 201

# Description with extra spaces
# TODO: https://github.com/torontojs/communityhub/issues/203
POST {{host}}/api/teams/{{update_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[Options]
skip: true
[{
	"id": "{{update_member_id}}",
	"name": "Description with Extra Spaces",
	"description": "      Description      "
}]
HTTP 201
