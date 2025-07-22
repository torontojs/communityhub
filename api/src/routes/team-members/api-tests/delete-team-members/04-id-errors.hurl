# Deleting team members with the wrong id should return an error

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Invalid id
# TODO: https://github.com/torontojs/communityhub/issues/201
DELETE {{host}}/api/teams/{{delete_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[Options]
skip: true
[
	"00000000-0000-0000-0000-000000000000"
]
HTTP 422

# Malformed id
# TODO: https://github.com/torontojs/communityhub/issues/201
DELETE {{host}}/api/teams/{{delete_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[Options]
skip: true
[
	"malformed-id"
]
HTTP 422

# Id with spaces
# TODO: https://github.com/torontojs/communityhub/issues/201
DELETE {{host}}/api/teams/{{delete_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[Options]
skip: true
[
	"         {{delete_member_id}}        "
]
HTTP 422
