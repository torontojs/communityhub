# Unauthorized users can't update team members
PATCH {{host}}/api/teams/{{update_member_team_id}}/members
[{
	"id": "{{update_member_id}}",
	"name": "Unauthorized Role"
}]
HTTP 401
