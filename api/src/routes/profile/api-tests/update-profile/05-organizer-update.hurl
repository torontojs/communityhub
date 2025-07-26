# Organizers should not be able to update any profile

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Update self profile
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_auth={{auth-token}}
{
	"name": "Updated Name - organizer"
}
HTTP 403

# Verify if profile was updated
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" != "Updated Name - organizer"
jsonpath "$.data.email" == "{{update_profile_email}}"
