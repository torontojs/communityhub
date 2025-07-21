# Check if we can sign-in with inactive users

# User with profile not activated yet
POST {{host}}/api/auth/sign-in
{
	"email": "{{created_email}}",
	"password": "{{created_password}}"
}

HTTP 401

# Deleted user
# TODO: https://github.com/torontojs/communityhub/issues/190
POST {{host}}/api/auth/sign-in
[Options]
skip: true
{
	"email": "{{deleted_email}}",
	"password": "{{deleted_password}}"
}

HTTP 401
