# Get all signed documents for a profile

# Sign in user
POST {{host}}/api/auth/sign-in
{
	"email": "{{document_user_email}}",
	"password": "{{document_user_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Get the list of signed documents for the user
GET {{host}}/api/documents/signed
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.data[*].type" contains "code-of-conduct"
jsonpath "$.data[*].type" contains "image-release-form"
jsonpath "$.data[*].type" contains "volunteer-agreement"
