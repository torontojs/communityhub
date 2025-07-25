# Check for basic team member addition operation

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Add a team member
POST {{host}}/api/teams/{{add_member_team_id}}/members
Cookie: auth_token={{auth-token}}
[{
	"name": "New role",
	"profileId": "{{add_member_profile_id}}"
}]
HTTP 201
