# Check for profile update errors

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{update_profile_email}}",
	"password": "{{update_profile_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Update with no body
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
HTTP 422

# Update with empty body
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{}
HTTP 422
