# Check for errors on the "email" field.

# Missing email field
POST {{host}}/api/auth/sign-up
{
	"name": "Missing Email",
	"password": "{{default_password}}"
}
HTTP 422

# Empty email field
POST {{host}}/api/auth/sign-up
{
	"name": "Empty Email",
	"email": "",
	"password": "{{default_password}}"
}
HTTP 422

# Email with extra spaces
POST {{host}}/api/auth/sign-up
{
	"name": "Email extra spaces",
	"email": "       extra-spaces@example.com      ",
	"password": "{{default_password}}"
}
HTTP 422

# Invalid email
POST {{host}}/api/auth/sign-up
{
	"name": "Invalid Email",
	"email": "invalid email",
	"password": "{{default_password}}"
}
HTTP 422

# Email with emojis - user part
POST {{host}}/api/auth/sign-up
{
	"name": "Emoji Email",
	"email": "💩@example.com",
	"password": "{{default_password}}"
}
HTTP 422

# Email with emojis - domain part
POST {{host}}/api/auth/sign-up
{
	"name": "Emoji Email",
	"email": "user@💩.com",
	"password": "{{default_password}}"
}
HTTP 422

# Case insensitive email - user part
POST {{host}}/api/auth/sign-up
{
	"name": "CaSe InSeNsItIvE",
	"email": "CaSe-InSeNsItIvE-uSeR@example.com",
	"password": "{{default_password}}"
}
HTTP 201

# Case insensitive email - domain part
POST {{host}}/api/auth/sign-up
{
	"name": "CaSe InSeNsItIvE",
	"email": "case-insensitive-domain@eXeMpLe.CoM",
	"password": "{{default_password}}"
}
HTTP 201
