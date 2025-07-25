# Unauthorized users can't create new teams
POST {{host}}/api/teams
{
	"name": "Unauthorized Team"
}
HTTP 401
