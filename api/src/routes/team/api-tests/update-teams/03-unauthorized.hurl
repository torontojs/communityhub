# Unauthorized users should not be able to update teams
PATCH {{host}}/api/teams/{{try_update_team_id}}
{
	"name": "Unauthorized Updated Team"
}
HTTP 401

# Verify the name was not changed
GET {{host}}/api/teams/{{try_update_team_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" != "Unauthorized Updated Team"
