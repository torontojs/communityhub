# Unauthorized users can't add team members
POST {{host}}/api/teams/{{add_member_team_id}}/members
[{
	"name": "Unauthorized Role",
	"profileId": "{{add_member_profile_id}}"
}]
HTTP 401
