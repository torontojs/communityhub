# Check for basic project creation operations

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Create a new project
POST {{host}}/api/projects
Cookie: auth_token={{auth-token}}
{
	"name": "New API Test Project",
	"teamId": "{{team_id_1}}"
}
HTTP 201

# Verify if the project was created
GET {{host}}/api/projects
HTTP 200
[Asserts]
jsonpath "$.data[*].name" contains "New API Test Project"
