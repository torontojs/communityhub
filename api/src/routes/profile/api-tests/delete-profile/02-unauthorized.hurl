# Unauthorid users can't delete profiles
DELETE {{host}}/api/profiles/{{try_delete_profile_id}}
HTTP 401

# Verify the profile was not deleted
GET {{host}}/api/profiles/{{try_delete_profile_id}}
HTTP 200
