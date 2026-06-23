# Authenticated team members list — organizers get private fields (email) + pagination

# Sign in as organizer
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Organizers get the members list including the private email field
GET {{host}}/api/teams/{{team_members_team_id}}/members/authenticated
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.data[*].profileId" contains "{{team_member_id_1}}"
jsonpath "$.data[*].profileId" contains "{{team_member_id_2}}"
jsonpath "$.data[*].profileId" contains "{{team_member_id_3}}"
jsonpath "$.data[0].email" exists

# Unknown team returns 404 (after auth passes)
GET {{host}}/api/teams/00000000-0000-0000-0000-000000000000/members/authenticated
Cookie: auth_token={{auth-token}}
HTTP 404

# Pagination respects limit
GET {{host}}/api/teams/{{team_members_team_id}}/members/authenticated?limit=1
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.start" == 0
jsonpath "$.currentPage" == 1
jsonpath "$.size" == 1

# Invalid pagination values are rejected
GET {{host}}/api/teams/{{team_members_team_id}}/members/authenticated?limit=0
Cookie: auth_token={{auth-token}}
HTTP 422

GET {{host}}/api/teams/{{team_members_team_id}}/members/authenticated?page=abc
Cookie: auth_token={{auth-token}}
HTTP 422
