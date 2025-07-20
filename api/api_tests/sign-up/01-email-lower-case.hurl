# Emails should be converted to lower case
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"CaSe InSeNsItIvE",
	"email":"CaSe-InSeNsItIvE@example.com",
	"password":"FruityThisIs911!@#"
}

HTTP 200
