# Check for basic event creation operations

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Create a new event
POST {{host}}/api/events
Cookie: auth_token={{auth-token}}
{
	"name": "New API Test Event",
	"teamId": "{{team_id_1}}"
}
HTTP 201

# Verify if the event was created
GET {{host}}/api/events
HTTP 200
[Asserts]
jsonpath "$.data[*].name" contains "New API Test Event"
