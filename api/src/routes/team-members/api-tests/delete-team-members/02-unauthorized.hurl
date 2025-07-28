# Unauthorized users can't delete team members
DELETE {{host}}/api/teams/{{delete_member_team_id}}/members
[
	"{{delete_member_id}}"
]
HTTP 401
