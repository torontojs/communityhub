# Checks errors on the "password" field

# Missing password field
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}"
}

HTTP 422

# Empty password field
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": ""
}

HTTP 422

# Invalid password
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "x-{{organizer_password}}"
}

HTTP 401
