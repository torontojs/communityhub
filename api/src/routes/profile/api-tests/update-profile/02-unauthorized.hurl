# Unauthorized users can't update profiles
PATCH {{host}}/api/profiles/{{update_profile_id}}
{
	"name": "Updated Name"
}
HTTP 401
