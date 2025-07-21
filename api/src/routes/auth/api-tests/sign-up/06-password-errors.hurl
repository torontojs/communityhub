# Checks for errors on the "password" field

# Missing password field
POST {{host}}/api/auth/sign-up
{
	"name": "Missing Passowrd",
	"email": "missing-password@example.com"
}

HTTP 422

# Empty password field
POST {{host}}/api/auth/sign-up
{
	"name": "empty Passowrd",
	"email": "empty-password@example.com",
	"password": ""
}

HTTP 422

# Allow passwords with extra spaces on the sides
# Spaces should be trimmed
POST {{host}}/api/auth/sign-up
{
	"name": "Password Extra Spaces",
	"email": "password-extra-spaces@email.com",
	"password": "       Extra  Spaces911!@#$       "
}

HTTP 200
