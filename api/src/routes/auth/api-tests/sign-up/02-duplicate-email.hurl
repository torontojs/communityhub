# Try to sign up with a duplicate email
# It should return a 200 to obfuscate exisiting emails.

# Sign up for the first time
POST {{host}}/api/auth/sign-up
{
	"name": "Duplicate Email",
	"email": "dupe-email@example.com",
	"password": "{{default_password}}"
}
HTTP 200

# Try to sign up for a second time
POST {{host}}/api/auth/sign-up
{
	"name": "Duplicate Email",
	"email": "dupe-email@example.com",
	"password": "{{default_password}}"
}
HTTP 200
