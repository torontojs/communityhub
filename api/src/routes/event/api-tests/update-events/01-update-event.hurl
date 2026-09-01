# Check for basic event update operations

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Update an existing event
PATCH {{host}}/api/events/{{update_event_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Updated API Test Event"
}
HTTP 200

# Verify if the event was updated
GET {{host}}/api/events/{{update_event_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" == "Updated API Test Event"
