# Checks for weak or invalid passwords

# Simple check for weak password
# TODO: https://github.com/torontojs/communityhub/issues/96
POST {{host}}/api/auth/sign-up
[Options]
skip: true

{
	"name": "Weak Password",
	"email": "weak-password@example.com",
	"password": "password"
}

HTTP 400
