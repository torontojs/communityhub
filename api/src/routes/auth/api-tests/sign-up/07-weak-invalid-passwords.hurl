# Checks for weak or invalid passwords

# Simple check for weak password
POST {{host}}/api/auth/sign-up
{
	"name": "Weak Password",
	"email": "weak-password@example.com",
	"password": "password"
}
HTTP 422

# Short password
POST {{host}}/api/auth/sign-up
{
	"name": "Short Password",
	"email": "short-password@example.com",
	"password": "C.fE@Wqemp87"
}
HTTP 422

# Password with control characters
POST {{host}}/api/auth/sign-up
{
	"name": "Control Character Password",
	"email": "cc-password@example.com",
	"password": "PHw4BGreuw.bdRG9ZbR8YVLQb\u0000"
}
HTTP 422
