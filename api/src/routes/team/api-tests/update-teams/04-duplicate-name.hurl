# Can't update a team with a name that already exists

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Update the team name first
PATCH {{host}}/api/teams/{{dupe_update_team_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Dupe Team Name - Update"
}
HTTP 200

# Try to update another team to have the same name
# TODO: https://github.com/torontojs/communityhub/issues/204
PATCH {{host}}/api/teams/{{try_update_team_id}}
Cookie: auth_token={{auth-token}}
[Options]
skip: true
{
	"name": "Dupe Team Name - Update"
}
HTTP 400
