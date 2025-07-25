# Check for profile deletion errors

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Invalid profile id
DELETE {{host}}/api/profiles/00000000-0000-0000-0000-000000000000
HTTP 404

# Malformed UUID
DELETE {{host}}/api/profiles/malformed-id
HTTP 422

# Profile already deleted
DELETE {{host}}/api/profiles/{{delete_profile_id}}
HTTP 404
