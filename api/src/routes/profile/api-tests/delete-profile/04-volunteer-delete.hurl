# Volunteers cannot delete profiles

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{volunteer_email}}",
	"password": "{{volunteer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Delete profile
DELETE {{host}}/api/profiles/{{try_delete_profile_id}}
Cookie: auth_auth={{auth-token}}
HTTP 403
