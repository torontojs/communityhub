# Check for basic event delete operations

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Delete an existing event
DELETE {{host}}/api/events/{{delete_event_id}}
Cookie: auth_token={{auth-token}}
HTTP 200

# Verify if the event was deleted
GET {{host}}/api/events/{{delete_event_id}}
HTTP 404
