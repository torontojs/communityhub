# Check for basic profile deletion

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Delete profile
DELETE {{host}}/api/profiles/{{delete_profile_id}}
Cookie: auth_auth={{auth-token}}
HTTP 200
