# Check for basic project update operations

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Update an existing project
PATCH {{host}}/api/projects/{{update_project_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Updated API Test Project"
}
HTTP 200

# Verify if the project was updated
GET {{host}}/api/projects/{{update_project_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" == "Updated API Test Project"
