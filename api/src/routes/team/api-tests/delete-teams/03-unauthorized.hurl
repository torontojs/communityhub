# Unauthorized users should not be able to delete teams
DELETE {{host}}/api/teams/{{try_delete_team_id}}
HTTP 401

# Verify the team still exists
GET {{host}}/api/teams/{{try_delete_team_id}}
HTTP 200
