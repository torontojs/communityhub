# Basic test for signing up functionality
# Tests the "happy path"

# Creating a new account should work
POST {{host}}/api/auth/sign-up
{
	"name":"New User",
	"email":"new@example.com",
	"password":"{{default_password}}"
}

HTTP 200

# Creating an account with a subdomain should work
POST {{host}}/api/auth/sign-up
{
	"name": "New User with subdomain",
	"email": "new@subdomain.example.com",
	"password": "{{default_password}}"
}

HTTP 200
