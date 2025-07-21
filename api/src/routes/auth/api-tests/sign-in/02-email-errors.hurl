# Checks errors on the "email" field

# Missing email field
POST {{host}}/api/auth/sign-in
{
	"password": "{{organizer_password}}"
}

HTTP 422

# Empty email field
POST {{host}}/api/auth/sign-in
{
	"email": "",
	"password": "{{organizer_password}}"
}

HTTP 422

# Invalid email
POST {{host}}/api/auth/sign-in
{
	"email": "x-{{organizer_email}}",
	"password": "{{organizer_password}}"
}

HTTP 422
