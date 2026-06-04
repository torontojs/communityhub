# Unsafe profile link values should be rejected before they can be rendered into href attributes.

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{update_profile_email}}",
	"password": "{{update_profile_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Reject JavaScript URLs
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": [
		{ "platform": "github", "url": "javascript:alert(1)" }
	]
}
HTTP 422

# Reject non-URL handles because profile links are rendered as href values
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": [
		{ "platform": "github", "url": "github-user" }
	]
}
HTTP 422

# Reject non-HTTPS URLs
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": [
		{ "platform": "github", "url": "http://github.com/testuser" }
	]
}
HTTP 422
