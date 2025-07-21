# Checks if users are able to sign-out

# Sign-in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Sign-out user
POST {{host}}/api/auth/sign-out
Cookie: auth_token={{auth-token}}
HTTP 204
