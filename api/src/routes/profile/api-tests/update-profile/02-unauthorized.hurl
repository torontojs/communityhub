# Unauthorized users can't update profiles
PATCH {{host}}/api/profiles/{{update_profile_id}}
{
	"name": "Uauthorized Updated Profile"
}
HTTP 401

# Verify the profile was not changed
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" != "Uauthorized Updated Profile"
