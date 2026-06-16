# Checks if an organizer gets a heartbeat response

# Sign-in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Get heartbeat response
GET {{host}}/api/auth/heartbeat
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.id" == "{{organizer_id}}"
jsonpath "$.access" == "organizer"
