# Checks if sign-in is working and user can't sign in again

# Sign-in user
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"


# Sign-in with already signed in user
POST {{host}}/api/auth/sign-in
Cookie: auth_token={{auth-token}}
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 400
