# Authenticated team members list — rejects unauthenticated and below-organizer roles

# No cookie -> unauthorized
GET {{host}}/api/teams/{{team_members_team_id}}/members/authenticated
HTTP 401

# Volunteers are below the organizer threshold
POST {{host}}/api/auth/sign-in
{
	"email": "{{volunteer_email}}",
	"password": "{{volunteer_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

GET {{host}}/api/teams/{{team_members_team_id}}/members/authenticated
Cookie: auth_token={{auth-token}}
HTTP 403
