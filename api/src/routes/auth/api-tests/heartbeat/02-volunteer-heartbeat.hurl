# Checks if an volunteer gets a heartbeat response

# Sign-in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{volunteer_email}}",
	"password": "{{volunteer_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Get heartbeat response
GET {{host}}/api/auth/heartbeat
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.id" == "{{volunteer_id}}"
jsonpath "$.access" == "volunteer"
