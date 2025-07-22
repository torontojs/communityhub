# Adding team members with the wrong profile id should return an error

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Invalid profile id
# TODO: https://github.com/torontojs/communityhub/issues/202
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[Options]
skip: true
[{
	"name": "Invalid Profile ID",
	"profileId": "00000000-0000-0000-0000-000000000000"
}]
HTTP 422

# Malformed profile id
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"name": "Malformed Profile ID",
	"profileId": "malformed-id"
}]
HTTP 422

# Profile id with spaces
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"name": "Profile ID with Spaces",
	"profileId": "       {{add_member_profile_id}}        "
}]
HTTP 422
