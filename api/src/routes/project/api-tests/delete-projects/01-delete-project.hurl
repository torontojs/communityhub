# Check for basic project delete operations

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Delete an existing project
DELETE {{host}}/api/projects/{{delete_project_id}}
Cookie: auth_token={{auth-token}}
HTTP 200

# Verify if the project was deleted
GET {{host}}/api/projects/{{delete_project_id}}
HTTP 404
