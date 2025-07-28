# Checks for issues with the "name" field

# Missing name field
POST {{host}}/api/auth/sign-up
{
	"email": "missing-name@example.com",
	"password": "{{default_password}}"
}
HTTP 422

# Empty name field
POST {{host}}/api/auth/sign-up
{
	"name": "",
	"email": "exmpty-name@example.com",
	"password": "{{default_password}}"
}
HTTP 422

# Name has single digit character
POST {{host}}/api/auth/sign-up
{
	"name": "x",
	"email": "single-digit-name@example.com",
	"password": "{{default_password}}"
}
HTTP 200

# Name contains emoji characters
POST {{host}}/api/auth/sign-up
{
	"name": "💩🤷‍♂️",
	"email": "emoj-name@example.com",
	"password": "{{default_password}}"
}
HTTP 200

# Name contains extra spaces
POST {{host}}/api/auth/sign-up
{
	"name": "     Name with  extra spaces      ",
	"email": "extra-spaces-name@example.com",
	"password": "{{default_password}}"
}
HTTP 200

# Names should not be longer than 1024 bytes
# TODO: https://github.com/torontojs/communityhub/issues/122
POST http://localhost:3000/api/auth/sign-up
[Options]
skip: true
{
	"name": "BortMaximiliano-Alexanderthegreat VonSchwarzensteinberg-MacDonaldson O'Flannagan-Smith-Johansson-Ricci",
	"email": "long-name@example.com",
	"password": "{{default_password}}"
}
HTTP 413
